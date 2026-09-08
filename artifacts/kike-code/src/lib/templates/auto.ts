import { Car, Cog, Gauge, Battery, Clock, ShieldCheck, Languages, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";

const auto: BusinessTemplate = {
  slug: "auto",
  industry: "Auto Repair",
  industryEs: "Mecánica",
  websiteType: "Auto / Mechanic Website",
  defaultServicesField: "Oil change, Brakes, Engine diagnostics, AC repair, Tires, Transmission, Pre-purchase inspection",
  brand: {
    name: "Apex Auto Repair",
    city: "Dallas",
    phone: "(555) 010-0005",
    phoneHref: "tel:+15550100005",
    email: "hello@apexautorepair.com",
    address: "500 Industrial Rd, Dallas, TX 75207",
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
};

export default auto;
