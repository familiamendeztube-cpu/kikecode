import { useEffect, useRef, useState } from "react";
import { Menu, X, MapPin, Check, MessageCircle, Send, Info, HelpCircle, Volume2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import type { BusinessTemplate, Lang, TourismDemo } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { waLink } from "@/sites/shared/whatsapp";
import { useReturnFocus } from "@/sites/shared/return-focus";

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
    the business's own photos replace them.
  - No lead forms, no sends, no voice: text Q&A only (the app has no voice
    provider; a click-to-hear would need one).
*/

const HERO_STOCK_FALLBACK = "https://images.pexels.com/photos/11181983/pexels-photo-11181983.jpeg?auto=compress&cs=tinysrgb&w=1920";

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
export type SafeTourismDemo = TourismDemo & { details: { label: string; value: string }[]; faqs: { question: string; answer: string }[] };

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
  return { services, highlight, description, details, faqs, heroImage };
}

/** A phone only when the draft confirmed a public one (blank means none). */
function publicPhone(brand: BusinessTemplate["brand"]): { phone: string; href: string } | null {
  if (!brand.phone.trim() || !brand.phoneHref.trim()) return null;
  return { phone: brand.phone, href: brand.phoneHref };
}

/* ------------------------------------------------------------------ */
/* Homepage chat: text Q&A from confirmed brief/FAQ only               */
/* ------------------------------------------------------------------ */

type Msg = { from: "bot" | "user"; text: string };

function answerFromBrief(q: string, demo: SafeTourismDemo, lang: Lang, brandName: string): string {
  const text = q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 1. An exact (normalized) FAQ match wins.
  const faq = demo.faqs.find((f) => norm(f.question) === text);
  if (faq) return faq.answer;

  // 2. Word overlap over FAQ questions, then confirmed details.
  const words = text.split(/\s+/).filter((w) => w.length > 2);
  let best: { score: number; answer: string } | null = null;
  for (const f of demo.faqs) {
    const qWords = norm(f.question).split(/\s+/).filter((w) => w.length > 2);
    const overlap = words.filter((w) => qWords.includes(w)).length;
    if (overlap > 0 && (!best || overlap > best.score)) best = { score: overlap, answer: f.answer };
  }
  if (best) return best.answer;

  for (const d of demo.details) {
    const dWords = norm(d.label).split(/\s+/).filter((w) => w.length > 2);
    if (words.some((w) => dWords.includes(w))) {
      return `${d.label}: ${d.value}`;
      }
  }

  // 3. Confirmed services: name them; never invent availability for one.
  if (demo.services.some((s) => words.some((w) => norm(s).includes(w)))) {
    return pick(lang,
      `We offer "${demo.services.find((s) => norm(s).includes(words.find((w) => norm(s).includes(w)) ?? ""))}" — ask us for current availability.`,
      `Ofrecemos "${demo.services.find((s) => norm(s).includes(words.find((w) => norm(s).includes(w)) ?? ""))}" — consúltenos por disponibilidad actual.`);
  }

  // 4. Honest fallbacks: rates, hours and availability are unconfirmed unless a fact says otherwise.
  if (/\b(precio|precios|costo|cuanto|cuánto|tarifa|rate|rates|price|prices)\b/.test(text)) {
    return pick(lang,
      `I don't have confirmed rates yet. Write to us on WhatsApp and we'll answer with the current price for "${brandName}".`,
      `Aún no tengo tarifas confirmadas. Escríbanos por WhatsApp y le respondemos con el precio actual de "${brandName}".`);
  }
  if (/\b(horario|horarios|hora|abierto|open|hours|schedule)\b/.test(text)) {
    return pick(lang,
      "I don't have confirmed opening hours yet — message us and we'll reply with them.",
      "Aún no tengo horarios confirmados — escríbanos y le respondemos con ellos.");
  }
  if (/\b(disponibilidad|disponible|availability|available|fecha|fechas|reserva|reservar|booking|book|slot)\b/.test(text)) {
    return pick(lang,
      "I can't confirm availability from here. Write to us and we'll answer with real dates.",
      "No puedo confirmar disponibilidad desde aquí. Escríbanos y le respondemos con fechas reales.");
  }

  return pick(lang,
    "I can only answer with what the business confirmed. I've noted your question — send it on WhatsApp and a person will reply.",
    "Solo puedo responder con lo que el negocio ha confirmado. Anoté su pregunta — envíela por WhatsApp y una persona le responde.");
}

