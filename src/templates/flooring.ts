import { Layers, Square, Hammer, Sparkles, Clock, ShieldCheck, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/flooring`;

const flooring: BusinessTemplate = {
  slug: "flooring",
  industry: "Flooring & Tile",
  industryEs: "Pisos y Cerámica",
  websiteType: "Construction Website",
  defaultServicesField: "Tile install, Hardwood install, Laminate, Vinyl plank, Backsplash, Floor repair & refinishing",
  brand: {
    name: "TerraStone Flooring",
    city: "Rohrmoser",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@terrastoneflooring.com",
    address: "De la iglesia católica, 100 m norte y 75 m oeste, Rohrmoser, Pavas, San José",
    heroIcon: Layers,
    palette: {
      primary: "#0D9488", primaryDark: "#0f766e", accent: "#C2843B",
      heroFrom: "#0a1614", heroVia: "#10231f", heroTo: "#0a1614",
      heroGlow1: "rgba(13,148,136,0.55)", heroGlow2: "rgba(194,132,59,0.32)",
      heroIconFrom: "#0D9488", heroIconTo: "#0f766e",
      contactFrom: "#0D9488", contactTo: "#0f766e",
    },
  },
  serviceIcons: [Square, Hammer, Sparkles],
  whyIcons: [Clock, ShieldCheck, Award, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Beautiful floors for local homes since 2010",
        title1: "Expert Flooring & Tile for",
        title2: "Homes & Businesses",
        subtitle: "Tile, hardwood, laminate and vinyl installed to last. Bilingual crew. Free estimates. INS-insured staff.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["15+ Years", "Bilingual EN/ES", "Free Estimates", "INS-Insured Staff"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ floors installed",
        trustTitle: "Insured Staff", trustSubtitle: "Workmanship guaranteed",
      },
      services: {
        title: "What We Install", blurb: "The right floor, installed the right way.",
        items: [
          { title: "Tile & Stone", blurb: "Floors, showers and backsplashes in porcelain, ceramic and natural stone — clean, level lines." },
          { title: "Hardwood & Laminate", blurb: "Solid and engineered hardwood plus laminate, installed and finished beautifully." },
          { title: "Vinyl Plank & Repair", blurb: "Waterproof luxury vinyl plank, plus repairs, refinishing and subfloor leveling." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "On-time, every time", blurb: "We respect your schedule and finish when we say we will." },
          { title: "Insured with the INS", blurb: "Your home is fully protected from start to finish." },
          { title: "Precision craftsmanship", blurb: "Level subfloors, tight seams and clean grout lines, every job." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication and respect in your language." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Free in-home estimate", blurb: "We measure, talk materials and give a clear written quote." },
          { title: "Pick your floor", blurb: "We help you choose the right material for your home and budget." },
          { title: "We install", blurb: "Proper prep, careful install, full daily cleanup." },
          { title: "Final walk-through", blurb: "We review every room with you before we call it done." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Daniela R.", role: "Neighbor in Rohrmoser", quote: "They tiled our whole kitchen and bath — the grout lines are perfect and they cleaned up every day." },
          { name: "José M.", role: "Neighbor in Pavas", quote: "Replaced our old carpet with vinyl plank in two days. Looks amazing and the price was fair." },
          { name: "Marianela T.", role: "Property manager, Sabana Norte", quote: "Our go-to for unit turnovers. Fast, clean installs and floors that hold up to tenants." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does new flooring cost?", a: "It depends on material and square meters. Most rooms run ₡20 000–₡75 000 per m² installed. Estimates are always free." },
          { q: "How long does installation take?", a: "A single room is usually 1–2 days. A whole home is typically 3–6 days depending on the material." },
          { q: "Do you move furniture and remove old flooring?", a: "Yes. We can move furniture and haul away your old flooring — just ask when we estimate." },
          { q: "Is your work guaranteed?", a: "Yes. Every install comes with a workmanship guarantee on top of the manufacturer's material warranty." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Tile & stone", "Hardwood", "Laminate", "Vinyl plank", "Other"],
      },
      footer: { tagline: "Beautiful, lasting floors across the region.", hours: "Mon–Sat · 7:00 a.m.–6:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Pisos hermosos para hogares de la zona desde 2010",
        title1: "Pisos y Enchapes Expertos para",
        title2: "Casas y Negocios",
        subtitle: "Cerámica, porcelanato, madera, laminado y vinil instalados para durar. Equipo bilingüe. Cotización gratis. Personal asegurado ante el INS.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["15+ Años", "Bilingüe EN/ES", "Cotización Gratis", "Asegurados ante el INS"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ pisos instalados",
        trustTitle: "Personal Asegurado", trustSubtitle: "Trabajo garantizado",
      },
      services: {
        title: "Lo Que Instalamos", blurb: "El piso correcto, instalado de la manera correcta.",
        items: [
          { title: "Cerámica y Piedra", blurb: "Pisos, duchas y salpicaderos en porcelanato, cerámica y piedra natural — líneas limpias y niveladas." },
          { title: "Madera y Laminado", blurb: "Madera sólida y de ingeniería más laminado, instalados y acabados con belleza." },
          { title: "Vinil y Reparación", blurb: "Piso vinílico a prueba de agua, más reparaciones, restauración y nivelación de contrapiso." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Puntuales, siempre", blurb: "Respetamos su horario y terminamos cuando decimos." },
          { title: "Asegurados ante el INS", blurb: "Su casa está totalmente protegida de principio a fin." },
          { title: "Trabajo de precisión", blurb: "Contrapisos nivelados, juntas ajustadas y fragua limpia, siempre." },
          { title: "Bilingüe: Inglés y Español", blurb: "Comunicación clara y respeto en su idioma." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Cotización gratis en su casa", blurb: "Medimos, hablamos de materiales y damos una cotización por escrito." },
          { title: "Elija su piso", blurb: "Le ayudamos a escoger el material correcto para su casa y presupuesto." },
          { title: "Instalamos", blurb: "Preparación adecuada, instalación cuidadosa y limpieza diaria." },
          { title: "Revisión final", blurb: "Revisamos cada cuarto con usted antes de darlo por terminado." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Daniela R.", role: "Vecina de Rohrmoser", quote: "Enchaparon toda la cocina y el baño — la fragua quedó perfecta y limpiaron cada día." },
          { name: "José M.", role: "Vecino de Pavas", quote: "Cambiaron nuestra alfombra vieja por piso vinílico en dos días. Se ve increíble y el precio fue justo." },
          { name: "Marianela T.", role: "Administradora, Sabana Norte", quote: "Nuestros favoritos para cambios de inquilino. Instalaciones rápidas, limpias y pisos que aguantan." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un piso nuevo?", a: "Depende del material y los metros cuadrados. La mayoría de cuartos cuestan entre ₡20 000 y ₡75 000 por m² instalado. Las cotizaciones siempre son gratis." },
          { q: "¿Cuánto tarda la instalación?", a: "Un solo cuarto suele tomar 1–2 días. Una casa entera, normalmente 3–6 días según el material." },
          { q: "¿Mueven los muebles y quitan el piso viejo?", a: "Sí. Podemos mover muebles y llevarnos su piso viejo — solo avísenos cuando hagamos la cotización." },
          { q: "¿Su trabajo tiene garantía?", a: "Sí. Cada instalación incluye garantía de mano de obra además de la garantía de materiales del fabricante." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su proyecto",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Cerámica y piedra", "Madera", "Laminado", "Piso vinílico", "Otro"],
      },
      footer: { tagline: "Pisos hermosos y duraderos en toda la región.", hours: "Lun a sáb · 7:00 a. m. – 6:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 8:00 a.m.–6:00 p.m.", es: "Lun a sáb · 8:00 a. m. – 6:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Looking for new floors? Tell me about the room.",
    es: "¡Hola! Gracias por contactar a {business}. ¿Busca pisos nuevos? Cuénteme del cuarto.",
    roleEn: "Flooring Advisor", roleEs: "Asesora de Pisos",
  },
  media: {
    hero: `${assets}/team.jpg`,
    gallery: [`${assets}/gal4.jpg`, `${assets}/gal6.jpg`, `${assets}/gal3.jpg`, `${assets}/gal1.jpg`, `${assets}/gal5.jpg`],
    teamPortrait: "",
  },
  offers: {
    en: [
      { icon: "Banknote", title: "Free in-home estimates", blurb: "We measure and quote at no cost." },
      { icon: "BadgeCheck", title: "Expert installation", blurb: "Clean, level, long-lasting results." },
      { icon: "Sparkles", title: "Wide material selection", blurb: "Wood, tile, vinyl and laminate." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
    ],
    es: [
      { icon: "Banknote", title: "Cotización gratis a domicilio", blurb: "Medimos y cotizamos sin costo." },
      { icon: "BadgeCheck", title: "Instalación experta", blurb: "Resultados limpios, nivelados y duraderos." },
      { icon: "Sparkles", title: "Gran variedad de materiales", blurb: "Madera, cerámica, vinil y laminado." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["Renovated kitchen", "Light wood floor, dining room", "Living room floor", "Rustic wood up close", "Finished living room"],
    es: ["Cocina renovada", "Piso de madera clara en el comedor", "Piso de sala", "Madera rústica de cerca", "Sala terminada"],
  },
};

export default flooring;
