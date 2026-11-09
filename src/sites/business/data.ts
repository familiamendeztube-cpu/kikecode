import {
  Clock, DollarSign, Banknote, ShieldCheck, Languages, BadgeCheck, Truck, Wrench, Star, Leaf, Sparkles, Heart,
  type LucideIcon,
} from "lucide-react";
import type { BusinessTemplate, Lang, OfferIconKey, TemplateCategory, TemplateFacts } from "@/templates/types";

export const OFFER_ICONS: Record<OfferIconKey, LucideIcon> = {
  Clock, DollarSign, Banknote, ShieldCheck, Languages, BadgeCheck, Truck, Wrench, Star, Leaf, Sparkles, Heart,
};

/* Universal trust signals shown as a compact strip on generic templates. They are
   still promises about the business (free quotes, a guarantee): they carry the
   Sample tag until staff confirm them (contentConfirmed), and a real business,
   which never made them, does not show the strip (TrustStrip). */
export const TRUST_SIGNALS: { Icon: LucideIcon; en: string; es: string }[] = [
  { Icon: Languages, en: "Spanish & English", es: "Español e inglés" },
  { Icon: DollarSign, en: "Free quotes", es: "Cotización gratis" },
  { Icon: ShieldCheck, en: "Work guaranteed", es: "Trabajo garantizado" },
  { Icon: Clock, en: "Fast response", es: "Respuesta rápida" },
  { Icon: Heart, en: "Locally owned", es: "Negocio local" },
];

/* The assistant greeting invites a request; the business confirms the time (see booking-copy.ts). */
const BOOKING_INVITE: Record<Lang, string> = {
  en: "Just tell me what you need and I'll send your appointment request to the team.",
  es: "Solo dígame qué necesita y le envío su solicitud de cita al equipo.",
};
export function buildGreeting(assistant: NonNullable<BusinessTemplate["assistant"]>, lang: Lang, brandName: string): string {
  const base = assistant[lang].replace(/\{business\}(\.?)/g, (_, dot: string) => (brandName.endsWith(".") ? brandName : brandName + dot));
  return `${base} ${BOOKING_INVITE[lang]}`;
}

/* Stats / Areas / Certs / Guarantee for every template, not just the ones with
   their own `facts`. The defaults avoid license numbers, town lists and year
   counts, but they still promise things (free estimates, a guarantee): on a
   generic template the sections show them with the Sample tag until staff
   confirm them with the business (isSampleContent in ui.tsx). A real business
   carries no Sample tag, so it never gets them: without its own `facts` its
   stats, areas, certifications and guarantee sections are left out (null). */
export function resolveFacts(template: BusinessTemplate): Required<TemplateFacts> | null {
  if (template.realBusiness && !template.facts) return null;
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
    certsEn: f?.certsEn ?? ["Spanish & English", "Free Quotes", "Locally Owned", "Satisfaction Focused", "Fast Response", "Trusted by Neighbors"],
    certsEs: f?.certsEs ?? ["Español e Inglés", "Cotización Gratis", "Negocio Local", "Enfocados en Satisfacción", "Respuesta Rápida", "Recomendado por Vecinos"],
    guaranteeEn: f?.guaranteeEn ?? { title: "Your satisfaction, guaranteed", blurb: "We treat every customer like a neighbor and stand behind our work. If something isn't right, just tell us and we'll make it right." },
    guaranteeEs: f?.guaranteeEs ?? { title: "Su satisfacción, garantizada", blurb: "Tratamos a cada cliente como a un vecino y respaldamos nuestro trabajo. Si algo no está bien, solo díganos y lo arreglamos." },
  };
}

/* An optional extra quote-form field per category (bilingual). Trades use the
   default 3 fields (no extra). */
export function categoryExtraField(cat: TemplateCategory): { en: string; es: string; type: "text" | "date" } | null {
  switch (cat) {
    case "auto": return { en: "Vehicle (make, model, year)", es: "Vehículo (marca, modelo y año)", type: "text" };
    case "moving": return { en: "Moving date", es: "Fecha de mudanza", type: "date" };
    case "food": return { en: "Event date (if catering)", es: "Fecha del evento (si es catering)", type: "date" };
    case "beauty": return { en: "Preferred date & time", es: "Fecha y hora preferida", type: "text" };
    case "events": return { en: "Event date", es: "Fecha del evento", type: "date" };
    case "emergency": return { en: "When do you need service?", es: "¿Cuándo necesita el servicio?", type: "text" };
    default: return null;
  }
}