function TourismChat({ demo, brand, lang }: { demo: SafeTourismDemo; brand: BusinessTemplate["brand"]; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [speaking, setSpeaking] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const greeted = useRef(false);
  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setMsgs([{ from: "bot", text: pick(lang,
        `Hello! I'm the ${brand.name} assistant. I can answer from the confirmed info on this page — ask me about the tours, the place, or how to reach us.`,
        `¡Hola! Soy el asistente de ${brand.name}. Puedo responder con la información confirmada de esta página — pregúnteme por los tours, el lugar o cómo contactarnos.`) }]);
    }
  }, [open, lang, brand.name]);

  function send(text: string) {
    const v = text.trim();
    if (!v) return;
    setMsgs((m) => [...m, { from: "user", text: v }, { from: "bot", text: answerFromBrief(v, demo, lang, brand.name) }]);
    setDraft("");
  }

  // Click-to-hear: browser voices only, no provider, click-to-play (never auto).
  function speak(i: number, text: string) {
    if (speaking === i) {
      window.speechSynthesis?.cancel();
      setSpeaking(null);
      return;
    }
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "es" ? "es-CR" : "en-US";
    u.onend = () => setSpeaking(null);
    u.onerror = () => setSpeaking(null);
    window.speechSynthesis.speak(u);
    setSpeaking(i);
  }
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  const L = pick(lang, {
    ask: "Ask the assistant",
    ph: "Type your question…",
    preview: "Preview: text answers only, from the business's confirmed info.",
    listen: "Listen",
  }, {
    ask: "Pregunte al asistente",
    ph: "Escriba su pregunta…",
    preview: "Vista previa: respuestas de texto, con la información confirmada del negocio.",
    listen: "Escuchar",
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
                    {m.from === "bot" && canSpeak && (
                      <button onClick={() => speak(i, m.text)} className="ml-2 inline-flex text-slate-400 hover:text-slate-600 align-middle" aria-label={L.listen}>
                        <Volume2 className="w-3.5 h-3.5" />
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

export default function TourismSite({ template }: { template: BusinessTemplate }) {
  const lang: Lang = template.lockedLang ?? template.defaultLang ?? "es";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuFocus = useReturnFocus();
  const { brand, media } = template;
  const demo = tourismDemo(template);
  const phone = publicPhone(brand);
  const t = template.content[lang];
  const hero = trustedHero(demo.heroImage) ?? media?.hero ?? HERO_STOCK_FALLBACK;
  const gallery = media?.gallery ?? [];
  const isStockHero = !demo.heroImage;

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
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-white font-semibold tracking-wide">
            {brand.logo ? <img src={brand.logo} alt="" className="w-8 h-8 rounded-full object-cover" /> : <span className="w-8 h-8 rounded-full bg-[#E8B04B] grid place-items-center text-[#0A1F13] font-bold">P</span>}
            {brand.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/85">
            <a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a>
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
              <a href="#services" onClick={() => setMenuOpen(false)}>{t.nav.services}</a>
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
          {hero ? <img src={hero} alt="" className="w-full h-full object-cover" loading="eager" /> : <div className="w-full h-full bg-[#12301E]" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08150E] via-[#08150E]/55 to-[#08150E]/20" />
          {isStockHero && (
            <div className="absolute bottom-3 right-3 rounded-full bg-black/40 text-white/80 text-[10px] px-2.5 py-1 backdrop-blur">
              {pick(lang, "Illustrative photo", "Foto ilustrativa")}
            </div>
          )}
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 pt-32">
          <div className="tourism-reveal max-w-2xl text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8B04B] mb-4">{t.hero.eyebrow}</p>
            <h1 className="tourism-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
              {brand.name}
              <span className="mt-2 block text-2xl sm:text-3xl lg:text-4xl font-normal italic text-white/90">{t.hero.title1} {t.hero.title2}</span>
            </h1>
            {demo.description && <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed">{demo.description}</p>}
            {demo.highlight && (
              <p className="mt-6 inline-block rounded-full border border-[#E8B04B]/40 bg-[#E8B04B]/15 text-[#F5E3BE] px-4 py-2 text-sm font-medium">{demo.highlight}</p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="tourism-reveal inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8B04B] hover:bg-[#f2c065] px-7 py-4 text-[#0A1F13] font-bold transition-colors">
                <MessageCircle className="w-5 h-5" /> {t.hero.cta1}
              </a>
              <a href="#services" className="tourism-reveal inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur px-7 py-4 text-white font-semibold transition-colors">
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1F5E3B] mb-3">{t.nav.services}</p>
            <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight">{t.services.title}</h2>
            <p className="mt-4 text-[#3D4A40] leading-relaxed">{t.services.blurb}</p>
          </div>
          {demo.services.length > 0 ? (
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {demo.services.map((s, i) => (
                <li key={`${s}-${i}`} className="tourism-reveal group rounded-xl border border-[#1F5E3B]/15 bg-white hover:border-[#1F5E3B]/40 hover:shadow-lg transition-all p-6">
                  <Check className="w-5 h-5 text-[#1F5E3B] mb-3" />
                  <div className="font-semibold text-[#1C241E]">{s}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-[#3D4A40]/70 italic">{pick(lang, "Services to be confirmed with the business.", "Servicios por confirmar con el negocio.")}</p>
          )}
        </div>
      </section>

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

      {/* Gallery */}
      <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight">{t.nav.faq === "FAQ" ? "Gallery" : "Galería"}</h2>
          <p className="mt-3 text-sm text-[#3D4A40]/70">{pick(lang, "Illustrative photos of Costa Rica.", "Fotos ilustrativas de Costa Rica.")}</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {gallery.slice(0, 3).map((src, i) => (
              <figure key={src} className="tourism-reveal overflow-hidden rounded-xl">
                <img src={src} alt={(template.galleryCaptions?.[lang]?.[i]) ?? brand.name} className="w-full h-64 sm:h-80 object-cover hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                <figcaption className="pt-3 text-sm text-[#3D4A40]">{template.galleryCaptions?.[lang]?.[i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {demo.faqs.length > 0 && (
        <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-[#1F5E3B]" /> {pick(lang, "Questions travelers ask", "Preguntas de viajeros")}
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
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-3 text-[#3D4A40]">
          <MapPin className="w-5 h-5 text-[#1F5E3B]" />
          <span className="font-medium">{brand.address || brand.city}</span>
        </div>
      </section>

      {/* Contact — actions only with a confirmed public phone */}
      <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0A1F13] text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8B04B] mb-3">{t.nav.contact}</p>
            <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight">{t.contact.title}</h2>
            <p className="mt-4 text-white/80 leading-relaxed">{t.contact.blurb}</p>
            <div className="mt-6 flex items-center gap-2 text-white/70 text-sm"><MapPin className="w-4 h-4" /> {brand.address || brand.city}</div>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
            {phone ? (
              <div className="flex flex-col gap-4">
                <a href={phone.href} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8B04B] hover:bg-[#f2c065] px-6 py-4 text-[#0A1F13] font-bold transition-colors">
                  {pick(lang, "Call", "Llamar")} {phone.phone}
                </a>
                <a href={waLink(brand.whatsapp || phone.href, pick(lang, "Hello! I'd like to ask about a tour.", "¡Hola! Me gustaría consultar por un tour."))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#3ce77f] px-6 py-4 text-[#0A1F13] font-bold transition-colors">
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
          <span>{brand.address || brand.city}</span>
        </div>
      </footer>

      {/* Sticky mobile enquiry CTA — only with a confirmed public booking phone */}
      {phone && (
        <a href="#contact" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#E8B04B] text-[#0A1F13] font-bold text-center py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
          {pick(lang, "Ask about your dates", "Consulte por sus fechas")}
        </a>
      )}
      <TourismChat demo={demo} brand={brand} lang={lang} />
    </div>
  );
}
