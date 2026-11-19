import {
  Mountain, TreePalm, Waves, Binoculars, Bird, Footprints, UtensilsCrossed, Ship,
} from "lucide-react";
import type { TourismDemo } from "./types";

/*
  Shared copy for the two PLW tourism demo templates. Everything the visitor
  reads is either (a) neutral: what a tour/stay business is, or (b) supplied by
  the draft's overrides.tourismDemo. No invented prices, reviews, hours,
  amenities or itineraries — the registry test pins this file to that rule.
*/

export type TourismFlavor = {
  /** Singular noun ("tour", "alojamiento") used inside sentences. */
  noun: { en: string; es: string };
  /** Section framing around the supplied services. */
  servicesTitle: { en: string; es: string };
  servicesBlurb: { en: string; es: string };
  /** Hero subtitle, neutral by design. */
  subtitle: { en: string; es: string };
  /** The two nav sections that differ between tours and stays. */
  navExplore: { en: string; es: string };
  exploreAnchor: "services" | "gallery";
};

const neutral = {
  contactBlurb: {
    en: "Write to us and we'll answer with the details: availability, what to bring and how to reserve your place.",
    es: "Escríbanos y le respondemos con los detalles: disponibilidad, qué llevar y cómo reservar su lugar.",
  },
  closing: {
    en: "Tell us what you have in mind and we'll help you plan it.",
    es: "Cuéntenos qué tiene en mente y le ayudamos a planearlo.",
  },
  // Honest, checkable statements only — nothing a business could contradict.
  why: {
    en: [
      { title: "Real local knowledge", blurb: "We operate where we live and know each route, season and tide ourselves." },
      { title: "Small groups", blurb: "Attention that stays personal, so the day moves at your pace." },
      { title: "Clear answers before you book", blurb: "You get the details in writing before any commitment." },
      { title: "One message is enough", blurb: "WhatsApp or a call — no accounts, no forms to chase." },
    ],
    es: [
      { title: "Conocimiento local de verdad", blurb: "Operamos donde vivimos y conocemos cada ruta, temporada y marea." },
      { title: "Grupos pequeños", blurb: "Atención personal, para que el día vaya a su ritmo." },
      { title: "Respuestas claras antes de reservar", blurb: "Recibe los detalles por escrito antes de ningún compromiso." },
      { title: "Un mensaje basta", blurb: "WhatsApp o una llamada — sin cuentas ni formularios." },
    ],
  },
  process: {
    en: [
      { title: "Write to us", blurb: "Tell us your dates, group size and what interests you." },
      { title: "We reply with details", blurb: "You get availability and what's included, in writing." },
      { title: "You decide", blurb: "No payment online and nothing automatic — you confirm only when ready." },
      { title: "Enjoy the day", blurb: "We meet you at the agreed spot and take care of the rest." },
    ],
    es: [
      { title: "Escríbanos", blurb: "Cuéntenos sus fechas, cuántos son y qué les interesa." },
      { title: "Le respondemos con detalles", blurb: "Recibe disponibilidad y qué incluye, por escrito." },
      { title: "Usted decide", blurb: "Nada de pagos en línea ni automatismos — confirma solo cuando esté listo." },
      { title: "Disfrute el día", blurb: "Nos vemos en el punto acordado y nosotros nos encargamos del resto." },
    ],
  },
  faq: {
    en: [
      { q: "How do I ask about a date?", a: "Send us a WhatsApp or call us. We reply with availability and what the day includes." },
      { q: "How do I reserve?", a: "We confirm the details with you directly and hold your place — no online payment." },
      { q: "Where are you?", a: "We'll share our meeting point and how to get there when you write to us." },
      { q: "What should I bring?", a: "We'll tell you exactly what to bring for your activity when you ask." },
    ],
    es: [
      { q: "¿Cómo pregunto por una fecha?", a: "Escríbanos por WhatsApp o llámenos. Respondemos con disponibilidad y qué incluye el día." },
      { q: "¿Cómo reservo?", a: "Confirmamos los detalles con usted directamente y le apartamos el lugar — sin pago en línea." },
      { q: "¿Dónde están?", a: "Le compartimos el punto de encuentro y cómo llegar cuando nos escriba." },
      { q: "¿Qué debo llevar?", a: "Le decimos exactamente qué llevar para su actividad cuando nos consulte." },
    ],
  },
};

