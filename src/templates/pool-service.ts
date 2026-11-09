import { Waves, Droplets, Wrench, Sparkles, Clock, Languages, ShieldCheck, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/pool-service`;

const poolService: BusinessTemplate = {
  slug: "pool-service",
  industry: "Pool Service",
  industryEs: "Servicio de Piscinas",
  websiteType: "Home Services Website",
  defaultServicesField: "Weekly cleaning, Chemical balancing, Equipment repair, Filter & pump service, Green-to-clean recovery",
  brand: {
    name: "ClearWave Pools",
    city: "Playas del Coco",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@clearwavepools.com",
    address: "De la plaza de deportes de Playas del Coco, 150 m este, Sardinal, Carrillo, Guanacaste",
    heroIcon: Waves,
    palette: {
      primary: "#0EA5E9", primaryDark: "#0369a1", accent: "#06B6D4",
      heroFrom: "#082f49", heroVia: "#0c4a6e", heroTo: "#082f49",
      heroGlow1: "rgba(14,165,233,0.55)", heroGlow2: "rgba(6,182,212,0.35)",
      heroIconFrom: "#0EA5E9", heroIconTo: "#06B6D4",
      contactFrom: "#0EA5E9", contactTo: "#06B6D4",
    },
  },
  serviceIcons: [Droplets, Wrench, Sparkles],
  whyIcons: [Clock, Languages, ShieldCheck, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Crystal-clear pools, year-round",
        title1: "Reliable Pool Care for",
        title2: "Homes, Condos & Hotels",
        subtitle: "Weekly cleaning, perfect chemistry, fast repairs. Bilingual team. Free quotes. INS-insured crew.",
        cta1: "Get Free Quote", cta2: "Call Now",
        badges: ["Weekly Service", "Bilingual EN/ES", "Free Quotes", "INS-Insured Crew"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ pools serviced",
        trustTitle: "Insured Crew", trustSubtitle: "Certified technicians",
      },
      services: {
        title: "What We Take Care Of", blurb: "From routine cleaning to full equipment repair.",
        items: [
          { title: "Weekly Cleaning",     blurb: "Skimming, brushing, vacuuming, basket emptying. Your pool ready every week." },
          { title: "Repairs & Equipment", blurb: "Pumps, filters, heaters, automation. We diagnose and fix it right." },
          { title: "Chemical Balancing",  blurb: "Safe, balanced water every visit. No more red eyes or green water." },
        ],
      },
      why: {
        title: "Why Owners Trust Us",
        items: [
          { title: "On-time, every week",        blurb: "A dependable schedule you can count on." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication that respects you." },
          { title: "Insured with the INS",       blurb: "Your property is fully protected." },
          { title: "Honest, upfront pricing",    blurb: "Flat monthly rates. No surprise fees." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",   blurb: "Tell us about your pool — we listen first." },
          { title: "Free on-site visit",   blurb: "We inspect, test the water, and quote in writing." },
          { title: "We service & maintain", blurb: "Clean, balance, repair — and send a photo report." },
          { title: "Enjoy clear water",    blurb: "Relax while we keep it perfect, dry season and rainy season." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Andrés H.",     role: "Homeowner in Playa Hermosa",              quote: "Our pool has never looked better. They show up every week, rain or shine." },
          { name: "Melissa M.",    role: "Condo administrator in Playas del Coco",  quote: "They maintain our condominium pool flawlessly. Always clean, always on time." },
          { name: "José Pablo P.", role: "Vacation rental host in Playa Ocotal",    quote: "Guests rave about the pool. The green-to-clean recovery was incredible." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does weekly service cost?", a: "Most residential pools run ₡60 000–₡110 000 per month depending on size and equipment. We quote in writing — no surprises." },
          { q: "Do you fix pumps and heaters?",      a: "Yes — we repair and replace pumps, filters, heaters, salt systems, and automation." },
          { q: "Can you fix a green pool?",          a: "Absolutely. Our green-to-clean recovery usually restores a swimmable pool within a few days." },
          { q: "Are you insured?",                   a: "Yes — our crew is insured with the INS, and our technicians are certified in pool chemistry." },
        ],
      },
      contact: {
        title: "Request a Free Quote", blurb: "Tell us about your pool. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your pool",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Weekly cleaning", "Chemical balancing", "Equipment repair", "Green-to-clean", "Other"],
      },
      footer: { tagline: "Crystal-clear pool care along the Papagayo coast.", hours: "Mon–Sat · 7:00 a.m.–6:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Piscinas cristalinas, todo el año",
        title1: "Cuidado Confiable de Piscinas para",
        title2: "Casas, Condominios y Hoteles",
        subtitle: "Limpieza semanal, química perfecta, reparaciones rápidas. Equipo bilingüe. Cotización gratis. Personal asegurado ante el INS.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Servicio Semanal", "Bilingüe EN/ES", "Cotización Gratis", "Personal Asegurado"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ piscinas atendidas",
        trustTitle: "Personal Asegurado", trustSubtitle: "Técnicos certificados",
      },
      services: {
        title: "De Lo Que Nos Encargamos", blurb: "Desde la limpieza de rutina hasta la reparación completa de equipos.",
        items: [
          { title: "Limpieza Semanal",        blurb: "Recolección de hojas, cepillado, aspirado y vaciado de canastas. Su piscina lista cada semana." },
          { title: "Reparaciones y Equipos",  blurb: "Bombas, filtros, calentadores, automatización. Diagnosticamos y reparamos bien." },
          { title: "Balance Químico",         blurb: "Agua segura y balanceada en cada visita. Sin ojos rojos ni agua verde." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Puntuales, cada semana",      blurb: "Un horario confiable con el que puede contar." },
          { title: "Bilingüe: inglés y español",  blurb: "Comunicación clara que lo respeta." },
          { title: "Asegurados ante el INS",      blurb: "Su propiedad está totalmente protegida." },
          { title: "Precios honestos y claros",   blurb: "Tarifa mensual fija. Sin cobros sorpresa." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos",       blurb: "Cuéntenos sobre su piscina — escuchamos primero." },
          { title: "Visita gratis a su propiedad", blurb: "Inspeccionamos, probamos el agua y cotizamos por escrito." },
          { title: "Damos servicio y mantenimiento", blurb: "Limpiamos, balanceamos, reparamos — y le enviamos un reporte con fotos." },
          { title: "Disfrute el agua limpia",     blurb: "Relájese mientras la mantenemos perfecta, en verano y en invierno." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Andrés H.",     role: "Vecino de Playa Hermosa",                       quote: "Nuestra piscina nunca se vio mejor. Llegan cada semana, llueva o haga sol." },
          { name: "Melissa M.",    role: "Administradora de condominio en Playas del Coco", quote: "Mantienen la piscina del condominio impecable. Siempre limpia, siempre a tiempo." },
          { name: "José Pablo P.", role: "Anfitrión de alquiler vacacional en Playa Ocotal", quote: "Los huéspedes aman la piscina. La recuperación del agua verde fue increíble." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el servicio semanal?", a: "La mayoría de piscinas residenciales cuestan entre ₡60 000 y ₡110 000 al mes según el tamaño y el equipo. Cotizamos por escrito — sin sorpresas." },
          { q: "¿Reparan bombas y calentadores?",     a: "Sí — reparamos y reemplazamos bombas, filtros, calentadores, sistemas de sal y automatización." },
          { q: "¿Pueden recuperar una piscina verde?", a: "Claro que sí. Nuestra recuperación de agua verde suele dejarla lista para nadar en pocos días." },
          { q: "¿Tienen seguro?",                     a: "Sí — nuestro personal está asegurado ante el INS y nuestros técnicos están certificados en química de piscinas." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre su piscina. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio que necesita", message: "Cuéntenos sobre su piscina",
        submit: "Enviar Solicitud", success: "Gracias — le llamamos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Limpieza semanal", "Balance químico", "Reparación de equipos", "Recuperación de agua verde", "Otro"],
      },
      footer: { tagline: "Cuidado de piscinas cristalinas en toda la zona de Papagayo.", hours: "Lun a sáb · 7:00 a. m. – 6:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 8:00 a.m.–5:00 p.m.", es: "Lun a sáb · 8:00 a. m. – 5:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Need weekly service or a one-time clean?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Necesita servicio semanal o una limpieza de una sola vez?",
    roleEn: "Pool Care Advisor", roleEs: "Asesora de Piscinas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: "",
  },
  offers: {
    en: [
      { icon: "Sparkles", title: "Weekly maintenance plans", blurb: "Crystal-clear water, hands-off for you." },
      { icon: "ShieldCheck", title: "Insured crew", blurb: "Trusted, reliable pool techs." },
      { icon: "Banknote", title: "Free water testing", blurb: "We balance chemicals the right way." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in English or Spanish." },
    ],
    es: [
      { icon: "Sparkles", title: "Planes de mantenimiento semanal", blurb: "Agua cristalina sin que usted se preocupe." },
      { icon: "ShieldCheck", title: "Personal asegurado", blurb: "Técnicos de confianza." },
      { icon: "Banknote", title: "Prueba de agua gratis", blurb: "Balanceamos los químicos correctamente." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en español o inglés." },
    ],
  },
  galleryCaptions: {
    en: ["Crystal-clear pool", "Clean water every week", "Treated, balanced water", "Ready for a swim"],
    es: ["Piscina cristalina", "Agua limpia cada semana", "Agua tratada y balanceada", "Lista para nadar"],
  },
};

export default poolService;
