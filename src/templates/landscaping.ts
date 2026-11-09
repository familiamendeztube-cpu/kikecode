import { Leaf, Sprout, TreePine, Flower2, Clock, ShieldCheck, Languages, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/landscaping`;

const landscaping: BusinessTemplate = {
  slug: "landscaping",
  industry: "Landscaping & Gardening",
  industryEs: "Jardinería",
  websiteType: "Landscaping Website",
  defaultServicesField: "Lawn mowing, Tree trimming, Garden design, Sprinkler repair, Mulching, Sod installation, Cleanups",
  brand: {
    name: "Verde Landscaping",
    city: "Belén",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@verdelandscaping.com",
    address: "Costado sur de la plaza de deportes de San Antonio, San Antonio, Belén, Heredia",
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
        eyebrow: "Caring for gardens since 2008",
        title1: "Beautiful Gardens,",
        title2: "Healthy Plants, Happy Neighbors",
        subtitle: "Weekly maintenance, landscape design, irrigation. Bilingual crews. Free estimates. Eco-friendly options.",
        cta1: "Free Estimate", cta2: "Call Now",
        badges: ["Weekly Service", "Bilingual EN/ES", "Eco-Friendly", "INS-Insured Crew"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ homes served",
        trustTitle: "Insured Crew", trustSubtitle: "Covered by the INS",
      },
      services: {
        title: "What We Do", blurb: "From weekly mowing to full landscape design.",
        items: [
          { title: "Lawn & Garden Care", blurb: "Mowing, edging, weeding, fertilizing. Your garden always looks its best." },
          { title: "Trees & Hedges",     blurb: "Trimming, pruning, removal. Safe, clean work that protects healthy growth." },
          { title: "Design & Install",   blurb: "New beds, sod, mulch, irrigation. We transform the garden you have." },
        ],
      },
      why: {
        title: "Why Homeowners Pick Us",
        items: [
          { title: "On-time weekly service",       blurb: "Same crew, same day, every week." },
          { title: "Bilingual: English & Spanish", blurb: "Easy communication that respects you." },
          { title: "Insured with the INS",         blurb: "Your property is fully protected." },
          { title: "Free, honest estimates",       blurb: "Quote in writing. No surprises." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Tell us about your garden", blurb: "Send a photo or address. We'll have a look." },
          { title: "Free walk-through quote",   blurb: "Honest written estimate within 1–2 days." },
          { title: "Set a weekly day",          blurb: "Same crew on the same day every week." },
          { title: "Enjoy a beautiful garden",  blurb: "We handle it. You sit outside and relax." },
        ],
      },
      testimonials: {
        title: "What Neighbors Say",
        items: [
          { name: "Marianela M.", role: "Neighbor in La Ribera",          quote: "Best lawn in the neighborhood. They never miss a week and the garden looks magazine-perfect." },
          { name: "Luis Diego S.", role: "Condo board member in Belén",   quote: "We hired them for our entire condominium. Reliable, professional, fair pricing." },
          { name: "Daniela C.",   role: "New homeowner in Santa Ana",     quote: "Redesigned our front garden for less than half what other quotes were. Stunning result." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "What does weekly service cost?", a: "Most gardens ₡17 500–₡47 500 per visit depending on size. We give a flat written quote before starting." },
          { q: "What's included weekly?",        a: "Mow, edge, blow, basic weeding. Fertilizer, mulch, and trimming are scheduled separately." },
          { q: "Are you insured?",               a: "Yes — our crew is insured with the INS, and we carry liability insurance." },
          { q: "Do you offer one-time cleanups?", a: "Yes. Cleanups before the rainy season, after a heavy storm, and when you move out, quoted on-site." },
        ],
      },
      contact: {
        title: "Get a Free Estimate", blurb: "Tell us about your garden. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your garden",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Weekly maintenance", "Tree / hedge work", "Design & install", "Irrigation / sprinklers", "One-time cleanup"],
      },
      footer: { tagline: "Caring for gardens in Belén and nearby towns.", hours: "Mon–Sat · 7:00 a.m.–6:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Cuidando jardines desde 2008",
        title1: "Jardines Hermosos,",
        title2: "Plantas Sanas, Vecinos Felices",
        subtitle: "Mantenimiento semanal, diseño, riego. Cuadrillas bilingües. Cotización gratis. Opciones ecológicas.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Servicio Semanal", "Bilingüe EN/ES", "Ecológico", "Personal Asegurado"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ casas atendidas",
        trustTitle: "Personal Asegurado", trustSubtitle: "Cobertura del INS",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde la chapia semanal hasta el diseño completo.",
        items: [
          { title: "Cuidado de Zacate y Jardín", blurb: "Chapia, orillas, deshierba, abono. Su jardín siempre se ve bien." },
          { title: "Árboles y Setos",            blurb: "Poda, recorte, corta. Trabajo seguro que protege el crecimiento sano." },
          { title: "Diseño e Instalación",       blurb: "Jardineras nuevas, zacate en rollo, mulch, riego. Transformamos el jardín que ya tiene." },
        ],
      },
      why: {
        title: "Por Qué Nos Eligen",
        items: [
          { title: "Servicio semanal puntual",      blurb: "Mismo equipo, mismo día, cada semana." },
          { title: "Bilingüe: inglés y español",    blurb: "Comunicación clara que lo respeta." },
          { title: "Asegurados ante el INS",        blurb: "Su propiedad está totalmente protegida." },
          { title: "Cotizaciones gratis y honestas", blurb: "Cotización por escrito. Sin sorpresas." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Cuéntenos sobre su jardín",     blurb: "Mándenos una foto o la dirección. Lo revisamos." },
          { title: "Cotización gratis por escrito", blurb: "Cotización honesta en 1–2 días." },
          { title: "Elija un día de la semana",     blurb: "Mismo equipo, mismo día cada semana." },
          { title: "Disfrute su jardín",            blurb: "Nosotros nos encargamos. Usted relájese." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Vecinos",
        items: [
          { name: "Marianela M.",  role: "Vecina de La Ribera",                    quote: "El mejor zacate del barrio. Nunca fallan una semana y el jardín se ve de revista." },
          { name: "Luis Diego S.", role: "Junta directiva de condominio en Belén", quote: "Los contratamos para todo el condominio. Confiables, profesionales, precio justo." },
          { name: "Daniela C.",    role: "Nueva propietaria en Santa Ana",         quote: "Rediseñaron el jardín del frente por menos de la mitad que otras cotizaciones. Resultado increíble." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el servicio semanal?", a: "La mayoría de jardines entre ₡17 500 y ₡47 500 por visita según el tamaño. Cotización fija por escrito antes de empezar." },
          { q: "¿Qué incluye el servicio semanal?",   a: "Chapia, orillas, soplado, deshierba básica. Abono, mulch y poda se programan aparte." },
          { q: "¿Tienen seguro?",                     a: "Sí — nuestro personal está asegurado ante el INS y tenemos póliza de responsabilidad civil." },
          { q: "¿Hacen limpiezas de una sola vez?",   a: "Sí. Limpiezas antes del invierno, después de un temporal y al desocupar una casa — cotizadas en sitio." },
        ],
      },
      contact: {
        title: "Reciba una Cotización Gratis", blurb: "Cuéntenos sobre su jardín. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio que necesita", message: "Cuéntenos sobre su jardín",
        submit: "Enviar Solicitud", success: "Gracias — le llamamos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Mantenimiento semanal", "Árboles / setos", "Diseño e instalación", "Riego / aspersores", "Limpieza de una sola vez"],
      },
      footer: { tagline: "Cuidando jardines en Belén y alrededores.", hours: "Lun a sáb · 7:00 a. m. – 6:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  facts: {
    stats: [
      { value: "15+", labelEn: "Years caring for gardens", labelEs: "Años cuidando jardines" },
      { value: "600+", labelEn: "Weekly routes", labelEs: "Rutas semanales" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación en Google" },
      { value: "30+", labelEn: "Crew members", labelEs: "Miembros del equipo" },
    ],
    areasEn: ["Belén", "La Ribera", "La Asunción", "Flores", "San Pablo", "Heredia", "Lagunilla", "San Rafael de Alajuela", "Santa Ana", "Escazú", "Pozos", "Alajuela"],
    areasEs: ["Belén", "La Ribera", "La Asunción", "Flores", "San Pablo", "Heredia", "Lagunilla", "San Rafael de Alajuela", "Santa Ana", "Escazú", "Pozos", "Alajuela"],
    certsEn: ["INS-Insured Crew", "Water-Saving Irrigation", "Certified Arborist on Staff", "Professional-Grade Equipment", "Liability Insurance", "Native Plant Designs"],
    certsEs: ["Personal asegurado ante el INS", "Riego que ahorra agua", "Arbolista certificado en el equipo", "Equipo profesional", "Póliza de responsabilidad civil", "Diseños con plantas nativas"],
    guaranteeEn: { title: "Green-up guarantee", blurb: "If your lawn doesn't visibly improve in 30 days, the next month of service is on us. Period." },
    guaranteeEs: { title: "Garantía de jardín verde", blurb: "Si su zacate no mejora visiblemente en 30 días, el próximo mes va por nuestra cuenta. Punto." },
  },
  availability: { en: "Open 7 days · Weekly maintenance routes", es: "Abierto los 7 días · Rutas de mantenimiento semanales" },
  assistant: {
    name: "Carmen",
    en: "Hi! I'm Carmen at {business}. We're here 24/7 — book a free garden walk-through anytime.",
    es: "¡Hola! Soy Carmen de {business}. Estamos 24/7 — agende un recorrido gratis por su jardín cuando guste.",
    roleEn: "Route coordinator", roleEs: "Coordinadora de rutas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "24/7 booking",         blurb: "Set up routes online or by phone any hour." },
      { icon: "Leaf",        title: "Eco-friendly crews",   blurb: "Electric mowers, organic fertilizers on request." },
      { icon: "Banknote",    title: "Flat monthly plans",   blurb: "Weekly maintenance starts at ₡45 000/month." },
      { icon: "ShieldCheck", title: "Insured crew",         blurb: "Landscaping crew insured with the INS." },
      { icon: "Languages",   title: "Bilingual EN/ES",      blurb: "Bilingual crews on every route." },
      { icon: "Sparkles",    title: "Free design consult",  blurb: "Dry-season-ready redesigns from ₡750 000." },
    ],
    es: [
      { icon: "Clock",       title: "Reservas 24/7",         blurb: "Programe rutas en línea o por teléfono a cualquier hora." },
      { icon: "Leaf",        title: "Cuadrillas ecológicas", blurb: "Cortadoras de zacate eléctricas, abonos orgánicos si los pide." },
      { icon: "Banknote",    title: "Planes mensuales fijos",blurb: "Mantenimiento semanal desde ₡45 000 al mes." },
      { icon: "ShieldCheck", title: "Personal asegurado",    blurb: "Cuadrilla de jardinería asegurada ante el INS." },
      { icon: "Languages",   title: "Bilingüe EN/ES",        blurb: "Cuadrillas bilingües en cada ruta." },
      { icon: "Sparkles",    title: "Consulta de diseño gratis", blurb: "Rediseños que aguantan el verano desde ₡750 000." },
    ],
  },
  galleryCaptions: {
    en: ["Hedge trim & shape", "Full-garden redesign", "Smart sprinkler tune-up"],
    es: ["Corte y forma de setos", "Rediseño completo del jardín", "Ajuste de aspersores inteligentes"],
  },
};

export default landscaping;
