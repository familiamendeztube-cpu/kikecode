import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Loader2, MessageCircle, Minus, Plus, X } from "lucide-react";
import type { BusinessTemplate, Lang } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { whatsappLink } from "@/sites/shared/whatsapp";
import { useReturnFocus } from "@/sites/shared/return-focus";
import { leadOutcomeMessage, previewNotice, useLeadForm } from "@/sites/shared/lead-form";
import { durationsFor, hoursLabel, isoDay, longDate, quoteMath, quoteMessage, usd } from "./quote";
import { useScrollPause } from "./motion";
import { BTN, BTN_SUN, EASE, Photo, PRESS, siteVars } from "./ui";

/*
  The quote builder: tour → day → contact → review, with a live estimate.
  Published, "Send" opens WhatsApp with the whole request (inside the click,
  so no popup blocker stops it) and saves it as a PLW lead. On a preview it
  shows the message Willy would get and sends nothing. Always a request with
  an estimate: Willy confirms the date and the price.
*/

const STARTS = [
  { en: "Morning", es: "Mañana" },
  { en: "Midday", es: "Mediodía" },
  { en: "Afternoon", es: "Tarde" },
];

/** A number that glides to each new value (React draws every frame; no DOM writes). */
function useTween(value: number): number {
  const [shown, setShown] = useState(value);
  const live = useRef(value);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      live.current = value;
      setShown(value);
      return;
    }
    const o = { v: live.current };
    const tw = gsap.to(o, { v: value, duration: 0.9, ease: "power3.out", onUpdate: () => { live.current = o.v; setShown(Math.round(o.v)); } });
    return () => { tw.kill(); };
  }, [value]);
  return shown;
}

