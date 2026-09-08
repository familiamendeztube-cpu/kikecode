import { Scissors, Palette, Sparkles, Brush, Clock, ShieldCheck, Languages, Star } from "lucide-react";
import type { BusinessTemplate } from "./types";

const beauty: BusinessTemplate = {
  slug: "beauty",
  industry: "Beauty Salon / Barber",
  industryEs: "Salón de Belleza / Barbería",
  websiteType: "Barber Website",
  defaultServicesField: "Haircuts, Color, Highlights, Blowouts, Manicure / Pedicure, Waxing, Bridal services, Men's grooming",
  brand: {
    name: "Bella Beauty Studio",
    city: "Orlando",
    phone: "(555) 010-0007",
    phoneHref: "tel:+15550100007",
    email: "hello@bellabeautystudio.com",
    address: "700 Park Ave, Orlando, FL 32803",
    heroIcon: Scissors,
    palette: {
      primary: "#2098D1", primaryDark: "#1772a0", accent: "#DFF300",
      heroFrom: "#0a1929", heroVia: "#1e3a5f", heroTo: "#0a1929",
      heroGlow1: "rgba(32,152,209,0.55)", heroGlow2: "rgba(223,243,0,0.3)",
      heroIconFrom: "#2098D1", heroIconTo: "#1772a0",
      contactFrom: "#2098D1", contactTo: "#1772a0",
    },
  },
  serviceIcons: [Palette, Sparkles, Brush],
  whyIcons: [Clock, Languages, ShieldCheck, Star],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Booking", testimonials: "Reviews", faq: "FAQ", contact: "Visit", call: "Call" },
      hero: {
        eyebrow: "Boutique salon experience",
        title1: "Look Stunning,",
        title2: "Feel Even More Confident",
        subtitle: "Hair, color, nails, lashes, brows. Talented bilingual stylists. Easy online booking.",
        cta1: "Book Online", cta2: "Call Now",
        badges: ["Top Stylists", "Premium Products", "Bilingual EN/ES", "Online Booking"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1200+ five-star reviews",
        trustTitle: "Master Stylists", trustSubtitle: "10+ years experience",
      },
      services: {
        title: "Our Services", blurb: "Beauty done your way.",
        items: [
          { title: "Hair & Color",        blurb: "Cut, color, highlights, balayage, keratin. Stylists who actually listen." },
          { title: "Nails & Lashes",      blurb: "Manicure, pedicure, gel, acrylic, lash extensions, brow shaping." },
          { title: "Bridal & Special",    blurb: "Wedding hair & makeup, quinceañera, special events. On-site available." },
        ],
      },
      why: {
        title: "Why Clients Love Us",
        items: [
          { title: "Open 6 days, evenings too", blurb: "Easy to fit in around work and school." },
          { title: "Bilingual stylists",         blurb: "Comfortable for English & Spanish clients." },
          { title: "Licensed cosmetologists",    blurb: "Every stylist licensed and continuously trained." },
          { title: "Loved on Instagram",         blurb: "10k+ followers love the looks we create." },
        ],
      },
      process: {
        title: "How Booking Works",
        items: [
          { title: "Browse stylists",        blurb: "Pick the artist whose style speaks to you." },
          { title: "Book online instantly",  blurb: "Real-time availability, no phone tag." },
          { title: "Get a friendly reminder", blurb: "Text the day before so you don't forget." },
          { title: "Leave glowing",          blurb: "Tag us — we love seeing your new look." },
        ],
      },
      testimonials: {
        title: "What Clients Say",
        items: [
          { name: "Sofia R.",   role: "Bride",            quote: "They did my wedding hair and makeup — I cried happy tears. Stunning is an understatement." },
          { name: "Jasmine T.", role: "Color client",     quote: "Finally found my color person. Balayage looks more natural than I imagined." },
          { name: "Andrea G.",  role: "Regular client",   quote: "Three years coming here. Every cut is perfect. The whole vibe feels luxurious." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do I need an appointment?",       a: "Yes — book online or call. We do sometimes have same-day openings, so it never hurts to ask." },
          { q: "What's your cancellation policy?", a: "24-hour notice is appreciated. Last-minute cancels under 24 hrs may incur a small fee." },
          { q: "Do you do men's cuts?",            a: "Yes — modern men's cuts, beard work, color and gray-blending. Skilled with all hair types." },
          { q: "Do you do on-site for weddings?",  a: "Yes — bridal team travels for weddings, quinceañeras and special events." },
        ],
      },
      contact: {
        title: "Book Your Visit", blurb: "Reserve a chair or ask about a special look. We reply within hours.",
        name: "Your name", phone: "Phone", service: "Service you'd like", message: "Tell us what you have in mind",
        submit: "Send Request", success: "Thank you — we'll text you back soon.",
        pick: "— Pick a service —",
        services: ["Haircut", "Color / highlights", "Nails / lashes", "Bridal package", "Other"],
      },
      footer: { tagline: "Boutique beauty for every confident client.", hours: "Tue–Sun · 9am–8pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Reservar", testimonials: "Reseñas", faq: "FAQ", contact: "Visite", call: "Llame" },
      hero: {
        eyebrow: "Experiencia de salón boutique",
        title1: "Luzca Hermosa,",
        title2: "Siéntase Aún Más Segura",
        subtitle: "Cabello, color, uñas, pestañas, cejas. Estilistas bilingües con talento. Reservación fácil en línea.",
        cta1: "Reserve en Línea", cta2: "Llame Ahora",
        badges: ["Mejores Estilistas", "Productos Premium", "Bilingüe EN/ES", "Reserva en Línea"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1200+ reseñas de 5 estrellas",
        trustTitle: "Estilistas Maestras", trustSubtitle: "10+ años de experiencia",
      },
      services: {
        title: "Nuestros Servicios", blurb: "Belleza hecha a su manera.",
        items: [
          { title: "Cabello y Color",       blurb: "Corte, color, mechas, balayage, keratina. Estilistas que escuchan." },
          { title: "Uñas y Pestañas",       blurb: "Manicure, pedicure, gel, acrílico, extensiones de pestañas, cejas." },
          { title: "Novias y Especiales",   blurb: "Boda, quinceañera, eventos especiales. Disponible a domicilio." },
        ],
      },
      why: {
        title: "Por Qué Las Clientas Nos Aman",
        items: [
          { title: "Abierto 6 días, tardes",     blurb: "Fácil de coordinar con trabajo y escuela." },
          { title: "Estilistas bilingües",       blurb: "Cómodo para clientas en inglés y español." },
          { title: "Cosmetólogas con licencia",  blurb: "Cada estilista con licencia y entrenamiento continuo." },
          { title: "Amado en Instagram",         blurb: "10k+ seguidoras aman los looks que creamos." },
        ],
      },
      process: {
        title: "Cómo Reservar",
        items: [
          { title: "Vea las estilistas",       blurb: "Elija a la artista cuyo estilo le hable." },
          { title: "Reserve al instante",      blurb: "Disponibilidad en tiempo real, sin llamadas." },
          { title: "Reciba recordatorio",      blurb: "Texto el día antes para que no olvide." },
          { title: "Salga brillando",          blurb: "Etiquétenos — nos encanta ver su nuevo look." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Las Clientas",
        items: [
          { name: "Sofia R.",   role: "Novia",                  quote: "Hicieron mi cabello y maquillaje de boda — lloré de felicidad. Hermoso es poco." },
          { name: "Jasmine T.", role: "Clienta de color",       quote: "Por fin encontré a mi colorista. El balayage se ve más natural de lo que imaginé." },
          { name: "Andrea G.",  role: "Clienta regular",        quote: "Tres años viniendo aquí. Cada corte es perfecto. Todo el ambiente se siente lujoso." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Necesito cita?",                  a: "Sí — reserve en línea o llame. A veces hay disponibilidad el mismo día, así que pregunte." },
          { q: "¿Cuál es la política de cancelación?", a: "Se aprecia aviso de 24 horas. Cancelaciones tardías pueden tener un cargo pequeño." },
          { q: "¿Hacen cortes de hombre?",         a: "Sí — cortes modernos, barba, color y cobertura de canas. Expertos en todo tipo de cabello." },
          { q: "¿Hacen servicio a domicilio?",     a: "Sí — equipo de novias viaja para bodas, quinceañeras y eventos especiales." },
        ],
      },
      contact: {
        title: "Reserve Su Visita", blurb: "Aparte su silla o pregunte por un look especial. Respondemos en horas.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio que desea", message: "Cuéntenos qué tiene en mente",
        submit: "Enviar Solicitud", success: "Gracias — le responderemos pronto.",
        pick: "— Elija un servicio —",
        services: ["Corte", "Color / mechas", "Uñas / pestañas", "Paquete de novia", "Otro"],
      },
      footer: { tagline: "Belleza boutique para cada clienta segura.", hours: "Mar–Dom · 9am–8pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default beauty;
