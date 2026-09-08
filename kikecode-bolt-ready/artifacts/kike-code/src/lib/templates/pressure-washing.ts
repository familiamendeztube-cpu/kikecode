import { Droplets, Home, Building2, Waves, Clock, Sparkles, ShieldCheck, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";

const pressureWashing: BusinessTemplate = {
  slug: "pressure-washing",
  industry: "Pressure Washing",
  industryEs: "Lavado a Presión",
  websiteType: "Construction Website",
  defaultServicesField: "Driveways & sidewalks, House washing, Decks & fences, Roof cleaning, Commercial properties",
  brand: {
    name: "AquaShine Pressure Washing",
    city: "Tampa",
    phone: "(555) 010-0010",
    phoneHref: "tel:+15550100010",
    email: "hello@aquashinewash.com",
    address: "1200 Bay Ave, Tampa, FL 33602",
    heroIcon: Droplets,
    palette: {
      primary: "#0EA5E9", primaryDark: "#0369A1", accent: "#06B6D4",
      heroFrom: "#082f49", heroVia: "#0c4a6e", heroTo: "#082f49",
      heroGlow1: "rgba(14,165,233,0.55)", heroGlow2: "rgba(6,182,212,0.35)",
      heroIconFrom: "#38BDF8", heroIconTo: "#06B6D4",
      contactFrom: "#0EA5E9", contactTo: "#06B6D4",
    },
  },
  serviceIcons: [Home, Waves, Building2],
  whyIcons: [Clock, Sparkles, ShieldCheck, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Making properties shine since 2014",
        title1: "Pressure Washing That",
        title2: "Makes It Look Brand New",
        subtitle: "Driveways, houses, decks and commercial properties. Bilingual team. Free estimates. Spotless results.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["10+ Years", "Bilingual EN/ES", "Free Estimates", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ happy customers",
        trustTitle: "Licensed & Insured", trustSubtitle: "Fully protected",
      },
      services: {
        title: "What We Clean", blurb: "Years of grime gone in a single visit.",
        items: [
          { title: "House & Soft Washing", blurb: "Safe low-pressure washing for siding, stucco and brick — no damage, no streaks." },
          { title: "Driveways & Decks",    blurb: "Concrete, pavers, wood and fences blasted clean of dirt, mold and stains." },
          { title: "Commercial Cleaning",  blurb: "Storefronts, parking lots and buildings kept spotless for your customers." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "10 years of experience",       blurb: "Hundreds of homes and businesses cleaned across the region." },
          { title: "Spotless, streak-free results", blurb: "Right pressure, right detergents, every surface protected." },
          { title: "Licensed, bonded & insured",   blurb: "Your property is fully protected while we work." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication that respects you." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",    blurb: "Tell us what needs cleaning — send a photo if you can." },
          { title: "Free quick estimate",   blurb: "We assess the surfaces and quote in writing." },
          { title: "We wash & restore",     blurb: "Right pressure for each surface, eco-friendly detergents." },
          { title: "You see the difference", blurb: "Walk-through when it's spotless — satisfaction guaranteed." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Karen P.",  role: "Homeowner",         quote: "My driveway looks brand new. Years of stains gone in one afternoon. Amazing." },
          { name: "Miguel A.", role: "Homeowner",         quote: "They soft-washed the whole house and it looks freshly painted. Friendly and bilingual." },
          { name: "Dana W.",   role: "Property manager",  quote: "We use them across all our properties. Reliable, fast, and the results are spotless." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does pressure washing cost?", a: "Most driveways run $100–$250 and full house washing $250–$500 depending on size. Free written estimates." },
          { q: "Will it damage my siding or paint?",   a: "No — we use soft washing with low pressure and safe detergents on delicate surfaces like siding and stucco." },
          { q: "How long does it take?",               a: "A driveway takes about an hour. A full house wash is usually 2–4 hours depending on size." },
          { q: "Are you licensed and insured?",        a: "Yes — fully licensed, bonded, and carrying liability insurance for your peace of mind." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us what needs cleaning. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us what needs cleaning",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Driveway / sidewalk", "House washing", "Deck / fence", "Commercial", "Other"],
      },
      footer: { tagline: "Spotless pressure washing across the region.", hours: "Mon–Sat · 7am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Dejando propiedades relucientes desde 2014",
        title1: "Lavado a Presión Que",
        title2: "Lo Deja Como Nuevo",
        subtitle: "Entradas, casas, terrazas y propiedades comerciales. Equipo bilingüe. Estimados gratis. Resultados impecables.",
        cta1: "Estimado Gratis", cta2: "Llame Ahora",
        badges: ["10+ Años", "Bilingüe EN/ES", "Estimados Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ clientes felices",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Totalmente protegido",
      },
      services: {
        title: "Lo Que Limpiamos", blurb: "Años de suciedad eliminados en una sola visita.",
        items: [
          { title: "Casas y Lavado Suave",   blurb: "Lavado de baja presión seguro para revestimiento, estuco y ladrillo — sin daños ni marcas." },
          { title: "Entradas y Terrazas",    blurb: "Concreto, adoquines, madera y cercas libres de tierra, moho y manchas." },
          { title: "Limpieza Comercial",     blurb: "Fachadas, estacionamientos y edificios impecables para sus clientes." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "10 años de experiencia",        blurb: "Cientos de casas y negocios limpiados en la región." },
          { title: "Resultados impecables y parejos", blurb: "La presión correcta, los detergentes correctos, cada superficie protegida." },
          { title: "Con licencia y asegurado",      blurb: "Su propiedad está totalmente protegida mientras trabajamos." },
          { title: "Bilingüe: Inglés y Español",    blurb: "Comunicación clara que lo respeta." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o mándenos mensaje", blurb: "Cuéntenos qué hay que limpiar — mande una foto si puede." },
          { title: "Estimado gratis rápido",      blurb: "Evaluamos las superficies y cotizamos por escrito." },
          { title: "Lavamos y restauramos",       blurb: "La presión adecuada para cada superficie, detergentes ecológicos." },
          { title: "Usted ve la diferencia",      blurb: "Inspección cuando todo esté impecable — satisfacción garantizada." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Karen P.",  role: "Dueña de casa",       quote: "Mi entrada quedó como nueva. Años de manchas eliminadas en una tarde. Increíble." },
          { name: "Miguel A.", role: "Dueño de casa",       quote: "Lavaron toda la casa con presión suave y parece recién pintada. Amables y bilingües." },
          { name: "Dana W.",   role: "Administradora",      quote: "Los usamos en todas nuestras propiedades. Confiables, rápidos y los resultados impecables." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el lavado a presión?", a: "La mayoría de entradas van de $100–$250 y el lavado de casa completa de $250–$500 según el tamaño. Estimados gratis por escrito." },
          { q: "¿Dañará mi revestimiento o pintura?", a: "No — usamos lavado suave de baja presión y detergentes seguros en superficies delicadas como revestimiento y estuco." },
          { q: "¿Cuánto tiempo tarda?",               a: "Una entrada toma como una hora. El lavado de casa completa suele ser de 2–4 horas según el tamaño." },
          { q: "¿Tienen licencia y seguro?",          a: "Sí — licencia completa, fianza y seguro de responsabilidad para su tranquilidad." },
        ],
      },
      contact: {
        title: "Pida un Estimado Gratis", blurb: "Cuéntenos qué hay que limpiar. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos qué hay que limpiar",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Entrada / acera", "Lavado de casa", "Terraza / cerca", "Comercial", "Otro"],
      },
      footer: { tagline: "Lavado a presión impecable en toda la región.", hours: "Lun–Sáb · 7am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default pressureWashing;
