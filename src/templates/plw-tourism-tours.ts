import type { BusinessTemplate } from "./types";
import { TOURISM_ICONS, tourismBrand, tourismContent, type TourismFlavor } from "./tourism-shared";

/*
  PLW tour-demo template: guided tours. Like Snuvalys, a demo starting point —
  staff save it with the client's own brand, city, optional public phone and
  the services/highlight PLW collected. Verified stock photography
  (Pexels, free license) stands in until the business sends its own photos;
  the site labels gallery imagery as illustrative.
*/

// Pexels photo 11181983 — verified loading 2026-11-19. Aerial of Manuel Antonio.
const HERO = "https://images.pexels.com/photos/11181983/pexels-photo-11181983.jpeg?auto=compress&cs=tinysrgb&w=1920";

const flavor: TourismFlavor = {
  noun: { en: "tour", es: "tour" },
  servicesTitle: { en: "Tours and experiences", es: "Tours y experiencias" },
  servicesBlurb: {
    en: "These are the experiences we offer. Ask us about any of them for dates, routes and what's included.",
    es: "Estas son las experiencias que ofrecemos. Pregúntenos por cualquiera para fechas, rutas y qué incluye.",
  },
  subtitle: {
    en: "Guided tours across Costa Rica's coasts, forests and volcanoes — planned with you, one message away.",
    es: "Tours guiados por las costas, bosques y volcanes de Costa Rica — planeados con usted, a un mensaje de distancia.",
  },
  navExplore: { en: "Gallery", es: "Galería" },
  exploreAnchor: "gallery",
};

const plwTourismTours: BusinessTemplate = {
  slug: "plw-tourism-tours",
  industry: "Tourism · Tours",
  industryEs: "Turismo · Tours",
  websiteType: "Tour Operator Website",
  defaultServicesField: "Guided tours, Nature & wildlife, Beach & snorkeling, Volcano & hot springs, Coffee & culture",
  brand: tourismBrand({
    name: "Costa Rica Tours",
    city: "San José",
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
      "https://images.pexels.com/photos/17488413/pexels-photo-17488413.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/30603643/pexels-photo-30603643.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/29904529/pexels-photo-29904529.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    teamPortrait: "",
  },
  galleryCaptions: {
    en: ["Cloud forest road", "Jungle waterfall", "Rainforest trail"],
    es: ["Camino de bosque nuboso", "Catarata en la selva", "Sendero de selva"],
  },
  offers: {
    en: [
      { icon: "Clock", title: "Ask before you book", blurb: "We confirm dates, routes and details in writing before any commitment." },
      { icon: "Leaf", title: "Real local knowledge", blurb: "We run these tours ourselves, where we live." },
      { icon: "Heart", title: "Small groups", blurb: "The day moves at your pace, not a schedule." },
      { icon: "Languages", title: "Bilingual attention", blurb: "We answer in English or Spanish, whichever is easier." },
    ],
    es: [
      { icon: "Clock", title: "Pregunte antes de reservar", blurb: "Confirmamos fechas, rutas y detalles por escrito antes de ningún compromiso." },
      { icon: "Leaf", title: "Conocimiento local real", blurb: "Nosotros mismos operamos estos tours, donde vivimos." },
      { icon: "Heart", title: "Grupos pequeños", blurb: "El día va a su ritmo, no a un horario." },
      { icon: "Languages", title: "Atención bilingüe", blurb: "Respondemos en español o inglés, como le quede fácil." },
    ],
  },
};

export default plwTourismTours;
