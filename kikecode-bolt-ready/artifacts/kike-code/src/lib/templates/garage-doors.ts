import { Home, Wrench, Zap, Clock, ShieldCheck, ThumbsUp, Languages, Building2 } from "lucide-react";
import type { BusinessTemplate } from "./types";

const garageDoors: BusinessTemplate = {
  slug: "garage-doors",
  industry: "Garage Doors",
  industryEs: "Puertas de Garaje",
  websiteType: "Construction Website",
  defaultServicesField: "New door installation, Spring repair, Opener install & repair, Emergency service, Tune-ups",
  brand: {
    name: "OverHead Garage Doors",
    city: "Denver",
    phone: "(555) 010-0011",
    phoneHref: "tel:+15550100011",
    email: "hello@overheadgaragedoors.com",
    address: "450 Mountain View Dr, Denver, CO 80202",
    heroIcon: Home,
    palette: {
      primary: "#2563EB", primaryDark: "#1E3A8A", accent: "#F59E0B",
      heroFrom: "#0b1220", heroVia: "#111c33", heroTo: "#0b1220",
      heroGlow1: "rgba(37,99,235,0.55)", heroGlow2: "rgba(245,158,11,0.35)",
      heroIconFrom: "#3B82F6", heroIconTo: "#F59E0B",
      contactFrom: "#2563EB", contactTo: "#F59E0B",
    },
  },
  serviceIcons: [Home, Wrench, Zap],
  whyIcons: [Clock, ShieldCheck, ThumbsUp, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Same-day repairs & emergency service",
        title1: "Garage Door Experts for",
        title2: "Install, Repair & Emergencies",
        subtitle: "New doors, spring repair, openers and 24/7 emergency service. Bilingual team. Up-front pricing. Done right.",
        cta1: "Get Free Quote", cta2: "Call Now",
        badges: ["Same-Day Service", "Bilingual EN/ES", "Up-front Pricing", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ doors serviced",
        trustTitle: "Insured Technicians", trustSubtitle: "Background-checked",
      },
      services: {
        title: "What We Do", blurb: "From a broken spring to a brand-new door.",
        items: [
          { title: "New Door Installation", blurb: "Steel, insulated and custom doors installed clean, level and quiet." },
          { title: "Spring & Cable Repair", blurb: "Broken springs, frayed cables and off-track doors fixed safely the same day." },
          { title: "Openers & Tune-Ups",    blurb: "Opener install, smart Wi-Fi units, rollers, sensors and full safety tune-ups." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "Same-day & emergency service", blurb: "Broken spring or stuck door? We come fast, day or night." },
          { title: "Licensed & insured",           blurb: "Trained, background-checked technicians you can trust." },
          { title: "Up-front, honest pricing",     blurb: "You see the full price before any work begins." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication every step of the way." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",   blurb: "Tell us the problem — send a photo or video if you can." },
          { title: "Up-front quote",       blurb: "We diagnose and give the full price before we start." },
          { title: "We fix or install",    blurb: "Quality parts, safe repair, quiet smooth operation." },
          { title: "Safety check & cleanup", blurb: "We test the door, balance it and leave the area clean." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Tom B.",     role: "Homeowner",      quote: "Spring snapped at 8pm. They came that night and had it working in an hour. Lifesavers." },
          { name: "Lucia F.",   role: "Homeowner",      quote: "New insulated door is beautiful and so quiet. Friendly crew, explained everything in Spanish." },
          { name: "Marcus J.",  role: "Property manager", quote: "Our go-to for every rental. Fast, fair, and the openers they install never give us trouble." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a repair cost?",     a: "Most spring and roller repairs run $150–$350. We give the full price up front — no surprises." },
          { q: "Can you come out today?",          a: "Yes — we offer same-day service most days and 24/7 emergency service for broken springs and stuck doors." },
          { q: "How long does a new door take?",   a: "A standard new door install takes 3–5 hours. We haul away your old door at no extra charge." },
          { q: "Are you licensed and insured?",    a: "Yes — fully licensed, insured, and our technicians are background-checked and trained." },
        ],
      },
      contact: {
        title: "Get a Fast Free Quote", blurb: "Tell us what's going on. We respond within the hour during business hours.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe the problem",
        submit: "Send Request", success: "Thanks — we'll call you right back with a quote.",
        pick: "— Pick a service —",
        services: ["New door installation", "Spring / cable repair", "Opener install / repair", "Emergency service", "Other"],
      },
      footer: { tagline: "Garage door experts for the whole region.", hours: "Mon–Sun · 24/7 Emergency", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Reparaciones el mismo día y servicio de emergencia",
        title1: "Expertos en Puertas de Garaje para",
        title2: "Instalación, Reparación y Emergencias",
        subtitle: "Puertas nuevas, reparación de resortes, motores y servicio de emergencia 24/7. Equipo bilingüe. Precio claro. Bien hecho.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Servicio el Mismo Día", "Bilingüe EN/ES", "Precio Claro", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ puertas atendidas",
        trustTitle: "Técnicos Asegurados", trustSubtitle: "Verificados",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde un resorte roto hasta una puerta nueva.",
        items: [
          { title: "Instalación de Puertas Nuevas", blurb: "Puertas de acero, aisladas y personalizadas instaladas limpias, a nivel y silenciosas." },
          { title: "Reparación de Resortes y Cables", blurb: "Resortes rotos, cables desgastados y puertas descarriladas reparadas con seguridad el mismo día." },
          { title: "Motores y Mantenimiento",      blurb: "Instalación de motor, unidades Wi-Fi, rodillos, sensores y mantenimiento de seguridad completo." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "Servicio el mismo día y emergencias", blurb: "¿Resorte roto o puerta atorada? Llegamos rápido, de día o de noche." },
          { title: "Con licencia y seguro",               blurb: "Técnicos capacitados y verificados en quienes puede confiar." },
          { title: "Precio claro y honesto",              blurb: "Usted ve el precio total antes de empezar cualquier trabajo." },
          { title: "Bilingüe: Inglés y Español",          blurb: "Comunicación clara en cada paso." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o mándenos mensaje", blurb: "Cuéntenos el problema — mande una foto o video si puede." },
          { title: "Cotización clara",            blurb: "Diagnosticamos y damos el precio total antes de empezar." },
          { title: "Reparamos o instalamos",      blurb: "Piezas de calidad, reparación segura, operación suave y silenciosa." },
          { title: "Revisión de seguridad y limpieza", blurb: "Probamos la puerta, la balanceamos y dejamos el área limpia." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Tom B.",     role: "Dueño de casa",       quote: "El resorte se rompió a las 8pm. Vinieron esa noche y la dejaron funcionando en una hora. Salvadores." },
          { name: "Lucía F.",   role: "Dueña de casa",       quote: "La nueva puerta aislada es hermosa y muy silenciosa. Equipo amable, me explicaron todo en español." },
          { name: "Marcus J.",  role: "Administrador",       quote: "Nuestros favoritos para cada renta. Rápidos, justos y los motores que instalan nunca fallan." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una reparación?",       a: "La mayoría de reparaciones de resortes y rodillos van de $150–$350. Damos el precio total por adelantado — sin sorpresas." },
          { q: "¿Pueden venir hoy?",                   a: "Sí — ofrecemos servicio el mismo día casi todos los días y servicio de emergencia 24/7 para resortes rotos y puertas atoradas." },
          { q: "¿Cuánto tarda una puerta nueva?",      a: "Una instalación de puerta nueva estándar toma de 3–5 horas. Retiramos su puerta vieja sin costo extra." },
          { q: "¿Tienen licencia y seguro?",           a: "Sí — licencia completa, seguro y nuestros técnicos están verificados y capacitados." },
        ],
      },
      contact: {
        title: "Reciba una Cotización Gratis", blurb: "Cuéntenos qué pasa. Respondemos dentro de una hora en horario de oficina.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos enseguida con una cotización.",
        pick: "— Elija un servicio —",
        services: ["Instalación de puerta nueva", "Reparación de resorte / cable", "Instalación / reparación de motor", "Servicio de emergencia", "Otro"],
      },
      footer: { tagline: "Expertos en puertas de garaje para toda la región.", hours: "Lun–Dom · Emergencia 24/7", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default garageDoors;
