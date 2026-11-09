import { Square, Layers, Home, Building2, Clock, ShieldCheck, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/concrete`;

const concrete: BusinessTemplate = {
  slug: "concrete",
  industry: "Concrete & Masonry",
  industryEs: "Concreto y Albañilería",
  websiteType: "Construction Website",
  defaultServicesField: "Driveways, Patios, Foundations, Stamped & decorative concrete, Sidewalks, Retaining walls",
  brand: {
    name: "SolidForm Concrete",
    city: "Cartago",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hello@solidformconcrete.com",
    address: "Del parque central, 400 m norte y 100 m este, Cartago, Cartago",
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
        badges: ["15+ Years", "Bilingual EN/ES", "Free Estimates", "Insured with the INS"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "300+ projects poured",
        trustTitle: "Insured with the INS", trustSubtitle: "Fully protected",
      },
      services: {
        title: "What We Build", blurb: "Strong foundations. Beautiful finishes.",
        items: [
          { title: "Driveways & Patios", blurb: "Smooth, durable slabs that handle heavy rain, weight and daily use for years." },
          { title: "Foundations & Slabs", blurb: "Footings, carport and home slabs poured level, reinforced and built to Costa Rican building standards." },
          { title: "Stamped & Decorative", blurb: "Stamped, stained and exposed-aggregate finishes that boost curb appeal." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "15 years of experience",      blurb: "Hundreds of driveways, patios and foundations completed." },
          { title: "Finishes that stand out",     blurb: "Clean lines, smooth pours, decorative work that turns heads." },
          { title: "CFIA professionals & INS insurance", blurb: "Your property is fully protected from start to finish." },
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
          { name: "José Pablo H.", role: "Neighbor in Paraíso",           quote: "New driveway looks incredible and the pour is dead level. Crew was on time every day." },
          { name: "Ana Lucía M.",  role: "Neighbor in Tres Ríos",         quote: "Our stamped patio turned out beautiful. They explained every step clearly." },
          { name: "Mauricio T.",   role: "General contractor, Cartago",   quote: "We rely on them for foundations. Always level, always on schedule. Great partner." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a concrete project cost?", a: "Most driveways run between ₡30 000 and ₡65 000 per m² depending on finish and prep. We give free written estimates." },
          { q: "How long before I can use it?",          a: "You can walk on it in 24–48 hours and drive on it after 7 days. Full cure takes about 28 days." },
          { q: "Do you do decorative concrete?",         a: "Yes — stamped, stained, colored and exposed-aggregate finishes in many patterns and tones." },
          { q: "Are you registered and insured?",        a: "Yes — we work with professionals registered with the CFIA, and our staff is insured with the INS." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Driveway", "Patio", "Foundation / slab", "Stamped / decorative", "Other"],
      },
      footer: { tagline: "Solid concrete and masonry across the province of Cartago.", hours: "Mon–Sat · 7:00 a.m.–6:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Trabajo sólido desde 2008",
        title1: "Concreto y Albañilería Que",
        title2: "Dura por Décadas",
        subtitle: "Entradas de cochera, patios, cimientos y concreto estampado. Equipo bilingüe. Cotizaciones gratis. Hecho para durar.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["15+ Años", "Bilingüe EN/ES", "Cotizaciones Gratis", "Asegurados ante el INS"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "300+ chorreas realizadas",
        trustTitle: "Asegurados ante el INS", trustSubtitle: "Totalmente protegido",
      },
      services: {
        title: "Lo Que Construimos", blurb: "Cimientos fuertes. Acabados preciosos.",
        items: [
          { title: "Entradas y Patios",     blurb: "Losas duraderas que aguantan los aguaceros, el peso y el uso diario por años." },
          { title: "Cimientos y Losas",     blurb: "Placas corridas, losas de cochera y de casa, chorreadas a nivel, reforzadas y según la normativa de construcción de Costa Rica." },
          { title: "Estampado y Decorativo", blurb: "Acabados estampados, teñidos y de agregado expuesto que realzan su casa." },
        ],
      },
      why: {
        title: "Por Qué Los Clientes Confían en Nosotros",
        items: [
          { title: "15 años de experiencia",       blurb: "Cientos de entradas, patios y cimientos terminados." },
          { title: "Acabados que destacan",        blurb: "Líneas limpias, chorrea pareja y trabajo decorativo que impresiona." },
          { title: "Profesionales CFIA y seguro del INS", blurb: "Su propiedad está totalmente protegida de principio a fin." },
          { title: "Bilingüe: Inglés y Español",   blurb: "Comunicación clara en cada paso." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos",       blurb: "Cuéntenos sobre su proyecto — primero escuchamos." },
          { title: "Cotización gratis en sitio",  blurb: "Medimos, planeamos la chorrea y cotizamos por escrito." },
          { title: "Formaleta y chorrea",         blurb: "Base adecuada, varilla, acabado y curado — bien hecho." },
          { title: "Revisión final",              blurb: "Limpiamos y usted aprueba el trabajo terminado." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "José Pablo H.", role: "Vecino de Paraíso",          quote: "La nueva entrada se ve increíble y la chorrea quedó perfectamente a nivel. Puntuales todos los días." },
          { name: "Ana Lucía M.",  role: "Vecina de Tres Ríos",        quote: "Nuestro patio estampado quedó precioso. Nos explicaron cada paso con claridad." },
          { name: "Mauricio T.",   role: "Contratista general, Cartago", quote: "Confiamos en ellos para los cimientos. Siempre a nivel y a tiempo. Gran equipo." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un proyecto de concreto?", a: "La mayoría de entradas van de ₡30 000 a ₡65 000 por m² según el acabado y la preparación. Damos cotizaciones gratis por escrito." },
          { q: "¿Cuándo lo puedo usar?",                  a: "Puede caminar sobre él en 24 a 48 horas y meter el carro después de 7 días. El curado completo toma unos 28 días." },
          { q: "¿Hacen concreto decorativo?",             a: "Sí — acabados estampados, teñidos, con color y de agregado expuesto en muchos diseños y tonos." },
          { q: "¿Están incorporados y asegurados?",       a: "Sí — trabajamos con profesionales incorporados al CFIA y nuestro personal está asegurado ante el INS." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su proyecto",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Entrada de cochera", "Patio", "Cimiento / losa", "Estampado / decorativo", "Otro"],
      },
      footer: { tagline: "Concreto y albañilería sólidos en toda la provincia de Cartago.", hours: "Lun a sáb · 7:00 a. m. – 6:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 7:00 a.m.–5:00 p.m.", es: "Lun a sáb · 7:00 a. m. – 5:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Driveway, patio or something else?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Entrada de cochera, patio u otro trabajo?",
    roleEn: "Concrete Advisor", roleEs: "Asesora de Concreto",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`, `${assets}/gal5.jpg`, `${assets}/gal6.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "BadgeCheck", title: "Quality craftsmanship", blurb: "Smooth, durable, built to last." },
      { icon: "ShieldCheck", title: "Insured with the INS", blurb: "Professional crews you can trust." },
      { icon: "Banknote", title: "Free estimates", blurb: "Fair pricing, written quotes." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
    ],
    es: [
      { icon: "BadgeCheck", title: "Trabajo de calidad", blurb: "Liso, durable y hecho para durar." },
      { icon: "ShieldCheck", title: "Asegurados ante el INS", blurb: "Equipos profesionales de confianza." },
      { icon: "Banknote", title: "Cotizaciones gratis", blurb: "Precio justo, cotización por escrito." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["New concrete driveway", "Stamped patio", "Sidewalk & walkway", "Foundation slab", "Decorative finish", "Finished pour"],
    es: ["Entrada de concreto nueva", "Patio estampado", "Acera y caminos", "Losa de cimiento", "Acabado decorativo", "Chorrea terminada"],
  },
};

export default concrete;
