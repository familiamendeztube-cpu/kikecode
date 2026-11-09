import { Cookie, Cake, Croissant, Coffee, Clock, ShieldCheck, Languages, Star } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/bakery`;

const bakery: BusinessTemplate = {
  slug: "bakery",
  industry: "Bakery / Panadería",
  industryEs: "Panadería",
  websiteType: "Local Business Website",
  defaultServicesField: "Fresh bread daily, Custom cakes, Quinceañera cakes, Wedding cakes, Pan dulce, Coffee, Catering trays",
  brand: {
    name: "Dulce Bakery",
    city: "Grecia",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@dulcebakery.com",
    address: "De la iglesia católica, 100 m sur y 25 m este, Grecia, Alajuela",
    heroIcon: Cookie,
    palette: {
      primary: "#db2777", primaryDark: "#be185d", accent: "#fbcfe8",
      heroFrom: "#431407", heroVia: "#7c2d12", heroTo: "#292524",
      heroGlow1: "rgba(219,39,119,0.5)", heroGlow2: "rgba(251,191,36,0.35)",
      heroIconFrom: "#ec4899", heroIconTo: "#9d174d",
      contactFrom: "#db2777", contactTo: "#9f1239",
    },
  },
  serviceIcons: [Cake, Croissant, Coffee],
  whyIcons: [Clock, Languages, ShieldCheck, Star],
  content: {
    en: {
      nav: { services: "Menu", why: "Why Us", process: "Order", testimonials: "Reviews", faq: "FAQ", contact: "Visit", call: "Call" },
      hero: {
        eyebrow: "Family bakery since 1995",
        title1: "Fresh-Baked Joy,",
        title2: "Every Morning From Our Oven",
        subtitle: "Pan dulce, custom cakes, pan casero, café chorreado. Family recipes, bilingual service, warm welcome.",
        cta1: "Order a Cake", cta2: "Call Now",
        badges: ["Baked Fresh Daily", "Family Recipes", "Bilingual EN/ES", "Custom Cakes"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "900+ five-star reviews",
        trustTitle: "Baked Fresh Daily", trustSubtitle: "From scratch every morning",
      },
      services: {
        title: "What We Bake", blurb: "Recipes from home. Made daily, by hand.",
        items: [
          { title: "Custom Cakes",       blurb: "Quinceañera, wedding, birthday, baby shower. Tres leches, chocolate, queque seco. Photo-ready and delicious." },
          { title: "Daily Pan Dulce",    blurb: "Pan casero, cachos, empanadas de piña and chiverre, prestiños — fresh every single morning." },
          { title: "Coffee & Catering",  blurb: "Café chorreado, hot chocolate, pastry and bocas trays for events and offices." },
        ],
      },
      why: {
        title: "Why Customers Come Back",
        items: [
          { title: "Open early, 7 days",        blurb: "Warm pan dulce and fresh coffee from 6:00 a.m." },
          { title: "Bilingual service",         blurb: "Comfortable for English and Spanish speakers." },
          { title: "Strict food safety",        blurb: "Health permit up to date. Clean kitchen, fresh ingredients." },
          { title: "Loved by neighbors",        blurb: "Top-rated on Google. Real reviews from real customers." },
        ],
      },
      process: {
        title: "How to Order",
        items: [
          { title: "Stop in or order online",   blurb: "See the case fresh or browse our menu." },
          { title: "Custom cake? Call us",      blurb: "We design to your photo, flavor, and date." },
          { title: "We bake & wrap",            blurb: "Fresh that morning, beautifully boxed." },
          { title: "Pick up or delivery",       blurb: "Come grab it or we deliver around Grecia." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Marianela V.", role: "Regular customer, Grecia",           quote: "The pan casero tastes exactly like the one my grandmother baked in Sarchí. I got teary the first time." },
          { name: "Luis Diego M.", role: "Quinceañera dad, Naranjo",          quote: "The cake was a masterpiece. People asked where it was from all night long." },
          { name: "Karla L.",      role: "Office manager, Alajuela",          quote: "We order their tray on Tuesdays for the team. Gone in 30 minutes every time." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "What time is fresh pan dulce ready?", a: "Fresh batches come out starting at 6:00 a.m. and through the morning. Best selection from 6:00 a.m. to noon." },
          { q: "How much do custom cakes cost?",      a: "Birthday cakes from ₡22 500. Tiered cakes from ₡75 000. Quinceañera and wedding cakes quoted on design." },
          { q: "How far in advance for cakes?",       a: "Custom cakes 5–7 days ahead. Wedding and quinceañera cakes 3–4 weeks ahead." },
          { q: "Do you cater offices and events?",    a: "Yes — pastry trays, coffee setup, and breakfast spreads. Delivery available." },
        ],
      },
      contact: {
        title: "Order or Stop By", blurb: "Order a custom cake, ask about catering, or just come say hi. We're here daily.",
        name: "Your name", phone: "Phone", service: "What can we make?", message: "Tell us about your order",
        submit: "Send Request", success: "Thank you — we'll be in touch shortly.",
        pick: "— Pick an option —",
        services: ["Custom cake", "Catering / trays", "Pre-order pan dulce", "Wedding cake", "Other"],
      },
      footer: { tagline: "Fresh-baked memories every single morning.", hours: "Mon–Sun · 6:00 a.m.–8:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Menú", why: "Por Qué", process: "Pedir", testimonials: "Reseñas", faq: "FAQ", contact: "Visite", call: "Llame" },
      hero: {
        eyebrow: "Panadería familiar desde 1995",
        title1: "Alegría Recién Horneada,",
        title2: "Cada Mañana de Nuestro Horno",
        subtitle: "Pan dulce, queques, pan casero, café chorreado. Recetas familiares, servicio bilingüe, bienvenida cálida.",
        cta1: "Pida un Queque", cta2: "Llame Ahora",
        badges: ["Horneado Diario", "Recetas Familiares", "Bilingüe EN/ES", "Queques Personalizados"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "900+ reseñas de 5 estrellas",
        trustTitle: "Horneado Diario", trustSubtitle: "Desde cero cada mañana",
      },
      services: {
        title: "Lo Que Horneamos", blurb: "Recetas de la casa. Hechas a mano, todos los días.",
        items: [
          { title: "Queques Personalizados", blurb: "Quince años, boda, cumpleaños, baby shower. Tres leches, chocolate, queque seco. Hermosos y deliciosos." },
          { title: "Pan Dulce Diario",       blurb: "Pan casero, cachos, empanadas de piña y chiverre, prestiños — frescos cada mañana." },
          { title: "Café y Bocas",           blurb: "Café chorreado, chocolate caliente, bandejas de repostería y bocas para eventos y oficinas." },
        ],
      },
      why: {
        title: "Por Qué Regresan",
        items: [
          { title: "Abierto temprano, 7 días",    blurb: "Pan dulce calientito y café fresco desde las 6:00 a. m." },
          { title: "Servicio bilingüe",           blurb: "Cómodo para clientes en inglés y español." },
          { title: "Estricta higiene",            blurb: "Permiso sanitario al día. Cocina limpia, ingredientes frescos." },
          { title: "Querido por los vecinos",     blurb: "Mejor calificado en Google. Reseñas reales." },
        ],
      },
      process: {
        title: "Cómo Pedir",
        items: [
          { title: "Venga o pida en línea",    blurb: "Vea la vitrina fresca o explore el menú." },
          { title: "¿Queque personalizado?",   blurb: "Lo diseñamos según su foto, sabor y fecha." },
          { title: "Horneamos y empacamos",    blurb: "Fresco esa mañana, hermosamente empacado." },
          { title: "Recoja o entrega",         blurb: "Venga por él o se lo llevamos en Grecia y alrededores." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Marianela V.",  role: "Clienta fiel en Grecia",            quote: "El pan casero sabe igualito al que hacía mi abuela en Sarchí. La primera vez se me salieron las lágrimas." },
          { name: "Luis Diego M.", role: "Papá de quinceañera en Naranjo",    quote: "El queque fue una obra de arte. Toda la noche preguntaron de dónde era." },
          { name: "Karla L.",      role: "Gerente de oficina en Alajuela",    quote: "Pedimos la bandeja los martes para el equipo. Se acaba en 30 minutos siempre." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿A qué hora está el pan dulce fresco?", a: "Las hornadas frescas salen desde las 6:00 a. m. durante toda la mañana. La mejor selección es entre las 6:00 a. m. y el mediodía." },
          { q: "¿Cuánto cuesta un queque personalizado?", a: "Queques de cumpleaños desde ₡22 500. De pisos desde ₡75 000. Quince años y boda según diseño." },
          { q: "¿Con cuánta anticipación pedir?",        a: "Queques personalizados 5–7 días antes. Boda y quince años 3–4 semanas antes." },
          { q: "¿Hacen bocas para oficinas y eventos?",  a: "Sí — bandejas de repostería, servicio de café y desayunos. Entrega disponible." },
        ],
      },
      contact: {
        title: "Pida o Visítenos", blurb: "Pida un queque personalizado, pregunte por bandejas o solo venga a saludar.",
        name: "Su nombre", phone: "Teléfono", service: "¿Qué le preparamos?", message: "Cuéntenos sobre su pedido",
        submit: "Enviar Solicitud", success: "Gracias — nos pondremos en contacto pronto.",
        pick: "— Elija una opción —",
        services: ["Queque personalizado", "Bocas / bandejas", "Encargo de pan dulce", "Queque de boda", "Otro"],
      },
      footer: { tagline: "Recuerdos recién horneados cada mañana.", hours: "Lun a dom · 6:00 a. m. – 8:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "food",
  facts: {
    stats: [
      { value: "30+", labelEn: "Years baking", labelEs: "Años horneando" },
      { value: "Daily", valueEs: "Diario", labelEn: "Pan dulce fresh", labelEs: "Pan dulce fresco" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "100s", valueEs: "Cientos", labelEn: "Quinceañera cakes/yr", labelEs: "Queques de quince años al año" },
    ],
    areasEn: ["Grecia", "Tacares", "San Roque", "Puente de Piedra", "San Isidro de Grecia", "Sarchí", "Naranjo", "Poás", "Atenas", "Palmares", "Alajuela"],
    areasEs: ["Grecia", "Tacares", "San Roque", "Puente de Piedra", "San Isidro de Grecia", "Sarchí", "Naranjo", "Poás", "Atenas", "Palmares", "Alajuela"],
    certsEn: ["Health Permit Up to Date", "Bakers with Food Handling Card", "Reviews on Google", "Recommended by Neighbors", "Family Recipes Since 1995", "Same-day Custom Cakes"],
    certsEs: ["Permiso sanitario de funcionamiento al día", "Panaderos con carné de manipulación de alimentos", "Reseñas en Google", "Recomendados por vecinos", "Recetas familiares desde 1995", "Queques personalizados el mismo día"],
    guaranteeEn: { title: "Fresh today or it's free", blurb: "Every loaf, cake, and tray is baked the same morning you pick it up. If it's not fresh, it's free. Promise." },
    guaranteeEs: { title: "Fresco hoy o es gratis", blurb: "Cada pan, queque y bandeja se hornea la misma mañana que usted lo recoge. Si no está fresco, es gratis. Palabra." },
  },
  availability: { en: "Open 7 days · Custom orders 24/7", es: "Abierto 7 días · Pedidos especiales 24/7" },
  assistant: {
    name: "Elena",
    en: "Hi! I'm Elena at {business}. Order custom cakes, pan dulce trays, or wedding desserts 24/7 — we'll send you photos on WhatsApp before pickup.",
    es: "¡Hola! Soy Elena de {business}. Pida queques personalizados, bandejas de pan dulce o postres de boda 24/7 — le enviamos fotos por WhatsApp antes de que lo recoja.",
    roleEn: "Order specialist", roleEs: "Especialista de pedidos",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal2.jpg`, `${assets}/gal1.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "Order 24/7",             blurb: "Custom cake quotes online or by phone any hour." },
      { icon: "Sparkles",    title: "From-scratch daily",     blurb: "No mixes, no shortcuts — true panadería tradition." },
      { icon: "Heart",       title: "Custom designs",         blurb: "Send a photo, we'll match it · approval before bake." },
      { icon: "Banknote",    title: "Bulk discounts",         blurb: "Pan dulce trays from ₡12 000 · save 15% on 3+ dozen." },
      { icon: "Languages",   title: "Bilingual EN/ES",        blurb: "Bilingual staff and orders." },
      { icon: "Truck",       title: "Delivery available",     blurb: "We deliver around Grecia and nearby towns — fee from ₡7 500." },
    ],
    es: [
      { icon: "Clock",       title: "Pida 24/7",               blurb: "Cotizaciones de queques a cualquier hora." },
      { icon: "Sparkles",    title: "Hecho a mano cada día",   blurb: "Sin mezclas, sin atajos — auténtica tradición panadera." },
      { icon: "Heart",       title: "Diseños personalizados",  blurb: "Envíenos una foto y la replicamos · aprobación antes de hornear." },
      { icon: "Banknote",    title: "Descuento por volumen",   blurb: "Bandejas de pan dulce desde ₡12 000 · 15% en 3+ docenas." },
      { icon: "Languages",   title: "Bilingüe EN/ES",          blurb: "Personal y pedidos bilingües." },
      { icon: "Truck",       title: "Entrega disponible",      blurb: "Entregamos en Grecia y pueblos cercanos — desde ₡7 500." },
    ],
  },
  galleryCaptions: {
    en: ["Custom wedding cake", "Pan dulce, fresh from the oven", "Today's pastry case"],
    es: ["Queque de boda personalizado", "Pan dulce recién horneado", "Vitrina de repostería del día"],
  },
};

export default bakery;
