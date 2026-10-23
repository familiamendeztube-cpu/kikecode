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
    city: "Miami, FL",
    phone: "1-800-555-0119",
    phoneHref: "tel:+18005550119",
    email: "hola@dulcebakery.com",
    address: "1418 Calle 8, Miami, FL 33135",
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
        subtitle: "Pan dulce, custom cakes, fresh bread, real coffee. Family recipes, bilingual service, warm welcome.",
        cta1: "Order a Cake", cta2: "Call Now",
        badges: ["Baked Fresh Daily", "Family Recipes", "Bilingual EN/ES", "Custom Cakes"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "900+ five-star reviews",
        trustTitle: "Baked Fresh Daily", trustSubtitle: "From scratch every morning",
      },
      services: {
        title: "What We Bake", blurb: "Old-world recipes. Made daily, by hand.",
        items: [
          { title: "Custom Cakes",       blurb: "Quinceañera, wedding, birthday, baby shower. Photo-ready and delicious." },
          { title: "Daily Pan Dulce",    blurb: "Conchas, cuernitos, empanadas, polvorones — fresh every single morning." },
          { title: "Coffee & Catering",  blurb: "House coffee, hot chocolate, pastry trays for events and offices." },
        ],
      },
      why: {
        title: "Why Customers Come Back",
        items: [
          { title: "Open early, 7 days",        blurb: "Hot pan dulce and fresh coffee from 6am." },
          { title: "Bilingual service",         blurb: "Cómodo para clientes en inglés y español." },
          { title: "Strict food safety",        blurb: "Top scores year after year. Clean kitchen, fresh ingredients." },
          { title: "Loved by neighbors",        blurb: "Top-rated on Google. Real reviews from real customers." },
        ],
      },
      process: {
        title: "How to Order",
        items: [
          { title: "Stop in or order online",   blurb: "See the case fresh or browse our menu." },
          { title: "Custom cake? Call us",      blurb: "We design to your photo, flavor, and date." },
          { title: "We bake & wrap",            blurb: "Fresh that morning, beautifully boxed." },
          { title: "Pick up or delivery",       blurb: "Come grab it or we deliver locally." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Esperanza V.", role: "Regular customer",     quote: "The conchas are exactly like my mom used to bring home in Mexico. I cried the first time." },
          { name: "Daniel M.",    role: "Quinceañera dad",      quote: "The cake was a masterpiece. People asked where it was from all night long." },
          { name: "Karen L.",     role: "Office manager",       quote: "Order their tray Tuesdays for the team. Gone in 30 minutes every time." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "What time is fresh pan dulce ready?", a: "Fresh batches come out starting at 6am and through the morning. Best selection 6am–noon." },
          { q: "How much do custom cakes cost?",      a: "Birthday cakes from $45. Tiered cakes from $150. Quinceañera and wedding cakes quoted on design." },
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
      footer: { tagline: "Fresh-baked memories every single morning.", hours: "Mon–Sun · 6am–8pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Menú", why: "Por Qué", process: "Pedir", testimonials: "Reseñas", faq: "FAQ", contact: "Visite", call: "Llame" },
      hero: {
        eyebrow: "Panadería familiar desde 1995",
        title1: "Alegría Recién Horneada,",
        title2: "Cada Mañana de Nuestro Horno",
        subtitle: "Pan dulce, pasteles, pan fresco, café de verdad. Recetas familiares, servicio bilingüe, bienvenida cálida.",
        cta1: "Ordene un Pastel", cta2: "Llame Ahora",
        badges: ["Horneado Diario", "Recetas Familiares", "Bilingüe EN/ES", "Pasteles Personalizados"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "900+ reseñas de 5 estrellas",
        trustTitle: "Horneado Diario", trustSubtitle: "Desde cero cada mañana",
      },
      services: {
        title: "Lo Que Horneamos", blurb: "Recetas del viejo mundo. Hechas a mano, diariamente.",
        items: [
          { title: "Pasteles Personalizados", blurb: "Quinceañera, boda, cumpleaños, baby shower. Hermosos y deliciosos." },
          { title: "Pan Dulce Diario",        blurb: "Conchas, cuernitos, empanadas, polvorones — frescos cada mañana." },
          { title: "Café y Catering",         blurb: "Café de la casa, chocolate, charolas para eventos y oficinas." },
        ],
      },
      why: {
        title: "Por Qué Regresan",
        items: [
          { title: "Abierto temprano, 7 días",    blurb: "Pan dulce caliente y café fresco desde las 6am." },
          { title: "Servicio bilingüe",           blurb: "Cómodo para clientes en inglés y español." },
          { title: "Estricta seguridad",          blurb: "Mejores puntajes año tras año. Cocina limpia, ingredientes frescos." },
          { title: "Querido por los vecinos",     blurb: "Mejor calificado en Google. Reseñas reales." },
        ],
      },
      process: {
        title: "Cómo Pedir",
        items: [
          { title: "Venga o pida en línea",    blurb: "Vea la vitrina fresca o explore el menú." },
          { title: "¿Pastel personalizado?",   blurb: "Diseñamos según su foto, sabor y fecha." },
          { title: "Horneamos y empacamos",    blurb: "Fresco esa mañana, hermosamente empacado." },
          { title: "Recoja o entrega",         blurb: "Venga por él o se lo llevamos localmente." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Esperanza V.", role: "Clienta fiel",             quote: "Las conchas son exactamente como las de mi mamá en México. Lloré la primera vez." },
          { name: "Daniel M.",    role: "Papá de quinceañera",       quote: "El pastel fue una obra de arte. Toda la noche preguntaron de dónde era." },
          { name: "Karen L.",     role: "Gerente de oficina",        quote: "Pedimos charola los martes para el equipo. Se acaba en 30 minutos siempre." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿A qué hora está el pan dulce fresco?", a: "Hornadas frescas salen desde las 6am durante toda la mañana. Mejor selección 6am–mediodía." },
          { q: "¿Cuánto cuesta un pastel personalizado?", a: "Pasteles de cumpleaños desde $45. De pisos desde $150. Quinceañera y boda según diseño." },
          { q: "¿Con cuánta anticipación pedir?",        a: "Pasteles personalizados 5–7 días. Boda y quinceañera 3–4 semanas." },
          { q: "¿Hacen catering para oficinas y eventos?", a: "Sí — charolas de pan, café y desayunos. Entrega disponible." },
        ],
      },
      contact: {
        title: "Ordene o Visítenos", blurb: "Pida un pastel personalizado, pregunte por catering o solo venga a saludar.",
        name: "Su nombre", phone: "Teléfono", service: "¿Qué podemos hacer?", message: "Cuéntenos sobre su pedido",
        submit: "Enviar Solicitud", success: "Gracias — nos pondremos en contacto pronto.",
        pick: "— Elija una opción —",
        services: ["Pastel personalizado", "Catering / charolas", "Pre-orden de pan dulce", "Pastel de boda", "Otro"],
      },
      footer: { tagline: "Recuerdos recién horneados cada mañana.", hours: "Lun–Dom · 6am–8pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "food",
  facts: {
    stats: [
      { value: "30+", labelEn: "Years baking", labelEs: "Años horneando" },
      { value: "Daily", labelEn: "Pan dulce fresh", labelEs: "Pan dulce fresco" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación Google" },
      { value: "100s", labelEn: "Quinceañera cakes/yr", labelEs: "Pasteles de XV al año" },
    ],
    areasEn: ["Miami", "Hialeah", "Doral", "Kendall", "Coral Gables", "Homestead", "Miami Lakes", "Westchester", "Sweetwater", "Miami Springs", "Aventura", "Pinecrest"],
    areasEs: ["Miami", "Hialeah", "Doral", "Kendall", "Coral Gables", "Homestead", "Miami Lakes", "Westchester", "Sweetwater", "Miami Springs", "Aventura", "Pinecrest"],
    certsEn: ["FL Food Safety Certified", "ServSafe Trained Bakers", "Featured: Miami New Times", "Yelp Top 100 in FL", "Family Recipes Since 1995", "Same-day Custom Cakes"],
    certsEs: ["Certificación FL Food Safety", "Panaderos entrenados ServSafe", "Destacado: Miami New Times", "Yelp Top 100 de FL", "Recetas familiares desde 1995", "Pasteles personalizados el mismo día"],
    guaranteeEn: { title: "Fresh today or it's free", blurb: "Every concha, cake, and tray is baked the same morning you pick it up. If it's not fresh, it's free. Promise." },
    guaranteeEs: { title: "Fresco hoy o es gratis", blurb: "Cada concha, pastel y charola se hornea la misma mañana que lo recoges. Si no está fresco, es gratis. Promesa." },
  },
  availability: { en: "Open 7 days · Custom orders 24/7", es: "Abierto 7 días · Pedidos especiales 24/7" },
  assistant: {
    name: "Elena",
    en: "Hi! I'm Elena at {business}. Order custom cakes, pan dulce trays, or wedding desserts 24/7 — we'll text photos before pickup.",
    es: "¡Hola! Soy Elena de {business}. Pide pasteles personalizados, charolas de pan dulce o postres de boda 24/7 — te enviamos fotos antes.",
    roleEn: "Order specialist", roleEs: "Especialista de pedidos",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "Order 24/7",             blurb: "Custom cake quotes online or by phone any hour." },
      { icon: "Sparkles",    title: "From-scratch daily",     blurb: "No mixes, no shortcuts — true panadería tradition." },
      { icon: "Heart",       title: "Custom designs",         blurb: "Send a photo, we'll match it · approval before bake." },
      { icon: "DollarSign",  title: "Bulk discounts",         blurb: "Pan dulce trays from $24 · save 15% on 3+ dozen." },
      { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Personal y pedidos bilingües." },
      { icon: "Truck",       title: "Delivery available",     blurb: "We deliver across South Florida — fee from $15." },
    ],
    es: [
      { icon: "Clock",       title: "Pide 24/7",               blurb: "Cotizaciones de pasteles a cualquier hora." },
      { icon: "Sparkles",    title: "Hecho a mano cada día",   blurb: "Sin mezclas, sin atajos — auténtica tradición." },
      { icon: "Heart",       title: "Diseños personalizados",  blurb: "Envía una foto, la igualamos · aprobación antes de hornear." },
      { icon: "DollarSign",  title: "Descuento por volumen",   blurb: "Charolas de pan dulce desde $24 · 15% en 3+ docenas." },
      { icon: "Languages",   title: "Bilingual EN/ES",         blurb: "Bilingual orders & staff." },
      { icon: "Truck",       title: "Entrega disponible",      blurb: "Entregamos en el sur de Florida — desde $15." },
    ],
  },
  galleryCaptions: {
    en: ["Pan dulce — daily display", "Custom wedding cake", "Fresh from the oven"],
    es: ["Pan dulce — exhibición diaria", "Pastel de boda personalizado", "Recién salido del horno"],
  },
};

export default bakery;
