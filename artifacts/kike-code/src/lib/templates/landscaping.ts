import { Leaf, Sprout, TreePine, Flower2, Clock, ShieldCheck, Languages, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";

const landscaping: BusinessTemplate = {
  slug: "landscaping",
  industry: "Landscaping & Gardening",
  industryEs: "Jardinería",
  websiteType: "Landscaping Website",
  defaultServicesField: "Lawn mowing, Tree trimming, Garden design, Sprinkler repair, Mulching, Sod installation, Cleanups",
  brand: {
    name: "Verde Gardens",
    city: "Miami",
    phone: "(555) 010-0003",
    phoneHref: "tel:+15550100003",
    email: "hello@verdegardens.com",
    address: "300 Coral Way, Miami, FL 33145",
    heroIcon: Leaf,
    palette: {
      primary: "#89A84F", primaryDark: "#5e7a30", accent: "#507F70",
      heroFrom: "#1a2e1a", heroVia: "#264328", heroTo: "#0f1f10",
      heroGlow1: "rgba(137,168,79,0.55)", heroGlow2: "rgba(80,127,112,0.4)",
      heroIconFrom: "#89A84F", heroIconTo: "#507F70",
      contactFrom: "#89A84F", contactTo: "#507F70",
    },
  },
  serviceIcons: [Sprout, TreePine, Flower2],
  whyIcons: [Clock, Languages, ShieldCheck, Sparkles],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Caring for yards since 2008",
        title1: "Beautiful Yards,",
        title2: "Healthy Plants, Happy Neighbors",
        subtitle: "Weekly maintenance, landscape design, irrigation. Bilingual crews. Free estimates. Eco-friendly options.",
        cta1: "Free Estimate", cta2: "Call Now",
        badges: ["Weekly Service", "Bilingual EN/ES", "Eco-Friendly", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ homes served",
        trustTitle: "Licensed & Insured", trustSubtitle: "Fully protected",
      },
      services: {
        title: "What We Do", blurb: "From weekly mow to full landscape design.",
        items: [
          { title: "Lawn & Garden Care", blurb: "Mowing, edging, weeding, fertilization. Your yard always looks its best." },
          { title: "Trees & Hedges",     blurb: "Trimming, pruning, removal. Safe, clean work that protects healthy growth." },
          { title: "Design & Install",   blurb: "New beds, sod, mulch, irrigation. We transform the yard you have." },
        ],
      },
      why: {
        title: "Why Homeowners Pick Us",
        items: [
          { title: "On-time weekly service",       blurb: "Same crew, same day, every week." },
          { title: "Bilingual: English & Spanish", blurb: "Easy communication that respects you." },
          { title: "Licensed & insured",           blurb: "Your property is fully protected." },
          { title: "Free, honest estimates",       blurb: "Quote in writing. No surprises." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Tell us about your yard",  blurb: "Send a photo or address. We'll have a look." },
          { title: "Free walk-through quote",  blurb: "Honest written estimate within 1–2 days." },
          { title: "Set a weekly day",         blurb: "Same crew on the same day every week." },
          { title: "Enjoy a beautiful yard",   blurb: "We handle it. You sit outside and relax." },
        ],
      },
      testimonials: {
        title: "What Neighbors Say",
        items: [
          { name: "Patricia M.", role: "Homeowner",        quote: "Best lawn on the block. They never miss a week and the yard looks magazine-perfect." },
          { name: "Roberto S.",  role: "HOA board member", quote: "We hired them for our entire community. Reliable, professional, fair pricing." },
          { name: "Emily W.",    role: "New homeowner",    quote: "Redesigned our front yard for less than half what other quotes were. Stunning result." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "What does weekly service cost?", a: "Most yards $35–$95 per visit depending on size. We give a flat written quote before starting." },
          { q: "What's included weekly?",        a: "Mow, edge, blow, basic weeding. Fertilizer, mulch, and trimming are scheduled separately." },
          { q: "Are you licensed and insured?",  a: "Yes — fully licensed and carrying liability insurance." },
          { q: "Do you offer one-time cleanups?", a: "Yes. Spring cleanups, post-storm cleanups, and move-out cleanups quoted on-site." },
        ],
      },
      contact: {
        title: "Get a Free Estimate", blurb: "Tell us about your yard. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your yard",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Weekly maintenance", "Tree / hedge work", "Design & install", "Irrigation / sprinklers", "One-time cleanup"],
      },
      footer: { tagline: "Caring for yards across the region.", hours: "Mon–Sat · 7am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Cuidando jardines desde 2008",
        title1: "Jardines Hermosos,",
        title2: "Plantas Sanas, Vecinos Felices",
        subtitle: "Mantenimiento semanal, diseño, riego. Equipos bilingües. Estimados gratis. Opciones ecológicas.",
        cta1: "Estimado Gratis", cta2: "Llame Ahora",
        badges: ["Servicio Semanal", "Bilingüe EN/ES", "Ecológico", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ casas atendidas",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Totalmente protegido",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde corte semanal hasta diseño completo.",
        items: [
          { title: "Cuidado de Césped y Jardín", blurb: "Corte, orilla, deshierbe, fertilización. Su jardín siempre se ve hermoso." },
          { title: "Árboles y Setos",            blurb: "Poda, recorte, remoción. Trabajo seguro que protege el crecimiento sano." },
          { title: "Diseño e Instalación",       blurb: "Camas nuevas, césped, mulch, riego. Transformamos su jardín actual." },
        ],
      },
      why: {
        title: "Por Qué Nos Eligen",
        items: [
          { title: "Servicio semanal puntual",   blurb: "Mismo equipo, mismo día, cada semana." },
          { title: "Bilingüe: Inglés y Español", blurb: "Comunicación clara que lo respeta." },
          { title: "Con licencia y seguro",      blurb: "Su propiedad está totalmente protegida." },
          { title: "Estimados gratis y honestos", blurb: "Cotización por escrito. Sin sorpresas." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Cuéntenos sobre su jardín",   blurb: "Mande una foto o dirección. Lo revisamos." },
          { title: "Estimado gratis por escrito", blurb: "Cotización honesta en 1–2 días." },
          { title: "Elija un día semanal",        blurb: "Mismo equipo, mismo día cada semana." },
          { title: "Disfrute su jardín",          blurb: "Nosotros nos encargamos. Usted relájese." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Vecinos",
        items: [
          { name: "Patricia M.", role: "Dueña de casa",      quote: "El mejor césped de la cuadra. Nunca faltan y se ve perfecto." },
          { name: "Roberto S.",  role: "Comité vecinal",     quote: "Los contratamos para toda la comunidad. Confiables, profesionales, precio justo." },
          { name: "Emily W.",    role: "Nueva propietaria",  quote: "Rediseñaron mi jardín por menos de la mitad de otras cotizaciones. Resultado increíble." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el servicio semanal?", a: "La mayoría de jardines $35–$95 por visita según el tamaño. Cotización fija por escrito antes de empezar." },
          { q: "¿Qué incluye semanal?",               a: "Corte, orilla, soplado, deshierbe básico. Fertilizante, mulch y poda se programan aparte." },
          { q: "¿Tienen licencia y seguro?",          a: "Sí — licencia completa y seguro de responsabilidad." },
          { q: "¿Hacen limpiezas únicas?",            a: "Sí. Limpieza de primavera, después de tormenta y al desocupar — cotizado en sitio." },
        ],
      },
      contact: {
        title: "Reciba un Estimado Gratis", blurb: "Cuéntenos sobre su jardín. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su jardín",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Mantenimiento semanal", "Trabajo de árboles / setos", "Diseño e instalación", "Riego / aspersores", "Limpieza única"],
      },
      footer: { tagline: "Cuidando jardines en toda la región.", hours: "Lun–Sáb · 7am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default landscaping;
