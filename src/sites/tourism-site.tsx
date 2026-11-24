import { useEffect, useRef, useState, type FormEvent, type ImgHTMLAttributes, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Check, ChevronLeft, ChevronRight, Copy, Expand, Loader2, MapPin, Menu, MessageCircle, Navigation,
  Phone, Plus, Send, Sparkles, Square, Volume2, X, type LucideIcon,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import type { BusinessTemplate, Lang, TourismDemo } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { PLW_WHATSAPP, waLink } from "@/sites/shared/whatsapp";
import { useReturnFocus } from "@/sites/shared/return-focus";
import { claimAudio, releaseAudio } from "@/sites/shared/site-audio";
import { SECRETARIA_LANGUAGES, SecretariaCard } from "@/sites/shared/secretaria-card";
import { Sparks } from "@/sites/shared/sparks";
import { FadeInView } from "@/sites/shared/fade-in-view";
import { IconSwap } from "@/components/icon-swap";
import { PRESS } from "@/sites/business/ui";

/*
  The PLW demo site every sample type renders through (tours, stays,
  restaurant, clinic, shop, gym, real estate, auto, generic): an editorial
  landing page — full-bleed hero, Fraunces headlines, forest green and gold on
  warm off-white, generous spacing. Design system: those four colors only;
  radii follow outer − padding = inner on this app's scale (3xl 32, 2xl 24,
  lg 16); every pressable gets PRESS (0.97); primary CTAs throw sparks.

  Honesty rules this file enforces:
  - It shows only what the draft supplies (brand + overrides.tourismDemo) and
    neutral copy. No invented prices, reviews, amenities or hours.
  - The homepage chat answers only the draft's confirmed FAQs (its suggested
    questions). A typed question gets the note that answering anything comes
    with the full service, not the demo — so it never invents an answer and
    never takes a booking.
  - Contact actions appear only when the draft has a confirmed public phone.
  - Gallery photos from the stock library carry an "illustrative" note until
    the business's own photos replace them. AI-generated approved images are
    labeled "Ilustración". Candidates and input sources are never shown — only
    the images PLW approved.
  - The contact form never sends: it checks its fields and says the form comes
    with the full service. The map shows the city the draft gives, nothing more.
  - Voice: click-to-play on an answer calls PLW's plw-tourism-voice with the
    preview token and that answer's text (never the visitor's question, never
    any credential). It is a mute button, not autoplay, and text stays as the
    ground truth if the audio fails or is unavailable.
*/

const HERO_STOCK_FALLBACK = "https://images.pexels.com/photos/11181983/pexels-photo-11181983.jpeg?auto=compress&cs=tinysrgb&w=1920";

/** The only origin approved AI images may come from (PLW's public storage). */
const PLW_IMAGES_ORIGIN = "meagbbmittuhdgwnhvxa.supabase.co";
const PLW_IMAGES_PATH = "/storage/v1/object/public/plw-site-images/";

/** An approved AI image URL: HTTPS on PLW's public plw-site-images bucket, else null. */
export function approvedImageUrl(src: string | undefined): string | null {
  if (!src) return null;
  try {
    const u = new URL(src);
    if (u.protocol !== "https:" || u.host !== PLW_IMAGES_ORIGIN) return null;
    return u.pathname.startsWith(PLW_IMAGES_PATH) ? src : null;
  } catch {
    return null;
  }
}

/** Trusted HTTPS image sources: Kike/PLW media or the verified Pexels stock. */
function trustedHero(src: string | undefined): string {
  if (!src) return HERO_STOCK_FALLBACK;
  try {
    const u = new URL(src, "https://x"); // relative "/…" URLs resolve against a dummy base
    if (u.protocol !== "https:") return HERO_STOCK_FALLBACK;
    const host = u.host.replace(/^www\./, "");
    const ok =
      host.endsWith(".supabase.co") || // Kike/PLW storage (template-assets, uploads)
      host === "images.pexels.com";
    return ok ? src : HERO_STOCK_FALLBACK;
  } catch {
    return HERO_STOCK_FALLBACK;
  }
}

/** The tourism data a saved draft carries, read safely; unknown fields are ignored. */
export type SafeTourismDemo = TourismDemo & { details: { label: string; value: string }[]; faqs: { question: string; answer: string }[]; approvedImages: { url: string; alt: string; kind: "generated" | "business" }[] };

function tourismDemo(t: BusinessTemplate): SafeTourismDemo {
  const d = t.tourismDemo;
  const services = Array.isArray(d?.services) ? d.services.filter((s): s is string => typeof s === "string" && s.trim().length > 0) : [];
  const highlight = typeof d?.highlight === "string" ? d.highlight.trim() : "";
  const description = typeof d?.description === "string" ? d.description.trim() : "";
  const details = Array.isArray(d?.details ?? d?.facts)
    ? ((d?.details ?? d?.facts) as unknown[])
        .filter((x): x is { label: string; value: string } =>
          !!x && typeof x === "object" && typeof (x as { label?: unknown }).label === "string" && typeof (x as { value?: unknown }).value === "string")
        .map((x) => ({ label: x.label.trim(), value: x.value.trim() }))
        .filter((x) => x.label && x.value)
    : [];
  const faqs = Array.isArray(d?.faqs)
    ? d.faqs
        .filter((x): x is { question: string; answer: string } =>
          !!x && typeof x === "object" && typeof (x as { question?: unknown }).question === "string" && typeof (x as { answer?: unknown }).answer === "string")
        .map((x) => ({ question: x.question.trim(), answer: x.answer.trim() }))
        .filter((x) => x.question && x.answer)
    : [];
  const heroImage = typeof d?.heroImage === "string" && d.heroImage.trim() ? d.heroImage.trim() : undefined;
  // Only PLW-approved images from PLW's public bucket; max 4; unknown kinds are
  // treated as generated (labeled), never as business-own.
  const approvedImages = Array.isArray(d?.approvedImages)
    ? d.approvedImages.slice(0, 4)
        .map((x) => ({
          url: approvedImageUrl(x?.url),
          alt: typeof x?.alt === "string" ? x.alt.trim() : "",
          kind: x?.kind === "business" ? "business" : "generated",
        }))
        .filter((x): x is { url: string; alt: string; kind: "generated" | "business" } => x.url !== null)
    : [];
  return { services, highlight, description, details, faqs, heroImage, approvedImages };
}

/** A phone only when the draft confirmed a public one (blank means none). */
function publicPhone(brand: BusinessTemplate["brand"]): { phone: string; href: string } | null {
  if (!brand.phone.trim() || !brand.phoneHref.trim()) return null;
  return { phone: brand.phone, href: brand.phoneHref };
}

/* ------------------------------------------------------------------ */
/* Small parts the sections share                                      */
/* ------------------------------------------------------------------ */

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;
const GOLD_SPARKS: [string, string] = ["bg-[#E8B04B]", "bg-white"];

/** A button-like link. The primary one is gold and throws a burst of sparks when pressed. */
function Cta({ href, external, variant = "primary", size = "lg", className = "", children }: {
  href: string;
  external?: boolean;
  variant?: "primary" | "ghost";
  size?: "lg" | "sm";
  className?: string;
  children: ReactNode;
}) {
  const [burst, setBurst] = useState(0);
  const look = variant === "primary"
    ? "bg-[#E8B04B] text-[#0A1F13] hover:bg-[#F2C065] shadow-[0_14px_34px_-14px_rgba(232,176,75,0.9)]"
    : "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/15";
  return (
    <a
      href={href}
      {...(external ? EXTERNAL : {})}
      onClick={variant === "primary" ? () => setBurst((b) => b + 1) : undefined}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full font-semibold ${size === "lg" ? "h-14 px-7 text-base" : "h-10 px-5 text-sm"} ${look} ${PRESS} ${className}`}
    >
      {burst > 0 && <Sparks key={burst} colors={GOLD_SPARKS} />}
      {children}
    </a>
  );
}

/** An image with a loading state: a soft shimmer until it arrives, then a fade-in. The parent must be `relative`. */
function SmartImg({ className = "", shimmer = "bg-[#1F5E3B]/10", ...img }: ImgHTMLAttributes<HTMLImageElement> & { shimmer?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <span aria-hidden className={`absolute inset-0 animate-pulse ${shimmer}`} />}
      <img
        {...img}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`transition-[opacity,scale] duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </>
  );
}

function SectionHead({ eyebrow, title, blurb, dark, center }: { eyebrow: string; title: string; blurb?: string; dark?: boolean; center?: boolean }) {
  return (
    <FadeInView className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.25em] ${dark ? "text-[#E8B04B]" : "text-[#1F5E3B]"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-editorial text-3xl leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-[#1C241E]"}`}>{title}</h2>
      {blurb && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-white/75" : "text-[#3D4A40]"}`}>{blurb}</p>}
    </FadeInView>
  );
}

/** The hero when PLW hasn't approved a photo yet: brand glows and the business type's icon, never an unrelated stock photo. */
function HeroArt({ Icon }: { Icon: LucideIcon }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute -right-32 -top-48 size-[42rem] rounded-full bg-[#E8B04B]/[0.13] blur-3xl" />
      <div className="absolute -bottom-56 -left-40 size-[40rem] rounded-full bg-[#1F5E3B]/60 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]" />
      <Icon strokeWidth={0.75} className="absolute right-[4%] top-1/2 hidden size-[26rem] -translate-y-1/2 text-white/[0.05] lg:block" />
    </div>
  );
}

function useScrolled(offset = 24): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

function CopyButton({ value, lang }: { value: string; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);
  return (
    <button
      type="button"
      onClick={() => void navigator.clipboard?.writeText(value).then(() => setCopied(true), () => {})}
      aria-label={copied ? pick(lang, "Copied", "Copiado") : pick(lang, "Copy number", "Copiar número")}
      className={`grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 ${PRESS}`}
    >
      <IconSwap swapped={copied} from={<Copy className="size-4" />} to={<Check className="size-4 text-[#E8B04B]" />} />
    </button>
  );
}

/** The full site's contact form. In the demo it checks the fields and says the form comes with the service: it never sends. */
function DemoForm({ lang }: { lang: Lang }) {
  const [invalid, setInvalid] = useState({ name: false, message: false });
  // Bumped only when a field is empty again, so its wrapper remounts and shakes (an empty field loses nothing).
  const [shakes, setShakes] = useState({ name: 0, message: 0 });
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const bad = { name: !String(data.get("name") ?? "").trim(), message: !String(data.get("message") ?? "").trim() };
    setInvalid(bad);
    setShakes((s) => ({ name: s.name + (bad.name ? 1 : 0), message: s.message + (bad.message ? 1 : 0) }));
    setDone(!bad.name && !bad.message);
  }

  const field = "w-full rounded-lg border border-white/12 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/35 outline-none transition-[border-color,box-shadow] focus:border-[#E8B04B]/70 focus:ring-4 focus:ring-[#E8B04B]/15 aria-[invalid=true]:border-red-400/80";
  const label = "mb-1.5 block text-sm font-medium text-white/80";
  const shake = (on: boolean) => (on ? "animate-shake motion-reduce:animate-none" : "");
  return (
    <FadeInView>
      {/* Radii: 3xl (32) − p-2 (8) = 2xl (24) */}
      <form onSubmit={submit} noValidate className="rounded-3xl border border-white/10 bg-white/[0.04] p-2">
        <div className="space-y-4 rounded-2xl bg-[#0F2A1B] p-5 sm:p-7">
          <h3 className="font-editorial text-2xl tracking-tight text-white">{pick(lang, "Send us a message", "Envíenos un mensaje")}</h3>
          <div key={`name-${shakes.name}`} className={shake(invalid.name)}>
            <label htmlFor="plw-name" className={label}>{pick(lang, "Name", "Nombre")}</label>
            <input id="plw-name" name="name" autoComplete="name" aria-invalid={invalid.name} placeholder={pick(lang, "Your name", "Su nombre")} className={field} />
          </div>
          <div>
            <label htmlFor="plw-phone" className={label}>{pick(lang, "Phone (optional)", "Teléfono (opcional)")}</label>
            <input id="plw-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="8888-1234" className={field} />
          </div>
          <div key={`message-${shakes.message}`} className={shake(invalid.message)}>
            <label htmlFor="plw-message" className={label}>{pick(lang, "Message", "Mensaje")}</label>
            <textarea id="plw-message" name="message" rows={4} aria-invalid={invalid.message} placeholder={pick(lang, "How can we help you?", "¿En qué le podemos ayudar?")} className={`${field} resize-none`} />
          </div>
          {(invalid.name || invalid.message) && (
            <p role="alert" className="text-sm text-red-300">{pick(lang, "Please write your name and a message.", "Escriba su nombre y su mensaje.")}</p>
          )}
          <button type="submit" className={`flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E8B04B] font-semibold text-[#0A1F13] hover:bg-[#F2C065] ${PRESS}`}>
            <Send className="size-4" /> {pick(lang, "Send message", "Enviar mensaje")}
          </button>
          {done && (
            <p role="status" className="flex gap-3 rounded-lg border border-[#E8B04B]/30 bg-[#E8B04B]/10 p-4 text-sm leading-relaxed text-[#F5E3BE] animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-[#E8B04B]" />
              {pick(lang,
                "This is a demo: the form comes with the full service, and then messages reach you directly. Contact us to turn it on.",
                "Esto es una demostración: el formulario viene con el servicio completo y, al contratarlo, los mensajes le llegan directo. Contáctenos para activarlo.")}
            </p>
          )}
        </div>
      </form>
    </FadeInView>
  );
}

type GalleryImage = { url: string; alt: string; kind: "generated" | "business" };

/** The approved images (or the template's stock photos), each opening full size. */
function Gallery({ images, lang, brandName }: { images: GalleryImage[]; lang: Lang; brandName: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const focus = useReturnFocus();
  const shown = open === null ? null : images[open];
  const step = (d: number) => setOpen((i) => (i === null ? null : (i + d + images.length) % images.length));
  const label = pick(lang, "Illustration", "Ilustración");
  const cols = images.length === 1 ? "" : images.length === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  const round = `grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 ${PRESS}`;
  return (
    <>
      <div className={`mt-12 grid grid-cols-1 gap-4 ${cols}`}>
        {images.map((img, i) => (
          <FadeInView key={img.url} delay={i * 0.06} className={images.length === 3 && i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <figure className="group">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={pick(lang, `Enlarge: ${img.alt || brandName}`, `Ampliar: ${img.alt || brandName}`)}
                className={`relative block w-full overflow-hidden rounded-2xl bg-[#1F5E3B]/10 ${PRESS}`}
              >
                <SmartImg src={img.url} alt={img.alt || brandName} loading="lazy" className={`w-full object-cover group-hover:scale-[1.04] ${images.length === 1 ? "h-80 sm:h-[28rem]" : "h-72 sm:h-80"}`} />
                {img.kind === "generated" && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">{label}</span>
                )}
                <span aria-hidden className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-[#0A1F13] opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="size-4" />
                </span>
              </button>
              {img.alt && <figcaption className="mt-3 text-sm text-[#3D4A40]">{img.alt}</figcaption>}
            </figure>
          </FadeInView>
        ))}
      </div>

      <Dialog.Root open={shown !== null} onOpenChange={(o) => { if (!o) setOpen(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-[#050C08]/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            {...focus}
            aria-describedby={undefined}
            onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
            className="fixed inset-0 z-[90] grid place-items-center p-4 outline-none sm:p-14 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          >
            {shown && (
              <figure className="w-full max-w-5xl">
                <img src={shown.url} alt={shown.alt || brandName} className="max-h-[78dvh] w-full rounded-2xl object-contain" />
                <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-white/80">
                  <Dialog.Title className="font-medium">{shown.alt || brandName}</Dialog.Title>
                  {shown.kind === "generated" && <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">{label}</span>}
                </figcaption>
              </figure>
            )}
            <Dialog.Close aria-label={pick(lang, "Close", "Cerrar")} className={`absolute right-4 top-4 ${round}`}><X className="size-5" /></Dialog.Close>
            {images.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label={pick(lang, "Previous", "Anterior")} className={`absolute left-3 top-1/2 -translate-y-1/2 ${round}`}><ChevronLeft className="size-5" /></button>
                <button type="button" onClick={() => step(1)} aria-label={pick(lang, "Next", "Siguiente")} className={`absolute right-3 top-1/2 -translate-y-1/2 ${round}`}><ChevronRight className="size-5" /></button>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Homepage chat: the business's confirmed FAQs only                   */
/* ------------------------------------------------------------------ */

type Msg = { from: "bot" | "user"; text: string; /** PLW's voice id for this reply, when the backend supports it. */ answerId?: string };

/** PLW's click-to-hear endpoint: token + the grounded answer's id, nothing else. */
const PLW_VOICE_ENDPOINT = "https://meagbbmittuhdgwnhvxa.supabase.co/functions/v1/plw-tourism-voice";

function TourismChat({ demo, brand, lang, previewToken, topics, Icon, lifted }: {
  demo: SafeTourismDemo;
  brand: BusinessTemplate["brand"];
  lang: Lang;
  previewToken?: string | null;
  topics: string;
  Icon: LucideIcon;
  /** Sit above the sticky mobile call-to-action. */
  lifted: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  // Click-to-hear state per bot message: idle | loading | playing | error.
  const [voice, setVoice] = useState<Record<number, "idle" | "loading" | "playing" | "error">>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const stopAudio = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  };
  // Stop and revoke on unmount; a new reply/playback stops the old one.
  useEffect(() => stopAudio, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const greeted = useRef(false);
  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setMsgs([{ from: "bot", answerId: "welcome", text: pick(lang,
        `Hello! I'm the ${brand.name} assistant. I can answer from the confirmed info on this page — ask me about what we offer or how to reach us.`,
        `¡Hola! Soy el asistente de ${brand.name}. Puedo responder con la información confirmada de esta página — pregúnteme por ${topics}.`) }]);
    }
  }, [open, lang, brand.name, topics]);

  /** A typed question: answering anything is a feature of the full service, not the demo (owner, 2026-11-19). */
  function send(text: string) {
    const v = text.trim();
    if (!v) return;
    setMsgs((m) => [...m, { from: "user", text: v }, { from: "bot", text: L.fullService }]);
    setDraft("");
  }

  /** A suggested question: the business's confirmed answer, which can also be heard. */
  function askFaq(i: number) {
    const f = demo.faqs[i];
    setMsgs((m) => [...m, { from: "user", text: f.question }, { from: "bot", text: f.answer, answerId: `faq:${i}` }]);
  }

  // Click-to-hear: asks PLW to speak this grounded answer by id (never the
  // visitor's question, never arbitrary text). Click-to-play only — never
  // autoplays — and text stays if audio fails or the token is unavailable.
  async function hear(i: number, answerId: string | undefined) {
    if (!answerId) return;
    if (voice[i] === "playing") { stopAudio(); setVoice((v) => ({ ...v, [i]: "idle" })); return; }
    if (!previewToken || voice[i] === "loading") return;
    stopAudio();
    setVoice((v) => ({ ...v, [i]: "loading" }));
    try {
      const res = await fetch(PLW_VOICE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: previewToken, answerId, language: lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      if (!blob.type.includes("audio")) throw new Error("not audio");
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setVoice((s) => ({ ...s, [i]: "idle" })); releaseAudio("faq"); };
      audio.onerror = () => { stopAudio(); setVoice((s) => ({ ...s, [i]: "error" })); releaseAudio("faq"); };
      claimAudio("faq", stopAudio);
      await audio.play();
      setVoice((v) => ({ ...v, [i]: "playing" }));
    } catch {
      stopAudio();
      setVoice((v) => ({ ...v, [i]: "error" }));
    }
  }
  const canSpeak = previewToken !== null;

  const L = pick(lang, {
    ask: "Ask the assistant",
    ph: "Type your question…",
    preview: "Preview: text answers only, from the business's confirmed info.",
    listen: "Hear this answer",
    stop: "Stop",
    loading: "Loading audio…",
    retry: "Retry",
    fullService: "This option comes with the full service, not with the demo. Once you sign up, the assistant answers your customers' questions with your business's information. Contact us to turn it on.",
  }, {
    ask: "Pregunte al asistente",
    ph: "Escriba su pregunta…",
    preview: "Vista previa: respuestas de texto, con la información confirmada del negocio.",
    listen: "Escuchar esta respuesta",
    stop: "Detener",
    loading: "Cargando audio…",
    retry: "Reintentar",
    fullService: "Esta opción viene incluida con el servicio completo, no en la demostración. Al contratarlo, el asistente responde las preguntas de sus clientes con la información de su negocio. Contáctenos para activarlo.",
  });

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={L.ask}
          className={`fixed right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#0A1F13] px-5 py-3.5 font-medium text-white shadow-[0_18px_40px_-12px_rgba(10,31,19,0.6)] ring-1 ring-white/10 hover:bg-[#12301E] animate-in fade-in zoom-in-95 duration-200 motion-reduce:animate-none bottom-5 ${lifted ? "max-md:-translate-y-[4.75rem]" : ""} ${PRESS}`}
        >
          <MessageCircle className="size-5" /> {L.ask}
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            role="dialog"
            aria-label={L.ask}
            // A spring for the one transition that travels: it flicks open from the button's corner.
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] } }}
            transition={reduce ? { duration: 0.15 } : { type: "spring", duration: 0.5, bounce: 0.25 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-5 right-5 z-50 w-[min(380px,calc(100vw-2.5rem))]"
          >
            {/* Radii: panel 3xl (32) − form p-2 (8) = input 2xl (24) */}
            <div className="flex max-h-[min(640px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-3xl border border-[#1F5E3B]/15 bg-white shadow-[0_30px_80px_-20px_rgba(10,31,19,0.45)]">
              <div className="flex shrink-0 items-center gap-3 bg-[#0A1F13] px-4 py-3 text-white">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#E8B04B] text-[#0A1F13]"><Icon className="size-4" aria-hidden /></span>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="truncate text-sm font-bold">{brand.name}</div>
                  <div className="text-[11px] text-white/70">{pick(lang, "Answers from confirmed info", "Responde con información confirmada")}</div>
                </div>
                <button onClick={() => setOpen(false)} aria-label={pick(lang, "Close", "Cerrar")} className={`grid size-8 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white ${PRESS}`}>
                  <X className="size-4" />
                </button>
              </div>

              <div ref={scrollRef} aria-live="polite" className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none`}>
                    <div className={m.from === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-[#1F5E3B] px-4 py-2.5 text-sm text-white"
                      : "max-w-[85%] rounded-2xl rounded-tl-md bg-[#FAF7F0] px-4 py-2.5 text-sm leading-relaxed text-[#1C241E]"}>
                      {m.text}
                      {m.from === "bot" && canSpeak && m.answerId && voice[i] !== "error" && (
                        <button
                          onClick={() => void hear(i, m.answerId)}
                          disabled={voice[i] === "loading"}
                          className="ml-2 inline-flex align-middle text-[#1F5E3B]/60 hover:text-[#1F5E3B] disabled:opacity-60"
                          aria-label={voice[i] === "playing" ? L.stop : voice[i] === "loading" ? L.loading : L.listen}
                          aria-busy={voice[i] === "loading"}
                        >
                          <IconSwap
                            swapped={voice[i] === "playing"}
                            from={voice[i] === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : <Volume2 className="size-3.5" />}
                            to={<Square className="size-3 fill-current" />}
                          />
                        </button>
                      )}
                      {m.from === "bot" && canSpeak && m.answerId && voice[i] === "error" && (
                        <button onClick={() => void hear(i, m.answerId)} className="ml-2 inline-flex align-middle text-[11px] text-amber-700 underline hover:text-amber-900" aria-label={L.retry}>
                          {L.retry}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {demo.faqs.length > 0 && (
                <div className="flex shrink-0 flex-wrap gap-1.5 border-t border-[#1F5E3B]/10 px-3 pt-3">
                  {demo.faqs.slice(0, 3).map((f, i) => (
                    <button key={f.question} onClick={() => askFaq(i)} className={`rounded-full border border-[#1F5E3B]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#1F5E3B] hover:bg-[#1F5E3B]/5 ${PRESS}`}>
                      {f.question}
                    </button>
                  ))}
                </div>
              )}
              <p className="shrink-0 px-4 pt-2 text-center text-[11px] leading-snug text-[#3D4A40]/70">{L.preview}</p>
              <form onSubmit={(e) => { e.preventDefault(); send(draft); }} className="flex shrink-0 gap-2 p-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={L.ph}
                  aria-label={L.ph}
                  className="min-w-0 flex-1 rounded-2xl border border-[#1F5E3B]/15 bg-[#FAF7F0] px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] focus:border-[#1F5E3B]/40 focus:ring-4 focus:ring-[#1F5E3B]/10"
                />
                <button type="submit" aria-label={pick(lang, "Send", "Enviar")} className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-[#1F5E3B] text-white hover:bg-[#287549] ${PRESS}`}>
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* The page                                                            */
/* ------------------------------------------------------------------ */

export default function TourismSite({ template, previewToken }: { template: BusinessTemplate; previewToken?: string | null }) {
  const lang: Lang = template.lockedLang ?? template.defaultLang ?? "es";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuFocus = useReturnFocus();
  const scrolled = useScrolled();
  // The sticky mobile CTA (and the chat button above it) waits until the hero, which has its own, scrolls away.
  const pastHero = useScrolled(Math.round(window.innerHeight * 0.75));
  const { brand, media } = template;
  const demo = tourismDemo(template);
  const phone = publicPhone(brand);
  const t = template.content[lang];
  const TypeIcon = brand.heroIcon;
  // The business type's calls to action: WhatsApp with its own message when the
  // draft has a confirmed phone. A sample without one is still a demo for its
  // owner, so its buttons write to PLW instead (owner decision 2026-11-24).
  const ctas = template.plwSite?.ctas ?? [{ label: t.hero.cta1, message: "" }];
  const plwHref = waLink(PLW_WHATSAPP, pick(lang, `Hi! I saw the sample website for "${brand.name}" and would like more information.`, `¡Hola! Vi la muestra del sitio web de "${brand.name}" y quisiera más información.`));
  const ctaHref = (message: string) => (phone ? waLink(brand.whatsapp || phone.href, message || undefined) : plwHref);
  const askHref = (service: string) =>
    phone ? waLink(brand.whatsapp || phone.href, pick(lang, `Hi! I'd like to ask about: ${service}.`, `¡Hola! Quisiera consultar por: ${service}.`)) : plwHref;
  // The first approved image leads the hero; then the draft's own hero image; then
  // the template's stock photo (tourism only). The other types get HeroArt.
  const approved = demo.approvedImages;
  const stockHero = approved.length === 0 && !demo.heroImage ? media?.hero : undefined;
  const hero = approved[0]?.url ?? (demo.heroImage ? trustedHero(demo.heroImage) : stockHero);
  const heroIsGenerated = approved[0]?.kind === "generated";
  const gallery: GalleryImage[] = approved.length > 0
    ? approved
    : (media?.gallery ?? []).slice(0, 3).map((url, i) => ({ url, alt: template.galleryCaptions?.[lang]?.[i] ?? "", kind: "business" as const }));
  const place = brand.address || brand.city;
  const fullPlace = place && !/costa rica/i.test(place) ? `${place}, Costa Rica` : place;
  const hasAbout = !!demo.description || demo.details.length > 0;
  const steps = t.process.items.length > 0 ? t.process.items : [
    { title: pick(lang, "Write to us", "Escríbanos"), blurb: phone ? pick(lang, "By WhatsApp or phone, tell us what you need.", "Por WhatsApp o por teléfono, cuéntenos qué necesita.") : pick(lang, "Tell us what you need.", "Cuéntenos qué necesita.") },
    { title: pick(lang, "We reply", "Le respondemos"), blurb: pick(lang, "We confirm the details with you directly, no long forms.", "Le confirmamos los detalles directamente, sin formularios largos.") },
    { title: pick(lang, "All set", "Listo"), blurb: pick(lang, "We arrange everything with you. No online payment.", "Coordinamos todo con usted. Sin pagos en línea.") },
  ];
  const nav = [
    demo.services.length > 0 && { href: "#services", label: t.nav.services },
    hasAbout && { href: "#about", label: pick(lang, "About", "Nosotros") },
    gallery.length > 0 && { href: "#gallery", label: pick(lang, "Gallery", "Galería") },
    demo.faqs.length > 0 && { href: "#faq", label: pick(lang, "FAQ", "Preguntas") },
    { href: "#contact", label: t.nav.contact },
  ].filter((n): n is { href: string; label: string } => !!n);
  const secretaryPoints = pick(lang,
    ["Answers with your business's information", SECRETARIA_LANGUAGES.en, "Takes appointment and order requests, after hours too"],
    ["Responde con la información de su negocio", SECRETARIA_LANGUAGES.es, "Toma solicitudes de cita y pedidos, también fuera de horario"]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="plw-site min-h-dvh bg-[#FAF7F0] text-[#1C241E] antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          html:has(.plw-site) { scroll-behavior: smooth; }
          .plw-rise { opacity: 0; translate: 0 16px; animation: plwRise .8s cubic-bezier(.23,1,.32,1) forwards; }
          .plw-rise:nth-child(2) { animation-delay: .07s; }
          .plw-rise:nth-child(3) { animation-delay: .14s; }
          .plw-rise:nth-child(4) { animation-delay: .21s; }
          .plw-rise:nth-child(5) { animation-delay: .28s; }
          .plw-rise:nth-child(6) { animation-delay: .35s; }
        }
        @keyframes plwRise { to { opacity: 1; translate: 0 0; } }
      `}</style>

      {/* Header: clear over the hero, solid once the page scrolls */}
      <header className="fixed inset-x-0 top-0 z-50">
        {/* PLW samples only (they have a preview token): the client is looking at a demo, not their site. */}
        {previewToken && (
          <p className="relative bg-[#E8B04B] px-4 py-1.5 text-center text-[11px] leading-snug text-[#0A1F13] sm:text-xs">
            <Sparkles className="-mt-0.5 mr-1.5 inline size-3.5" aria-hidden />
            <strong>{pick(lang, "This is just a demo.", "Esto es solo una demostración.")}</strong>{" "}
            {pick(lang,
              "Your real site includes all this, more features and a premium custom design.",
              "Su sitio real incluye todo esto, más funciones y un diseño premium a la medida.")}
          </p>
        )}
        <div className={`transition-[background-color,box-shadow] duration-300 ${scrolled || menuOpen ? "bg-[#0A1F13]/90 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md" : "bg-gradient-to-b from-black/35 to-transparent"}`}>
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <a href="#top" className="flex min-w-0 items-center gap-2.5 font-semibold text-white">
              {brand.logo
                ? <img src={brand.logo} alt="" className="size-9 rounded-full object-cover" />
                : <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#E8B04B] text-[#0A1F13]"><TypeIcon className="size-4" aria-hidden /></span>}
              <span className="truncate">{brand.name}</span>
            </a>
            <nav className="hidden items-center gap-1 text-sm text-white/80 md:flex">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="rounded-full px-3 py-2 transition-colors hover:bg-white/10 hover:text-white">{n.label}</a>
              ))}
              <Cta href={ctaHref(ctas[0].message)} external size="sm" className="ml-2">{ctas[0].label}</Cta>
            </nav>
            <button
              className={`grid size-10 place-items-center rounded-full text-white hover:bg-white/10 md:hidden ${PRESS}`}
              onClick={() => setMenuOpen(true)}
              aria-label={pick(lang, "Open menu", "Abrir menú")}
              aria-expanded={menuOpen}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            {...menuFocus}
            aria-describedby={undefined}
            className="fixed inset-x-0 top-0 z-[70] rounded-b-3xl bg-[#0A1F13] px-6 pb-8 pt-20 text-white duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-4 md:hidden"
          >
            <Dialog.Title className="sr-only">{pick(lang, "Menu", "Menú")}</Dialog.Title>
            <Dialog.Close aria-label={pick(lang, "Close menu", "Cerrar menú")} className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full hover:bg-white/10 ${PRESS}`}>
              <X className="size-6" />
            </Dialog.Close>
            <nav className="flex flex-col">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg font-medium">{n.label}</a>
              ))}
            </nav>
            <Cta href={ctaHref(ctas[0].message)} external className="mt-6 w-full">{ctas[0].label}</Cta>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Hero: the main feature, the business itself */}
      <section id="top" className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-[#0A1F13]">
        {hero ? (
          <div className="absolute inset-0">
            <SmartImg src={hero} alt={approved[0]?.alt || brand.name} loading="eager" fetchPriority="high" shimmer="bg-white/5" className="size-full object-cover" />
          </div>
        ) : (
          <HeroArt Icon={TypeIcon} />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#08150E] via-[#08150E]/55 to-[#08150E]/25" />
        {hero && (stockHero || heroIsGenerated) && (
          <div className="absolute right-3 top-32 rounded-full bg-black/40 px-2.5 py-1 text-[10px] text-white/80 backdrop-blur">
            {heroIsGenerated ? pick(lang, "Illustration", "Ilustración") : pick(lang, "Illustrative photo", "Foto ilustrativa")}
          </div>
        )}
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-40 sm:px-6 sm:pb-24">
          <div className="max-w-3xl text-white">
            <p className="plw-rise inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8B04B] backdrop-blur">
              <TypeIcon className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{t.hero.eyebrow}{brand.city && ` · ${brand.city}`}</span>
            </p>
            <h1 className="plw-rise mt-6 font-editorial text-[2.75rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">{brand.name}</h1>
            <p className="plw-rise mt-4 font-editorial text-2xl italic text-white/85 sm:text-3xl">{t.hero.title1} {t.hero.title2}</p>
            {demo.highlight && (
              <p className="plw-rise mt-6 inline-flex items-center gap-2 rounded-full bg-[#E8B04B]/15 px-4 py-2 text-sm font-medium text-[#F5E3BE] ring-1 ring-[#E8B04B]/30">
                <Sparkles className="size-4 shrink-0 text-[#E8B04B]" aria-hidden /> {demo.highlight}
              </p>
            )}
            <div className="plw-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Cta href={ctaHref(ctas[0].message)} external><MessageCircle className="size-5" /> {ctas[0].label}</Cta>
              {ctas[1] ? (
                <Cta variant="ghost" href={ctaHref(ctas[1].message)} external><MessageCircle className="size-5" /> {ctas[1].label}</Cta>
              ) : demo.services.length > 0 && (
                <Cta variant="ghost" href="#services">{pick(lang, "See services", "Ver servicios")} <ArrowRight className="size-4" /></Cta>
              )}
            </div>
            {phone && (
              <a href={phone.href} className="plw-rise mt-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
                <Phone className="size-4" /> {pick(lang, "Or call us at", "O llámenos al")} {phone.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Services: each one can be asked about directly */}
      {demo.services.length > 0 && (
        <section id="services" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHead eyebrow={t.nav.services} title={t.services.title} blurb={t.services.blurb} />
            <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {demo.services.map((s, i) => (
                <li key={`${s}-${i}`}>
                  <FadeInView delay={Math.min(i, 5) * 0.05} className="h-full">
                    <div className="group flex h-full flex-col rounded-2xl border border-[#1F5E3B]/12 bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#1F5E3B]/30 hover:shadow-[0_24px_50px_-28px_rgba(10,31,19,0.45)]">
                      <span className="grid size-12 place-items-center rounded-xl bg-[#1F5E3B]/[0.08] text-[#1F5E3B] transition-colors duration-300 group-hover:bg-[#1F5E3B] group-hover:text-white">
                        <TypeIcon className="size-5" aria-hidden />
                      </span>
                      <h3 className="mt-6 text-lg font-semibold leading-snug text-[#1C241E]">{s}</h3>
                      <a href={askHref(s)} {...EXTERNAL} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[#1F5E3B]">
                        {pick(lang, "Ask about it", "Consultar")} <ArrowRight className="size-4 transition-[translate] duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </FadeInView>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* About: the draft's description and confirmed facts */}
      {hasAbout && (
        <section id="about" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto grid max-w-6xl [&>*]:min-w-0 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <SectionHead eyebrow={pick(lang, "About us", "Sobre nosotros")} title={pick(lang, `Meet ${brand.name}`, `Conozca ${brand.name}`)} />
              {demo.description && (
                <FadeInView><p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-[#3D4A40]">{demo.description}</p></FadeInView>
              )}
            </div>
            {demo.details.length > 0 && (
              <dl className="grid content-start gap-3 sm:grid-cols-2">
                {demo.details.map((d, i) => (
                  <FadeInView key={`${d.label}-${i}`} delay={Math.min(i, 5) * 0.05} className="rounded-2xl bg-[#FAF7F0] p-5 ring-1 ring-[#1F5E3B]/10">
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F5E3B]">{d.label}</dt>
                    <dd className="mt-2 text-lg font-semibold text-[#1C241E]">{d.value}</dd>
                  </FadeInView>
                ))}
              </dl>
            )}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="relative overflow-hidden bg-[#0A1F13] px-4 py-24 text-white sm:px-6 sm:py-32">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-0 size-[36rem] rounded-full bg-[#E8B04B]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHead dark center eyebrow={pick(lang, "How it works", "Cómo funciona")} title={pick(lang, "Simple, from the first message", "Simple, desde el primer mensaje")} />
          <ol className={`mt-14 grid gap-4 ${steps.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
            {steps.map((s, i) => (
              <li key={s.title}>
                <FadeInView delay={i * 0.07} className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                  <span className="font-editorial text-5xl text-[#E8B04B]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/70">{s.blurb}</p>
                </FadeInView>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery: every approved image, else the template's stock photos, else nothing */}
      {gallery.length > 0 && (
        <section id="gallery" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHead
              eyebrow={pick(lang, "Gallery", "Galería")}
              title={pick(lang, "A closer look", "Un vistazo")}
              blurb={approved.length === 0 ? pick(lang, "Illustrative photos of Costa Rica.", "Fotos ilustrativas de Costa Rica.") : undefined}
            />
            <Gallery images={gallery} lang={lang} brandName={brand.name} />
          </div>
        </section>
      )}

      {/* Secretaria IA */}
      {previewToken && (
        <section id="secretaria" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto grid max-w-6xl [&>*]:min-w-0 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHead
                eyebrow="Secretaria IA"
                title={pick(lang, "A receptionist that answers your customers", "Una recepcionista que atiende a sus clientes")}
                blurb={pick(lang, `Try her: talk to her like a customer of ${brand.name} would.`, `Pruébela: hable con ella como lo haría un cliente de ${brand.name}.`)}
              />
              <FadeInView>
                <ul className="mt-8 space-y-3">
                  {secretaryPoints.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#1F5E3B] text-white"><Check className="size-3.5" /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </FadeInView>
            </div>
            <div className="mx-auto w-full max-w-lg">
              <SecretariaCard
                previewToken={previewToken}
                businessName={brand.name}
                businessType={template.category ?? ""}
                standaloneLink={`${window.location.pathname}/secretaria`}
              />
            </div>
          </div>
        </section>
      )}

      {/* FAQ: the draft's confirmed questions; opening is smoothed globally (interpolate-size) */}
      {demo.faqs.length > 0 && (
        <section id="faq" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto grid max-w-6xl [&>*]:min-w-0 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <SectionHead eyebrow={pick(lang, "FAQ", "Preguntas")} title={t.faq.title} />
              <FadeInView>
                <p className="mt-6 text-[#3D4A40]">
                  {pick(lang, "Can't find your answer?", "¿No encuentra su respuesta?")}{" "}
                  <a href="#contact" className="font-semibold text-[#1F5E3B] underline decoration-[#1F5E3B]/30 underline-offset-4 transition-colors hover:decoration-[#1F5E3B]">
                    {pick(lang, "Write to us", "Escríbanos")}
                  </a>
                </p>
              </FadeInView>
            </div>
            <div className="space-y-3">
              {demo.faqs.map((f, i) => (
                <details key={`${f.question}-${i}`} className="group rounded-2xl border border-[#1F5E3B]/12 bg-white transition-[border-color,box-shadow] duration-300 open:border-[#1F5E3B]/25 open:shadow-[0_20px_40px_-28px_rgba(10,31,19,0.45)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-[#1C241E] [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#1F5E3B]/[0.08] text-[#1F5E3B] transition-[rotate,background-color,color] duration-300 group-open:rotate-45 group-open:bg-[#1F5E3B] group-open:text-white">
                      <Plus className="size-4" />
                    </span>
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed text-[#3D4A40]">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location: the city on a map, and directions */}
      {fullPlace && (
        <section id="location" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto grid max-w-6xl [&>*]:min-w-0 items-center gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
            <div>
              <SectionHead eyebrow={pick(lang, "Location", "Ubicación")} title={pick(lang, `Find us in ${brand.city || place}`, `Encuéntrenos en ${brand.city || place}`)} />
              <FadeInView>
                <p className="mt-6 flex items-start gap-3 text-lg text-[#3D4A40]"><MapPin className="mt-1 size-5 shrink-0 text-[#1F5E3B]" /> {fullPlace}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullPlace)}`}
                  {...EXTERNAL}
                  className={`mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-[#1F5E3B]/25 px-6 font-semibold text-[#1F5E3B] hover:bg-[#1F5E3B]/5 ${PRESS}`}
                >
                  <Navigation className="size-4" /> {pick(lang, "Get directions", "Cómo llegar")}
                </a>
              </FadeInView>
            </div>
            {/* Radii: 3xl (32) − p-2 (8) = 2xl (24) */}
            <FadeInView className="rounded-3xl border border-[#1F5E3B]/12 bg-[#FAF7F0] p-2 shadow-[0_30px_60px_-40px_rgba(10,31,19,0.5)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]">
                <span aria-hidden className="absolute inset-0 animate-pulse bg-[#1F5E3B]/10" />
                <iframe
                  title={pick(lang, `Map: ${fullPlace}`, `Mapa: ${fullPlace}`)}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(fullPlace)}&hl=${lang}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative size-full border-0"
                />
              </div>
            </FadeInView>
          </div>
        </section>
      )}

      {/* Contact: actions only with a confirmed public phone; the form is the full service's */}
      <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-[#0A1F13] px-4 py-24 text-white sm:px-6 sm:py-32">
        <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-40 size-[40rem] rounded-full bg-[#1F5E3B]/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl [&>*]:min-w-0 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead dark eyebrow={t.nav.contact} title={t.contact.title} blurb={t.contact.blurb} />
            <FadeInView>
              {phone ? (
                <div className="mt-10 space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Cta href={ctaHref(ctas[0].message)} external><MessageCircle className="size-5" /> WhatsApp</Cta>
                    <Cta variant="ghost" href={phone.href}><Phone className="size-5" /> {pick(lang, "Call", "Llamar")}</Cta>
                  </div>
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1 pl-5 pr-1">
                    <span className="text-lg font-semibold tabular-nums">{phone.phone}</span>
                    <CopyButton value={phone.phone} lang={lang} />
                  </div>
                </div>
              ) : (
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="font-semibold">{pick(lang, "Contact details coming soon", "Datos de contacto próximamente")}</p>
                  <p className="mt-2 text-sm text-white/70">
                    {pick(lang, "This is a preview — the business's phone is not published yet. Contact us to add it.", "Esto es una vista previa — el teléfono del negocio aún no está publicado. Contáctenos para agregarlo.")}
                  </p>
                  <Cta href={plwHref} external size="sm" className="mt-4"><MessageCircle className="size-4" /> {pick(lang, "Contact us on WhatsApp", "Contáctenos por WhatsApp")}</Cta>
                </div>
              )}
              {fullPlace && <p className="mt-8 flex items-center gap-2 text-white/70"><MapPin className="size-4 shrink-0" /> {fullPlace}</p>}
            </FadeInView>
          </div>
          <DemoForm lang={lang} />
        </div>
      </section>

      <footer className={`bg-[#050C08] px-4 pt-16 text-sm text-white/60 sm:px-6 ${phone ? "pb-28 md:pb-10" : "pb-10"}`}>
        <div className="mx-auto grid max-w-6xl [&>*]:min-w-0 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5 text-base font-semibold text-white">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#E8B04B] text-[#0A1F13]"><TypeIcon className="size-4" aria-hidden /></span>
              {brand.name}
            </a>
            <p className="mt-4 max-w-xs leading-relaxed">{t.hero.title1} {t.hero.title2}{brand.city && ` · ${brand.city}`}</p>
          </div>
          <nav aria-label={pick(lang, "Sections", "Secciones")}>
            <p className="font-semibold text-white">{pick(lang, "Sections", "Secciones")}</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => <li key={n.href}><a href={n.href} className="transition-colors hover:text-white">{n.label}</a></li>)}
            </ul>
          </nav>
          {(phone || fullPlace) && (
            <div>
              <p className="font-semibold text-white">{t.nav.contact}</p>
              <ul className="mt-4 space-y-2.5">
                {phone && <li><a href={phone.href} className="inline-flex items-center gap-2 transition-colors hover:text-white"><Phone className="size-4" /> {phone.phone}</a></li>}
                {phone && <li><a href={ctaHref(ctas[0].message)} {...EXTERNAL} className="inline-flex items-center gap-2 transition-colors hover:text-white"><MessageCircle className="size-4" /> WhatsApp</a></li>}
                {fullPlace && <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> {fullPlace}</li>}
              </ul>
            </div>
          )}
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-col justify-between gap-2 border-t border-white/10 pt-6 sm:flex-row">
          <span>© {new Date().getFullYear()} {brand.name}. {t.footer.rights}</span>
          {previewToken && <span>{pick(lang, "Demo site by Professional Latino Workers", "Sitio de demostración por Professional Latino Workers")}</span>}
        </div>
      </footer>

      {/* Sticky mobile call to action — only with a confirmed public phone */}
      {phone && (
        <div inert={!pastHero} className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-300 md:hidden ${pastHero ? "" : "translate-y-[calc(100%+1rem)] opacity-0"}`}>
          <Cta href={ctaHref(ctas[0].message)} external className="pointer-events-auto w-full"><MessageCircle className="size-5" /> {ctas[0].label}</Cta>
        </div>
      )}
      <TourismChat
        demo={demo}
        brand={brand}
        lang={lang}
        previewToken={previewToken}
        topics={template.plwSite?.chatTopics ?? pick(lang, "what we offer or how to reach us", "lo que ofrecemos o cómo contactarnos")}
        Icon={TypeIcon}
        lifted={!!phone && pastHero}
      />
    </div>
  );
}
