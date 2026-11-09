import { Flame, Fence, Layers, Wrench, Clock, Award, ShieldCheck, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/welding`;

const welding: BusinessTemplate = {
  slug: "welding",
  industry: "Welding & Iron Works",
  industryEs: "Herrería",
  websiteType: "Construction Website",
  defaultServicesField: "Gates, Railings, Fences, Custom metalwork, Welding repairs, Security doors",
  brand: {
    name: "IronForge Welding",
    city: "Desamparados",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hello@ironforgewelding.com",
    address: "Del cementerio de Desamparados, 300 m sur y 75 m este, Desamparados, San José",
    heroIcon: Flame,
    palette: {
      primary: "#EA580C", primaryDark: "#9A3412", accent: "#DC2626",
      heroFrom: "#1c1917", heroVia: "#292524", heroTo: "#171210",
      heroGlow1: "rgba(234,88,12,0.55)", heroGlow2: "rgba(220,38,38,0.35)",
      heroIconFrom: "#F97316", heroIconTo: "#DC2626",
      contactFrom: "#EA580C", contactTo: "#DC2626",
    },
  },
  serviceIcons: [Fence, Layers, Wrench],
  whyIcons: [Clock, Award, ShieldCheck, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Custom iron work since 2006",
        title1: "Welding & Iron Works",
        title2: "Built Strong, Made to Last",
        subtitle: "Gates, railings, fences, custom metalwork and repairs. Bilingual craftsmen. Free estimates. Quality welds.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["18+ Years", "Bilingual EN/ES", "Free Estimates", "Insured with the INS"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ custom projects",
        trustTitle: "Insured with the INS", trustSubtitle: "Fully protected",
      },
      services: {
        title: "What We Forge", blurb: "Custom iron, welded to last a lifetime.",
        items: [
          { title: "Gates & Fences",       blurb: "Driveway gates, security fences and railings — strong, secure and beautifully finished." },
          { title: "Custom Metalwork",     blurb: "Stair railings, balconies, security doors and one-of-a-kind designs built to spec." },
          { title: "Welding & Repairs",    blurb: "Mobile welding, trailer and structural repairs, broken hinges and frames fixed fast." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "18 years of experience",       blurb: "Hundreds of gates, railings and custom pieces built across the south of San José." },
          { title: "Master craftsmanship",         blurb: "Clean welds, precise fit, finishes that resist rust for years." },
          { title: "Insured with the INS",         blurb: "Your property is fully protected from start to finish." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication on every detail of your design." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",    blurb: "Tell us your idea — send a photo or sketch if you have one." },
          { title: "Free on-site estimate", blurb: "We measure, talk design and quote in writing." },
          { title: "We fabricate & install", blurb: "Custom-built in our shop, then installed clean and level." },
          { title: "Final walk-through",    blurb: "We check the finish and you approve the work." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Héctor V.",  role: "Neighbor in San Rafael Arriba", quote: "My new driveway gate is a work of art and built like a tank. Worth every colón." },
          { name: "Brenda S.",  role: "Neighbor in Aserrí",            quote: "The stair railing they made is gorgeous. Clean welds, and they explained every detail." },
          { name: "Fabián D.",  role: "Business owner, San Miguel",    quote: "They built our security doors and fence fast. Solid work, fair price, true craftsmen." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does custom iron work cost?", a: "Every piece is built to spec, so we give free written estimates. Driveway gates typically start around ₡1 250 000." },
          { q: "Do you offer mobile welding?",         a: "Yes — we bring the shop to you for repairs on gates, trailers, equipment and structural steel." },
          { q: "How long does a custom project take?", a: "Most gates and railings take 2–4 weeks from design approval to install, depending on complexity." },
          { q: "Are you insured?",                     a: "Yes — our staff is insured with the INS, and we carry liability insurance." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Gate", "Railing", "Fence", "Custom metalwork", "Welding repair"],
      },
      footer: { tagline: "Custom welding and iron works across the south of San José.", hours: "Mon–Sat · 7:00 a.m.–6:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Herrería a la medida desde 2006",
        title1: "Herrería y Trabajo en Hierro",
        title2: "Fuerte y Hecho para Durar",
        subtitle: "Portones, barandas, verjas, trabajos a la medida y reparaciones. Artesanos bilingües. Cotizaciones gratis. Soldaduras de calidad.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["18+ Años", "Bilingüe EN/ES", "Cotizaciones Gratis", "Asegurados ante el INS"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ proyectos a la medida",
        trustTitle: "Asegurados ante el INS", trustSubtitle: "Totalmente protegido",
      },
      services: {
        title: "Lo Que Forjamos", blurb: "Hierro a la medida, soldado para durar toda la vida.",
        items: [
          { title: "Portones y Verjas",     blurb: "Portones de entrada, verjas de seguridad y barandas — fuertes, seguros y con un acabado precioso." },
          { title: "Trabajo a la Medida",   blurb: "Barandas de gradas, balcones, puertas de seguridad y diseños únicos hechos a la medida." },
          { title: "Soldadura y Reparaciones", blurb: "Soldadura a domicilio, reparación de carretas y estructuras, bisagras y marcos quebrados arreglados rápido." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "18 años de experiencia",       blurb: "Cientos de portones, barandas y piezas a la medida hechos en todo el sur de San José." },
          { title: "Trabajo de maestro",           blurb: "Soldaduras limpias, ajuste preciso y acabados que resisten el óxido por años." },
          { title: "Asegurados ante el INS",       blurb: "Su propiedad está totalmente protegida de principio a fin." },
          { title: "Bilingüe: Inglés y Español",   blurb: "Comunicación clara en cada detalle de su diseño." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos",       blurb: "Cuéntenos su idea — envíe una foto o un boceto si lo tiene." },
          { title: "Cotización gratis en sitio",  blurb: "Medimos, conversamos del diseño y cotizamos por escrito." },
          { title: "Fabricamos e instalamos",     blurb: "Hecho a la medida en nuestro taller y luego instalado limpio y a nivel." },
          { title: "Revisión final",              blurb: "Revisamos el acabado y usted aprueba el trabajo." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Héctor V.",  role: "Vecino de San Rafael Arriba", quote: "Mi portón nuevo es una obra de arte y está hecho como un tanque. Vale cada colón." },
          { name: "Brenda S.",  role: "Vecina de Aserrí",            quote: "La baranda de las gradas que hicieron es preciosa. Soldaduras limpias y me explicaron cada detalle." },
          { name: "Fabián D.",  role: "Dueño de negocio, San Miguel", quote: "Hicieron nuestras puertas de seguridad y la verja rapidísimo. Trabajo sólido, precio justo, verdaderos artesanos." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un trabajo de herrería a la medida?", a: "Cada pieza se hace a la medida, así que damos cotizaciones gratis por escrito. Los portones suelen empezar alrededor de ₡1 250 000." },
          { q: "¿Ofrecen soldadura a domicilio?",               a: "Sí — llevamos el taller hasta usted para reparar portones, carretas, equipo y estructuras de acero." },
          { q: "¿Cuánto tarda un proyecto a la medida?",        a: "La mayoría de portones y barandas toman de 2 a 4 semanas desde la aprobación del diseño hasta la instalación, según la complejidad." },
          { q: "¿Están asegurados?",                            a: "Sí — nuestro personal está asegurado ante el INS y contamos con seguro de responsabilidad civil." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su proyecto",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Portón", "Baranda", "Verja", "Trabajo a la medida", "Reparación de soldadura"],
      },
      footer: { tagline: "Herrería y trabajo en hierro a la medida en todo el sur de San José.", hours: "Lun a sáb · 7:00 a. m. – 6:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 7:00 a.m.–6:00 p.m.", es: "Lun a sáb · 7:00 a. m. – 6:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Gates, railings or a repair?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Portones, barandas o una reparación?",
    roleEn: "Fabrication Advisor", roleEs: "Asesora de Fabricación",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`, `${assets}/gal5.jpg`, `${assets}/gal6.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "BadgeCheck", title: "Custom fabrication", blurb: "Gates, railings and structural steel." },
      { icon: "Truck", title: "Mobile welding service", blurb: "On-site repairs where you need them." },
      { icon: "ShieldCheck", title: "Insured with the INS", blurb: "Strong, clean welds." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
    ],
    es: [
      { icon: "BadgeCheck", title: "Fabricación a la medida", blurb: "Portones, barandas y acero estructural." },
      { icon: "Truck", title: "Soldadura a domicilio", blurb: "Reparaciones en sitio donde las necesite." },
      { icon: "ShieldCheck", title: "Asegurados ante el INS", blurb: "Soldaduras fuertes y limpias." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["Custom iron gate", "Steel railing fabrication", "Mobile welding repair", "Security door build", "Structural welding", "Finished metalwork"],
    es: ["Portón de hierro a la medida", "Fabricación de barandas", "Soldadura a domicilio", "Puerta de seguridad", "Soldadura estructural", "Trabajo en metal terminado"],
  },
};

export default welding;
