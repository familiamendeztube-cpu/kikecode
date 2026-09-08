import { Fence, Hammer, Wrench, Square, Clock, Languages, ShieldCheck, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";

const fencing: BusinessTemplate = {
  slug: "fencing",
  industry: "Fencing",
  industryEs: "Cercas",
  websiteType: "Construction Website",
  defaultServicesField: "Wood fencing, Vinyl fencing, Chain-link, Gates & automation, Fence repair",
  brand: {
    name: "BorderLine Fence Co.",
    city: "San Antonio",
    phone: "(555) 010-0014",
    phoneHref: "tel:+15550100014",
    email: "hello@borderlinefence.com",
    address: "640 Alamo Plaza, San Antonio, TX 78205",
    heroIcon: Fence,
    palette: {
      primary: "#9A3412", primaryDark: "#7c2d12", accent: "#0F766E",
      heroFrom: "#1c1410", heroVia: "#2a1c14", heroTo: "#1c1410",
      heroGlow1: "rgba(154,52,18,0.55)", heroGlow2: "rgba(15,118,110,0.30)",
      heroIconFrom: "#9A3412", heroIconTo: "#0F766E",
      contactFrom: "#9A3412", contactTo: "#0F766E",
    },
  },
  serviceIcons: [Hammer, Wrench, Square],
  whyIcons: [Clock, Languages, ShieldCheck, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Built to last, priced to fit",
        title1: "Quality Fences for",
        title2: "Homes, Ranches & Businesses",
        subtitle: "Wood, vinyl, chain-link, and custom gates — installed and repaired. Bilingual team. Free estimates. Licensed & insured.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["Built to Last", "Bilingual EN/ES", "Free Estimates", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "450+ fences installed",
        trustTitle: "Licensed & Insured", trustSubtitle: "Workmanship warranty",
      },
      services: {
        title: "What We Build", blurb: "Every material, every property line.",
        items: [
          { title: "Wood & Vinyl Fences", blurb: "Privacy, picket, and ranch styles built straight, plumb, and to last." },
          { title: "Gates & Automation",  blurb: "Walk gates, double drive gates, and automatic openers installed right." },
          { title: "Repairs & Chain-Link", blurb: "Storm damage, leaning posts, and durable chain-link for any budget." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "Quality materials",            blurb: "Premium lumber, vinyl, and galvanized hardware that lasts." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication that respects you." },
          { title: "Licensed & insured",           blurb: "Your property is fully protected." },
          { title: "Workmanship warranty",         blurb: "We stand behind every post we set." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or message us",   blurb: "Tell us about your project — we listen first." },
          { title: "Free on-site estimate", blurb: "We measure, mark the line, and quote in writing." },
          { title: "We build it right",    blurb: "Proper footings, level rails, clean lines." },
          { title: "Final walk-through",   blurb: "You approve when every panel is perfect." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Dave R.",   role: "Homeowner",     quote: "New cedar privacy fence looks amazing and went up in two days. Straight as an arrow." },
          { name: "Patricia L.", role: "Ranch owner",  quote: "They fenced 40 acres for us — fair price, solid work, and great communication throughout." },
          { name: "Mark S.",   role: "Business owner", quote: "Installed a secure gate with an automatic opener. Clean install and works flawlessly." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a new fence cost?", a: "It depends on material and length — most residential fences run $20–$55 per linear foot. We give free written estimates." },
          { q: "How long does installation take?", a: "Most residential fences are completed in 1–3 days, depending on length and terrain." },
          { q: "Do you repair existing fences?",   a: "Yes — we fix leaning posts, broken panels, storm damage, and replace gates and hardware." },
          { q: "Are you licensed and insured?",    a: "Yes — fully licensed, insured, and every install is backed by a workmanship warranty." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your fence project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Wood fencing", "Vinyl fencing", "Chain-link", "Gates & automation", "Other"],
      },
      footer: { tagline: "Built-to-last fencing across the region.", hours: "Mon–Sat · 7am–7pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Hechas para durar, a un precio justo",
        title1: "Cercas de Calidad para",
        title2: "Casas, Ranchos y Negocios",
        subtitle: "Madera, vinilo, malla ciclónica y portones a medida — instalación y reparación. Equipo bilingüe. Estimados gratis. Con licencia y seguro.",
        cta1: "Estimado Gratis", cta2: "Llame Ahora",
        badges: ["Hechas para Durar", "Bilingüe EN/ES", "Estimados Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "450+ cercas instaladas",
        trustTitle: "Licencia y Seguro", trustSubtitle: "Garantía de trabajo",
      },
      services: {
        title: "Lo Que Construimos", blurb: "Todo material, cada límite de propiedad.",
        items: [
          { title: "Cercas de Madera y Vinilo", blurb: "Estilos de privacidad, estacas y rancho, construidas rectas, a plomo y para durar." },
          { title: "Portones y Automatización", blurb: "Portones peatonales, dobles para entrada y aperturas automáticas bien instaladas." },
          { title: "Reparaciones y Malla",      blurb: "Daños por tormenta, postes inclinados y malla ciclónica durable para todo presupuesto." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Materiales de calidad",       blurb: "Madera premium, vinilo y herraje galvanizado que dura." },
          { title: "Bilingüe: Inglés y Español",  blurb: "Comunicación clara que lo respeta." },
          { title: "Con licencia y seguro",       blurb: "Su propiedad está totalmente protegida." },
          { title: "Garantía de trabajo",         blurb: "Respaldamos cada poste que colocamos." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o mándenos mensaje", blurb: "Cuéntenos sobre su proyecto — escuchamos primero." },
          { title: "Estimado gratis en su sitio", blurb: "Medimos, marcamos el límite y cotizamos por escrito." },
          { title: "Lo construimos bien",         blurb: "Cimientos correctos, rieles nivelados, líneas limpias." },
          { title: "Inspección final",            blurb: "Usted aprueba cuando cada panel está perfecto." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Dave R.",     role: "Dueño de casa",     quote: "La nueva cerca de cedro se ve increíble y la levantaron en dos días. Recta como flecha." },
          { name: "Patricia L.", role: "Dueña de rancho",   quote: "Cercaron 40 acres para nosotros — precio justo, trabajo sólido y excelente comunicación." },
          { name: "Mark S.",     role: "Dueño de negocio",  quote: "Instalaron un portón seguro con apertura automática. Instalación limpia y funciona perfecto." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una cerca nueva?",   a: "Depende del material y la longitud — la mayoría de cercas residenciales cuestan $20–$55 por pie lineal. Damos estimados gratis por escrito." },
          { q: "¿Cuánto tarda la instalación?",     a: "La mayoría de cercas residenciales se terminan en 1–3 días, según la longitud y el terreno." },
          { q: "¿Reparan cercas existentes?",       a: "Sí — arreglamos postes inclinados, paneles rotos, daños por tormenta, y reemplazamos portones y herraje." },
          { q: "¿Tienen licencia y seguro?",        a: "Sí — con licencia completa, asegurados, y cada instalación incluye garantía de trabajo." },
        ],
      },
      contact: {
        title: "Pida un Estimado Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su proyecto de cerca",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Cerca de madera", "Cerca de vinilo", "Malla ciclónica", "Portones y automatización", "Otro"],
      },
      footer: { tagline: "Cercas hechas para durar en toda la región.", hours: "Lun–Sáb · 7am–7pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default fencing;
