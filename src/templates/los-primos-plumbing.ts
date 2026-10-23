import { Droplets, Wrench, ShowerHead, Flame, Clock, ShieldCheck, DollarSign, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/los-primos-plumbing`;

const losPrimosPlumbing: BusinessTemplate = {
  slug: "los-primos-plumbing",
  industry: "Plumbing Service",
  industryEs: "Servicio de Plomería",
  websiteType: "Plumbing Website",
  defaultServicesField:
    "Drain cleaning, Leak detection, Water heaters, Repiping, Sewer lines, Faucet & fixture installation, Emergency plumbing",
  brand: {
    name: "Los Primos Plumbing",
    city: "Whittier, CA",
    phone: "(562) 550-9099",
    phoneHref: "tel:+15625509099",
    email: "info@losprimosplumbing.com",
    address: "Serving the Los Angeles area, Whittier & La Habra",
    heroIcon: Droplets,
    logo: `${TEMPLATE_ASSETS}/los-primos-plumbing/logo.png`,
    socials: {
      instagram: "https://instagram.com/losprimosplumbing",
    },
    palette: {
      primary: "#1D4ED8", primaryDark: "#1E3A8A", accent: "#F97316",
      heroFrom: "#0B1B3A", heroVia: "#0F2557", heroTo: "#0A1730",
      heroGlow1: "rgba(29,78,216,0.55)", heroGlow2: "rgba(255,255,255,0.10)",
      heroIconFrom: "#1D4ED8", heroIconTo: "#1E3A8A",
      contactFrom: "#1D4ED8", contactTo: "#1E3A8A",
    },
  },
  serviceIcons: [Wrench, ShowerHead, Flame],
  whyIcons: [Clock, ShieldCheck, DollarSign, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Same-day & 24/7 emergency plumbing",
        title1: "Expert Plumbing Service,",
        title2: "Top Quality Work",
        subtitle: "Leaks, clogged drains, water heaters, and repipes — done right the first time. Licensed, insured, and bilingual. Serving the Los Angeles area, Whittier & La Habra.",
        cta1: "Get a Free Quote", cta2: "Call Now",
        badges: ["Same-Day Service", "Licensed & Insured", "Upfront Pricing", "24/7 Emergencies"],
        ratingTitle: "Same-Day", ratingSubtitle: "Service available",
        trustTitle: "Licensed & Insured", trustSubtitle: "Clean, guaranteed work",
      },
      services: {
        title: "What We Do", blurb: "Residential and commercial plumbing, big or small.",
        items: [
          { title: "Drains & Sewers", blurb: "Clogged drains, toilets, and main sewer lines cleared fast with the right equipment." },
          { title: "Leak Detection & Repair", blurb: "We find hidden leaks and fix them before they damage your home or spike your bill." },
          { title: "Water Heaters & Repipes", blurb: "Tankless and tank installs, repairs, and full repipes — done to code and built to last." },
        ],
      },
      why: {
        title: "Why Homeowners Call Los Primos First",
        items: [
          { title: "Licensed & insured",            blurb: "Your home is fully protected on every job." },
          { title: "Upfront flat pricing",          blurb: "You approve the price before we start — no surprises." },
          { title: "Same-day & 24/7 emergencies",   blurb: "Burst pipe at 2am? We answer when you need us." },
          { title: "Clean, guaranteed work",        blurb: "We protect your floors and back our work in writing." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message",   blurb: "Tell us the problem or send a quick photo." },
          { title: "Upfront quote",     blurb: "We give you the full price before any work begins." },
          { title: "Expert repair",     blurb: "Licensed plumbers fix it right, to code." },
          { title: "Guaranteed & clean", blurb: "We test it, clean up, and stand behind the work." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Maria G.",   role: "Homeowner, Whittier",   quote: "They found a slab leak two other plumbers missed and fixed it the same day. Honest and clean work." },
          { name: "David R.",   role: "Homeowner, La Habra",   quote: "Replaced our water heater in a few hours and the price was exactly what they quoted. Highly recommend." },
          { name: "Jessica M.", role: "Property manager",      quote: "My go-to for every unit. They show up on time, explain everything, and leave it spotless." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you offer free estimates?",      a: "Yes. We give a clear, upfront quote before any work starts — you approve the price first, with no hidden fees." },
          { q: "Do you handle emergencies?",        a: "We offer same-day service and 24/7 emergency response for burst pipes, major leaks, and backups." },
          { q: "Are you licensed and insured?",     a: "Yes — fully licensed and insured, so your home is protected on every job." },
          { q: "Is your work guaranteed?",          a: "Absolutely. Every job is backed by a written workmanship guarantee. If something isn't right, we make it right." },
        ],
      },
      contact: {
        title: "Get a Fast Free Quote", blurb: "Send a photo and a quick description. We reply fast during business hours and offer 24/7 emergency service.",
        name: "Your name", phone: "Phone", service: "What do you need?", message: "Describe the problem",
        submit: "Send Request", success: "Thanks — we'll call or text you right back with a quote.",
        pick: "— Pick a service —",
        services: ["Drain / sewer", "Leak detection & repair", "Water heater", "Repipe / remodel", "Emergency", "Other"],
      },
      footer: { tagline: "Expert plumbing service and top quality work for Southern California families.", hours: "Mon–Sat · 7am–7pm · 24/7 emergencies", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Servicio el mismo día y emergencias 24/7",
        title1: "Servicio Experto de Plomería,",
        title2: "Trabajo de Alta Calidad",
        subtitle: "Fugas, drenajes tapados, calentadores de agua y repipes — bien hecho a la primera. Con licencia, asegurados y bilingües. Servimos el área de Los Ángeles, Whittier y La Habra.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Servicio el Mismo Día", "Con Licencia y Seguro", "Precio Claro", "Emergencias 24/7"],
        ratingTitle: "Mismo Día", ratingSubtitle: "Servicio disponible",
        trustTitle: "Con Licencia y Seguro", trustSubtitle: "Trabajo limpio y garantizado",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Plomería residencial y comercial, grande o pequeña.",
        items: [
          { title: "Drenajes y Alcantarillado",            blurb: "Destapamos drenajes, baños y líneas principales rápido y con el equipo correcto." },
          { title: "Detección y Reparación de Fugas",      blurb: "Encontramos fugas ocultas y las reparamos antes de que dañen su casa o suban su recibo." },
          { title: "Calentadores y Repipes",               blurb: "Instalación de calentadores con y sin tanque, reparaciones y repipes completos — a código y para durar." },
        ],
      },
      why: {
        title: "Por Qué Los Vecinos Llaman a Los Primos Primero",
        items: [
          { title: "Con licencia y seguro",          blurb: "Su casa está totalmente protegida en cada trabajo." },
          { title: "Precio fijo por adelantado",     blurb: "Usted aprueba el precio antes de empezar — sin sorpresas." },
          { title: "Mismo día y emergencias 24/7",   blurb: "¿Tubería rota a las 2am? Contestamos cuando nos necesita." },
          { title: "Trabajo limpio y garantizado",   blurb: "Protegemos sus pisos y respaldamos el trabajo por escrito." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llame o escriba",       blurb: "Díganos el problema o mande una foto rápida." },
          { title: "Cotización clara",      blurb: "Le damos el precio total antes de empezar." },
          { title: "Reparación experta",    blurb: "Plomeros con licencia lo arreglan bien, a código." },
          { title: "Garantizado y limpio",  blurb: "Lo probamos, limpiamos y respaldamos el trabajo." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "María G.",   role: "Dueña de casa, Whittier",         quote: "Encontraron una fuga en la losa que otros dos plomeros no vieron y la repararon el mismo día. Honestos y limpios." },
          { name: "David R.",   role: "Dueño de casa, La Habra",         quote: "Cambiaron nuestro calentador en unas horas y el precio fue exactamente el cotizado. Muy recomendados." },
          { name: "Jessica M.", role: "Administradora de propiedades",   quote: "Mi opción para cada unidad. Llegan a tiempo, explican todo y dejan todo impecable." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Ofrecen estimados gratis?",       a: "Sí. Le damos una cotización clara antes de empezar — usted aprueba el precio primero, sin cargos ocultos." },
          { q: "¿Atienden emergencias?",           a: "Ofrecemos servicio el mismo día y respuesta de emergencia 24/7 para tuberías rotas, fugas grandes y atascos." },
          { q: "¿Tienen licencia y seguro?",       a: "Sí — totalmente con licencia y asegurados, para que su casa esté protegida en cada trabajo." },
          { q: "¿Su trabajo tiene garantía?",      a: "Claro. Cada trabajo está respaldado por una garantía escrita de mano de obra. Si algo no está bien, lo arreglamos." },
        ],
      },
      contact: {
        title: "Reciba una Cotización Gratis", blurb: "Mande una foto y una descripción rápida. Respondemos rápido en horario de oficina y atendemos emergencias 24/7.",
        name: "Su nombre", phone: "Teléfono", service: "¿Qué necesita?", message: "Describa el problema",
        submit: "Enviar Solicitud", success: "Gracias — le llamamos o enviamos un texto pronto con su cotización.",
        pick: "— Elija un servicio —",
        services: ["Drenaje / alcantarillado", "Detección y reparación de fugas", "Calentador de agua", "Repipe / remodelación", "Emergencia", "Otro"],
      },
      footer: { tagline: "Servicio experto de plomería y trabajo de alta calidad para las familias del Sur de California.", hours: "Lun–Sáb · 7am–7pm · Emergencias 24/7", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  realBusiness: true,
  category: "emergency",
  facts: {
    stats: [
      { value: "Same-day", labelEn: "Service available", labelEs: "Servicio disponible" },
      { value: "24/7", labelEn: "Emergency response", labelEs: "Respuesta de emergencia" },
      { value: "Free", valueEs: "Gratis", labelEn: "Written estimates", labelEs: "Estimados por escrito" },
      { value: "Bilingual", valueEs: "Bilingüe", labelEn: "English & Spanish", labelEs: "Inglés y español" },
    ],
    certsEn: ["Se Habla Español", "Upfront Flat Pricing", "24/7 Emergency Service", "Workmanship Guarantee", "Bilingual EN/ES", "Free Written Estimates"],
    certsEs: ["Se Habla Español", "Precio Fijo por Adelantado", "Servicio de Emergencia 24/7", "Garantía de Mano de Obra", "Bilingüe EN/ES", "Estimados Gratis por Escrito"],
    guaranteeEn: { title: "Done right or we make it right", blurb: "Every job is backed by a written workmanship guarantee. If something isn't right, we come back and fix it — no excuses." },
    guaranteeEs: { title: "Bien hecho o lo arreglamos", blurb: "Cada trabajo está respaldado por una garantía escrita de mano de obra. Si algo no está bien, regresamos y lo arreglamos — sin excusas." },
  },
  availability: {
    en: "Mon–Sat · 7am–7pm · 24/7 emergency service",
    es: "Lun–Sáb · 7am–7pm · Servicio de emergencia 24/7",
  },
  assistant: {
    name: "Ana",
    en: "Hi! Thanks for calling {business}. How can we help with your plumbing today?",
    es: "¡Hola! Gracias por llamar a {business}. ¿Cómo le podemos ayudar con su plomería hoy?",
    roleEn: "Service Coordinator",
    roleEs: "Coordinadora de Servicio",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [
      `${assets}/gal1.jpg`,
      `${assets}/gal2.jpg`,
      `${assets}/gal3.jpg`,
      `${assets}/action1.jpg`,
      `${assets}/action2.jpg`,
      `${assets}/gal4.jpg`,
    ],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "Same-day service",       blurb: "Most calls handled the same day you call." },
      { icon: "ShieldCheck", title: "Licensed & insured",     blurb: "Fully covered on every single job." },
      { icon: "DollarSign",  title: "Upfront flat pricing",   blurb: "Approve the price before we start." },
      { icon: "Wrench",      title: "Expert repairs",         blurb: "Done right the first time, to code." },
      { icon: "Languages",   title: "Bilingual EN/ES",        blurb: "We serve you in English or Spanish." },
      { icon: "Star",        title: "Honest service",         blurb: "Clean work and upfront pricing." },
    ],
    es: [
      { icon: "Clock",       title: "Servicio el mismo día",       blurb: "La mayoría de llamadas el mismo día." },
      { icon: "ShieldCheck", title: "Con licencia y seguro",       blurb: "Totalmente cubierto en cada trabajo." },
      { icon: "DollarSign",  title: "Precio fijo por adelantado",  blurb: "Apruebe el precio antes de empezar." },
      { icon: "Wrench",      title: "Reparaciones expertas",       blurb: "Bien hecho a la primera, a código." },
      { icon: "Languages",   title: "Bilingüe EN/ES",              blurb: "Le atendemos en inglés o español." },
      { icon: "Star",        title: "Servicio honesto",            blurb: "Trabajo limpio y precio claro." },
    ],
  },
  galleryCaptions: {
    en: [
      "Clean, modern bathroom remodels",
      "Tankless & tank water heater installs",
      "Leak detection and pipe repair",
      "Fast drain & sewer cleaning",
      "Friendly, uniformed local crew",
      "Kitchen sink & faucet installation",
    ],
    es: [
      "Remodelaciones de baño limpias y modernas",
      "Instalación de calentadores con y sin tanque",
      "Detección de fugas y reparación de tuberías",
      "Limpieza rápida de drenajes y alcantarillado",
      "Equipo local amable y uniformado",
      "Instalación de fregaderos y llaves de cocina",
    ],
  },
  videoGallery: {
    title: { en: "Watch Our Work in Action", es: "Vea Nuestro Trabajo en Acción" },
    blurb: {
      en: "Real commercials, real Los Primos crew. Professional, licensed, and bilingual plumbers serving the Los Angeles area.",
      es: "Comerciales reales, equipo real de Los Primos. Plomeros profesionales, con licencia y bilingües al servicio del área de Los Ángeles.",
    },
    items: [
      {
        src: `${assets}/video-1.mp4`,
        poster: `${assets}/video-1.jpg`,
        title: { en: "Professional Latino Workers", es: "Trabajadores Latinos Profesionales" },
        caption: {
          en: "Expert plumbing service and top-quality work, done right the first time.",
          es: "Servicio de plomería experto y trabajo de primera calidad, bien hecho a la primera.",
        },
      },
      {
        src: `${assets}/video-2.mp4`,
        poster: `${assets}/video-2.jpg`,
        title: { en: "Premium Plumbing Work", es: "Trabajo de Plomería Premium" },
        caption: {
          en: "Licensed, insured, and bilingual — serving the Los Angeles area, Whittier & La Habra.",
          es: "Con licencia, asegurados y bilingües — al servicio de Los Ángeles, Whittier y La Habra.",
        },
      },
    ],
  },
};

export default losPrimosPlumbing;
