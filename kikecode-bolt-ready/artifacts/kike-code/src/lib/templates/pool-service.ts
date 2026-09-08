import { Waves, Droplets, Wrench, Sparkles, Clock, Languages, ShieldCheck, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";

const poolService: BusinessTemplate = {
  slug: "pool-service",
  industry: "Pool Service",
  industryEs: "Servicio de Piscinas",
  websiteType: "Home Services Website",
  defaultServicesField: "Weekly cleaning, Chemical balancing, Equipment repair, Filter & pump service, Green-to-clean recovery",
  brand: {
    name: "ClearWave Pools",
    city: "Phoenix",
    phone: "(555) 010-0011",
    phoneHref: "tel:+15550100011",
    email: "hello@clearwavepools.com",
    address: "311 Palm Springs Rd, Phoenix, AZ 85003",
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
        title2: "Homes, Communities & Resorts",
        subtitle: "Weekly cleaning, perfect chemistry, fast repairs. Bilingual team. Free quotes. Licensed & insured.",
        cta1: "Get Free Quote", cta2: "Call Now",
        badges: ["Weekly Service", "Bilingual EN/ES", "Free Quotes", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ pools serviced",
        trustTitle: "Licensed & Insured", trustSubtitle: "Certified technicians",
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
          { title: "Licensed & insured",         blurb: "Your property is fully protected." },
          { title: "Honest, upfront pricing",    blurb: "Flat monthly rates. No surprise fees." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",   blurb: "Tell us about your pool — we listen first." },
          { title: "Free on-site visit",   blurb: "We inspect, test the water, and quote in writing." },
          { title: "We service & maintain", blurb: "Clean, balance, repair — and send a photo report." },
          { title: "Enjoy clear water",    blurb: "Relax while we keep it perfect all season." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Robert H.", role: "Homeowner",         quote: "Our pool has never looked better. They show up every week, rain or shine." },
          { name: "Sofía M.",  role: "HOA manager",        quote: "They maintain our community pool flawlessly. Always clean, always on time." },
          { name: "James P.",  role: "Vacation rental host", quote: "Guests rave about the pool. The green-to-clean recovery was incredible." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does weekly service cost?", a: "Most residential pools run $120–$220 per month depending on size and equipment. We quote in writing — no surprises." },
          { q: "Do you fix pumps and heaters?",      a: "Yes — we repair and replace pumps, filters, heaters, salt systems, and automation." },
          { q: "Can you fix a green pool?",          a: "Absolutely. Our green-to-clean recovery usually restores a swimmable pool within a few days." },
          { q: "Are you licensed and insured?",      a: "Yes — fully licensed, insured, and our technicians are pool-chemistry certified." },
        ],
      },
      contact: {
        title: "Request a Free Quote", blurb: "Tell us about your pool. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your pool",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Weekly cleaning", "Chemical balancing", "Equipment repair", "Green-to-clean", "Other"],
      },
      footer: { tagline: "Crystal-clear pool care across the valley.", hours: "Mon–Sat · 7am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Piscinas cristalinas, todo el año",
        title1: "Cuidado Confiable de Piscinas para",
        title2: "Casas, Comunidades y Resorts",
        subtitle: "Limpieza semanal, química perfecta, reparaciones rápidas. Equipo bilingüe. Cotizaciones gratis. Con licencia y seguro.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Servicio Semanal", "Bilingüe EN/ES", "Cotizaciones Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ piscinas atendidas",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Técnicos certificados",
      },
      services: {
        title: "De Lo Que Nos Encargamos", blurb: "Desde la limpieza de rutina hasta reparación completa de equipos.",
        items: [
          { title: "Limpieza Semanal",        blurb: "Recolección, cepillado, aspirado y vaciado de canastas. Su piscina lista cada semana." },
          { title: "Reparaciones y Equipos",  blurb: "Bombas, filtros, calentadores, automatización. Diagnosticamos y reparamos bien." },
          { title: "Balance Químico",         blurb: "Agua segura y balanceada en cada visita. Sin ojos rojos ni agua verde." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Puntuales, cada semana",      blurb: "Un horario confiable en el que puede contar." },
          { title: "Bilingüe: Inglés y Español",  blurb: "Comunicación clara que lo respeta." },
          { title: "Con licencia y seguro",       blurb: "Su propiedad está totalmente protegida." },
          { title: "Precios honestos y claros",   blurb: "Tarifa mensual fija. Sin cargos sorpresa." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o mándenos mensaje", blurb: "Cuéntenos sobre su piscina — escuchamos primero." },
          { title: "Visita gratis en su sitio",   blurb: "Inspeccionamos, probamos el agua y cotizamos por escrito." },
          { title: "Damos servicio y mantenemos", blurb: "Limpiamos, balanceamos, reparamos — con reporte de fotos." },
          { title: "Disfrute el agua limpia",     blurb: "Relájese mientras la mantenemos perfecta toda la temporada." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Robert H.", role: "Dueño de casa",          quote: "Nuestra piscina nunca se vio mejor. Llegan cada semana, llueva o truene." },
          { name: "Sofía M.",  role: "Administradora de HOA",   quote: "Mantienen la piscina comunitaria impecable. Siempre limpia, siempre a tiempo." },
          { name: "James P.",  role: "Anfitrión de renta",      quote: "Los huéspedes aman la piscina. La recuperación de agua verde fue increíble." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el servicio semanal?", a: "La mayoría de piscinas residenciales cuestan $120–$220 al mes según el tamaño y el equipo. Cotizamos por escrito — sin sorpresas." },
          { q: "¿Reparan bombas y calentadores?",     a: "Sí — reparamos y reemplazamos bombas, filtros, calentadores, sistemas de sal y automatización." },
          { q: "¿Pueden recuperar una piscina verde?", a: "Claro que sí. Nuestra recuperación de agua verde suele dejarla nadable en pocos días." },
          { q: "¿Tienen licencia y seguro?",          a: "Sí — con licencia, asegurados, y nuestros técnicos están certificados en química de piscinas." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre su piscina. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su piscina",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Limpieza semanal", "Balance químico", "Reparación de equipos", "Recuperación de agua verde", "Otro"],
      },
      footer: { tagline: "Cuidado de piscinas cristalinas en todo el valle.", hours: "Lun–Sáb · 7am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default poolService;
