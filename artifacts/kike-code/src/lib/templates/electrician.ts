import { Zap, Lightbulb, Plug, Car, Clock, ShieldCheck, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";

const electrician: BusinessTemplate = {
  slug: "electrician",
  industry: "Electrical",
  industryEs: "Electricista",
  websiteType: "Home Services Website",
  defaultServicesField: "Wiring & rewiring, Panel upgrades, Lighting install, EV charger install, Outlets & switches, Troubleshooting",
  brand: {
    name: "BrightVolt Electric",
    city: "Denver",
    phone: "(555) 010-0012",
    phoneHref: "tel:+15550100012",
    email: "hello@brightvoltelectric.com",
    address: "780 Current St, Denver, CO 80202",
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
        subtitle: "Wiring, panel upgrades, lighting and EV chargers. Bilingual electricians. Free estimates. Licensed & insured.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["Licensed Electricians", "Bilingual EN/ES", "Free Estimates", "Up-front Pricing"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "450+ safe installs",
        trustTitle: "Licensed & Insured", trustSubtitle: "Code compliant",
      },
      services: {
        title: "What We Do", blurb: "From a flickering light to a full panel upgrade.",
        items: [
          { title: "Wiring & Panels", blurb: "New wiring, rewires and panel upgrades that keep your home safe and up to code." },
          { title: "Lighting & Outlets", blurb: "Recessed lights, fixtures, fans, outlets and switches installed clean and right." },
          { title: "EV Charger Install", blurb: "Level 2 home charger installation so your electric vehicle is ready overnight." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "On-time, every time", blurb: "We arrive when promised and respect your home." },
          { title: "Licensed & insured", blurb: "Master electricians, fully bonded and code compliant." },
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
          { name: "Greg P.", role: "Homeowner", quote: "Upgraded our old panel and installed an EV charger in one day. Clean, safe, and fairly priced." },
          { name: "Lucía F.", role: "Homeowner", quote: "Found and fixed a wiring problem two other companies missed. Honest and professional." },
          { name: "David W.", role: "Shop owner", quote: "Rewired our entire storefront over a weekend so we never lost a business day. Excellent." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does an electrician cost?", a: "Most small jobs are $150–$450 flat. Larger projects get a free written estimate before any work." },
          { q: "How much is a panel upgrade?", a: "A typical 200-amp panel upgrade runs $1,800–$3,500 depending on your home and permits." },
          { q: "Can you install an EV charger?", a: "Yes. We install Level 2 chargers and handle the permit and any needed panel capacity." },
          { q: "Are you licensed and insured?", a: "Yes — fully licensed master electricians, bonded and insured, with all work permitted to code." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe the work",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Wiring / rewiring", "Panel upgrade", "Lighting & outlets", "EV charger", "Other"],
      },
      footer: { tagline: "Safe, reliable electrical for your home and business.", hours: "Mon–Sat · 7am–7pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Dando energía a hogares locales desde 2011",
        title1: "Trabajo Eléctrico Seguro y a Norma para",
        title2: "Casas y Negocios",
        subtitle: "Cableado, paneles, iluminación y cargadores para autos eléctricos. Electricistas bilingües. Estimados gratis. Con licencia y seguro.",
        cta1: "Estimado Gratis", cta2: "Llame Ahora",
        badges: ["Electricistas con Licencia", "Bilingüe EN/ES", "Estimados Gratis", "Precio Fijo"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "450+ instalaciones seguras",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Cumple con la norma",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde una luz parpadeante hasta un panel completamente nuevo.",
        items: [
          { title: "Cableado y Paneles", blurb: "Cableado nuevo, recableado y mejoras de panel que mantienen su casa segura y a norma." },
          { title: "Iluminación y Tomas", blurb: "Luces empotradas, lámparas, ventiladores, tomas e interruptores instalados bien y limpio." },
          { title: "Cargador para Auto Eléctrico", blurb: "Instalación de cargador nivel 2 en casa para que su auto esté listo de la noche a la mañana." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Puntuales, siempre", blurb: "Llegamos cuando prometemos y respetamos su casa." },
          { title: "Con licencia y seguro", blurb: "Maestros electricistas, asegurados y a norma." },
          { title: "Precio fijo por adelantado", blurb: "Usted aprueba el precio antes de tocar un cable." },
          { title: "Bilingüe: Inglés y Español", blurb: "Respuestas claras y honestas en su idioma." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos", blurb: "Cuéntenos qué pasa o qué quiere instalar." },
          { title: "Estimado gratis", blurb: "Inspeccionamos, explicamos opciones y damos un precio por escrito." },
          { title: "Hacemos el trabajo", blurb: "Instalación segura, a norma y con acabado limpio." },
          { title: "Probado y garantizado", blurb: "Probamos cada circuito y respaldamos el trabajo con garantía." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Greg P.", role: "Dueño de casa", quote: "Cambiaron nuestro panel viejo e instalaron un cargador de auto eléctrico en un día. Limpio, seguro y a buen precio." },
          { name: "Lucía F.", role: "Dueña de casa", quote: "Encontraron y arreglaron un problema de cableado que otras dos compañías no vieron. Honestos y profesionales." },
          { name: "David W.", role: "Dueño de tienda", quote: "Recablearon toda nuestra tienda en un fin de semana para no perder ni un día. Excelente." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cobra un electricista?", a: "La mayoría de trabajos pequeños son $150–$450 fijos. Proyectos grandes reciben un estimado gratis por escrito antes de empezar." },
          { q: "¿Cuánto cuesta cambiar el panel?", a: "Una mejora típica de panel de 200 amperios es $1,800–$3,500 según su casa y los permisos." },
          { q: "¿Pueden instalar un cargador de auto eléctrico?", a: "Sí. Instalamos cargadores nivel 2 y nos encargamos del permiso y la capacidad de panel necesaria." },
          { q: "¿Tienen licencia y seguro?", a: "Sí — maestros electricistas con licencia, asegurados y con todo el trabajo permitido a norma." },
        ],
      },
      contact: {
        title: "Pida un Estimado Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el trabajo",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Cableado / recableado", "Mejora de panel", "Iluminación y tomas", "Cargador de auto eléctrico", "Otro"],
      },
      footer: { tagline: "Electricidad segura y confiable para su casa y negocio.", hours: "Lun–Sáb · 7am–7pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default electrician;
