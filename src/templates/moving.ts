import { Truck, Boxes, Package, Home, Clock, ShieldCheck, Languages, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/moving`;

const moving: BusinessTemplate = {
  slug: "moving",
  industry: "Moving Services",
  industryEs: "Mudanzas",
  websiteType: "Local Business Website",
  defaultServicesField: "Local moves, Long-distance, Apartment moves, Office relocation, Packing services, Furniture assembly, Storage",
  brand: {
    name: "Mudanza Moving",
    city: "Pavas",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@mudanzamoving.com",
    address: "De la iglesia católica, 300 m oeste y 50 m sur, Pavas, San José",
    heroIcon: Truck,
    palette: {
      primary: "#F2A900", primaryDark: "#b87f00", accent: "#6D2D8E",
      heroFrom: "#1a1238", heroVia: "#2d1654", heroTo: "#1a1238",
      heroGlow1: "rgba(242,169,0,0.55)", heroGlow2: "rgba(109,45,142,0.4)",
      heroIconFrom: "#F2A900", heroIconTo: "#b87f00",
      contactFrom: "#6D2D8E", contactTo: "#294A93",
    },
  },
  serviceIcons: [Boxes, Package, Home],
  whyIcons: [Clock, Languages, ShieldCheck, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Trusted movers since 2009",
        title1: "Stress-Free Moves,",
        title2: "Big or Small, Done Right",
        subtitle: "Moves within San José and anywhere in Costa Rica. Careful crews, fair flat pricing, full insurance. Bilingual team.",
        cta1: "Get Free Quote", cta2: "Call Now",
        badges: ["Flat Pricing", "Bilingual EN/ES", "Fully Insured", "On-Time Guarantee"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "2,000+ moves completed",
        trustTitle: "Fully Insured", trustSubtitle: "Your belongings are protected",
      },
      services: {
        title: "What We Move", blurb: "Homes, apartments, offices — across town or coast to coast.",
        items: [
          { title: "Local Home Moves",        blurb: "Apartments, condos, houses. Careful crews, padding, dollies, no surprises." },
          { title: "Long-Distance & Storage", blurb: "Moves to any province, with tracking. Secure storage for in-between days." },
          { title: "Office Relocation",       blurb: "After-hours moves so your business doesn't stop. We disassemble and reassemble." },
        ],
      },
      why: {
        title: "Why Customers Pick Us",
        items: [
          { title: "On-time guarantee",          blurb: "We arrive in your time window or your move is discounted." },
          { title: "Bilingual: English & Spanish", blurb: "Easy planning that respects you." },
          { title: "Fully insured",              blurb: "Staff insured with the INS and cargo coverage on every move." },
          { title: "No hidden fees",             blurb: "Flat-rate quotes. The price you see is what you pay." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Free video walk-through",  blurb: "Quick WhatsApp video call tour of your home to estimate accurately." },
          { title: "Flat written quote",       blurb: "All-in price. No hourly surprises." },
          { title: "Move day done right",      blurb: "On time, padded, careful. We move like it's our own." },
          { title: "Unload & smile",           blurb: "Settled in. Everything in the right room." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Luis Diego K.", role: "Homeowner, Rohrmoser",       quote: "Most stress-free move we've ever had. Crew was fast, careful, and kind. Worth every colón." },
          { name: "Lucía R.",      role: "Apartment renter, La Sabana", quote: "Three bedrooms moved in 4 hours. Nothing broken. Final bill matched the quote exactly." },
          { name: "José Pablo D.", role: "Office manager, La Uruca",    quote: "We moved a 30-person office over a weekend. Monday morning, fully working. Incredible." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a move cost?",       a: "Most 1–2 bedroom local moves ₡225 000–₡475 000 flat. Larger and long-distance moves quoted free after a quick walk-through." },
          { q: "Are you insured?",                 a: "Yes — our staff is insured with the INS. We offer standard and full-value coverage options for your belongings." },
          { q: "Do you provide packing?",          a: "Yes — full pack, partial pack, or supplies only. We can also unpack at the new home." },
          { q: "How far in advance to book?",      a: "2–4 weeks ideal, especially weekends. Last-minute? Call us — we often have crew available." },
        ],
      },
      contact: {
        title: "Get a Free Moving Quote", blurb: "Tell us about your move. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Type of move", message: "Tell us about your move",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a move type —",
        services: ["Local home / apartment", "Long-distance", "Office relocation", "Packing only", "Storage"],
      },
      footer: { tagline: "Trusted, careful moves for every family.", hours: "Mon–Sun · 7:00 a.m.–8:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Mudanzas de confianza desde 2009",
        title1: "Mudanzas Sin Estrés,",
        title2: "Grandes o Pequeñas, Bien Hechas",
        subtitle: "Mudanzas dentro de San José y a cualquier lugar de Costa Rica. Equipos cuidadosos, precio fijo, seguro completo. Bilingüe.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Precio Fijo", "Bilingüe EN/ES", "Totalmente Asegurado", "Puntualidad Garantizada"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "Más de 2000 mudanzas",
        trustTitle: "Totalmente Asegurado", trustSubtitle: "Sus cosas protegidas",
      },
      services: {
        title: "Lo Que Mudamos", blurb: "Casas, apartamentos, oficinas — en la misma ciudad o de costa a costa.",
        items: [
          { title: "Mudanzas Locales",         blurb: "Apartamentos, condominios, casas. Equipos cuidadosos, acolchado, sin sorpresas." },
          { title: "Larga Distancia y Bodega", blurb: "Mudanzas a cualquier provincia, con seguimiento. Bodega segura para los días intermedios." },
          { title: "Traslado de Oficinas",     blurb: "Mudanzas fuera de horario para que su negocio no pare. Desarmamos y armamos." },
        ],
      },
      why: {
        title: "Por Qué Nos Eligen",
        items: [
          { title: "Puntualidad garantizada",       blurb: "Llegamos en el horario acordado o le damos un descuento." },
          { title: "Bilingüe: Inglés y Español",    blurb: "Planificación fácil que lo respeta." },
          { title: "Totalmente asegurado",          blurb: "Personal asegurado ante el INS y cobertura de carga en cada mudanza." },
          { title: "Sin cargos ocultos",            blurb: "Cotización fija. El precio que ve es el que paga." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Visita por video gratis",   blurb: "Recorrido rápido por videollamada de WhatsApp para estimar con precisión." },
          { title: "Cotización fija por escrito", blurb: "Precio total. Sin sorpresas por hora." },
          { title: "Día de mudanza bien hecho", blurb: "Puntual, acolchado, cuidadoso. Como si fuera nuestro." },
          { title: "Descargar y sonreír",       blurb: "Instalados. Todo en el cuarto correcto." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Luis Diego K.", role: "Dueño de casa, Rohrmoser",   quote: "La mudanza más tranquila que hemos tenido. El equipo fue rápido, cuidadoso y amable. Vale cada colón." },
          { name: "Lucía R.",      role: "Inquilina, La Sabana",       quote: "Tres cuartos mudados en 4 horas. Nada quebrado. El precio final fue exacto a la cotización." },
          { name: "José Pablo D.", role: "Gerente de oficina, La Uruca", quote: "Mudamos una oficina de 30 personas en un fin de semana. El lunes en la mañana, todo funcionando. Increíble." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una mudanza?",   a: "La mayoría de mudanzas locales de 1–2 cuartos cuestan ₡225 000–₡475 000, precio fijo. Las más grandes y de larga distancia se cotizan gratis tras una visita rápida." },
          { q: "¿Están asegurados?",            a: "Sí — nuestro personal está asegurado ante el INS. Ofrecemos cobertura estándar y de valor completo para sus pertenencias." },
          { q: "¿Hacen empaque?",               a: "Sí — empaque total, parcial o solo materiales. También desempacamos en la casa nueva." },
          { q: "¿Con cuánta anticipación reservo?", a: "Lo ideal es 2–4 semanas, especialmente para fines de semana. ¿De última hora? Llámenos — muchas veces hay disponibilidad." },
        ],
      },
      contact: {
        title: "Reciba una Cotización Gratis", blurb: "Cuéntenos sobre su mudanza. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Tipo de mudanza", message: "Cuéntenos sobre su mudanza",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un tipo —",
        services: ["Casa / apartamento local", "Larga distancia", "Traslado de oficina", "Solo empaque", "Bodega"],
      },
      footer: { tagline: "Mudanzas confiables y cuidadosas para toda familia.", hours: "Lun a dom · 7:00 a. m. – 8:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "moving",
  facts: {
    stats: [
      { value: "13+", labelEn: "Years moving families", labelEs: "Años mudando familias" },
      { value: "9200+", labelEn: "Moves completed", labelEs: "Mudanzas completadas" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación en Google" },
      { value: "Flat rate", valueEs: "Precio fijo", labelEn: "No hourly surprises", labelEs: "Sin sorpresas por hora" },
    ],
    areasEn: ["Pavas", "Rohrmoser", "La Sabana", "La Uruca", "Mata Redonda", "Hatillo", "San José", "Escazú", "Santa Ana", "Belén", "Alajuelita", "Curridabat"],
    areasEs: ["Pavas", "Rohrmoser", "La Sabana", "La Uruca", "Mata Redonda", "Hatillo", "San José", "Escazú", "Santa Ana", "Belén", "Alajuelita", "Curridabat"],
    certsEn: ["Staff Insured with the INS", "Recommended by Neighbors", "Google Reviews", "Cargo Insurance", "Written Flat-Rate Quotes", "Liability Insurance"],
    certsEs: ["Personal asegurado ante el INS", "Recomendados por vecinos", "Reseñas en Google", "Seguro de carga", "Cotización fija por escrito", "Póliza de responsabilidad civil"],
    guaranteeEn: { title: "Flat-rate, written-in-stone", blurb: "The quote you get is the price you pay. If we go over the estimate, the difference is on us. In writing." },
    guaranteeEs: { title: "Precio fijo, escrito en piedra", blurb: "El precio que recibe es el que paga. Si nos pasamos del estimado, la diferencia corre por nuestra cuenta. Por escrito." },
  },
  availability: { en: "Open 7 days · 24/7 booking", es: "Abierto 7 días · Reservas 24/7" },
  assistant: {
    name: "Adriana",
    en: "Hi! I'm Adriana at {business}. Book a free in-home quote 24/7 — local, long-distance, packing included.",
    es: "¡Hola! Soy Adriana de {business}. Reserve una cotización gratis 24/7 — local, larga distancia, empaque incluido.",
    roleEn: "Move coordinator", roleEs: "Coordinadora de mudanzas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "Book 24/7",              blurb: "Online or by phone — instant confirmation." },
      { icon: "Truck",       title: "Local & long-distance",  blurb: "Moves across Costa Rica, every day." },
      { icon: "Banknote",    title: "Flat-rate quotes",       blurb: "Free in-home estimate — no hidden fees." },
      { icon: "ShieldCheck", title: "Fully insured",          blurb: "Cargo coverage included on every move." },
      { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Cuadrillas bilingües en cada camión." },
      { icon: "BadgeCheck",  title: "Same-day available",     blurb: "Last-minute? We have crews on standby." },
    ],
    es: [
      { icon: "Clock",       title: "Reservas 24/7",           blurb: "En línea o por teléfono — confirmación inmediata." },
      { icon: "Truck",       title: "Local y larga distancia", blurb: "Mudanzas a todo Costa Rica, todos los días." },
      { icon: "Banknote",    title: "Precios fijos",           blurb: "Cotización gratis en casa — sin cargos ocultos." },
      { icon: "ShieldCheck", title: "Totalmente asegurado",    blurb: "Cobertura de carga incluida en cada mudanza." },
      { icon: "Languages",   title: "Bilingual EN/ES",         blurb: "Bilingual crews on every truck." },
      { icon: "BadgeCheck",  title: "Mismo día disponible",    blurb: "¿De último momento? Tenemos cuadrillas listas." },
    ],
  },
  galleryCaptions: {
    en: ["Furniture wrapped & loaded", "Boxes organized in the truck", "Welcome to your new home"],
    es: ["Muebles envueltos y cargados", "Cajas ordenadas en el camión", "Bienvenidos a su nuevo hogar"],
  },
};

export default moving;
