import type { BusinessTemplate } from "./types";
import { TOURISM_ICONS, tourismBrand, tourismContent, type TourismFlavor } from "./tourism-shared";

/*
  PLW tour-demo template: lodging (stays). A demo starting point — staff save it
  with the client's own brand, city, optional public phone and the services /
  highlight PLW collected. Verified stock photography (Pexels, free license)
  stands in until the business sends its own photos; the site labels gallery
  imagery as illustrative.
*/

// Pexels photo 3155666 — verified loading 2026-11-19. Infinity pool by the beach.
const HERO = "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1920";

const flavor: TourismFlavor = {
  noun: { en: "stay", es: "alojamiento" },
  servicesTitle: { en: "The place and its services", es: "El lugar y sus servicios" },
  servicesBlurb: {
    en: "What the property offers. Ask us about availability for your dates.",
    es: "Lo que la propiedad ofrece. Consúltenos por disponibilidad para sus fechas.",
  },
  subtitle: {
    en: "A stay on Costa Rica's green side — book directly with the people who run it.",
    es: "Un alojamiento en el lado verde de Costa Rica — reserve directo con quienes lo administran.",
  },
  navExplore: { en: "Gallery", es: "Galería" },
  exploreAnchor: "gallery",
};

const plwTourismStays: BusinessTemplate = {
  slug: "plw-tourism-stays",
  siteVariant: "tourism",
  industry: "Tourism · Lodging",
  industryEs: "Turismo · Alojamiento",
  websiteType: "Lodging Website",
  defaultServicesField: "Lodging, Breakfast, Airport pickup, Tour booking, Local recommendations",
  brand: tourismBrand({
    name: "Costa Rica Stays",
    city: "La Fortuna",
    phone: "", // set by the draft when PLW confirms a public number
    phoneHref: "",
    logo: "",
  }),
  serviceIcons: TOURISM_ICONS.services,
  whyIcons: TOURISM_ICONS.why,
  realBusiness: true,
  // Starts empty: the draft supplies services/highlight (overrides.tourismDemo).
  tourismDemo: { services: [], highlight: "" },
  content: tourismContent(flavor),
  media: {
    hero: HERO,
    gallery: [
      "https://images.pexels.com/photos/28843968/pexels-photo-28843968.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/30603643/pexels-photo-30603643.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    teamPortrait: "",
  },
  galleryCaptions: {
    en: ["Pool by the coast", "Evening by the water", "Rainforest nearby"],
    es: ["Piscina frente a la costa", "Atardecer junto al agua", "Selva muy cerca"],
  },
  offers: {
    en: [
      { icon: "Clock", title: "Ask before you book", blurb: "We confirm availability for your dates in writing before any commitment." },
      { icon: "Leaf", title: "Run by its hosts", blurb: "You book directly with the people who receive you." },
      { icon: "Heart", title: "The green side", blurb: "Forests, water and quiet — Costa Rica as it is." },
      { icon: "Languages", title: "Bilingual attention", blurb: "We answer in English or Spanish, whichever is easier." },
    ],
    es: [
      { icon: "Clock", title: "Pregunte antes de reservar", blurb: "Confirmamos disponibilidad para sus fechas por escrito antes de ningún compromiso." },
      { icon: "Leaf", title: "Atendido por sus anfitriones", blurb: "Reserva directo con quienes lo reciben." },
      { icon: "Heart", title: "El lado verde", blurb: "Bosque, agua y silencio — Costa Rica como es." },
      { icon: "Languages", title: "Atención bilingüe", blurb: "Respondemos en español o inglés, como le quede fácil." },
    ],
  },
};

export default plwTourismStays;
