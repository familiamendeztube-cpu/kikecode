import { Flame, Fence, Layers, Wrench, Clock, Award, ShieldCheck, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";

const welding: BusinessTemplate = {
  slug: "welding",
  industry: "Welding & Iron Works",
  industryEs: "Herrería",
  websiteType: "Construction Website",
  defaultServicesField: "Gates, Railings, Fences, Custom metalwork, Welding repairs, Security doors",
  brand: {
    name: "IronForge Welding",
    city: "San Antonio",
    phone: "(555) 010-0012",
    phoneHref: "tel:+15550100012",
    email: "hello@ironforgewelding.com",
    address: "780 Foundry St, San Antonio, TX 78207",
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
        badges: ["18+ Years", "Bilingual EN/ES", "Free Estimates", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ custom projects",
        trustTitle: "Licensed & Insured", trustSubtitle: "Fully protected",
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
          { title: "18 years of experience",       blurb: "Hundreds of gates, railings and custom pieces built across the region." },
          { title: "Master craftsmanship",         blurb: "Clean welds, precise fit, finishes that resist rust for years." },
          { title: "Licensed, bonded & insured",   blurb: "Your property is fully protected from start to finish." },
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
          { name: "Hector V.",  role: "Homeowner",        quote: "My new driveway gate is a work of art and built like a tank. Worth every penny." },
          { name: "Brenda S.",  role: "Homeowner",        quote: "The stair railing they made is gorgeous. Clean welds and they explained everything in Spanish." },
          { name: "Frank D.",   role: "Business owner",   quote: "They built our security doors and fence fast. Solid work, fair price, true craftsmen." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does custom iron work cost?", a: "Every piece is built to spec, so we give free written estimates. Driveway gates typically start around $2,500." },
          { q: "Do you offer mobile welding?",         a: "Yes — we bring the shop to you for repairs on gates, trailers, equipment and structural steel." },
          { q: "How long does a custom project take?", a: "Most gates and railings take 2–4 weeks from design approval to install, depending on complexity." },
          { q: "Are you licensed and insured?",        a: "Yes — fully licensed, bonded, and carrying liability and workers' comp insurance." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Gate", "Railing", "Fence", "Custom metalwork", "Welding repair"],
      },
      footer: { tagline: "Custom welding and iron works across the region.", hours: "Mon–Sat · 7am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Trabajo de hierro a medida desde 2006",
        title1: "Herrería y Trabajo en Hierro",
        title2: "Fuerte y Hecho para Durar",
        subtitle: "Portones, barandales, cercas, trabajo a medida y reparaciones. Artesanos bilingües. Estimados gratis. Soldaduras de calidad.",
        cta1: "Estimado Gratis", cta2: "Llame Ahora",
        badges: ["18+ Años", "Bilingüe EN/ES", "Estimados Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "350+ proyectos a medida",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Totalmente protegido",
      },
      services: {
        title: "Lo Que Forjamos", blurb: "Hierro a medida, soldado para durar toda la vida.",
        items: [
          { title: "Portones y Cercas",     blurb: "Portones de entrada, cercas de seguridad y barandales — fuertes, seguros y con acabado hermoso." },
          { title: "Trabajo a Medida",      blurb: "Barandales de escalera, balcones, puertas de seguridad y diseños únicos hechos a la medida." },
          { title: "Soldadura y Reparaciones", blurb: "Soldadura móvil, reparación de remolques y estructuras, bisagras y marcos rotos arreglados rápido." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "18 años de experiencia",       blurb: "Cientos de portones, barandales y piezas a medida hechos en la región." },
          { title: "Artesanía maestra",            blurb: "Soldaduras limpias, ajuste preciso y acabados que resisten el óxido por años." },
          { title: "Con licencia y asegurado",     blurb: "Su propiedad está totalmente protegida de principio a fin." },
          { title: "Bilingüe: Inglés y Español",   blurb: "Comunicación clara en cada detalle de su diseño." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o mándenos mensaje", blurb: "Cuéntenos su idea — mande una foto o boceto si tiene uno." },
          { title: "Estimado gratis en su sitio", blurb: "Medimos, hablamos del diseño y cotizamos por escrito." },
          { title: "Fabricamos e instalamos",     blurb: "Hecho a medida en nuestro taller y luego instalado limpio y a nivel." },
          { title: "Inspección final",            blurb: "Revisamos el acabado y usted aprueba el trabajo." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Héctor V.",  role: "Dueño de casa",      quote: "Mi nuevo portón es una obra de arte y está construido como un tanque. Vale cada centavo." },
          { name: "Brenda S.",  role: "Dueña de casa",      quote: "El barandal de la escalera que hicieron es precioso. Soldaduras limpias y me explicaron todo en español." },
          { name: "Frank D.",   role: "Dueño de negocio",   quote: "Construyeron nuestras puertas de seguridad y la cerca rápido. Trabajo sólido, precio justo, verdaderos artesanos." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el trabajo de hierro a medida?", a: "Cada pieza se hace a la medida, así que damos estimados gratis por escrito. Los portones suelen empezar alrededor de $2,500." },
          { q: "¿Ofrecen soldadura móvil?",                     a: "Sí — llevamos el taller a usted para reparar portones, remolques, equipo y acero estructural." },
          { q: "¿Cuánto tarda un proyecto a medida?",           a: "La mayoría de portones y barandales toman de 2–4 semanas desde la aprobación del diseño hasta la instalación, según la complejidad." },
          { q: "¿Tienen licencia y seguro?",                    a: "Sí — licencia completa, fianza y seguro de responsabilidad y de trabajadores." },
        ],
      },
      contact: {
        title: "Pida un Estimado Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su proyecto",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Portón", "Barandal", "Cerca", "Trabajo a medida", "Reparación de soldadura"],
      },
      footer: { tagline: "Herrería y trabajo en hierro a medida en toda la región.", hours: "Lun–Sáb · 7am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default welding;
