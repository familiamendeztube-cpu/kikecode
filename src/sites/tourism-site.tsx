import { useEffect, useRef, useState } from "react";
import { Menu, X, MapPin, MessageCircle, Send, Info, HelpCircle, Volume2, Sparkles } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import type { BusinessTemplate, Lang, TourismDemo } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { waLink } from "@/sites/shared/whatsapp";
import { useReturnFocus } from "@/sites/shared/return-focus";
import { claimAudio, releaseAudio } from "@/sites/shared/site-audio";
import { SecretariaCard } from "@/sites/shared/secretaria-card";

/*
  The PLW tourism demo site: premium editorial Costa Rica travel direction.
  Full-bleed hero, warm off-white typography, forest green, generous spacing.

  Honesty rules this file enforces:
  - It shows only what the draft supplies (brand + overrides.tourismDemo) and
    neutral copy. No invented prices, reviews, amenities or hours.
  - The homepage chat answers ONLY from the draft's confirmed FAQs, details
    and services. Rates, hours and availability are always "unconfirmed"
    unless a confirmed fact says otherwise — the chat never invents them and
    never takes a booking.
  - Contact actions appear only when the draft has a confirmed public phone.
  - Gallery photos from the stock library carry an "illustrative" note until
    the business's own photos replace them. AI-generated approved images are
    labeled "Imagen generada con IA · ilustrativa". Candidates and input
    sources are never shown — only the images PLW approved.
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
/* Homepage chat: text Q&A from confirmed brief/FAQ only               */
/* ------------------------------------------------------------------ */

type Msg = { from: "bot" | "user"; text: string; /** PLW's voice id for this reply, when the backend supports it. */ answerId?: string };

/** PLW's click-to-hear endpoint: token + the grounded answer's id, nothing else. */
const PLW_VOICE_ENDPOINT = "https://meagbbmittuhdgwnhvxa.supabase.co/functions/v1/plw-tourism-voice";

function answerFromBrief(q: string, demo: SafeTourismDemo, lang: Lang, brandName: string): { text: string; answerId?: string } {
  const text = q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 1. An exact (normalized) FAQ match wins.
  const faqIdx = demo.faqs.findIndex((f) => norm(f.question) === text);
  if (faqIdx >= 0) return { text: demo.faqs[faqIdx].answer, answerId: `faq:${faqIdx}` };

  // 2. Word overlap over FAQ questions, then confirmed details.
  const words = text.split(/\s+/).filter((w) => w.length > 2);
  let best: { score: number; answer: string; idx: number } | null = null;
  for (let idx = 0; idx < demo.faqs.length; idx++) {
    const f = demo.faqs[idx];
    const qWords = norm(f.question).split(/\s+/).filter((w) => w.length > 2);
    const overlap = words.filter((w) => qWords.includes(w)).length;
    if (overlap > 0 && (!best || overlap > best.score)) best = { score: overlap, answer: f.answer, idx };
  }
  if (best) return { text: best.answer, answerId: `faq:${best.idx}` };

  for (const d of demo.details) {
    const dWords = norm(d.label).split(/\s+/).filter((w) => w.length > 2);
    if (words.some((w) => dWords.includes(w))) {
      return { text: `${d.label}: ${d.value}`, answerId: "about" };
      }
  }

  const matched = q.match(/\b(punto|encuentro|meeting|encuentro|ubicaci[oó]n|location|d[oó]nde|where|direcci[oó]n|address)\b/);
  if (matched) {
    const fact = demo.details.find((d) => d.label.includes("Punto de encuentro")) ?? demo.details[0];
    if (fact) return { text: `${fact.label}: ${fact.value}`, answerId: "location" };
  }

  // 3. Confirmed services: name them; never invent availability for one.
  if (demo.services.some((s) => words.some((w) => norm(s).includes(w)))) {
    return {
      text: pick(lang,
        `We offer "${demo.services.find((s) => norm(s).includes(words.find((w) => norm(s).includes(w)) ?? ""))}" — ask us for current availability.`,
        `Ofrecemos "${demo.services.find((s) => norm(s).includes(words.find((w) => norm(s).includes(w)) ?? ""))}" — consúltenos por disponibilidad actual.`),
      answerId: "services",
    };
  }

  // 4. Honest fallbacks: rates, hours and availability are unconfirmed unless a fact says otherwise.
  if (/\b(precio|precios|costo|cuanto|cuánto|tarifa|rate|rates|price|prices)\b/.test(text)) {
    return { text: pick(lang,
      `I don't have confirmed rates yet. Write to us on WhatsApp and we'll answer with the current price for "${brandName}".`,
      `Aún no tengo tarifas confirmadas. Escríbanos por WhatsApp y le respondemos con el precio actual de "${brandName}".`) };
  }
  if (/\b(horario|horarios|hora|abierto|open|hours|schedule)\b/.test(text)) {
    return { text: pick(lang,
      "I don't have confirmed opening hours yet — message us and we'll reply with them.",
      "Aún no tengo horarios confirmados — escríbanos y le respondemos con ellos.") };
  }
  if (/\b(disponibilidad|disponible|availability|available|fecha|fechas|reserva|reservar|booking|book|slot)\b/.test(text)) {
    return { text: pick(lang,
      "I can't confirm availability from here. Write to us and we'll answer with real dates.",
      "No puedo confirmar disponibilidad desde aquí. Escríbanos y le respondemos con fechas reales.") };
  }

  return { text: pick(lang,
    "I can only answer with what the business confirmed. I've noted your question — send it on WhatsApp and a person will reply.",
    "Solo puedo responder con lo que el negocio ha confirmado. Anoté su pregunta — envíela por WhatsApp y una persona le responde.") };
}

