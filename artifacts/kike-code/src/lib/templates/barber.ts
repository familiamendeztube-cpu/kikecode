import { Scissors, Sparkles, Baby, Star, Clock, ThumbsUp, Award, ShieldCheck } from "lucide-react";
import type { BusinessTemplate } from "./types";

const barber: BusinessTemplate = {
  slug: "barber",
  industry: "Barber Shop",
  industryEs: "Barbería",
  websiteType: "Beauty & Grooming Website",
  defaultServicesField: "Haircuts, Fades & tapers, Beard trims, Hot towel shaves, Kids cuts, Line-ups",
  brand: {
    name: "El Rey Barbershop",
    city: "Chicago",
    phone: "(555) 010-0011",
    phoneHref: "tel:+15550100011",
    email: "hola@elreybarbershop.com",
    address: "522 Wabash Ave, Chicago, IL 60605",
    heroIcon: Scissors,
    palette: {
      primary: "#0EA5A4", primaryDark: "#0f766e", accent: "#D4AF37",
      heroFrom: "#0a1414", heroVia: "#0f1f1e", heroTo: "#080f0f",
      heroGlow1: "rgba(14,165,164,0.50)", heroGlow2: "rgba(212,175,55,0.30)",
      heroIconFrom: "#0EA5A4", heroIconTo: "#D4AF37",
      contactFrom: "#0EA5A4", contactTo: "#D4AF37",
    },
  },
  serviceIcons: [Scissors, Sparkles, Baby],
  whyIcons: [Star, Clock, ThumbsUp, Award],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Master barbers serving the neighborhood since 2014",
        title1: "Sharp Cuts & Clean Fades for",
        title2: "Men, Teens & Kids",
        subtitle: "Precision fades, beard sculpting, hot towel shaves, and walk-ins welcome. Bilingual barbers. Book online or just drop by.",
        cta1: "Book a Chair", cta2: "Call Now",
        badges: ["Walk-Ins Welcome", "Bilingual EN/ES", "Master Barbers", "Kid-Friendly"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1,000+ happy clients",
        trustTitle: "Licensed Barbers", trustSubtitle: "Sanitized stations",
      },
      services: {
        title: "What We Do", blurb: "Classic craft, modern style.",
        items: [
          { title: "Cuts & Fades", blurb: "Skin fades, tapers, scissor cuts, and clean line-ups tailored to your style." },
          { title: "Beard & Hot Towel", blurb: "Beard sculpting, straight-razor edges, and a relaxing hot towel finish." },
          { title: "Kids Cuts", blurb: "Patient, friendly cuts for little ones. We make first haircuts fun." },
        ],
      },
      why: {
        title: "Why Clients Keep Coming Back",
        items: [
          { title: "Master barbers", blurb: "Years behind the chair — every cut done with skill and care." },
          { title: "Little to no wait", blurb: "Book online or walk in. We respect your time." },
          { title: "Comfortable, friendly vibe", blurb: "Good music, good conversation, no rush." },
          { title: "Consistent every visit", blurb: "Tell us once and your barber remembers your style." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Book or walk in", blurb: "Reserve a chair online or just come by." },
          { title: "Tell us your style", blurb: "Show a photo or let your barber recommend." },
          { title: "Sit back & relax", blurb: "Precision cut, beard work, and a hot towel finish." },
          { title: "Walk out fresh", blurb: "Looking sharp and ready for whatever's next." },
        ],
      },
      testimonials: {
        title: "What Clients Say",
        items: [
          { name: "Marcus D.", role: "Regular client", quote: "Best fade in the city. My barber nails it every single time. Never going anywhere else." },
          { name: "Sofia R.", role: "Mom of two", quote: "They're so patient with my boys. First haircuts were stress-free and the cuts looked great." },
          { name: "James T.", role: "Groom", quote: "Got the full beard and hot towel before my wedding. Felt like a king. Highly recommend." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you take walk-ins?", a: "Yes! Walk-ins are always welcome. Booking online just means little to no wait." },
          { q: "How much is a haircut?", a: "Cuts start at $25, fades at $30, and beard work at $15. Combo prices available." },
          { q: "Do you cut kids' hair?", a: "Absolutely — we love kids' cuts and make first haircuts a fun, easy experience." },
          { q: "What are your hours?", a: "We're open Tuesday through Sunday. Walk in or book the chair that fits your schedule." },
        ],
      },
      contact: {
        title: "Book Your Chair", blurb: "Tell us what you need and when. We'll confirm your spot fast.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Preferred day & time",
        submit: "Request Appointment", success: "Thanks — we'll text you to confirm your chair.",
        pick: "— Pick a service —",
        services: ["Haircut", "Fade / taper", "Beard trim", "Hot towel shave", "Kids cut"],
      },
      footer: { tagline: "Sharp cuts and clean fades for the whole neighborhood.", hours: "Tue–Sun · 9am–8pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Barberos maestros sirviendo al barrio desde 2014",
        title1: "Cortes Precisos y Fades Limpios para",
        title2: "Hombres, Jóvenes y Niños",
        subtitle: "Fades de precisión, diseño de barba, afeitadas con toalla caliente y aceptamos sin cita. Barberos bilingües. Reserve en línea o pásese.",
        cta1: "Reserve su Silla", cta2: "Llame Ahora",
        badges: ["Sin Cita Bienvenidos", "Bilingüe EN/ES", "Barberos Maestros", "Para Niños"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1,000+ clientes felices",
        trustTitle: "Barberos con Licencia", trustSubtitle: "Estaciones desinfectadas",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Oficio clásico, estilo moderno.",
        items: [
          { title: "Cortes y Fades", blurb: "Fades al ras, degradados, cortes a tijera y delineados limpios a su estilo." },
          { title: "Barba y Toalla Caliente", blurb: "Diseño de barba, filos a navaja y un relajante acabado con toalla caliente." },
          { title: "Cortes para Niños", blurb: "Cortes pacientes y amables para los pequeños. Hacemos el primer corte divertido." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Regresan",
        items: [
          { title: "Barberos maestros", blurb: "Años detrás de la silla — cada corte con habilidad y cuidado." },
          { title: "Poca o nada de espera", blurb: "Reserve en línea o pásese. Respetamos su tiempo." },
          { title: "Ambiente cómodo y amable", blurb: "Buena música, buena plática, sin prisas." },
          { title: "Consistente en cada visita", blurb: "Díganos una vez y su barbero recuerda su estilo." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Reserve o pásese", blurb: "Aparte su silla en línea o simplemente venga." },
          { title: "Díganos su estilo", blurb: "Muestre una foto o deje que su barbero le recomiende." },
          { title: "Relájese", blurb: "Corte de precisión, trabajo de barba y acabado con toalla caliente." },
          { title: "Salga renovado", blurb: "Luciendo fresco y listo para lo que sigue." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Marcus D.", role: "Cliente frecuente", quote: "El mejor fade de la ciudad. Mi barbero lo logra cada vez. No voy a ningún otro lado." },
          { name: "Sofía R.", role: "Mamá de dos", quote: "Son muy pacientes con mis hijos. Los primeros cortes fueron sin estrés y quedaron geniales." },
          { name: "James T.", role: "Novio", quote: "Me hice la barba completa y la toalla caliente antes de mi boda. Me sentí como un rey. Muy recomendado." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Aceptan sin cita?", a: "¡Sí! Siempre son bienvenidos sin cita. Reservar en línea solo significa poca o nada de espera." },
          { q: "¿Cuánto cuesta un corte?", a: "Los cortes desde $25, los fades desde $30 y la barba desde $15. Hay precios de combo disponibles." },
          { q: "¿Cortan cabello de niños?", a: "Por supuesto — nos encantan los cortes de niños y hacemos del primer corte algo divertido y fácil." },
          { q: "¿Cuál es su horario?", a: "Abrimos de martes a domingo. Pásese o reserve la silla que se ajuste a su horario." },
        ],
      },
      contact: {
        title: "Reserve su Silla", blurb: "Díganos qué necesita y cuándo. Confirmamos su lugar rápido.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Día y hora preferidos",
        submit: "Solicitar Cita", success: "Gracias — le mandamos un texto para confirmar su silla.",
        pick: "— Elija un servicio —",
        services: ["Corte de cabello", "Fade / degradado", "Recorte de barba", "Afeitada con toalla caliente", "Corte de niño"],
      },
      footer: { tagline: "Cortes precisos y fades limpios para todo el barrio.", hours: "Mar–Dom · 9am–8pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default barber;
