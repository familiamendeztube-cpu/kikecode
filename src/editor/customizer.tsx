import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { SiteRenderer } from "@/sites/site-renderer";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { supabase } from "@/lib/plw";
import type { BusinessTemplate, Lang } from "@/templates/types";
import { SiteEditor } from "./site-editor";
import { EditProvider } from "./editable";
import { blankLike, getByPath, setByPath, type EditPath } from "./edit-path";
import { compressImage, validatePhotos, MAX_GALLERY_PHOTOS } from "./images";
import { brandFields, sanitizePhoneHref, saveErrorMessage, saveSite, type BrandFields, type SavedSiteRef } from "./save";
import { applyAiEdit, askAi, type ChatMsg } from "./ai";
import { AiChatLog, AiComposer, ClientInfoPanel, PhotosPanel, SharePanel, type ShareState } from "./panels";

type ClientOption = { id: string; business_name: string };
type SeedPhotos = { hero?: string; gallery?: string[]; teamPortrait?: string };

const seedCount = (seed?: SeedPhotos) => (seed?.hero ? 1 : 0) + (seed?.gallery?.length ?? 0);

/** Put photos into the gallery from the start, replacing what is there. */
function fillGallery(existing: string[], urls: string[]): string[] {
  const merged = [...existing];
  urls.forEach((u, i) => {
    if (i < merged.length) merged[i] = u;
    else merged.push(u);
  });
  return merged;
}

