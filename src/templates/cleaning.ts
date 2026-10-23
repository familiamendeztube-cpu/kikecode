import { Sparkles, Home, Building2, SprayCan, Clock, ShieldCheck, Languages, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/cleaning`;

const cleaning: BusinessTemplate = {
  slug: "cleaning",
  industry: "House Cleaning",
  industryEs: "Limpieza de Casas",
  websiteType: "Cleaning Company Website",
  defaultServicesField: "Recurring house cleaning, Deep cleaning, Move-in / move-out, Office cleaning, Post-construction, Airbnb turnovers",
  brand: {
    name: "Brilla Cleaning",
    city: "San Antonio, TX",
    phone: "1-800-555-0440",
    phoneHref: "tel:+18005550440",
    email: "hola@brillacleaning.com",
    address: "215 W Commerce St, San Antonio, TX 78205",
    heroIcon: Sparkles,
    palette: {
      primary: "#066794", primaryDark: "#044f70", accent: "#0096D6",
      heroFrom: "#042a3c", heroVia: "#066794", heroTo: "#042a3c",
      heroGlow1: "rgba(0,150,214,0.55)", heroGlow2: "rgba(38,151,128,0.35)",
      heroIconFrom: "#0096D6", heroIconTo: "#066794",
      contactFrom: "#066794", contactTo: "#0096D6",
    },
  },
  serviceIcons: [Home, Building2, SprayCan],
  whyIcons: [Clock, Languages, ShieldCheck, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Same cleaners every time",
        title1: "A Sparkling Clean Home",
        title2: "Without Lifting a Finger",
        subtitle: "Trusted house and office cleaning. Bilingual team. Eco-friendly products. Background-checked.",
        cta1: "Book a Cleaning", cta2: "Call Now",
        badges: ["Same Cleaner", "Eco-Friendly", "Bonded & Insured", "100% Guarantee"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1000+ five-star cleans",
        trustTitle: "Bonded & Insured", trustSubtitle: "Background-checked",
      },
      services: {
        title: "What We Clean", blurb: "Homes, offices, turnovers. Same trusted crew.",
        items: [
          { title: "Recurring Home Cleaning", blurb: "Weekly, bi-weekly or monthly. Same cleaners, every visit, every detail." },
          { title: "Offices & Commercial",    blurb: "After-hours cleaning for offices, clinics, retail. Daily or weekly schedules." },
          { title: "Deep & Move-Out Cleans",  blurb: "Top-to-bottom deep clean. Move-in, move-out, post-construction, Airbnb turnovers." },
        ],
      },
      why: {
        title: "Why Families Trust Us",
        items: [
          { title: "Same cleaner, every time",       blurb: "Build trust. Know your space. Better clean." },
          { title: "Bilingual: English & Spanish",   blurb: "Easy communication that respects you." },
          { title: "Bonded, insured & background-checked", blurb: "Your home is fully protected." },
          { title: "100% satisfaction guarantee",    blurb: "If it's not right, we re-clean for free." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Book online or call",       blurb: "Tell us your space and schedule." },
          { title: "Free in-home walk-through", blurb: "Flat written quote — you know the price." },
          { title: "We clean to a checklist",   blurb: "200-point checklist. Same crew every time." },
          { title: "Love it, guaranteed",       blurb: "Not happy? We come back free." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Stephanie B.", role: "Mom of three",     quote: "The same crew every week. Our house has never been this consistently clean. Worth every penny." },
          { name: "Mark D.",      role: "Office manager",   quote: "Bathrooms, kitchen, conference rooms — spotless every morning. Our team noticed immediately." },
          { name: "Yolanda P.",   role: "Airbnb host",      quote: "Turnover cleanings done perfectly between guests. They text photos when finished." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "What does a typical cleaning cost?", a: "Most homes $120–$240 per visit depending on size. Recurring cleanings save 10–20%." },
          { q: "Do you bring your own supplies?",    a: "Yes — all supplies and eco-friendly products included. We can use your products if preferred." },
          { q: "Are you insured?",                   a: "Yes — fully bonded and insured. Every cleaner is background-checked." },
          { q: "What if I'm not happy?",             a: "We come back and re-clean for free within 24 hours. That's our 100% guarantee." },
        ],
      },
      contact: {
        title: "Book Your First Cleaning", blurb: "Tell us about your space. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your space",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Recurring home", "Deep clean", "Move-in / move-out", "Office", "Airbnb turnover"],
      },
      footer: { tagline: "Trusted cleaning for homes and offices.", hours: "Mon–Sat · 8am–7pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Mismas limpiadoras cada vez",
        title1: "Una Casa Brillante",
        title2: "Sin Mover un Dedo",
        subtitle: "Limpieza confiable de casa y oficina. Equipo bilingüe. Productos ecológicos. Verificadas.",
        cta1: "Reserve una Limpieza", cta2: "Llame Ahora",
        badges: ["Misma Limpiadora", "Ecológico", "Fianza y Seguro", "Garantía 100%"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1000+ limpiezas de 5 estrellas",
        trustTitle: "Fianza y Seguro", trustSubtitle: "Verificadas",
      },
      services: {
        title: "Lo Que Limpiamos", blurb: "Casas, oficinas, rotaciones. Mismo equipo confiable.",
        items: [
          { title: "Limpieza Recurrente",       blurb: "Semanal, quincenal o mensual. Mismas limpiadoras, cada visita." },
          { title: "Oficinas y Comercial",      blurb: "Limpieza fuera de horario para oficinas, clínicas, tiendas." },
          { title: "Limpieza Profunda y Mudanza", blurb: "Limpieza profunda completa. Entrada, salida, post-construcción, Airbnb." },
        ],
      },
      why: {
        title: "Por Qué Las Familias Confían en Nosotros",
        items: [
          { title: "Misma limpiadora, cada vez",  blurb: "Genera confianza. Conoce su espacio. Mejor limpieza." },
          { title: "Bilingüe: Inglés y Español",  blurb: "Comunicación clara que lo respeta." },
          { title: "Con fianza, seguro y verificadas", blurb: "Su casa está totalmente protegida." },
          { title: "Garantía 100% de satisfacción", blurb: "Si no está bien, regresamos gratis." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Reserve en línea o llame",    blurb: "Cuéntenos sobre su espacio y horario." },
          { title: "Visita gratis en casa",       blurb: "Cotización por escrito — usted sabe el precio." },
          { title: "Limpiamos por lista",         blurb: "Lista de 200 puntos. Mismo equipo cada vez." },
          { title: "Le encantará, garantizado",   blurb: "¿No le gusta? Regresamos gratis." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Stephanie B.", role: "Mamá de tres",        quote: "Mismo equipo cada semana. Nuestra casa nunca había estado tan limpia." },
          { name: "Mark D.",      role: "Gerente de oficina",  quote: "Baños, cocina, salas — impecables cada mañana. El equipo lo notó de inmediato." },
          { name: "Yolanda P.",   role: "Anfitriona de Airbnb", quote: "Rotaciones perfectas entre huéspedes. Mandan fotos al terminar." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una limpieza típica?", a: "La mayoría de casas $120–$240 por visita según el tamaño. Recurrentes ahorran 10–20%." },
          { q: "¿Traen sus propios productos?",       a: "Sí — todos los productos ecológicos incluidos. Podemos usar los suyos si prefiere." },
          { q: "¿Están aseguradas?",                  a: "Sí — fianza y seguro completos. Cada limpiadora verificada." },
          { q: "¿Y si no estoy contenta?",            a: "Regresamos y volvemos a limpiar gratis en 24 horas. Esa es nuestra garantía." },
        ],
      },
      contact: {
        title: "Reserve Su Primera Limpieza", blurb: "Cuéntenos sobre su espacio. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su espacio",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Casa recurrente", "Limpieza profunda", "Mudanza entrada / salida", "Oficina", "Rotación Airbnb"],
      },
      footer: { tagline: "Limpieza confiable para casas y oficinas.", hours: "Lun–Sáb · 8am–7pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  facts: {
    stats: [
      { value: "10+", labelEn: "Years cleaning", labelEs: "Años limpiando" },
      { value: "5,200+", labelEn: "Homes served", labelEs: "Hogares atendidos" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "100%", labelEn: "Satisfaction guarantee", labelEs: "Satisfacción garantizada" },
    ],
    areasEn: ["San Antonio", "Alamo Heights", "Stone Oak", "Boerne", "Helotes", "Schertz", "Live Oak", "Universal City", "Leon Valley", "Olmos Park", "Terrell Hills", "Castle Hills"],
    areasEs: ["San Antonio", "Alamo Heights", "Stone Oak", "Boerne", "Helotes", "Schertz", "Live Oak", "Universal City", "Leon Valley", "Olmos Park", "Terrell Hills", "Castle Hills"],
    certsEn: ["IICRC Certified", "Green Seal Cleaning Products", "$1M Liability Insurance", "Bonded Cleaners", "Background-Checked Staff", "Pet & Child Safe Solutions"],
    certsEs: ["Certificación IICRC", "Productos Green Seal", "Seguro $1M", "Personal afianzado", "Antecedentes verificados", "Seguro para mascotas y niños"],
    guaranteeEn: { title: "24-hour re-clean guarantee", blurb: "Not happy with any room? Tell us within 24 hours and we re-clean it — no charge, no questions." },
    guaranteeEs: { title: "Garantía de re-limpieza en 24 horas", blurb: "¿No te gustó algún cuarto? Avísanos en 24 horas y lo limpiamos otra vez — sin costo, sin preguntas." },
  },
  availability: { en: "Open 24/7 · Same-day cleans available", es: "Abierto 24/7 · Limpieza el mismo día disponible" },
  assistant: {
    name: "Lucía",
    en: "Hi! I'm Lucía at {business}. Our team is reachable 24/7 — book a one-time or recurring clean in 60 seconds.",
    es: "¡Hola! Soy Lucía de {business}. Estamos disponibles 24/7 — agenda una limpieza única o recurrente en 60 segundos.",
    roleEn: "Booking assistant", roleEs: "Asistente de reservas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "24/7 booking",          blurb: "Schedule recurring or last-minute cleans any time." },
      { icon: "Sparkles",    title: "Eco supplies included", blurb: "Non-toxic products safe for kids & pets." },
      { icon: "DollarSign",  title: "Flat-rate by home size",blurb: "Studios from $89 · 3BR from $179." },
      { icon: "ShieldCheck", title: "Bonded & insured",      blurb: "Background-checked cleaners on every visit." },
      { icon: "Languages",   title: "Bilingüe EN/ES",        blurb: "Equipos bilingües en cada turno." },
      { icon: "BadgeCheck",  title: "Re-clean guarantee",    blurb: "Not happy? We come back free within 24h." },
    ],
    es: [
      { icon: "Clock",       title: "Reservas 24/7",          blurb: "Programa limpiezas recurrentes o de último momento." },
      { icon: "Sparkles",    title: "Productos ecológicos",   blurb: "Productos no tóxicos seguros para niños y mascotas." },
      { icon: "DollarSign",  title: "Precio fijo por tamaño", blurb: "Estudios desde $89 · 3 recámaras desde $179." },
      { icon: "ShieldCheck", title: "Fianza y seguro",        blurb: "Personal con verificación de antecedentes." },
      { icon: "Languages",   title: "Bilingual EN/ES",        blurb: "Bilingual teams on every shift." },
      { icon: "BadgeCheck",  title: "Garantía de re-limpieza",blurb: "¿No te gustó? Regresamos gratis en 24h." },
    ],
  },
  galleryCaptions: {
    en: ["Deep clean — full kitchen", "Move-out bathroom shine", "Recurring vacuum & dust"],
    es: ["Limpieza profunda — cocina completa", "Brillo de baño para mudanza", "Aspirado y sacudido recurrente"],
  },
};

export default cleaning;