function Choice({ selected, onClick, children, className = "" }: { selected: boolean; onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-2xl border ${PRESS} ${
        selected ? "border-(--navy) bg-(--navy) text-white shadow-[0_14px_30px_-18px_rgba(6,24,42,.8)]" : "border-(--ink)/12 bg-white hover:-translate-y-0.5 hover:border-(--ink)/30"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-(--ink)/55">{children}</p>;
}

export function QuoteBuilder({ template, lang, startTour = null, inline = false, onClose }: {
  template: BusinessTemplate;
  lang: Lang;
  startTour?: number | null;
  inline?: boolean;
  onClose?: () => void;
}) {
  const tours = template.tours ?? [];
  const pricing = template.tourPricing;
  const L = (en: string, es: string) => pick(lang, en, es);
  const [step, setStep] = useState(startTour === null ? 0 : 1);
  const [back, setBack] = useState(false);
  const [tourIdx, setTourIdx] = useState<number | null>(startTour);
  const [dur, setDur] = useState(0);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [guests, setGuests] = useState(2);
  const [kids, setKids] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const lead = useLeadForm(template.plwSiteId, lang);
  const advance = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(advance.current), []);

  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  }), []);
  const firstDay = isoDay(days[0]);

  const tour = tourIdx === null ? null : tours[tourIdx] ?? null;
  const options = tour && pricing ? durationsFor(tour, pricing) : [];
  const duration = options[Math.min(dur, options.length - 1)];
  const maxGuests = tour?.guests ?? Math.max(1, ...tours.map((t) => t.guests ?? 0));
  const fromPrice = Math.min(...tours.map((t) => t.priceUsd));
  const estimate = useTween(duration?.priceUsd ?? tour?.priceUsd ?? fromPrice);
  if (!pricing || tours.length === 0) return null;
  const math = duration ? quoteMath(duration.priceUsd, pricing) : null;

  const ready = [tour !== null, !!duration && !!date, name.trim().length > 1 && phone.replace(/\D/g, "").length >= 7, true];
  const steps = [L("Tour", "Tour"), L("Day", "Día"), L("You", "Usted"), L("Review", "Revisar")];
  const go = (n: number) => { setBack(n < step); setStep(n); };

  const pickTour = (i: number) => {
    setTourIdx(i);
    setDur(0);
    setGuests((g) => Math.min(g, tours[i].guests ?? g));
    window.clearTimeout(advance.current);
    advance.current = window.setTimeout(() => go(1), 260);
  };

  const send = () => {
    if (!tour || !duration) return;
    const text = quoteMessage({ tour, duration, date, start, guests, kids, name: name.trim(), email: email.trim(), notes: notes.trim() }, pricing, lang);
    // Published: WhatsApp first, inside the click, then the lead. A preview only shows the message.
    if (!lead.isPreview) window.open(whatsappLink(template.brand, text), "_blank", "noopener,noreferrer");
    void lead.submit({
      form: "quote",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      service: `${tour.title[lang]} · ${duration.name[lang]}`,
      preferredTime: `${date}${start ? ` · ${start}` : ""}`,
      message: text,
    });
    setMessage(text);
  };

  const restart = () => {
    lead.reset();
    setMessage(null);
    setTourIdx(null);
    setDate("");
    setStart("");
    setNotes("");
    go(0);
  };

  const field = "mt-2 h-12 w-full rounded-xl border border-(--ink)/12 bg-(--sand)/60 px-4 text-[16px] outline-none transition-colors placeholder:text-(--ink)/35 focus:border-(--sea) focus:bg-white";
  const slide = `motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-500 ${back ? "motion-safe:slide-in-from-left-6" : "motion-safe:slide-in-from-right-6"}`;

  const body = message !== null ? (
    <Done
      lang={lang}
      preview={lead.isPreview}
      message={message}
      outcome={leadOutcomeMessage(lead.state, lang, template.brand.phone)}
      deposit={math ? usd(math.deposit, lang) : ""}
      whatsapp={whatsappLink(template.brand, message)}
      onAgain={restart}
      onClose={onClose}
    />
  ) : (
    <>
      {/* Steps: a done step can be revisited; the next one opens once this one is complete. */}
      <ol className={`flex gap-2 px-6 pt-6 sm:px-8 sm:pt-8 ${inline ? "" : "pr-20 sm:pr-20"}`}>
        {steps.map((s, i) => (
          <li key={s} className="flex-1">
            <button
              type="button"
              disabled={i > step && !ready.slice(0, i).every(Boolean)}
              onClick={() => go(i)}
              aria-current={i === step ? "step" : undefined}
              className="group w-full text-left disabled:cursor-not-allowed"
            >
              <span className="block h-1 overflow-hidden rounded-full bg-(--ink)/10">
                <span className={`block h-full origin-left rounded-full bg-(--sea) transition-transform duration-700 ${EASE} ${i <= step ? "scale-x-100" : "scale-x-0"}`} />
              </span>
              <span className={`mt-2 block text-xs font-semibold tracking-wide transition-colors ${i === step ? "text-(--ink)" : "text-(--ink)/45 group-enabled:group-hover:text-(--ink)/70"}`}>
                <span className="max-sm:hidden">{String(i + 1).padStart(2, "0")} · </span>{s}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div data-lenis-prevent className={`flex-1 px-6 py-6 sm:px-8 ${inline ? "" : "overflow-y-auto [scrollbar-width:thin]"}`}>
        {lead.isPreview && step === 0 && <p className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">{previewNotice(lang)}</p>}
        <div key={step} className={slide}>
          {step === 0 && (
            <>
              <h3 className="tt-display text-3xl leading-tight sm:text-4xl">{L("Which day at sea?", "¿Qué día en el mar?")}</h3>
              <p className="mt-2 text-[15px] text-(--ink)/65">{L("Every tour is private: the boat is only for your group.", "Todos los tours son privados: el bote es solo para su grupo.")}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {tours.map((t, i) => (
                  <Choice key={i} selected={tourIdx === i} onClick={() => pickTour(i)} className="group flex items-center gap-4 p-2.5 pr-4 text-left">
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-xl sm:size-[4.5rem]">
                      <Photo src={t.image} alt="" loading="lazy" className={`size-full object-cover transition-transform duration-700 ${EASE} group-hover:scale-105`} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug">{t.title[lang]}</span>
                      <span className={`mt-1 block text-sm ${tourIdx === i ? "text-white/70" : "text-(--ink)/55"}`}>
                        {L("from", "desde")} {usd(t.priceUsd, lang)}{t.guests ? ` · ${L(`up to ${t.guests}`, `hasta ${t.guests}`)}` : ""}
                      </span>
                    </span>
                  </Choice>
                ))}
              </div>
            </>
          )}

          {step === 1 && tour && (
            <div className="space-y-8">
              <div>
                <h3 className="tt-display text-3xl leading-tight sm:text-4xl">{tour.title[lang]}</h3>
                <p className="mt-2 text-[15px] text-(--ink)/65">{L("Pick the length, the day and who's coming.", "Escoja la duración, el día y quiénes vienen.")}</p>
              </div>
              <div>
                <Label>{L("Length", "Duración")}</Label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {options.map((d, i) => (
                    <Choice key={d.hours} selected={duration === d} onClick={() => setDur(i)} className="flex flex-col p-3 text-left sm:p-4">
                      <span className="block text-sm font-semibold sm:text-base">{d.name[lang]}</span>
                      <span className={`block text-xs sm:text-sm ${duration === d ? "text-white/70" : "text-(--ink)/55"}`}>
                        {hoursLabel(d.hours, lang)}{d.lunch ? ` · ${L("lunch", "almuerzo")}` : ""}
                      </span>
                      {/* mt-auto: the prices line up even when a label wraps. */}
                      <span className="tt-display mt-auto block pt-3 text-2xl leading-none sm:text-3xl">{usd(d.priceUsd, lang)}</span>
                    </Choice>
                  ))}
                </div>
              </div>
              <div>
                <Label>{L("Day", "Día")}</Label>
                <div data-lenis-prevent className="tt-noscroll -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
                  {days.map((d, i) => {
                    const iso = isoDay(d);
                    const locale = lang === "en" ? "en-US" : "es-CR";
                    return (
                      <Choice key={iso} selected={date === iso} onClick={() => setDate(iso)} className="w-[4.5rem] shrink-0 snap-start py-3 text-center">
                        <span className={`block text-[11px] font-semibold uppercase tracking-wider ${date === iso ? "text-white/70" : "text-(--ink)/50"}`}>
                          {d.toLocaleDateString(locale, { weekday: "short" })}
                        </span>
                        <span className="tt-display block text-3xl leading-tight">{d.getDate()}</span>
                        <span className={`block text-[11px] ${date === iso ? "text-white/70" : "text-(--ink)/45"}`}>
                          {i === 0 || d.getDate() === 1 ? d.toLocaleDateString(locale, { month: "short" }) : " "}
                        </span>
                      </Choice>
                    );
                  })}
                  <label className={`relative grid w-[7.5rem] shrink-0 cursor-pointer place-items-center rounded-2xl border px-3 text-center text-sm font-semibold ${PRESS} ${
                    date && !days.some((d) => isoDay(d) === date) ? "border-(--navy) bg-(--navy) text-white" : "border-dashed border-(--ink)/25 hover:border-(--ink)/45"
                  }`}>
                    <CalendarDays className="size-5" />
                    {date && !days.some((d) => isoDay(d) === date) ? longDate(date, lang).split(",").slice(0, 2).join(",") : L("Another date", "Otra fecha")}
                    <input
                      type="date"
                      min={firstDay}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      aria-label={L("Another date", "Otra fecha")}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </label>
                </div>
                <p className="mt-3 text-sm text-(--ink)/55">{L("Same day? Message Willy on WhatsApp.", "¿Para hoy mismo? Escríbale a Willy por WhatsApp.")}</p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <Label>{L("Preferred start", "Hora preferida")}</Label>
                  <div className="flex flex-wrap gap-2">
                    {STARTS.map((s) => (
                      <Choice key={s.en} selected={start === s[lang]} onClick={() => setStart(start === s[lang] ? "" : s[lang])} className="rounded-full px-4 py-2.5 text-sm font-semibold">
                        {s[lang]}
                      </Choice>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>{L("Guests", "Personas")}</Label>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} className={`grid size-12 place-items-center rounded-full border border-(--ink)/15 hover:border-(--ink)/40 disabled:opacity-30 ${PRESS}`} aria-label={L("One guest less", "Una persona menos")}>
                      <Minus className="size-4" />
                    </button>
                    <output aria-live="polite" className="tt-display w-10 text-center text-4xl tabular-nums">{guests}</output>
                    <button type="button" onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))} disabled={guests >= maxGuests} className={`grid size-12 place-items-center rounded-full border border-(--ink)/15 hover:border-(--ink)/40 disabled:opacity-30 ${PRESS}`} aria-label={L("One guest more", "Una persona más")}>
                      <Plus className="size-4" />
                    </button>
                    {tour.guests !== undefined && <span className="text-sm text-(--ink)/50">{L(`max ${tour.guests}`, `máx. ${tour.guests}`)}</span>}
                  </div>
                  <label className="mt-4 flex cursor-pointer items-center gap-3 text-[15px]">
                    <input type="checkbox" checked={kids} onChange={(e) => setKids(e.target.checked)} className="peer sr-only" />
                    <span className={`relative h-6 w-11 shrink-0 rounded-full bg-(--ink)/15 transition-colors peer-checked:bg-(--sea) peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--sea) after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-300 ${kids ? "after:translate-x-5" : ""}`} />
                    {L("Traveling with children", "Viajamos con niños")}
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="tt-display text-3xl leading-tight sm:text-4xl">{L("Where should Willy reply?", "¿Dónde le responde Willy?")}</h3>
              <p className="mt-2 text-[15px] text-(--ink)/65">{L("He answers on WhatsApp with availability.", "Le responde por WhatsApp con la disponibilidad.")}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block text-[13px] font-medium text-(--ink)/70">
                  {L("Your name", "Su nombre")}
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required className={field} />
                </label>
                <label className="block text-[13px] font-medium text-(--ink)/70">
                  {L("WhatsApp or phone, with country code", "WhatsApp o teléfono, con código de país")}
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" required placeholder={L("+1 512 555 0142", "+506 8888 1234")} className={field} />
                </label>
                <label className="block text-[13px] font-medium text-(--ink)/70 sm:col-span-2">
                  {L("Email (optional)", "Correo (opcional)")}
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder={L("you@example.com", "usted@ejemplo.com")} className={field} />
                </label>
                <label className="block text-[13px] font-medium text-(--ink)/70 sm:col-span-2">
                  {L("Anything Willy should know? (optional)", "¿Algo que Willy deba saber? (opcional)")}
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={400} className={`${field} h-auto py-3`} placeholder={L("A birthday, a fish you're after, a beach you'd love to see…", "Un cumpleaños, un pez que quieren pescar, una playa que les gustaría ver…")} />
                </label>
              </div>
            </div>
          )}

          {step === 3 && tour && duration && math && (
            <div>
              <h3 className="tt-display text-3xl leading-tight sm:text-4xl">{L("Your private day at sea", "Su día privado en el mar")}</h3>
              <dl className="mt-6 divide-y divide-(--ink)/10 border-y border-(--ink)/10 text-[15px]">
                {[
                  { k: L("Tour", "Tour"), v: tour.title[lang], to: 0 },
                  { k: L("Length", "Duración"), v: `${duration.name[lang]} · ${hoursLabel(duration.hours, lang)}${duration.lunch ? ` · ${L("lunch included", "con almuerzo")}` : ""}`, to: 1 },
                  { k: L("Day", "Día"), v: `${longDate(date, lang)}${start ? ` · ${start}` : ""}`, to: 1 },
                  { k: L("Guests", "Personas"), v: `${guests}${kids ? L(" · with children", " · con niños") : ""}`, to: 1 },
                  { k: L("Reply to", "Responder a"), v: `${name} · ${phone}`, to: 2 },
                ].map((r) => (
                  <div key={r.k} className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="w-24 shrink-0 text-(--ink)/50">{r.k}</dt>
                    <dd className="min-w-0 flex-1 font-medium">{r.v}</dd>
                    <button type="button" onClick={() => go(r.to)} className="text-sm font-semibold text-(--sea) hover:underline">{L("Change", "Cambiar")}</button>
                  </div>
                ))}
              </dl>
              <div className="mt-6 rounded-2xl bg-(--sand) p-5 text-[15px]">
                <div className="flex items-end justify-between gap-4 border-b border-(--ink)/10 pb-4">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-(--ink)/55">{L("Whole boat", "Bote completo")}</span>
                  <span className="tt-display text-5xl leading-none">{usd(math.total, lang)}</span>
                </div>
                <div className="mt-4 flex items-baseline justify-between text-sm text-(--ink)/70"><span>{L("Deposit to hold the date (PayPal)", "Depósito para apartar la fecha (PayPal)")}</span><span>{usd(math.deposit, lang)}</span></div>
                <div className="mt-2 flex items-baseline justify-between gap-4 text-sm text-(--ink)/70">
                  <span>{L("On the day", "El día del tour")}</span>
                  <span className="text-right">{usd(math.balance, lang)} {L("cash", "efectivo")} · {usd(math.balanceByCard, lang)} {L("card", "tarjeta")} (+{pricing.cardSurchargePct}%)</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-(--ink)/55">{L("An estimate, not a booking: Willy confirms availability and the final price.", "Es un estimado, no una reserva: Willy confirma la disponibilidad y el precio final.")}</p>
            </div>
          )}
        </div>
      </div>

      {/* The estimate follows every choice; the main action changes with the step. */}
      <div className="flex items-center justify-between gap-4 border-t border-(--ink)/10 bg-white/90 px-6 py-4 backdrop-blur sm:px-8">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink)/50">
            {duration ? <>{L("Estimate", "Estimado")}<span className="max-sm:hidden"> · {L("whole boat", "bote completo")}</span></> : L("Private boat from", "Bote privado desde")}
          </p>
          <p className="tt-display text-3xl leading-none tabular-nums sm:text-4xl">{usd(estimate, lang)}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          {step > 0 && (
            <button type="button" onClick={() => go(step - 1)} className={`${BTN} h-12 border border-(--ink)/15 px-4 hover:border-(--ink)/40 sm:px-5`} aria-label={L("Back", "Atrás")}>
              <ArrowLeft className="size-4" /> <span className="max-sm:sr-only">{L("Back", "Atrás")}</span>
            </button>
          )}
          {step < 3 ? (
            <button type="button" disabled={!ready[step]} onClick={() => go(step + 1)} className={`${BTN} h-12 bg-(--navy) px-6 text-white hover:bg-(--sea) disabled:opacity-35`}>
              {L("Continue", "Continuar")} <ArrowRight className="size-4" />
            </button>
          ) : (
            <button type="button" disabled={lead.sending} onClick={send} className={`${BTN_SUN} h-12 px-6`}>
              {lead.sending ? <Loader2 className="size-4 animate-spin" /> : <MessageCircle className="size-4" />}
              {lead.isPreview ? L("See Willy's message", "Ver el mensaje") : L("Send to Willy", "Enviar a Willy")}
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (inline) return <div className="flex min-h-[36rem] flex-col overflow-hidden rounded-3xl bg-white text-(--ink) shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)]">{body}</div>;

  // The dialog: the chosen tour's photo beside the steps on wide screens, crossfading as it changes.
  return (
    <div className="grid h-full min-h-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div aria-hidden className="relative hidden overflow-hidden bg-(--navy) lg:block">
        {[template.media?.hero, ...tours.map((t) => t.image)].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`absolute inset-0 size-full object-cover transition-[opacity,scale] duration-[1.2s] ${EASE} ${
              (tourIdx === null ? 0 : tourIdx + 1) === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,24,42,.1)_40%,rgba(6,24,42,.85)_100%)]" />
        <div className="absolute inset-x-8 bottom-8 text-white">
          <p className="tt-eyebrow text-white/70">{template.brand.name}</p>
          <p className="tt-display mt-3 text-5xl leading-[0.95]">{tour ? tour.title[lang] : L("Plan your private day at sea", "Planee su día privado en el mar")}</p>
          {tour && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {tour.includes[lang].map((x) => <li key={x} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs backdrop-blur">{x}</li>)}
            </ul>
          )}
        </div>
      </div>
      {/* min-w-0: the day strip scrolls inside its column instead of widening it. */}
      <div className="flex min-h-0 min-w-0 flex-col">{body}</div>
    </div>
  );
}

function Done({ lang, preview, message, outcome, deposit, whatsapp, onAgain, onClose }: {
  lang: Lang; preview: boolean; message: string; outcome: string | null; deposit: string; whatsapp: string;
  onAgain: () => void; onClose?: () => void;
}) {
  const L = (en: string, es: string) => pick(lang, en, es);
  return (
    <div data-lenis-prevent className="flex flex-1 flex-col overflow-y-auto px-6 py-8 sm:px-10 sm:py-10 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-500">
      <span className="grid size-14 place-items-center rounded-full bg-(--teal)/15 text-(--sea)">
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7.5" className="tt-check" />
        </svg>
      </span>
      <h3 className="tt-display mt-6 text-4xl leading-tight">
        {preview ? L("This is what Willy receives", "Esto es lo que recibe Willy") : L("Your request is on its way", "Su solicitud va en camino")}
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-(--ink)/70">
        {preview
          ? L("On the published site, this opens WhatsApp with the message below and saves the request for Willy.", "En el sitio publicado, esto abre WhatsApp con el mensaje de abajo y le guarda la solicitud a Willy.")
          : L(`WhatsApp opened with your quote: send it there and Willy confirms availability. Your date is held once the ${deposit} deposit is in.`, `WhatsApp se abrió con su cotización: envíela ahí y Willy le confirma la disponibilidad. Su fecha queda apartada con el depósito de ${deposit}.`)}
      </p>
      <div className="mt-6 max-w-md whitespace-pre-line rounded-2xl rounded-tr-md bg-[#DCF8C6] p-4 text-[14px] leading-relaxed text-[#111B21] shadow-sm">
        {message}
        <span className="mt-1 flex justify-end text-[#53BDEB]" aria-hidden><Check className="-mr-2 size-3.5" /><Check className="size-3.5" /></span>
      </div>
      {outcome && <p role="status" className="mt-4 max-w-md rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">{outcome}</p>}
      <div className="mt-8 flex flex-wrap gap-3">
        {!preview && (
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${BTN} h-12 bg-[#25D366] text-white hover:brightness-95`}>
            <MessageCircle className="size-4" /> {L("Open WhatsApp again", "Abrir WhatsApp de nuevo")}
          </a>
        )}
        <button type="button" onClick={onAgain} className={`${BTN} h-12 border border-(--ink)/15 hover:border-(--ink)/40`}>
          {L("Plan another trip", "Planear otro tour")}
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className={`${BTN} h-12 text-(--ink)/70 hover:text-(--ink)`}>
            {L("Close", "Cerrar")}
          </button>
        )}
      </div>
    </div>
  );
}

