import { Zap, Lightbulb, Plug, Car, Clock, ShieldCheck, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/electrician`;

const electrician: BusinessTemplate = {
  slug: "electrician",
  industry: "Electrical",
  industryEs: "Electricista",
  websiteType: "Home Services Website",
  defaultServicesField: "Wiring & rewiring, Panel upgrades, Lighting install, EV charger install, Outlets & switches, Troubleshooting",
  brand: {
    name: "BrightVolt Electric",
    city: "Tres Ríos",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hello@brightvoltelectric.com",
    address: "Costado sur de la iglesia católica, 150 m este, Tres Ríos, La Unión, Cartago",
    heroIcon: Zap,
    palette: {
      primary: "#F59E0B", primaryDark: "#b45309", accent: "#1E293B",
      heroFrom: "#0c111b", heroVia: "#1b2233", heroTo: "#0c111b",
      heroGlow1: "rgba(245,158,11,0.55)", heroGlow2: "rgba(255,255,255,0.10)",
      heroIconFrom: "#F59E0B", heroIconTo: "#b45309",
      contactFrom: "#F59E0B", contactTo: "#b45309",
    },
  },
  serviceIcons: [Lightbulb, Plug, Car],
  whyIcons: [Clock, ShieldCheck, Award, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Powering local homes since 2011",
        title1: "Safe, Code-Compliant Electrical for",
        title2: "Homes & Businesses",
        subtitle: "Wiring, panel upgrades, lighting and EV chargers. Bilingual electricians. Free estimates. CFIA-registered professionals and INS-insured staff.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["CFIA-Registered Professionals", "Bilingual EN/ES", "Free Estimates", "Up-front Pricing"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "450+ safe installs",
        trustTitle: "CFIA Registered", trustSubtitle: "Code compliant",
      },
      services: {
        title: "What We Do", blurb: "From a flickering light to a full panel upgrade.",
        items: [
          { title: "Wiring & Panels", blurb: "New wiring, rewires and panel upgrades that keep your home safe and up to code." },
          { title: "Lighting & Outlets", blurb: "Recessed lights, fixtures, fans, outlets and switches installed clean and right." },
          { title: "EV Charger Install", blurb: "Level 2 wall charger installation so your electric car is ready overnight." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "On-time, every time", blurb: "We arrive when promised and respect your home." },
          { title: "CFIA-registered & insured", blurb: "Professionals registered with the CFIA, staff insured with the INS, work up to code." },
          { title: "Up-front flat pricing", blurb: "You approve the price before we touch a wire." },
          { title: "Bilingual: English & Spanish", blurb: "Clear, honest answers in your language." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us", blurb: "Tell us what's happening or what you want installed." },
          { title: "Free estimate", blurb: "We inspect, explain options and give a written price." },
          { title: "We do the work", blurb: "Safe, code-compliant installation with a clean finish." },
          { title: "Tested & guaranteed", blurb: "We test every circuit and back our work with a warranty." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Andrés P.", role: "Neighbor in Tres Ríos", quote: "Upgraded our old panel and installed an EV charger in one day. Clean, safe, and fairly priced." },
          { name: "Lucía F.", role: "Neighbor in Concepción", quote: "Found and fixed a wiring problem two other companies missed. Honest and professional." },
          { name: "Esteban V.", role: "Shop owner, San Diego", quote: "Rewired our entire storefront over a weekend so we never lost a business day. Excellent." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does an electrician cost?", a: "Most small jobs are ₡75 000–₡225 000 flat. Larger projects get a free written estimate before any work." },
          { q: "How much is a panel upgrade?", a: "A typical breaker panel upgrade runs ₡900 000–₡1 750 000 depending on your home and permits." },
          { q: "Can you install an EV charger?", a: "Yes. We install Level 2 chargers and handle the permit and any needed panel capacity." },
          { q: "Are you registered and insured?", a: "Yes — our professionals are registered with the CFIA, our staff is insured with the INS, and all work follows the electrical code." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe the work",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Wiring / rewiring", "Panel upgrade", "Lighting & outlets", "EV charger", "Other"],
      },
      footer: { tagline: "Safe, reliable electrical for your home and business.", hours: "Mon–Sat · 7:00 a.m.–7:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Llevando electricidad a hogares de la zona desde 2011",
        title1: "Trabajo Eléctrico Seguro y a Norma para",
        title2: "Casas y Negocios",
        subtitle: "Cableado, tableros, iluminación y cargadores para carros eléctricos. Electricistas bilingües. Cotización gratis. Profesionales incorporados al CFIA y personal asegurado ante el INS.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Profesionales Incorporados al CFIA", "Bilingüe EN/ES", "Cotización Gratis", "Precio Fijo"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "450+ instalaciones seguras",
        trustTitle: "Incorporados al CFIA", trustSubtitle: "Cumple con la norma",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde una luz que parpadea hasta un tablero completamente nuevo.",
        items: [
          { title: "Cableado y Tableros", blurb: "Cableado nuevo, recableado y cambio de tablero (centro de carga) para mantener su casa segura y a norma." },
          { title: "Iluminación y Tomacorrientes", blurb: "Luces empotradas, lámparas, abanicos, tomacorrientes y apagadores instalados bien y limpio." },
          { title: "Cargador para Carro Eléctrico", blurb: "Instalación de cargador de pared nivel 2 para que su carro esté listo de la noche a la mañana." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Puntuales, siempre", blurb: "Llegamos cuando prometemos y respetamos su casa." },
          { title: "Incorporados al CFIA y asegurados", blurb: "Profesionales incorporados al CFIA, personal asegurado ante el INS y trabajo a norma." },
          { title: "Precio fijo por adelantado", blurb: "Usted aprueba el precio antes de tocar un cable." },
          { title: "Bilingüe: Inglés y Español", blurb: "Respuestas claras y honestas en su idioma." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos", blurb: "Cuéntenos qué pasa o qué quiere instalar." },
          { title: "Cotización gratis", blurb: "Inspeccionamos, explicamos opciones y damos un precio por escrito." },
          { title: "Hacemos el trabajo", blurb: "Instalación segura, a norma y con acabado limpio." },
          { title: "Probado y garantizado", blurb: "Probamos cada circuito y respaldamos el trabajo con garantía." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Andrés P.", role: "Vecino de Tres Ríos", quote: "Cambiaron nuestro tablero viejo e instalaron un cargador de carro eléctrico en un día. Limpio, seguro y a buen precio." },
          { name: "Lucía F.", role: "Vecina de Concepción", quote: "Encontraron y arreglaron un problema de cableado que otras dos empresas no vieron. Honestos y profesionales." },
          { name: "Esteban V.", role: "Dueño de tienda, San Diego", quote: "Recablearon toda nuestra tienda en un fin de semana para no perder ni un día. Excelente." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cobra un electricista?", a: "La mayoría de trabajos pequeños cuestan entre ₡75 000 y ₡225 000, precio fijo. Los proyectos grandes reciben una cotización gratis por escrito antes de empezar." },
          { q: "¿Cuánto cuesta cambiar el tablero?", a: "Un cambio típico de tablero cuesta entre ₡900 000 y ₡1 750 000 según su casa y los permisos." },
          { q: "¿Pueden instalar un cargador de carro eléctrico?", a: "Sí. Instalamos cargadores nivel 2 y nos encargamos del permiso y de la capacidad del tablero necesaria." },
          { q: "¿Están incorporados y asegurados?", a: "Sí — nuestros profesionales están incorporados al CFIA, el personal está asegurado ante el INS y todo el trabajo cumple el código eléctrico." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el trabajo",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Cableado / recableado", "Cambio de tablero", "Iluminación y tomacorrientes", "Cargador de carro eléctrico", "Otro"],
      },
      footer: { tagline: "Electricidad segura y confiable para su casa y negocio.", hours: "Lun a sáb · 7:00 a. m. – 7:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 7:00 a.m.–7:00 p.m.", es: "Lun a sáb · 7:00 a. m. – 7:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. What electrical work can we help with?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Con qué trabajo eléctrico le ayudamos?",
    roleEn: "Electrical Advisor", roleEs: "Asesora Eléctrica",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`, `${assets}/gal5.jpg`, `${assets}/gal6.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "ShieldCheck", title: "Registered & insured", blurb: "Safe, code-compliant work every time." },
      { icon: "Clock", title: "Same-day service", blurb: "Fast response for urgent issues." },
      { icon: "BadgeCheck", title: "Up to code, guaranteed", blurb: "Permits and inspections handled." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "Clear answers in your language." },
    ],
    es: [
      { icon: "ShieldCheck", title: "Incorporados y asegurados", blurb: "Trabajo seguro y según el código." },
      { icon: "Clock", title: "Servicio el mismo día", blurb: "Respuesta rápida para urgencias." },
      { icon: "BadgeCheck", title: "Cumple el código", blurb: "Tramitamos permisos e inspecciones." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Respuestas claras en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["Panel upgrade", "Recessed lighting", "EV charger install", "Outlet & wiring repair", "Ceiling fan install", "Whole-home rewiring"],
    es: ["Cambio de tablero eléctrico", "Luces empotradas", "Cargador para carro eléctrico", "Reparación de tomacorrientes y cableado", "Instalación de abanico de techo", "Recableado completo"],
  },
};

export default electrician;
