import { TreePine, Scissors, Truck, Leaf, Clock, Languages, ShieldCheck, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";

const treeService: BusinessTemplate = {
  slug: "tree-service",
  industry: "Tree Service",
  industryEs: "Servicio de Árboles",
  websiteType: "Home Services Website",
  defaultServicesField: "Tree trimming, Tree removal, Stump grinding, Emergency storm work, Lot clearing",
  brand: {
    name: "Timberline Tree Care",
    city: "Atlanta",
    phone: "(555) 010-0013",
    phoneHref: "tel:+15550100013",
    email: "hello@timberlinetreecare.com",
    address: "527 Peachtree St, Atlanta, GA 30308",
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
        subtitle: "Trimming, removal, stump grinding, and emergency work. Bilingual team. Free estimates. Licensed & insured.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["24/7 Emergency", "Bilingual EN/ES", "Free Estimates", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ trees serviced",
        trustTitle: "Licensed & Insured", trustSubtitle: "Certified arborists",
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
          { title: "Licensed & insured",          blurb: "Your property and our crew are fully protected." },
          { title: "Clean, complete cleanup",     blurb: "We leave your yard cleaner than we found it." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",   blurb: "Tell us about the tree — we listen first." },
          { title: "Free on-site estimate", blurb: "We assess the tree, the risk, and quote in writing." },
          { title: "We work safely",       blurb: "Roped, rigged, and removed without damage." },
          { title: "Full cleanup & haul",  blurb: "Branches, logs, and debris gone — yard spotless." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Greg W.",   role: "Homeowner",        quote: "Removed a huge oak leaning over our roof — fast, safe, and cleaned up perfectly." },
          { name: "Lucía F.",  role: "Property owner",    quote: "After the storm they cleared our driveway the same night. Lifesavers, truly." },
          { name: "Brian T.",  role: "HOA board member",  quote: "They trim our community trees every year. Professional, fair, and always on time." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does tree removal cost?", a: "It depends on size, location, and access — most removals run $400–$2,500. We give free written estimates." },
          { q: "Do you handle emergencies?",       a: "Yes — we offer 24/7 emergency response for fallen and hazardous trees after storms." },
          { q: "Do you grind the stump too?",      a: "We do. Stump grinding can be added to any removal, and we haul away the debris." },
          { q: "Are you licensed and insured?",    a: "Yes — fully licensed, insured, and our work is led by certified arborists." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about the tree. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about the tree",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Tree trimming", "Tree removal", "Stump grinding", "Emergency storm work", "Other"],
      },
      footer: { tagline: "Professional tree care across the region.", hours: "Mon–Sat · 7am–7pm · 24/7 emergencies", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Respuesta de emergencia 24/7 por tormentas",
        title1: "Cuidado Experto de Árboles para",
        title2: "Propiedades Más Seguras y Sanas",
        subtitle: "Poda, remoción, triturado de tocones y trabajo de emergencia. Equipo bilingüe. Estimados gratis. Con licencia y seguro.",
        cta1: "Estimado Gratis", cta2: "Llame Ahora",
        badges: ["Emergencias 24/7", "Bilingüe EN/ES", "Estimados Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ árboles atendidos",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Arboristas certificados",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde la poda cuidadosa hasta la remoción completa y limpieza.",
        items: [
          { title: "Poda y Recorte",          blurb: "Damos forma, aclaramos y quitamos ramas muertas para árboles sanos y seguros." },
          { title: "Remoción y Tocones",      blurb: "Derribos seguros de cualquier tamaño, más triturado de tocones y acarreo." },
          { title: "Emergencias por Tormenta", blurb: "Ramas caídas o peligrosas removidas rápido, de día o de noche." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Respuesta rápida y confiable", blurb: "Llegamos pronto — incluso en emergencias por tormenta." },
          { title: "Bilingüe: Inglés y Español",   blurb: "Comunicación clara que lo respeta." },
          { title: "Con licencia y seguro",        blurb: "Su propiedad y nuestro equipo están totalmente protegidos." },
          { title: "Limpieza completa",            blurb: "Dejamos su jardín más limpio de como lo encontramos." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o mándenos mensaje", blurb: "Cuéntenos sobre el árbol — escuchamos primero." },
          { title: "Estimado gratis en su sitio", blurb: "Evaluamos el árbol, el riesgo y cotizamos por escrito." },
          { title: "Trabajamos con seguridad",    blurb: "Con cuerdas y equipo, removemos sin causar daños." },
          { title: "Limpieza y acarreo total",    blurb: "Ramas, troncos y escombros fuera — jardín impecable." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Greg W.",  role: "Dueño de casa",       quote: "Removieron un roble enorme inclinado sobre el techo — rápido, seguro y limpiaron perfecto." },
          { name: "Lucía F.", role: "Dueña de propiedad",  quote: "Después de la tormenta despejaron la entrada esa misma noche. Unos salvavidas, de verdad." },
          { name: "Brian T.", role: "Miembro de junta HOA", quote: "Podan los árboles de la comunidad cada año. Profesionales, justos y siempre puntuales." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta remover un árbol?",  a: "Depende del tamaño, ubicación y acceso — la mayoría cuesta $400–$2,500. Damos estimados gratis por escrito." },
          { q: "¿Atienden emergencias?",            a: "Sí — ofrecemos respuesta de emergencia 24/7 para árboles caídos y peligrosos tras tormentas." },
          { q: "¿También trituran el tocón?",       a: "Sí. El triturado de tocón se puede agregar a cualquier remoción, y acarreamos los escombros." },
          { q: "¿Tienen licencia y seguro?",        a: "Sí — con licencia completa, asegurados, y nuestro trabajo lo dirigen arboristas certificados." },
        ],
      },
      contact: {
        title: "Pida un Estimado Gratis", blurb: "Cuéntenos sobre el árbol. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre el árbol",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Poda de árboles", "Remoción de árboles", "Triturado de tocones", "Emergencia por tormenta", "Otro"],
      },
      footer: { tagline: "Cuidado profesional de árboles en toda la región.", hours: "Lun–Sáb · 7am–7pm · Emergencias 24/7", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default treeService;
