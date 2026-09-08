import { PartyPopper, Cake, Gift, Music, Clock, ShieldCheck, Languages, Star } from "lucide-react";
import type { BusinessTemplate } from "./types";

const events: BusinessTemplate = {
  slug: "events",
  industry: "Event Decorations / Party Rentals",
  industryEs: "Decoraciones / Fiestas",
  websiteType: "Local Business Website",
  defaultServicesField: "Balloon arches, Backdrops, Table & chair rentals, Linens, Centerpieces, Quinceañera packages, Setup & teardown",
  brand: {
    name: "Fiesta Decoraciones",
    city: "Los Angeles",
    phone: "(555) 010-0008",
    phoneHref: "tel:+15550100008",
    email: "hello@fiestadecoraciones.com",
    address: "800 Cesar Chavez Ave, Los Angeles, CA 90033",
    heroIcon: PartyPopper,
    palette: {
      primary: "#c026d3", primaryDark: "#a21caf", accent: "#f0abfc",
      heroFrom: "#3b0764", heroVia: "#581c87", heroTo: "#2e1065",
      heroGlow1: "rgba(192,38,211,0.55)", heroGlow2: "rgba(240,171,252,0.4)",
      heroIconFrom: "#d946ef", heroIconTo: "#86198f",
      contactFrom: "#c026d3", contactTo: "#701a75",
    },
  },
  serviceIcons: [Cake, Gift, Music],
  whyIcons: [Clock, Languages, ShieldCheck, Star],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Making memories since 2012",
        title1: "Unforgettable Decor",
        title2: "for Every Celebration",
        subtitle: "Quinceañeras, weddings, birthdays, baby showers. Stunning setups, fair prices, bilingual team.",
        cta1: "Get a Quote", cta2: "Call Now",
        badges: ["500+ Events", "Bilingual EN/ES", "Setup & Teardown", "5-Star Reviews"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "500+ celebrations",
        trustTitle: "Insured Setup Crew", trustSubtitle: "Worry-free events",
      },
      services: {
        title: "What We Decorate", blurb: "From intimate parties to grand celebrations.",
        items: [
          { title: "Quinceañeras & Sweet 16s", blurb: "Themed setups, backdrops, balloon arches, throne chair, custom centerpieces." },
          { title: "Weddings & Showers",       blurb: "Romantic arches, head tables, draping, florals, photo walls — every detail." },
          { title: "Birthdays & Kid Parties",  blurb: "Themed balloons, character backdrops, dessert tables, photo opps kids love." },
        ],
      },
      why: {
        title: "Why Families Choose Us",
        items: [
          { title: "Always on time",              blurb: "We set up early so your event starts perfectly." },
          { title: "Bilingual planning",          blurb: "Comfortable conversations in English & Spanish." },
          { title: "Insured & professional crew", blurb: "We protect the venue and clean up after." },
          { title: "5-star Google rating",        blurb: "Real reviews from real celebrations." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Tell us your vision",     blurb: "Share theme, colors, venue, and budget." },
          { title: "Get a design proposal",   blurb: "Visual mockup + clear written quote." },
          { title: "We set up the magic",     blurb: "Arrive early, set up everything, photo-ready." },
          { title: "Celebrate & we clean up", blurb: "You enjoy the party. We handle the rest." },
        ],
      },
      testimonials: {
        title: "What Families Say",
        items: [
          { name: "Rosa M.",     role: "Quinceañera mom",     quote: "My daughter cried when she saw the setup. Absolutely magical. Worth every dollar." },
          { name: "Jamie L.",    role: "Bride",               quote: "They turned our basic venue into a dream wedding. Photographer kept saying 'wow'." },
          { name: "Carmen T.",   role: "Mom of twins",        quote: "Made our girls' birthday unforgettable. Setup was even better than the photos online." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much do packages start at?",     a: "Birthday setups start around $350. Full quinceañera packages from $1,800. We design to your budget." },
          { q: "Do you deliver and set up?",         a: "Yes — every package includes delivery, full setup, and teardown after the event." },
          { q: "How far in advance should I book?",  a: "For quinceañeras and weddings, 3+ months ideal. For birthdays, 3–4 weeks is comfortable." },
          { q: "Can we customize themes & colors?",  a: "Yes — every event is built around your colors, theme, and personality." },
        ],
      },
      contact: {
        title: "Request a Quote", blurb: "Tell us about your event. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Type of event", message: "Tell us about your vision",
        submit: "Send Request", success: "Thank you — we'll be in touch shortly.",
        pick: "— Pick an event type —",
        services: ["Quinceañera", "Wedding", "Birthday", "Baby shower", "Other"],
      },
      footer: { tagline: "Making every celebration unforgettable.", hours: "Tue–Sun · 10am–7pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Creando recuerdos desde 2012",
        title1: "Decoración Inolvidable",
        title2: "para Cada Celebración",
        subtitle: "Quinceañeras, bodas, cumpleaños, baby showers. Montajes hermosos, precios justos, equipo bilingüe.",
        cta1: "Pida Cotización", cta2: "Llame Ahora",
        badges: ["500+ Eventos", "Bilingüe EN/ES", "Montaje y Desmontaje", "Reseñas 5 Estrellas"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "500+ celebraciones",
        trustTitle: "Equipo Asegurado", trustSubtitle: "Eventos sin preocupación",
      },
      services: {
        title: "Lo Que Decoramos", blurb: "De fiestas íntimas a grandes celebraciones.",
        items: [
          { title: "Quinceañeras y Sweet 16",  blurb: "Montajes temáticos, fondos, arcos de globos, silla trono, centros de mesa." },
          { title: "Bodas y Showers",          blurb: "Arcos románticos, mesa principal, drapeado, flores, paredes de fotos." },
          { title: "Cumpleaños y Niños",       blurb: "Globos temáticos, fondos de personajes, mesas de postres, fotos increíbles." },
        ],
      },
      why: {
        title: "Por Qué Las Familias Nos Eligen",
        items: [
          { title: "Siempre puntuales",            blurb: "Montamos temprano para que su evento empiece perfecto." },
          { title: "Planeación bilingüe",          blurb: "Conversaciones cómodas en inglés y español." },
          { title: "Equipo asegurado y pro",       blurb: "Protegemos el lugar y limpiamos después." },
          { title: "5 estrellas en Google",        blurb: "Reseñas reales de celebraciones reales." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Cuéntenos su visión",      blurb: "Comparta tema, colores, lugar y presupuesto." },
          { title: "Reciba propuesta",         blurb: "Boceto visual + cotización clara por escrito." },
          { title: "Montamos la magia",        blurb: "Llegamos temprano, montamos todo, listo para foto." },
          { title: "Celebre y limpiamos",      blurb: "Usted disfruta. Nosotros del resto." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Las Familias",
        items: [
          { name: "Rosa M.",     role: "Mamá de quinceañera", quote: "Mi hija lloró al ver el montaje. Absolutamente mágico. Valió cada dólar." },
          { name: "Jamie L.",    role: "Novia",               quote: "Convirtieron un lugar básico en una boda de ensueño. El fotógrafo no paraba de decir wow." },
          { name: "Carmen T.",   role: "Mamá de gemelas",     quote: "Hicieron el cumpleaños inolvidable. El montaje fue aún mejor que las fotos en línea." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Desde cuánto empiezan los paquetes?", a: "Cumpleaños desde $350. Quinceañeras completas desde $1,800. Diseñamos a su presupuesto." },
          { q: "¿Hacen entrega y montaje?",            a: "Sí — cada paquete incluye entrega, montaje completo y desmontaje después." },
          { q: "¿Con cuánta anticipación reservar?",   a: "Para quinceañeras y bodas, 3+ meses ideal. Para cumpleaños, 3–4 semanas." },
          { q: "¿Personalizan temas y colores?",       a: "Sí — cada evento se construye alrededor de sus colores, tema y personalidad." },
        ],
      },
      contact: {
        title: "Pida Una Cotización", blurb: "Cuéntenos sobre su evento. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Tipo de evento", message: "Cuéntenos su visión",
        submit: "Enviar Solicitud", success: "Gracias — nos pondremos en contacto pronto.",
        pick: "— Elija un tipo de evento —",
        services: ["Quinceañera", "Boda", "Cumpleaños", "Baby shower", "Otro"],
      },
      footer: { tagline: "Haciendo cada celebración inolvidable.", hours: "Mar–Dom · 10am–7pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default events;
