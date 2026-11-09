import { TreePine, Scissors, Truck, Leaf, Clock, Languages, ShieldCheck, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/tree-service`;

const treeService: BusinessTemplate = {
  slug: "tree-service",
  industry: "Tree Service",
  industryEs: "Servicio de Árboles",
  websiteType: "Home Services Website",
  defaultServicesField: "Tree trimming, Tree removal, Stump grinding, Emergency storm work, Lot clearing",
  brand: {
    name: "Timberline Tree Care",
    city: "San Ramón",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hello@timberlinetreecare.com",
    address: "De la iglesia católica de San Ramón, 300 m oeste y 100 m norte, San Ramón, Alajuela",
    heroIcon: TreePine,
    palette: {
      primary: "#15803D", primaryDark: "#14532d", accent: "#A16207",
      heroFrom: "#0c1f14", heroVia: "#13321f", heroTo: "#0c1f14",
      heroGlow1: "rgba(21,128,61,0.55)", heroGlow2: "rgba(161,98,7,0.30)",
      heroIconFrom: "#15803D", heroIconTo: "#A16207",
      contactFrom: "#15803D", contactTo: "#A16207",
    },
  },
  serviceIcons: [Scissors, Truck, Leaf],
  whyIcons: [Clock, Languages, ShieldCheck, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "24/7 emergency storm response",
        title1: "Expert Tree Care for",
        title2: "Safer, Healthier Properties",
        subtitle: "Trimming, removal, stump grinding, and emergency work. Bilingual team. Free estimates. INS-insured crew.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["24/7 Emergency", "Bilingual EN/ES", "Free Estimates", "INS-Insured Crew"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ trees serviced",
        trustTitle: "Insured Crew", trustSubtitle: "Certified arborists",
      },
      services: {
        title: "What We Handle", blurb: "From careful pruning to full removal and cleanup.",
        items: [
          { title: "Trimming & Pruning", blurb: "Shape, thin, and clear deadwood to keep trees healthy and safe." },
          { title: "Removal & Stumps",   blurb: "Safe takedowns of any size, plus stump grinding and haul-away." },
          { title: "Emergency Storm Work", blurb: "Fallen or hazardous limbs cleared fast, day or night." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "Fast, reliable response",     blurb: "On site quickly — even for storm emergencies." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication that respects you." },
          { title: "Insured with the INS",        blurb: "Your property and our crew are fully protected." },
          { title: "Clean, complete cleanup",     blurb: "We leave your property cleaner than we found it." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",   blurb: "Tell us about the tree — we listen first." },
          { title: "Free on-site estimate", blurb: "We assess the tree, the risk, and quote in writing." },
          { title: "We work safely",       blurb: "Roped, rigged, and removed without damage." },
          { title: "Full cleanup & haul",  blurb: "Branches, logs, and debris gone — property spotless." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Mauricio V.",  role: "Neighbor in Piedades",            quote: "Removed a huge cypress leaning over our roof — fast, safe, and cleaned up perfectly." },
          { name: "Ana Lucía F.", role: "Farm owner in San Juan",          quote: "After the storm they cleared our driveway the same night. Lifesavers, truly." },
          { name: "Esteban T.",   role: "Condo board member in San Ramón", quote: "They trim our condominium's trees every year. Professional, fair, and always on time." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does tree removal cost?", a: "It depends on size, location, and access — most removals run ₡200 000–₡1 250 000. We give free written estimates." },
          { q: "Do you handle emergencies?",       a: "Yes — we offer 24/7 emergency response for fallen and hazardous trees after storms." },
          { q: "Do you grind the stump too?",      a: "We do. Stump grinding can be added to any removal, and we haul away the debris." },
          { q: "Are you insured?",                 a: "Yes — our crew is insured with the INS, and our work is led by certified arborists." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about the tree. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about the tree",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Tree trimming", "Tree removal", "Stump grinding", "Emergency storm work", "Other"],
      },
      footer: { tagline: "Professional tree care in San Ramón and nearby towns.", hours: "Mon–Sat · 7:00 a.m.–7:00 p.m. · 24/7 emergencies", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Respuesta de emergencia 24/7 por temporales",
        title1: "Cuidado Experto de Árboles para",
        title2: "Propiedades Más Seguras y Sanas",
        subtitle: "Poda, corta, triturado de tocones y trabajo de emergencia. Equipo bilingüe. Cotización gratis. Personal asegurado ante el INS.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Emergencias 24/7", "Bilingüe EN/ES", "Cotización Gratis", "Personal Asegurado"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ árboles atendidos",
        trustTitle: "Personal Asegurado", trustSubtitle: "Arboristas certificados",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde la poda cuidadosa hasta la corta completa y la limpieza.",
        items: [
          { title: "Poda y Recorte",           blurb: "Damos forma, aclaramos y quitamos ramas secas para árboles sanos y seguros." },
          { title: "Corta y Tocones",          blurb: "Cortas seguras de cualquier tamaño, más triturado de tocones y acarreo." },
          { title: "Emergencias por Temporal", blurb: "Ramas caídas o peligrosas removidas rápido, de día o de noche." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Respuesta rápida y confiable", blurb: "Llegamos pronto — incluso en emergencias por temporal." },
          { title: "Bilingüe: inglés y español",   blurb: "Comunicación clara que lo respeta." },
          { title: "Asegurados ante el INS",       blurb: "Su propiedad y nuestro equipo están totalmente protegidos." },
          { title: "Limpieza completa",            blurb: "Dejamos su propiedad más limpia de como la encontramos." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos",       blurb: "Cuéntenos sobre el árbol — escuchamos primero." },
          { title: "Cotización gratis en sitio",  blurb: "Evaluamos el árbol, el riesgo y cotizamos por escrito." },
          { title: "Trabajamos con seguridad",    blurb: "Con cuerdas y equipo, cortamos sin causar daños." },
          { title: "Limpieza y acarreo total",    blurb: "Ramas, troncos y escombros fuera — propiedad impecable." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Mauricio V.",  role: "Vecino de Piedades",                         quote: "Quitaron un ciprés enorme inclinado sobre el techo — rápido, seguro y limpiaron perfecto." },
          { name: "Ana Lucía F.", role: "Dueña de finca en San Juan",                 quote: "Después del temporal despejaron la entrada esa misma noche. Nos salvaron, de verdad." },
          { name: "Esteban T.",   role: "Junta directiva de condominio en San Ramón", quote: "Podan los árboles del condominio cada año. Profesionales, justos y siempre puntuales." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta cortar un árbol?",   a: "Depende del tamaño, la ubicación y el acceso — la mayoría cuesta entre ₡200 000 y ₡1 250 000. Damos cotizaciones gratis por escrito." },
          { q: "¿Atienden emergencias?",            a: "Sí — ofrecemos respuesta de emergencia 24/7 para árboles caídos y peligrosos después de un temporal." },
          { q: "¿También trituran el tocón?",       a: "Sí. El triturado del tocón se puede agregar a cualquier corta, y acarreamos los escombros." },
          { q: "¿Tienen seguro?",                   a: "Sí — nuestro personal está asegurado ante el INS, y el trabajo lo dirigen arboristas certificados." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre el árbol. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio que necesita", message: "Cuéntenos sobre el árbol",
        submit: "Enviar Solicitud", success: "Gracias — le llamamos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Poda de árboles", "Corta de árboles", "Triturado de tocones", "Emergencia por temporal", "Otro"],
      },
      footer: { tagline: "Cuidado profesional de árboles en San Ramón y alrededores.", hours: "Lun a sáb · 7:00 a. m. – 7:00 p. m. · Emergencias 24/7", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 7:00 a.m.–6:00 p.m.", es: "Lun a sáb · 7:00 a. m. – 6:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Need a tree trimmed or removed?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Necesita podar o cortar un árbol?",
    roleEn: "Tree Care Advisor", roleEs: "Asesora de Árboles",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`, `${assets}/gal5.jpg`, `${assets}/gal6.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "ShieldCheck", title: "Insured crew", blurb: "Safe work, covered by the INS." },
      { icon: "Clock", title: "24/7 storm response", blurb: "Emergency removal when it counts." },
      { icon: "Banknote", title: "Free estimates", blurb: "Honest quotes, no surprises." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in English or Spanish." },
    ],
    es: [
      { icon: "ShieldCheck", title: "Personal asegurado", blurb: "Trabajo seguro, con cobertura del INS." },
      { icon: "Clock", title: "Respuesta 24/7 por temporales", blurb: "Corta de emergencia cuando más importa." },
      { icon: "Banknote", title: "Cotización gratis", blurb: "Cotizaciones honestas, sin sorpresas." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en español o inglés." },
    ],
  },
  galleryCaptions: {
    en: ["Large tree removal", "Professional trimming", "Stump grinding", "Storm cleanup", "Crown reduction", "Lot clearing"],
    es: ["Corta de árbol grande", "Poda profesional", "Remoción de tocones", "Limpieza después de un temporal", "Reducción de copa", "Limpieza de lote"],
  },
};

export default treeService;
