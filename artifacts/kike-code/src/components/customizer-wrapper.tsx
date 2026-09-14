import { useEffect, useRef, useState } from "react";
import {
  Sparkles, Send, Upload, X, Loader2, RotateCcw, Image as ImageIcon, ChevronRight,
  Share2, Copy, Check, ExternalLink, Paperclip,
} from "lucide-react";
import { SiteRenderer } from "@/components/site-renderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import type { BusinessTemplate, Lang } from "@/lib/templates/types";
import { SiteEditor, type EditPath } from "@/components/site-editor";
import { EditProvider } from "@/lib/editable";
import { callFn, supabase } from "@/lib/plw";
import { mergeReplaceArrays } from "@/lib/saved-site";

type ChatMsg = { role: "user" | "assistant"; content: string };
type ShareState = { url: string; copied: boolean } | null;
/** A site already saved in PLW: saving again updates it instead of creating a new one. */
export type SavedSiteRef = { id: string; clientId: string | null; customDomain: string | null };
type ClientOption = { id: string; business_name: string };

const MAX_PHOTO_BYTES = 6 * 1024 * 1024; // 6 MB per file
const MAX_GALLERY_PHOTOS = 8;
const MAX_TOTAL_PHOTOS = 12;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

/**
 * Resize + re-encode an uploaded image to keep the saved payload small.
 * Photos are embedded as base64 in the share-link record, so a raw 6 MB phone
 * photo would blow past the server body limit. We cap the longest edge and
 * re-encode as JPEG. Falls back to the raw data URL if anything goes wrong.
 */
async function compressImage(file: File, maxDim = 1600, quality = 0.82): Promise<string> {
  const rawUrl = await fileToDataUrl(file);
  // SVGs and tiny files don't benefit from canvas re-encoding.
  if (file.type === "image/svg+xml") return rawUrl;
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = rawUrl;
    });
    const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return rawUrl;
    ctx.drawImage(img, 0, 0, w, h);
    const out = canvas.toDataURL("image/jpeg", quality);
    // Guard: if compression somehow produced a larger string, keep the smaller.
    return out.length < rawUrl.length ? out : rawUrl;
  } catch {
    return rawUrl;
  }
}

export function sanitizePhoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.length >= 3 ? `tel:${digits}` : "tel:";
}

type SeedPhotos = { hero?: string; gallery?: string[]; teamPortrait?: string };

/** Immutably set a deep value by path (creating object/array spines as needed). */
function setByPath<T>(root: T, path: EditPath, value: unknown): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  const isIndex = typeof head === "number";
  const base: any = root ?? (isIndex ? [] : {});
  const clone: any = Array.isArray(base) ? [...base] : { ...base };
  clone[head as any] = rest.length === 0 ? value : setByPath(clone[head as any], rest, value);
  return clone as T;
}

function getByPath(root: unknown, path: EditPath): unknown {
  return path.reduce<unknown>((acc, k) => (acc == null ? undefined : (acc as any)[k]), root);
}

/** Build an empty value shaped like an existing sample (for "Add item"). */
function blankLike(sample: unknown): unknown {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = blankLike(v);
    return out;
  }
  return "";
}

