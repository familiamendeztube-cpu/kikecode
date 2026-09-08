import { Star, Utensils, Truck, Users, Clock, Languages, ShieldCheck, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";

const catering: BusinessTemplate = {
  slug: "catering",
  industry: "Catering & Food Truck",
  industryEs: "Banquetes y Food Truck",
  websiteType: "Food & Events Website",
  defaultServicesField: "Taco catering, Private parties, Corporate events, Weddings & quinceañeras, Food truck rentals",
  brand: {
    name: "Sabor Sobre Ruedas",
    city: "San Antonio",
    phone: "(555) 010-0010",
    phoneHref: "tel:+15550100010",
    email: "hola@saborsobreruedas.com",
    address: "410 Market St, San Antonio, TX 78205",
    heroIcon: Star,
    palette: {
      primary: "#E11D48", primaryDark: "#9f1239", accent: "#F59E0B",
      heroFrom: "#1a0a0f", heroVia: "#2a1410", heroTo: "#140a08",
      heroGlow1: "rgba(225,29,72,0.50)", heroGlow2: "rgba(245,158,11,0.32)",
      heroIconFrom: "#E11D48", heroIconTo: "#F59E0B",
      contactFrom: "#E11D48", contactTo: "#F59E0B",
    },
  },
  serviceIcons: [Utensils, Truck, Users],
  whyIcons: [Clock, Languages, ShieldCheck, Sparkles],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Catering events across the city since 2012",
        title1: "Fresh Tacos & Full Catering for",
        title2: "Parties, Weddings & Corporate Events",
        subtitle: "Live taco bars, full-service catering, and our food truck for any event. Bilingual team. Free tastings. Fully licensed.",
        cta1: "Get a Free Quote", cta2: "Call Now",
        badges: ["Live Taco Bar", "Bilingual EN/ES", "Free Tastings", "Licensed & Insured"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ events served",
        trustTitle: "Health Certified", trustSubtitle: "Fully licensed kitchen",
      },
      services: {
        title: "How We Serve You", blurb: "From a backyard party to a 300-guest gala.",
        items: [
          { title: "Full-Service Catering", blurb: "Buffets, plated dinners, appetizers. We set up, serve, and clean up." },
          { title: "Food Truck Rentals", blurb: "Book our truck for your event. Fresh-made tacos, sides, and aguas frescas on site." },
          { title: "Parties & Corporate", blurb: "Weddings, quinceañeras, office lunches. Custom menus for any group size." },
        ],
      },
      why: {
        title: "Why Clients Book Us",
        items: [
          { title: "On time, every event", blurb: "We arrive early and serve on schedule — no stress for you." },
          { title: "Bilingual: English & Spanish", blurb: "Clear planning that respects you and your guests." },
          { title: "Licensed & health certified", blurb: "Permitted kitchen, insured staff, food handled safely." },
          { title: "Fresh, made-to-order food", blurb: "Real ingredients, cooked on site — never reheated." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Tell us about your event", blurb: "Date, guest count, and the vibe you want." },
          { title: "Free tasting & quote", blurb: "Sample the menu, pick your favorites, get it in writing." },
          { title: "We cook & serve", blurb: "We handle setup, serving, and cleanup on the day." },
          { title: "You enjoy the party", blurb: "Relax with your guests while we take care of the food." },
        ],
      },
      testimonials: {
        title: "What Clients Say",
        items: [
          { name: "Rosa M.", role: "Quinceañera mom", quote: "The taco bar was the hit of the night. Everyone asked who catered. So worth it!" },
          { name: "Greg P.", role: "Office manager", quote: "They fed 120 employees on time and the line moved fast. We book them every quarter now." },
          { name: "Yesenia C.", role: "Bride", quote: "Fresh, delicious, and beautifully set up. Our wedding guests are still talking about it." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does catering cost?", a: "Most events run $14–$28 per guest depending on the menu. We give a free written quote after a quick chat." },
          { q: "How far in advance should I book?", a: "We recommend 3–4 weeks for large events, but we often handle smaller parties on short notice." },
          { q: "Do you offer tastings?", a: "Yes — free tastings for events of 50+ guests so you can pick your menu with confidence." },
          { q: "Can the food truck come to my location?", a: "Absolutely. We travel throughout the metro area; a small travel fee applies for far locations." },
        ],
      },
      contact: {
        title: "Request a Free Quote", blurb: "Tell us about your event. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Type of event", message: "Tell us about your event",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick an event type —",
        services: ["Private party", "Wedding / quinceañera", "Corporate event", "Food truck rental", "Other"],
      },
      footer: { tagline: "Fresh tacos and full catering for every celebration.", hours: "Tue–Sun · 9am–9pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Atendiendo eventos en la ciudad desde 2012",
        title1: "Tacos Frescos y Banquetes para",
        title2: "Fiestas, Bodas y Eventos de Empresa",
        subtitle: "Barras de tacos en vivo, banquetes completos y nuestro food truck para cualquier evento. Equipo bilingüe. Degustaciones gratis. Con licencia.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Barra de Tacos en Vivo", "Bilingüe EN/ES", "Degustaciones Gratis", "Licencia y Seguro"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ eventos atendidos",
        trustTitle: "Certificado de Salud", trustSubtitle: "Cocina con licencia",
      },
      services: {
        title: "Cómo Lo Atendemos", blurb: "Desde una fiesta en el patio hasta una gala de 300 invitados.",
        items: [
          { title: "Banquetes Completos", blurb: "Bufés, cenas servidas, entradas. Montamos, servimos y limpiamos." },
          { title: "Renta de Food Truck", blurb: "Reserve nuestro camión para su evento. Tacos recién hechos, guarniciones y aguas frescas en el lugar." },
          { title: "Fiestas y Empresas", blurb: "Bodas, quinceañeras, almuerzos de oficina. Menús a la medida para cualquier grupo." },
        ],
      },
      why: {
        title: "Por Qué Nos Eligen",
        items: [
          { title: "Puntuales en cada evento", blurb: "Llegamos temprano y servimos a tiempo — sin estrés para usted." },
          { title: "Bilingüe: Inglés y Español", blurb: "Planeación clara que lo respeta a usted y sus invitados." },
          { title: "Con licencia y certificación de salud", blurb: "Cocina permitida, personal asegurado, comida manejada con higiene." },
          { title: "Comida fresca y al momento", blurb: "Ingredientes reales, cocinados en el lugar — nunca recalentados." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Cuéntenos de su evento", blurb: "Fecha, número de invitados y el ambiente que desea." },
          { title: "Degustación y cotización gratis", blurb: "Pruebe el menú, elija sus favoritos y lo recibe por escrito." },
          { title: "Cocinamos y servimos", blurb: "Nos encargamos del montaje, servicio y limpieza el día del evento." },
          { title: "Usted disfruta la fiesta", blurb: "Relájese con sus invitados mientras cuidamos la comida." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Rosa M.", role: "Mamá de quinceañera", quote: "La barra de tacos fue el éxito de la noche. Todos preguntaron quién los atendió. ¡Valió la pena!" },
          { name: "Greg P.", role: "Gerente de oficina", quote: "Alimentaron a 120 empleados a tiempo y la fila avanzó rápido. Ahora los contratamos cada trimestre." },
          { name: "Yesenia C.", role: "Novia", quote: "Fresco, delicioso y bellamente montado. Nuestros invitados de boda aún lo recuerdan." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el banquete?", a: "La mayoría de eventos cuestan $14–$28 por invitado según el menú. Damos cotización gratis por escrito tras una breve charla." },
          { q: "¿Con cuánta anticipación debo reservar?", a: "Recomendamos 3–4 semanas para eventos grandes, pero a menudo atendemos fiestas pequeñas con poco aviso." },
          { q: "¿Ofrecen degustaciones?", a: "Sí — degustaciones gratis para eventos de 50+ invitados para que elija su menú con confianza." },
          { q: "¿El food truck puede ir a mi lugar?", a: "Por supuesto. Viajamos por toda el área metropolitana; aplica una pequeña tarifa para lugares lejanos." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos de su evento. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Tipo de evento", message: "Cuéntenos de su evento",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un tipo de evento —",
        services: ["Fiesta privada", "Boda / quinceañera", "Evento de empresa", "Renta de food truck", "Otro"],
      },
      footer: { tagline: "Tacos frescos y banquetes completos para cada celebración.", hours: "Mar–Dom · 9am–9pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default catering;
