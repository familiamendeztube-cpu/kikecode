import { Bug, Shield, Home, Sparkles, Clock, Languages, ShieldCheck, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/pest-control`;

const pestControl: BusinessTemplate = {
  slug: "pest-control",
  industry: "Pest Control",
  industryEs: "Control de Plagas",
  websiteType: "Home Services Website",
  defaultServicesField: "General extermination, Termite treatment, Rodent control, Mosquito fumigation, Recurring prevention, Commercial pest service",
  brand: {
    name: "ShieldGuard Pest Control",
    city: "Limón",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@shieldguardpest.com",
    address: "De la iglesia católica, 100 m oeste y 50 m sur, Limón centro, Limón",
    heroIcon: Bug,
    palette: {
      primary: "#16A34A", primaryDark: "#15803d", accent: "#CA8A04",
      heroFrom: "#0b1f12", heroVia: "#14321f", heroTo: "#0b1f12",
      heroGlow1: "rgba(22,163,74,0.55)", heroGlow2: "rgba(202,138,4,0.32)",
      heroIconFrom: "#16A34A", heroIconTo: "#CA8A04",
      contactFrom: "#16A34A", contactTo: "#14532d",
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
        subtitle: "Extermination, termites, rodents, mosquitoes and year-round prevention. Bilingual team. Family & pet-safe options. Health permit up to date.",
        cta1: "Get Free Inspection", cta2: "Call Now",
        badges: ["Same-Day Service", "Bilingual EN/ES", "Pet-Safe Options", "Health Permit Up to Date"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ homes protected",
        trustTitle: "Health Permit Up to Date", trustSubtitle: "Insured with the INS",
      },
      services: {
        title: "What We Treat", blurb: "From a single infestation to year-round prevention.",
        items: [
          { title: "General Extermination", blurb: "Cockroaches, ants, scorpions, spiders, wasps, fleas. Fast knockdown and lasting control." },
          { title: "Termites & Rodents",    blurb: "Inspections, baiting, exclusion, and treatment that protects your wood and structure." },
          { title: "Recurring Prevention",  blurb: "Quarterly plans, including mosquito fumigation, that keep pests out before they get in. Guaranteed." },
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
          { name: "Karla B.",       role: "Neighbor in Cieneguita",         quote: "Roaches gone after one visit. Friendly, on time, and explained everything clearly." },
          { name: "Luis Diego A.",  role: "Restaurant owner, Limón centro", quote: "Our quarterly service keeps the kitchen spotless and pest-free. Health inspections don't worry us anymore." },
          { name: "Melissa R.",     role: "Property manager, Limón",        quote: "Handled a termite problem fast and saved us a fortune. Our go-to for every property." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does treatment cost?",  a: "Most one-time treatments run ₡60 000–₡150 000 depending on the pest and size. Recurring plans start around ₡20 000/month. We quote in writing." },
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
      footer: { tagline: "Reliable pest protection for the whole community.", hours: "Mon–Sat · 7:00 a.m.–7:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Tratamientos el mismo día y de emergencia",
        title1: "Protección Sin Plagas para",
        title2: "Su Hogar y Su Negocio",
        subtitle: "Fumigación, comején, roedores, zancudos y prevención todo el año. Equipo bilingüe. Opciones seguras para familia y mascotas. Permiso sanitario de funcionamiento al día.",
        cta1: "Inspección Gratis", cta2: "Llame Ahora",
        badges: ["Servicio el Mismo Día", "Bilingüe EN/ES", "Seguro para Mascotas", "Permiso Sanitario al Día"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ hogares protegidos",
        trustTitle: "Permiso Sanitario al Día", trustSubtitle: "Asegurados ante el INS",
      },
      services: {
        title: "Lo Que Tratamos", blurb: "Desde una sola plaga hasta prevención todo el año.",
        items: [
          { title: "Fumigación General",    blurb: "Cucarachas, hormigas, alacranes, arañas, avispas y pulgas. Eliminación rápida y control duradero." },
          { title: "Comején y Roedores",    blurb: "Inspecciones, cebos, sellado y tratamiento que protege la madera y la estructura." },
          { title: "Prevención Recurrente", blurb: "Planes trimestrales, con fumigación contra zancudos, que mantienen las plagas afuera. Garantizado." },
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
          { title: "Llámenos o escríbanos", blurb: "Cuéntenos qué está viendo — escuchamos primero." },
          { title: "Inspección gratis",     blurb: "Identificamos la plaga, el origen y cotizamos por escrito." },
          { title: "Tratamiento dirigido",  blurb: "Tratamos, sellamos entradas y protegemos su casa." },
          { title: "Protección continua",   blurb: "Un plan recurrente opcional mantiene las plagas lejos para siempre." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Karla B.",      role: "Vecina de Cieneguita",                 quote: "Las cucarachas desaparecieron después de una visita. Amables, puntuales y explicaron todo claro." },
          { name: "Luis Diego A.", role: "Dueño de restaurante, Limón centro",   quote: "El servicio trimestral mantiene la cocina impecable y sin plagas. Ya las inspecciones de salud no nos preocupan." },
          { name: "Melissa R.",    role: "Administradora de propiedades, Limón", quote: "Resolvieron un problema de comején rápido y nos ahorraron una fortuna. Nuestros favoritos para todas las propiedades." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el tratamiento?",      a: "La mayoría de tratamientos únicos cuestan entre ₡60 000 y ₡150 000 según la plaga y el tamaño. Los planes recurrentes, desde ₡20 000 al mes. Cotizamos por escrito." },
          { q: "¿Es seguro para niños y mascotas?",   a: "Sí — usamos productos de baja toxicidad y dirigidos, y le decimos exactamente cuándo es seguro volver a las áreas tratadas." },
          { q: "¿Qué tan rápido pueden venir?",       a: "La mayoría de semanas ofrecemos servicio el mismo día o al día siguiente. Las plagas activas tienen prioridad." },
          { q: "¿Garantizan su trabajo?",             a: "Sí. Si las plagas cubiertas regresan entre visitas programadas, las tratamos de nuevo sin costo adicional." },
        ],
      },
      contact: {
        title: "Reciba una Inspección Gratis", blurb: "Cuéntenos qué está enfrentando. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema de plagas",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Fumigación general", "Tratamiento de comején", "Control de roedores", "Plan recurrente", "Otro"],
      },
      footer: { tagline: "Protección confiable contra plagas para toda la comunidad.", hours: "Lun a sáb · 7:00 a. m. – 7:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 7:00 a.m.–6:00 p.m.", es: "Lun a sáb · 7:00 a. m. – 6:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. What pests are bothering you?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Qué plagas le molestan?",
    roleEn: "Pest Advisor", roleEs: "Asesora de Control de Plagas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`, `${assets}/gal5.jpg`],
    teamPortrait: "",
  },
  offers: {
    en: [
      { icon: "ShieldCheck", title: "Health permit up to date", blurb: "Trained, professional technicians." },
      { icon: "Leaf", title: "Family & pet safe", blurb: "Effective treatments, safe for your home." },
      { icon: "Clock", title: "Same-day service", blurb: "Fast relief when pests show up." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
    ],
    es: [
      { icon: "ShieldCheck", title: "Permiso sanitario al día", blurb: "Técnicos capacitados y profesionales." },
      { icon: "Leaf", title: "Seguro para familia y mascotas", blurb: "Tratamientos efectivos y seguros." },
      { icon: "Clock", title: "Servicio el mismo día", blurb: "Alivio rápido cuando hay plagas." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["Large-area spraying", "Insect identification", "Pest inspection", "Beetle control"],
    es: ["Fumigación de áreas grandes", "Identificación de insectos", "Inspección de plagas", "Control de escarabajos"],
  },
};

export default pestControl;