export default function CustomizerWrapper({
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

  // Once saved, later saves update the same site, so its link never changes.
  const [siteId, setSiteId] = useState<string | null>(savedSite?.id ?? null);
  const [clientId, setClientId] = useState(savedSite?.clientId ?? "");
  const [customDomain, setCustomDomain] = useState(savedSite?.customDomain ?? "");
  const [clients, setClients] = useState<ClientOption[]>([]);

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

  // Honor ?customize=1 by opening the editor. The customizer is open to everyone.
  useEffect(() => {
    if (typeof window === "undefined") return;
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

  const [editLang, setEditLang] = useState<Lang>(original.lockedLang ?? "en");

  // Generic field handlers used by the universal SiteEditor (and inline edit).
  function setField(path: EditPath, value: unknown) {
    setTpl((cur) => setByPath(cur, path, value));
    setShare(null);
  }
  async function uploadField(path: EditPath, file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = await compressImage(file);
    setField(path, url);
  }
  function addItem(path: EditPath) {
    setTpl((cur) => {
      const arr = getByPath(cur, path);
      if (!Array.isArray(arr)) return cur;
      const sample = arr.length > 0 ? arr[arr.length - 1] : "";
      return setByPath(cur, [...path, arr.length], blankLike(sample));
    });
    setShare(null);
  }
  function removeItem(path: EditPath, index: number) {
    setTpl((cur) => {
      const arr = getByPath(cur, path);
      if (!Array.isArray(arr)) return cur;
      return setByPath(cur, path, arr.filter((_, i) => i !== index));
    });
    setShare(null);
  }

  const [name, setName] = useState(tpl.brand.name);
  const [phone, setPhone] = useState(tpl.brand.phone);
  const [city, setCity] = useState(tpl.brand.city);
  const [address, setAddress] = useState(tpl.brand.address);
  const [email, setEmail] = useState(tpl.brand.email);

  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoNotice, setPhotoNotice] = useState<string | null>(null);
  // Photos the agent attached in the AI chat, staged until the next send. On
  // send they are placed on the site (hero + gallery) and passed to the AI.
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const photoCountRef = useRef(
    (seedPhotos?.hero ? 1 : 0) + (seedPhotos?.gallery?.length ?? 0),
  );
  const [share, setShare] = useState<ShareState>(null);
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  // Diff snapshot: only persist photos that differ from the base template, so we
  // don't bloat the DB row with the (large) built-in stock images.
  const sharedPhotosRef = useRef<{ hero?: string; gallery?: string[]; teamPortrait?: string }>(
    seedPhotos ? { ...seedPhotos } : {},
  );

  function applyBrandFields() {
    setTpl((cur) => ({
      ...cur,
      brand: {
        ...cur.brand,
        name,
        phone,
        phoneHref: sanitizePhoneHref(phone),
        city,
        address,
        email,
      },
    }));
  }

  function resetAll() {
    setTpl(original);
    setName(original.brand.name);
    setPhone(original.brand.phone);
    setCity(original.brand.city);
    setAddress(original.brand.address);
    setEmail(original.brand.email);
    setChat([]);
    setError(null);
    setPhotoNotice(null);
    photoCountRef.current =
      (seedPhotos?.hero ? 1 : 0) + (seedPhotos?.gallery?.length ?? 0);
    sharedPhotosRef.current = seedPhotos ? { ...seedPhotos } : {};
    setPendingImages([]);
    setShare(null);
    setShareError(null);
  }

  async function shareWithClient() {
    if (sharing) return;
    setSharing(true);
    setShareError(null);
    // Apply any pending form-field edits before saving.
    const brand = {
      name, city, phone, phoneHref: sanitizePhoneHref(phone), email, address,
    };
    // Snapshot every editable field beyond brand/content/photos so panel + inline
    // edits round-trip. JSON round-trip strips functions (icons) and undefined.
    const overrides = JSON.parse(
      JSON.stringify({
        brand: tpl.brand,
        media: tpl.media,
        offers: tpl.offers,
        galleryCaptions: tpl.galleryCaptions,
        assistant: tpl.assistant,
        availability: tpl.availability,
        videoGallery: tpl.videoGallery,
        transformation: tpl.transformation,
        clientTrust: tpl.clientTrust,
        projectSelector: tpl.projectSelector,
        inventory: tpl.inventory,
        heritage: tpl.heritage,
      }),
    );
    try {
      const { id } = await callFn<{ id: string }>("kike-sites", {
        action: "save",
        id: siteId,
        slug: original.slug,
        brand,
        content: tpl.content,
        photos: sharedPhotosRef.current,
        overrides,
        client_id: clientId || null,
        custom_domain: customDomain.trim() || null,
      });
      setSiteId(id);
      const domain = customDomain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
      const url = domain
        ? `https://${domain}`
        : new URL(`${import.meta.env.BASE_URL}share/${id}`, window.location.origin).toString();
      setShare({ url, copied: false });
    } catch (e) {
      const code = e instanceof Error ? e.message : "";
      setShareError(
        code === "domain_taken" ? "Ese dominio ya está en otro sitio. / That domain is already used by another site."
          : code === "invalid_payload" ? "Revise nombre, teléfono, ciudad, dirección, correo y dominio. / Check the client info and domain."
            : code || "Could not save the site.",
      );
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

  function validatePhotos(files: File[]): { ok: File[]; reason: string | null } {
    const remainingSlots = MAX_TOTAL_PHOTOS - photoCountRef.current;
    if (remainingSlots <= 0) {
      return { ok: [], reason: `Photo limit reached (${MAX_TOTAL_PHOTOS} max). Hit Reset to clear.` };
    }
    const ok: File[] = [];
    let rejected = 0;
    for (const f of files.slice(0, remainingSlots)) {
      if (!f.type.startsWith("image/")) { rejected++; continue; }
      if (f.size > MAX_PHOTO_BYTES) { rejected++; continue; }
      ok.push(f);
    }
    const reason = rejected > 0
      ? `Skipped ${rejected} file(s) \u2014 must be images under 6 MB.`
      : null;
    return { ok, reason };
  }

  async function uploadHero(file: File) {
    const { ok, reason } = validatePhotos([file]);
    setPhotoNotice(reason);
    if (!ok.length) return;
    const url = await compressImage(ok[0]);
    setTpl((cur) => ({
      ...cur,
      media: cur.media
        ? { ...cur.media, hero: url }
        : { hero: url, gallery: [], teamPortrait: url },
    }));
    sharedPhotosRef.current.hero = url;
    photoCountRef.current += 1;
    setShare(null);
  }

  async function uploadGallery(files: FileList) {
    const arr = Array.from(files).slice(0, MAX_GALLERY_PHOTOS);
    const { ok, reason } = validatePhotos(arr);
    setPhotoNotice(reason);
    if (!ok.length) return;
    const urls = await Promise.all(ok.map((f) => compressImage(f)));
    setTpl((cur) => {
      const existing = cur.media?.gallery ?? [];
      const merged = [...existing];
      urls.forEach((u, i) => {
        if (i < merged.length) merged[i] = u;
        else merged.push(u);
      });
      sharedPhotosRef.current.gallery = [
        ...(sharedPhotosRef.current.gallery ?? []),
        ...urls,
      ].slice(0, 12);
      return {
        ...cur,
        media: cur.media
          ? { ...cur.media, gallery: merged }
          : { hero: urls[0], gallery: merged, teamPortrait: urls[0] },
      };
    });
    photoCountRef.current += urls.length;
    setShare(null);
  }

  /** Place chat-attached photos onto the live site: first becomes the hero, all
   *  fill the gallery from the start. Tracked in sharedPhotosRef so they persist
   *  into the share link. */
  function placeChatPhotos(urls: string[]) {
    if (!urls.length) return;
    // Only claim the hero slot if the user hasn't already chosen a custom hero
    // (i.e. it's still empty or the template default) — otherwise just fill gallery.
    const curHero = tpl.media?.hero;
    const heroIsDefault = !curHero || curHero === original.media?.hero;
    const nextHero = heroIsDefault ? urls[0] : curHero;
    setTpl((cur) => {
      const existing = cur.media?.gallery ?? [];
      const merged = [...existing];
      urls.forEach((u, i) => {
        if (i < merged.length) merged[i] = u;
        else merged.push(u);
      });
      return {
        ...cur,
        media: cur.media
          ? { ...cur.media, hero: nextHero, gallery: merged }
          : { hero: nextHero, gallery: merged, teamPortrait: nextHero },
      };
    });
    if (heroIsDefault) sharedPhotosRef.current.hero = urls[0];
    sharedPhotosRef.current.gallery = [
      ...(sharedPhotosRef.current.gallery ?? []),
      ...urls,
    ].slice(0, 12);
    photoCountRef.current += urls.length;
    setShare(null);
  }

  async function attachChatPhotos(files: File[]) {
    const { ok, reason } = validatePhotos(files);
    setPhotoNotice(reason);
    if (!ok.length) return;
    const urls = await Promise.all(ok.map((f) => compressImage(f)));
    setPendingImages((prev) => [...prev, ...urls].slice(0, 6));
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
    const photoCountForAI = photoCountRef.current;
    const nextChat: ChatMsg[] = [...chat, { role: "user", content: msg }];
    setChat(nextChat);

    try {
      const data = await callFn<{
        reply: string;
        brand?: Partial<BusinessTemplate["brand"]>;
        content?: Partial<BusinessTemplate["content"]>;
        galleryCaptions?: { en?: string[]; es?: string[] };
      }>("kike-ai", {
        action: "customize",
        slug: tpl.slug,
        industry: tpl.industry,
        currentBrand: {
          name: tpl.brand.name,
          city: tpl.brand.city,
          phone: tpl.brand.phone,
          phoneHref: tpl.brand.phoneHref,
          email: tpl.brand.email,
          address: tpl.brand.address,
        },
        currentContent: tpl.content,
        chatHistory: chat,
        userMessage: msg,
        photoCount: photoCountForAI,
        images: imgs.length ? imgs : undefined,
      });

      setTpl((cur) => {
        const next: BusinessTemplate = { ...cur };
        if (data.brand) {
          const incoming = { ...data.brand };
          // Always rebuild phoneHref from the phone we'll actually display.
          if (incoming.phone) {
            incoming.phoneHref = sanitizePhoneHref(incoming.phone);
          }
          next.brand = { ...cur.brand, ...incoming };
        }
        if (data.content) {
          next.content = mergeReplaceArrays(cur.content, data.content);
        }
        if (data.galleryCaptions) {
          next.galleryCaptions = mergeReplaceArrays(
            cur.galleryCaptions ?? { en: [], es: [] },
            data.galleryCaptions,
          );
        }
        return next;
      });
      if (data.brand?.name) setName(data.brand.name);
      if (data.brand?.phone) setPhone(data.brand.phone);
      if (data.brand?.city) setCity(data.brand.city);
      if (data.brand?.address) setAddress(data.brand.address);
      if (data.brand?.email) setEmail(data.brand.email);

      setChat([...nextChat, { role: "assistant", content: data.reply }]);
    } catch (e) {
      const m = e instanceof Error ? e.message : "Request failed";
      setError(m);
      setChat([...nextChat, { role: "assistant", content: `\u26a0\ufe0f ${m}` }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="relative">
      <EditProvider editing={open} onText={setField} onImage={uploadField}>
        <SiteRenderer template={tpl} />
      </EditProvider>

      {/* Floating launcher \u2014 sits below the marquee + top bar (top-20) so it never overlaps. */}
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
              Fill in the client info, drop in their photos, then chat with the AI to tune the copy. All changes update the preview live \u2014 nothing is saved.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
            {/* Quick fields */}
            <section className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Client info</h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-slate-300">Business name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} onBlur={applyBrandFields}
                    className="bg-slate-900 border-slate-700 text-white" data-testid="input-name" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-slate-300">Phone</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={applyBrandFields}
                      className="bg-slate-900 border-slate-700 text-white" data-testid="input-phone" />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-300">City</Label>
                    <Input value={city} onChange={(e) => setCity(e.target.value)} onBlur={applyBrandFields}
                      className="bg-slate-900 border-slate-700 text-white" data-testid="input-city" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-slate-300">Address</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} onBlur={applyBrandFields}
                    className="bg-slate-900 border-slate-700 text-white" data-testid="input-address" />
                </div>
                <div>
                  <Label className="text-xs text-slate-300">Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} onBlur={applyBrandFields}
                    className="bg-slate-900 border-slate-700 text-white" data-testid="input-email" />
                </div>
                <Button size="sm" variant="secondary" className="w-full" onClick={applyBrandFields} data-testid="button-apply">
                  <ChevronRight className="w-3.5 h-3.5 mr-1" /> Apply to preview
                </Button>
              </div>
            </section>

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

            {/* Photos */}
            <section className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Client photos (quick)</h3>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col items-center justify-center gap-1.5 px-3 py-4 rounded-lg border-2 border-dashed border-slate-700 hover:border-fuchsia-500 hover:bg-slate-900/60 cursor-pointer transition text-center">
                  <ImageIcon className="w-5 h-5 text-fuchsia-400" />
                  <span className="text-xs font-medium text-slate-300">Hero photo</span>
                  <span className="text-[10px] text-slate-500">replaces main image</span>
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadHero(f); e.target.value = ""; }}
                    data-testid="input-hero-photo" />
                </label>
                <label className="flex flex-col items-center justify-center gap-1.5 px-3 py-4 rounded-lg border-2 border-dashed border-slate-700 hover:border-fuchsia-500 hover:bg-slate-900/60 cursor-pointer transition text-center">
                  <Upload className="w-5 h-5 text-fuchsia-400" />
                  <span className="text-xs font-medium text-slate-300">Gallery photos</span>
                  <span className="text-[10px] text-slate-500">up to {MAX_GALLERY_PHOTOS} at a time</span>
                  <input type="file" accept="image/*" multiple className="hidden"
                    onChange={(e) => { const fs = e.target.files; if (fs?.length) uploadGallery(fs); e.target.value = ""; }}
                    data-testid="input-gallery-photos" />
                </label>
              </div>
              <p className="text-[10px] text-slate-500">Max 6 MB per photo, {MAX_TOTAL_PHOTOS} total. Photos stay in your browser \u2014 nothing is uploaded.</p>
              {photoCountRef.current > 0 && (
                <p className="text-[11px] text-emerald-400">\u2713 {photoCountRef.current} photo(s) loaded into preview</p>
              )}
              {photoNotice && (
                <p className="text-[11px] text-amber-400">{photoNotice}</p>
              )}
            </section>

            {/* Share */}
            <section className="space-y-2 rounded-lg border border-fuchsia-700/40 bg-gradient-to-br from-fuchsia-950/40 to-purple-950/30 p-3">
              <h3 className="text-xs uppercase tracking-wider text-fuchsia-300 font-semibold flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Share with client
              </h3>
              <p className="text-[11px] text-slate-400">
                Save a live link to send your client. They'll see the customized site exactly as it looks now.
              </p>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-slate-300">PLW client (optional)</Label>
                  <select
                    value={clientId}
                    onChange={(e) => { setClientId(e.target.value); setShare(null); }}
                    className="w-full h-9 rounded-md bg-slate-900 border border-slate-700 text-white text-sm px-2"
                    data-testid="select-plw-client"
                  >
                    <option value="">Demo — sin cliente</option>
                    {clients.map((c) => <option key={c.id} value={c.id}>{c.business_name}</option>)}
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">
                    A linked site shows the client's PLW number and sends its form leads to them.
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-slate-300">Client domain (optional)</Label>
                  <Input
                    value={customDomain}
                    onChange={(e) => { setCustomDomain(e.target.value); setShare(null); }}
                    placeholder="negocio.com"
                    className="bg-slate-900 border-slate-700 text-white"
                    data-testid="input-custom-domain"
                  />
                </div>
              </div>
              <Button onClick={shareWithClient} disabled={sharing} size="sm"
                className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white border-0"
                data-testid="button-share-client">
                {sharing ? (
                  <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving…</>
                ) : (
                  <><Share2 className="w-3.5 h-3.5 mr-1.5" /> {siteId ? "Save changes" : "Create share link"}</>
                )}
              </Button>
              {shareError && <p className="text-[11px] text-red-400">{shareError}</p>}
              {share && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-stretch gap-1.5">
                    <Input readOnly value={share.url}
                      className="bg-slate-950 border-slate-700 text-white text-[11px] h-8 px-2"
                      onFocus={(e) => e.currentTarget.select()}
                      data-testid="input-share-url" />
                    <Button size="sm" variant="secondary" onClick={copyShareUrl}
                      className="h-8 px-2.5 shrink-0" data-testid="button-copy-share">
                      {share.copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </Button>
                    <a href={share.url} target="_blank" rel="noreferrer"
                      className="h-8 px-2.5 shrink-0 inline-flex items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200"
                      title="Open in new tab" data-testid="link-open-share">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-[10px] text-emerald-400">
                    ✓ Link ready. Send it by text, WhatsApp, or email — your client can open it on any phone.
                  </p>
                </div>
              )}
            </section>

            {/* Chat */}
            <section className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">AI assistant</h3>
              <p className="text-[11px] text-slate-500">
                Tell the AI what to change in plain language: "make it sound more elegant", "add their 25 years of experience to the hero", "translate this for a Cuban audience in Miami"\u2026
              </p>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {chat.length === 0 && (
                  <div className="rounded-lg bg-slate-900/50 border border-slate-800 px-3 py-2.5 text-xs text-slate-400">
                    \ud83d\udc4b Try: <em>"This is for Tomas, owner of Tomas Plumbing in Phoenix. He's been in business 20 years and offers 24-hour emergency service."</em>
                  </div>
                )}
                {chat.map((m, i) => (
                  <div key={i} className={`rounded-lg px-3 py-2 text-xs whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-fuchsia-600/15 border border-fuchsia-700/30 text-fuchsia-50 ml-4"
                      : "bg-slate-900 border border-slate-800 text-slate-200 mr-4"
                  }`} data-testid={`chat-msg-${i}`}>
                    {m.content}
                  </div>
                ))}
                {sending && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 px-3 py-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> AI is rewriting your template\u2026
                  </div>
                )}
              </div>
              {error && <div className="text-[11px] text-red-400 px-1">{error}</div>}
            </section>
          </div>

          {/* Composer */}
          <div className="border-t border-slate-800 px-4 py-3 bg-slate-900/60 space-y-2">
            {pendingImages.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {pendingImages.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt="" className="w-12 h-12 rounded object-cover border border-slate-700" />
                    <button
                      type="button"
                      onClick={() => setPendingImages((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute -top-1.5 -right-1.5 bg-slate-800 border border-slate-600 rounded-full p-0.5 text-slate-300 hover:text-white"
                      aria-label="Remove photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendChat();
                }
              }}
              placeholder="Message the AI\u2026 (Enter to send)"
              rows={2}
              maxLength={4000}
              className="resize-none bg-slate-950 border-slate-700 text-white text-sm placeholder:text-slate-600"
              data-testid="textarea-chat-input"
            />
            <div className="flex items-center gap-2">
              <label
                className="shrink-0 h-9 w-9 inline-flex items-center justify-center rounded-md bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                title="Attach client photos"
                data-testid="label-attach-photos"
              >
                <Paperclip className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const fs = e.target.files;
                    if (fs?.length) attachChatPhotos(Array.from(fs));
                    e.target.value = "";
                  }}
                  data-testid="input-chat-photos"
                />
              </label>
              <Button onClick={() => sendChat()} disabled={sending || (!input.trim() && pendingImages.length === 0)}
                className="flex-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white border-0"
                data-testid="button-send-chat">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 mr-1.5" /> Send</>}
              </Button>
              <Button variant="outline" size="icon" onClick={resetAll}
                className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                title="Reset everything" data-testid="button-reset">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-slate-800" title="Close">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
