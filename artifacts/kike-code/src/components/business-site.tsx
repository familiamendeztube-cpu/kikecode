import { useEffect, useRef, useState } from "react";
import {
  Phone, Mail, MapPin, Clock, ShieldCheck, Star, Check,
  ArrowRight, Quote, ChevronDown, Play, Pause, Volume2, MessageCircle, X,
  DollarSign, Languages, BadgeCheck, Truck, Wrench, Leaf, Sparkles, Heart,
  Award, Users, ThumbsUp, MapPinned, CheckCircle2, Calendar, CalendarCheck, Send,
  Music2, Facebook, Instagram, Gauge, Fuel, Cog, Compass, Car,
  ChevronLeft, ChevronRight, Banknote, Search, RotateCw, ImageOff,
  type LucideIcon,
} from "lucide-react";
import type { BusinessTemplate, BrandOverride, BrandConfig, BrandPalette, Lang, OfferIconKey, TemplateInventory, InventoryVehicle } from "@/lib/templates/types";
import { fnUrl, submitLead } from "@/lib/plw";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { EditableText, EditableImage, ChangePhotoButton } from "@/lib/editable";

const OFFER_ICONS: Record<OfferIconKey, LucideIcon> = {
  Clock, DollarSign, ShieldCheck, Languages, BadgeCheck, Truck, Wrench, Star, Leaf, Sparkles, Heart,
};

/* Substitute {business} placeholder with the current business name. */
function personalize(text: string, businessName: string): string {
  return text.replace(/\{business\}/g, businessName);
}

/* Shared realistic reviewer avatars (reused across templates by index). */
const REVIEW_AVATARS = Array.from({ length: 8 }, (_, i) => `/template-assets/reviews/r${i + 1}.jpg`);
const REVIEW_PLATFORMS = ["Google", "Yelp", "Google", "Yelp", "Google", "Yelp", "Google", "Yelp"] as const;
const REVIEW_DATES: Record<Lang, string[]> = {
  en: ["2 weeks ago", "1 month ago", "3 weeks ago", "2 months ago", "5 days ago", "1 week ago", "6 weeks ago", "3 days ago"],
  es: ["hace 2 semanas", "hace 1 mes", "hace 3 semanas", "hace 2 meses", "hace 5 días", "hace 1 semana", "hace 6 semanas", "hace 3 días"],
};

/* Industry-neutral extra reviews appended after each template's own ones,
   so every site shows a fuller, more believable wall of social proof. */
const EXTRA_REVIEWS: Record<Lang, { name: string; role: string; quote: string }[]> = {
  en: [
    { name: "Marcos T.", role: "Homeowner", quote: "Showed up exactly on time, gave a fair price up front, and left the place spotless. This is how every business should run." },
    { name: "Jennifer P.", role: "Repeat customer", quote: "I've used them three times now and they're consistent every single visit. Friendly, professional, and they actually answer the phone." },
    { name: "Andrés G.", role: "Local resident", quote: "Booked through the website at night and got a confirmation right away. Loved that I could talk to them in Spanish too." },
  ],
  es: [
    { name: "Marcos T.", role: "Propietario", quote: "Llegaron puntuales, dieron un precio justo desde el inicio y dejaron todo impecable. Así debería trabajar todo negocio." },
    { name: "Jennifer P.", role: "Cliente frecuente", quote: "Los he usado tres veces y siempre son consistentes. Amables, profesionales y de verdad contestan el teléfono." },
    { name: "Andrés G.", role: "Vecino de la zona", quote: "Reservé por la página de noche y me llegó la confirmación enseguida. Me encantó poder hablar con ellos en español." },
  ],
};

/* The assistant greeting always invites the visitor to book right now. */
const BOOKING_INVITE: Record<Lang, string> = {
  en: "Just tell me what you need and I'll book your free appointment right now.",
  es: "Solo dime qué necesitas y te agendo tu cita gratis ahora mismo.",
};
function buildGreeting(assistant: NonNullable<BusinessTemplate["assistant"]>, lang: Lang, brandName: string): string {
  const base = personalize(lang === "en" ? assistant.en : assistant.es, brandName);
  return `${base} ${BOOKING_INVITE[lang]}`;
}

/* Next two non-Sunday openings for the live booking flow. */
function getSlots(lang: Lang): { label: string; time: string }[] {
  const locale = lang === "en" ? "en-US" : "es-ES";
  const dateFmt = new Intl.DateTimeFormat(locale, { weekday: "long", month: "short", day: "numeric" });
  const timeFmt = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" });
  const hours: [number, number][] = [[10, 30], [14, 0]];
  const out: { label: string; time: string }[] = [];
  let offset = 1;
  while (out.length < 2 && offset < 14) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    if (d.getDay() !== 0) {
      const [h, m] = hours[out.length]!;
      d.setHours(h, m, 0, 0);
      out.push({ label: dateFmt.format(d), time: timeFmt.format(d) });
    }
    offset++;
  }
  return out;
}

/* ---------------------------------------------------------------- */
/* useGreeting: play the live greeting in a realistic human voice.   */
/* Audio is generated server-side (OpenAI gpt-audio) from the live   */
/* greeting text, so it always says the current business name — no   */
/* stale prerecorded clip and no robotic browser speech synthesis.   */
/* ---------------------------------------------------------------- */
function useGreeting(text: string | undefined, lang: Lang) {
  const [playing, setPlaying] = useState(false);
  const [playedOnce, setPlayedOnce] = useState(false);
  const userPausedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const supported = typeof window !== "undefined" && typeof Audio !== "undefined";

  // Greeting text changes on every keystroke while editing the business name.
  // Each fresh text is a paid TTS generation, so debounce to the settled value.
  const [settledText, setSettledText] = useState(text);
  useEffect(() => {
    const id = setTimeout(() => setSettledText(text), 600);
    return () => clearTimeout(id);
  }, [text]);

  useEffect(() => {
    const text = settledText;
    if (!text) return;
    if (typeof window === "undefined" || typeof Audio === "undefined") return;

    const url = `${fnUrl("kike-ai")}?action=tts&text=${encodeURIComponent(text)}&voice=nova`;
    const audio = new Audio(url);
    audio.preload = "auto";
    audioRef.current = audio;
    userPausedRef.current = false;
    setPlaying(false);
    setPlayedOnce(false);

    audio.addEventListener("play", () => { setPlaying(true); setPlayedOnce(true); });
    audio.addEventListener("pause", () => setPlaying(false));
    audio.addEventListener("ended", () => setPlaying(false));
    audio.addEventListener("error", () => setPlaying(false));

    const ac = new AbortController();

    // Try immediate autoplay; if blocked, play on the first user gesture anywhere.
    const trySpeak = () => {
      if (userPausedRef.current || ac.signal.aborted) return;
      audio.play().catch(() => { /* autoplay blocked — wait for a gesture */ });
    };
    trySpeak();
    const opts: AddEventListenerOptions = { once: true, passive: true, signal: ac.signal };
    const onGesture = () => {
      if (audio.paused && !userPausedRef.current && audio.currentTime === 0) {
        trySpeak();
      }
    };
    document.addEventListener("pointerdown", onGesture, opts);
    document.addEventListener("keydown", onGesture, opts);

    return () => {
      ac.abort();
      try { audio.pause(); } catch { /* ignore */ }
      audio.src = "";
      audioRef.current = null;
    };
  }, [settledText, lang]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      userPausedRef.current = true;
      audio.pause();
    } else {
      userPausedRef.current = false;
      if (audio.ended) audio.currentTime = 0;
      audio.play().catch(() => { /* ignore */ });
    }
  };
  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      userPausedRef.current = true;
      audio.pause();
    }
  };

  return { playing, playedOnce, toggle, pause, supported };
}

/* ---------------------------------------------------------------- */
/* Dealership inventory — grid + "look inside" detail dialog          */
/* ---------------------------------------------------------------- */
function bodyLabel(b: InventoryVehicle["bodyStyle"], lang: Lang): string {
  const map = {
    SUV: { en: "SUV", es: "SUV" },
    Pickup: { en: "Pickup", es: "Pick-up" },
    Sedan: { en: "Sedan", es: "Sedán" },
  } as const;
  return map[b][lang];
}

