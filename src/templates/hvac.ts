import { Wind, Snowflake, Flame, Wrench, Clock, ShieldCheck, ThumbsUp, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/hvac`;

const hvac: BusinessTemplate = {
  slug: "hvac",
  industry: "Air Conditioning & Ventilation",
  industryEs: "Aire Acondicionado y Ventilación",
  websiteType: "Home Services Website",
  defaultServicesField: "AC repair, AC installation, Mini-split systems, Maintenance tune-ups, Ventilation & extraction, Thermostats",
  brand: {
    name: "PolarPeak HVAC",
    city: "Puntarenas",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hello@polarpeakhvac.com",
    address: "Del parque central, 100 m norte y 25 m este, Puntarenas centro, Puntarenas",
    heroIcon: Wind,
    palette: {
      primary: "#0EA5E9", primaryDark: "#0369a1", accent: "#EF4444",
      heroFrom: "#0a1622", heroVia: "#0f2436", heroTo: "#0a1622",
      heroGlow1: "rgba(14,165,233,0.55)", heroGlow2: "rgba(239,68,68,0.30)",
      heroIconFrom: "#0EA5E9", heroIconTo: "#0369a1",
      contactFrom: "#0EA5E9", contactTo: "#0369a1",
    },
  },
  serviceIcons: [Snowflake, Flame, Wrench],
  whyIcons: [Clock, ShieldCheck, ThumbsUp, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Keeping homes comfortable since 2009",
        title1: "Reliable Air Conditioning for",
        title2: "Homes & Businesses",
        subtitle: "AC repair, installs, ventilation and tune-ups for the Puntarenas heat. Bilingual techs. Free estimates on new systems. Staff insured with the INS.",
        cta1: "Schedule Service", cta2: "Call Now",
        badges: ["24/7 Service", "Bilingual EN/ES", "Free System Quotes", "INS-Insured Staff"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ comfortable homes",
        trustTitle: "Insured Staff", trustSubtitle: "Factory trained",
      },
      services: {
        title: "What We Do", blurb: "Cool in the dry season, dry in the rainy season — comfort all year.",
        items: [
          { title: "AC Repair & Install", blurb: "Fast diagnostics, honest fixes, and energy-efficient new systems sized right." },
          { title: "Ventilation & Extraction", blurb: "Exhaust fans and kitchen hoods that pull heat and humidity out of homes, restaurants and shops." },
          { title: "Maintenance Tune-Ups", blurb: "Regular tune-ups against salt air and dust that lower your power bill, prevent breakdowns and extend system life." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "Fast, 24/7 response", blurb: "We answer emergencies day or night, even on weekends." },
          { title: "Insured staff", blurb: "Factory-trained technicians, insured with the INS." },
          { title: "Up-front pricing", blurb: "You approve the price before any work begins." },
          { title: "Bilingual: English & Spanish", blurb: "Clear explanations in the language you prefer." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or book online", blurb: "Tell us what's wrong or what you need installed." },
          { title: "Diagnosis & quote", blurb: "We find the issue and give a clear flat price." },
          { title: "We fix or install", blurb: "Quality parts, clean work, and a system that runs right." },
          { title: "Comfort confirmed", blurb: "We test everything and make sure you're comfortable." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Karla B.", role: "Neighbor in El Roble", quote: "Our AC died in April — they came the same evening and had us cool again by night. Lifesavers." },
          { name: "Tomás R.", role: "Restaurant owner, Puntarenas", quote: "They replaced two rooftop units overnight so we never closed. Professional and fast." },
          { name: "Marianela M.", role: "Neighbor in Chacarita", quote: "Honest tune-up, no upsell. Our power bill actually dropped after their visit." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a service call cost?", a: "Our diagnostic fee is a flat ₡45 000 and is applied toward the repair if you move forward." },
          { q: "How much is a new AC system?", a: "Most full system installs run ₡2 750 000–₡6 000 000 depending on size and efficiency. New-system quotes are free." },
          { q: "How often should I service my system?", a: "Twice a year — once before the dry-season heat and again in the rainy season. Ask about our maintenance plan." },
          { q: "Do you offer emergency service?", a: "Yes. We offer 24/7 emergency service when your AC stops cooling." },
        ],
      },
      contact: {
        title: "Schedule Your Service", blurb: "Tell us what you need. We respond fast — same day when possible.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe the issue",
        submit: "Send Request", success: "Thank you — we'll call you shortly to schedule.",
        pick: "— Pick a service —",
        services: ["AC repair", "AC installation", "Ventilation & extraction", "Maintenance tune-up", "Other"],
      },
      footer: { tagline: "Year-round comfort you can count on.", hours: "Open 24/7 · Mon–Sun", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Manteniendo hogares cómodos desde 2009",
        title1: "Aire Acondicionado Confiable para",
        title2: "Casas y Negocios",
        subtitle: "Reparación, instalación, ventilación y mantenimiento de aire acondicionado para el calor de Puntarenas. Técnicos bilingües. Cotización gratis en equipos nuevos. Personal asegurado ante el INS.",
        cta1: "Agendar Servicio", cta2: "Llame Ahora",
        badges: ["Servicio 24/7", "Bilingüe EN/ES", "Cotización Gratis", "Personal Asegurado (INS)"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ hogares cómodos",
        trustTitle: "Personal Asegurado", trustSubtitle: "Entrenados de fábrica",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Fresco en el verano, seco en el invierno — comodidad todo el año.",
        items: [
          { title: "Reparación e Instalación de Aire", blurb: "Diagnóstico rápido, arreglos honestos y equipos nuevos eficientes del tamaño correcto." },
          { title: "Ventilación y Extracción", blurb: "Extractores y campanas de cocina que sacan el calor y la humedad de casas, restaurantes y locales." },
          { title: "Mantenimiento Preventivo", blurb: "Mantenimientos periódicos contra el salitre y el polvo que bajan el recibo de la luz, evitan fallas y alargan la vida del equipo." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Respuesta rápida 24/7", blurb: "Atendemos emergencias de día o de noche, incluso fines de semana." },
          { title: "Personal asegurado", blurb: "Técnicos entrenados de fábrica y asegurados ante el INS." },
          { title: "Precio por adelantado", blurb: "Usted aprueba el precio antes de comenzar el trabajo." },
          { title: "Bilingüe: Inglés y Español", blurb: "Explicaciones claras en el idioma que prefiera." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llame o agende en línea", blurb: "Cuéntenos qué falla o qué necesita instalar." },
          { title: "Diagnóstico y cotización", blurb: "Encontramos el problema y damos un precio fijo claro." },
          { title: "Reparamos o instalamos", blurb: "Piezas de calidad, trabajo limpio y un equipo que funciona bien." },
          { title: "Comodidad confirmada", blurb: "Probamos todo y nos aseguramos de que esté cómodo." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Karla B.", role: "Vecina de El Roble", quote: "Nuestro aire se dañó en abril — vinieron esa misma tarde y para la noche teníamos aire otra vez." },
          { name: "Tomás R.", role: "Dueño de restaurante, Puntarenas", quote: "Reemplazaron dos unidades de techo de noche para que no cerráramos. Profesionales y rápidos." },
          { name: "Marianela M.", role: "Vecina de Chacarita", quote: "Mantenimiento honesto, sin ventas de más. Hasta bajó nuestro recibo de la luz después de su visita." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una visita de servicio?", a: "Nuestro diagnóstico tiene un precio fijo de ₡45 000 y se rebaja de la reparación si decide continuar." },
          { q: "¿Cuánto cuesta un equipo nuevo?", a: "La mayoría de instalaciones completas cuestan entre ₡2 750 000 y ₡6 000 000 según el tamaño y la eficiencia. La cotización es gratis." },
          { q: "¿Cada cuánto debo dar mantenimiento?", a: "Dos veces al año — una antes del calor del verano y otra en el invierno. Pregunte por nuestro plan de mantenimiento." },
          { q: "¿Ofrecen servicio de emergencia?", a: "Sí. Ofrecemos servicio de emergencia 24/7 cuando su aire deja de enfriar." },
        ],
      },
      contact: {
        title: "Agende Su Servicio", blurb: "Cuéntenos qué necesita. Respondemos rápido — el mismo día cuando es posible.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos pronto para agendar.",
        pick: "— Elija un servicio —",
        services: ["Reparación de aire", "Instalación de aire", "Ventilación y extracción", "Mantenimiento", "Otro"],
      },
      footer: { tagline: "Comodidad todo el año en la que puede confiar.", hours: "Abierto 24/7 · Lun a dom", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "emergency",
  availability: { en: "Mon–Sun · 24/7", es: "Lun a dom · 24/7" },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Is your AC acting up?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Su aire acondicionado está fallando?",
    roleEn: "Comfort Advisor", roleEs: "Asesora de Climatización",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`, `${assets}/gal5.jpg`, `${assets}/gal6.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock", title: "24/7 emergency service", blurb: "We're here when the heat won't wait." },
      { icon: "Banknote", title: "Free estimates", blurb: "Upfront pricing on new systems." },
      { icon: "ShieldCheck", title: "Insured staff", blurb: "Trained, background-checked techs." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in English or Spanish." },
    ],
    es: [
      { icon: "Clock", title: "Emergencia 24/7", blurb: "Estamos cuando el calor no espera." },
      { icon: "Banknote", title: "Cotización gratis", blurb: "Precios claros en equipos nuevos." },
      { icon: "ShieldCheck", title: "Personal asegurado", blurb: "Técnicos capacitados y verificados." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en inglés o español." },
    ],
  },
  galleryCaptions: {
    en: ["New mini-split install", "Ventilation ductwork", "Mini-split maintenance", "Condenser units", "Coil cleaning", "Emergency repair"],
    es: ["Instalación de mini-split nuevo", "Ductos de ventilación", "Mantenimiento de mini-split", "Unidades condensadoras", "Limpieza de serpentín", "Reparación de emergencia"],
  },
};

export default hvac;
