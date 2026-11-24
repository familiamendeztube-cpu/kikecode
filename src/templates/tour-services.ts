import type { BusinessTemplate, Lang, LocalizedContent, ServiceItem, TourOffer } from "./types";

/** A price in US dollars the way each language writes it: "US$1,000", "US$1 000", "US$711.90". */
export function usd(n: number, lang: Lang): string {
  const cents = !Number.isInteger(n);
  return `US$${n.toLocaleString(lang === "en" ? "en-US" : "es-CR", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 })}`;
}

/**
 * A tour operator's tours as its services list. PLW's Secretaria IA reads a Kike
 * draft's services from content.es.services.items (the titles, up to 80
 * characters each), so each title carries the tour's starting price for the
 * whole boat and its group size: that is how she can quote them.
 */
export function tourServices(tours: TourOffer[], lang: Lang): ServiceItem[] {
  return tours.map((t) => {
    const guests = t.guests ? (lang === "en" ? `, up to ${t.guests} guests` : `, hasta ${t.guests} personas`) : "";
    const from = lang === "en" ? `from ${usd(t.priceUsd, lang)} per boat` : `desde ${usd(t.priceUsd, lang)} el bote`;
    return { title: `${t.title[lang]} (${from}${guests})`, blurb: t.blurb[lang] };
  });
}

/** The content a save stores: a tour operator's services rebuilt from its tours, so an edited price reaches the Secretaria. */
export function contentWithTourServices(tpl: BusinessTemplate): Record<Lang, LocalizedContent> {
  const tours = tpl.tours;
  if (!tours) return tpl.content;
  const withTours = (lang: Lang): LocalizedContent => ({
    ...tpl.content[lang],
    services: { ...tpl.content[lang].services, items: tourServices(tours, lang) },
  });
  return { en: withTours("en"), es: withTours("es") };
}
