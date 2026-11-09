import {
  HardHat, Building2, Hammer, Wrench, Zap, Snowflake, Stethoscope, Layers, Grid3x3, SquareStack, ChefHat,
  MessageCircle, Store, Clock,
} from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/snuvalys-construccions`;

/*
  Snuvalys Construccions — a real client in San José, Costa Rica (contact:
  Daniel Snuvalys). Every fact here comes from the business's own Facebook page
  (2026-11-09): its service list, phone/WhatsApp, email, location, "always open",
  and its posts (obra gris, a counter, tongue-and-groove wall, an industrial
  exhaust for a soda, a shop remodel). It has no reviews, ratings, years in
  business or certifications online, so the site shows none: no testimonials,
  no `facts`, an empty hero rating. Photos: the owner's own, in the
  template-assets bucket under snuvalys-construccions/.
*/
const snuvalysConstruccions: BusinessTemplate = {
  slug: "snuvalys-construccions",
  industry: "General Construction",
  industryEs: "Construcción en General",
  websiteType: "Construction Website",
  defaultServicesField:
    "General construction, Remodeling, Building maintenance, Electrical systems, Air conditioning & cold rooms, Medical installations, Epoxy floors, Tiling, Drywall (gypsum), Kitchen & soda furniture",
  brand: {
    name: "Snuvalys Construccions",
    // The blueprint house from the business's own card, cropped square for the round logo slots.
    logo: `${assets}/logo-mark.jpg`,
    city: "San José",
    phone: "+506 6173-6310",
    phoneHref: "tel:+50661736310",
    email: "snuvalysconstruccions@gmail.com",
    address: "San José, Costa Rica",
    heroIcon: HardHat,
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=100075908865539",
    },
    // The black-and-blue "blueprint" look of the business's own cover and logo.
    palette: {
      primary: "#1F7AE0", primaryDark: "#0B3D91", accent: "#38BDF8",
      heroFrom: "#04060C", heroVia: "#0A1A33", heroTo: "#020409",
      heroGlow1: "rgba(56,189,248,0.32)", heroGlow2: "rgba(31,122,224,0.22)",
      heroIconFrom: "#38BDF8", heroIconTo: "#1F7AE0",
      contactFrom: "#04060C", contactTo: "#0B3D91",
    },
  },
  serviceIcons: [Building2, Hammer, Wrench, Zap, Snowflake, Stethoscope, Layers, Grid3x3, SquareStack, ChefHat],
  whyIcons: [MessageCircle, HardHat, Store, Clock],
  realBusiness: true,
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "How We Work", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "General construction · San José",
        title1: "Construction, Remodeling",
        title2: "& Maintenance in San José",
        subtitle: "Structural work, remodels, electrical systems, air conditioning and cold rooms, epoxy floors, tiling, drywall, and kitchen and soda furniture. Hire Daniel Snuvalys directly on WhatsApp.",
        cta1: "Request a Quote", cta2: "Call Now",
        badges: ["Structural work", "Remodeling", "Electrical", "Air conditioning"],
        ratingTitle: "", ratingSubtitle: "",
        trustTitle: "Hire us directly", trustSubtitle: "Daniel Snuvalys · 6173-6310",
      },
      services: {
        title: "Our Services", blurb: "Construction, remodeling and maintenance with a single contact.",
        items: [
          { title: "General Construction",        blurb: "Structural work (obra gris): excavation, foundations and steel reinforcement." },
          { title: "Remodeling",                  blurb: "Homes and businesses: walls, paint, gutters, windows and finishes." },
          { title: "Building Maintenance",        blurb: "Repairs and upkeep for your home or business." },
          { title: "Electrical Systems",          blurb: "Electrical installations and repairs." },
          { title: "Air Conditioning & Cold Rooms", blurb: "Air conditioning and cold room installations." },
          { title: "Medical Installations",       blurb: "Installations for medical spaces." },
          { title: "Epoxy Floors",                blurb: "Durable, easy-to-clean epoxy flooring." },
          { title: "Tiling",                      blurb: "Floor and wall tiling of all kinds." },
          { title: "Drywall (Gypsum)",            blurb: "Gypsum walls and ceilings." },
          { title: "Kitchen & Soda Furniture",    blurb: "Kitchen cabinets, counters and industrial exhaust hoods for sodas." },
        ],
      },
      why: {
        title: "Why Hire Us",
        items: [
          { title: "One contact",                 blurb: "Hire Daniel Snuvalys directly, on WhatsApp or by phone." },
          { title: "Many trades, one team",       blurb: "Construction, electrical, air conditioning and finishes, without juggling several contractors." },
          { title: "Homes and businesses",        blurb: "We work on homes and on businesses such as sodas and shops." },
          { title: "Open every day",              blurb: "Message us whenever you need us at 6173-6310." },
        ],
      },
      process: {
        title: "How We Work",
        items: [
          { title: "Message us",          blurb: "Tell us on WhatsApp or by phone what you need, with photos if you have them." },
          { title: "We look at the job",  blurb: "We arrange to see the place and understand the work." },
          { title: "We quote",            blurb: "We send you the quote for the job." },
          { title: "We get to work",      blurb: "We do the work and keep you posted." },
        ],
      },
      testimonials: { title: "Reviews", items: [] },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How do I hire you?",            a: "On WhatsApp or by calling 6173-6310 and asking for Daniel Snuvalys." },
          { q: "Where do you work?",            a: "We are in San José, Costa Rica. Ask us about your area." },
          { q: "What kind of work do you do?",  a: "General construction, remodeling, building maintenance, electrical systems, air conditioning and cold rooms, medical installations, epoxy floors, tiling, drywall, and kitchen and soda furniture." },
          { q: "Do you work on businesses?",    a: "Yes: we remodel shops and build counters, kitchen furniture and industrial exhaust hoods for sodas." },
        ],
      },
      contact: {
        title: "Request a Quote", blurb: "Tell us about your project and we'll get back to you on WhatsApp or by phone.",
        name: "Your name", phone: "Phone", service: "Type of work", message: "Tell us what you need",
        submit: "Send Request", success: "Thank you — we'll contact you to follow up.",
        pick: "— Pick a type of work —",
        services: ["General construction", "Remodeling", "Maintenance", "Electrical", "Air conditioning / cold room", "Medical installation", "Epoxy floor", "Tiling", "Drywall (gypsum)", "Kitchen / soda furniture", "Other"],
      },
      footer: { tagline: "General construction, remodeling and maintenance in San José.", hours: "Open every day", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Cómo Trabajamos", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Construcción en general · San José",
        title1: "Construcción, Remodelación",
        title2: "y Mantenimiento en San José",
        subtitle: "Obra gris, remodelaciones, sistemas eléctricos, aire acondicionado y cuartos fríos, pisos epóxicos, enchapes, gypsum y muebles de cocina y soda. Contrate directo con Daniel Snuvalys por WhatsApp.",
        cta1: "Solicite una Cotización", cta2: "Llame Ahora",
        badges: ["Obra gris", "Remodelaciones", "Sistemas eléctricos", "Aire acondicionado"],
        ratingTitle: "", ratingSubtitle: "",
        trustTitle: "Contratación directa", trustSubtitle: "Daniel Snuvalys · 6173-6310",
      },
      services: {
        title: "Nuestros Servicios", blurb: "Construcción, remodelación y mantenimiento con un solo contacto.",
        items: [
          { title: "Construcción en General",         blurb: "Obra gris: excavación, cimientos y armadura de acero." },
          { title: "Remodelaciones",                  blurb: "Casas y establecimientos: paredes, pintura, canoas, ventanas y acabados." },
          { title: "Mantenimiento de Construcción",   blurb: "Reparaciones y mantenimiento para su casa o negocio." },
          { title: "Sistemas Eléctricos",             blurb: "Instalaciones y reparaciones eléctricas." },
          { title: "Aire Acondicionado y Cuarto Frío", blurb: "Instalación de aire acondicionado y cuartos fríos." },
          { title: "Instalaciones Médicas",           blurb: "Instalaciones para espacios médicos." },
          { title: "Pisos Epóxicos",                  blurb: "Pisos de epóxico resistentes y fáciles de limpiar." },
          { title: "Enchapes",                        blurb: "Enchapes de piso y pared en general." },
          { title: "Gypsum",                          blurb: "Paredes y cielos de gypsum." },
          { title: "Muebles de Cocina y Soda",        blurb: "Muebles de cocina, mostradores y extractores industriales para sodas." },
        ],
      },
      why: {
        title: "Por Qué Contratarnos",
        items: [
          { title: "Un solo contacto",           blurb: "Contrate directo con Daniel Snuvalys, por WhatsApp o por teléfono." },
          { title: "Muchos oficios, un equipo",  blurb: "Construcción, electricidad, aire acondicionado y acabados, sin buscar varios contratistas." },
          { title: "Casas y negocios",           blurb: "Trabajamos en viviendas y en negocios como sodas y locales." },
          { title: "Abierto todos los días",     blurb: "Escríbanos cuando lo necesite al 6173-6310." },
        ],
      },
      process: {
        title: "Cómo Trabajamos",
        items: [
          { title: "Escríbanos",            blurb: "Cuéntenos por WhatsApp o por teléfono qué necesita, con fotos si las tiene." },
          { title: "Vemos el trabajo",      blurb: "Coordinamos para ver el lugar y entender lo que necesita." },
          { title: "Le cotizamos",          blurb: "Le enviamos la cotización del trabajo." },
          { title: "Manos a la obra",       blurb: "Hacemos el trabajo y le mantenemos al tanto." },
        ],
      },
      testimonials: { title: "Reseñas", items: [] },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cómo los contrato?",              a: "Por WhatsApp o llamando al 6173-6310 con Daniel Snuvalys." },
          { q: "¿Dónde trabajan?",                 a: "Estamos en San José, Costa Rica. Pregúntenos por su zona." },
          { q: "¿Qué tipo de trabajos hacen?",     a: "Construcción en general, remodelaciones, mantenimiento de construcción, sistemas eléctricos, aire acondicionado y cuartos fríos, instalaciones médicas, pisos epóxicos, enchapes, gypsum y muebles de cocina y soda." },
          { q: "¿Trabajan en negocios?",           a: "Sí: remodelamos establecimientos y hacemos mostradores, muebles de cocina y extractores industriales para sodas." },
        ],
      },
      contact: {
        title: "Solicite una Cotización", blurb: "Cuéntenos sobre su proyecto y le respondemos por WhatsApp o por teléfono.",
        name: "Su nombre", phone: "Teléfono", service: "Tipo de trabajo", message: "Cuéntenos qué necesita",
        submit: "Enviar Solicitud", success: "Gracias — le contactaremos para coordinar.",
        pick: "— Elija un tipo de trabajo —",
        services: ["Construcción en general", "Remodelación", "Mantenimiento", "Sistemas eléctricos", "Aire acondicionado / cuarto frío", "Instalación médica", "Piso epóxico", "Enchape", "Gypsum", "Muebles de cocina / soda", "Otro"],
      },
      footer: { tagline: "Construcción en general, remodelaciones y mantenimiento en San José.", hours: "Abierto todos los días", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Open every day · WhatsApp 6173-6310", es: "Abierto todos los días · WhatsApp 6173-6310" },
  assistant: {
    name: "Snuvalys",
    en: "Hi! Thanks for contacting {business}. What work can we help you with?",
    es: "¡Hola! Gracias por escribir a {business}. ¿En qué trabajo le podemos ayudar?",
    roleEn: "Virtual assistant", roleEs: "Asistente virtual",
  },
  // The business's own photos (sent by its owner, 2026-11-09). No team portrait:
  // we do not know who the people in the photos are.
  media: {
    hero: `${assets}/hero-obra-gris.jpg`,
    gallery: [
      `${assets}/mostrador.jpg`,
      `${assets}/extractor-soda.jpg`,
      `${assets}/machimbre.jpg`,
      `${assets}/machimbre-instalacion.jpg`,
      `${assets}/instalacion-cielo.jpg`,
    ],
    teamPortrait: "",
  },
  galleryCaptions: {
    en: ["Counter with a marble-look top", "Industrial exhaust for a soda", "Tongue-and-groove wall", "Tongue-and-groove going up", "Ceiling installation"],
    es: ["Mostrador con sobre tipo mármol", "Extractor industrial para soda", "Pared forrada de machimbre", "Instalación de machimbre", "Instalación en cielo raso"],
  },
  offers: {
    en: [
      { icon: "Wrench",   title: "Many trades, one contact", blurb: "Structural work, electrical, air conditioning, tiling, drywall and furniture." },
      { icon: "Clock",    title: "Open every day",           blurb: "WhatsApp or call 6173-6310." },
      { icon: "Heart",    title: "Homes and businesses",     blurb: "Shop remodels and equipment for sodas." },
      { icon: "Sparkles", title: "Finishes",                 blurb: "Epoxy floors, tiling, tongue-and-groove and gypsum." },
    ],
    es: [
      { icon: "Wrench",   title: "Muchos oficios, un contacto", blurb: "Obra gris, electricidad, aire acondicionado, enchapes, gypsum y muebles." },
      { icon: "Clock",    title: "Abierto todos los días",      blurb: "WhatsApp o llamada al 6173-6310." },
      { icon: "Heart",    title: "Casas y negocios",            blurb: "Remodelación de locales y equipo para sodas." },
      { icon: "Sparkles", title: "Acabados",                    blurb: "Pisos epóxicos, enchapes, machimbre y gypsum." },
    ],
  },
};

export default snuvalysConstruccions;
