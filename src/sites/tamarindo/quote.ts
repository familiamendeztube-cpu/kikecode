import type { Lang, TourOffer, TourPricing } from "@/templates/types";
import { usd } from "@/templates/tour-services";

/*
  The quote builder's arithmetic and the message Willy receives. Prices are
  for the whole boat, set by the trip's length (template.tourPricing); the
  site shows them as an estimate he confirms, never as a booking.
*/

export type Duration = TourPricing["durations"][number];

export { usd };

/** "5 hours", "7,5 horas". */
export function hoursLabel(hours: number, lang: Lang): string {
  return `${hours.toLocaleString(lang === "en" ? "en-US" : "es-CR")} ${lang === "en" ? "hours" : "horas"}`;
}

/** The lengths a tour can be booked for: those priced at or above its own starting price. */
export function durationsFor(tour: TourOffer, pricing: TourPricing): Duration[] {
  const fit = pricing.durations.filter((d) => d.priceUsd >= tour.priceUsd);
  const longest = pricing.durations[pricing.durations.length - 1];
  // A tour priced above every length (an edit): its own price on the longest trip, never a lower one.
  return fit.length > 0 ? fit : longest ? [{ ...longest, priceUsd: tour.priceUsd }] : [];
}

/** Deposit now, the rest on the day: in cash, or by card with the surcharge (to the cent). */
export function quoteMath(total: number, pricing: TourPricing) {
  const deposit = Math.min(pricing.depositUsd, total);
  const balance = total - deposit;
  return { total, deposit, balance, balanceByCard: Math.round(balance * (100 + pricing.cardSurchargePct)) / 100 };
}

/** "2026-12-05" as the visitor reads it, read at noon so no time zone moves the day. */
export function longDate(iso: string, lang: Lang): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(lang === "en" ? "en-US" : "es-CR", { weekday: "long", month: "long", day: "numeric" });
}

/** A local calendar date as "YYYY-MM-DD". */
export function isoDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export type QuoteRequest = {
  tour: TourOffer;
  duration: Duration;
  date: string;
  start: string;
  guests: number;
  kids: boolean;
  name: string;
  email: string;
  notes: string;
};

/** What the visitor sends Willy on WhatsApp, and what PLW stores with the lead. */
export function quoteMessage(q: QuoteRequest, pricing: TourPricing, lang: Lang): string {
  const L = (en: string, es: string) => (lang === "en" ? en : es);
  const m = quoteMath(q.duration.priceUsd, pricing);
  return [
    L("Hi Willy! I'd like to request this private tour:", "¡Hola Willy! Quisiera solicitar este tour privado:"),
    `• ${q.tour.title[lang]}`,
    `• ${q.duration.name[lang]} (${hoursLabel(q.duration.hours, lang)})${q.duration.lunch ? L(", lunch included", ", con almuerzo") : ""}`,
    `• ${L("Date", "Fecha")}: ${longDate(q.date, lang)}${q.start ? ` · ${q.start}` : ""}`,
    `• ${L("Guests", "Personas")}: ${q.guests}${q.kids ? L(" (with children)", " (con niños)") : ""}`,
    `• ${L("Estimate", "Estimado")}: ${usd(m.total, lang)} ${L("for the whole boat", "por el bote completo")}`,
    q.notes ? `• ${L("Notes", "Notas")}: ${q.notes}` : null,
    "",
    `${L("Name", "Nombre")}: ${q.name}`,
    q.email ? `Email: ${q.email}` : null,
    "",
    L("Could you confirm availability?", "¿Me confirma la disponibilidad?"),
  ].filter((line) => line !== null).join("\n");
}
