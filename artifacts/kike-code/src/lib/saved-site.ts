import { getTemplate } from "@/lib/templates";
import type { BusinessTemplate } from "@/lib/templates/types";
import { fnUrl, hasPlwConfig } from "@/lib/plw";

/** A site as the `kike-sites` function returns it. */
export type SavedSite = {
  id: string;
  slug: string;
  brand: {
    name: string; city: string; phone: string; phoneHref: string;
    email: string; address: string; whatsapp?: string;
  };
  content: { en: unknown; es: unknown };
  photos: { hero?: string; gallery?: string[]; teamPortrait?: string };
  overrides?: unknown;
};

/** The stored row an editor loads (`kike-sites` action "get"). */
export type StoredSite = SavedSite & {
  client_id: string | null;
  custom_domain: string | null;
  active: boolean;
};

/**
 * Replace-arrays merge: when source has an array, it fully REPLACES the target's
 * array (the AI is instructed to send complete arrays). For objects, recurse.
 * Primitives in source override target.
 */
export function mergeReplaceArrays<T>(target: T, source: unknown): T {
  if (source === null || source === undefined) return target;
  if (Array.isArray(source)) return source as T;
  if (typeof source !== "object") return source as T;
  if (target === null || target === undefined || typeof target !== "object" || Array.isArray(target)) {
    return source as T;
  }
  const out: Record<string, unknown> = { ...(target as Record<string, unknown>) };
  for (const key of Object.keys(source as Record<string, unknown>)) {
    out[key] = mergeReplaceArrays(
      (target as Record<string, unknown>)[key],
      (source as Record<string, unknown>)[key],
    );
  }
  return out as T;
}

/**
 * Rebuild the full template a saved site describes. `live` marks a published
 * view: its forms then send leads to PLW under the site's id. The editor passes
 * false so trying the form while editing never creates a lead.
 */
export function rebuildTemplate(base: BusinessTemplate, saved: SavedSite, live: boolean): BusinessTemplate {
  // Apply the generic overrides (every non brand/content/photo field) first,
  // then let the dedicated brand/content/photo columns win on top.
  const withOverrides = saved.overrides
    ? mergeReplaceArrays(base, saved.overrides)
    : base;
  const next: BusinessTemplate = {
    ...withOverrides,
    brand: { ...withOverrides.brand, ...saved.brand },
    content: mergeReplaceArrays(withOverrides.content, saved.content),
    plwSiteId: live ? saved.id : undefined,
  };
  if (saved.photos && (saved.photos.hero || saved.photos.gallery?.length || saved.photos.teamPortrait)) {
    // Layer uploaded photos on top of the (possibly overridden) media so that
    // edited videos/posters/etc. survive while photos win for their fields.
    const baseMedia = next.media ?? { hero: "", gallery: [], teamPortrait: "" };
    next.media = {
      ...baseMedia,
      hero: saved.photos.hero ?? baseMedia.hero,
      gallery: saved.photos.gallery && saved.photos.gallery.length > 0
        ? saved.photos.gallery
        : baseMedia.gallery,
      teamPortrait: saved.photos.teamPortrait ?? baseMedia.teamPortrait,
    };
  }
  return next;
}

export type PublishedSite =
  | { status: "ok"; template: BusinessTemplate }
  | { status: "notfound" }
  | { status: "disabled" }
  | { status: "error"; message: string };

/** Load a published site by its id (share links) or by a client's domain. */
export async function loadPublishedSite(query: { id: string } | { domain: string }): Promise<PublishedSite> {
  if (!hasPlwConfig) return { status: "error", message: "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set." };
  const param = "id" in query ? `id=${encodeURIComponent(query.id)}` : `domain=${encodeURIComponent(query.domain)}`;
  try {
    const res = await fetch(`${fnUrl("kike-sites")}?${param}`);
    if (res.status === 404) return { status: "notfound" };
    if (res.status === 410) return { status: "disabled" };
    if (!res.ok) return { status: "error", message: `Server returned ${res.status}` };
    const saved = (await res.json()) as SavedSite;
    const base = getTemplate(saved.slug);
    if (!base) return { status: "error", message: `Template "${saved.slug}" no longer exists.` };
    return { status: "ok", template: rebuildTemplate(base, saved, true) };
  } catch (e) {
    return { status: "error", message: e instanceof Error ? e.message : "Could not load the site." };
  }
}
