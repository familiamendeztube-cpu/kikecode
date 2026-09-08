import { Cookie, Cake, Croissant, Coffee, Clock, ShieldCheck, Languages, Star } from "lucide-react";
import type { BusinessTemplate } from "./types";

const bakery: BusinessTemplate = {
  slug: "bakery",
  industry: "Bakery / Panadería",
  industryEs: "Panadería",
  websiteType: "Local Business Website",
  defaultServicesField: "Fresh bread daily, Custom cakes, Quinceañera cakes, Wedding cakes, Pan dulce, Coffee, Catering trays",
  brand: {
    name: "Pan Dulce Bakery",
    city: "Chicago",
    phone: "(555) 010-0010",
    phoneHref: "tel:+15550100010",
    email: "hello@pandulcebakery.com",
    address: "1000 Pilsen Ave, Chicago, IL 60608",
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
};

export default bakery;
