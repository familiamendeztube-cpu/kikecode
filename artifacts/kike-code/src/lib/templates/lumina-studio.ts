import { Palette, Globe, Wand2, Star, Zap, ThumbsUp, Award, Layers } from "lucide-react";
import type { BusinessTemplate } from "./types";

/**
 * LUMINA — a fictional bilingual digital creative studio.
 * This template uses the custom "leonardo" site variant: a cinematic
 * dark-canvas editorial renderer (leonardo-site.tsx) instead of the
 * shared BusinessSite component.
 */
const luminaStudio: BusinessTemplate = {
  slug: "lumina-studio",
  industry: "Creative Studio",
  industryEs: "Estudio Creativo",
  websiteType: "Creative Portfolio Website",
  defaultServicesField: "Branding, Logos, Websites, AI content, Social media design, Video reels",
  siteVariant: "leonardo",
  brand: {
    name: "LUMINA",
    city: "Miami",
    phone: "(555) 010-0099",
    phoneHref: "tel:+15550100099",
    email: "hola@luminastudio.co",
    address: "88 NE 2nd Ave, Miami, FL 33132",
    heroIcon: Wand2,
    palette: {
      primary: "#6e60ee", primaryDark: "#5245c9", accent: "#d25fff",
      heroFrom: "#000000", heroVia: "#0a0a0a", heroTo: "#000000",
      heroGlow1: "rgba(110,96,238,0.50)", heroGlow2: "rgba(210,95,255,0.30)",
      heroIconFrom: "#6e60ee", heroIconTo: "#d25fff",
      contactFrom: "#6e60ee", contactTo: "#d25fff",
    },
  },
  media: {
    hero: "/template-assets/lumina-studio/lumina_v2_hero.jpg",
    teamPortrait: "/template-assets/lumina-studio/lumina_v2_g1.jpg",
    gallery: [
      "/template-assets/lumina-studio/lumina_v2_g1.jpg",
      "/template-assets/lumina-studio/lumina_v2_g2.jpg",
      "/template-assets/lumina-studio/lumina_v2_g3.jpg",
      "/template-assets/lumina-studio/lumina_v2_g4.jpg",
      "/template-assets/lumina-studio/lumina_v2_g5.jpg",
      "/template-assets/lumina-studio/lumina_v2_g6.jpg",
      "/template-assets/lumina-studio/lumina_v2_g7.jpg",
      "/template-assets/lumina-studio/lumina_v2_g8.jpg",
    ]
  },
  serviceIcons: [Palette, Globe, Wand2],
  whyIcons: [Star, Zap, ThumbsUp, Award],
  content: {
    en: {
      nav: { services: "Work", why: "Studio", process: "Process", testimonials: "Clients", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "A bilingual creative studio for bold brands",
        title1: "Your Ideas.",
        title2: "Yours to Create.",
        subtitle: "Branding, websites, and AI-powered content for businesses that refuse to look ordinary. Made in Miami, en inglés y español.",
        cta1: "Start a Project", cta2: "See Our Work",
        badges: ["Branding", "Websites", "AI Content", "Bilingual EN/ES"],
        ratingTitle: "5.0 / 5", ratingSubtitle: "120+ brands launched",
        trustTitle: "Full-Service Studio", trustSubtitle: "Strategy to launch",
      },
      services: {
        title: "What We Create", blurb: "Every pixel with intention.",
        items: [
          { title: "Brand Identity", blurb: "Logos, color systems, and visual languages that make your business unmistakable." },
          { title: "Websites & Digital", blurb: "Fast, striking websites engineered to convert — designed and built in-house." },
          { title: "AI Content Studio", blurb: "AI-generated visuals, product shots, and campaign imagery directed by human taste." },
        ],
      },
      why: {
        title: "Why Brands Choose LUMINA",
        items: [
          { title: "Design-obsessed", blurb: "We sweat the details other studios skip — type, motion, and rhythm." },
          { title: "Fast turnarounds", blurb: "Concepts in days, not months. Momentum is part of the craft." },
          { title: "Truly bilingual", blurb: "Campaigns born in English and Spanish — never translated as an afterthought." },
          { title: "End to end", blurb: "Strategy, design, build, and launch under one roof." },
        ],
      },
      process: {
        title: "How We Work",
        items: [
          { title: "Discover", blurb: "We learn your business, audience, and ambition." },
          { title: "Concept", blurb: "Bold directions presented fast — you pick the one that feels right." },
          { title: "Create", blurb: "Design, content, and build happen in tight creative sprints." },
          { title: "Launch", blurb: "We ship, measure, and keep your brand evolving." },
        ],
      },
      testimonials: {
        title: "What Clients Say",
        items: [
          { name: "Valeria M.", role: "Founder, Café Oro", quote: "LUMINA rebranded us in three weeks. Sales are up 40% and people photograph our cups." },
          { name: "Derek S.", role: "CEO, Solara Fitness", quote: "The website they built feels like a movie. Our sign-ups doubled the first month." },
          { name: "Camila R.", role: "Owner, Flor & Sal", quote: "They think in Spanish and English at the same time. Our campaigns finally sound like us." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a project cost?", a: "Brand identities start at $2,500 and websites at $4,000. Every project gets a fixed quote up front — no surprises." },
          { q: "How fast can you deliver?", a: "First concepts within 5 business days. Most full projects launch in 3–6 weeks." },
          { q: "Do you work with AI?", a: "Yes — we direct AI tools to generate visuals and content, always refined by our designers. You get speed without losing taste." },
          { q: "Do you work outside Miami?", a: "Absolutely. Half our clients are remote across the U.S. and Latin America. Everything runs smoothly online." },
        ],
      },
      contact: {
        title: "Start Your Project", blurb: "Tell us what you're building. We'll reply within one business day.",
        name: "Your name", phone: "Phone", service: "What do you need?", message: "Tell us about your project",
        submit: "Request a Quote", success: "Thanks — we'll be in touch within one business day.",
        pick: "— Pick a service —",
        services: ["Brand identity", "Website", "AI content", "Social media design", "Full package"],
      },
      footer: { tagline: "A bilingual creative studio for bold brands.", hours: "Mon–Fri · 9am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Trabajo", why: "Estudio", process: "Proceso", testimonials: "Clientes", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Un estudio creativo bilingüe para marcas audaces",
        title1: "Tus Ideas.",
        title2: "Tuyas para Crear.",
        subtitle: "Branding, sitios web y contenido con IA para negocios que se niegan a verse ordinarios. Hecho en Miami, in English y en español.",
        cta1: "Iniciar un Proyecto", cta2: "Ver Nuestro Trabajo",
        badges: ["Branding", "Sitios Web", "Contenido IA", "Bilingüe EN/ES"],
        ratingTitle: "5.0 / 5", ratingSubtitle: "120+ marcas lanzadas",
        trustTitle: "Estudio Integral", trustSubtitle: "De estrategia a lanzamiento",
      },
      services: {
        title: "Lo Que Creamos", blurb: "Cada pixel con intención.",
        items: [
          { title: "Identidad de Marca", blurb: "Logos, sistemas de color y lenguajes visuales que hacen su negocio inconfundible." },
          { title: "Sitios Web y Digital", blurb: "Sitios rápidos e impactantes diseñados para convertir — creados totalmente en casa." },
          { title: "Estudio de Contenido IA", blurb: "Visuales, fotos de producto e imágenes de campaña generadas con IA y dirigidas con criterio humano." },
        ],
      },
      why: {
        title: "Por Qué las Marcas Eligen LUMINA",
        items: [
          { title: "Obsesión por el diseño", blurb: "Cuidamos los detalles que otros estudios ignoran — tipografía, movimiento y ritmo." },
          { title: "Entregas rápidas", blurb: "Conceptos en días, no meses. El impulso es parte del oficio." },
          { title: "Verdaderamente bilingüe", blurb: "Campañas nacidas en español e inglés — nunca traducidas como una ocurrencia tardía." },
          { title: "De principio a fin", blurb: "Estrategia, diseño, desarrollo y lanzamiento bajo un mismo techo." },
        ],
      },
      process: {
        title: "Cómo Trabajamos",
        items: [
          { title: "Descubrir", blurb: "Conocemos su negocio, su audiencia y su ambición." },
          { title: "Conceptualizar", blurb: "Direcciones audaces presentadas rápido — usted elige la que le convence." },
          { title: "Crear", blurb: "Diseño, contenido y desarrollo en sprints creativos intensos." },
          { title: "Lanzar", blurb: "Publicamos, medimos y seguimos evolucionando su marca." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen los Clientes",
        items: [
          { name: "Valeria M.", role: "Fundadora, Café Oro", quote: "LUMINA nos renovó la marca en tres semanas. Las ventas subieron 40% y la gente fotografía nuestros vasos." },
          { name: "Derek S.", role: "CEO, Solara Fitness", quote: "El sitio web que construyeron se siente como una película. Nuestras inscripciones se duplicaron el primer mes." },
          { name: "Camila R.", role: "Dueña, Flor & Sal", quote: "Piensan en español y en inglés al mismo tiempo. Nuestras campañas por fin suenan como nosotros." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un proyecto?", a: "Las identidades de marca comienzan en $2,500 y los sitios web en $4,000. Cada proyecto recibe una cotización fija por adelantado — sin sorpresas." },
          { q: "¿Qué tan rápido entregan?", a: "Primeros conceptos en 5 días hábiles. La mayoría de los proyectos completos se lanzan en 3–6 semanas." },
          { q: "¿Trabajan con IA?", a: "Sí — dirigimos herramientas de IA para generar visuales y contenido, siempre refinados por nuestros diseñadores. Velocidad sin perder el buen gusto." },
          { q: "¿Trabajan fuera de Miami?", a: "Por supuesto. La mitad de nuestros clientes están en EE.UU. y Latinoamérica. Todo fluye perfectamente en línea." },
        ],
      },
      contact: {
        title: "Inicie Su Proyecto", blurb: "Cuéntenos qué está construyendo. Respondemos en un día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "¿Qué necesita?", message: "Cuéntenos sobre su proyecto",
        submit: "Solicitar Cotización", success: "Gracias — le contactaremos dentro de un día hábil.",
        pick: "— Elija un servicio —",
        services: ["Identidad de marca", "Sitio web", "Contenido IA", "Diseño para redes", "Paquete completo"],
      },
      footer: { tagline: "Un estudio creativo bilingüe para marcas audaces.", hours: "Lun–Vie · 9am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default luminaStudio;
