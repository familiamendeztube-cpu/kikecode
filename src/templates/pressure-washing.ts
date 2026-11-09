import { Droplets, Home, Building2, Waves, Clock, Sparkles, ShieldCheck, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";
// Its stock photos (a laundromat, a sponge, a mop) were not pressure washing; new ones go in
// template-assets/pressure-washing/ and back into media.

const pressureWashing: BusinessTemplate = {
  slug: "pressure-washing",
  industry: "Pressure Washing",
  industryEs: "Lavado a Presión",
  websiteType: "Construction Website",
  defaultServicesField: "Driveways & sidewalks, House washing, Decks & fences, Roof cleaning, Commercial properties",
  brand: {
    name: "AquaShine Pressure Washing",
    city: "San Isidro de El General",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@aquashinewash.com",
    address: "Costado norte del parque central, San Isidro de El General, Pérez Zeledón, San José",
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
        subtitle: "Driveways, houses, patios and commercial properties. Bilingual team. Free estimates. Spotless results.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["10+ Years", "Bilingual EN/ES", "Free Estimates", "INS-Insured Crew"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ happy customers",
        trustTitle: "Insured Crew", trustSubtitle: "Covered by the INS",
      },
      services: {
        title: "What We Clean", blurb: "Years of grime gone in a single visit.",
        items: [
          { title: "House & Soft Washing", blurb: "Safe low-pressure washing for painted walls, stucco and brick — no damage, no streaks." },
          { title: "Driveways & Patios",   blurb: "Concrete, pavers, wood and walls blasted clean of dirt, mold and stains." },
          { title: "Commercial Cleaning",  blurb: "Storefronts, parking lots and buildings kept spotless for your customers." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "10 years of experience",       blurb: "Hundreds of homes and businesses cleaned across Pérez Zeledón." },
          { title: "Spotless, streak-free results", blurb: "Right pressure, right detergents, every surface protected." },
          { title: "Insured with the INS",         blurb: "Your property is fully protected while we work." },
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
          { name: "Karla P.",     role: "Neighbor in Daniel Flores",        quote: "My driveway looks brand new. Years of stains gone in one afternoon. Amazing." },
          { name: "Fabián A.",    role: "Neighbor in Rivas",                quote: "They soft-washed the whole house and it looks freshly painted. Friendly and bilingual." },
          { name: "Marianela S.", role: "Property manager in San Isidro",   quote: "We use them across all our properties. Reliable, fast, and the results are spotless." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does pressure washing cost?", a: "Most driveways run ₡50 000–₡125 000 and full house washing ₡125 000–₡250 000 depending on size. Free written estimates." },
          { q: "Will it damage my walls or paint?",    a: "No — we use soft washing with low pressure and safe detergents on delicate surfaces like painted walls and stucco." },
          { q: "How long does it take?",               a: "A driveway takes about an hour. A full house wash is usually 2–4 hours depending on size." },
          { q: "Are you insured?",                     a: "Yes — our crew is insured with the INS, and we carry liability insurance for your peace of mind." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us what needs cleaning. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us what needs cleaning",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Driveway / sidewalk", "House washing", "Patio / wall", "Commercial", "Other"],
      },
      footer: { tagline: "Spotless pressure washing across Pérez Zeledón.", hours: "Mon–Sat · 7:00 a.m.–6:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Dejando propiedades relucientes desde 2014",
        title1: "Lavado a Presión Que",
        title2: "Lo Deja Como Nuevo",
        subtitle: "Cocheras, casas, terrazas y locales comerciales. Equipo bilingüe. Cotización gratis. Resultados impecables.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["10+ Años", "Bilingüe EN/ES", "Cotización Gratis", "Personal Asegurado"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ clientes felices",
        trustTitle: "Personal Asegurado", trustSubtitle: "Cobertura del INS",
      },
      services: {
        title: "Lo Que Limpiamos", blurb: "Años de suciedad eliminados en una sola visita.",
        items: [
          { title: "Casas y Lavado Suave",   blurb: "Lavado seguro a baja presión para paredes pintadas, repello y ladrillo — sin daños ni marcas." },
          { title: "Cocheras y Terrazas",    blurb: "Concreto, adoquines, madera y tapias libres de tierra, moho y manchas." },
          { title: "Limpieza Comercial",     blurb: "Fachadas de locales, parqueos y edificios impecables para sus clientes." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "10 años de experiencia",        blurb: "Cientos de casas y negocios limpios en todo Pérez Zeledón." },
          { title: "Resultados impecables y parejos", blurb: "La presión correcta, los detergentes correctos, cada superficie protegida." },
          { title: "Asegurados ante el INS",        blurb: "Su propiedad está totalmente protegida mientras trabajamos." },
          { title: "Bilingüe: inglés y español",    blurb: "Comunicación clara que lo respeta." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos",       blurb: "Cuéntenos qué hay que limpiar — mándenos una foto si puede." },
          { title: "Cotización gratis y rápida",  blurb: "Evaluamos las superficies y cotizamos por escrito." },
          { title: "Lavamos y restauramos",       blurb: "La presión adecuada para cada superficie, detergentes ecológicos." },
          { title: "Usted ve la diferencia",      blurb: "Revisión final cuando todo esté impecable — satisfacción garantizada." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Karla P.",     role: "Vecina de Daniel Flores",                quote: "Mi cochera quedó como nueva. Años de manchas eliminadas en una tarde. Increíble." },
          { name: "Fabián A.",    role: "Vecino de Rivas",                        quote: "Lavaron toda la casa a baja presión y parece recién pintada. Amables y bilingües." },
          { name: "Marianela S.", role: "Administradora de locales en San Isidro", quote: "Los contratamos en todas nuestras propiedades. Confiables, rápidos y con resultados impecables." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el lavado a presión?", a: "La mayoría de cocheras cuestan entre ₡50 000 y ₡125 000, y el lavado de casa completa entre ₡125 000 y ₡250 000 según el tamaño. Cotizaciones gratis por escrito." },
          { q: "¿Dañará mis paredes o la pintura?",   a: "No — usamos lavado suave a baja presión y detergentes seguros en superficies delicadas como paredes pintadas y repello." },
          { q: "¿Cuánto tiempo tarda?",               a: "Una cochera toma como una hora. El lavado de casa completa suele tomar de 2 a 4 horas según el tamaño." },
          { q: "¿Tienen seguro?",                     a: "Sí — nuestro personal está asegurado ante el INS y tenemos póliza de responsabilidad civil para su tranquilidad." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos qué hay que limpiar. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio que necesita", message: "Cuéntenos qué hay que limpiar",
        submit: "Enviar Solicitud", success: "Gracias — le llamamos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Cochera / acera", "Lavado de casa", "Terraza / tapia", "Comercial", "Otro"],
      },
      footer: { tagline: "Lavado a presión impecable en todo Pérez Zeledón.", hours: "Lun a sáb · 7:00 a. m. – 6:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 8:00 a.m.–6:00 p.m.", es: "Lun a sáb · 8:00 a. m. – 6:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. What surface needs cleaning?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Qué superficie necesita limpiar?",
    roleEn: "Cleaning Advisor", roleEs: "Asesora de Limpieza",
  },
  media: {
    hero: "",
    gallery: [],
    teamPortrait: "",
  },
  offers: {
    en: [
      { icon: "Sparkles", title: "Spotless results", blurb: "Like-new surfaces, every time." },
      { icon: "Banknote", title: "Free quotes", blurb: "Fast, friendly pricing." },
      { icon: "ShieldCheck", title: "Insured crew", blurb: "Covered by the INS, safe for your property." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in English or Spanish." },
    ],
    es: [
      { icon: "Sparkles", title: "Resultados impecables", blurb: "Superficies como nuevas, siempre." },
      { icon: "Banknote", title: "Cotización gratis", blurb: "Precios rápidos y amables." },
      { icon: "ShieldCheck", title: "Personal asegurado", blurb: "Con cobertura del INS, seguro para su propiedad." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en español o inglés." },
    ],
  },
  galleryCaptions: {
    en: [],
    es: [],
  },
};

export default pressureWashing;
