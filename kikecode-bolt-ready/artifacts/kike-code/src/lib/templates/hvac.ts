import { Wind, Snowflake, Flame, Wrench, Clock, ShieldCheck, ThumbsUp, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";

const hvac: BusinessTemplate = {
  slug: "hvac",
  industry: "Air Conditioning & Heating",
  industryEs: "Aire Acondicionado y Calefacción",
  websiteType: "Home Services Website",
  defaultServicesField: "AC repair, AC installation, Heating repair, Maintenance tune-ups, Indoor air quality, Thermostats",
  brand: {
    name: "PolarPeak HVAC",
    city: "Phoenix",
    phone: "(555) 010-0011",
    phoneHref: "tel:+15550100011",
    email: "hello@polarpeakhvac.com",
    address: "455 Desert Way, Phoenix, AZ 85004",
    heroIcon: Wind,
    palette: {
      primary: "#0EA5E9", primaryDark: "#0369a1", accent: "#EF4444",
      heroFrom: "#0a1622", heroVia: "#0f2436", heroTo: "#0a1622",
      heroGlow1: "rgba(14,165,233,0.55)", heroGlow2: "rgba(239,68,68,0.30)",
      heroIconFrom: "#0EA5E9", heroIconTo: "#0369a1",
      contactFrom: "#0EA5E9", contactTo: "#0369a1",
    },
  },
  serviceIcons: [Snowflake, Flame, Wrench],
  whyIcons: [Clock, ShieldCheck, ThumbsUp, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Keeping homes comfortable since 2009",
        title1: "Reliable Cooling & Heating for",
        title2: "Homes & Businesses",
        subtitle: "AC repair, installs, heating and tune-ups. Bilingual techs. Free estimates on new systems. Licensed & insured.",
        cta1: "Schedule Service", cta2: "Call Now",
        badges: ["24/7 Service", "Bilingual EN/ES", "Free System Quotes", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ comfortable homes",
        trustTitle: "EPA Certified", trustSubtitle: "Factory trained",
      },
      services: {
        title: "What We Do", blurb: "Cool in summer, warm in winter — all year comfort.",
        items: [
          { title: "AC Repair & Install", blurb: "Fast diagnostics, honest fixes, and energy-efficient new systems sized right." },
          { title: "Heating Service", blurb: "Furnace and heat pump repair, install and safety checks before the cold hits." },
          { title: "Maintenance Tune-Ups", blurb: "Seasonal tune-ups that lower bills, prevent breakdowns and extend system life." },
        ],
      },
      why: {
        title: "Why Customers Trust Us",
        items: [
          { title: "Fast, 24/7 response", blurb: "We answer emergencies day or night, even on weekends." },
          { title: "Licensed & insured", blurb: "EPA-certified, factory-trained technicians you can trust." },
          { title: "Up-front pricing", blurb: "You approve the price before any work begins." },
          { title: "Bilingual: English & Spanish", blurb: "Clear explanations in the language you prefer." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Call or book online", blurb: "Tell us what's wrong or what you need installed." },
          { title: "Diagnosis & quote", blurb: "We find the issue and give a clear flat price." },
          { title: "We fix or install", blurb: "Quality parts, clean work, and a system that runs right." },
          { title: "Comfort confirmed", blurb: "We test everything and make sure you're comfortable." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Karen B.", role: "Homeowner", quote: "Our AC died in July — they came the same evening and had us cool again by night. Lifesavers." },
          { name: "Tomás R.", role: "Restaurant owner", quote: "They replaced two rooftop units overnight so we never closed. Professional and fast." },
          { name: "Sandra M.", role: "Homeowner", quote: "Honest tune-up, no upsell. Our energy bill actually dropped after their visit." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does a service call cost?", a: "Our diagnostic fee is a flat $89 and is applied toward the repair if you move forward." },
          { q: "How much is a new AC system?", a: "Most full system installs run $5,500–$12,000 depending on size and efficiency. New-system quotes are free." },
          { q: "How often should I service my system?", a: "Twice a year — AC in spring, heating in fall. Ask about our maintenance plan." },
          { q: "Do you offer emergency service?", a: "Yes. We offer 24/7 emergency service for no-cool and no-heat situations." },
        ],
      },
      contact: {
        title: "Schedule Your Service", blurb: "Tell us what you need. We respond fast — same day when possible.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Describe the issue",
        submit: "Send Request", success: "Thank you — we'll call you shortly to schedule.",
        pick: "— Pick a service —",
        services: ["AC repair", "AC installation", "Heating repair", "Maintenance tune-up", "Other"],
      },
      footer: { tagline: "Year-round comfort you can count on.", hours: "Open 24/7 · Mon–Sun", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Manteniendo hogares cómodos desde 2009",
        title1: "Aire y Calefacción Confiables para",
        title2: "Casas y Negocios",
        subtitle: "Reparación, instalación, calefacción y mantenimientos. Técnicos bilingües. Estimados gratis en equipos nuevos. Con licencia y seguro.",
        cta1: "Agendar Servicio", cta2: "Llame Ahora",
        badges: ["Servicio 24/7", "Bilingüe EN/ES", "Cotización Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ hogares cómodos",
        trustTitle: "Certificados EPA", trustSubtitle: "Entrenados de fábrica",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Fresco en verano, cálido en invierno — comodidad todo el año.",
        items: [
          { title: "Reparación e Instalación de AC", blurb: "Diagnóstico rápido, arreglos honestos y equipos nuevos eficientes del tamaño correcto." },
          { title: "Servicio de Calefacción", blurb: "Reparación e instalación de calentadores y bombas de calor, con revisión de seguridad." },
          { title: "Mantenimiento Preventivo", blurb: "Mantenimientos de temporada que bajan la factura y evitan fallas." },
        ],
      },
      why: {
        title: "Por Qué Confían en Nosotros",
        items: [
          { title: "Respuesta rápida 24/7", blurb: "Atendemos emergencias de día o de noche, incluso fines de semana." },
          { title: "Con licencia y seguro", blurb: "Técnicos certificados por la EPA y entrenados de fábrica." },
          { title: "Precio por adelantado", blurb: "Usted aprueba el precio antes de comenzar el trabajo." },
          { title: "Bilingüe: Inglés y Español", blurb: "Explicaciones claras en el idioma que prefiera." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Llame o agende en línea", blurb: "Cuéntenos qué falla o qué necesita instalar." },
          { title: "Diagnóstico y cotización", blurb: "Encontramos el problema y damos un precio fijo claro." },
          { title: "Reparamos o instalamos", blurb: "Piezas de calidad, trabajo limpio y un equipo que funciona bien." },
          { title: "Comodidad confirmada", blurb: "Probamos todo y nos aseguramos de que esté cómodo." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Karen B.", role: "Dueña de casa", quote: "Nuestro AC se dañó en julio — vinieron esa misma tarde y para la noche teníamos aire otra vez." },
          { name: "Tomás R.", role: "Dueño de restaurante", quote: "Reemplazaron dos unidades de techo de noche para que no cerráramos. Profesionales y rápidos." },
          { name: "Sandra M.", role: "Dueña de casa", quote: "Mantenimiento honesto, sin ventas de más. Hasta bajó nuestra factura de luz después de su visita." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una visita de servicio?", a: "Nuestro diagnóstico es un fijo de $89 y se aplica a la reparación si decide continuar." },
          { q: "¿Cuánto cuesta un equipo nuevo?", a: "La mayoría de instalaciones completas son $5,500–$12,000 según el tamaño y eficiencia. La cotización es gratis." },
          { q: "¿Cada cuánto debo dar mantenimiento?", a: "Dos veces al año — AC en primavera, calefacción en otoño. Pregunte por nuestro plan de mantenimiento." },
          { q: "¿Ofrecen servicio de emergencia?", a: "Sí. Ofrecemos servicio de emergencia 24/7 para casos sin aire o sin calefacción." },
        ],
      },
      contact: {
        title: "Agende Su Servicio", blurb: "Cuéntenos qué necesita. Respondemos rápido — el mismo día cuando es posible.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Describa el problema",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos pronto para agendar.",
        pick: "— Elija un servicio —",
        services: ["Reparación de AC", "Instalación de AC", "Reparación de calefacción", "Mantenimiento", "Otro"],
      },
      footer: { tagline: "Comodidad todo el año en la que puede confiar.", hours: "Abierto 24/7 · Lun–Dom", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default hvac;