/** The builder in a dialog: full screen on phones, a large card on wider screens. */
export function QuoteDialog({ open, onOpenChange, template, lang, startTour }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: BusinessTemplate;
  lang: Lang;
  startTour: number | null;
}) {
  useScrollPause(open);
  const focus = useReturnFocus();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-[#020a12]/70 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-500" />
        <Dialog.Content
          {...focus}
          aria-describedby={undefined}
          style={siteVars(template)}
          className="tt-site fixed inset-0 z-[95] m-auto flex h-dvh w-full flex-col overflow-hidden bg-white text-(--ink) shadow-[0_60px_120px_-40px_rgba(0,0,0,.7)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-500 sm:h-[min(800px,94dvh)] sm:w-[min(1120px,94vw)] sm:rounded-[2rem]"
        >
          <Dialog.Title className="sr-only">{pick(lang, "Get your quote", "Cotice su tour")}</Dialog.Title>
          <Dialog.Close className={`absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white/90 text-(--ink) shadow-md backdrop-blur hover:bg-white ${PRESS}`} aria-label={pick(lang, "Close", "Cerrar")}>
            <X className="size-5" />
          </Dialog.Close>
          {open && <QuoteBuilder key={startTour ?? "pick"} template={template} lang={lang} startTour={startTour} onClose={() => onOpenChange(false)} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

