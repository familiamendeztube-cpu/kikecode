import { Home, Wrench, Hammer, Droplets, Clock, ShieldCheck, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";

const roofing: BusinessTemplate = {
  slug: "roofing",
  industry: "Roofing",
  industryEs: "Techos",
  websiteType: "Construction Website",
  defaultServicesField: "Roof repair, Roof replacement, Inspections, Gutter install & repair, Storm damage, Skylights",
  brand: {
    name: "SummitLine Roofing",
    city: "Dallas",
    phone: "(555) 010-0010",
    phoneHref: "tel:+15550100010",
    email: "hello@summitlineroofing.com",
    address: "1200 Ridge Ave, Dallas, TX 75201",
    heroIcon: Home,
    palette: {
      primary: "#2563EB", primaryDark: "#1e3a8a", accent: "#F59E0B",
      heroFrom: "#0b1220", heroVia: "#16233f", heroTo: "#0b1220",
      heroGlow1: "rgba(37,99,235,0.55)", heroGlow2: "rgba(245,158,11,0.30)",
      heroIconFrom: "#2563EB", heroIconTo: "#1e3a8a",
      contactFrom: "#2563EB", contactTo: "#1e3a8a",
    },
  },
  serviceIcons: [Wrench, Hammer, Droplets],
  whyIcons: [Clock, ShieldCheck, Award, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Protecting local homes since 2008",
        title1: "Strong, Reliable Roofs for",
        title2: "Homes & Businesses",
        subtitle: "Repairs, replacements, inspections and gutters. Bilingual crew. Free inspections. Licensed & insured.",
        cta1: "Free Roof Inspection", cta2: "Call Now",
        badges: ["15+ Years", "Bilingual EN/ES", "Free Inspections", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ roofs protected",
        trustTitle: "Manufacturer Certified", trustSubtitle: "Warranty backed",
      },
      services: {
        title: "What We Do", blurb: "From a single leak to a full new roof.",
        items: [
          { title: "Roof Repair", blurb: "Leaks, missing shingles, flashing and storm damage fixed fast and done right." },
          { title: "Roof Replacement", blurb: "Full tear-offs and new roofs in shingle, metal or tile with solid warranties." },
          { title: "Gutters & Inspections", blurb: "Seamless gutters, guards, and thorough inspections with honest photo reports." },
        ],
      },
      why: {
        title: "Why Homeowners Trust Us",
        items: [
          { title: "On-time, every time", blurb: "We show up when we say and finish on schedule." },
          { title: "Licensed, bonded & insured", blurb: "Your property is fully protected during the job." },
          { title: "Manufacturer certified", blurb: "Certified installers with extended warranty options." },
          { title: "Bilingual: English & Spanish", blurb: "Clear answers and respect in your language." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Free inspection", blurb: "We climb up, take photos and explain exactly what we find." },
          { title: "Written estimate", blurb: "Clear pricing and material options — no pressure." },
          { title: "We do the work", blurb: "Careful tear-off, quality install, full daily cleanup." },
          { title: "Final walk-through", blurb: "We review the roof with you and hand over the warranty." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Robert H.", role: "Homeowner", quote: "After the storm they were out the next day, patched the leak and had the new roof on within a week." },
          { name: "Patricia L.", role: "Homeowner", quote: "Honest inspection — they fixed a small issue instead of selling me a whole roof I didn't need." },
          { name: "Miguel A.", role: "Property manager", quote: "We use them across several buildings. Reliable, clean, and the gutters look perfect." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a new roof cost?", a: "Every roof is different. Most asphalt shingle replacements run $8,000–$18,000. We always give a free written estimate." },
          { q: "Can you help with storm or insurance claims?", a: "Yes. We document damage with photos and work directly with your insurance adjuster." },
          { q: "How long does a roof replacement take?", a: "Most homes are completed in 1–3 days depending on size and weather." },
          { q: "Do your roofs come with a warranty?", a: "Yes — both a workmanship warranty and the manufacturer's material warranty." },
        ],
      },
      contact: {
        title: "Get a Free Roof Inspection", blurb: "Tell us what's going on. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe your roof issue",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Roof repair", "Roof replacement", "Inspection", "Gutters", "Other"],
      },
      footer: { tagline: "Quality roofing that protects what matters.", hours: "Mon–Sat · 7am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Protegiendo hogares locales desde 2008",
        title1: "Techos Fuertes y Confiables para",
        title2: "Casas y Negocios",
        subtitle: "Reparaciones, reemplazos, inspecciones y canaletas. Equipo bilingüe. Inspecciones gratis. Con licencia y seguro.",
        cta1: "Inspección Gratis", cta2: "Llame Ahora",
        badges: ["15+ Años", "Bilingüe EN/ES", "Inspecciones Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ techos protegidos",
        trustTitle: "Certificados de Fábrica", trustSubtitle: "Con garantía",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde una sola gotera hasta un techo completamente nuevo.",
        items: [
          { title: "Reparación de Techos", blurb: "Goteras, tejas faltantes, sellados y daños por tormenta arreglados rápido y bien." },
          { title: "Reemplazo de Techos", blurb: "Techos nuevos en teja, metal o asfalto con garantías sólidas." },
          { title: "Canaletas e Inspecciones", blurb: "Canaletas continuas, protectores e inspecciones con reportes con fotos." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Puntuales, siempre", blurb: "Llegamos cuando decimos y terminamos a tiempo." },
          { title: "Con licencia y seguro", blurb: "Su propiedad está totalmente protegida durante el trabajo." },
          { title: "Certificados de fábrica", blurb: "Instaladores certificados con opciones de garantía extendida." },
          { title: "Bilingüe: Inglés y Español", blurb: "Respuestas claras y respeto en su idioma." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Inspección gratis", blurb: "Subimos, tomamos fotos y le explicamos exactamente lo que encontramos." },
          { title: "Estimado por escrito", blurb: "Precios claros y opciones de material — sin presión." },
          { title: "Hacemos el trabajo", blurb: "Retiro cuidadoso, instalación de calidad y limpieza diaria." },
          { title: "Inspección final", blurb: "Revisamos el techo con usted y entregamos la garantía." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Robert H.", role: "Dueño de casa", quote: "Después de la tormenta vinieron al día siguiente, sellaron la gotera y pusieron el techo nuevo en una semana." },
          { name: "Patricia L.", role: "Dueña de casa", quote: "Inspección honesta — arreglaron un detalle pequeño en vez de venderme un techo entero que no necesitaba." },
          { name: "Miguel A.", role: "Administrador", quote: "Los usamos en varios edificios. Confiables, limpios, y las canaletas quedan perfectas." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un techo nuevo?", a: "Cada techo es diferente. La mayoría de reemplazos de teja asfáltica son $8,000–$18,000. Siempre damos un estimado gratis por escrito." },
          { q: "¿Ayudan con reclamos de seguro o tormenta?", a: "Sí. Documentamos el daño con fotos y trabajamos directamente con su ajustador de seguro." },
          { q: "¿Cuánto tarda un reemplazo de techo?", a: "La mayoría de casas se terminan en 1–3 días según el tamaño y el clima." },
          { q: "¿Los techos tienen garantía?", a: "Sí — garantía de mano de obra y la garantía de materiales del fabricante." },
        ],
      },
      contact: {
        title: "Reciba una Inspección Gratis", blurb: "Cuéntenos qué pasa. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema de su techo",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Reparación de techo", "Reemplazo de techo", "Inspección", "Canaletas", "Otro"],
      },
      footer: { tagline: "Techos de calidad que protegen lo que importa.", hours: "Lun–Sáb · 7am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default roofing;