export function tourismContent(flavor: TourismFlavor) {
  return {
    en: {
      nav: { services: "Services", why: "Why Us", process: "How It Works", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Costa Rica",
        title1: "Costa Rica,",
        title2: "at your own pace",
        subtitle: flavor.subtitle.en,
        cta1: "Ask on WhatsApp",
        cta2: "See the gallery",
        badges: [],
        ratingTitle: "", ratingSubtitle: "",
        trustTitle: "Plan your trip with us",
        trustSubtitle: "Direct by WhatsApp or phone",
      },
      services: { title: flavor.servicesTitle.en, blurb: flavor.servicesBlurb.en, items: [] },
      why: { title: "Why travel with us", items: neutral.why.en },
      process: { title: "How it works", items: neutral.process.en },
      testimonials: { title: "Reviews", items: [] },
      faq: { title: "Frequently asked questions", items: neutral.faq.en },
      contact: {
        title: "Ask about your dates",
        blurb: neutral.contactBlurb.en,
        name: "Your name", phone: "Phone", service: "What interests you",
        message: "Your dates and group size",
        submit: "Send message", success: "Thank you — we'll reply soon.",
        pick: "— Choose —",
        services: [],
      },
      footer: {
        tagline: "Tourism in Costa Rica, with the people who know it first-hand.",
        hours: "", rights: "All rights reserved.", hoursLabel: "Hours",
      },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Cómo Funciona", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Costa Rica",
        title1: "Costa Rica,",
        title2: "a su propio ritmo",
        subtitle: flavor.subtitle.es,
        cta1: "Consultar por WhatsApp",
        cta2: "Ver la galería",
        badges: [],
        ratingTitle: "", ratingSubtitle: "",
        trustTitle: "Planee su viaje con nosotros",
        trustSubtitle: "Directo por WhatsApp o teléfono",
      },
      services: { title: flavor.servicesTitle.es, blurb: flavor.servicesBlurb.es, items: [] },
      why: { title: "Por qué viajar con nosotros", items: neutral.why.es },
      process: { title: "Cómo funciona", items: neutral.process.es },
      testimonials: { title: "Reseñas", items: [] },
      faq: { title: "Preguntas frecuentes", items: neutral.faq.es },
      contact: {
        title: "Consulte por sus fechas",
        blurb: neutral.contactBlurb.es,
        name: "Su nombre", phone: "Teléfono", service: "Qué le interesa",
        message: "Sus fechas y cuántos son",
        submit: "Enviar mensaje", success: "Gracias — le responderemos pronto.",
        pick: "— Elija —",
        services: [],
      },
      footer: {
        tagline: "Turismo en Costa Rica, con quienes lo conocen de primera mano.",
        hours: "", rights: "Todos los derechos reservados.", hoursLabel: "Horario",
      },
    },
  };
}

/** Icons the tourism site may draw with; shared by both flavors. */
export const TOURISM_ICONS = {
  services: [Mountain, TreePalm, Waves, Binoculars, Bird, Footprints, UtensilsCrossed, Ship],
  why: [Mountain, Bird, Footprints, UtensilsCrossed],
  process: [Footprints, UtensilsCrossed, Bird, Waves],
};

/** Default demo brand content, shared so both files stay short. */
export function tourismBrand(partial: {
  name: string; city: string; phone: string; phoneHref: string; whatsapp?: string;
  logo: string;
}) {
  return {
    name: partial.name,
    city: partial.city,
    phone: partial.phone,
    phoneHref: partial.phoneHref,
    whatsapp: partial.whatsapp,
    email: "",
    address: `${partial.city}, Costa Rica`,
    heroIcon: Mountain,
    logo: partial.logo,
    palette: {
      primary: "#1F5E3B", primaryDark: "#0F3D26", accent: "#E8B04B",
      heroFrom: "#08150E", heroVia: "#12301E", heroTo: "#050C08",
      heroGlow1: "rgba(232,176,75,0.22)", heroGlow2: "rgba(31,94,59,0.35)",
      heroIconFrom: "#E8B04B", heroIconTo: "#1F5E3B",
      contactFrom: "#0A1F13", contactTo: "#071409",
    },
  };
}

/** The demo data shape a draft's overrides.tourismDemo carries. */
export type { TourismDemo };
