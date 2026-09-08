import { HardHat, Building2, Home, Hammer, Clock, Languages, ShieldCheck, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";

const construction: BusinessTemplate = {
  slug: "construction",
  industry: "Construction",
  industryEs: "Construcción",
  websiteType: "Construction Website",
  defaultServicesField: "Custom homes, Additions & remodels, Commercial build-outs, Concrete & foundations, Project management",
  brand: {
    name: "Brightstone Construction",
    city: "Toronto, ON",
    phone: "(555) 010-0011",
    phoneHref: "tel:+15550100011",
    email: "hello@brightstoneconstruction.com",
    address: "100 King Street W, Toronto, ON",
    heroIcon: HardHat,
    palette: {
      primary: "#BA5B3F", primaryDark: "#8a4530", accent: "#6EC1E4",
      heroFrom: "#2a1e1a", heroVia: "#3D3935", heroTo: "#1f1714",
      heroGlow1: "rgba(186,91,63,0.55)", heroGlow2: "rgba(110,193,228,0.25)",
      heroIconFrom: "#BA5B3F", heroIconTo: "#8a4530",
      contactFrom: "#BA5B3F", contactTo: "#3D3935",
    },
  },
  serviceIcons: [Home, Building2, Hammer],
  whyIcons: [Clock, Languages, ShieldCheck, Sparkles],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Building trust since 2010",
        title1: "Custom Homes &",
        title2: "Premium Construction You Can Count On",
        subtitle: "Custom homes, additions, and commercial builds. Honest pricing. Bilingual team. Licensed & fully insured.",
        cta1: "Get Free Quote", cta2: "Call Now",
        badges: ["15+ Years", "Bilingual EN/ES", "Free Estimates", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "150+ projects delivered",
        trustTitle: "Licensed & Insured", trustSubtitle: "Fully bonded",
      },
      services: {
        title: "What We Build", blurb: "Three specialties. One trusted crew.",
        items: [
          { title: "Custom Homes",       blurb: "Ground-up new builds, from blueprint to keys. Premium finishes and craftsmanship." },
          { title: "Additions & Remodels", blurb: "Kitchens, bathrooms, basements, second-floor additions. Live in your home while we work." },
          { title: "Commercial Builds",  blurb: "Office build-outs, retail spaces, restaurants. Finished on schedule, on budget." },
        ],
      },
      why: {
        title: "Why Owners Trust Us",
        items: [
          { title: "15 years of experience",        blurb: "150+ completed projects across the region." },
          { title: "Bilingual: English & Spanish",  blurb: "Clear communication with you and every subcontractor." },
          { title: "Licensed, bonded & insured",    blurb: "Your investment is fully protected." },
          { title: "Fixed-price contracts",         blurb: "No surprise change orders. What we quote is what you pay." },
        ],
      },
      process: {
        title: "How We Work",
        items: [
          { title: "Free consultation",     blurb: "We meet on-site to understand your vision and budget." },
          { title: "Detailed proposal",     blurb: "Plans, materials, timeline, fixed price — all in writing." },
          { title: "Build with weekly updates", blurb: "Photos and progress reports every Friday." },
          { title: "Final walk-through",    blurb: "You sign off when every detail is perfect." },
        ],
      },
      testimonials: {
        title: "What Owners Say",
        items: [
          { name: "Michael T.", role: "Homeowner",      quote: "Built our dream home on time and on budget. Best contractor we've ever worked with." },
          { name: "Sarah P.",   role: "Restaurant owner", quote: "They finished our build-out 2 weeks early. Quality work, no surprises." },
          { name: "David R.",   role: "Property developer", quote: "We've used them on 4 projects now. Honest, skilled, accountable." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a custom home cost?", a: "Most custom builds range $250–$500/sq ft depending on finishes and site. We give detailed written estimates after a free consultation." },
          { q: "How long will my project take?",   a: "Bathroom remodel: 3–5 weeks. Kitchen: 6–8 weeks. Whole-home addition: 4–6 months. Custom home: 9–14 months." },
          { q: "Are you licensed and insured?",    a: "Yes — fully licensed general contractor, bonded, and carrying $5M liability and workers' comp coverage." },
          { q: "Do you handle permits and inspections?", a: "Yes — we manage every permit, inspection, and code approval as part of the project." },
        ],
      },
      contact: {
        title: "Get a Free Quote", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Project type", message: "Tell us about your project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a project type —",
        services: ["Custom home", "Addition", "Kitchen / bath remodel", "Commercial build-out", "Concrete / foundation", "Other"],
      },
      footer: { tagline: "Premium construction across the region.", hours: "Mon–Sat · 7am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Construyendo confianza desde 2010",
        title1: "Casas Personalizadas y",
        title2: "Construcción Premium en la que Puede Confiar",
        subtitle: "Casas personalizadas, ampliaciones y obras comerciales. Precios honestos. Equipo bilingüe. Con licencia y seguro.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["15+ Años", "Bilingüe EN/ES", "Cotizaciones Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "150+ proyectos entregados",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Totalmente asegurados",
      },
      services: {
        title: "Lo Que Construimos", blurb: "Tres especialidades. Un equipo de confianza.",
        items: [
          { title: "Casas Personalizadas", blurb: "Construcción nueva desde cero, del plano a las llaves. Acabados y mano de obra premium." },
          { title: "Ampliaciones y Remodelaciones", blurb: "Cocinas, baños, sótanos, segundos pisos. Usted vive en casa mientras trabajamos." },
          { title: "Obras Comerciales",    blurb: "Oficinas, locales, restaurantes. Terminamos a tiempo y dentro del presupuesto." },
        ],
      },
      why: {
        title: "Por Qué los Dueños Confían en Nosotros",
        items: [
          { title: "15 años de experiencia",        blurb: "150+ proyectos terminados en la región." },
          { title: "Bilingüe: Inglés y Español",    blurb: "Comunicación clara con usted y cada contratista." },
          { title: "Con licencia, fianza y seguro", blurb: "Su inversión está totalmente protegida." },
          { title: "Contratos de precio fijo",      blurb: "Sin sorpresas. Lo que cotizamos es lo que paga." },
        ],
      },
      process: {
        title: "Cómo Trabajamos",
        items: [
          { title: "Consulta gratuita",         blurb: "Nos reunimos en sitio para entender su visión y presupuesto." },
          { title: "Propuesta detallada",       blurb: "Planos, materiales, cronograma, precio fijo — todo por escrito." },
          { title: "Construimos con reportes semanales", blurb: "Fotos y avance cada viernes." },
          { title: "Inspección final",          blurb: "Usted aprueba cuando cada detalle esté perfecto." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen los Dueños",
        items: [
          { name: "Michael T.", role: "Propietario",         quote: "Construyeron la casa de nuestros sueños a tiempo y dentro del presupuesto. El mejor contratista con el que hemos trabajado." },
          { name: "Sarah P.",   role: "Dueña de restaurante", quote: "Terminaron nuestra obra 2 semanas antes. Trabajo de calidad, sin sorpresas." },
          { name: "David R.",   role: "Desarrollador",        quote: "Los hemos usado en 4 proyectos. Honestos, hábiles, responsables." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una casa personalizada?", a: "La mayoría de construcciones cuestan $250–$500 por pie cuadrado según acabados y terreno. Damos estimados detallados por escrito tras una consulta gratuita." },
          { q: "¿Cuánto tarda mi proyecto?", a: "Remodelación de baño: 3–5 semanas. Cocina: 6–8 semanas. Ampliación completa: 4–6 meses. Casa personalizada: 9–14 meses." },
          { q: "¿Tienen licencia y seguro?", a: "Sí — contratista general con licencia completa, fianza, y cobertura de $5M de responsabilidad y seguro de trabajadores." },
          { q: "¿Manejan los permisos e inspecciones?", a: "Sí — gestionamos cada permiso, inspección y aprobación de código como parte del proyecto." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Tipo de proyecto", message: "Cuéntenos sobre su proyecto",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un tipo de proyecto —",
        services: ["Casa personalizada", "Ampliación", "Remodelación de cocina/baño", "Obra comercial", "Concreto/cimiento", "Otro"],
      },
      footer: { tagline: "Construcción premium en toda la región.", hours: "Lun–Sáb · 7am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default construction;
