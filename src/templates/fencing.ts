import { Fence, Hammer, Wrench, Square, Clock, Languages, ShieldCheck, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/fencing`;

const fencing: BusinessTemplate = {
  slug: "fencing",
  industry: "Fencing",
  industryEs: "Cercas",
  websiteType: "Construction Website",
  defaultServicesField: "Wood fencing, Vinyl fencing, Chain-link, Gates & automation, Fence repair",
  brand: {
    name: "BorderLine Fence Co.",
    city: "Atenas",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hello@borderlinefence.com",
    address: "Del parque central, 200 m norte y 50 m oeste, Atenas, Alajuela",
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
        title2: "Homes, Farms & Businesses",
        subtitle: "Wood, vinyl, chain-link, and custom gates — installed and repaired. Bilingual team. Free estimates. INS-insured staff.",
        cta1: "Get Free Estimate", cta2: "Call Now",
        badges: ["Built to Last", "Bilingual EN/ES", "Free Estimates", "INS-Insured Staff"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "450+ fences installed",
        trustTitle: "Insured Staff", trustSubtitle: "Workmanship warranty",
      },
      services: {
        title: "What We Build", blurb: "Every material, every property line.",
        items: [
          { title: "Wood & Vinyl Fences", blurb: "Privacy, picket, and farm styles built straight, plumb, and to last." },
          { title: "Gates & Automation",  blurb: "Walk gates, double driveway gates, and automatic openers installed right." },
          { title: "Repairs & Chain-Link", blurb: "Storm damage, leaning posts, and durable chain-link for any budget." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "Quality materials",            blurb: "Quality wood, vinyl, and galvanized hardware that lasts." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication that respects you." },
          { title: "Insured with the INS",         blurb: "Your property is fully protected." },
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
          { name: "Mauricio R.",   role: "Neighbor in Atenas",                quote: "Our new teak privacy fence looks amazing and went up in two days. Straight as an arrow." },
          { name: "Ana Lucía L.",  role: "Farm owner, San Isidro de Atenas",  quote: "They fenced 16 hectares for us — fair price, solid work, and great communication throughout." },
          { name: "Fabián S.",     role: "Business owner, Orotina",           quote: "Installed a secure gate with an automatic opener. Clean install and works flawlessly." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a new fence cost?", a: "It depends on material and length — most residential fences run ₡30 000–₡90 000 per linear meter. We give free written estimates." },
          { q: "How long does installation take?", a: "Most residential fences are completed in 1–3 days, depending on length and terrain." },
          { q: "Do you repair existing fences?",   a: "Yes — we fix leaning posts, broken panels, storm damage, and replace gates and hardware." },
          { q: "Are you insured?",                 a: "Yes — our staff is insured with the INS, and every install is backed by a workmanship warranty." },
        ],
      },
      contact: {
        title: "Request a Free Estimate", blurb: "Tell us about your project. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your fence project",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Wood fencing", "Vinyl fencing", "Chain-link", "Gates & automation", "Other"],
      },
      footer: { tagline: "Built-to-last fencing across the region.", hours: "Mon–Sat · 7:00 a.m.–7:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Hechas para durar, a un precio justo",
        title1: "Cercas de Calidad para",
        title2: "Casas, Fincas y Negocios",
        subtitle: "Madera, vinil, malla ciclón y portones a la medida — instalación y reparación. Equipo bilingüe. Cotización gratis. Personal asegurado ante el INS.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Hechas para Durar", "Bilingüe EN/ES", "Cotización Gratis", "Asegurados ante el INS"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "450+ cercas instaladas",
        trustTitle: "Personal Asegurado", trustSubtitle: "Garantía de trabajo",
      },
      services: {
        title: "Lo Que Construimos", blurb: "Todo material, cada lindero.",
        items: [
          { title: "Cercas de Madera y Vinil", blurb: "Estilos de privacidad, de estacas y de finca, construidas rectas, a plomo y para durar." },
          { title: "Portones y Automatización", blurb: "Portones peatonales, portones dobles para la cochera y motores automáticos bien instalados." },
          { title: "Reparaciones y Malla",      blurb: "Daños por temporal, postes inclinados y malla ciclón resistente para todo presupuesto." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Materiales de calidad",       blurb: "Madera de calidad, vinil y herrajes galvanizados que duran." },
          { title: "Bilingüe: Inglés y Español",  blurb: "Comunicación clara que lo respeta." },
          { title: "Asegurados ante el INS",      blurb: "Su propiedad está totalmente protegida." },
          { title: "Garantía de trabajo",         blurb: "Respaldamos cada poste que colocamos." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llámenos o escríbanos",            blurb: "Cuéntenos sobre su proyecto — escuchamos primero." },
          { title: "Cotización gratis en su propiedad", blurb: "Medimos, marcamos el lindero y cotizamos por escrito." },
          { title: "Lo construimos bien",              blurb: "Bases correctas, rieles nivelados, líneas limpias." },
          { title: "Revisión final",                   blurb: "Usted aprueba cuando cada panel está perfecto." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Mauricio R.",  role: "Vecino de Atenas",                     quote: "La cerca nueva de teca se ve increíble y la levantaron en dos días. Recta como una flecha." },
          { name: "Ana Lucía L.", role: "Dueña de finca, San Isidro de Atenas", quote: "Nos cercaron 16 hectáreas — precio justo, trabajo sólido y excelente comunicación." },
          { name: "Fabián S.",    role: "Dueño de negocio, Orotina",            quote: "Instalaron un portón seguro con motor automático. Instalación limpia y funciona perfecto." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una cerca nueva?",   a: "Depende del material y el largo — la mayoría de cercas residenciales cuestan entre ₡30 000 y ₡90 000 por metro lineal. Damos cotizaciones gratis por escrito." },
          { q: "¿Cuánto tarda la instalación?",     a: "La mayoría de cercas residenciales se terminan en 1–3 días, según el largo y el terreno." },
          { q: "¿Reparan cercas existentes?",       a: "Sí — arreglamos postes inclinados, paneles rotos, daños por temporal, y cambiamos portones y herrajes." },
          { q: "¿Están asegurados?",                a: "Sí — nuestro personal está asegurado ante el INS y cada instalación incluye garantía de trabajo." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos sobre su proyecto. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Cuéntenos sobre su proyecto de cerca",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Cerca de madera", "Cerca de vinil", "Malla ciclón", "Portones y automatización", "Otro"],
      },
      footer: { tagline: "Cercas hechas para durar en toda la región.", hours: "Lun a sáb · 7:00 a. m. – 7:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  availability: { en: "Mon–Sat · 7:00 a.m.–6:00 p.m.", es: "Lun a sáb · 7:00 a. m. – 6:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. What kind of fence are you planning?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Qué tipo de cerca está planeando?",
    roleEn: "Fencing Advisor", roleEs: "Asesora de Cercas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`, `${assets}/gal5.jpg`, `${assets}/gal6.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "BadgeCheck", title: "Custom-built to fit", blurb: "Designed for your yard and style." },
      { icon: "ShieldCheck", title: "Insured with the INS", blurb: "Quality posts set to last." },
      { icon: "Banknote", title: "Free estimates", blurb: "Clear quotes, no pressure." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
    ],
    es: [
      { icon: "BadgeCheck", title: "Hecho a su medida", blurb: "Diseñado para su patio y estilo." },
      { icon: "ShieldCheck", title: "Asegurados ante el INS", blurb: "Postes de calidad para durar." },
      { icon: "Banknote", title: "Cotización gratis", blurb: "Cotizaciones claras, sin presión." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["New wood privacy fence", "Vinyl fence install", "Aluminum & metal fence", "Custom gate build", "Chain-link fencing", "Finished backyard fence"],
    es: ["Cerca de madera nueva", "Instalación de cerca de vinil", "Cerca de aluminio y metal", "Portón a la medida", "Cerca de malla ciclón", "Cerca de patio terminada"],
  },
};

export default fencing;
