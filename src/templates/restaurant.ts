import { Utensils, ChefHat, Coffee, Pizza, Clock, ShieldCheck, Languages, Star } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/restaurant`;

const restaurant: BusinessTemplate = {
  slug: "restaurant",
  industry: "Restaurant / Catering",
  industryEs: "Restaurante / Catering",
  websiteType: "Restaurant Website",
  defaultServicesField: "Dine-in, Takeout, Delivery, Catering for events, Private parties, Family-style meals",
  brand: {
    name: "La Cocina Bistro",
    city: "San Antonio, TX",
    phone: "1-800-555-0660",
    phoneHref: "tel:+18005550660",
    email: "reservas@lacocinabistro.com",
    address: "316 Alamo Plaza, San Antonio, TX 78205",
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
  category: "food",
  facts: {
    stats: [
      { value: "14+", labelEn: "Years cooking", labelEs: "Años cocinando" },
      { value: "Family", labelEn: "Recipes & owners", labelEs: "Recetas y dueños" },
      { value: "4.9★", labelEn: "Yelp rating", labelEs: "Calificación Yelp" },
      { value: "7 nights", labelEn: "Open every week", labelEs: "Abierto cada semana" },
    ],
    areasEn: ["San Antonio", "Alamo Heights", "Stone Oak", "Pearl District", "Southtown", "Boerne", "Schertz", "Helotes", "Live Oak", "Leon Valley", "Olmos Park", "Universal City"],
    areasEs: ["San Antonio", "Alamo Heights", "Stone Oak", "Pearl District", "Southtown", "Boerne", "Schertz", "Helotes", "Live Oak", "Leon Valley", "Olmos Park", "Universal City"],
    certsEn: ["TX Food Manager Certified", "ServSafe Trained Staff", "OpenTable Verified", "Featured: Texas Monthly", "Tripadvisor Travelers' Choice", "Local Sourcing Member"],
    certsEs: ["Certificado TX Food Manager", "Personal entrenado ServSafe", "Verificado OpenTable", "Destacado: Texas Monthly", "Tripadvisor Travelers' Choice", "Miembro Local Sourcing"],
    guaranteeEn: { title: "If you don't love it, we'll remake it", blurb: "Every dish is made to order. Not happy with anything on your plate? Send it back — we'll fix it or take it off the bill." },
    guaranteeEs: { title: "Si no te encanta, lo hacemos de nuevo", blurb: "Cada platillo va hecho al momento. ¿No te gustó algo? Regrésalo — lo rehacemos o lo quitamos de la cuenta." },
  },
  availability: { en: "Open daily · Catering 7 days a week", es: "Abierto todos los días · Catering 7 días" },
  assistant: {
    name: "Rosa",
    en: "Hi! I'm Rosa at {business}. Want a table or to book catering? We're here 24/7 — call or message anytime.",
    es: "¡Hola! Soy Rosa de {business}. ¿Quieres mesa o catering? Estamos 24/7 — llama o escribe cuando quieras.",
    roleEn: "Reservations host", roleEs: "Anfitriona de reservas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "24/7 reservations",      blurb: "Book a table or catering any hour, online or phone." },
      { icon: "Sparkles",    title: "Made-from-scratch daily",blurb: "Family recipes since 1998 · zero pre-mixes." },
      { icon: "Truck",       title: "Catering 7 days",        blurb: "Office, wedding, quinceañera — from 10 to 500 guests." },
      { icon: "DollarSign",  title: "Free dessert",           blurb: "Mention this site, get a free flan on first visit." },
      { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Menus & staff bilingual." },
      { icon: "BadgeCheck",  title: "4.9★ on Yelp",           blurb: "Top 10 Tex-Mex in San Antonio · 1,500+ reviews." },
    ],
    es: [
      { icon: "Clock",       title: "Reservas 24/7",          blurb: "Reserva mesa o catering a cualquier hora." },
      { icon: "Sparkles",    title: "Hecho a mano cada día",  blurb: "Recetas familiares desde 1998 · cero mezclas." },
      { icon: "Truck",       title: "Catering 7 días",        blurb: "Oficina, boda, quinceañera — de 10 a 500 invitados." },
      { icon: "DollarSign",  title: "Postre gratis",          blurb: "Menciona este sitio, recibe un flan gratis." },
      { icon: "Languages",   title: "Bilingual EN/ES",        blurb: "Menús y personal bilingüe." },
      { icon: "BadgeCheck",  title: "4.9★ en Yelp",           blurb: "Top 10 Tex-Mex en San Antonio · más de 1,500 reseñas." },
    ],
  },
  galleryCaptions: {
    en: ["Signature tacos al pastor", "Warm, family dining room", "Catered family celebration"],
    es: ["Tacos al pastor de la casa", "Salón cálido y familiar", "Celebración familiar con catering"],
  },
};

export default restaurant;
