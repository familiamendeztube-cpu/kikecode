import { Utensils, ChefHat, Coffee, Pizza, Clock, ShieldCheck, Languages, Star } from "lucide-react";
import type { BusinessTemplate } from "./types";

const restaurant: BusinessTemplate = {
  slug: "restaurant",
  industry: "Restaurant / Catering",
  industryEs: "Restaurante / Catering",
  websiteType: "Restaurant Website",
  defaultServicesField: "Dine-in, Takeout, Delivery, Catering for events, Private parties, Family-style meals",
  brand: {
    name: "La Cocina Bistro",
    city: "San Antonio",
    phone: "(555) 010-0006",
    phoneHref: "tel:+15550100006",
    email: "hello@lacocinabistro.com",
    address: "600 Market St, San Antonio, TX 78205",
    heroIcon: Utensils,
    palette: {
      primary: "#C9A227", primaryDark: "#8a6c14", accent: "#FFF9F0",
      heroFrom: "#0A1A29", heroVia: "#04111E", heroTo: "#0A1A29",
      heroGlow1: "rgba(201,162,39,0.45)", heroGlow2: "rgba(255,249,240,0.12)",
      heroIconFrom: "#C9A227", heroIconTo: "#8a6c14",
      contactFrom: "#C9A227", contactTo: "#0A1A29",
    },
  },
  serviceIcons: [ChefHat, Coffee, Pizza],
  whyIcons: [Clock, Languages, ShieldCheck, Star],
  content: {
    en: {
      nav: { services: "Menu", why: "Why Us", process: "Order", testimonials: "Reviews", faq: "FAQ", contact: "Visit", call: "Call" },
      hero: {
        eyebrow: "Family recipes since 1998",
        title1: "Authentic Flavors,",
        title2: "Made From Scratch Every Day",
        subtitle: "Family recipes, fresh ingredients, warm hospitality. Dine in, take out, deliver, or cater your next event.",
        cta1: "Order Online", cta2: "Call Now",
        badges: ["Family Recipes", "Made Daily", "Catering Available", "5-Star Service"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1500+ happy guests",
        trustTitle: "Made Fresh Daily", trustSubtitle: "From scratch",
      },
      services: {
        title: "What We Serve", blurb: "From your favorite weeknight meal to the perfect celebration.",
        items: [
          { title: "Signature Dishes",       blurb: "Family-recipe classics. Generous portions. Always made fresh, never frozen." },
          { title: "Coffee & Pastries",      blurb: "House-roasted coffee, fresh pastries every morning, perfect with brunch." },
          { title: "Catering & Events",      blurb: "From office lunches to weddings — we handle the menu, you enjoy the day." },
        ],
      },
      why: {
        title: "Why Guests Come Back",
        items: [
          { title: "Open 7 days a week",          blurb: "Always here when you're craving us." },
          { title: "Bilingual service",           blurb: "Comfortable for English & Spanish guests." },
          { title: "Strict food safety",          blurb: "Top health inspection scores year after year." },
          { title: "Loved by locals",             blurb: "Top-rated on Google, Yelp, and OpenTable." },
        ],
      },
      process: {
        title: "How to Order",
        items: [
          { title: "Pick your favorite",     blurb: "Browse the menu online or in-store." },
          { title: "Order how you like",     blurb: "Dine in, take out, delivery, or catering." },
          { title: "Pay & confirm",          blurb: "Easy online payment. Apple Pay too." },
          { title: "Enjoy fresh food",       blurb: "Ready when you are. Hot, fresh, on time." },
        ],
      },
      testimonials: {
        title: "What Guests Say",
        items: [
          { name: "Antonio R.",  role: "Regular",            quote: "Best in town. Hands down. The flavors take me right back to my grandmother's kitchen." },
          { name: "Lisa H.",     role: "Event planner",      quote: "We've used them to cater 4 weddings. Food perfect every time, staff incredibly kind." },
          { name: "Tom P.",      role: "Office manager",     quote: "We order team lunch every Friday. Always on time, always delicious, always a great deal." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you take reservations?",     a: "Yes — reserve online or call. Walk-ins always welcome, but Friday and Saturday fill up." },
          { q: "Do you deliver?",               a: "Yes — through our site (no extra fees) or via UberEats, DoorDash, and Grubhub." },
          { q: "Do you cater events?",          a: "Yes — from 10 to 500 guests. We deliver, set up, and clean up. Custom menus on request." },
          { q: "Do you have vegetarian options?", a: "Yes — every menu section has vegetarian and gluten-free options. Just ask your server." },
        ],
      },
      contact: {
        title: "Visit Us or Book Catering", blurb: "Stop by, give us a call, or request catering. We respond within hours.",
        name: "Your name", phone: "Phone", service: "What can we help with?", message: "Tell us about your event",
        submit: "Send Request", success: "Thank you — we'll be in touch shortly.",
        pick: "— Pick an option —",
        services: ["Reservation", "Catering inquiry", "Private event", "Takeout order", "Other"],
      },
      footer: { tagline: "Family flavors, every day, made with love.", hours: "Mon–Sun · 11am–10pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Menú", why: "Por Qué", process: "Pedir", testimonials: "Reseñas", faq: "FAQ", contact: "Visite", call: "Llame" },
      hero: {
        eyebrow: "Recetas familiares desde 1998",
        title1: "Sabores Auténticos,",
        title2: "Hechos Desde Cero Cada Día",
        subtitle: "Recetas familiares, ingredientes frescos, hospitalidad cálida. Coma aquí, lleve, pida o catering.",
        cta1: "Ordene en Línea", cta2: "Llame Ahora",
        badges: ["Recetas Familiares", "Hecho Diario", "Catering Disponible", "Servicio 5 Estrellas"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1500+ comensales felices",
        trustTitle: "Hecho Fresco Diario", trustSubtitle: "Desde cero",
      },
      services: {
        title: "Lo Que Servimos", blurb: "Desde su comida favorita hasta la celebración perfecta.",
        items: [
          { title: "Platos de la Casa",      blurb: "Clásicos de receta familiar. Porciones generosas. Siempre frescos, nunca congelados." },
          { title: "Café y Pan Dulce",       blurb: "Café tostado en casa, pan dulce fresco cada mañana." },
          { title: "Catering y Eventos",     blurb: "De almuerzos de oficina a bodas — nosotros del menú, usted del día." },
        ],
      },
      why: {
        title: "Por Qué Regresan",
        items: [
          { title: "Abierto los 7 días",       blurb: "Siempre aquí cuando tenga antojo." },
          { title: "Servicio bilingüe",        blurb: "Cómodo para clientes en inglés y español." },
          { title: "Estricta seguridad",       blurb: "Mejores puntajes de salud año tras año." },
          { title: "Querido por locales",      blurb: "Mejor calificado en Google, Yelp y OpenTable." },
        ],
      },
      process: {
        title: "Cómo Pedir",
        items: [
          { title: "Elija su favorito",       blurb: "Vea el menú en línea o en la tienda." },
          { title: "Pida como guste",         blurb: "Coma aquí, llevar, entrega o catering." },
          { title: "Pague y confirme",        blurb: "Pago fácil en línea. Apple Pay también." },
          { title: "Disfrute comida fresca",  blurb: "Listo cuando usted lo esté. Caliente, fresco, puntual." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Comensales",
        items: [
          { name: "Antonio R.",  role: "Cliente fiel",          quote: "El mejor del pueblo. Los sabores me llevan a la cocina de mi abuela." },
          { name: "Lisa H.",     role: "Organizadora de eventos", quote: "Los hemos usado para 4 bodas. Comida perfecta, personal increíblemente amable." },
          { name: "Tom P.",      role: "Gerente de oficina",    quote: "Pedimos almuerzo cada viernes. Siempre puntual, siempre delicioso, siempre buen precio." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Aceptan reservaciones?",        a: "Sí — reserve en línea o llame. Sin cita siempre bienvenido, pero viernes y sábado se llenan." },
          { q: "¿Hacen entrega?",                a: "Sí — por nuestro sitio (sin costo extra) o por UberEats, DoorDash y Grubhub." },
          { q: "¿Hacen catering para eventos?",  a: "Sí — de 10 a 500 invitados. Entregamos, instalamos y limpiamos. Menús personalizados." },
          { q: "¿Tienen opciones vegetarianas?", a: "Sí — cada sección tiene opciones vegetarianas y sin gluten. Solo pregunte." },
        ],
      },
      contact: {
        title: "Visítenos o Reserve Catering", blurb: "Venga, llame o pida catering. Respondemos en horas.",
        name: "Su nombre", phone: "Teléfono", service: "¿En qué le ayudamos?", message: "Cuéntenos sobre su evento",
        submit: "Enviar Solicitud", success: "Gracias — nos pondremos en contacto pronto.",
        pick: "— Elija una opción —",
        services: ["Reservación", "Pregunta de catering", "Evento privado", "Pedido para llevar", "Otro"],
      },
      footer: { tagline: "Sabores familiares, cada día, hechos con amor.", hours: "Lun–Dom · 11am–10pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default restaurant;
