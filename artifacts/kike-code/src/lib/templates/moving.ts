import { Truck, Boxes, Package, Home, Clock, ShieldCheck, Languages, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";

const moving: BusinessTemplate = {
  slug: "moving",
  industry: "Moving Services",
  industryEs: "Mudanzas",
  websiteType: "Local Business Website",
  defaultServicesField: "Local moves, Long-distance, Apartment moves, Office relocation, Packing services, Furniture assembly, Storage",
  brand: {
    name: "Reliable Movers Co",
    city: "Phoenix",
    phone: "(555) 010-0009",
    phoneHref: "tel:+15550100009",
    email: "hello@reliablemovers.com",
    address: "900 Cactus Rd, Phoenix, AZ 85021",
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
        subtitle: "Local and long-distance moving. Careful crews, fair flat pricing, full insurance. Bilingual team.",
        cta1: "Get Free Quote", cta2: "Call Now",
        badges: ["Flat Pricing", "Bilingual EN/ES", "Fully Insured", "On-Time Guarantee"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "2000+ moves completed",
        trustTitle: "Fully Insured", trustSubtitle: "Your stuff is protected",
      },
      services: {
        title: "What We Move", blurb: "Homes, apartments, offices — local or coast to coast.",
        items: [
          { title: "Local Home Moves",        blurb: "Apartments, condos, houses. Careful crews, padding, dollies, no surprises." },
          { title: "Long-Distance & Storage", blurb: "Cross-state moves with tracking. Secure storage for in-between days." },
          { title: "Office Relocation",       blurb: "After-hours moves so your business doesn't stop. We disassemble and reassemble." },
        ],
      },
      why: {
        title: "Why Customers Pick Us",
        items: [
          { title: "On-time guarantee",          blurb: "We arrive in your window or your move is discounted." },
          { title: "Bilingual: English & Spanish", blurb: "Easy planning that respects you." },
          { title: "Fully licensed & insured",   blurb: "DOT-licensed, full coverage on every move." },
          { title: "No hidden fees",             blurb: "Flat-rate quotes. The price you see is what you pay." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Free video walk-through",  blurb: "Quick FaceTime tour of your home to estimate accurately." },
          { title: "Flat written quote",       blurb: "All-in price. No hourly surprises." },
          { title: "Move day done right",      blurb: "On time, padded, careful. We move like it's our own." },
          { title: "Unload & smile",           blurb: "Settled in. Everything in the right room." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Brian K.",    role: "Homeowner",        quote: "Most stress-free move we've ever had. Crew was fast, careful, and kind. Worth every dollar." },
          { name: "Lucia R.",    role: "Apartment renter", quote: "Three bedrooms moved in 4 hours. Nothing broken. Final bill matched the quote exactly." },
          { name: "Mike D.",     role: "Office manager",   quote: "We moved a 30-person office over a weekend. Monday morning, fully working. Incredible." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a move cost?",       a: "Most 1–2 bedroom local moves $450–$950 flat. Larger and long-distance quoted free after a quick walk-through." },
          { q: "Are you insured?",                 a: "Yes — fully licensed and insured. We offer standard and full-value coverage options." },
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
      footer: { tagline: "Trusted, careful moves for every family.", hours: "Mon–Sun · 7am–8pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Mudanceros de confianza desde 2009",
        title1: "Mudanzas Sin Estrés,",
        title2: "Grandes o Pequeñas, Bien Hechas",
        subtitle: "Mudanzas locales y de larga distancia. Equipos cuidadosos, precio fijo, seguro completo. Bilingüe.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Precio Fijo", "Bilingüe EN/ES", "Totalmente Asegurado", "Puntualidad Garantizada"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "2000+ mudanzas",
        trustTitle: "Totalmente Asegurado", trustSubtitle: "Sus cosas protegidas",
      },
      services: {
        title: "Lo Que Mudamos", blurb: "Casas, apartamentos, oficinas — local o de costa a costa.",
        items: [
          { title: "Mudanzas Locales",         blurb: "Apartamentos, condos, casas. Equipos cuidadosos, acolchado, sin sorpresas." },
          { title: "Larga Distancia y Bodega", blurb: "Mudanzas entre estados con seguimiento. Bodega segura para días intermedios." },
          { title: "Reubicación de Oficina",   blurb: "Mudanzas fuera de horario para no parar su negocio. Desarmamos y armamos." },
        ],
      },
      why: {
        title: "Por Qué Nos Eligen",
        items: [
          { title: "Puntualidad garantizada",       blurb: "Llegamos en su ventana o le damos descuento." },
          { title: "Bilingüe: Inglés y Español",    blurb: "Planeación fácil que lo respeta." },
          { title: "Con licencia DOT y seguro",     blurb: "Cobertura completa en cada mudanza." },
          { title: "Sin cargos ocultos",            blurb: "Cotización fija. El precio que ve es el que paga." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Visita por video gratis",   blurb: "Tour por FaceTime para estimar con precisión." },
          { title: "Cotización fija por escrito", blurb: "Precio total. Sin sorpresas por hora." },
          { title: "Día de mudanza bien hecho", blurb: "Puntual, acolchado, cuidadoso. Como si fuera nuestro." },
          { title: "Descargar y sonreír",       blurb: "Instalados. Todo en el cuarto correcto." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Brian K.",    role: "Dueño de casa",        quote: "La mudanza más sin estrés que hemos tenido. El equipo fue rápido, cuidadoso y amable." },
          { name: "Lucia R.",    role: "Inquilina",            quote: "Tres recámaras mudadas en 4 horas. Nada roto. El precio final fue exacto." },
          { name: "Mike D.",     role: "Gerente de oficina",   quote: "Mudamos una oficina de 30 personas en un fin de semana. Lunes funcionando. Increíble." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una mudanza?",   a: "La mayoría de mudanzas locales de 1–2 recámaras $450–$950 fijo. Larga distancia cotizado gratis." },
          { q: "¿Están asegurados?",            a: "Sí — con licencia completa y seguro. Ofrecemos cobertura estándar y de valor completo." },
          { q: "¿Hacen empaque?",               a: "Sí — empaque total, parcial o solo materiales. También desempacamos en la nueva casa." },
          { q: "¿Con cuánta anticipación?",     a: "2–4 semanas ideal, especialmente fines de semana. ¿Última hora? Llámenos — muchas veces hay disponibilidad." },
        ],
      },
      contact: {
        title: "Reciba Cotización Gratis", blurb: "Cuéntenos sobre su mudanza. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Tipo de mudanza", message: "Cuéntenos sobre su mudanza",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un tipo —",
        services: ["Casa / apartamento local", "Larga distancia", "Reubicación de oficina", "Solo empaque", "Bodega"],
      },
      footer: { tagline: "Mudanzas confiables y cuidadosas para toda familia.", hours: "Lun–Dom · 7am–8pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default moving;
