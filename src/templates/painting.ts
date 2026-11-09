import { Brush, Factory, Building2, Home, Clock, Languages, ShieldCheck, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/painting`;

const painting: BusinessTemplate = {
  slug: "painting",
  industry: "Painting",
  industryEs: "Pintura",
  websiteType: "Construction Website",
  defaultServicesField: "Residential interior & exterior, Commercial, Industrial coatings, Cabinet refinishing, Color consultation",
  brand: {
    name: "Carlos Painting",
    city: "Coronado",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hello@carlospainting.com",
    address: "Del parque central de San Isidro, 200 m norte y 50 m este, San Isidro, Vázquez de Coronado, San José",
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
        eyebrow: "Serving Coronado and nearby towns since 2010",
        title1: "Premium Painting for",
        title2: "Homes, Offices & Industrial Spaces",
        subtitle: "15 years of professional painting. Bilingual team. Free estimates. INS-insured crew.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["15+ Years", "Bilingual EN/ES", "Free Estimates", "INS-Insured Crew"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "200+ happy customers",
        trustTitle: "Insured Crew", trustSubtitle: "Covered by the INS",
      },
      services: {
        title: "What We Paint", blurb: "Three specialties. One trusted crew.",
        items: [
          { title: "Industrial",  blurb: "Warehouses, factories, plants. Heavy-duty coatings, safety markings, epoxy floors." },
          { title: "Commercial",  blurb: "Offices, shops, restaurants. After-hours scheduling so your business never stops." },
          { title: "Residential", blurb: "Interior, exterior, kitchen cabinets, trim. Careful prep, beautiful finish." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "15 years of experience",        blurb: "Hundreds of finished projects in Coronado and nearby towns." },
          { title: "Bilingual: English & Spanish",  blurb: "Clear communication that respects you." },
          { title: "Insured with the INS",          blurb: "Your home and business are fully protected." },
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
          { name: "María José G.", role: "Neighbor in Coronado",            quote: "They repainted our entire house in 3 days. Clean, on time, beautiful work." },
          { name: "Andrés R.",     role: "Restaurant owner in Moravia",     quote: "They worked overnight so we didn't lose a single day of business. True pros." },
          { name: "Karla V.",      role: "Apartment manager in Guadalupe",  quote: "We call them every time an apartment is vacated. Reliable, fast, fair price." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does painting cost?",     a: "Every job is different — that's why we give free written estimates. Most interior rooms range from ₡200 000–₡450 000." },
          { q: "How long will it take?",           a: "A single room: 1–2 days. Whole home interior: 3–5 days. Exterior: 4–7 days." },
          { q: "Are you insured?",                 a: "Yes — our crew is covered by an INS workers' risk policy, and we carry liability insurance." },
          { q: "What paint do you use?",           a: "Only quality brands sold in Costa Rica, such as Sherwin-Williams, Sur and Lanco. Low-VOC options available." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Residential interior", "Residential exterior", "Commercial", "Industrial", "Other"],
      },
      footer: { tagline: "Premium painting in Coronado and nearby towns.", hours: "Mon–Sat · 7:00 a.m.–7:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Sirviendo a Coronado y alrededores desde 2010",
        title1: "Pintura Premium para",
        title2: "Casas, Oficinas y Espacios Industriales",
        subtitle: "15 años de pintura profesional. Equipo bilingüe. Cotización gratis. Personal asegurado ante el INS.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["15+ Años", "Bilingüe EN/ES", "Cotización Gratis", "Personal Asegurado"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "200+ clientes felices",
        trustTitle: "Personal Asegurado", trustSubtitle: "Cobertura del INS",
      },
      services: {
        title: "Lo Que Pintamos", blurb: "Tres especialidades. Un equipo de confianza.",
        items: [
          { title: "Industrial",  blurb: "Bodegas, fábricas, plantas. Recubrimientos resistentes, demarcación de seguridad y pisos epóxicos." },
          { title: "Comercial",   blurb: "Oficinas, tiendas, restaurantes. Trabajamos fuera de horario para que su negocio no pare." },
          { title: "Residencial", blurb: "Interior, exterior, muebles de cocina, molduras. Preparación cuidadosa y acabados hermosos." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "15 años de experiencia",        blurb: "Cientos de proyectos terminados en Coronado y alrededores." },
          { title: "Bilingüe: inglés y español",    blurb: "Comunicación clara que lo respeta." },
          { title: "Asegurados ante el INS",        blurb: "Su casa y su negocio están totalmente protegidos." },
          { title: "Cotizaciones gratis y honestas", blurb: "Sin cobros ocultos. Cotización por escrito." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos",         blurb: "Cuéntenos sobre su proyecto — escuchamos primero." },
          { title: "Cotización gratis en sitio",    blurb: "Visita, consejo de color, cotización por escrito." },
          { title: "Pintamos y limpiamos",          blurb: "Preparación cuidadosa, pintura premium, limpieza diaria." },
          { title: "Revisión final",                blurb: "Usted da el visto bueno cuando todo esté perfecto." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "María José G.", role: "Vecina de Coronado",                         quote: "Pintaron toda la casa en 3 días. Limpios, puntuales, un trabajo hermoso." },
          { name: "Andrés R.",     role: "Dueño de restaurante en Moravia",            quote: "Trabajaron de noche y no perdimos ni un día de negocio. Verdaderos profesionales." },
          { name: "Karla V.",      role: "Administradora de apartamentos en Guadalupe", quote: "Los llamamos cada vez que se desocupa un apartamento. Confiables, rápidos, precio justo." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta pintar?",         a: "Cada trabajo es diferente — por eso damos cotizaciones gratis por escrito. Un cuarto interior suele costar entre ₡200 000 y ₡450 000." },
          { q: "¿Cuánto tiempo tarda?",          a: "Un cuarto: 1–2 días. Casa entera por dentro: 3–5 días. Exterior: 4–7 días." },
          { q: "¿Tienen seguro?",                a: "Sí — nuestro personal tiene póliza de riesgos del trabajo del INS y contamos con póliza de responsabilidad civil." },
          { q: "¿Qué pintura usan?",             a: "Solo marcas de calidad que se venden en Costa Rica, como Sherwin-Williams, Sur y Lanco. Opciones bajas en VOC." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio que necesita", message: "Cuéntenos sobre su proyecto",
        submit: "Enviar Solicitud", success: "Gracias — le llamamos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Interior residencial", "Exterior residencial", "Comercial", "Industrial", "Otro"],
      },
      footer: { tagline: "Pintura premium en Coronado y alrededores.", hours: "Lun a sáb · 7:00 a. m. – 7:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  facts: {
    stats: [
      { value: "18+", labelEn: "Years in business", labelEs: "Años de experiencia" },
      { value: "3400+", labelEn: "Homes painted", labelEs: "Casas pintadas" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación en Google" },
      { value: "100%", labelEn: "Bilingual crews", labelEs: "Cuadrillas bilingües" },
    ],
    areasEn: ["Coronado", "Patalillo", "Dulce Nombre", "Cascajal", "Moravia", "Guadalupe", "Ipís", "Tibás", "San Pedro", "Sabanilla", "Curridabat", "Santo Domingo"],
    areasEs: ["Coronado", "Patalillo", "Dulce Nombre", "Cascajal", "Moravia", "Guadalupe", "Ipís", "Tibás", "San Pedro", "Sabanilla", "Curridabat", "Santo Domingo"],
    certsEn: ["INS-Insured Crew", "INS Workers' Risk Policy", "Quality Name-Brand Paints", "Low-VOC Options", "Recommended by Neighbors", "Liability Insurance"],
    certsEs: ["Personal asegurado ante el INS", "Póliza de riesgos del trabajo", "Pinturas de marcas reconocidas", "Opciones bajas en VOC", "Recomendados por vecinos", "Póliza de responsabilidad civil"],
    guaranteeEn: { title: "5-year written workmanship guarantee", blurb: "If anything peels, cracks, or fades within 5 years, we come back and fix it — free. Written into every contract." },
    guaranteeEs: { title: "Garantía escrita de 5 años en mano de obra", blurb: "Si algo se descascara, se agrieta o se decolora en 5 años, regresamos y lo arreglamos — gratis. Por escrito en cada contrato." },
  },
  availability: { en: "Open 24/7 · Same-day estimates", es: "Abierto 24/7 · Cotizaciones el mismo día" },
  assistant: {
    name: "María",
    en: "Hi! I'm María, your assistant at {business}. We're available 24/7 — call or message us anytime for a free estimate.",
    es: "¡Hola! Soy María, su asistente en {business}. Estamos disponibles 24/7 — llámenos o escríbanos para una cotización gratis.",
    roleEn: "Live booking assistant",
    roleEs: "Asistente de reservas en vivo",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",      title: "24/7 service",         blurb: "Call or message any hour, any day. Real humans answer." },
      { icon: "Banknote",   title: "Free estimates",       blurb: "On-site quotes in 24 hours, no obligation." },
      { icon: "ShieldCheck",title: "Insured crew",         blurb: "INS workers' risk policy · liability coverage." },
      { icon: "Languages",  title: "Bilingual EN/ES",      blurb: "We speak English and Spanish. Same crew, two languages." },
      { icon: "BadgeCheck", title: "5-year workmanship",   blurb: "Written warranty on every interior & exterior job." },
      { icon: "Truck",      title: "Same-week start",      blurb: "Most jobs scheduled within 5 business days." },
    ],
    es: [
      { icon: "Clock",      title: "Servicio 24/7",         blurb: "Llame o escriba a cualquier hora. Le contesta una persona real." },
      { icon: "Banknote",   title: "Cotización gratis",     blurb: "Cotización en sitio en 24 horas, sin compromiso." },
      { icon: "ShieldCheck",title: "Personal asegurado",    blurb: "Póliza de riesgos del trabajo del INS · responsabilidad civil." },
      { icon: "Languages",  title: "Bilingüe EN/ES",        blurb: "Hablamos inglés y español. Misma cuadrilla, dos idiomas." },
      { icon: "BadgeCheck", title: "Garantía de 5 años",    blurb: "Garantía escrita en cada trabajo interior y exterior." },
      { icon: "Truck",      title: "Inicio en la misma semana", blurb: "La mayoría de trabajos se programan en 5 días hábiles." },
    ],
  },
  galleryCaptions: {
    en: ["Crew on-site, exterior repaint", "Living room finish, premium low-VOC", "Detail prep — tape, sand, prime"],
    es: ["Cuadrilla en sitio, repintado exterior", "Acabado en sala, bajo en VOC", "Preparación al detalle — cinta, lija, sellador"],
  },
};

export default painting;
