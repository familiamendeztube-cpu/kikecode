import { Home, Wrench, Hammer, Droplets, Clock, ShieldCheck, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/roofing`;

const roofing: BusinessTemplate = {
  slug: "roofing",
  industry: "Roofing",
  industryEs: "Techos",
  websiteType: "Construction Website",
  defaultServicesField: "Roof repair, Roof replacement, Inspections, Gutter install & repair, Storm damage, Skylights",
  brand: {
    name: "SummitLine Roofing",
    city: "Turrialba",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hello@summitlineroofing.com",
    address: "Del parque central, 200 m sur y 75 m este, Turrialba, Cartago",
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
        subtitle: "Repairs, replacements, inspections and gutters, built for Turrialba's rain. Bilingual crew. Free inspections. INS-insured staff.",
        cta1: "Free Roof Inspection", cta2: "Call Now",
        badges: ["15+ Years", "Bilingual EN/ES", "Free Inspections", "INS-Insured Staff"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ roofs protected",
        trustTitle: "Manufacturer Certified", trustSubtitle: "Warranty backed",
      },
      services: {
        title: "What We Do", blurb: "From a single leak to a full new roof.",
        items: [
          { title: "Roof Repair", blurb: "Leaks, loose sheets and tiles, flashing and storm damage fixed fast and done right." },
          { title: "Roof Replacement", blurb: "Full tear-offs and new roofs in metal sheet, clay tile or shingle with solid warranties." },
          { title: "Gutters & Inspections", blurb: "Seamless gutters and downspouts that handle heavy rain, plus thorough inspections with honest photo reports." },
        ],
      },
      why: {
        title: "Why Homeowners Trust Us",
        items: [
          { title: "On-time, every time", blurb: "We show up when we say and finish on schedule." },
          { title: "Insured with the INS", blurb: "Your property is fully protected during the job." },
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
          { name: "Luis Diego H.", role: "Neighbor in Turrialba", quote: "After a heavy storm they were out the next day, patched the leak and had the new roof on within a week." },
          { name: "María José L.", role: "Neighbor in La Suiza", quote: "Honest inspection — they fixed a small issue instead of selling me a whole roof I didn't need." },
          { name: "Fabián A.", role: "Property manager, Turrialba", quote: "We use them across several buildings. Reliable, clean, and the gutters look perfect." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a new roof cost?", a: "Every roof is different. Most metal sheet roof replacements run ₡4 000 000–₡9 000 000. We always give a free written estimate." },
          { q: "Can you help with storm or insurance claims?", a: "Yes. We document damage with photos and work directly with your insurance company." },
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
      footer: { tagline: "Quality roofing that protects what matters.", hours: "Mon–Sat · 7:00 a.m.–6:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Protegiendo hogares de la zona desde 2008",
        title1: "Techos Fuertes y Confiables para",
        title2: "Casas y Negocios",
        subtitle: "Reparaciones, cambios de techo, inspecciones y canoas, hechos para la lluvia de Turrialba. Equipo bilingüe. Inspecciones gratis. Personal asegurado ante el INS.",
        cta1: "Inspección Gratis", cta2: "Llame Ahora",
        badges: ["15+ Años", "Bilingüe EN/ES", "Inspecciones Gratis", "Asegurados ante el INS"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ techos protegidos",
        trustTitle: "Certificados de Fábrica", trustSubtitle: "Con garantía",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde una sola gotera hasta un techo completamente nuevo.",
        items: [
          { title: "Reparación de Techos", blurb: "Goteras, láminas y tejas sueltas, botaguas y daños por temporal arreglados rápido y bien." },
          { title: "Cambio de Techo", blurb: "Techos nuevos en lámina de zinc, teja de barro o teja asfáltica con garantías sólidas." },
          { title: "Canoas e Inspecciones", blurb: "Canoas continuas y bajantes para aguaceros fuertes, más inspecciones con reportes con fotos." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Puntuales, siempre", blurb: "Llegamos cuando decimos y terminamos a tiempo." },
          { title: "Asegurados ante el INS", blurb: "Su propiedad está totalmente protegida durante el trabajo." },
          { title: "Certificados de fábrica", blurb: "Instaladores certificados con opciones de garantía extendida." },
          { title: "Bilingüe: Inglés y Español", blurb: "Respuestas claras y respeto en su idioma." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Inspección gratis", blurb: "Subimos, tomamos fotos y le explicamos exactamente lo que encontramos." },
          { title: "Cotización por escrito", blurb: "Precios claros y opciones de material — sin presión." },
          { title: "Hacemos el trabajo", blurb: "Retiro cuidadoso, instalación de calidad y limpieza diaria." },
          { title: "Revisión final", blurb: "Revisamos el techo con usted y le entregamos la garantía." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Luis Diego H.", role: "Vecino de Turrialba", quote: "Después de un temporal vinieron al día siguiente, sellaron la gotera y pusieron el techo nuevo en una semana." },
          { name: "María José L.", role: "Vecina de La Suiza", quote: "Inspección honesta — arreglaron un detalle pequeño en vez de venderme un techo entero que no necesitaba." },
          { name: "Fabián A.", role: "Administrador de propiedades, Turrialba", quote: "Los usamos en varios edificios. Confiables, limpios, y las canoas quedan perfectas." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un techo nuevo?", a: "Cada techo es diferente. La mayoría de cambios de techo en lámina cuestan entre ₡4 000 000 y ₡9 000 000. Siempre damos una cotización gratis por escrito." },
          { q: "¿Ayudan con reclamos al seguro por temporales?", a: "Sí. Documentamos el daño con fotos y trabajamos directamente con su aseguradora." },
          { q: "¿Cuánto tarda un cambio de techo?", a: "La mayoría de casas se terminan en 1–3 días según el tamaño y el clima." },
          { q: "¿Los techos tienen garantía?", a: "Sí — garantía de mano de obra y la garantía de materiales del fabricante." },
        ],
      },
      contact: {
        title: "Reciba una Inspección Gratis", blurb: "Cuéntenos qué pasa. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema de su techo",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Reparación de techo", "Cambio de techo", "Inspección", "Canoas", "Otro"],
      },
      footer: { tagline: "Techos de calidad que protegen lo que importa.", hours: "Lun a sáb · 7:00 a. m. – 6:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 7:00 a.m.–6:00 p.m.", es: "Lun a sáb · 7:00 a. m. – 6:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Need a free roof inspection or a repair?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Necesita una inspección gratis o una reparación?",
    roleEn: "Roofing Advisor", roleEs: "Asesora de Techos",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`, `${assets}/gal5.jpg`, `${assets}/gal6.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "ShieldCheck", title: "Insured with the INS", blurb: "Your property is protected on every job." },
      { icon: "Clock", title: "Free inspections", blurb: "Honest photo reports, no pressure." },
      { icon: "BadgeCheck", title: "Manufacturer certified", blurb: "Certified installers with warranty options." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "Clear answers in your language." },
    ],
    es: [
      { icon: "ShieldCheck", title: "Asegurados ante el INS", blurb: "Su propiedad protegida en cada trabajo." },
      { icon: "Clock", title: "Inspecciones gratis", blurb: "Reportes con fotos, sin presión." },
      { icon: "BadgeCheck", title: "Certificados de fábrica", blurb: "Instaladores certificados con garantía." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Respuestas claras en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["New clay tile roof", "Roof replacement in progress", "Glazed tile roof", "Moss-covered tile before cleaning", "Worn tile ready for repair", "Old roof ready for replacement"],
    es: ["Techo nuevo de teja de barro", "Cambio de techo en proceso", "Techo de teja esmaltada", "Teja con musgo antes de limpiar", "Teja desgastada lista para reparar", "Techo viejo listo para cambiar"],
  },
};

export default roofing;
