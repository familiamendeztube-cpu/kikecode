import { Bug, Shield, Home, Sparkles, Clock, Languages, ShieldCheck, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";

const pestControl: BusinessTemplate = {
  slug: "pest-control",
  industry: "Pest Control",
  industryEs: "Control de Plagas",
  websiteType: "Home Services Website",
  defaultServicesField: "General extermination, Termite treatment, Rodent control, Recurring prevention, Commercial pest service",
  brand: {
    name: "ShieldGuard Pest Control",
    city: "Dallas",
    phone: "(555) 010-0012",
    phoneHref: "tel:+15550100012",
    email: "hello@shieldguardpest.com",
    address: "418 Oak Lawn Ave, Dallas, TX 75204",
    heroIcon: Bug,
    palette: {
      primary: "#16A34A", primaryDark: "#15803d", accent: "#CA8A04",
      heroFrom: "#0b1f12", heroVia: "#14321f", heroTo: "#0b1f12",
      heroGlow1: "rgba(22,163,74,0.55)", heroGlow2: "rgba(202,138,4,0.32)",
      heroIconFrom: "#16A34A", heroIconTo: "#CA8A04",
      contactFrom: "#16A34A", contactTo: "#CA8A04",
    },
  },
  serviceIcons: [Shield, Home, Sparkles],
  whyIcons: [Clock, Languages, ShieldCheck, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Same-day & emergency treatments",
        title1: "Pest-Free Protection for",
        title2: "Your Home & Business",
        subtitle: "Extermination, termites, rodents, and year-round prevention. Bilingual team. Family & pet-safe options. Licensed & insured.",
        cta1: "Get Free Inspection", cta2: "Call Now",
        badges: ["Same-Day Service", "Bilingual EN/ES", "Pet-Safe Options", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ homes protected",
        trustTitle: "Licensed & Insured", trustSubtitle: "Certified applicators",
      },
      services: {
        title: "What We Treat", blurb: "From a single infestation to year-round prevention.",
        items: [
          { title: "General Extermination", blurb: "Ants, roaches, spiders, wasps, fleas. Fast knockdown and lasting control." },
          { title: "Termites & Rodents",    blurb: "Inspections, baiting, exclusion, and treatment that protects your structure." },
          { title: "Recurring Prevention",  blurb: "Quarterly plans that keep pests out before they get in. Guaranteed." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "Fast response",                blurb: "Same-day and emergency visits when you need them." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication that respects you." },
          { title: "Family & pet-safe",            blurb: "Low-toxicity, targeted treatments done safely." },
          { title: "Satisfaction guaranteed",      blurb: "If pests come back between visits, so do we — free." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us", blurb: "Tell us what you're seeing — we listen first." },
          { title: "Free inspection",    blurb: "We identify the pest, the source, and quote in writing." },
          { title: "Targeted treatment", blurb: "We treat, seal entry points, and protect your home." },
          { title: "Ongoing protection", blurb: "Optional recurring plan keeps pests away for good." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Karen B.",  role: "Homeowner",       quote: "Roaches gone after one visit. Friendly, on time, and explained everything clearly." },
          { name: "Miguel A.", role: "Restaurant owner", quote: "Our quarterly service keeps the kitchen spotless and pest-free. Inspectors love us now." },
          { name: "Tanya R.",  role: "Property manager", quote: "Handled a termite problem fast and saved us a fortune. Our go-to for every property." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does treatment cost?",  a: "Most one-time treatments run $120–$300 depending on the pest and size. Recurring plans start around $40/month. We quote in writing." },
          { q: "Is it safe for kids and pets?",  a: "Yes — we use low-toxicity, targeted products and tell you exactly when it's safe to return to treated areas." },
          { q: "How fast can you come out?",     a: "Most weeks we offer same-day or next-day service. Active infestations get priority." },
          { q: "Do you guarantee your work?",    a: "Yes. If covered pests return between scheduled visits, we re-treat at no extra charge." },
        ],
      },
      contact: {
        title: "Get a Free Inspection", blurb: "Tell us what you're dealing with. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe the pest problem",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["General extermination", "Termite treatment", "Rodent control", "Recurring plan", "Other"],
      },
      footer: { tagline: "Reliable pest protection for the whole community.", hours: "Mon–Sat · 7am–7pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Tratamientos el mismo día y de emergencia",
        title1: "Protección Sin Plagas para",
        title2: "Su Hogar y Su Negocio",
        subtitle: "Exterminio, termitas, roedores y prevención todo el año. Equipo bilingüe. Opciones seguras para familia y mascotas. Con licencia y seguro.",
        cta1: "Inspección Gratis", cta2: "Llame Ahora",
        badges: ["Servicio el Mismo Día", "Bilingüe EN/ES", "Seguro para Mascotas", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ hogares protegidos",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Aplicadores certificados",
      },
      services: {
        title: "Lo Que Tratamos", blurb: "Desde una sola plaga hasta prevención todo el año.",
        items: [
          { title: "Exterminio General",    blurb: "Hormigas, cucarachas, arañas, avispas, pulgas. Eliminación rápida y control duradero." },
          { title: "Termitas y Roedores",   blurb: "Inspecciones, cebos, sellado y tratamiento que protege su estructura." },
          { title: "Prevención Recurrente", blurb: "Planes trimestrales que mantienen las plagas afuera. Garantizado." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Respuesta rápida",            blurb: "Visitas el mismo día y de emergencia cuando las necesite." },
          { title: "Bilingüe: Inglés y Español",  blurb: "Comunicación clara que lo respeta." },
          { title: "Seguro para familia y mascotas", blurb: "Tratamientos de baja toxicidad y aplicados con cuidado." },
          { title: "Satisfacción garantizada",    blurb: "Si las plagas regresan entre visitas, nosotros también — gratis." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o mándenos mensaje", blurb: "Cuéntenos qué está viendo — escuchamos primero." },
          { title: "Inspección gratis",           blurb: "Identificamos la plaga, el origen y cotizamos por escrito." },
          { title: "Tratamiento dirigido",        blurb: "Tratamos, sellamos entradas y protegemos su hogar." },
          { title: "Protección continua",         blurb: "Un plan recurrente opcional mantiene las plagas lejos para siempre." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Karen B.",  role: "Dueña de casa",          quote: "Las cucarachas desaparecieron tras una visita. Amables, puntuales y explicaron todo claro." },
          { name: "Miguel A.", role: "Dueño de restaurante",   quote: "El servicio trimestral mantiene la cocina impecable y sin plagas. Los inspectores nos aman." },
          { name: "Tanya R.",  role: "Administradora",          quote: "Resolvieron un problema de termitas rápido y nos ahorraron una fortuna. Nuestros favoritos." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el tratamiento?",      a: "La mayoría de tratamientos únicos cuestan $120–$300 según la plaga y el tamaño. Los planes recurrentes desde $40/mes. Cotizamos por escrito." },
          { q: "¿Es seguro para niños y mascotas?",   a: "Sí — usamos productos de baja toxicidad y dirigidos, y le decimos exactamente cuándo es seguro volver a las áreas tratadas." },
          { q: "¿Qué tan rápido pueden venir?",       a: "La mayoría de semanas ofrecemos mismo día o siguiente. Las plagas activas tienen prioridad." },
          { q: "¿Garantizan su trabajo?",             a: "Sí. Si las plagas cubiertas regresan entre visitas programadas, las tratamos de nuevo sin costo adicional." },
        ],
      },
      contact: {
        title: "Reciba una Inspección Gratis", blurb: "Cuéntenos qué está enfrentando. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema de plagas",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Exterminio general", "Tratamiento de termitas", "Control de roedores", "Plan recurrente", "Otro"],
      },
      footer: { tagline: "Protección confiable contra plagas para toda la comunidad.", hours: "Lun–Sáb · 7am–7pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default pestControl;
