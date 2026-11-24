import { callFn } from "@/lib/plw";
import { mergeReplaceArrays } from "@/lib/saved-site";
import { crPhone } from "@/lib/cr";
import type { BusinessTemplate } from "@/templates/types";
import { IMG_ARRAY_PARENTS, IMG_KEYS, VIDEO_KEYS, getByPath, looksLikeImage, setByPath, type EditPath } from "./edit-path";
import { siteOverrides } from "./save";

export type ChatMsg = { role: "user" | "assistant"; content: string };

/** One change the AI asks for: the value at `path` in `aiSite` (objects merge, arrays replace). */
export type AiChange = { path: EditPath; value: unknown };
export type AiEdit = { reply: string; edits?: AiChange[] };

/** Only staff decide these: the language lock and that reviews and claims are true. */
const STAFF_ONLY = ["lockedLang", "defaultLang", "contentConfirmed"];
/** Never set by a path: the phone links are rebuilt from the phone, the rest are not data. */
const BLOCKED_KEYS = new Set(["phoneHref", "phoneAltHref", "__proto__", "constructor", "prototype"]);
const COLOR = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\([\d\s.,%/]+\))$/i;

/** Everything about the site the AI may change, as the JSON it sees and edits by path. */
export function aiSite(tpl: BusinessTemplate): Record<string, unknown> {
  const site: Record<string, unknown> = {
    ...siteOverrides(tpl),
    content: tpl.content,
    // Present even when empty, so captions for newly attached photos have a place.
    galleryCaptions: tpl.galleryCaptions ?? { en: [], es: [] },
  };
  for (const key of STAFF_ONLY) delete site[key];
  return site;
}

/** Ask `kike-ai` for the changes the operator's message asks for. */
export function askAi(tpl: BusinessTemplate, chatHistory: ChatMsg[], userMessage: string, photoCount: number, images: string[]): Promise<AiEdit> {
  return callFn<AiEdit>("kike-ai", {
    action: "edit",
    slug: tpl.slug,
    industry: tpl.industry,
    // A photo kept inline (its upload failed) would cost ~100k tokens per message: send a stand-in.
    // It is not a known URL, so the AI cannot move it (applyAiEdits checks the real draft).
    site: JSON.parse(JSON.stringify(aiSite(tpl), (_key, v) => (typeof v === "string" && v.startsWith("data:") ? "(embedded photo)" : v))),
    chatHistory,
    userMessage,
    photoCount,
    images: images.length ? images : undefined,
  });
}

/**
 * The draft with the AI's changes. Each one is checked against the site the AI
 * saw: it keeps the shape of what it replaces (so every section still renders),
 * uses only photos already on the site, sets real colors and leaves staff-only
 * fields alone. `skipped` counts the changes that failed a check.
 */
export function applyAiEdits(cur: BusinessTemplate, edits: AiChange[] = []): { tpl: BusinessTemplate; skipped: number } {
  const site = aiSite(cur);
  const urls = new Set(strings(site));
  let tpl = cur;
  let skipped = 0;
  for (const edit of edits) {
    const path = edit?.path;
    const ok = Array.isArray(path) && path.length > 0
      && Object.prototype.hasOwnProperty.call(site, path[0])
      && !path.some((key) => BLOCKED_KEYS.has(String(key)))
      && fits(edit.value, getByPath(site, path), path, urls);
    if (!ok) {
      skipped++;
      continue;
    }
    tpl = setByPath(tpl, path, mergeReplaceArrays(getByPath(tpl, path), edit.value));
  }
  // The call link always follows the phone shown, in Costa Rican format.
  if (tpl.brand.phone !== cur.brand.phone) tpl = { ...tpl, brand: { ...tpl.brand, ...crPhone(tpl.brand.phone) } };
  return { tpl, skipped };
}

const isPlain = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isLeaf = (v: unknown) => typeof v === "string" || typeof v === "number" || typeof v === "boolean";

/**
 * Whether `value` may go where `old` is. `whole`: it replaces `old` outright (a
 * list item), so it must keep `old`'s nested lists and objects, or the section
 * rendering it breaks; a missing text only shows blank.
 */
function fits(value: unknown, old: unknown, path: EditPath, urls: Set<string>, whole = false): boolean {
  if (typeof value === "string") {
    const key = String(path[path.length - 1]);
    const image = IMG_KEYS.has(key) || VIDEO_KEYS.has(key) || IMG_ARRAY_PARENTS.has(String(path[path.length - 2]))
      || (typeof old === "string" && looksLikeImage(old)) || looksLikeImage(value);
    if (image && !urls.has(value)) return false;
    if (path.includes("palette") && !COLOR.test(value)) return false;
  }
  // A field the site does not have yet (a social link): plain text, or a group of them.
  if (old === undefined) return isLeaf(value) || (isPlain(value) && Object.values(value).every(isLeaf));
  if (Array.isArray(old)) {
    return Array.isArray(value)
      && value.every((item, i) => (old.length === 0 ? isLeaf(item) : fits(item, old[i] ?? old[0], [...path, i], urls, true)));
  }
  if (isPlain(old)) {
    if (!isPlain(value)) return false;
    if (whole && Object.entries(old).some(([k, v]) => typeof v === "object" && v !== null && !(k in value))) return false;
    return Object.entries(value).every(([k, v]) => fits(v, old[k], [...path, k], urls, whole));
  }
  return typeof value === typeof old;
}

/** Every string in a JSON value: the photo URLs the site already has are among them. */
function strings(v: unknown): string[] {
  if (typeof v === "string") return [v];
  if (Array.isArray(v)) return v.flatMap(strings);
  return isPlain(v) ? Object.values(v).flatMap(strings) : [];
}
