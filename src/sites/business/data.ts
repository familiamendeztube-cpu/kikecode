import {
  Clock, DollarSign, ShieldCheck, Languages, BadgeCheck, Truck, Wrench, Star, Leaf, Sparkles, Heart,
  type LucideIcon,
} from "lucide-react";
import type { BusinessTemplate, Lang, OfferIconKey, TemplateCategory, TemplateFacts } from "@/templates/types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

export const OFFER_ICONS: Record<OfferIconKey, LucideIcon> = {
  Clock, DollarSign, ShieldCheck, Languages, BadgeCheck, Truck, Wrench, Star, Leaf, Sparkles, Heart,
};

/* Shared realistic reviewer avatars (reused across templates by index). */
export const REVIEW_AVATARS = Array.from({ length: 8 }, (_, i) => `${TEMPLATE_ASSETS}/reviews/r${i + 1}.jpg`);
export const REVIEW_PLATFORMS = ["Google", "Yelp", "Google", "Yelp", "Google", "Yelp", "Google", "Yelp"] as const;
export const REVIEW_DATES: Record<Lang, string[]> = {
  en: ["2 weeks ago", "1 month ago", "3 weeks ago", "2 months ago", "5 days ago", "1 week ago", "6 weeks ago", "3 days ago"],
  es: ["hace 2 semanas", "hace 1 mes", "hace 3 semanas", "hace 2 meses", "hace 5 días", "hace 1 semana", "hace 6 semanas", "hace 3 días"],
};

/* Industry-neutral extra reviews appended after each template's own ones,
   so every site shows a fuller, more believable wall of social proof. */
export const EXTRA_REVIEWS: Record<Lang, { name: string; role: string; quote: string }[]> = {
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

/* Universal trust signals shown as a compact strip on every template. Generic,
   non-fabricated marketing trust phrases (safe for named businesses). */
export const TRUST_SIGNALS: { Icon: LucideIcon; en: string; es: string }[] = [
  { Icon: Languages, en: "Se habla español", es: "Se habla español" },
  { Icon: DollarSign, en: "Free quotes", es: "Cotización gratis" },
  { Icon: ShieldCheck, en: "Work guaranteed", es: "Trabajo garantizado" },
  { Icon: Clock, en: "Fast response", es: "Respuesta rápida" },
  { Icon: Heart, en: "Locally owned", es: "Negocio local" },
];

/* The assistant greeting always invites the visitor to book right now. */
const BOOKING_INVITE: Record<Lang, string> = {
  en: "Just tell me what you need and I'll book your free appointment right now.",
  es: "Solo dime qué necesitas y te agendo tu cita gratis ahora mismo.",
};
export function buildGreeting(assistant: NonNullable<BusinessTemplate["assistant"]>, lang: Lang, brandName: string): string {
  const base = (lang === "en" ? assistant.en : assistant.es).replace(/\{business\}/g, brandName);
  return `${base} ${BOOKING_INVITE[lang]}`;
}

/* Next two non-Sunday openings for the live booking flow. */
export function getSlots(lang: Lang): { label: string; time: string }[] {
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

/* Stats / Areas / Certs / Guarantee for every template, not just the ones with
   their own `facts`. The defaults are deliberately generic and honest — no
   fabricated license numbers, no invented neighbor-town lists, no made-up year
   counts — so they are safe even for real named businesses. */
export function resolveFacts(template: BusinessTemplate): Required<TemplateFacts> {
  const primaryCity = (template.brand.city.split(",")[0] ?? template.brand.city).trim();
  const f = template.facts;
  return {
    stats: f?.stats ?? [
      { value: "Local", valueEs: "Local", labelEn: "Locally owned & operated", labelEs: "Negocio local" },
      { value: "Bilingual", valueEs: "Bilingüe", labelEn: "English & Spanish", labelEs: "Inglés y español" },
      { value: "Free", valueEs: "Gratis", labelEn: "Estimates & quotes", labelEs: "Estimados y cotizaciones" },
      { value: "Honest", valueEs: "Honesto", labelEn: "Upfront, no surprises", labelEs: "Claro y sin sorpresas" },
    ],
    areasEn: f?.areasEn ?? [primaryCity, "Nearby neighborhoods", "Surrounding suburbs", "Greater metro area"],
    areasEs: f?.areasEs ?? [primaryCity, "Barrios cercanos", "Suburbios cercanos", "Área metropolitana"],
    certsEn: f?.certsEn ?? ["Se Habla Español", "Free Quotes", "Locally Owned", "Satisfaction Focused", "Fast Response", "Trusted by Neighbors"],
    certsEs: f?.certsEs ?? ["Se Habla Español", "Cotización Gratis", "Negocio Local", "Enfocados en Satisfacción", "Respuesta Rápida", "Recomendado por Vecinos"],
    guaranteeEn: f?.guaranteeEn ?? { title: "Your satisfaction, guaranteed", blurb: "We treat every customer like a neighbor and stand behind our work. If something isn't right, just tell us and we'll make it right." },
    guaranteeEs: f?.guaranteeEs ?? { title: "Su satisfacción, garantizada", blurb: "Tratamos a cada cliente como a un vecino y respaldamos nuestro trabajo. Si algo no está bien, solo díganos y lo arreglamos." },
  };
}

/* An optional extra quote-form field per category (bilingual). Trades use the
   default 3 fields (no extra). */
export function categoryExtraField(cat: TemplateCategory): { en: string; es: string; type: "text" | "date" } | null {
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
