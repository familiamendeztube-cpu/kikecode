import { Layers, Square, Hammer, Sparkles, Clock, ShieldCheck, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";

const flooring: BusinessTemplate = {
  slug: "flooring",
  industry: "Flooring & Tile",
  industryEs: "Pisos y Azulejos",
  websiteType: "Construction Website",
  defaultServicesField: "Tile install, Hardwood install, Laminate, Vinyl plank, Backsplash, Floor repair & refinishing",
  brand: {
    name: "TerraStone Flooring",
    city: "San Antonio",
    phone: "(555) 010-0013",
    phoneHref: "tel:+15550100013",
    email: "hello@terrastoneflooring.com",
    address: "330 Quarry Rd, San Antonio, TX 78209",
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
        subtitle: "Tile, hardwood, laminate and vinyl installed to last. Bilingual crew. Free estimates. Licensed & insured.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["15+ Years", "Bilingual EN/ES", "Free Estimates", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ floors installed",
        trustTitle: "Licensed & Insured", trustSubtitle: "Workmanship guaranteed",
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
          { title: "Licensed & insured", blurb: "Your home is fully protected from start to finish." },
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
          { name: "Emily R.", role: "Homeowner", quote: "They tiled our whole kitchen and bath — the grout lines are perfect and they cleaned up every day." },
          { name: "José M.", role: "Homeowner", quote: "Replaced our old carpet with vinyl plank in two days. Looks amazing and the price was fair." },
          { name: "Nancy T.", role: "Property manager", quote: "Our go-to for unit turnovers. Fast, clean installs and floors that hold up to tenants." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does new flooring cost?", a: "It depends on material and square footage. Most rooms run $4–$14 per sq ft installed. Estimates are always free." },
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
      footer: { tagline: "Beautiful, lasting floors across the region.", hours: "Mon–Sat · 7am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Pisos hermosos para hogares locales desde 2010",
        title1: "Pisos y Azulejos Expertos para",
        title2: "Casas y Negocios",
        subtitle: "Azulejo, madera, laminado y vinil instalados para durar. Equipo bilingüe. Estimados gratis. Con licencia y seguro.",
        cta1: "Estimado Gratis", cta2: "Llame Ahora",
        badges: ["15+ Años", "Bilingüe EN/ES", "Estimados Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ pisos instalados",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Trabajo garantizado",
      },
      services: {
        title: "Lo Que Instalamos", blurb: "El piso correcto, instalado de la manera correcta.",
        items: [
          { title: "Azulejo y Piedra", blurb: "Pisos, duchas y salpicaderos en porcelana, cerámica y piedra natural — líneas limpias y niveladas." },
          { title: "Madera y Laminado", blurb: "Madera sólida y de ingeniería más laminado, instalados y acabados con belleza." },
          { title: "Vinil y Reparación", blurb: "Vinil de lujo a prueba de agua, más reparaciones, restauración y nivelación de subpiso." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Puntuales, siempre", blurb: "Respetamos su horario y terminamos cuando decimos." },
          { title: "Con licencia y seguro", blurb: "Su casa está totalmente protegida de principio a fin." },
          { title: "Trabajo de precisión", blurb: "Subpisos nivelados, juntas ajustadas y líneas de lechada limpias, siempre." },
          { title: "Bilingüe: Inglés y Español", blurb: "Comunicación clara y respeto en su idioma." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Estimado gratis en casa", blurb: "Medimos, hablamos de materiales y damos una cotización por escrito." },
          { title: "Elija su piso", blurb: "Le ayudamos a escoger el material correcto para su casa y presupuesto." },
          { title: "Instalamos", blurb: "Preparación adecuada, instalación cuidadosa y limpieza diaria." },
          { title: "Inspección final", blurb: "Revisamos cada cuarto con usted antes de darlo por terminado." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Emily R.", role: "Dueña de casa", quote: "Pusieron azulejo en toda la cocina y el baño — las líneas de lechada quedaron perfectas y limpiaron cada día." },
          { name: "José M.", role: "Dueño de casa", quote: "Cambiaron nuestra alfombra vieja por vinil en dos días. Se ve increíble y el precio fue justo." },
          { name: "Nancy T.", role: "Administradora", quote: "Nuestros favoritos para cambios de inquilino. Instalaciones rápidas, limpias y pisos que aguantan." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un piso nuevo?", a: "Depende del material y los pies cuadrados. La mayoría de cuartos son $4–$14 por pie cuadrado instalado. Los estimados siempre son gratis." },
          { q: "¿Cuánto tarda la instalación?", a: "Un solo cuarto suele ser 1–2 días. Una casa entera normalmente 3–6 días según el material." },
          { q: "¿Mueven los muebles y quitan el piso viejo?", a: "Sí. Podemos mover muebles y llevarnos su piso viejo — solo avísenos al hacer el estimado." },
          { q: "¿Su trabajo tiene garantía?", a: "Sí. Cada instalación incluye garantía de mano de obra además de la garantía de materiales del fabricante." },
        ],
      },
      contact: {
        title: "Pida un Estimado Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su proyecto",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Azulejo y piedra", "Madera", "Laminado", "Vinil", "Otro"],
      },
      footer: { tagline: "Pisos hermosos y duraderos en toda la región.", hours: "Lun–Sáb · 7am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default flooring;