function InventorySection({ inv, lang, p, brand }: {
  inv: TemplateInventory; lang: Lang; p: BrandPalette; brand: BrandConfig;
}) {
  const [filter, setFilter] = useState<"all" | InventoryVehicle["bodyStyle"]>("all");
  const [selected, setSelected] = useState<InventoryVehicle | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const bodyTypes = Array.from(new Set(inv.vehicles.map((v) => v.bodyStyle)));
  const chips: ("all" | InventoryVehicle["bodyStyle"])[] = ["all", ...bodyTypes];
  const vehicles = filter === "all" ? inv.vehicles : inv.vehicles.filter((v) => v.bodyStyle === filter);
  const waDigits = whatsappDigits(brand);

  const L = {
    eyebrow: lang === "en" ? "Our inventory" : "Nuestro inventario",
    all: lang === "en" ? "All" : "Todos",
    view: lang === "en" ? "View details" : "Ver detalles",
    lookInside: lang === "en" ? "Inside" : "Interior",
    year: lang === "en" ? "Year" : "Año",
    mileage: lang === "en" ? "Mileage" : "Kilometraje",
    transmission: lang === "en" ? "Transmission" : "Transmisión",
    fuel: lang === "en" ? "Fuel" : "Combustible",
    drivetrain: lang === "en" ? "Drivetrain" : "Tracción",
    body: lang === "en" ? "Type" : "Tipo",
    highlights: lang === "en" ? "Highlights" : "Características",
    whatsapp: lang === "en" ? "WhatsApp us" : "Consultar por WhatsApp",
    call: lang === "en" ? "Call now" : "Llamar",
    available: lang === "en" ? "Available" : "Disponible",
    finance: lang === "en" ? "Request financing" : "Solicitar financiamiento",
    visit: lang === "en" ? "Schedule a visit" : "Agendar una visita",
    view360: lang === "en" ? "360° view" : "Vista 360°",
    realPhotos: lang === "en" ? "Real photos of this vehicle" : "Fotos reales de este vehículo",
    photoOf: lang === "en" ? "Photo" : "Foto",
    prev: lang === "en" ? "Previous photo" : "Foto anterior",
    next: lang === "en" ? "Next photo" : "Foto siguiente",
  };

  function openVehicle(v: InventoryVehicle) { setSelected(v); setImgIndex(0); }
  function vehLabel(v: InventoryVehicle) {
    const yr = v.year ? ` ${v.year}` : "";
    return `${v.name}${yr}`;
  }
  function waLink(v: InventoryVehicle) {
    const msg = lang === "en"
      ? `Hi! I'm interested in the ${vehLabel(v)} I saw on your website.`
      : `¡Hola! Me interesa el ${vehLabel(v)} que vi en su sitio web.`;
    return `https://wa.me/${waDigits}?text=${encodeURIComponent(msg)}`;
  }
  function waFinance(v: InventoryVehicle) {
    const msg = lang === "en"
      ? `Hi! I'd like financing information for the ${vehLabel(v)}.`
      : `¡Hola! Quisiera información de financiamiento para el ${vehLabel(v)}.`;
    return `https://wa.me/${waDigits}?text=${encodeURIComponent(msg)}`;
  }
  function waVisit(v: InventoryVehicle) {
    const msg = lang === "en"
      ? `Hi! I'd like to schedule a visit to see the ${vehLabel(v)} in person.`
      : `¡Hola! Quisiera agendar una visita para ver el ${vehLabel(v)} en persona.`;
    return `https://wa.me/${waDigits}?text=${encodeURIComponent(msg)}`;
  }
  function stepImg(dir: 1 | -1) {
    if (!selected) return;
    const n = selected.images.length;
    setImgIndex((i) => (i + dir + n) % n);
  }

  const specs = selected ? [
    ...(selected.year ? [{ Icon: Calendar, label: L.year, value: String(selected.year) }] : []),
    ...(selected.mileage ? [{ Icon: Gauge, label: L.mileage, value: selected.mileage }] : []),
    ...(selected.transmission ? [{ Icon: Cog, label: L.transmission, value: selected.transmission[lang] }] : []),
    ...(selected.fuel ? [{ Icon: Fuel, label: L.fuel, value: selected.fuel[lang] }] : []),
    ...(selected.drivetrain ? [{ Icon: Compass, label: L.drivetrain, value: selected.drivetrain[lang] }] : []),
    { Icon: Car, label: L.body, value: bodyLabel(selected.bodyStyle, lang) },
  ] : [];

  return (
    <section id="inventory" className="py-20 sm:py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          {brand.logo && (
            <img src={brand.logo} alt={brand.name} className="mx-auto mb-5 h-16 w-16 rounded-2xl object-contain bg-white/95 ring-1 ring-white/20 p-2 shadow-xl" />
          )}
          <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: p.accent }}>{L.eyebrow}</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{inv.title[lang]}</h2>
          <p className="mt-4 text-white/70">{inv.blurb[lang]}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {chips.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
                style={active
                  ? { backgroundColor: p.accent, color: "#111827", borderColor: p.accent }
                  : { backgroundColor: "transparent", color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.2)" }}
              >
                {c === "all" ? L.all : bodyLabel(c, lang)}
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => openVehicle(v)}
              className="group text-left rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-white/10 hover:ring-white/25 hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                <img src={v.images[0]} alt={v.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/55 backdrop-blur ring-1 ring-white/15">{v.year ? `${v.year} · ` : ""}{bodyLabel(v.bodyStyle, lang)}</span>
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: p.accent, color: "#111827" }}>{(v.status?.[lang]) ?? L.available}</span>
                {v.images.length > 1 && (
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-black/55 backdrop-blur ring-1 ring-white/15">
                    <RotateCw className="w-3 h-3" /> {L.view360}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="font-bold text-lg leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{v.name}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-extrabold" style={{ color: p.accent }}>{v.price}</span>
                  {v.priceUsd && <span className="text-xs text-white/45">{v.priceUsd}</span>}
                </div>
                {(() => {
                  const cells = [
                    v.mileage ? { Icon: Gauge, val: v.mileage } : null,
                    v.transmission ? { Icon: Cog, val: v.transmission[lang] } : null,
                    v.fuel ? { Icon: Fuel, val: v.fuel[lang] } : null,
                    v.drivetrain ? { Icon: Compass, val: v.drivetrain[lang] } : null,
                  ].filter((c): c is { Icon: typeof Gauge; val: string } => c !== null).slice(0, 3);
                  return cells.length > 0 ? (
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-white/65 mb-4">
                      {cells.map((c, i) => (
                        <span key={i} className="inline-flex items-center gap-1 min-w-0"><c.Icon className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{c.val}</span></span>
                      ))}
                    </div>
                  ) : <div className="mb-4" />;
                })()}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: p.accent }}>
                  {L.view} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) setSelected(null); }}>
        <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-white text-slate-900">
          {selected && (
            <div className="grid md:grid-cols-2">
              <div className="bg-slate-100">
                <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                  <img src={selected.images[imgIndex]} alt={`${selected.name} — ${L.photoOf} ${imgIndex + 1}`} className="w-full h-full object-cover" />
                  {selected.images.length > 1 && (
                    <>
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full bg-black/55 backdrop-blur ring-1 ring-white/15">
                        <RotateCw className="w-3.5 h-3.5" /> {L.view360}
                      </span>
                      <span className="absolute top-3 right-3 text-[11px] font-bold text-white px-2.5 py-1 rounded-full bg-black/55 backdrop-blur ring-1 ring-white/15">{imgIndex + 1} / {selected.images.length}</span>
                      <button
                        type="button" onClick={() => stepImg(-1)} aria-label={L.prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/45 hover:bg-black/65 text-white backdrop-blur transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      ><ChevronLeft className="w-5 h-5" /></button>
                      <button
                        type="button" onClick={() => stepImg(1)} aria-label={L.next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/45 hover:bg-black/65 text-white backdrop-blur transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      ><ChevronRight className="w-5 h-5" /></button>
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white/90 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur">{L.realPhotos}</span>
                    </>
                  )}
                </div>
                {selected.images.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto">
                    {selected.images.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setImgIndex(i)}
                        className="relative h-14 w-20 shrink-0 rounded-md overflow-hidden"
                        style={{ outline: i === imgIndex ? `2px solid ${p.primary}` : "2px solid transparent", outlineOffset: "-2px" }}
                      >
                        <img src={src} alt={`${selected.name} — ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col">
                <DialogTitle className="text-2xl font-extrabold tracking-tight pr-8">{selected.name}</DialogTitle>
                <DialogDescription className="sr-only">{selected.name}{selected.year ? ` ${selected.year}` : ""}</DialogDescription>
                <div className="flex items-baseline gap-2 mt-1 mb-5">
                  <span className="text-2xl font-extrabold" style={{ color: p.primary }}>{selected.price}</span>
                  {selected.priceUsd && <span className="text-sm text-slate-400">{selected.priceUsd}</span>}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
                  {specs.map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <s.Icon className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-wider text-slate-400">{s.label}</div>
                        <div className="font-semibold text-slate-800 truncate">{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {selected.highlights[lang].length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{L.highlights}</div>
                    <ul className="space-y-1.5">
                      {selected.highlights[lang].map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: p.primary }} />{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-auto space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a href={waLink(selected)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#25D366" }}>
                      <MessageCircle className="w-4 h-4" /> {L.whatsapp}
                    </a>
                    <a href={brand.phoneHref} className="flex-1 inline-flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: p.primary }}>
                      <Phone className="w-4 h-4" /> {L.call}
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a href={waFinance(selected)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-xl border-2 transition-colors hover:bg-slate-50" style={{ borderColor: p.primary, color: p.primary }}>
                      <Banknote className="w-4 h-4" /> {L.finance}
                    </a>
                    <a href={waVisit(selected)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-xl border-2 transition-colors hover:bg-slate-50" style={{ borderColor: p.primary, color: p.primary }}>
                      <CalendarCheck className="w-4 h-4" /> {L.visit}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Slug-aware data for the new sections                              */
/* ---------------------------------------------------------------- */
type SlugData = {
  stats: { value: string; valueEs?: string; labelEn: string; labelEs: string }[];
  areasEn: string[]; areasEs: string[];
  certsEn: string[]; certsEs: string[];
  guaranteeEn: { title: string; blurb: string };
  guaranteeEs: { title: string; blurb: string };
};

const SLUG_DATA: Record<string, SlugData> = {
  "chales-garage": {
    stats: [
      { value: "New & Used", valueEs: "Nuevos y Usados", labelEn: "Vehicles in stock", labelEs: "Vehículos en inventario" },
      { value: "Financing", valueEs: "Financiamiento", labelEn: "Options available", labelEs: "Opciones disponibles" },
      { value: "Trade-Ins", valueEs: "Recibimos", labelEn: "Your vehicle welcome", labelEs: "Aceptamos su vehículo" },
      { value: "Bilingual", valueEs: "Bilingüe", labelEn: "English & Spanish", labelEs: "Inglés y español" },
    ],
    areasEn: ["Muelle", "Ciudad Quesada", "Aguas Zarcas", "Florencia", "La Fortuna", "Pital", "Venecia", "Platanar", "Santa Rosa", "Los Chiles", "Guatuso", "Zarcero"],
    areasEs: ["Muelle", "Ciudad Quesada", "Aguas Zarcas", "Florencia", "La Fortuna", "Pital", "Venecia", "Platanar", "Santa Rosa", "Los Chiles", "Guatuso", "Zarcero"],
    certsEn: ["New & Used Vehicles", "Financing Available", "Trade-Ins Accepted", "Every Vehicle Inspected", "Bilingual EN/ES", "Honest, No-Pressure Service"],
    certsEs: ["Vehículos Nuevos y Usados", "Financiamiento Disponible", "Aceptamos su Vehículo", "Cada Vehículo Revisado", "Bilingüe EN/ES", "Servicio Honesto y Sin Presión"],
    guaranteeEn: { title: "Buy with total confidence", blurb: "Every vehicle is inspected before it reaches our lot, and what you see online is what you get. No surprises, no pressure." },
    guaranteeEs: { title: "Compre con total confianza", blurb: "Cada vehículo es revisado antes de salir a la venta, y lo que ve en línea es lo que recibe. Sin sorpresas, sin presión." },
  },
  "los-primos-plumbing": {
    stats: [
      { value: "Same-day", labelEn: "Service available", labelEs: "Servicio disponible" },
      { value: "24/7", labelEn: "Emergency response", labelEs: "Respuesta de emergencia" },
      { value: "Free", valueEs: "Gratis", labelEn: "Written estimates", labelEs: "Estimados por escrito" },
      { value: "Bilingual", valueEs: "Bilingüe", labelEn: "English & Spanish", labelEs: "Inglés y español" },
    ],
    areasEn: ["Los Angeles", "Whittier", "La Habra", "Pico Rivera", "Montebello", "Downey", "Norwalk", "La Mirada", "Santa Fe Springs", "Hacienda Heights", "Brea", "Fullerton"],
    areasEs: ["Los Angeles", "Whittier", "La Habra", "Pico Rivera", "Montebello", "Downey", "Norwalk", "La Mirada", "Santa Fe Springs", "Hacienda Heights", "Brea", "Fullerton"],
    certsEn: ["Se Habla Español", "Upfront Flat Pricing", "24/7 Emergency Service", "Workmanship Guarantee", "Bilingual EN/ES", "Free Written Estimates"],
    certsEs: ["Se Habla Español", "Precio Fijo por Adelantado", "Servicio de Emergencia 24/7", "Garantía de Mano de Obra", "Bilingüe EN/ES", "Estimados Gratis por Escrito"],
    guaranteeEn: { title: "Done right or we make it right", blurb: "Every job is backed by a written workmanship guarantee. If something isn't right, we come back and fix it — no excuses." },
    guaranteeEs: { title: "Bien hecho o lo arreglamos", blurb: "Cada trabajo está respaldado por una garantía escrita de mano de obra. Si algo no está bien, regresamos y lo arreglamos — sin excusas." },
  },
  "hyperion-synthetic-turf": {
    stats: [
      { value: "Premium", valueEs: "Premium", labelEn: "Synthetic turf", labelEs: "Césped sintético" },
      { value: "Pet-Friendly", valueEs: "Para Mascotas", labelEn: "Safe for pets", labelEs: "Seguro para mascotas" },
      { value: "Free", valueEs: "Gratis", labelEn: "Written estimates", labelEs: "Estimados por escrito" },
      { value: "Bilingual", valueEs: "Bilingüe", labelEn: "English & Spanish", labelEs: "Inglés y español" },
    ],
    areasEn: ["Los Angeles", "Pasadena", "Glendale", "Arcadia", "Pomona", "West Covina", "El Monte", "Alhambra", "San Gabriel", "Burbank", "Whittier", "Rancho Cucamonga"],
    areasEs: ["Los Angeles", "Pasadena", "Glendale", "Arcadia", "Pomona", "West Covina", "El Monte", "Alhambra", "San Gabriel", "Burbank", "Whittier", "Rancho Cucamonga"],
    certsEn: ["Pet-Friendly Turf", "Drought-Friendly", "Low Maintenance", "Free Written Estimates", "Bilingual EN/ES", "Se Habla Español"],
    certsEs: ["Césped para Mascotas", "Resistente a la Sequía", "Bajo Mantenimiento", "Estimados Gratis por Escrito", "Bilingüe EN/ES", "Se Habla Español"],
    guaranteeEn: { title: "Built to last, guaranteed", blurb: "Premium turf and proper base prep backed by a written workmanship guarantee. If something isn't right, we make it right." },
    guaranteeEs: { title: "Hecho para durar, garantizado", blurb: "Césped premium y preparación de base adecuada respaldados por una garantía escrita de mano de obra. Si algo no está bien, lo arreglamos." },
  },
  painting: {
    stats: [
      { value: "18+", labelEn: "Years in business", labelEs: "Años de experiencia" },
      { value: "3,400+", labelEn: "Homes painted", labelEs: "Casas pintadas" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "100%", labelEn: "Bilingual crews", labelEs: "Cuadrillas bilingües" },
    ],
    areasEn: ["Los Angeles", "Long Beach", "Pasadena", "Glendale", "Burbank", "Inglewood", "Santa Monica", "Whittier", "Pico Rivera", "Montebello", "Huntington Park", "Downey"],
    areasEs: ["Los Angeles", "Long Beach", "Pasadena", "Glendale", "Burbank", "Inglewood", "Santa Monica", "Whittier", "Pico Rivera", "Montebello", "Huntington Park", "Downey"],
    certsEn: ["CSLB #1083449", "EPA Lead-Safe Certified", "Sherwin-Williams Pro", "Benjamin Moore Authorized", "Better Business Bureau A+", "$2M General Liability"],
    certsEs: ["CSLB #1083449", "Certificado EPA Lead-Safe", "Sherwin-Williams Pro", "Autorizado Benjamin Moore", "BBB calificación A+", "$2M Responsabilidad Civil"],
    guaranteeEn: { title: "5-year written workmanship guarantee", blurb: "If anything peels, cracks, or fades within 5 years, we come back and fix it — free. Written into every contract." },
    guaranteeEs: { title: "Garantía escrita de 5 años en mano de obra", blurb: "Si algo se descarapela, agrieta o decolora en 5 años, regresamos y lo arreglamos — gratis. Por escrito en cada contrato." },
  },
  handyman: {
    stats: [
      { value: "12+", labelEn: "Years on call", labelEs: "Años de servicio" },
      { value: "8,500+", labelEn: "Jobs completed", labelEs: "Trabajos completados" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "<2h", labelEn: "Emergency arrival", labelEs: "Llegada de emergencia" },
    ],
    areasEn: ["Houston", "Sugar Land", "Pasadena", "Pearland", "Katy", "Spring", "Cypress", "Bellaire", "Bay Area", "League City", "Missouri City", "Stafford"],
    areasEs: ["Houston", "Sugar Land", "Pasadena", "Pearland", "Katy", "Spring", "Cypress", "Bellaire", "Bay Area", "League City", "Missouri City", "Stafford"],
    certsEn: ["TDLR Licensed", "$1M Liability Insurance", "Workers' Comp Covered", "EPA Refrigerant Certified", "OSHA-10 Trained", "Background-checked Crews"],
    certsEs: ["Licencia TDLR", "Seguro $1M", "Cubierto Workers' Comp", "Certificado EPA Refrigerantes", "Entrenamiento OSHA-10", "Verificación de antecedentes"],
    guaranteeEn: { title: "Done-right or it's free", blurb: "If a repair fails within 90 days, we return and fix it at no charge. We text photos when finished." },
    guaranteeEs: { title: "Bien hecho o es gratis", blurb: "Si una reparación falla en 90 días, regresamos y lo arreglamos sin costo. Mandamos fotos al terminar." },
  },
  landscaping: {
    stats: [
      { value: "15+", labelEn: "Years grooming yards", labelEs: "Años cuidando jardines" },
      { value: "600+", labelEn: "Weekly routes", labelEs: "Rutas semanales" },
      { value: "4.9★", labelEn: "Yelp & Google", labelEs: "Yelp y Google" },
      { value: "30+", labelEn: "Crew members", labelEs: "Miembros del equipo" },
    ],
    areasEn: ["Hollywood", "Beverly Hills", "West Hollywood", "Studio City", "Sherman Oaks", "Encino", "Tarzana", "Toluca Lake", "Burbank", "Glendale", "Pasadena", "Silver Lake"],
    areasEs: ["Hollywood", "Beverly Hills", "West Hollywood", "Studio City", "Sherman Oaks", "Encino", "Tarzana", "Toluca Lake", "Burbank", "Glendale", "Pasadena", "Silver Lake"],
    certsEn: ["CSLB C-27 License", "EPA WaterSense Partner", "Certified Arborist on staff", "Toro & Husqvarna Pro", "$2M Liability Insurance", "California Native Plant Society"],
    certsEs: ["Licencia CSLB C-27", "Socio EPA WaterSense", "Arbolista certificado", "Toro & Husqvarna Pro", "Seguro $2M", "California Native Plant Society"],
    guaranteeEn: { title: "Green-up guarantee", blurb: "If your lawn doesn't visibly improve in 30 days, the next month of service is on us. Period." },
    guaranteeEs: { title: "Garantía de jardín verde", blurb: "Si tu jardín no mejora visiblemente en 30 días, el próximo mes va por nuestra cuenta. Punto." },
  },
  cleaning: {
    stats: [
      { value: "10+", labelEn: "Years cleaning", labelEs: "Años limpiando" },
      { value: "5,200+", labelEn: "Homes served", labelEs: "Hogares atendidos" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "100%", labelEn: "Satisfaction guarantee", labelEs: "Satisfacción garantizada" },
    ],
    areasEn: ["San Antonio", "Alamo Heights", "Stone Oak", "Boerne", "Helotes", "Schertz", "Live Oak", "Universal City", "Leon Valley", "Olmos Park", "Terrell Hills", "Castle Hills"],
    areasEs: ["San Antonio", "Alamo Heights", "Stone Oak", "Boerne", "Helotes", "Schertz", "Live Oak", "Universal City", "Leon Valley", "Olmos Park", "Terrell Hills", "Castle Hills"],
    certsEn: ["IICRC Certified", "Green Seal Cleaning Products", "$1M Liability Insurance", "Bonded Cleaners", "Background-Checked Staff", "Pet & Child Safe Solutions"],
    certsEs: ["Certificación IICRC", "Productos Green Seal", "Seguro $1M", "Personal afianzado", "Antecedentes verificados", "Seguro para mascotas y niños"],
    guaranteeEn: { title: "24-hour re-clean guarantee", blurb: "Not happy with any room? Tell us within 24 hours and we re-clean it — no charge, no questions." },
    guaranteeEs: { title: "Garantía de re-limpieza en 24 horas", blurb: "¿No te gustó algún cuarto? Avísanos en 24 horas y lo limpiamos otra vez — sin costo, sin preguntas." },
  },
  auto: {
    stats: [
      { value: "20+", labelEn: "Years under the hood", labelEs: "Años bajo el cofre" },
      { value: "12,000+", labelEn: "Cars repaired", labelEs: "Autos reparados" },
      { value: "4.8★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "12mo", labelEn: "Parts & labor warranty", labelEs: "Garantía piezas y mano de obra" },
    ],
    areasEn: ["Houston", "Pasadena", "Bellaire", "Sugar Land", "Pearland", "Spring Branch", "Heights", "EaDo", "Magnolia", "Galena Park", "South Houston", "Stafford"],
    areasEs: ["Houston", "Pasadena", "Bellaire", "Sugar Land", "Pearland", "Spring Branch", "Heights", "EaDo", "Magnolia", "Galena Park", "South Houston", "Stafford"],
    certsEn: ["ASE Certified Master Techs", "AAA Approved Auto Repair", "BBB A+ Rated", "AC Delco Pro", "Mitchell ProDemand Shop", "RepairPal Certified"],
    certsEs: ["Técnicos certificados ASE", "Aprobado AAA Auto Repair", "BBB calificación A+", "AC Delco Pro", "Taller Mitchell ProDemand", "Certificación RepairPal"],
    guaranteeEn: { title: "Fixed right or your money back", blurb: "If the same problem comes back within 90 days, we re-do the work or refund the labor. In writing." },
    guaranteeEs: { title: "Bien arreglado o te devolvemos tu dinero", blurb: "Si el mismo problema vuelve en 90 días, lo arreglamos otra vez o te devolvemos la mano de obra. Por escrito." },
  },
  restaurant: {
    stats: [
      { value: "14+", labelEn: "Years cooking", labelEs: "Años cocinando" },
      { value: "Family", labelEn: "Recipes & owners", labelEs: "Recetas y dueños" },
      { value: "4.9★", labelEn: "Yelp rating", labelEs: "Calificación Yelp" },
      { value: "7 nights", labelEn: "Open every week", labelEs: "Abierto cada semana" },
    ],
    areasEn: ["San Antonio", "Alamo Heights", "Stone Oak", "Pearl District", "Southtown", "Boerne", "Schertz", "Helotes", "Live Oak", "Leon Valley", "Olmos Park", "Universal City"],
    areasEs: ["San Antonio", "Alamo Heights", "Stone Oak", "Pearl District", "Southtown", "Boerne", "Schertz", "Helotes", "Live Oak", "Leon Valley", "Olmos Park", "Universal City"],
    certsEn: ["TX Food Manager Certified", "ServSafe Trained Staff", "OpenTable Verified", "Featured: Texas Monthly", "Tripadvisor Travelers' Choice", "Local Sourcing Member"],
    certsEs: ["Certificado TX Food Manager", "Personal entrenado ServSafe", "Verificado OpenTable", "Destacado: Texas Monthly", "Tripadvisor Travelers' Choice", "Miembro Local Sourcing"],
    guaranteeEn: { title: "If you don't love it, we'll remake it", blurb: "Every dish is made to order. Not happy with anything on your plate? Send it back — we'll fix it or take it off the bill." },
    guaranteeEs: { title: "Si no te encanta, lo hacemos de nuevo", blurb: "Cada platillo va hecho al momento. ¿No te gustó algo? Regrésalo — lo rehacemos o lo quitamos de la cuenta." },
  },
  beauty: {
    stats: [
      { value: "9+", labelEn: "Years styling", labelEs: "Años peinando" },
      { value: "6,800+", labelEn: "Clients served", labelEs: "Clientas atendidas" },
      { value: "4.9★", labelEn: "Yelp & Google", labelEs: "Yelp y Google" },
      { value: "Late nights", labelEn: "By appointment", labelEs: "Con cita previa" },
    ],
    areasEn: ["Orlando", "Winter Park", "Lake Nona", "Dr. Phillips", "Baldwin Park", "College Park", "Kissimmee", "Altamonte Springs", "Oviedo", "Maitland", "Apopka", "Casselberry"],
    areasEs: ["Orlando", "Winter Park", "Lake Nona", "Dr. Phillips", "Baldwin Park", "College Park", "Kissimmee", "Altamonte Springs", "Oviedo", "Maitland", "Apopka", "Casselberry"],
    certsEn: ["FL Cosmetology Licensed", "Redken Certified Colorists", "Olaplex Authorized Salon", "Dermalogica Trained", "BBB A+ Rated", "Cruelty-Free Products"],
    certsEs: ["Licencia FL Cosmetología", "Coloristas certificados Redken", "Salón autorizado Olaplex", "Entrenamiento Dermalogica", "BBB calificación A+", "Productos libres de crueldad"],
    guaranteeEn: { title: "Love your look or it's on us", blurb: "If you walk out unhappy, come back within 7 days — we'll redo the service free. Our reputation depends on it." },
    guaranteeEs: { title: "Te encanta o va por nuestra cuenta", blurb: "Si sales sin gustarte, regresa en 7 días — rehacemos el servicio gratis. Nuestra reputación depende de eso." },
  },
  events: {
    stats: [
      { value: "11+", labelEn: "Years decorating", labelEs: "Años decorando" },
      { value: "2,400+", labelEn: "Events styled", labelEs: "Eventos decorados" },
      { value: "5.0★", labelEn: "WeddingWire", labelEs: "WeddingWire" },
      { value: "100s", labelEn: "Quinceañeras yearly", labelEs: "Quinceañeras al año" },
    ],
    areasEn: ["Miami", "Hialeah", "Coral Gables", "Doral", "Kendall", "Aventura", "Miami Beach", "Homestead", "Pinecrest", "South Miami", "Hialeah Gardens", "Westchester"],
    areasEs: ["Miami", "Hialeah", "Coral Gables", "Doral", "Kendall", "Aventura", "Miami Beach", "Homestead", "Pinecrest", "South Miami", "Hialeah Gardens", "Westchester"],
    certsEn: ["WeddingWire Couples' Choice", "The Knot Best of Weddings", "Preferred Venue Vendor", "$2M Event Liability", "ABC Certified Planner", "Insured & Bonded"],
    certsEs: ["WeddingWire Couples' Choice", "The Knot Best of Weddings", "Vendor preferido de venues", "Seguro de eventos $2M", "Planeador certificado ABC", "Asegurado y afianzado"],
    guaranteeEn: { title: "Your vision, on time, every time", blurb: "We arrive 3 hours before guest arrival. If we're late, your setup fee is waived — automatic, no questions." },
    guaranteeEs: { title: "Tu visión, a tiempo, siempre", blurb: "Llegamos 3 horas antes de los invitados. Si nos atrasamos, te quitamos la cuota de montaje — automático, sin preguntas." },
  },
  moving: {
    stats: [
      { value: "13+", labelEn: "Years moving families", labelEs: "Años mudando familias" },
      { value: "9,200+", labelEn: "Moves completed", labelEs: "Mudanzas completadas" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "Flat rate", labelEn: "No hourly surprises", labelEs: "Sin sorpresas por hora" },
    ],
    areasEn: ["Bronx", "Manhattan", "Brooklyn", "Queens", "Yonkers", "Mount Vernon", "New Rochelle", "White Plains", "Jersey City", "Hoboken", "Long Island City", "Astoria"],
    areasEs: ["Bronx", "Manhattan", "Brooklyn", "Queens", "Yonkers", "Mount Vernon", "New Rochelle", "White Plains", "Jersey City", "Hoboken", "Long Island City", "Astoria"],
    certsEn: ["USDOT 3290114 · MC 1042337", "AMSA ProMover", "BBB A+ Rated", "$100K Cargo Insurance", "NYS DOT T-39842", "Workers' Comp & GL Insured"],
    certsEs: ["USDOT 3290114 · MC 1042337", "AMSA ProMover", "BBB calificación A+", "Seguro de carga $100K", "NYS DOT T-39842", "Workers' Comp y RC asegurados"],
    guaranteeEn: { title: "Flat-rate, written-in-stone", blurb: "The quote you get is the price you pay. If we go over the estimate, the difference is on us. In writing." },
    guaranteeEs: { title: "Precio fijo, escrito en piedra", blurb: "El precio que recibes es el que pagas. Si nos pasamos del estimado, la diferencia es por nuestra cuenta. Por escrito." },
  },
  bakery: {
    stats: [
      { value: "30+", labelEn: "Years baking", labelEs: "Años horneando" },
      { value: "Daily", labelEn: "Pan dulce fresh", labelEs: "Pan dulce fresco" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "100s", labelEn: "Quinceañera cakes/yr", labelEs: "Pasteles de XV al año" },
    ],
    areasEn: ["Miami", "Hialeah", "Doral", "Kendall", "Coral Gables", "Homestead", "Miami Lakes", "Westchester", "Sweetwater", "Miami Springs", "Aventura", "Pinecrest"],
    areasEs: ["Miami", "Hialeah", "Doral", "Kendall", "Coral Gables", "Homestead", "Miami Lakes", "Westchester", "Sweetwater", "Miami Springs", "Aventura", "Pinecrest"],
    certsEn: ["FL Food Safety Certified", "ServSafe Trained Bakers", "Featured: Miami New Times", "Yelp Top 100 in FL", "Family Recipes Since 1995", "Same-day Custom Cakes"],
    certsEs: ["Certificación FL Food Safety", "Panaderos entrenados ServSafe", "Destacado: Miami New Times", "Yelp Top 100 de FL", "Recetas familiares desde 1995", "Pasteles personalizados el mismo día"],
    guaranteeEn: { title: "Fresh today or it's free", blurb: "Every concha, cake, and tray is baked the same morning you pick it up. If it's not fresh, it's free. Promise." },
    guaranteeEs: { title: "Fresco hoy o es gratis", blurb: "Cada concha, pastel y charola se hornea la misma mañana que lo recoges. Si no está fresco, es gratis. Promesa." },
  },
  glass: {
    stats: [
      { value: "Nationwide", valueEs: "Todo el país", labelEn: "We travel anywhere in CR", labelEs: "Vamos a todo Costa Rica" },
      { value: "Custom", valueEs: "A medida", labelEn: "Cut to any size", labelEs: "Cortado a su medida" },
      { value: "Free", valueEs: "Gratis", labelEn: "Measure & quote", labelEs: "Medición y cotización" },
      { value: "Bilingual", valueEs: "Bilingüe", labelEn: "English & Spanish", labelEs: "Inglés y español" },
    ],
    areasEn: ["San José", "Alajuela", "Heredia", "Cartago", "Guanacaste", "Puntarenas", "Limón", "Liberia", "Jacó", "Tamarindo", "Pérez Zeledón", "All of Costa Rica"],
    areasEs: ["San José", "Alajuela", "Heredia", "Cartago", "Guanacaste", "Puntarenas", "Limón", "Liberia", "Jacó", "Tamarindo", "Pérez Zeledón", "Todo Costa Rica"],
    certsEn: ["Se Habla Español", "Free Measure & Quote", "Tempered & Safety Glass", "Made to Measure", "Nationwide Installation", "Workmanship Guaranteed"],
    certsEs: ["Se Habla Español", "Medición y Cotización Gratis", "Vidrio Templado y de Seguridad", "Hecho a la Medida", "Instalación en Todo el País", "Mano de Obra Garantizada"],
    guaranteeEn: { title: "Fits right or we make it right", blurb: "Every piece is measured on site and installed by our own crew. If anything isn't right, we come back and fix it — anywhere in Costa Rica." },
    guaranteeEs: { title: "Queda bien o lo arreglamos", blurb: "Cada pieza se mide en sitio y la instala nuestro propio equipo. Si algo no está bien, regresamos y lo arreglamos — en cualquier parte de Costa Rica." },
  },
};

/* Real, named businesses we must never show fabricated facts for. Their curated
   SLUG_DATA is kept for offer-based stats/certs/guarantee, but their service-area
   lists are replaced at runtime with honest, city-derived placeholders so we
   never publish invented suburb lists (see honesty rule). */
const PROTECTED_SLUGS = new Set([
  "chales-garage",
  "nicaraguan-restaurant",
  "los-primos-plumbing",
  "hyperion-synthetic-turf",
]);

/* Graceful fallback so EVERY template (not just the ~13 in SLUG_DATA) shows the
   Stats / Areas / Certs / Guarantee sections. The derived defaults are
   deliberately generic and honest — no fabricated license numbers, no invented
   neighbor-town lists, no made-up year counts — so they are safe even for real
   named businesses (e.g. nicaraguan-restaurant) that are not in SLUG_DATA. */
function resolveSlugData(template: BusinessTemplate): SlugData {
  const primaryCity = (template.brand.city.split(",")[0] ?? template.brand.city).trim();
  const areasEn = [primaryCity, "Nearby neighborhoods", "Surrounding suburbs", "Greater metro area"];
  const areasEs = [primaryCity, "Barrios cercanos", "Suburbios cercanos", "Área metropolitana"];
  const explicit = SLUG_DATA[template.slug];
  if (explicit) {
    return PROTECTED_SLUGS.has(template.slug) ? { ...explicit, areasEn, areasEs } : explicit;
  }
  return {
    stats: [
      { value: "Local", valueEs: "Local", labelEn: "Locally owned & operated", labelEs: "Negocio local" },
      { value: "Bilingual", valueEs: "Bilingüe", labelEn: "English & Spanish", labelEs: "Inglés y español" },
      { value: "Free", valueEs: "Gratis", labelEn: "Estimates & quotes", labelEs: "Estimados y cotizaciones" },
      { value: "Honest", valueEs: "Honesto", labelEn: "Upfront, no surprises", labelEs: "Claro y sin sorpresas" },
    ],
    areasEn,
    areasEs,
    certsEn: ["Se Habla Español", "Free Quotes", "Locally Owned", "Satisfaction Focused", "Fast Response", "Trusted by Neighbors"],
    certsEs: ["Se Habla Español", "Cotización Gratis", "Negocio Local", "Enfocados en Satisfacción", "Respuesta Rápida", "Recomendado por Vecinos"],
    guaranteeEn: { title: "Your satisfaction, guaranteed", blurb: "We treat every customer like a neighbor and stand behind our work. If something isn't right, just tell us and we'll make it right." },
    guaranteeEs: { title: "Su satisfacción, garantizada", blurb: "Tratamos a cada cliente como a un vecino y respaldamos nuestro trabajo. Si algo no está bien, solo díganos y lo arreglamos." },
  };
}

/* Universal trust signals shown as a compact strip on every template. Generic,
   non-fabricated marketing trust phrases (safe for named businesses). */
const TRUST_SIGNALS: { Icon: LucideIcon; en: string; es: string }[] = [
  { Icon: Languages, en: "Se habla español", es: "Se habla español" },
  { Icon: DollarSign, en: "Free quotes", es: "Cotización gratis" },
  { Icon: ShieldCheck, en: "Work guaranteed", es: "Trabajo garantizado" },
  { Icon: Clock, en: "Fast response", es: "Respuesta rápida" },
  { Icon: Heart, en: "Locally owned", es: "Negocio local" },
];

/* Digits WhatsApp buttons open: the business's own number when PLW has put the
   client's PLW number on the site's phone (brand.whatsapp), else the site phone. */
function whatsappDigits(brand: BrandConfig): string {
  return (brand.whatsapp || brand.phoneHref).replace(/\D/g, "");
}

/* Build a WhatsApp deep link from a brand phone + a bilingual prefilled text. */
function waHref(brand: BrandConfig, text: string): string {
  const digits = whatsappDigits(brand);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/* Photo with an elegant, brand-tinted "Original photo pending" placeholder when
   the source is missing or fails to load. The placeholder reuses the SAME
   className as the image so it fills its container identically (object-cover
   surfaces, absolute hero fills, etc.). Honest by design: a real named business
   with no photo yet shows this instead of a stock substitute. */
function SiteImage({ src, alt, className, palette, lang, loading = "lazy" }: {
  src: string | undefined;
  alt: string;
  className: string;
  palette: BrandPalette;
  lang: Lang;
  loading?: "eager" | "lazy";
}) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => { setFailed(!src); }, [src]);
  if (failed || !src) {
    return (
      <div
        className={`${className} grid place-items-center text-center`}
        style={{ background: `linear-gradient(135deg, ${palette.heroFrom}, ${palette.heroTo})` }}
        aria-label={alt}
      >
        <div className="text-white/90 px-4">
          <ImageOff className="w-8 h-8 mx-auto mb-2 opacity-80" />
          <div className="text-xs font-semibold tracking-wide">
            {lang === "en" ? "Original photo pending" : "Imagen original pendiente"}
          </div>
        </div>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setFailed(true)} />;
}

/* Group slugs into broad industry categories so the renderer can adapt the quote
   form and show category-specific "wow" bands without hardcoding per-slug. */
type TemplateCategory = "food" | "auto" | "moving" | "beauty" | "emergency" | "events" | "trades";
const CATEGORY_BY_SLUG: Record<string, TemplateCategory> = {
  restaurant: "food", "nicaraguan-restaurant": "food", bakery: "food", catering: "food",
  auto: "auto", "auto-detailing": "auto", "chales-garage": "auto",
  moving: "moving",
  beauty: "beauty", barber: "beauty", nails: "beauty",
  "los-primos-plumbing": "emergency", hvac: "emergency", "garage-doors": "emergency",
  photography: "events", events: "events",
};
function templateCategory(slug: string): TemplateCategory {
  return CATEGORY_BY_SLUG[slug] ?? "trades";
}

/* An optional extra quote-form field per category (bilingual). Trades use the
   default 3 fields (no extra). */
function categoryExtraField(cat: TemplateCategory): { en: string; es: string; type: "text" | "date" } | null {
  switch (cat) {
    case "auto": return { en: "Vehicle of interest", es: "Vehículo de interés", type: "text" };
    case "moving": return { en: "Moving date", es: "Fecha de mudanza", type: "date" };
    case "food": return { en: "Event date (if catering)", es: "Fecha del evento (si es catering)", type: "date" };
    case "beauty": return { en: "Preferred date & time", es: "Fecha y hora preferida", type: "text" };
    case "events": return { en: "Event date", es: "Fecha del evento", type: "date" };
    case "emergency": return { en: "When do you need service?", es: "¿Cuándo necesita el servicio?", type: "text" };
    default: return null;
  }
}

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */
export default function BusinessSite({
  template, brand: brandOverride,
}: { template: BusinessTemplate; brand?: BrandOverride }) {
  const [lang, setLang] = useState<Lang>(template.lockedLang ?? "en");
  useEffect(() => {
    setLang(template.lockedLang ?? "en");
  }, [template.slug, template.lockedLang]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [selProject, setSelProject] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Respect prefers-reduced-motion: never autoplay looping footage for users
  // who asked the OS to minimize motion. Computed before first paint so the
  // video never briefly autoplays.
  const [videoPlaying, setVideoPlaying] = useState(
    () => !(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches),
  );

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setVideoPlaying(true);
    } else {
      v.pause();
      setVideoPlaying(false);
    }
  };

  const brand = { ...template.brand, ...brandOverride };
  const p = brand.palette;
  const t = template.content[lang];
  const HeroIcon = brand.heroIcon;
  const media = template.media;
  const assistant = template.assistant;
  const availability = template.availability;
  const offers = template.offers?.[lang];
  const captions = template.galleryCaptions?.[lang] ?? [];
  const data = resolveSlugData(template);
  const category = templateCategory(template.slug);
  const extraField = categoryExtraField(category);

  // Always speak the live greeting text (with the current business name) using
  // the realistic server-generated voice — never a stale prerecorded clip.
  const greetingText = assistant
    ? buildGreeting(assistant, lang, brand.name)
    : undefined;
  const greeting = useGreeting(greetingText, lang);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* AVAILABILITY MARQUEE */}
      {availability && (
        <div className="text-white text-xs sm:text-sm font-semibold py-2 px-4 text-center" style={{ background: `linear-gradient(90deg, ${p.primaryDark}, ${p.primary})` }}>
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-white" /></span>
              {lang === "en" ? "24-hour AI assistant on call" : "Asistente IA disponible 24 horas"}
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{availability[lang]}</span>
            <span>·</span>
            <span>{brand.phone}</span>
          </span>
        </div>
      )}

      {/* TOP BAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2 shrink-0">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="w-11 h-11 rounded-full object-contain bg-white ring-1 ring-slate-200" />
            ) : (
              <div className="w-9 h-9 rounded-lg grid place-items-center text-white" style={{ backgroundColor: p.primary }}>
                <HeroIcon className="w-5 h-5" />
              </div>
            )}
            <div className="leading-tight">
              <div className="font-bold text-slate-900 tracking-tight">{brand.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 hidden sm:block">{brand.city}</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <a href="#offers" className="hover:opacity-80">{lang === "en" ? "What We Offer" : "Lo Que Ofrecemos"}</a>
            {template.inventory && <a href="#inventory" className="hover:opacity-80">{lang === "en" ? "Inventory" : "Inventario"}</a>}
            <a href="#services" className="hover:opacity-80">{t.nav.services}</a>
            {template.videoGallery && <a href="#videos" className="hover:opacity-80">Videos</a>}
            <a href="#gallery" className="hover:opacity-80">{lang === "en" ? "Gallery" : "Galería"}</a>
            <a href="#process" className="hover:opacity-80">{t.nav.process}</a>
            <a href="#areas" className="hover:opacity-80">{lang === "en" ? "Areas" : "Áreas"}</a>
            <a href="#testimonials" className="hover:opacity-80">{t.nav.testimonials}</a>
            <a href="#faq" className="hover:opacity-80">{t.nav.faq}</a>
            <a href="#contact" className="hover:opacity-80">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            {!template.lockedLang && (
              <button
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border border-slate-300 hover:opacity-80 transition-colors"
              >{lang === "en" ? "ES" : "EN"}</button>
            )}
            <a href={brand.phoneHref} className="inline-flex items-center gap-2 text-white text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-lg shadow-sm transition-opacity hover:opacity-90" style={{ backgroundColor: p.primary }}>
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{brand.phone}</span>
              <span className="sm:hidden">{t.nav.call}</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO — full-bleed photo with brand-color overlay */}
      <section id="top" className="relative overflow-hidden min-h-[84vh] flex items-center" style={{ background: `linear-gradient(135deg, ${p.heroFrom}, ${p.heroVia}, ${p.heroTo})` }}>
        {/* Background photo */}
        {media?.heroVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={media.heroVideo}
            poster={media.heroPoster ?? media.hero}
            autoPlay={videoPlaying}
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            aria-label={lang === "en" ? `${brand.name} project film` : `Video de ${brand.name}`}
          />
        ) : media?.hero ? (
          <SiteImage src={media.hero} alt={`${brand.name} hero`} palette={p} lang={lang} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        ) : (
          <div className="absolute inset-0 grid place-items-center" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>
            <HeroIcon className="w-48 h-48 text-white/15 drop-shadow-2xl" />
          </div>
        )}
        {/* Brand-color gradient overlay — dark enough on the left for readable text,
            but lets the worker photo show clearly on the right half. */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(100deg, ${p.heroFrom}f2 0%, ${p.heroFrom}d9 36%, ${p.heroVia}8c 58%, ${p.heroTo}33 78%, transparent 100%)`,
          }}
        />
        {/* Soft bottom scrim so the floating cards and badges stay legible */}
        <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: `linear-gradient(to top, ${p.heroFrom}b3, transparent)` }} />
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 15% 20%, ${p.heroGlow1}, transparent 55%), radial-gradient(circle at 85% 80%, ${p.heroGlow2}, transparent 55%)` }} />

        {/* Hero video pause/play toggle (respects prefers-reduced-motion via videoPlaying) */}
        {media?.heroVideo && (
          <button
            type="button"
            onClick={toggleVideo}
            aria-label={videoPlaying ? (lang === "en" ? "Pause video" : "Pausar video") : (lang === "en" ? "Play video" : "Reproducir video")}
            className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur border border-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            {videoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-[1px]" />}
          </button>
        )}

        {media?.hero && !media?.heroVideo && (
          <ChangePhotoButton path={["media", "hero"]} className="absolute top-4 left-4 z-20" />
        )}

        {/* Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-24 lg:py-28">
          <div className="max-w-2xl text-white">
            {brand.logo && (
              <img src={brand.logo} alt={brand.name} className="h-14 w-14 mb-4 sm:h-16 sm:w-16 sm:mb-5 rounded-2xl object-contain bg-white/10 backdrop-blur ring-1 ring-white/25 p-2 shadow-xl" />
            )}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/25 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 sm:mb-6" style={{ color: p.accent }}>
              <Star className="w-3.5 h-3.5" style={{ fill: p.accent, color: p.accent }} />{" "}
              <EditableText as="span" path={["content", lang, "hero", "eyebrow"]} value={t.hero.eyebrow} />
            </div>
            <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] sm:leading-[1.02] tracking-tight mb-4 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              <EditableText as="span" path={["content", lang, "hero", "title1"]} value={t.hero.title1} />{" "}
              <EditableText as="span" path={["content", lang, "hero", "title2"]} value={t.hero.title2} style={{ color: p.accent }} />
            </h1>
            <EditableText as="p" multiline path={["content", lang, "hero", "subtitle"]} value={t.hero.subtitle} className="text-base sm:text-xl text-white/90 max-w-xl mb-7 sm:mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]" />
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={template.inventory ? "#inventory" : "#contact"} className="inline-flex items-center justify-center gap-2 text-white font-bold px-7 py-4 rounded-lg shadow-2xl transition-all hover:translate-y-[-2px] hover:scale-[1.02]" style={{ backgroundColor: p.primary, boxShadow: `0 18px 40px -10px ${p.primary}` }}>
                {t.hero.cta1} <ArrowRight className="w-4 h-4" />
              </a>
              <a href={brand.phoneHref} className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold px-7 py-4 rounded-lg transition-colors">
                <Phone className="w-4 h-4" /> {brand.phone}
              </a>
              {template.videoGallery && (
                <a href="#videos" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/25 text-white font-bold px-7 py-4 rounded-lg transition-colors">
                  <Play className="w-4 h-4" /> {lang === "en" ? "Watch Videos" : "Ver Videos"}
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {t.hero.badges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 backdrop-blur border border-white/20 text-white px-3 py-1.5 rounded-full">
                  <Check className="w-3 h-3" style={{ color: p.accent }} /> {b}
                </span>
              ))}
            </div>
          </div>

          {/* Floating trust + rating cards */}
          <div className="hidden lg:block absolute right-6 bottom-8 space-y-3 max-w-[280px]">
            <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 grid place-items-center text-emerald-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold">{t.hero.trustTitle}</div>
                <div className="text-slate-500">{t.hero.trustSubtitle}</div>
              </div>
            </div>
            <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 grid place-items-center text-amber-600 shrink-0">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <div className="text-xs">
                <div className="font-bold">{t.hero.ratingTitle}</div>
                <div className="text-slate-500">{t.hero.ratingSubtitle}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND FILM — cinematic autoplay loop */}
      {media?.video && (
        <section className="relative bg-slate-950">
          <div className="relative w-full overflow-hidden aspect-video max-h-[78vh]">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={media.video}
              poster={media.hero}
              autoPlay={videoPlaying}
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
              aria-label={lang === "en" ? `${brand.name} brand film` : `Video de ${brand.name}`}
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${p.heroFrom}e6 0%, ${p.heroFrom}40 45%, transparent 75%)` }} />
            <button
              type="button"
              onClick={toggleVideo}
              aria-label={videoPlaying ? (lang === "en" ? "Pause video" : "Pausar video") : (lang === "en" ? "Play video" : "Reproducir video")}
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/45 hover:bg-black/65 text-white backdrop-blur border border-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              {videoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-[1px]" />}
            </button>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
              <div className="max-w-7xl mx-auto">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 mb-3">
                  <span className={`inline-flex w-2 h-2 rounded-full ${videoPlaying ? "bg-red-500 animate-pulse" : "bg-white/50"}`} />
                  {videoPlaying ? (lang === "en" ? "Now playing" : "Reproduciendo") : (lang === "en" ? "Paused" : "En pausa")}
                </div>
                <h2 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                  {lang === "en" ? "See the craft in motion" : "Mira nuestro trabajo en acción"}
                </h2>
                <p className="text-white/90 mt-3 max-w-xl text-base sm:text-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {lang === "en"
                    ? `A behind-the-scenes look at how ${brand.name} brings care, skill, and pride to every single job.`
                    : `Un vistazo a cómo ${brand.name} pone cuidado, destreza y orgullo en cada trabajo.`}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STATS STRIP */}
      {data && (
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {data.stats.map((s) => (
              <div key={s.value} className="text-center flex flex-col">
                <div className="font-extrabold text-2xl sm:text-3xl leading-tight tracking-tight flex items-center justify-center min-h-[2.5rem] sm:min-h-[3.25rem]" style={{ color: p.primary }}>{lang === "es" && s.valueEs ? s.valueEs : s.value}</div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">{lang === "en" ? s.labelEn : s.labelEs}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* UNIVERSAL TRUST STRIP — always shown, generic & honest */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
          {TRUST_SIGNALS.map((s) => (
            <div key={s.en} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span className="grid place-items-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: `${p.primary}14`, color: p.primary }}>
                <s.Icon className="w-4 h-4" />
              </span>
              {lang === "en" ? s.en : s.es}
            </div>
          ))}
        </div>
      </section>

      {/* ASSISTANT AUDIO STRIP */}
      {assistant && (
        <section id="assistant" className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-[auto,1fr,auto] gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {media?.teamPortrait ? (
                  <img src={media.teamPortrait} alt={assistant.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
                ) : (
                  <div className="w-20 h-20 rounded-full grid place-items-center text-white font-extrabold text-2xl shadow-lg" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>{assistant.name.charAt(0)}</div>
                )}
                <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white" title="online" />
                {brand.logo && (
                  <img src={brand.logo} alt="" className="absolute -top-1.5 -left-1.5 w-8 h-8 rounded-full object-contain bg-white ring-2 ring-white shadow-md" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: p.primary }}>
                  {lang === "en" ? "Live · Online now" : "En vivo · Conectada ahora"}
                </div>
                <div className="font-extrabold text-xl tracking-tight">{assistant.name}</div>
                <div className="text-xs text-slate-500">{lang === "en" ? assistant.roleEn : assistant.roleEs} · {brand.name}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 px-5 py-4 shadow-sm">
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                <Quote className="inline w-4 h-4 mr-1 -mt-1" style={{ color: p.primary }} />
                {buildGreeting(assistant, lang, brand.name)}
              </p>
              {greeting.supported && (
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={greeting.toggle}
                    className="inline-flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: p.primary }}
                    aria-label={greeting.playing ? "Pause greeting" : "Play greeting"}
                  >
                    {greeting.playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {greeting.playing
                      ? (lang === "en" ? "Pause" : "Pausar")
                      : (lang === "en" ? "Listen to greeting" : "Escuchar saludo")}
                  </button>
                  <div className="text-xs text-slate-500 inline-flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5" /> {lang === "en" ? "15-second voice intro" : "Saludo de 15 segundos"}
                  </div>
                </div>
              )}
            </div>

            <a href={brand.phoneHref} className="hidden md:inline-flex items-center justify-center gap-2 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: p.primaryDark }}>
              <MessageCircle className="w-4 h-4" />
              {lang === "en" ? "Talk to a human" : "Habla con una persona"}
            </a>
          </div>
        </section>
      )}

      {/* WHAT WE OFFER */}
      {offers && (
        <section id="offers" className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeader
              eyebrow={lang === "en" ? "What we offer" : "Lo que ofrecemos"}
              title={lang === "en" ? "Everything you need, around the clock" : "Todo lo que necesitas, a toda hora"}
              blurb={lang === "en"
                ? "Real humans, real availability — no robots, no bots, no waiting on hold."
                : "Personas reales, disponibilidad real — sin robots, sin bots, sin esperas."}
              accent={p.primary}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
              {offers.map((o) => {
                const Icon = OFFER_ICONS[o.icon] ?? Check;
                return (
                  <div key={o.title} className="rounded-2xl p-6 bg-white border border-slate-200 hover:shadow-lg transition-shadow flex gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl grid place-items-center" style={{ backgroundColor: `${p.primary}1A`, color: p.primary }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold tracking-tight mb-1">{o.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{o.blurb}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* VIDEO GALLERY — click-to-play portrait cards (no autoplay; fast on mobile) */}
      {template.videoGallery && template.videoGallery.items.length > 0 && (
        <section id="videos" className="py-20 sm:py-24 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeader
              eyebrow={
                template.videoGallery.eyebrow
                  ? (lang === "en" ? template.videoGallery.eyebrow.en : template.videoGallery.eyebrow.es)
                  : (lang === "en" ? "Real work, on video" : "Trabajo real, en video")
              }
              title={lang === "en" ? template.videoGallery.title.en : template.videoGallery.title.es}
              blurb={lang === "en" ? template.videoGallery.blurb.en : template.videoGallery.blurb.es}
              dark
              accent={p.accent}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {template.videoGallery.items.map((v) => (
                <VideoCard
                  key={v.src}
                  src={v.src}
                  poster={v.poster}
                  title={lang === "en" ? v.title.en : v.title.es}
                  caption={lang === "en" ? v.caption.en : v.caption.es}
                  ctaLabel={
                    template.videoGallery!.ctaLabel
                      ? (lang === "en" ? template.videoGallery!.ctaLabel.en : template.videoGallery!.ctaLabel.es)
                      : (lang === "en" ? "Get a Similar Project" : "Quiero un Proyecto Así")
                  }
                  palette={p}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INVENTORY */}
      {template.inventory && (
        <InventorySection inv={template.inventory} lang={lang} p={p} brand={brand} />
      )}

      {/* FINANCING / PERSONAL SOURCING BAND — dealership only */}
      {template.inventory && (
        <section id="financing" className="relative overflow-hidden bg-slate-950 text-white">
          <img
            src={media?.gallery?.[5] ?? media?.gallery?.[media.gallery.length - 1] ?? media?.hero}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${p.heroFrom}f2 0%, ${p.heroVia}d9 55%, ${p.heroTo}b3 100%)` }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
            <div className="text-center max-w-2xl mx-auto">
              {brand.logo && (
                <img src={brand.logo} alt={brand.name} className="mx-auto mb-5 h-16 w-16 rounded-2xl object-contain bg-white/95 ring-1 ring-white/20 p-2 shadow-xl" />
              )}
              <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: p.accent }}>
                {lang === "en" ? "Financing & personal search" : "Financiamiento y búsqueda personalizada"}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {lang === "en" ? "We make it easy to drive away happy" : "Le hacemos fácil estrenar vehículo"}
              </h2>
              <p className="mt-4 text-white/75">
                {lang === "en"
                  ? "Flexible financing and a team that hunts down the exact vehicle you want — just tell us what you're looking for."
                  : "Financiamiento flexible y un equipo que le busca el vehículo exacto que desea — solo díganos qué está buscando."}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 mt-10 max-w-3xl mx-auto">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/15 backdrop-blur p-6 flex flex-col">
                <div className="w-12 h-12 rounded-xl grid place-items-center mb-4 text-white" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>
                  <Banknote className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl tracking-tight mb-1.5">
                  {lang === "en" ? "Financing available" : "Financiamiento disponible"}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  {lang === "en"
                    ? "Options to fit your budget, with friendly guidance at every step and credit answers fast."
                    : "Opciones a su presupuesto, con asesoría amable en cada paso y respuesta de crédito rápida."}
                </p>
                <a
                  href={`https://wa.me/${whatsappDigits(brand)}?text=${encodeURIComponent(lang === "en" ? "Hi! I'd like to know about your financing options." : "¡Hola! Quisiera conocer sus opciones de financiamiento.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="w-4 h-4" /> {lang === "en" ? "Ask about financing" : "Consultar financiamiento"}
                </a>
              </div>
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/15 backdrop-blur p-6 flex flex-col">
                <div className="w-12 h-12 rounded-xl grid place-items-center mb-4 text-white" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl tracking-tight mb-1.5">
                  {lang === "en" ? "We find your car for you" : "Le buscamos el carro"}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  {lang === "en"
                    ? "Don't see it on the lot? Tell us the make, model, and budget and we'll track it down for you."
                    : "¿No lo ve en el lote? Díganos marca, modelo y presupuesto y se lo conseguimos."}
                </p>
                <a
                  href={`https://wa.me/${whatsappDigits(brand)}?text=${encodeURIComponent(lang === "en" ? "Hi! I'm looking for a specific vehicle. Can you help me find it?" : "¡Hola! Estoy buscando un vehículo en específico. ¿Me ayudan a encontrarlo?")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="w-4 h-4" /> {lang === "en" ? "Tell us what you want" : "Díganos qué busca"}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section id="services" className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t.nav.services} title={t.services.title} blurb={t.services.blurb} accent={p.primary} eyebrowPath={["content", lang, "nav", "services"]} titlePath={["content", lang, "services", "title"]} blurbPath={["content", lang, "services", "blurb"]} />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {t.services.items.map((s, i) => {
              const Icon = template.serviceIcons[i] ?? template.serviceIcons[0]!;
              const photo = media?.gallery[i] ?? media?.hero;
              return (
                <div key={s.title} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  {photo && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img src={photo} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                    </div>
                  )}
                  <div className="p-7">
                    <div className={`w-12 h-12 rounded-xl grid place-items-center mb-5 relative bg-white shadow-md ring-1 ring-slate-100 ${photo ? "-mt-12" : ""}`} style={{ color: p.primary }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 tracking-tight">{s.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{s.blurb}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IN ACTION — photo-forward feature band */}
      {media && (
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 lg:space-y-24">
            {/* Row 1 — image left, copy right */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                  <img src={media.gallery[media.gallery.length - 2] ?? media.hero} alt={lang === "en" ? `${brand.name} crew on the job` : `Equipo de ${brand.name} trabajando`} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="hidden sm:flex absolute -bottom-5 -right-5 items-center gap-3 bg-white rounded-2xl shadow-xl px-5 py-4 ring-1 ring-slate-100">
                  <div className="w-11 h-11 rounded-full grid place-items-center text-white shrink-0" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>
                    <ThumbsUp className="w-5 h-5" />
                  </div>
                  <div className="text-sm leading-tight">
                    <div className="font-extrabold text-slate-900">{lang === "en" ? "Done right" : "Bien hecho"}</div>
                    <div className="text-slate-500 text-xs">{lang === "en" ? "the first time" : "a la primera"}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.primary }}>
                  {lang === "en" ? "See us on the job" : "Míranos trabajando"}
                </div>
                <h3 className="font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 mb-4">
                  {lang === "en" ? "Skilled hands you can trust" : "Manos expertas en quien confiar"}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  {lang === "en"
                    ? "From the first knock to the final walk-through, our crew treats your property like our own — careful prep, premium materials, and a clean job site every single day."
                    : "Desde que tocamos la puerta hasta la inspección final, tratamos su propiedad como la nuestra — preparación cuidadosa, materiales premium y un sitio de trabajo limpio todos los días."}
                </p>
                <ul className="space-y-3">
                  {(lang === "en"
                    ? ["Background-checked, uniformed professionals", "Upfront pricing — no surprises", "Photos and updates as the work gets done"]
                    : ["Profesionales uniformados y verificados", "Precios claros — sin sorpresas", "Fotos y avisos mientras avanza el trabajo"]
                  ).map((li) => (
                    <li key={li} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: p.primary }} />
                      <span className="text-slate-700">{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Row 2 — copy left, image right */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="lg:order-2">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                  <img src={media.gallery[media.gallery.length - 1] ?? media.hero} alt={lang === "en" ? `${brand.name} delivering quality work` : `${brand.name} entregando trabajo de calidad`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="lg:order-1">
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.primary }}>
                  {lang === "en" ? "Bilingual, every step" : "Bilingüe en cada paso"}
                </div>
                <h3 className="font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 mb-4">
                  {lang === "en" ? "We speak your language" : "Hablamos su idioma"}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  {lang === "en"
                    ? "English or Spanish, you'll always know exactly what's happening and what it costs. Real people answer the phone, day or night — no robots, no runaround."
                    : "En inglés o español, siempre sabrá exactamente qué está pasando y cuánto cuesta. Personas reales contestan el teléfono, de día o de noche — sin robots, sin vueltas."}
                </p>
                <a href={brand.phoneHref} className="inline-flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: p.primary }}>
                  <Phone className="w-4 h-4" /> {brand.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TRANSFORMATION — before / during / after */}
      {template.transformation && template.transformation.steps.length > 0 && (
        <section id="transformation" className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeader
              eyebrow={lang === "en" ? "The transformation" : "La transformación"}
              title={lang === "en" ? template.transformation.title.en : template.transformation.title.es}
              blurb={lang === "en" ? template.transformation.blurb.en : template.transformation.blurb.es}
              accent={p.primary}
            />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {template.transformation.steps.map((s, i) => (
                <figure key={s.src} className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={s.src} alt={lang === "en" ? s.label.en : s.label.es} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-full" style={{ backgroundColor: p.primary }}>
                      {i + 1} · {lang === "en" ? s.phase.en : s.phase.es}
                    </span>
                  </div>
                  <figcaption className="p-5">
                    <div className="font-bold tracking-tight mb-1">{lang === "en" ? s.label.en : s.label.es}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{lang === "en" ? s.caption.en : s.caption.es}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {media && media.gallery.length > 0 && (
        <section id="gallery" className="py-20 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeader
              eyebrow={lang === "en" ? "Recent work" : "Trabajos recientes"}
              title={lang === "en" ? "Real projects, real results" : "Proyectos reales, resultados reales"}
              accent={p.primary}
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[170px] sm:auto-rows-[220px] gap-4 mt-12">
              {media.gallery.map((src, i) => (
                <figure key={src} className={`group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <SiteImage src={src} alt={captions[i] ?? `Project ${i+1}`} palette={p} lang={lang} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {captions[i] && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-sm font-semibold p-4">
                      {captions[i]}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CLIENT TRUST — real people, no celebrity claims */}
      {template.clientTrust && template.clientTrust.images.length > 0 && (
        <section id="trust" className="py-20 sm:py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeader
              eyebrow={lang === "en" ? "Real people" : "Personas reales"}
              title={lang === "en" ? template.clientTrust.title.en : template.clientTrust.title.es}
              blurb={lang === "en" ? template.clientTrust.blurb.en : template.clientTrust.blurb.es}
              accent={p.primary}
            />
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {template.clientTrust.images.map((img) => (
                <figure key={img.src} className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={img.src} alt={lang === "en" ? img.caption.en : img.caption.es} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white text-sm font-semibold p-5">
                    {lang === "en" ? img.caption.en : img.caption.es}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HERITAGE — country & history */}
      {template.heritage && template.heritage.images.length > 0 && (
        <section id="heritage" className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeader
              eyebrow={lang === "en" ? "Our roots" : "Nuestras raíces"}
              title={lang === "en" ? template.heritage.title.en : template.heritage.title.es}
              accent={p.primary}
            />
            <p className="max-w-3xl mx-auto text-center text-slate-600 leading-relaxed mt-4">
              {lang === "en" ? template.heritage.blurb.en : template.heritage.blurb.es}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[200px] sm:auto-rows-[240px] gap-4 mt-12">
              {template.heritage.images.map((img, i) => (
                <figure
                  key={img.src}
                  className={`group relative rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200 ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                >
                  <img
                    src={img.src}
                    alt={lang === "en" ? img.en : img.es}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-sm font-semibold p-4">
                    {lang === "en" ? img.en : img.es}
                  </figcaption>
                </figure>
              ))}
            </div>

            {template.heritage.history && template.heritage.history.milestones.length > 0 && (
              <div className="mt-20">
                <h3 className="text-center font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900">
                  {lang === "en" ? template.heritage.history.title.en : template.heritage.history.title.es}
                </h3>
                <ol className="relative mt-12 max-w-3xl mx-auto">
                  <span
                    className="absolute left-[27px] sm:left-1/2 sm:-translate-x-1/2 top-2 bottom-2 w-0.5 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${p.primary}, ${p.primary}22)` }}
                    aria-hidden="true"
                  />
                  {template.heritage.history.milestones.map((m, i) => (
                    <li
                      key={m.year.en + i}
                      className={`relative pl-20 sm:pl-0 sm:w-1/2 pb-10 last:pb-0 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"}`}
                    >
                      <span
                        className={`absolute top-1 z-10 grid place-items-center w-14 h-14 rounded-full text-white font-extrabold text-sm shadow-lg ring-4 ring-white left-0 ${i % 2 === 0 ? "sm:left-auto sm:-right-7" : "sm:-left-7"}`}
                        style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}
                      >
                        {lang === "en" ? m.year.en : m.year.es}
                      </span>
                      <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-5 shadow-sm">
                        <div className="font-bold text-slate-900">
                          {lang === "en" ? m.title.en : m.title.es}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mt-1.5">
                          {lang === "en" ? m.text.en : m.text.es}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      )}

      {/* GUARANTEE CALLOUT */}
      {data && (
        <section className="py-16 text-white" style={{ background: `linear-gradient(135deg, ${p.primaryDark}, ${p.primary})` }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/15 grid place-items-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: p.accent }}>
                {lang === "en" ? "Our promise" : "Nuestra promesa"}
              </div>
              <h3 className="font-extrabold text-2xl sm:text-3xl tracking-tight mb-2">
                {lang === "en" ? data.guaranteeEn.title : data.guaranteeEs.title}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {lang === "en" ? data.guaranteeEn.blurb : data.guaranteeEs.blurb}
              </p>
            </div>
            <a href={brand.phoneHref} className="shrink-0 inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-5 py-3 rounded-xl shadow-md hover:opacity-90 transition-opacity">
              <Phone className="w-4 h-4" /> {brand.phone}
            </a>
          </div>
        </section>
      )}

      {/* MEET THE CREW */}
      {media?.teamPortrait && (
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.9fr,1.1fr] gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <SiteImage src={media.teamPortrait} alt={brand.name} palette={p} lang={lang} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 left-5 right-5 sm:left-8 sm:right-auto bg-white rounded-2xl shadow-xl px-5 py-4 ring-1 ring-slate-100 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["A", "M", "J"].map((c) => (
                    <span key={c} className="w-8 h-8 rounded-full border-2 border-white grid place-items-center text-white text-xs font-bold" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>{c}</span>
                  ))}
                </div>
                <div className="text-xs leading-tight">
                  <div className="font-extrabold text-slate-900">{lang === "en" ? "Your local crew" : "Su equipo local"}</div>
                  <div className="text-slate-500">{lang === "en" ? "ready to help today" : "listos para ayudar hoy"}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.primary }}>
                {lang === "en" ? "Meet the team" : "Conozca al equipo"}
              </div>
              <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 mb-4">
                {lang === "en" ? "A local team that actually shows up" : "Un equipo local que sí llega"}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-7 text-lg">
                {lang === "en"
                  ? `We're your neighbors in ${brand.city.split(",")[0]} — proud of our work and proud to serve our community. When you call ${brand.name}, you get real people who care about doing the job right.`
                  : `Somos sus vecinos en ${brand.city.split(",")[0]} — orgullosos de nuestro trabajo y de servir a nuestra comunidad. Cuando llama a ${brand.name}, le contesta gente de verdad que se preocupa por hacer bien el trabajo.`}
              </p>
              {data && (
                <div className="grid sm:grid-cols-3 gap-4">
                  {data.stats.slice(0, 3).map((s) => (
                    <div key={s.value} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                      <div className="font-extrabold text-2xl tracking-tight" style={{ color: p.primary }}>{lang === "es" && s.valueEs ? s.valueEs : s.value}</div>
                      <div className="text-xs text-slate-600 mt-1">{lang === "en" ? s.labelEn : s.labelEs}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* WHY */}
      <section id="why" className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t.nav.why} title={t.why.title} accent={p.primary} eyebrowPath={["content", lang, "nav", "why"]} titlePath={["content", lang, "why", "title"]} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {t.why.items.map((w, i) => {
              const Icon = template.whyIcons[i] ?? template.whyIcons[0]!;
              return (
                <div key={w.title} className="rounded-2xl p-6 bg-white border border-slate-200">
                  <div className="w-11 h-11 rounded-lg grid place-items-center mb-4" style={{ backgroundColor: p.heroFrom, color: p.accent }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold mb-1.5">{w.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{w.blurb}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-20 sm:py-24 text-white" style={{ background: `linear-gradient(135deg, ${p.heroFrom}, ${p.heroTo})` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t.nav.process} title={t.process.title} dark accent={p.accent} eyebrowPath={["content", lang, "nav", "process"]} titlePath={["content", lang, "process", "title"]} />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {t.process.items.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur">
                <div className="absolute -top-4 left-6 w-10 h-10 rounded-xl text-white grid place-items-center font-extrabold shadow-lg" style={{ backgroundColor: p.primary }}>
                  {i + 1}
                </div>
                <h4 className="font-bold mt-4 mb-1.5">{s.title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{s.blurb}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SERVICE AREAS */}
      {data && (
        <section id="areas" className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeader
              eyebrow={lang === "en" ? "Service area" : "Área de servicio"}
              title={lang === "en" ? `Proudly serving ${brand.city.split(",")[0]} & surrounding areas` : `Sirviendo con orgullo a ${brand.city.split(",")[0]} y áreas cercanas`}
              blurb={lang === "en"
                ? "Same-day arrival across our service area. Not on the list? Call — we probably still come out."
                : "Llegada el mismo día en toda nuestra área. ¿No está en la lista? Llama — probablemente vamos."}
              accent={p.primary}
            />
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {(lang === "en" ? data.areasEn : data.areasEs).map((city) => (
                <div key={city} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:shadow-md transition-shadow">
                  <MapPinned className="w-4 h-4 shrink-0" style={{ color: p.primary }} />
                  <span className="text-sm font-medium text-slate-700">{city}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US — comparison */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow={lang === "en" ? "The difference" : "La diferencia"}
            title={lang === "en" ? `Why neighbors choose ${brand.name}` : `Por qué los vecinos eligen ${brand.name}`}
            accent={p.primary}
          />
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border-2 p-7 sm:p-8 shadow-xl bg-white" style={{ borderColor: p.primary }}>
              <div className="inline-flex items-center gap-2 font-extrabold text-lg mb-5" style={{ color: p.primary }}>
                <BadgeCheck className="w-6 h-6" /> {brand.name}
              </div>
              <ul className="space-y-3.5">
                {(lang === "en"
                  ? ["A real person answers 24/7 — in English or Spanish", "Upfront, written pricing before we start", "Licensed, insured & background-checked crew", "Photos and updates throughout the job", "Satisfaction guarantee on every visit", "Same-week — often same-day — scheduling"]
                  : ["Una persona real contesta 24/7 — en inglés o español", "Precio claro y por escrito antes de empezar", "Equipo con licencia, seguro y antecedentes verificados", "Fotos y avisos durante todo el trabajo", "Garantía de satisfacción en cada visita", "Citas la misma semana — muchas veces el mismo día"]
                ).map((li) => (
                  <li key={li} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: p.primary }} />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
              <div className="inline-flex items-center gap-2 font-bold text-lg mb-5 text-slate-400">
                <X className="w-6 h-6" /> {lang === "en" ? "The other guys" : "Los demás"}
              </div>
              <ul className="space-y-3.5">
                {(lang === "en"
                  ? ["Voicemail, missed calls, no callback", "Surprise charges added after the work", "Unverified, uninsured subcontractors", "Radio silence once they leave", "You're on your own if something goes wrong", "Two-week waits just for an appointment"]
                  : ["Buzón de voz, llamadas perdidas, sin respuesta", "Cargos sorpresa después del trabajo", "Subcontratistas sin verificar ni seguro", "Cero comunicación cuando se van", "Si algo sale mal, te dejan solo", "Esperas de dos semanas solo para una cita"]
                ).map((li) => (
                  <li key={li} className="flex items-start gap-3 text-slate-400">
                    <X className="w-5 h-5 mt-0.5 shrink-0" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t.nav.testimonials} title={t.testimonials.title} accent={p.primary} eyebrowPath={["content", lang, "nav", "testimonials"]} titlePath={["content", lang, "testimonials", "title"]} />

          {/* aggregate rating + platform trust — hidden for real named businesses (no fabricated ratings/counts) */}
          {!PROTECTED_SLUGS.has(template.slug) && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-extrabold text-slate-900">4.9</div>
              <div>
                <div className="flex gap-0.5 text-amber-500">{[0,1,2,3,4].map((i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}</div>
                <div className="text-xs text-slate-500 mt-0.5">{lang === "en" ? "240+ verified reviews" : "240+ reseñas verificadas"}</div>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1.5 shadow-sm text-sm font-semibold text-slate-700">
                <GoogleG /> 4.9 <span className="text-slate-400 font-normal">· Google</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1.5 shadow-sm text-sm font-semibold text-slate-700">
                <YelpBadge /> 4.8 <span className="text-slate-400 font-normal">· Yelp</span>
              </span>
            </div>
          </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {(PROTECTED_SLUGS.has(template.slug) ? t.testimonials.items : [...t.testimonials.items, ...EXTRA_REVIEWS[lang]]).map((tt, i) => {
              const isProtectedReview = PROTECTED_SLUGS.has(template.slug);
              const avatar = REVIEW_AVATARS[i % REVIEW_AVATARS.length];
              const platform = REVIEW_PLATFORMS[i % REVIEW_PLATFORMS.length];
              const date = REVIEW_DATES[lang][i % REVIEW_DATES[lang].length];
              return (
                <figure key={tt.name} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={avatar} alt={tt.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" loading="lazy" />
                      <div>
                        <div className="font-bold text-sm flex items-center gap-1 text-slate-900">{tt.name} {!isProtectedReview && <BadgeCheck className="w-3.5 h-3.5 text-sky-500" />}</div>
                        <div className="text-xs text-slate-500">{tt.role}</div>
                      </div>
                    </div>
                    {!isProtectedReview && (platform === "Google" ? <GoogleG className="w-5 h-5" /> : <YelpBadge />)}
                  </div>
                  {!isProtectedReview && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5 text-amber-500">{[0,1,2,3,4].map((s) => <Star key={s} className="w-4 h-4 fill-amber-500" />)}</div>
                    <span className="text-xs text-slate-400">{date}</span>
                  </div>
                  )}
                  <blockquote className="text-slate-700 leading-relaxed text-sm flex-1">“{tt.quote}”</blockquote>
                  <figcaption className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {isProtectedReview
                      ? (lang === "en" ? "Customer feedback" : "Comentario de cliente")
                      : (lang === "en" ? `Verified ${platform} review` : `Reseña verificada de ${platform}`)}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      {data && (
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: p.primary }}>
                {lang === "en" ? "Trust & Credentials" : "Confianza y Credenciales"}
              </div>
              <h3 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900">
                {lang === "en" ? "Licensed, insured, and proudly certified" : "Con licencia, seguro y orgullosamente certificados"}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {(lang === "en" ? data.certsEn : data.certsEs).map((c) => (
                <div key={c} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 flex flex-col items-center text-center gap-2 hover:bg-white hover:shadow-md transition-all">
                  <Award className="w-5 h-5" style={{ color: p.primary }} />
                  <span className="text-xs font-semibold text-slate-700 leading-snug">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow={t.nav.faq} title={t.faq.title} accent={p.primary} eyebrowPath={["content", lang, "nav", "faq"]} titlePath={["content", lang, "faq", "title"]} />
          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {t.faq.items.map((it, i) => {
              const open = openFaq === i;
              return (
                <div key={it.q}>
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
                    <span className="font-semibold text-slate-900">{it.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && <p className="pb-5 text-slate-600 leading-relaxed">{it.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MID CTA BANNER */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(115deg, ${p.heroFrom}, ${p.heroVia}, ${p.heroTo})` }}>
        {media?.hero && (
          <img src={media.hero} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" />
        )}
        <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${p.heroFrom}f2, ${p.heroTo}b3)` }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center text-white">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
            {lang === "en" ? "Ready when you are — day or night" : "Listos cuando usted quiera — de día o de noche"}
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            {lang === "en"
              ? "Get a free, no-obligation estimate in minutes. Real people, real answers, in your language."
              : "Reciba un estimado gratis y sin compromiso en minutos. Personas reales, respuestas reales, en su idioma."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-lg shadow-2xl transition-all hover:translate-y-[-2px] bg-white" style={{ color: p.primaryDark }}>
              {t.hero.cta1} <ArrowRight className="w-4 h-4" />
            </a>
            <a href={brand.phoneHref} className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold px-7 py-4 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> {brand.phone}
            </a>
          </div>
        </div>
      </section>

      {/* PROJECT SELECTOR — interactive */}
      {template.projectSelector && template.projectSelector.options.length > 0 && (
        <section id="selector" className="py-20 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <SectionHeader
              eyebrow={lang === "en" ? "Find your fit" : "Encuentre su opción"}
              title={lang === "en" ? template.projectSelector.title.en : template.projectSelector.title.es}
              blurb={lang === "en" ? template.projectSelector.blurb.en : template.projectSelector.blurb.es}
              accent={p.primary}
            />
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {template.projectSelector.options.map((o, i) => {
                const active = selProject === i;
                return (
                  <button
                    key={o.en}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelProject(i)}
                    className="text-sm font-semibold px-4 py-2.5 rounded-full border transition-colors"
                    style={active
                      ? { backgroundColor: p.primary, borderColor: p.primary, color: "#fff" }
                      : { backgroundColor: "#fff", borderColor: "#e2e8f0", color: "#334155" }}
                  >
                    {lang === "en" ? o.en : o.es}
                  </button>
                );
              })}
            </div>
            {selProject !== null && (
              <div className="mt-8 rounded-2xl border p-6 sm:p-8 text-center" style={{ borderColor: `${p.primary}40`, backgroundColor: `${p.primary}0D` }}>
                <div className="inline-flex items-center gap-2 font-bold mb-2" style={{ color: p.primary }}>
                  <CheckCircle2 className="w-5 h-5" />
                  {lang === "en" ? template.projectSelector.options[selProject]!.en : template.projectSelector.options[selProject]!.es}
                </div>
                <p className="text-slate-700 max-w-2xl mx-auto leading-relaxed">
                  {lang === "en" ? template.projectSelector.recommendation.en : template.projectSelector.recommendation.es}
                </p>
                <a href="#contact" className="inline-flex items-center justify-center gap-2 mt-5 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-opacity hover:opacity-90" style={{ backgroundColor: p.primary }}>
                  {lang === "en" ? "Get a Free Estimate" : "Estimado Gratis"} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* INDUSTRY WOW BAND — food: order by WhatsApp */}
      {category === "food" && (
        <section className="py-14 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">
                {lang === "en" ? "Hungry? Order or reserve in seconds" : "¿Con hambre? Ordene o reserve en segundos"}
              </h3>
              <p className="mt-1 text-white/70">
                {lang === "en" ? "Message us on WhatsApp for pickup, delivery, or a table." : "Escríbanos por WhatsApp para recoger, entrega o una mesa."}
              </p>
            </div>
            <a
              href={waHref(brand, lang === "en" ? `Hi ${brand.name}! I'd like to place an order.` : `¡Hola ${brand.name}! Quisiera hacer un pedido.`)}
              target="_blank" rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-lg text-white shadow-xl transition-transform hover:translate-y-[-2px]"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="w-5 h-5" /> {lang === "en" ? "Order on WhatsApp" : "Ordenar por WhatsApp"}
            </a>
          </div>
        </section>
      )}

      {/* INDUSTRY WOW BAND — emergency trades: 24/7 service */}
      {category === "emergency" && (
        <section className="py-14 text-white" style={{ background: `linear-gradient(135deg, ${p.primaryDark}, ${p.primary})` }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-white/15 shrink-0"><Clock className="w-7 h-7" /></span>
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  {lang === "en" ? "Emergency? We answer fast" : "¿Emergencia? Respondemos rápido"}
                </h3>
                <p className="mt-1 text-white/80">
                  {lang === "en" ? "Same-day and urgent service available — call or message now." : "Servicio el mismo día y urgencias disponibles — llame o escriba ahora."}
                </p>
              </div>
            </div>
            <a href={brand.phoneHref} className="shrink-0 inline-flex items-center justify-center gap-2 bg-white font-bold px-7 py-4 rounded-lg shadow-xl transition-transform hover:translate-y-[-2px]" style={{ color: p.primaryDark }}>
              <Phone className="w-5 h-5" /> {brand.phone}
            </a>
          </div>
        </section>
      )}

      <section id="contact" className="py-20 sm:py-24 text-white" style={{ background: `linear-gradient(135deg, ${p.contactFrom}, ${p.contactTo})` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.accent }}>{t.nav.contact}</div>
            <h2 className="font-extrabold text-4xl sm:text-5xl leading-tight tracking-tight mb-4">{t.contact.title}</h2>
            <p className="text-white/90 mb-8 text-lg">{t.contact.blurb}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Phone className="w-5 h-5" style={{ color: p.accent }} /> <a href={brand.phoneHref} className="hover:underline">{brand.phone}</a></div>
              {brand.phoneAlt && (
                <div className="flex items-center gap-3"><Phone className="w-5 h-5" style={{ color: p.accent }} /> <a href={brand.phoneAltHref ?? `tel:${brand.phoneAlt.replace(/[^\d+]/g, "")}`} className="hover:underline">{brand.phoneAlt}</a></div>
              )}
              <div className="flex items-center gap-3"><Mail className="w-5 h-5" style={{ color: p.accent }} /> <a href={`mailto:${brand.email}`} className="hover:underline">{brand.email}</a></div>
              <div className="flex items-center gap-3"><MapPin className="w-5 h-5" style={{ color: p.accent }} /> {brand.address}</div>
              <div className="flex items-center gap-3"><Clock className="w-5 h-5" style={{ color: p.accent }} /> {availability ? availability[lang] : t.footer.hours}</div>
            </div>
          </div>

          <form
            className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const field = (key: string) => String(form.get(key) ?? "").trim();
              const extra = field("extra");
              const ok = await submitLead(template.plwSiteId, {
                name: field("name"),
                phone: field("phone"),
                service: field("service"),
                message: [extra && extraField ? `${extraField[lang]}: ${extra}` : "", field("message")].filter(Boolean).join("\n"),
              }, lang);
              setSendFailed(!ok);
              if (ok) setSubmitted(true);
            }}
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <p className="font-semibold">{t.contact.success}</p>
              </div>
            ) : (
              <>
                <FormField label={t.contact.name}>
                  <input name="name" required className="w-full h-11 rounded-lg border border-slate-300 px-3 outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }} />
                </FormField>
                <FormField label={t.contact.phone}>
                  <input name="phone" required type="tel" className="w-full h-11 rounded-lg border border-slate-300 px-3 outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }} />
                </FormField>
                <FormField label={t.contact.service}>
                  <select name="service" className="w-full h-11 rounded-lg border border-slate-300 px-3 bg-white outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }}>
                    <option value="">{t.contact.pick}</option>
                    {t.contact.services.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </FormField>
                {extraField && (
                  <FormField label={lang === "en" ? extraField.en : extraField.es}>
                    <input name="extra" type={extraField.type} className="w-full h-11 rounded-lg border border-slate-300 px-3 outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }} />
                  </FormField>
                )}
                <FormField label={t.contact.message}>
                  <textarea name="message" rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }} />
                </FormField>
                {sendFailed && (
                  <p className="text-sm text-red-600">
                    {lang === "en" ? "We couldn't send your request. Please call us instead." : "No pudimos enviar su solicitud. Por favor llámenos."}
                  </p>
                )}
                <button type="submit" className="w-full h-12 rounded-lg text-white font-bold shadow-md transition-opacity hover:opacity-90" style={{ backgroundColor: p.primary }}>
                  {t.contact.submit}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* CLOSING CTA — strong final ask on every template */}
      <section className="py-16 sm:py-20 text-white" style={{ background: `linear-gradient(135deg, ${p.primaryDark}, ${p.primary})` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.3)]">
            {lang === "en" ? "Ready to get started?" : "¿Listo para empezar?"}
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            {lang === "en"
              ? `Talk to ${brand.name} today — in English or Spanish. Free quote, no obligation.`
              : `Hable hoy con ${brand.name} — en inglés o español. Cotización gratis, sin compromiso.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={brand.phoneHref} className="inline-flex items-center justify-center gap-2 bg-white font-bold px-7 py-4 rounded-lg shadow-2xl transition-all hover:translate-y-[-2px]" style={{ color: p.primaryDark }}>
              <Phone className="w-4 h-4" /> {lang === "en" ? "Call now" : "Llamar ahora"}
            </a>
            <a
              href={waHref(brand, lang === "en" ? `Hi! I'd like a free quote from ${brand.name}.` : `¡Hola! Quisiera una cotización gratis de ${brand.name}.`)}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-lg shadow-2xl text-white transition-all hover:translate-y-[-2px]"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold px-7 py-4 rounded-lg transition-colors">
              {lang === "en" ? "Request a quote" : "Solicitar cotización"} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="w-11 h-11 rounded-full object-contain bg-white" />
              ) : (
                <div className="w-9 h-9 rounded-lg grid place-items-center text-white" style={{ backgroundColor: p.primary }}><HeroIcon className="w-5 h-5" /></div>
              )}
              <span className="font-bold text-white">{brand.name}</span>
            </div>
            <p className="text-sm text-slate-400">{t.footer.tagline}</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t.nav.services}</div>
            <ul className="space-y-2 text-sm">
              {t.services.items.map((s) => <li key={s.title}>{s.title}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t.nav.contact}</div>
            <ul className="space-y-2 text-sm">
              <li><a href={brand.phoneHref} className="hover:text-white">{brand.phone}</a></li>
              {brand.phoneAlt && (
                <li><a href={brand.phoneAltHref ?? `tel:${brand.phoneAlt.replace(/[^\d+]/g, "")}`} className="hover:text-white">{brand.phoneAlt}</a></li>
              )}
              <li><a href={`mailto:${brand.email}`} className="hover:text-white">{brand.email}</a></li>
              <li>{brand.address}</li>
            </ul>
            {brand.socials && (brand.socials.tiktok || brand.socials.facebook || brand.socials.instagram) && (
              <div className="flex items-center gap-3 mt-4">
                {brand.socials.tiktok && (
                  <a href={brand.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                    className="w-9 h-9 grid place-items-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors">
                    <Music2 className="w-4 h-4" />
                  </a>
                )}
                {brand.socials.facebook && (
                  <a href={brand.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="w-9 h-9 grid place-items-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {brand.socials.instagram && (
                  <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="w-9 h-9 grid place-items-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t.footer.hoursLabel}</div>
            <p className="text-sm">{availability ? availability[lang] : t.footer.hours}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 justify-between">
          <div>© {new Date().getFullYear()} {brand.name}. {t.footer.rights}</div>
          <div>{brand.city}</div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP — dealership only, desktop (mobile uses the call bar) */}
      {template.inventory && (
        <a
          href={`https://wa.me/${whatsappDigits(brand)}?text=${encodeURIComponent(lang === "en" ? `Hi! I'm interested in a vehicle from ${brand.name}.` : `¡Hola! Me interesa un vehículo de ${brand.name}.`)}`}
          target="_blank" rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="hidden lg:inline-flex fixed bottom-6 left-6 z-40 items-center gap-2.5 text-white font-bold pl-3.5 pr-5 py-3 rounded-full shadow-2xl transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#25D366", boxShadow: "0 20px 40px -10px rgba(37,211,102,0.6)" }}
        >
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>
      )}

      {/* MOBILE STICKY ACTION BAR — Call / WhatsApp / Quote */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 grid grid-cols-3 gap-2 z-40">
        <a href={brand.phoneHref} className="text-white text-sm font-bold py-3.5 rounded-xl shadow-2xl flex items-center justify-center gap-1.5" style={{ backgroundColor: p.primary, boxShadow: `0 18px 36px -12px ${p.primary}80` }}>
          <Phone className="w-4 h-4" /> {lang === "en" ? "Call" : "Llamar"}
        </a>
        <a
          href={waHref(brand, lang === "en" ? `Hi! I'd like a free quote from ${brand.name}.` : `¡Hola! Quisiera una cotización gratis de ${brand.name}.`)}
          target="_blank" rel="noopener noreferrer"
          className="text-white text-sm font-bold py-3.5 rounded-xl shadow-2xl flex items-center justify-center gap-1.5"
          style={{ backgroundColor: "#25D366", boxShadow: "0 18px 36px -12px rgba(37,211,102,0.5)" }}
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <a href="#contact" className="text-slate-900 bg-white text-sm font-bold py-3.5 rounded-xl shadow-2xl flex items-center justify-center gap-1.5 ring-1 ring-slate-200">
          <Send className="w-4 h-4" /> {lang === "en" ? "Quote" : "Cotizar"}
        </a>
      </div>

      {/* FLOATING ASSISTANT WIDGET — auto-greets on first interaction */}
      {assistant && <FloatingAssistant
        assistant={assistant}
        portraitSrc={media?.teamPortrait}
        brandName={brand.name}
        phone={brand.phone}
        phoneHref={brand.phoneHref}
        palette={p}
        lang={lang}
        greeting={greeting}
        services={t.services.items.map((s) => s.title)}
        siteId={template.plwSiteId}
      />}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* FloatingAssistant component                                       */
/* ---------------------------------------------------------------- */
function GoogleG({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  );
}

function YelpBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-grid place-items-center rounded bg-[#d32323] px-1.5 py-0.5 text-[10px] font-extrabold leading-none text-white ${className}`}>Yelp</span>
  );
}

function FloatingAssistant({
  assistant, portraitSrc, brandName, phone, phoneHref, palette, lang, greeting, services, siteId,
}: {
  assistant: NonNullable<BusinessTemplate["assistant"]>;
  portraitSrc: string | undefined;
  brandName: string;
  phone: string;
  phoneHref: string;
  palette: BusinessTemplate["brand"]["palette"];
  lang: Lang;
  greeting: { playing: boolean; playedOnce: boolean; toggle: () => void; pause: () => void; supported: boolean };
  services: string[];
  /** Published sites only: the booking is sent to PLW as a lead. */
  siteId?: string;
}) {
  const [need, setNeed] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [step, setStep] = useState<"need" | "slot" | "contact" | "done">("need");
  const [msgs, setMsgs] = useState<{ from: "bot" | "user"; text: string }[]>([]);
  const [draft, setDraft] = useState("");
  const [chosen, setChosen] = useState<{ label: string; time: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const slots = getSlots(lang);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, step]);

  const L = lang === "en"
    ? {
        online: "Online now · 24/7 AI assistant",
        tapHint: "Tap anywhere to hear my voice",
        speaking: `${assistant.name} is speaking…`,
        hear: "Hear greeting",
        pause: "Pause",
        needPh: "Type what you need…",
        slotPrompt: (n: string) => `Perfect — let's set up your free appointment for "${n}". Pick a time that works for you:`,
        contactPrompt: (s: string) => `Great! You're almost booked for ${s}. What's the best number to text your confirmation to?`,
        contactPh: "Your phone number",
        invalidPhone: "Hmm, that doesn't look like a phone number — please enter a number we can text.",
        doneMsg: (s: string, ph: string) => `✅ All set! You're booked for ${s}. ${brandName} will text ${ph} to confirm. Talk soon!`,
        booked: "Appointment booked!",
        startOver: "Book another",
        callNow: "Call now",
        at: "at",
        send: "Send",
      }
    : {
        online: "Conectada · Asistente IA 24/7",
        tapHint: "Toca para escuchar mi voz",
        speaking: `${assistant.name} está hablando…`,
        hear: "Escuchar",
        pause: "Pausar",
        needPh: "Escribe lo que necesitas…",
        slotPrompt: (n: string) => `Perfecto — agendemos tu cita gratis para "${n}". Elige el horario que te quede mejor:`,
        contactPrompt: (s: string) => `¡Genial! Casi listo para ${s}. ¿A qué número te enviamos la confirmación?`,
        contactPh: "Tu número de teléfono",
        invalidPhone: "Mmm, eso no parece un teléfono — escribe un número al que podamos enviarte mensaje.",
        doneMsg: (s: string, ph: string) => `✅ ¡Listo! Quedaste agendado para ${s}. ${brandName} te enviará un mensaje al ${ph} para confirmar. ¡Hablamos pronto!`,
        booked: "¡Cita agendada!",
        startOver: "Agendar otra",
        callNow: "Llamar",
        at: "a las",
        send: "Enviar",
      };

  function submitNeed(text: string) {
    const v = text.trim();
    if (!v) return;
    setNeed(v);
    setMsgs((m) => [...m, { from: "user", text: v }, { from: "bot", text: L.slotPrompt(v) }]);
    setDraft("");
    setStep("slot");
  }
  function pickSlot(s: { label: string; time: string }) {
    const label = `${s.label} ${L.at} ${s.time}`;
    setChosen(s);
    setMsgs((m) => [...m, { from: "user", text: label }, { from: "bot", text: L.contactPrompt(label) }]);
    setStep("contact");
  }
  async function submitContact(text: string) {
    const v = text.trim();
    if (!v || !chosen) return;
    if (v.replace(/\D/g, "").length < 7) {
      setMsgs((m) => [...m, { from: "user", text: v }, { from: "bot", text: L.invalidPhone }]);
      setDraft("");
      return;
    }
    const label = `${chosen.label} ${L.at} ${chosen.time}`;
    setMsgs((m) => [...m, { from: "user", text: v }]);
    setDraft("");
    // The chat asks only for a phone, so the lead is named after the chat itself.
    const ok = await submitLead(siteId, {
      name: lang === "en" ? "Website chat visitor" : "Visitante del chat del sitio",
      phone: v,
      service: need,
      preferredTime: label,
    }, lang);
    if (!ok) {
      setMsgs((m) => [...m, {
        from: "bot",
        text: lang === "en" ? `We couldn't send that. Please call ${brandName} at ${phone}.` : `No pudimos enviarlo. Llame a ${brandName} al ${phone}.`,
      }]);
      return;
    }
    setMsgs((m) => [...m, { from: "bot", text: L.doneMsg(label, v) }]);
    setStep("done");
  }
  function reset() {
    setMsgs([]); setChosen(null); setDraft(""); setStep("need");
  }

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full shadow-2xl ring-4 ring-white/80 overflow-hidden hover:scale-105 transition-transform hidden lg:block"
        aria-label={lang === "en" ? "Open assistant" : "Abrir asistente"}
      >
        {portraitSrc ? (
          <img src={portraitSrc} alt={assistant.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-white font-extrabold text-xl" style={{ background: `linear-gradient(135deg, ${palette.heroIconFrom}, ${palette.heroIconTo})` }}>
            {assistant.name.charAt(0)}
          </div>
        )}
        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[min(370px,calc(100vw-2.5rem))] hidden lg:block">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* header */}
        <div className="px-4 py-3 flex items-center gap-3 text-white shrink-0" style={{ background: `linear-gradient(135deg, ${palette.primaryDark}, ${palette.primary})` }}>
          <div className="relative">
            {portraitSrc ? (
              <img src={portraitSrc} alt={assistant.name} className="w-11 h-11 rounded-full object-cover border-2 border-white/80" />
            ) : (
              <div className="w-11 h-11 rounded-full grid place-items-center bg-white/20 font-extrabold">{assistant.name.charAt(0)}</div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div className="flex-1 leading-tight">
            <div className="font-bold">{assistant.name}</div>
            <div className="text-[11px] opacity-90 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-300" />
              </span>
              {L.online}
            </div>
          </div>
          <button onClick={() => setMinimized(true)} aria-label={lang === "en" ? "Minimize assistant" : "Minimizar asistente"} className="opacity-70 hover:opacity-100 transition-opacity">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* chat transcript */}
        <div ref={scrollRef} aria-live="polite" className="p-4 space-y-3 overflow-y-auto">
          <div className="bg-slate-50 rounded-2xl rounded-tl-md px-4 py-3 text-sm text-slate-700 leading-relaxed">
            {buildGreeting(assistant, lang, brandName)}
          </div>

          {greeting.supported && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={greeting.toggle}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: palette.primary }}
              >
                {greeting.playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {greeting.playing ? L.pause : L.hear}
              </button>
              {greeting.playing ? (
                <span className="text-xs text-emerald-600 inline-flex items-center gap-1.5">
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-emerald-600 animate-pulse" style={{ height: "60%", animationDelay: "0ms" }} />
                    <span className="w-0.5 bg-emerald-600 animate-pulse" style={{ height: "100%", animationDelay: "150ms" }} />
                    <span className="w-0.5 bg-emerald-600 animate-pulse" style={{ height: "40%", animationDelay: "300ms" }} />
                  </span>
                  {L.speaking}
                </span>
              ) : !greeting.playedOnce ? (
                <span className="text-[11px] text-amber-700 inline-flex items-center gap-1 animate-pulse">
                  <Volume2 className="w-3 h-3" /> {L.tapHint}
                </span>
              ) : null}
            </div>
          )}

          {msgs.map((m, i) => (
            <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.from === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-white"
                    : "max-w-[85%] rounded-2xl rounded-tl-md px-4 py-2.5 text-sm text-slate-700 bg-slate-50"
                }
                style={m.from === "user" ? { backgroundColor: palette.primary } : undefined}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* input dock */}
        <div className="p-3 border-t border-slate-100 bg-white shrink-0 space-y-2">
          {step === "need" && (
            <>
              {services.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {services.slice(0, 4).map((s) => (
                    <button
                      key={s}
                      onClick={() => submitNeed(s)}
                      className="text-xs font-semibold rounded-full border border-slate-200 px-3 py-1.5 hover:bg-slate-50 transition-colors"
                      style={{ color: palette.primary }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <form onSubmit={(e) => { e.preventDefault(); submitNeed(draft); }} className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={L.needPh}
                  aria-label={L.needPh}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
                <button type="submit" aria-label={L.send} className="shrink-0 w-10 grid place-items-center rounded-xl text-white" style={{ backgroundColor: palette.primary }}>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {step === "slot" && (
            <div className="grid grid-cols-1 gap-2">
              {slots.map((s) => (
                <button
                  key={s.label + s.time}
                  onClick={() => pickSlot(s)}
                  className="flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors capitalize"
                  style={{ borderColor: `${palette.primary}40` }}
                >
                  <span className="inline-flex items-center gap-2 text-slate-700"><Calendar className="w-4 h-4" style={{ color: palette.primary }} /> {s.label}</span>
                  <span style={{ color: palette.primary }}>{s.time}</span>
                </button>
              ))}
            </div>
          )}

          {step === "contact" && (
            <form onSubmit={(e) => { e.preventDefault(); submitContact(draft); }} className="flex gap-2">
              <input
                type="tel"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={L.contactPh}
                aria-label={L.contactPh}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              <button type="submit" aria-label={L.send} className="shrink-0 w-10 grid place-items-center rounded-xl text-white" style={{ backgroundColor: palette.primary }}>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === "done" && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5 text-sm font-bold text-emerald-800">
                <CalendarCheck className="w-4 h-4" /> {L.booked}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a href={phoneHref} onClick={greeting.pause} className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-bold px-3 py-2.5 rounded-xl shadow-sm hover:opacity-90 transition-opacity">
                  <Phone className="w-4 h-4" /> {L.callNow}
                </a>
                <button onClick={reset} className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 text-sm font-bold px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  {L.startOver}
                </button>
              </div>
            </div>
          )}

          <div className="text-[11px] text-slate-500 text-center leading-snug">
            {lang === "en"
              ? <>Or call <a href={phoneHref} className="font-bold text-slate-700 hover:underline">{phone}</a> — a real {brandName} team member answers 24/7</>
              : <>O llama al <a href={phoneHref} className="font-bold text-slate-700 hover:underline">{phone}</a> — una persona real de {brandName} contesta 24/7</>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, blurb, dark, accent, titlePath, eyebrowPath, blurbPath }: { eyebrow: string; title: string; blurb?: string; dark?: boolean; accent: string; titlePath?: (string | number)[]; eyebrowPath?: (string | number)[]; blurbPath?: (string | number)[] }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
        {eyebrowPath ? <EditableText as="span" path={eyebrowPath} value={eyebrow} /> : eyebrow}
      </div>
      <h2 className={`font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
        {titlePath ? <EditableText as="span" path={titlePath} value={title} /> : title}
      </h2>
      {blurb && (
        <p className={`mt-3 ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {blurbPath ? <EditableText as="span" path={blurbPath} value={blurb} /> : blurb}
        </p>
      )}
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

/* Click-to-play portrait video card for the optional video gallery.
   No autoplay and preload="none" keep the page fast on mobile. */
function VideoCard({ src, poster, title, caption, ctaLabel, palette }: {
  src: string;
  poster?: string;
  title: string;
  caption: string;
  ctaLabel: string;
  palette: { primary: string; accent: string };
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl">
      <div className="relative aspect-[3/4] overflow-hidden bg-black">
        <video
          ref={ref}
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          poster={poster}
          playsInline
          controls={playing}
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            type="button"
            onClick={() => { void ref.current?.play(); }}
            aria-label={title}
            className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/70 via-black/10 to-black/30 transition-colors hover:from-black/60"
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white shadow-2xl transition-transform group-hover:scale-110" style={{ backgroundColor: palette.primary }}>
              <Play className="w-7 h-7 translate-x-[2px]" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <div className="font-bold tracking-tight mb-1 text-white">{title}</div>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{caption}</p>
        <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-80" style={{ color: palette.accent }}>
          {ctaLabel} <ArrowRight className="w-4 h-4" />
        </a>
      </figcaption>
    </figure>
  );
}
