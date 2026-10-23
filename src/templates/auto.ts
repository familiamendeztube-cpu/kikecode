import { Car, Cog, Gauge, Battery, Clock, ShieldCheck, Languages, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/auto`;

const auto: BusinessTemplate = {
  slug: "auto",
  industry: "Auto Repair",
  industryEs: "Mecánica",
  websiteType: "Auto / Mechanic Website",
  defaultServicesField: "Oil change, Brakes, Engine diagnostics, AC repair, Tires, Transmission, Pre-purchase inspection",
  brand: {
    name: "Ramirez Auto Repair",
    city: "Houston, TX",
    phone: "1-800-555-0550",
    phoneHref: "tel:+18005550550",
    email: "service@ramirezauto.com",
    address: "8412 Telephone Rd, Houston, TX 77017",
    heroIcon: Car,
    palette: {
      primary: "#E5BA2E", primaryDark: "#b89425", accent: "#1f2937",
      heroFrom: "#0c0c0e", heroVia: "#1f1f23", heroTo: "#09090b",
      heroGlow1: "rgba(229,186,46,0.6)", heroGlow2: "rgba(229,186,46,0.2)",
      heroIconFrom: "#E5BA2E", heroIconTo: "#8a6c14",
      contactFrom: "#E5BA2E", contactTo: "#434343",
    },
  },
  serviceIcons: [Cog, Gauge, Battery],
  whyIcons: [Clock, Languages, ShieldCheck, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "ASE-certified mechanics since 2005",
        title1: "Honest Auto Repair",
        title2: "Done Right the First Time",
        subtitle: "Brakes, engines, AC, tires and more. Bilingual team. Free diagnostics. Warranty on every repair.",
        cta1: "Book a Service", cta2: "Call Now",
        badges: ["ASE Certified", "Bilingual EN/ES", "Free Diagnostics", "12-Month Warranty"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "800+ trusted customers",
        trustTitle: "12-Month Warranty", trustSubtitle: "On every repair",
      },
      services: {
        title: "What We Fix", blurb: "Foreign and domestic. Cars, trucks, vans.",
        items: [
          { title: "Brakes & Suspension",    blurb: "Pads, rotors, shocks, struts, alignment. Smooth, safe rides." },
          { title: "Engine & Diagnostics",   blurb: "Check engine, misfires, leaks. Real diagnostics — not guesses." },
          { title: "AC, Electrical & Tires", blurb: "AC recharge, starters, alternators, batteries, mount & balance." },
        ],
      },
      why: {
        title: "Why Drivers Trust Us",
        items: [
          { title: "Same-day service",            blurb: "Most repairs done the day you drop off." },
          { title: "Bilingual: English & Spanish", blurb: "We explain in your language — no surprises." },
          { title: "12-month / 12k warranty",     blurb: "Every repair backed in writing." },
          { title: "No upsells, ever",            blurb: "We only fix what needs fixing. Period." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Bring it in or schedule",   blurb: "Walk-ins welcome. Online booking too." },
          { title: "Free diagnostic",           blurb: "We find the real problem before you pay." },
          { title: "Up-front written estimate", blurb: "You approve every charge before we touch it." },
          { title: "Fixed & guaranteed",        blurb: "12-month warranty on parts and labor." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Greg L.",     role: "Truck owner",       quote: "Two other shops missed the issue. These guys found it in 20 minutes and fixed it for half the quote." },
          { name: "Sandra M.",   role: "Mom driver",        quote: "They never push extras. Just honest work at a fair price. I send my whole family here." },
          { name: "Marcus T.",   role: "Fleet manager",     quote: "We trust them with our entire delivery fleet. Reliable, fast, fair." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you give free estimates?",       a: "Yes — diagnostics and written estimates are always free. You decide before any work starts." },
          { q: "What kind of warranty?",            a: "12 months / 12,000 miles on parts and labor — in writing — on every repair." },
          { q: "Do you work on my car?",            a: "We service all foreign and domestic cars, trucks, and vans. Hybrids too." },
          { q: "Do you offer financing?",           a: "Yes — flexible 6-month and 12-month plans available for larger repairs." },
        ],
      },
      contact: {
        title: "Book a Free Diagnostic", blurb: "Tell us what's wrong. We'll text you back fast.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe the issue",
        submit: "Send Request", success: "Thank you — we'll call you shortly.",
        pick: "— Pick a service —",
        services: ["Oil change", "Brakes", "Engine diagnostic", "AC repair", "Other"],
      },
      footer: { tagline: "Honest auto repair for every driver.", hours: "Mon–Sat · 7am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Mecánicos certificados ASE desde 2005",
        title1: "Mecánica Honesta",
        title2: "Bien Hecha a la Primera",
        subtitle: "Frenos, motor, aire, llantas y más. Equipo bilingüe. Diagnóstico gratis. Garantía en cada reparación.",
        cta1: "Reserve Servicio", cta2: "Llame Ahora",
        badges: ["Certificación ASE", "Bilingüe EN/ES", "Diagnóstico Gratis", "12 Meses de Garantía"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "800+ clientes de confianza",
        trustTitle: "Garantía 12 Meses", trustSubtitle: "En cada reparación",
      },
      services: {
        title: "Lo Que Reparamos", blurb: "Extranjeros y nacionales. Carros, camionetas, vans.",
        items: [
          { title: "Frenos y Suspensión",         blurb: "Pastillas, discos, amortiguadores, alineación. Manejo suave y seguro." },
          { title: "Motor y Diagnóstico",         blurb: "Check engine, fugas, fallas. Diagnóstico real — no adivinanzas." },
          { title: "Aire, Eléctrica y Llantas",   blurb: "Carga de aire, marchas, alternadores, baterías, llantas." },
        ],
      },
      why: {
        title: "Por Qué Los Conductores Confían",
        items: [
          { title: "Servicio el mismo día",       blurb: "La mayoría de reparaciones terminadas el día." },
          { title: "Bilingüe: Inglés y Español",  blurb: "Explicamos en su idioma — sin sorpresas." },
          { title: "12 meses / 12k de garantía",  blurb: "Cada reparación respaldada por escrito." },
          { title: "Nunca vendemos de más",       blurb: "Solo arreglamos lo que necesita. Punto." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Traiga el carro o programe",  blurb: "Aceptamos sin cita. Reservas en línea también." },
          { title: "Diagnóstico gratis",          blurb: "Encontramos el problema real antes de cobrar." },
          { title: "Cotización por escrito",      blurb: "Usted aprueba antes de cualquier reparación." },
          { title: "Arreglado y garantizado",     blurb: "12 meses de garantía en piezas y labor." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Greg L.",     role: "Dueño de camioneta",     quote: "Otros 2 talleres no encontraron el problema. Ellos lo encontraron en 20 minutos." },
          { name: "Sandra M.",   role: "Mamá conductora",        quote: "Nunca empujan extras. Solo trabajo honesto. Mando a toda mi familia." },
          { name: "Marcus T.",   role: "Gerente de flota",       quote: "Confiamos en ellos con toda nuestra flota de entrega. Confiables y justos." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Dan estimados gratis?",        a: "Sí — diagnóstico y estimado escrito son siempre gratis. Usted decide antes de cualquier trabajo." },
          { q: "¿Qué tipo de garantía?",        a: "12 meses / 12,000 millas en piezas y labor — por escrito — en cada reparación." },
          { q: "¿Trabajan mi carro?",           a: "Servimos todos los carros, camionetas y vans extranjeros y nacionales. Híbridos también." },
          { q: "¿Ofrecen financiamiento?",      a: "Sí — planes flexibles de 6 y 12 meses disponibles para reparaciones grandes." },
        ],
      },
      contact: {
        title: "Reserve Diagnóstico Gratis", blurb: "Cuéntenos qué pasa. Le responderemos pronto.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos pronto.",
        pick: "— Elija un servicio —",
        services: ["Cambio de aceite", "Frenos", "Diagnóstico de motor", "Reparación de aire", "Otro"],
      },
      footer: { tagline: "Mecánica honesta para todo conductor.", hours: "Lun–Sáb · 7am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "auto",
  facts: {
    stats: [
      { value: "20+", labelEn: "Years under the hood", labelEs: "Años bajo el cofre" },
      { value: "12,000+", labelEn: "Cars repaired", labelEs: "Autos reparados" },
      { value: "4.8★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "12mo", labelEn: "Parts & labor warranty", labelEs: "Garantía piezas y mano de obra" },
    ],
    areasEn: ["Houston", "Pasadena", "Bellaire", "Sugar Land", "Pearland", "Spring Branch", "Heights", "EaDo", "Magnolia", "Galena Park", "South Houston", "Stafford"],
    areasEs: ["Houston", "Pasadena", "Bellaire", "Sugar Land", "Pearland", "Spring Branch", "Heights", "EaDo", "Magnolia", "Galena Park", "South Houston", "Stafford"],
    certsEn: ["ASE Certified Master Techs", "AAA Approved Auto Repair", "BBB A+ Rated", "AC Delco Pro", "Mitchell ProDemand Shop", "RepairPal Certified"],
    certsEs: ["Técnicos certificados ASE", "Aprobado AAA Auto Repair", "BBB calificación A+", "AC Delco Pro", "Taller Mitchell ProDemand", "Certificación RepairPal"],
    guaranteeEn: { title: "Fixed right or your money back", blurb: "If the same problem comes back within 90 days, we re-do the work or refund the labor. In writing." },
    guaranteeEs: { title: "Bien arreglado o te devolvemos tu dinero", blurb: "Si el mismo problema vuelve en 90 días, lo arreglamos otra vez o te devolvemos la mano de obra. Por escrito." },
  },
  availability: { en: "Open Mon–Sat · 24/7 emergency tow", es: "Abierto lun–sáb · Grúa 24/7" },
  assistant: {
    name: "Isabel",
    en: "Hi! I'm Isabel at {business}. Need a tow or a quote? We're reachable 24/7 — book online or call.",
    es: "¡Hola! Soy Isabel de {business}. ¿Necesitas grúa o cotización? Estamos 24/7 — reserva en línea o llama.",
    roleEn: "Service advisor", roleEs: "Asesora de servicio",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "24/7 tow dispatch",    blurb: "Stuck on the road? We arrive within 45 min." },
      { icon: "Wrench",      title: "ASE-certified techs",  blurb: "Master techs · diagnostics on all makes." },
      { icon: "DollarSign",  title: "Free diagnostic",      blurb: "Check engine light? We scan it free." },
      { icon: "ShieldCheck", title: "12-month warranty",    blurb: "Parts & labor warranty on every repair." },
      { icon: "Languages",   title: "Bilingüe EN/ES",       blurb: "Te explicamos el problema sin tecnicismos." },
      { icon: "BadgeCheck",  title: "Honest pricing",       blurb: "Photo proof of every needed repair." },
    ],
    es: [
      { icon: "Clock",       title: "Grúa 24/7",             blurb: "¿Varado en la carretera? Llegamos en 45 min." },
      { icon: "Wrench",      title: "Técnicos ASE",          blurb: "Técnicos maestros · diagnóstico en todas las marcas." },
      { icon: "DollarSign",  title: "Diagnóstico gratis",    blurb: "¿Luz de check engine? Escaneamos gratis." },
      { icon: "ShieldCheck", title: "12 meses de garantía",  blurb: "Garantía de partes y mano de obra." },
      { icon: "Languages",   title: "Bilingual EN/ES",       blurb: "We explain the problem in plain language." },
      { icon: "BadgeCheck",  title: "Precios honestos",      blurb: "Foto de cada reparación necesaria." },
    ],
  },
  galleryCaptions: {
    en: ["Engine diagnostics", "Tire rotation & balance", "Lifts, bays, modern shop"],
    es: ["Diagnóstico de motor", "Rotación y balanceo", "Elevadores, bahías, taller moderno"],
  },
};

export default auto;
