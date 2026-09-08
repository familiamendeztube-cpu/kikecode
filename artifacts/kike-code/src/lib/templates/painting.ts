import { Brush, Factory, Building2, Home, Clock, Languages, ShieldCheck, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";

const painting: BusinessTemplate = {
  slug: "painting",
  industry: "Painting",
  industryEs: "Pintura",
  websiteType: "Construction Website",
  defaultServicesField: "Residential interior & exterior, Commercial, Industrial coatings, Cabinet refinishing, Color consultation",
  brand: {
    name: "ProColor Painting",
    city: "Los Angeles",
    phone: "(555) 010-0001",
    phoneHref: "tel:+15550100001",
    email: "hello@procolorpainting.com",
    address: "100 Sunset Blvd, Los Angeles, CA 90026",
    heroIcon: Brush,
    palette: {
      primary: "#FAA94C", primaryDark: "#d97706", accent: "#F93262",
      heroFrom: "#0f172a", heroVia: "#1c1224", heroTo: "#0f172a",
      heroGlow1: "rgba(250,169,76,0.55)", heroGlow2: "rgba(249,50,98,0.35)",
      heroIconFrom: "#FAA94C", heroIconTo: "#F93262",
      contactFrom: "#FAA94C", contactTo: "#F93262",
    },
  },
  serviceIcons: [Factory, Building2, Home],
  whyIcons: [Clock, Languages, ShieldCheck, Sparkles],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Serving local communities since 2010",
        title1: "Premium Painting for",
        title2: "Homes, Offices & Industrial Spaces",
        subtitle: "15 years of professional painting. Bilingual team. Free estimates. Licensed & insured.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["15+ Years", "Bilingual EN/ES", "Free Estimates", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "200+ happy customers",
        trustTitle: "Licensed & Insured", trustSubtitle: "Fully protected",
      },
      services: {
        title: "What We Paint", blurb: "Three specialties. One trusted crew.",
        items: [
          { title: "Industrial",  blurb: "Warehouses, factories, plants. Heavy-duty coatings, safety markings, epoxy floors." },
          { title: "Commercial",  blurb: "Offices, retail, restaurants. After-hours scheduling so your business never stops." },
          { title: "Residential", blurb: "Interior, exterior, cabinets, trim. Careful prep, beautiful finish." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "15 years of experience",        blurb: "Hundreds of finished projects across the region." },
          { title: "Bilingual: English & Spanish",  blurb: "Clear communication that respects you." },
          { title: "Licensed, bonded & insured",    blurb: "Your home and business are fully protected." },
          { title: "Free, honest estimates",        blurb: "No hidden fees. Quote in writing." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",    blurb: "Tell us about your project — we listen first." },
          { title: "Free on-site estimate", blurb: "Walk-through, color advice, written quote." },
          { title: "We paint & clean up",   blurb: "Careful prep, premium paint, daily cleanup." },
          { title: "Final walk-through",    blurb: "You sign off when it's perfect." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Maria G.",  role: "Homeowner",            quote: "They repainted our entire house in 3 days. Clean, on time, beautiful work." },
          { name: "Daniel R.", role: "Restaurant owner",     quote: "They worked overnight so we didn't lose a single day of business. True pros." },
          { name: "Linda K.",  role: "Property manager",     quote: "We use them for every unit turnover. Reliable, fast, fair price." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does painting cost?",     a: "Every job is different — that's why we give free written estimates. Most interior rooms range from $400–$900." },
          { q: "How long will it take?",           a: "A single room: 1–2 days. Whole home interior: 3–5 days. Exterior: 4–7 days." },
          { q: "Are you licensed and insured?",    a: "Yes — fully licensed, bonded, and carrying liability and workers' comp insurance." },
          { q: "What paint do you use?",           a: "Premium brands only — Sherwin-Williams, Benjamin Moore, Behr Pro. Low-VOC options available." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Residential interior", "Residential exterior", "Commercial", "Industrial", "Other"],
      },
      footer: { tagline: "Premium painting across the region.", hours: "Mon–Sat · 7am–7pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Sirviendo a nuestras comunidades desde 2010",
        title1: "Pintura Premium para",
        title2: "Casas, Oficinas y Espacios Industriales",
        subtitle: "15 años de pintura profesional. Equipo bilingüe. Estimados gratis. Con licencia y seguro.",
        cta1: "Estimado Gratis", cta2: "Llame Ahora",
        badges: ["15+ Años", "Bilingüe EN/ES", "Estimados Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "200+ clientes felices",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Totalmente protegido",
      },
      services: {
        title: "Lo Que Pintamos", blurb: "Tres especialidades. Un equipo de confianza.",
        items: [
          { title: "Industrial",  blurb: "Bodegas, fábricas, plantas. Recubrimientos resistentes y pisos epóxicos." },
          { title: "Comercial",   blurb: "Oficinas, tiendas, restaurantes. Trabajamos fuera de horario." },
          { title: "Residencial", blurb: "Interior, exterior, gabinetes, molduras. Preparación cuidadosa y hermosos acabados." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "15 años de experiencia",      blurb: "Cientos de proyectos terminados en la región." },
          { title: "Bilingüe: Inglés y Español",  blurb: "Comunicación clara que lo respeta." },
          { title: "Con licencia y asegurado",    blurb: "Su casa y negocio están totalmente protegidos." },
          { title: "Estimados gratis y honestos", blurb: "Sin sorpresas. Cotización por escrito." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o mándenos mensaje", blurb: "Cuéntenos sobre su proyecto — escuchamos primero." },
          { title: "Estimado gratis en su sitio", blurb: "Visita, consejo de color, cotización por escrito." },
          { title: "Pintamos y limpiamos",        blurb: "Preparación cuidadosa, pintura premium, limpieza diaria." },
          { title: "Inspección final",            blurb: "Usted aprueba cuando todo esté perfecto." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "María G.",  role: "Dueña de casa",        quote: "Pintaron toda la casa en 3 días. Limpio, puntual, hermoso trabajo." },
          { name: "Daniel R.", role: "Dueño de restaurante", quote: "Trabajaron de noche y no perdimos ni un día de negocio." },
          { name: "Linda K.",  role: "Administradora",       quote: "Los usamos para cada unidad. Confiables, rápidos, precio justo." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta pintar?",         a: "Cada trabajo es diferente — damos estimados gratis por escrito. Habitaciones interiores entre $400–$900." },
          { q: "¿Cuánto tiempo tarda?",          a: "Una habitación: 1–2 días. Casa entera por dentro: 3–5 días. Exterior: 4–7 días." },
          { q: "¿Tienen licencia y seguro?",     a: "Sí — licencia completa, fianza y seguro de responsabilidad y trabajadores." },
          { q: "¿Qué pintura usan?",             a: "Solo marcas premium — Sherwin-Williams, Benjamin Moore, Behr Pro. Opciones de bajo VOC." },
        ],
      },
      contact: {
        title: "Pida un Estimado Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su proyecto",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Interior residencial", "Exterior residencial", "Comercial", "Industrial", "Otro"],
      },
      footer: { tagline: "Pintura premium en toda la región.", hours: "Lun–Sáb · 7am–7pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default painting;
