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
    city: "Liberia",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "reservas@lacocinabistro.com",
    address: "Costado sur del parque central, 50 m oeste, Liberia, Liberia, Guanacaste",
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
        subtitle: "Guanacaste family recipes, handmade corn tortillas, fresh ingredients, warm hospitality. Dine in, take out, delivery, or catering for your next event.",
        cta1: "Order Online", cta2: "Call Now",
        badges: ["Family Recipes", "Made Daily", "Catering Available", "5-Star Service"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1500+ happy guests",
        trustTitle: "Made Fresh Daily", trustSubtitle: "From scratch",
      },
      services: {
        title: "What We Serve", blurb: "From your everyday casado to the perfect celebration.",
        items: [
          { title: "Signature Dishes",       blurb: "Casados, olla de carne, arroz de maíz, chicharrones, and tacos on handmade tortillas. Generous portions, always fresh, never frozen." },
          { title: "Coffee & Pastries",      blurb: "Café chorreado, rosquillas, and tanelas every morning — perfect with gallo pinto." },
          { title: "Catering & Events",      blurb: "From office lunches to weddings — we handle the menu, you enjoy the day." },
        ],
      },
      why: {
        title: "Why Guests Come Back",
        items: [
          { title: "Open 7 days a week",          blurb: "Always here when you're craving us." },
          { title: "Bilingual service",           blurb: "Comfortable for English & Spanish guests." },
          { title: "Strict food safety",          blurb: "Health permit up to date and a spotless kitchen." },
          { title: "Loved by locals",             blurb: "Top-rated on Google by neighbors and visitors." },
        ],
      },
      process: {
        title: "How to Order",
        items: [
          { title: "Pick your favorite",     blurb: "Browse the menu online or at the restaurant." },
          { title: "Order how you like",     blurb: "Dine in, take out, delivery, or catering." },
          { title: "Pay & confirm",          blurb: "Easy payment. SINPE Móvil too." },
          { title: "Enjoy fresh food",       blurb: "Ready when you are. Hot, fresh, on time." },
        ],
      },
      testimonials: {
        title: "What Guests Say",
        items: [
          { name: "Luis Diego R.",  role: "Regular, Liberia",                  quote: "Best in town. Hands down. The flavors take me right back to my grandmother's kitchen." },
          { name: "Ana Lucía H.",   role: "Wedding planner, Playas del Coco",  quote: "We've used them to cater 4 weddings. Food perfect every time, staff incredibly kind." },
          { name: "Mauricio P.",    role: "Office manager, Liberia",           quote: "We order team lunch every Friday. Always on time, always delicious, always a great deal." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you take reservations?",     a: "Yes — reserve online or call. Walk-ins always welcome, but Friday and Saturday fill up." },
          { q: "Do you deliver?",               a: "Yes — through our site (no extra fees) or through the delivery apps." },
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
      footer: { tagline: "Family flavors, every day, made with love.", hours: "Mon–Sun · 11:00 a.m.–10:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Menú", why: "Por Qué", process: "Pedir", testimonials: "Reseñas", faq: "FAQ", contact: "Visite", call: "Llame" },
      hero: {
        eyebrow: "Recetas familiares desde 1998",
        title1: "Sabores Auténticos,",
        title2: "Hechos Desde Cero Cada Día",
        subtitle: "Recetas familiares guanacastecas, tortillas palmeadas a mano, ingredientes frescos, atención cálida. Coma aquí, para llevar, express o catering.",
        cta1: "Pida en Línea", cta2: "Llame Ahora",
        badges: ["Recetas Familiares", "Hecho Diario", "Catering Disponible", "Servicio 5 Estrellas"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1500+ comensales felices",
        trustTitle: "Hecho Fresco Diario", trustSubtitle: "Desde cero",
      },
      services: {
        title: "Lo Que Servimos", blurb: "Desde su casado de todos los días hasta la celebración perfecta.",
        items: [
          { title: "Platos de la Casa",      blurb: "Casados, olla de carne, arroz de maíz, chicharrones y tacos en tortilla palmeada. Porciones generosas, siempre frescos, nunca congelados." },
          { title: "Café y Repostería",      blurb: "Café chorreado, rosquillas y tanelas cada mañana — ideales con gallo pinto." },
          { title: "Catering y Eventos",     blurb: "De almuerzos de oficina a bodas — nosotros del menú, usted del día." },
        ],
      },
      why: {
        title: "Por Qué Regresan",
        items: [
          { title: "Abierto los 7 días",       blurb: "Siempre aquí cuando tenga antojo." },
          { title: "Servicio bilingüe",        blurb: "Cómodo para clientes en inglés y español." },
          { title: "Estricta higiene",         blurb: "Permiso sanitario al día y una cocina impecable." },
          { title: "Querido por la gente",     blurb: "Mejor calificado en Google por vecinos y visitantes." },
        ],
      },
      process: {
        title: "Cómo Pedir",
        items: [
          { title: "Elija su favorito",       blurb: "Vea el menú en línea o en el restaurante." },
          { title: "Pida como guste",         blurb: "Coma aquí, para llevar, express o catering." },
          { title: "Pague y confirme",        blurb: "Pago fácil. También por SINPE Móvil." },
          { title: "Disfrute comida fresca",  blurb: "Listo cuando usted lo esté. Caliente, fresco, puntual." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Comensales",
        items: [
          { name: "Luis Diego R.", role: "Cliente fiel en Liberia",                  quote: "El mejor del pueblo, sin duda. Los sabores me llevan a la cocina de mi abuela." },
          { name: "Ana Lucía H.",  role: "Organizadora de bodas en Playas del Coco", quote: "Los hemos contratado para 4 bodas. Comida perfecta, personal increíblemente amable." },
          { name: "Mauricio P.",   role: "Gerente de oficina en Liberia",            quote: "Pedimos almuerzo cada viernes. Siempre puntual, siempre delicioso, siempre buen precio." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Aceptan reservaciones?",        a: "Sí — reserve en línea o llame. Sin reservación siempre es bienvenido, pero viernes y sábado se llenan." },
          { q: "¿Tienen servicio express?",      a: "Sí — por nuestro sitio (sin costo extra) o por las aplicaciones de entrega." },
          { q: "¿Hacen catering para eventos?",  a: "Sí — de 10 a 500 invitados. Llevamos la comida, montamos y limpiamos. Menús personalizados." },
          { q: "¿Tienen opciones vegetarianas?", a: "Sí — cada sección tiene opciones vegetarianas y sin gluten. Solo pregunte." },
        ],
      },
      contact: {
        title: "Visítenos o Reserve Catering", blurb: "Venga, llame o pida catering. Respondemos en pocas horas.",
        name: "Su nombre", phone: "Teléfono", service: "¿En qué le ayudamos?", message: "Cuéntenos sobre su evento",
        submit: "Enviar Solicitud", success: "Gracias — nos pondremos en contacto pronto.",
        pick: "— Elija una opción —",
        services: ["Reservación", "Consulta de catering", "Evento privado", "Pedido para llevar", "Otro"],
      },
      footer: { tagline: "Sabores familiares, cada día, hechos con amor.", hours: "Lun a dom · 11:00 a. m. – 10:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "food",
  facts: {
    stats: [
      { value: "14+", labelEn: "Years cooking", labelEs: "Años cocinando" },
      { value: "Family", valueEs: "Familiar", labelEn: "Recipes & owners", labelEs: "Recetas y dueños" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "7 nights", valueEs: "7 noches", labelEn: "Open every week", labelEs: "Abierto cada semana" },
    ],
    areasEn: ["Liberia", "Guardia", "Cañas Dulces", "Curubandé", "Nacascolo", "Sardinal", "Playas del Coco", "Playa Hermosa", "Filadelfia", "Bagaces", "Santa Cruz", "Tamarindo"],
    areasEs: ["Liberia", "Guardia", "Cañas Dulces", "Curubandé", "Nacascolo", "Sardinal", "Playas del Coco", "Playa Hermosa", "Filadelfia", "Bagaces", "Santa Cruz", "Tamarindo"],
    certsEn: ["Health Permit Up to Date", "Staff with Food Handling Card", "Reviews on Google", "Recommended by Neighbors", "Family Recipes Since 1998", "Local Ingredients"],
    certsEs: ["Permiso sanitario de funcionamiento al día", "Personal con carné de manipulación de alimentos", "Reseñas en Google", "Recomendados por vecinos", "Recetas familiares desde 1998", "Ingredientes de la zona"],
    guaranteeEn: { title: "If you don't love it, we'll remake it", blurb: "Every dish is made to order. Not happy with anything on your plate? Send it back — we'll fix it or take it off the bill." },
    guaranteeEs: { title: "Si no le encanta, lo hacemos de nuevo", blurb: "Cada plato se prepara al momento. ¿No le gustó algo? Devuélvalo — lo rehacemos o lo quitamos de la cuenta." },
  },
  availability: { en: "Open daily · Catering 7 days a week", es: "Abierto todos los días · Catering 7 días" },
  assistant: {
    name: "Rosa",
    en: "Hi! I'm Rosa at {business}. Want a table or to book catering? We're here 24/7 — call or message anytime.",
    es: "¡Hola! Soy Rosa de {business}. ¿Desea mesa o catering? Estamos 24/7 — llame o escríbanos cuando guste.",
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
      { icon: "Banknote",    title: "Free dessert",           blurb: "Mention this site, get a free flan on your first visit." },
      { icon: "Languages",   title: "Bilingual EN/ES",        blurb: "Bilingual menus & staff." },
      { icon: "BadgeCheck",  title: "4.9★ on Google",         blurb: "Loved by neighbors and visitors · 1500+ reviews." },
    ],
    es: [
      { icon: "Clock",       title: "Reservas 24/7",          blurb: "Reserve mesa o catering a cualquier hora." },
      { icon: "Sparkles",    title: "Hecho a mano cada día",  blurb: "Recetas familiares desde 1998 · cero mezclas." },
      { icon: "Truck",       title: "Catering 7 días",        blurb: "Oficina, boda, quince años — de 10 a 500 invitados." },
      { icon: "Banknote",    title: "Postre gratis",          blurb: "Mencione este sitio y reciba un flan gratis en su primera visita." },
      { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Menús y personal bilingüe." },
      { icon: "BadgeCheck",  title: "4.9★ en Google",         blurb: "Querido por vecinos y visitantes · más de 1500 reseñas." },
    ],
  },
  galleryCaptions: {
    en: ["Marinated pork on the griddle", "Warm, family dining room", "Family celebration at our tables"],
    es: ["Cerdo adobado a la plancha", "Salón cálido y familiar", "Celebración familiar en nuestras mesas"],
  },
};

export default restaurant;
