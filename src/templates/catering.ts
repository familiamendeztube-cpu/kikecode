import { Star, Utensils, Truck, Users, Clock, Languages, ShieldCheck, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/catering`;

const catering: BusinessTemplate = {
  slug: "catering",
  industry: "Catering & Food Truck",
  industryEs: "Banquetes y Food Truck",
  websiteType: "Food & Events Website",
  defaultServicesField: "Taco bar & bocas catering, Private parties, Corporate events, Weddings & quinceañeras, Food truck rentals",
  brand: {
    name: "Sabor Sobre Ruedas",
    city: "Heredia",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@saborsobreruedas.com",
    address: "Del Correos de Costa Rica, 100 m norte y 50 m este, Heredia centro, Heredia",
    heroIcon: Star,
    palette: {
      primary: "#E11D48", primaryDark: "#9f1239", accent: "#F59E0B",
      heroFrom: "#1a0a0f", heroVia: "#2a1410", heroTo: "#140a08",
      heroGlow1: "rgba(225,29,72,0.50)", heroGlow2: "rgba(245,158,11,0.32)",
      heroIconFrom: "#E11D48", heroIconTo: "#F59E0B",
      contactFrom: "#E11D48", contactTo: "#9f1239",
    },
  },
  serviceIcons: [Utensils, Truck, Users],
  whyIcons: [Clock, Languages, ShieldCheck, Sparkles],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Catering events across Heredia since 2012",
        title1: "Tacos, Bocas & Full Catering for",
        title2: "Parties, Weddings & Corporate Events",
        subtitle: "Live taco bars, bocas, arroz con pollo, full-service catering, and our food truck for any event. Bilingual team. Free tastings. Health permit up to date.",
        cta1: "Get a Free Quote", cta2: "Call Now",
        badges: ["Live Taco Bar", "Bilingual EN/ES", "Free Tastings", "Health Permit Up to Date"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ events served",
        trustTitle: "Health Permit", trustSubtitle: "Kitchen permit up to date",
      },
      services: {
        title: "How We Serve You", blurb: "From a party at home to a 300-guest gala.",
        items: [
          { title: "Full-Service Catering", blurb: "Buffets, plated dinners, bocas, and arroz con pollo. We set up, serve, and clean up." },
          { title: "Food Truck Rentals", blurb: "Book our truck for your event. Fresh-made tacos, sides, and natural fruit drinks on site." },
          { title: "Parties & Corporate", blurb: "Weddings, quinceañeras, office lunches. Custom menus for any group size." },
        ],
      },
      why: {
        title: "Why Clients Book Us",
        items: [
          { title: "On time, every event", blurb: "We arrive early and serve on schedule — no stress for you." },
          { title: "Bilingual: English & Spanish", blurb: "Clear planning that respects you and your guests." },
          { title: "Health permit up to date", blurb: "Permitted kitchen, staff insured with the INS, food handled safely." },
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
          { name: "María José M.", role: "Quinceañera mom, San Pablo", quote: "The taco bar was the hit of the night. Everyone asked who catered. So worth it!" },
          { name: "Esteban P.", role: "Office manager, Belén", quote: "They fed 120 employees on time and the line moved fast. We book them every quarter now." },
          { name: "Melissa C.", role: "Bride, Santa Bárbara", quote: "Fresh, delicious, and beautifully set up. Our wedding guests are still talking about it." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much does catering cost?", a: "Most events run ₡7 000–₡14 000 per guest depending on the menu. We give a free written quote after a quick chat." },
          { q: "How far in advance should I book?", a: "We recommend 3–4 weeks for large events, but we often handle smaller parties on short notice." },
          { q: "Do you offer tastings?", a: "Yes — free tastings for events of 50+ guests so you can pick your menu with confidence." },
          { q: "Can the food truck come to my location?", a: "Absolutely. We travel all over Heredia and the Greater Metropolitan Area; a small travel fee is charged for far locations." },
        ],
      },
      contact: {
        title: "Request a Free Quote", blurb: "Tell us about your event. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Type of event", message: "Tell us about your event",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick an event type —",
        services: ["Private party", "Wedding / quinceañera", "Corporate event", "Food truck rental", "Other"],
      },
      footer: { tagline: "Tacos, bocas, and full catering for every celebration.", hours: "Tue–Sun · 9:00 a.m.–9:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Atendiendo eventos en Heredia desde 2012",
        title1: "Tacos, Bocas y Banquetes para",
        title2: "Fiestas, Bodas y Eventos de Empresa",
        subtitle: "Barras de tacos en vivo, bocas, arroz con pollo, banquetes completos y nuestro food truck para cualquier evento. Equipo bilingüe. Degustaciones gratis. Permiso sanitario al día.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Barra de Tacos en Vivo", "Bilingüe EN/ES", "Degustaciones Gratis", "Permiso Sanitario al Día"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "400+ eventos atendidos",
        trustTitle: "Permiso Sanitario", trustSubtitle: "Cocina con permiso al día",
      },
      services: {
        title: "Cómo Lo Atendemos", blurb: "Desde una fiesta en la casa hasta una gala de 300 invitados.",
        items: [
          { title: "Banquetes Completos", blurb: "Bufés, cenas servidas, bocas y arroz con pollo. Montamos, servimos y limpiamos." },
          { title: "Alquiler de Food Truck", blurb: "Reserve nuestro food truck para su evento. Tacos recién hechos, acompañamientos y frescos naturales en el lugar." },
          { title: "Fiestas y Empresas", blurb: "Bodas, quince años, almuerzos de oficina. Menús a la medida para cualquier grupo." },
        ],
      },
      why: {
        title: "Por Qué Nos Eligen",
        items: [
          { title: "Puntuales en cada evento", blurb: "Llegamos temprano y servimos a tiempo — sin estrés para usted." },
          { title: "Bilingüe: Inglés y Español", blurb: "Planeación clara que lo respeta a usted y a sus invitados." },
          { title: "Permiso sanitario al día", blurb: "Cocina con permiso, personal asegurado ante el INS, comida manejada con higiene." },
          { title: "Comida fresca y al momento", blurb: "Ingredientes reales, cocinados en el lugar — nunca recalentados." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Cuéntenos de su evento", blurb: "Fecha, número de invitados y el ambiente que desea." },
          { title: "Degustación y cotización gratis", blurb: "Pruebe el menú, elija sus favoritos y recíbalo por escrito." },
          { title: "Cocinamos y servimos", blurb: "Nos encargamos del montaje, servicio y limpieza el día del evento." },
          { title: "Usted disfruta la fiesta", blurb: "Relájese con sus invitados mientras cuidamos la comida." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "María José M.", role: "Mamá de quinceañera en San Pablo", quote: "La barra de tacos fue el éxito de la noche. Todos preguntaron quién hizo la comida. ¡Valió la pena!" },
          { name: "Esteban P.", role: "Gerente de oficina en Belén", quote: "Alimentaron a 120 empleados a tiempo y la fila avanzó rápido. Ahora los contratamos cada trimestre." },
          { name: "Melissa C.", role: "Novia en Santa Bárbara", quote: "Fresco, delicioso y bellamente montado. Nuestros invitados de boda todavía hablan de eso." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta el banquete?", a: "La mayoría de eventos cuestan entre ₡7 000 y ₡14 000 por invitado según el menú. Le damos una cotización gratis por escrito tras una breve conversación." },
          { q: "¿Con cuánta anticipación debo reservar?", a: "Recomendamos 3–4 semanas para eventos grandes, pero a menudo atendemos fiestas pequeñas con poco aviso." },
          { q: "¿Ofrecen degustaciones?", a: "Sí — degustaciones gratis para eventos de 50+ invitados, para que elija su menú con confianza." },
          { q: "¿El food truck puede ir a mi lugar?", a: "Por supuesto. Vamos a toda Heredia y la Gran Área Metropolitana; para lugares lejanos cobramos un pequeño cargo de traslado." },
        ],
      },
      contact: {
        title: "Pida una Cotización Gratis", blurb: "Cuéntenos de su evento. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Tipo de evento", message: "Cuéntenos de su evento",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un tipo de evento —",
        services: ["Fiesta privada", "Boda / quince años", "Evento de empresa", "Alquiler de food truck", "Otro"],
      },
      footer: { tagline: "Tacos, bocas y banquetes completos para cada celebración.", hours: "Mar a dom · 9:00 a. m. – 9:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "food",
  availability: { en: "Tue–Sun · 9:00 a.m.–9:00 p.m.", es: "Mar a dom · 9:00 a. m. – 9:00 p. m." },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Tell me about your event and guest count.",
    es: "¡Hola! Gracias por contactar a {business}. Cuénteme de su evento y cuántos invitados tendrá.",
    roleEn: "Catering Advisor", roleEs: "Asesora de Catering",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal5.jpg`, `${assets}/gal6.jpg`, `${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: "",
  },
  offers: {
    en: [
      { icon: "Truck", title: "Delivery & setup", blurb: "We bring the feast and set it up." },
      { icon: "Heart", title: "Made fresh to order", blurb: "Real recipes, generous portions." },
      { icon: "Banknote", title: "Custom packages", blurb: "Menus to fit your event and budget." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
    ],
    es: [
      { icon: "Truck", title: "Entrega y montaje", blurb: "Llevamos el banquete y lo montamos." },
      { icon: "Heart", title: "Hecho fresco al momento", blurb: "Recetas reales, porciones generosas." },
      { icon: "Banknote", title: "Paquetes a su medida", blurb: "Menús para su evento y presupuesto." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["Event buffet", "Food-truck tacos", "Bocas platter", "Grilled board for groups", "House-style meats"],
    es: ["Bufé para eventos", "Tacos del food truck", "Bandeja de bocas", "Parrillada para grupos", "Carnes de la casa"],
  },
};

export default catering;