/** The live site with the operator's editing drawer: every field, photos, AI copy and saving. */
export default function Customizer({
  original,
  seedPhotos,
  startOpen = false,
  initialMessage,
  savedSite,
}: {
  original: BusinessTemplate;
  /** Photos already baked into `original.media` (e.g. from the AI builder) that
   *  should also be persisted when the agent creates a share link. */
  seedPhotos?: SeedPhotos;
  /** Open the editor drawer immediately (used by the AI "create a site" flow). */
  startOpen?: boolean;
  /** If set, auto-send this to the AI once on mount (used by the AI "create a
   *  site" flow to fill the chosen template's copy for the described business). */
  initialMessage?: string;
  /** Editing a site already saved in PLW (the /sites/:id/edit page). */
  savedSite?: SavedSiteRef;
}) {
  const [tpl, setTpl] = useState<BusinessTemplate>(original);
  const [open, setOpen] = useState(startOpen);
  const [editLang, setEditLang] = useState<Lang>(original.lockedLang ?? "en");
  const [fields, setFields] = useState<BrandFields>(() => brandFields(original.brand));

  // Once saved, later saves update the same site, so its link never changes.
  const [siteId, setSiteId] = useState<string | null>(savedSite?.id ?? null);
  const [clientId, setClientId] = useState(savedSite?.clientId ?? "");
  const [customDomain, setCustomDomain] = useState(savedSite?.customDomain ?? "");
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [share, setShare] = useState<ShareState>(null);
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoNotice, setPhotoNotice] = useState<string | null>(null);
  // Photos the agent attached in the AI chat, staged until the next send. On
  // send they are placed on the site (hero + gallery) and passed to the AI.
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const photoCountRef = useRef(seedCount(seedPhotos));

  // PLW clients a site can be linked to; RLS returns only the ones this staff member may see.
  useEffect(() => {
    let cancelled = false;
    supabase.from("clients").select("id, business_name").order("business_name").then(({ data }) => {
      if (!cancelled && data) setClients(data as ClientOption[]);
    });
    return () => { cancelled = true; };
  }, []);

  // Re-seed if the incoming template changes (e.g. a new AI generation).
  useEffect(() => {
    setTpl(original);
  }, [original]);

  // Honor ?customize=1 by opening the editor.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("customize") !== "1") return;
    setOpen(true);
    url.searchParams.delete("customize");
    window.history.replaceState({}, "", url.toString());
  }, []);

  // AI "create a site" flow: once, after mount, send the user's description
  // through the proven /customize path so the copy is written in the correct
  // field shape for the chosen template.
  const autoSentRef = useRef(false);
  useEffect(() => {
    if (!initialMessage || autoSentRef.current) return;
    autoSentRef.current = true;
    void sendChat(initialMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  /** Every edit makes a shown share link stale. */
  function edit(update: (cur: BusinessTemplate) => BusinessTemplate) {
    setTpl(update);
    setShare(null);
  }

  // Generic field handlers used by the universal SiteEditor (and inline edit).
  function setField(path: EditPath, value: unknown) {
    edit((cur) => setByPath(cur, path, value));
  }
  async function uploadField(path: EditPath, file: File) {
    if (!file.type.startsWith("image/")) return;
    setField(path, await compressImage(file));
  }
  function addItem(path: EditPath) {
    edit((cur) => {
      const arr = getByPath(cur, path);
      if (!Array.isArray(arr)) return cur;
      const sample = arr.length > 0 ? arr[arr.length - 1] : "";
      return setByPath(cur, [...path, arr.length], blankLike(sample));
    });
  }
  function removeItem(path: EditPath, index: number) {
    edit((cur) => {
      const arr = getByPath(cur, path);
      if (!Array.isArray(arr)) return cur;
      return setByPath(cur, path, arr.filter((_, i) => i !== index));
    });
  }

  function applyBrandFields() {
    setTpl((cur) => ({ ...cur, brand: { ...cur.brand, ...fields, phoneHref: sanitizePhoneHref(fields.phone) } }));
  }

  function resetAll() {
    setTpl(original);
    setFields(brandFields(original.brand));
    setChat([]);
    setError(null);
    setPhotoNotice(null);
    photoCountRef.current = seedCount(seedPhotos);
    setPendingImages([]);
    setShare(null);
    setShareError(null);
  }

  async function shareWithClient() {
    if (sharing) return;
    setSharing(true);
    setShareError(null);
    try {
      const saved = await saveSite({ siteId, slug: original.slug, fields, tpl, clientId, customDomain });
      setSiteId(saved.id);
      setShare({ url: saved.url, copied: false });
    } catch (e) {
      setShareError(saveErrorMessage(e));
    } finally {
      setSharing(false);
    }
  }

  async function copyShareUrl() {
    if (!share) return;
    try {
      await navigator.clipboard.writeText(share.url);
      setShare({ ...share, copied: true });
      setTimeout(() => setShare((s) => (s ? { ...s, copied: false } : s)), 2000);
    } catch {
      /* ignore */
    }
  }

  /** Validated, compressed photos for an upload (counted against the limit). */
  async function takePhotos(files: File[]): Promise<string[]> {
    const { ok, reason } = validatePhotos(files, photoCountRef.current);
    setPhotoNotice(reason);
    return Promise.all(ok.map((f) => compressImage(f)));
  }

  async function uploadHero(file: File) {
    const [url] = await takePhotos([file]);
    if (!url) return;
    edit((cur) => ({
      ...cur,
      media: cur.media ? { ...cur.media, hero: url } : { hero: url, gallery: [], teamPortrait: url },
    }));
    photoCountRef.current += 1;
  }

  async function uploadGallery(files: FileList) {
    const urls = await takePhotos(Array.from(files).slice(0, MAX_GALLERY_PHOTOS));
    if (!urls.length) return;
    edit((cur) => {
      const gallery = fillGallery(cur.media?.gallery ?? [], urls);
      return { ...cur, media: cur.media ? { ...cur.media, gallery } : { hero: urls[0], gallery, teamPortrait: urls[0] } };
    });
    photoCountRef.current += urls.length;
  }

  /** Place chat-attached photos onto the live site: first becomes the hero, all
   *  fill the gallery from the start. Saving stores them with the site. */
  function placeChatPhotos(urls: string[]) {
    if (!urls.length) return;
    // Only claim the hero slot if the user hasn't already chosen a custom hero
    // (i.e. it's still empty or the template default) — otherwise just fill gallery.
    const curHero = tpl.media?.hero;
    const heroIsDefault = !curHero || curHero === original.media?.hero;
    const hero = heroIsDefault ? urls[0] : curHero;
    edit((cur) => {
      const gallery = fillGallery(cur.media?.gallery ?? [], urls);
      return { ...cur, media: cur.media ? { ...cur.media, hero, gallery } : { hero, gallery, teamPortrait: hero } };
    });
    photoCountRef.current += urls.length;
  }

  async function attachChatPhotos(files: File[]) {
    const urls = await takePhotos(files);
    if (urls.length) setPendingImages((prev) => [...prev, ...urls].slice(0, 6));
  }

  async function sendChat(override?: string) {
    const imgs = pendingImages;
    const typed = (override ?? input).trim();
    const fallback =
      editLang === "es"
        ? "Aquí están las fotos del cliente — colócalas en el sitio y ajusta el texto y los pies de foto."
        : "Here are the client's photos — place them on the site and match the copy and captions to them.";
    const msg = typed || (imgs.length ? fallback : "");
    if (!msg || sending) return;
    if (override === undefined) setInput("");
    setPendingImages([]);
    setError(null);
    setSending(true);
    // Place attached photos on the site immediately, then tell the AI about them.
    if (imgs.length) placeChatPhotos(imgs);
    const nextChat: ChatMsg[] = [...chat, { role: "user", content: msg }];
    setChat(nextChat);

    try {
      const data = await askAi(tpl, chat, msg, photoCountRef.current, imgs);
      setTpl((cur) => applyAiEdit(cur, data));
      const brand = data.brand;
      if (brand) {
        setFields((f) => {
          const next = { ...f };
          for (const key of Object.keys(f) as (keyof BrandFields)[]) if (brand[key]) next[key] = brand[key]!;
          return next;
        });
      }
      setChat([...nextChat, { role: "assistant", content: data.reply }]);
    } catch (e) {
      const m = e instanceof Error ? e.message : "Request failed";
      setError(m);
      setChat([...nextChat, { role: "assistant", content: `⚠️ ${m}` }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="relative">
      <EditProvider editing={open} onText={setField} onImage={uploadField}>
        <SiteRenderer template={tpl} />
      </EditProvider>

      {/* Floating launcher — sits below the marquee + top bar (top-20) so it never overlaps. */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-20 right-4 z-[60] flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-semibold shadow-2xl shadow-fuchsia-500/30 hover:scale-105 transition"
          data-testid="button-open-customizer"
        >
          <Sparkles className="w-4 h-4" />
          Customize for client
        </button>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="hidden" />
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 bg-slate-950 text-white border-l border-slate-800">
          <SheetHeader className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-fuchsia-950/40 to-purple-950/40">
            <SheetTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
              Client Customizer
            </SheetTitle>
            <SheetDescription className="text-slate-400 text-xs">
              Fill in the client info, drop in their photos, then chat with the AI to tune the copy. All changes update the preview live — nothing is saved.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
            <ClientInfoPanel fields={fields} onChange={setFields} onApply={applyBrandFields} />

            {/* Universal editor — every word and image */}
            <section className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Edit every field</h3>
              <p className="text-[11px] text-slate-500">
                Click any section to expand it. Every word and image on the site is editable here — switch EN/ES to edit each language.
              </p>
              <SiteEditor
                tpl={tpl}
                lang={editLang}
                onLangChange={setEditLang}
                onChange={setField}
                onUpload={uploadField}
                onAddItem={addItem}
                onRemoveItem={removeItem}
              />
            </section>

            <PhotosPanel photoCount={photoCountRef.current} notice={photoNotice} onHero={uploadHero} onGallery={uploadGallery} />

            <SharePanel
              clients={clients}
              clientId={clientId}
              onClientId={(id) => { setClientId(id); setShare(null); }}
              customDomain={customDomain}
              onCustomDomain={(domain) => { setCustomDomain(domain); setShare(null); }}
              saved={!!siteId}
              saving={sharing}
              error={shareError}
              share={share}
              onSave={shareWithClient}
              onCopy={copyShareUrl}
            />

            <AiChatLog chat={chat} sending={sending} error={error} />
          </div>

          <AiComposer
            input={input}
            onInput={setInput}
            pendingImages={pendingImages}
            onRemoveImage={(i) => setPendingImages((prev) => prev.filter((_, j) => j !== i))}
            onAttach={attachChatPhotos}
            onSend={() => void sendChat()}
            sending={sending}
            onReset={resetAll}
            onClose={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
