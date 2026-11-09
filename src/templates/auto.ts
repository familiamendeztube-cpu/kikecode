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
    city: "Alajuela",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "servicio@ramirezauto.com",
    address: "Del parque central, 400 m oeste y 50 m sur, Alajuela, Alajuela",
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
        eyebrow: "Mechanics in Alajuela since 2005",
        title1: "Honest Auto Repair",
        title2: "Done Right the First Time",
        subtitle: "Brakes, engines, AC, tires and more. Bilingual team. Free diagnostics. Warranty on every repair.",
        cta1: "Book a Service", cta2: "Call Now",
        badges: ["Recommended by Neighbors", "Bilingual EN/ES", "Free Diagnostics", "12-Month Warranty"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "800+ trusted customers",
        trustTitle: "12-Month Warranty", trustSubtitle: "On every repair",
      },
      services: {
        title: "What We Fix", blurb: "All makes. Cars, pickups and vans.",
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
          { title: "12-month / 20,000 km warranty", blurb: "Every repair backed in writing." },
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
          { name: "Andrés L.",         role: "Pickup owner, Grecia",       quote: "Two other shops missed the issue. These guys found it in 20 minutes and fixed it for half the quote." },
          { name: "Karla M.",          role: "Neighbor in Alajuela",       quote: "They never push extras. Just honest work at a fair price. I send my whole family here." },
          { name: "Luis Diego T.",     role: "Fleet manager, El Coyol",    quote: "We trust them with our entire delivery fleet. Reliable, fast, fair." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you give free estimates?",       a: "Yes — diagnostics and written estimates are always free. You decide before any work starts." },
          { q: "What kind of warranty?",            a: "12 months / 20,000 km on parts and labor — in writing — on every repair." },
          { q: "Do you work on my car?",            a: "We service cars, pickups and vans of every make. Hybrids too." },
          { q: "Do you offer financing?",           a: "Yes — flexible 6-month and 12-month plans available for larger repairs." },
        ],
      },
      contact: {
        title: "Book a Free Diagnostic", blurb: "Tell us what's wrong. We'll message you back fast.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe the issue",
        submit: "Send Request", success: "Thank you — we'll call you shortly.",
        pick: "— Pick a service —",
        services: ["Oil change", "Brakes", "Engine diagnostic", "AC repair", "Other"],
      },
      footer: { tagline: "Honest auto repair for every driver.", hours: "Mon–Sat · 7:00 a.m.–6:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Mecánicos en Alajuela desde 2005",
        title1: "Mecánica Honesta",
        title2: "Bien Hecha a la Primera",
        subtitle: "Frenos, motor, aire acondicionado, llantas y más. Equipo bilingüe. Diagnóstico gratis. Garantía en cada reparación.",
        cta1: "Agende su Cita", cta2: "Llame Ahora",
        badges: ["Recomendados por Vecinos", "Bilingüe EN/ES", "Diagnóstico Gratis", "12 Meses de Garantía"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "800+ clientes de confianza",
        trustTitle: "Garantía 12 Meses", trustSubtitle: "En cada reparación",
      },
      services: {
        title: "Lo Que Reparamos", blurb: "Todas las marcas. Carros, pick-ups y microbuses.",
        items: [
          { title: "Frenos y Suspensión",         blurb: "Pastillas, discos, amortiguadores, alineamiento. Manejo suave y seguro." },
          { title: "Motor y Diagnóstico",         blurb: "Check engine, fugas, fallas. Diagnóstico real — no adivinanzas." },
          { title: "Aire, Eléctrico y Llantas",   blurb: "Carga de aire acondicionado, burros de arranque, alternadores, baterías, montaje y balanceo." },
        ],
      },
      why: {
        title: "Por Qué Los Conductores Confían",
        items: [
          { title: "Servicio el mismo día",       blurb: "La mayoría de las reparaciones, listas el mismo día." },
          { title: "Bilingüe: Inglés y Español",  blurb: "Le explicamos en su idioma — sin sorpresas." },
          { title: "Garantía de 12 meses / 20 000 km", blurb: "Cada reparación respaldada por escrito." },
          { title: "Nunca le vendemos de más",    blurb: "Solo arreglamos lo que hace falta. Punto." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Traiga su carro o agende cita", blurb: "Lo atendemos sin cita. También puede reservar en línea." },
          { title: "Diagnóstico gratis",          blurb: "Encontramos el problema real antes de cobrarle." },
          { title: "Cotización por escrito",      blurb: "Usted aprueba cada cobro antes de cualquier reparación." },
          { title: "Arreglado y garantizado",     blurb: "12 meses de garantía en repuestos y mano de obra." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Andrés L.",       role: "Dueño de pick-up, Grecia",  quote: "Otros dos talleres no encontraron el problema. Ellos lo encontraron en 20 minutos y lo arreglaron por la mitad de lo que me cotizaron." },
          { name: "Karla M.",        role: "Vecina de Alajuela",        quote: "Nunca le venden a uno de más. Trabajo honesto a precio justo. Aquí traigo a toda mi familia." },
          { name: "Luis Diego T.",   role: "Gerente de flota, El Coyol", quote: "Les confiamos toda nuestra flotilla de reparto. Cumplidos, rápidos y justos." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Dan cotizaciones gratis?",     a: "Sí — el diagnóstico y la cotización por escrito son siempre gratis. Usted decide antes de cualquier trabajo." },
          { q: "¿Qué garantía ofrecen?",        a: "12 meses / 20 000 km en repuestos y mano de obra — por escrito — en cada reparación." },
          { q: "¿Le dan servicio a mi carro?",  a: "Atendemos carros, pick-ups y microbuses de todas las marcas. Híbridos también." },
          { q: "¿Ofrecen financiamiento?",      a: "Sí — planes flexibles de 6 y 12 meses para reparaciones grandes." },
        ],
      },
      contact: {
        title: "Agende un Diagnóstico Gratis", blurb: "Cuéntenos qué le pasa a su carro. Le respondemos pronto.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos pronto.",
        pick: "— Elija un servicio —",
        services: ["Cambio de aceite", "Frenos", "Diagnóstico de motor", "Aire acondicionado", "Otro"],
      },
      footer: { tagline: "Mecánica honesta para todo conductor.", hours: "Lun a sáb · 7:00 a. m. – 6:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "auto",
  facts: {
    stats: [
      { value: "20+", labelEn: "Years under the hood", labelEs: "Años bajo el capó" },
      { value: "12 000+", labelEn: "Cars repaired", labelEs: "Carros reparados" },
      { value: "4.8★", labelEn: "Google rating", labelEs: "Calificación en Google" },
      { value: "12mo", valueEs: "12 meses", labelEn: "Parts & labor warranty", labelEs: "Garantía en repuestos y mano de obra" },
    ],
    areasEn: ["Alajuela", "San Rafael", "San Antonio", "La Guácima", "Río Segundo", "Turrúcares", "Carrizal", "El Coyol", "Ciruelas", "Grecia", "Atenas", "Heredia"],
    areasEs: ["Alajuela", "San Rafael", "San Antonio", "La Guácima", "Río Segundo", "Turrúcares", "Carrizal", "El Coyol", "Ciruelas", "Grecia", "Atenas", "Heredia"],
    certsEn: ["Mechanics Since 2005", "Free Diagnostics", "Written Estimates", "Google Reviews", "Recommended by Neighbors", "12-Month Warranty"],
    certsEs: ["Mecánicos Desde 2005", "Diagnóstico Gratis", "Cotización por Escrito", "Reseñas en Google", "Recomendados por Vecinos", "12 Meses de Garantía"],
    guaranteeEn: { title: "Fixed right or your money back", blurb: "If the same problem comes back within 90 days, we re-do the work or refund the labor. In writing." },
    guaranteeEs: { title: "Bien arreglado o le devolvemos su dinero", blurb: "Si el mismo problema vuelve en 90 días, lo arreglamos otra vez o le devolvemos la mano de obra. Por escrito." },
  },
  availability: { en: "Open Mon–Sat · 24/7 emergency tow", es: "Abierto de lun a sáb · Grúa 24/7" },
  assistant: {
    name: "Isabel",
    en: "Hi! I'm Isabel at {business}. Need a tow or a quote? We're reachable 24/7 — book online or call.",
    es: "¡Hola! Soy Isabel de {business}. ¿Necesita grúa o una cotización? Estamos disponibles 24/7 — reserve en línea o llámenos.",
    roleEn: "Service advisor", roleEs: "Asesora de servicio",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal3.jpg`, `${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "24/7 tow dispatch",    blurb: "Stuck on the road? We arrive within 45 min." },
      { icon: "Wrench",      title: "Experienced mechanics", blurb: "Diagnostics on all makes." },
      { icon: "Banknote",    title: "Free diagnostic",      blurb: "Check engine light? We scan it free." },
      { icon: "ShieldCheck", title: "12-month warranty",    blurb: "Parts & labor warranty on every repair." },
      { icon: "Languages",   title: "Bilingual EN/ES",      blurb: "We explain the problem in plain language." },
      { icon: "BadgeCheck",  title: "Honest pricing",       blurb: "Photo proof of every needed repair." },
    ],
    es: [
      { icon: "Clock",       title: "Grúa 24/7",             blurb: "¿Varado en carretera? Llegamos en 45 min." },
      { icon: "Wrench",      title: "Mecánicos con experiencia", blurb: "Diagnóstico en todas las marcas." },
      { icon: "Banknote",    title: "Diagnóstico gratis",    blurb: "¿Luz de check engine? Se la escaneamos gratis." },
      { icon: "ShieldCheck", title: "12 meses de garantía",  blurb: "Garantía en repuestos y mano de obra." },
      { icon: "Languages",   title: "Bilingüe EN/ES",        blurb: "Le explicamos el problema sin tecnicismos." },
      { icon: "BadgeCheck",  title: "Precios honestos",      blurb: "Foto de cada reparación necesaria." },
    ],
  },
  galleryCaptions: {
    en: ["Brakes & rotors", "Engine diagnostics", "Tire rotation & balance"],
    es: ["Frenos y discos", "Diagnóstico de motor", "Rotación y balanceo"],
  },
};

export default auto;
