import { Square, Layers, Home, Building2, Clock, ShieldCheck, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";

const concrete: BusinessTemplate = {
  slug: "concrete",
  industry: "Concrete & Masonry",
  industryEs: "Concreto y Albañilería",
  websiteType: "Construction Website",
  defaultServicesField: "Driveways, Patios, Foundations, Stamped & decorative concrete, Sidewalks, Retaining walls",
  brand: {
    name: "SolidForm Concrete",
    city: "Phoenix",
    phone: "(555) 010-0009",
    phoneHref: "tel:+15550100009",
    email: "hello@solidformconcrete.com",
    address: "900 Cactus Rd, Phoenix, AZ 85004",
    heroIcon: Square,
    palette: {
      primary: "#64748B", primaryDark: "#334155", accent: "#0EA5E9",
      heroFrom: "#0f172a", heroVia: "#1e293b", heroTo: "#0b1120",
      heroGlow1: "rgba(100,116,139,0.55)", heroGlow2: "rgba(14,165,233,0.35)",
      heroIconFrom: "#94A3B8", heroIconTo: "#0EA5E9",
      contactFrom: "#64748B", contactTo: "#0EA5E9",
    },
  },
  serviceIcons: [Home, Building2, Layers],
  whyIcons: [Clock, Award, ShieldCheck, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Pouring solid work since 2008",
        title1: "Concrete & Masonry That",
        title2: "Lasts for Decades",
        subtitle: "Driveways, patios, foundations and stamped concrete. Bilingual crew. Free estimates. Built to last.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["15+ Years", "Bilingual EN/ES", "Free Estimates", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "300+ projects poured",
        trustTitle: "Licensed & Insured", trustSubtitle: "Fully protected",
      },
      services: {
        title: "What We Build", blurb: "Strong foundations. Beautiful finishes.",
        items: [
          { title: "Driveways & Patios", blurb: "Smooth, durable slabs that handle heat, weight and weather for years." },
          { title: "Foundations & Slabs", blurb: "Footings, garage and home slabs poured level, reinforced and code-compliant." },
          { title: "Stamped & Decorative", blurb: "Stamped, stained and exposed-aggregate finishes that boost curb appeal." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "15 years of experience",      blurb: "Hundreds of driveways, patios and foundations completed." },
          { title: "Award-winning finishes",      blurb: "Clean lines, smooth pours, decorative work that turns heads." },
          { title: "Licensed, bonded & insured",  blurb: "Your property is fully protected from start to finish." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication every step of the way." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",     blurb: "Tell us about your project — we listen first." },
          { title: "Free on-site estimate",  blurb: "We measure, plan the pour, and quote in writing." },
          { title: "We form & pour",         blurb: "Proper base, rebar, finishing and curing — done right." },
          { title: "Final walk-through",     blurb: "We clean up and you approve the finished work." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Robert H.",  role: "Homeowner",        quote: "New driveway looks incredible and the pour is dead level. Crew was on time every day." },
          { name: "Sofia M.",   role: "Homeowner",        quote: "Our stamped patio turned out beautiful. They explained everything in Spanish too." },
          { name: "Greg T.",    role: "General contractor", quote: "We rely on them for foundations. Always level, always on schedule. Great partner." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a concrete project cost?", a: "Most driveways range from $6–$12 per square foot depending on finish and prep. We give free written estimates." },
          { q: "How long before I can use it?",          a: "You can walk on it in 24–48 hours and drive on it after 7 days. Full cure takes about 28 days." },
          { q: "Do you do decorative concrete?",         a: "Yes — stamped, stained, colored and exposed-aggregate finishes in many patterns and tones." },
          { q: "Are you licensed and insured?",          a: "Yes — fully licensed, bonded, and carrying liability and workers' comp insurance." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Driveway", "Patio", "Foundation / slab", "Stamped / decorative", "Other"],
      },
      footer: { tagline: "Solid concrete and masonry across the region.", hours: "Mon–Sat · 7am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Trabajo sólido desde 2008",
        title1: "Concreto y Albañilería Que",
        title2: "Dura por Décadas",
        subtitle: "Entradas, patios, cimientos y concreto estampado. Equipo bilingüe. Estimados gratis. Hecho para durar.",
        cta1: "Estimado Gratis", cta2: "Llame Ahora",
        badges: ["15+ Años", "Bilingüe EN/ES", "Estimados Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "300+ proyectos colados",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Totalmente protegido",
      },
      services: {
        title: "Lo Que Construimos", blurb: "Cimientos fuertes. Acabados hermosos.",
        items: [
          { title: "Entradas y Patios",     blurb: "Losas duraderas que aguantan el calor, el peso y el clima por años." },
          { title: "Cimientos y Losas",     blurb: "Zapatas, losas de garaje y casa, coladas a nivel, reforzadas y según el código." },
          { title: "Estampado y Decorativo", blurb: "Acabados estampados, teñidos y de agregado expuesto que realzan su casa." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "15 años de experiencia",       blurb: "Cientos de entradas, patios y cimientos terminados." },
          { title: "Acabados premiados",           blurb: "Líneas limpias, colado parejo y trabajo decorativo que impresiona." },
          { title: "Con licencia y asegurado",     blurb: "Su propiedad está totalmente protegida de principio a fin." },
          { title: "Bilingüe: Inglés y Español",   blurb: "Comunicación clara en cada paso." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o mándenos mensaje", blurb: "Cuéntenos sobre su proyecto — escuchamos primero." },
          { title: "Estimado gratis en su sitio", blurb: "Medimos, planeamos el colado y cotizamos por escrito." },
          { title: "Formamos y colamos",          blurb: "Base adecuada, varilla, acabado y curado — bien hecho." },
          { title: "Inspección final",            blurb: "Limpiamos y usted aprueba el trabajo terminado." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Robert H.",  role: "Dueño de casa",        quote: "La nueva entrada se ve increíble y el colado quedó perfectamente a nivel. Puntuales cada día." },
          { name: "Sofía M.",   role: "Dueña de casa",        quote: "Nuestro patio estampado quedó hermoso. Además me explicaron todo en español." },
          { name: "Greg T.",    role: "Contratista general",  quote: "Confiamos en ellos para los cimientos. Siempre a nivel y a tiempo. Gran equipo." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un proyecto de concreto?", a: "La mayoría de entradas van de $6–$12 por pie cuadrado según el acabado y la preparación. Damos estimados gratis por escrito." },
          { q: "¿Cuándo lo puedo usar?",                  a: "Puede caminar sobre él en 24–48 horas y manejar después de 7 días. El curado completo toma unos 28 días." },
          { q: "¿Hacen concreto decorativo?",             a: "Sí — acabados estampados, teñidos, con color y de agregado expuesto en muchos patrones y tonos." },
          { q: "¿Tienen licencia y seguro?",              a: "Sí — licencia completa, fianza y seguro de responsabilidad y de trabajadores." },
        ],
      },
      contact: {
        title: "Pida un Estimado Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su proyecto",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Entrada", "Patio", "Cimiento / losa", "Estampado / decorativo", "Otro"],
      },
      footer: { tagline: "Concreto y albañilería sólidos en toda la región.", hours: "Lun–Sáb · 7am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default concrete;