function TourismChat({ demo, brand, lang, previewToken, topics }: { demo: SafeTourismDemo; brand: BusinessTemplate["brand"]; lang: Lang; previewToken?: string | null; topics: string }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
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

  function send(text: string) {
    const v = text.trim();
    if (!v) return;
    const a = answerFromBrief(v, demo, lang, brand.name);
    setMsgs((m) => [...m, { from: "user", text: v }, { from: "bot", text: a.text, answerId: a.answerId }]);
    setDraft("");
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
    failed: "Audio unavailable — text remains.",
    retry: "Retry",
  }, {
    ask: "Pregunte al asistente",
    ph: "Escriba su pregunta…",
    preview: "Vista previa: respuestas de texto, con la información confirmada del negocio.",
    listen: "Escuchar esta respuesta",
    stop: "Detener",
    loading: "Cargando audio…",
    failed: "Audio no disponible — el texto permanece.",
    retry: "Reintentar",
  });

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#0A1F13] text-white px-5 py-3.5 shadow-2xl hover:scale-[1.03] active:scale-95 transition-transform"
          aria-label={L.ask}
        >
          <MessageCircle className="w-5 h-5" /> {L.ask}
        </button>
      )}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[min(370px,calc(100vw-2.5rem))] origin-bottom-right">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[75vh]">
            <div className="px-4 py-3 flex items-center gap-3 text-white shrink-0 bg-[#0A1F13]">
              <div className="w-9 h-9 rounded-full grid place-items-center bg-white/20 font-extrabold">{brand.name.charAt(0)}</div>
              <div className="flex-1 leading-tight">
                <div className="font-bold text-sm">{brand.name}</div>
                <div className="text-[11px] opacity-80">{pick(lang, "Answers from confirmed info", "Responde con información confirmada")}</div>
              </div>
              <button onClick={() => setOpen(false)} aria-label={pick(lang, "Close", "Cerrar")} className="opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
            </div>
            <div ref={scrollRef} aria-live="polite" className="p-4 space-y-3 overflow-y-auto">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={m.from === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-white bg-[#1F5E3B]"
                    : "max-w-[85%] rounded-2xl rounded-tl-md px-4 py-2.5 text-sm text-slate-700 bg-slate-50"}>
                    {m.text}
                    {m.from === "bot" && canSpeak && m.answerId && voice[i] !== "error" && (
                      <button
                        onClick={() => void hear(i, m.answerId)}
                        disabled={voice[i] === "loading"}
                        className="ml-2 inline-flex text-slate-400 hover:text-slate-600 align-middle disabled:opacity-50"
                        aria-label={voice[i] === "playing" ? L.stop : L.listen}
                        aria-busy={voice[i] === "loading"}
                      >
                        {voice[i] === "loading"
                          ? <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-label={L.loading} />
                          : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    )}
                    {m.from === "bot" && canSpeak && m.answerId && voice[i] === "error" && (
                      <button onClick={() => void hear(i, m.answerId)} className="ml-2 inline-flex text-amber-700 hover:text-amber-900 align-middle text-[11px] underline" aria-label={L.retry}>
                        {L.retry}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(draft); }} className="p-3 border-t border-slate-100 flex gap-2 shrink-0">
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={L.ph} aria-label={L.ph}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200" />
              <button type="submit" aria-label={pick(lang, "Send", "Enviar")} className="w-10 grid place-items-center rounded-xl bg-[#1F5E3B] text-white">
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="px-4 pb-3 text-[11px] text-amber-800 bg-amber-50 text-center leading-snug">{L.preview}</p>
            {demo.faqs.length > 0 && (
              <div className="px-4 pb-4 flex flex-wrap gap-1.5 bg-amber-50">
                {demo.faqs.slice(0, 3).map((f) => (
                  <button key={f.question} onClick={() => send(f.question)} className="text-xs font-semibold rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[#1F5E3B] hover:bg-slate-50">
                    {f.question}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function TourismSite({ template, previewToken }: { template: BusinessTemplate; previewToken?: string | null }) {
  const lang: Lang = template.lockedLang ?? template.defaultLang ?? "es";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuFocus = useReturnFocus();
  const { brand, media } = template;
  const demo = tourismDemo(template);
  const phone = publicPhone(brand);
  const t = template.content[lang];
  const TypeIcon = brand.heroIcon;
  // The business type's calls to action: WhatsApp with its own message when the
  // draft has a confirmed phone, else the contact section.
  const ctas = template.plwSite?.ctas ?? [{ label: t.hero.cta1, message: "" }];
  const ctaHref = (message: string) => (phone ? waLink(brand.whatsapp || phone.href, message || undefined) : "#contact");
  const external = phone ? { target: "_blank", rel: "noopener noreferrer" } : {};
  // The first approved image leads the hero; then the draft's own hero image; then
  // the template's stock photo (tourism only). The other types stay plain.
  const approved = demo.approvedImages;
  const stockHero = approved.length === 0 && !demo.heroImage ? media?.hero : undefined;
  const hero = approved[0]?.url ?? (demo.heroImage ? trustedHero(demo.heroImage) : stockHero);
  const heroIsGenerated = approved[0]?.kind === "generated";
  const gallery = media?.gallery ?? [];
  const place = brand.address || brand.city;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-dvh bg-[#FAF7F0] text-[#1C241E] antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        .tourism-display { font-family: 'Playfair Display', Georgia, serif; }
        @media (prefers-reduced-motion: no-preference) {
          .tourism-reveal { opacity: 0; transform: translateY(14px); animation: tourismReveal .7s cubic-bezier(.23,1,.32,1) forwards; }
          .tourism-reveal:nth-child(2) { animation-delay: .08s; }
        }
        @keyframes tourismReveal { to { opacity: 1; transform: none; } }
      `}</style>

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="absolute inset-0 bg-[#0A1F13]/80 backdrop-blur-md" />
        {/* PLW samples only (they have a preview token): the client is looking at a demo, not their site. */}
        {previewToken && (
          <p className="relative bg-[#E8B04B] px-4 py-1.5 text-center text-[11px] sm:text-xs leading-snug text-[#0A1F13]">
            <Sparkles className="inline w-3.5 h-3.5 -mt-0.5 mr-1.5" aria-hidden />
            <strong>{pick(lang, "This is just a demo.", "Esto es solo una demostración.")}</strong>{" "}
            {pick(lang,
              "Your real site includes all this, more features and a premium custom design.",
              "Su sitio real incluye todo esto, más funciones y un diseño premium a la medida.")}
          </p>
        )}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-white font-semibold tracking-wide">
            {brand.logo ? <img src={brand.logo} alt="" className="w-8 h-8 rounded-full object-cover" /> : <span className="w-8 h-8 rounded-full bg-[#E8B04B] grid place-items-center text-[#0A1F13]"><TypeIcon className="w-4 h-4" aria-hidden /></span>}
            {brand.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/85">
            {demo.services.length > 0 && <a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a>}
            {demo.faqs.length > 0 && <a href="#faq" className="hover:text-white transition-colors">FAQ</a>}
            <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
            {phone && <a href={phone.href} className="rounded-full bg-[#E8B04B] text-[#0A1F13] px-4 py-1.5 font-bold hover:bg-[#f2c065] transition-colors">{phone.phone}</a>}
          </nav>
          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(true)} aria-label={pick(lang, "Open menu", "Abrir menú")} aria-expanded={menuOpen}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 z-[60]" />
          <Dialog.Content {...menuFocus} className="fixed inset-x-0 top-0 z-[70] bg-[#0A1F13] text-white px-6 pb-6 pt-20 md:hidden">
            <Dialog.Title className="sr-only">{pick(lang, "Menu", "Menú")}</Dialog.Title>
            <Dialog.Close aria-label={pick(lang, "Close menu", "Cerrar menú")} className="absolute top-5 right-5 p-2 text-white"><X className="w-6 h-6" /></Dialog.Close>
            <nav className="flex flex-col gap-5 text-lg">
              {demo.services.length > 0 && <a href="#services" onClick={() => setMenuOpen(false)}>{t.nav.services}</a>}
              {demo.faqs.length > 0 && <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>}
              <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
              {phone && <a href={phone.href} onClick={() => setMenuOpen(false)}>{phone.phone}</a>}
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Hero */}
      <section id="top" className="relative min-h-[92svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {hero ? <img src={hero} alt={approved[0]?.alt || brand.name} className="w-full h-full object-cover" loading="eager" /> : <div className="w-full h-full bg-[#12301E]" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08150E] via-[#08150E]/55 to-[#08150E]/20" />
          {(stockHero || heroIsGenerated) && (
            <div className="absolute top-32 right-3 rounded-full bg-black/40 text-white/80 text-[10px] px-2.5 py-1 backdrop-blur">
              {heroIsGenerated ? pick(lang, "Illustration", "Ilustración") : pick(lang, "Illustrative photo", "Foto ilustrativa")}
            </div>
          )}
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 pt-32">
          <div className="tourism-reveal max-w-2xl text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8B04B] mb-4">{t.hero.eyebrow}{brand.city && ` · ${brand.city}`}</p>
            <h1 className="tourism-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
              {brand.name}
              <span className="mt-2 block text-2xl sm:text-3xl lg:text-4xl font-normal italic text-white/90">{t.hero.title1} {t.hero.title2}</span>
            </h1>
            {demo.description && <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed">{demo.description}</p>}
            {demo.highlight && (
              <p className="mt-6 inline-block rounded-full border border-[#E8B04B]/40 bg-[#E8B04B]/15 text-[#F5E3BE] px-4 py-2 text-sm font-medium">{demo.highlight}</p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href={ctaHref(ctas[0].message)} {...external} className="tourism-reveal inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8B04B] hover:bg-[#f2c065] px-7 py-4 text-[#0A1F13] font-bold transition-colors">
                <MessageCircle className="w-5 h-5" /> {ctas[0].label}
              </a>
              {ctas[1] ? (
                <a href={ctaHref(ctas[1].message)} {...external} className="tourism-reveal inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur px-7 py-4 text-white font-semibold transition-colors">
                  <MessageCircle className="w-5 h-5" /> {ctas[1].label}
                </a>
              ) : demo.services.length > 0 && (
                <a href="#services" className="tourism-reveal inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur px-7 py-4 text-white font-semibold transition-colors">
                  {pick(lang, "See services", "Ver servicios")}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      {demo.services.length > 0 && (
        <section id="services" className="py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1F5E3B] mb-3">{t.nav.services}</p>
              <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight">{t.services.title}</h2>
              <p className="mt-4 text-[#3D4A40] leading-relaxed">{t.services.blurb}</p>
            </div>
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {demo.services.map((s, i) => (
                <li key={`${s}-${i}`} className="tourism-reveal group rounded-xl border border-[#1F5E3B]/15 bg-white hover:border-[#1F5E3B]/40 hover:shadow-lg transition-all p-6">
                  <TypeIcon className="w-5 h-5 text-[#1F5E3B] mb-3" aria-hidden />
                  <div className="font-semibold text-[#1C241E]">{s}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Confirmed facts */}
      {demo.details.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-white border-y border-[#1F5E3B]/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="tourism-display text-2xl sm:text-3xl tracking-tight flex items-center gap-3">
              <Info className="w-5 h-5 text-[#1F5E3B]" /> {pick(lang, "Good to know", "Datos confirmados")}
            </h2>
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {demo.details.map((d, i) => (
                <div key={`${d.label}-${i}`} className="border-l-2 border-[#1F5E3B]/25 pl-4">
                  <dt className="text-xs font-bold uppercase tracking-widest text-[#1F5E3B]">{d.label}</dt>
                  <dd className="mt-1 text-[#1C241E] font-medium">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Gallery: every approved image (the first also leads the hero), else the template's stock photos, else nothing */}
      {(approved.length > 0 || gallery.length > 0) && (
        <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight">{pick(lang, "Gallery", "Galería")}</h2>
            {approved.length > 0 ? (
              <div className={`mt-10 grid grid-cols-1 gap-4 ${approved.length === 3 ? "sm:grid-cols-3" : approved.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {approved.map((img) => (
                  <figure key={img.url} className="tourism-reveal">
                    <div className="overflow-hidden rounded-xl"><img src={img.url} alt={img.alt || brand.name} className="w-full h-64 sm:h-80 object-cover hover:scale-[1.03] transition-transform duration-500" loading="lazy" /></div>
                    <figcaption className="pt-3 text-sm text-[#3D4A40] flex items-center justify-between gap-2">
                      <span>{img.alt}</span>
                      {img.kind === "generated" && <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-[#1F5E3B]/70">{pick(lang, "Illustration", "Ilustración")}</span>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-3 text-sm text-[#3D4A40]/70">{pick(lang, "Illustrative photos of Costa Rica.", "Fotos ilustrativas de Costa Rica.")}</p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {gallery.slice(0, 3).map((src, i) => (
                    <figure key={src} className="tourism-reveal">
                      <div className="overflow-hidden rounded-xl"><img src={src} alt={(template.galleryCaptions?.[lang]?.[i]) ?? brand.name} className="w-full h-64 sm:h-80 object-cover hover:scale-[1.03] transition-transform duration-500" loading="lazy" /></div>
                      <figcaption className="pt-3 text-sm text-[#3D4A40]">{template.galleryCaptions?.[lang]?.[i]}</figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      {demo.faqs.length > 0 && (
        <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-[#1F5E3B]" /> {t.faq.title}
            </h2>
            <div className="mt-10 divide-y divide-[#1F5E3B]/10">
              {demo.faqs.map((f, i) => (
                <details key={`${f.question}-${i}`} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-[#1C241E] group-open:text-[#1F5E3B] transition-colors">
                    {f.question}
                    <HelpCircle className="w-4 h-4 shrink-0 text-[#1F5E3B]/50 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-[#3D4A40] leading-relaxed text-sm">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location */}
      {previewToken && (
        <section id="secretaria" className="py-16 px-4 sm:px-6">
          <div className="max-w-lg mx-auto">
            <SecretariaCard
              previewToken={previewToken}
              lang={lang}
              businessName={brand.name}
              businessType={template.category ?? ""}
              standaloneLink={`${window.location.pathname}/secretaria`}
            />
          </div>
        </section>
      )}
      {place && (
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-3 text-[#3D4A40]">
            <MapPin className="w-5 h-5 text-[#1F5E3B]" />
            <span className="font-medium">{place}</span>
          </div>
        </section>
      )}

      {/* Contact — actions only with a confirmed public phone */}
      <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0A1F13] text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8B04B] mb-3">{t.nav.contact}</p>
            <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight">{t.contact.title}</h2>
            <p className="mt-4 text-white/80 leading-relaxed">{t.contact.blurb}</p>
            {place && <div className="mt-6 flex items-center gap-2 text-white/70 text-sm"><MapPin className="w-4 h-4" /> {place}</div>}
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
            {phone ? (
              <div className="flex flex-col gap-4">
                <a href={phone.href} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8B04B] hover:bg-[#f2c065] px-6 py-4 text-[#0A1F13] font-bold transition-colors">
                  {pick(lang, "Call", "Llamar")} {phone.phone}
                </a>
                <a href={ctaHref(ctas[0].message)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#3ce77f] px-6 py-4 text-[#0A1F13] font-bold transition-colors">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
                <p className="text-xs text-white/60">{pick(lang, "We answer during the day. No online payment.", "Respondemos durante el día. Sin pago en línea.")}</p>
              </div>
            ) : (
              <div className="text-white/80 leading-relaxed">
                <p className="font-semibold text-white">{pick(lang, "Contact details coming soon", "Datos de contacto próximamente")}</p>
                <p className="mt-2 text-sm">{pick(lang, "This is a preview — the business's phone is not published yet. Ask your designer for the details.", "Esto es una vista previa — el teléfono del negocio aún no está publicado. Pida los datos a su diseñador.")}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 bg-[#050C08] text-white/60 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 justify-between">
          <span>© {new Date().getFullYear()} {brand.name}. {t.footer.rights}</span>
          <span>{place}</span>
        </div>
      </footer>

      {/* Sticky mobile enquiry CTA — only with a confirmed public booking phone */}
      {phone && (
        <a href="#contact" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#E8B04B] text-[#0A1F13] font-bold text-center py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
          {t.contact.title}
        </a>
      )}
      <TourismChat demo={demo} brand={brand} lang={lang} previewToken={previewToken} topics={template.plwSite?.chatTopics ?? pick(lang, "what we offer or how to reach us", "lo que ofrecemos o cómo contactarnos")} />
    </div>
  );
}
