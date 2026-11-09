import { Home, Wrench, Zap, Clock, ShieldCheck, ThumbsUp, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/garage-doors`;

const garageDoors: BusinessTemplate = {
  slug: "garage-doors",
  industry: "Garage Doors",
  industryEs: "Puertas de Garaje",
  websiteType: "Construction Website",
  defaultServicesField: "New door installation, Spring repair, Opener install & repair, Emergency service, Tune-ups",
  brand: {
    name: "OverHead Garage Doors",
    city: "Curridabat",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@overheadgaragedoors.com",
    address: "De la plaza de deportes de Curridabat, 150 m norte y 25 m este, Curridabat, San José",
    heroIcon: Home,
    palette: {
      primary: "#2563EB", primaryDark: "#1E3A8A", accent: "#F59E0B",
      heroFrom: "#0b1220", heroVia: "#111c33", heroTo: "#0b1220",
      heroGlow1: "rgba(37,99,235,0.55)", heroGlow2: "rgba(245,158,11,0.35)",
      heroIconFrom: "#3B82F6", heroIconTo: "#F59E0B",
      contactFrom: "#2563EB", contactTo: "#1E3A8A",
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
        badges: ["Same-Day Service", "Bilingual EN/ES", "Up-front Pricing", "Insured with the INS"],
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
          { title: "Insured with the INS",         blurb: "Trained, background-checked technicians you can trust." },
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
          { name: "Esteban B.",  role: "Neighbor in Curridabat",          quote: "Spring snapped at 8 p.m. They came that night and had it working in an hour. Lifesavers." },
          { name: "Lucía F.",    role: "Neighbor in San Pedro",           quote: "New insulated door is beautiful and so quiet. Friendly crew that explained everything clearly." },
          { name: "Mauricio J.", role: "Condominium manager, Tres Ríos",  quote: "Our go-to for every house in the condominium. Fast, fair, and the openers they install never give us trouble." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a repair cost?",     a: "Most spring and roller repairs run between ₡75 000 and ₡175 000. We give the full price up front — no surprises." },
          { q: "Can you come out today?",          a: "Yes — we offer same-day service most days and 24/7 emergency service for broken springs and stuck doors." },
          { q: "How long does a new door take?",   a: "A standard new door install takes 3–5 hours. We haul away your old door at no extra charge." },
          { q: "Is your staff insured?",           a: "Yes — our staff is insured with the INS, and our technicians are background-checked and trained." },
        ],
      },
      contact: {
        title: "Get a Fast Free Quote", blurb: "Tell us what's going on. We respond within the hour during business hours.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe the problem",
        submit: "Send Request", success: "Thanks — we'll call you right back with a quote.",
        pick: "— Pick a service —",
        services: ["New door installation", "Spring / cable repair", "Opener install / repair", "Emergency service", "Other"],
      },
      footer: { tagline: "Garage door experts across eastern San José.", hours: "Mon–Sun · 24/7 emergencies", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Reparaciones el mismo día y servicio de emergencia",
        title1: "Expertos en Puertas de Cochera para",
        title2: "Instalación, Reparación y Emergencias",
        subtitle: "Puertas nuevas, reparación de resortes, motores y servicio de emergencia 24/7. Equipo bilingüe. Precio claro. Bien hecho.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Servicio el Mismo Día", "Bilingüe EN/ES", "Precio Claro", "Asegurados ante el INS"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ puertas atendidas",
        trustTitle: "Técnicos Asegurados", trustSubtitle: "Verificados",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde un resorte quebrado hasta una puerta nueva.",
        items: [
          { title: "Instalación de Puertas Nuevas", blurb: "Puertas de acero, aisladas y a la medida, instaladas limpias, a nivel y silenciosas." },
          { title: "Reparación de Resortes y Cables", blurb: "Resortes quebrados, cables desgastados y puertas descarriladas, reparados con seguridad el mismo día." },
          { title: "Motores y Mantenimiento",      blurb: "Instalación de motores, unidades con Wi-Fi, rodillos, sensores y mantenimiento de seguridad completo." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "Servicio el mismo día y emergencias", blurb: "¿Resorte quebrado o puerta trabada? Llegamos rápido, de día o de noche." },
          { title: "Asegurados ante el INS",              blurb: "Técnicos capacitados y verificados en quienes puede confiar." },
          { title: "Precio claro y honesto",              blurb: "Usted ve el precio total antes de empezar cualquier trabajo." },
          { title: "Bilingüe: Inglés y Español",          blurb: "Comunicación clara en cada paso." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos",       blurb: "Cuéntenos el problema — envíe una foto o un video si puede." },
          { title: "Cotización clara",            blurb: "Diagnosticamos y le damos el precio total antes de empezar." },
          { title: "Reparamos o instalamos",      blurb: "Repuestos de calidad, reparación segura, funcionamiento suave y silencioso." },
          { title: "Revisión de seguridad y limpieza", blurb: "Probamos la puerta, la balanceamos y dejamos el área limpia." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Esteban B.",  role: "Vecino de Curridabat",                   quote: "El resorte se quebró a las 8 p. m. Vinieron esa misma noche y en una hora la dejaron funcionando. Nos salvaron." },
          { name: "Lucía F.",    role: "Vecina de San Pedro",                    quote: "La nueva puerta aislada es preciosa y muy silenciosa. Un equipo amable que me explicó todo con claridad." },
          { name: "Mauricio J.", role: "Administrador de condominio, Tres Ríos", quote: "Son nuestros técnicos de confianza para todas las casas del condominio. Rápidos, justos y los motores que instalan nunca fallan." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una reparación?",       a: "La mayoría de reparaciones de resortes y rodillos van de ₡75 000 a ₡175 000. Le damos el precio total por adelantado — sin sorpresas." },
          { q: "¿Pueden venir hoy?",                   a: "Sí — ofrecemos servicio el mismo día casi todos los días y servicio de emergencia 24/7 para resortes quebrados y puertas trabadas." },
          { q: "¿Cuánto tarda una puerta nueva?",      a: "La instalación de una puerta nueva estándar toma de 3 a 5 horas. Nos llevamos su puerta vieja sin costo extra." },
          { q: "¿Su personal está asegurado?",         a: "Sí — nuestro personal está asegurado ante el INS y nuestros técnicos están verificados y capacitados." },
        ],
      },
      contact: {
        title: "Reciba una Cotización Gratis", blurb: "Cuéntenos qué pasa. Respondemos dentro de una hora en horario de oficina.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos enseguida con una cotización.",
        pick: "— Elija un servicio —",
        services: ["Instalación de puerta nueva", "Reparación de resorte / cable", "Instalación / reparación de motor", "Servicio de emergencia", "Otro"],
      },
      footer: { tagline: "Expertos en puertas de cochera en todo el este de San José.", hours: "Lun a dom · Emergencias 24/7", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "emergency",
  availability: { en: "Mon–Sat · 7:00 a.m.–7:00 p.m.", es: "Lun a sáb · 7:00 a. m. – 7:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Broken spring or a new door?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Resorte quebrado o puerta nueva?",
    roleEn: "Garage Door Advisor", roleEs: "Asesora de Puertas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal2.jpg`, `${assets}/gal5.jpg`, `${assets}/gal1.jpg`, `${assets}/gal3.jpg`, `${assets}/gal6.jpg`],
    teamPortrait: "",
  },
  offers: {
    en: [
      { icon: "Clock", title: "Same-day repairs", blurb: "Fast fixes for springs and openers." },
      { icon: "ShieldCheck", title: "Insured with the INS", blurb: "Safe, professional installs." },
      { icon: "Banknote", title: "Free estimates", blurb: "Honest quotes on new doors." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
    ],
    es: [
      { icon: "Clock", title: "Reparaciones el mismo día", blurb: "Arreglos rápidos de resortes y motores." },
      { icon: "ShieldCheck", title: "Asegurados ante el INS", blurb: "Instalaciones seguras y profesionales." },
      { icon: "Banknote", title: "Cotizaciones gratis", blurb: "Cotizaciones honestas en puertas nuevas." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["Garage doors installed", "Roll-up door", "Sectional door panels", "Classic carriage door", "Install detail"],
    es: ["Puertas de cochera instaladas", "Puerta enrollable", "Paneles de puerta seccional", "Portón clásico de madera", "Detalle de instalación"],
  },
};

export default garageDoors;
