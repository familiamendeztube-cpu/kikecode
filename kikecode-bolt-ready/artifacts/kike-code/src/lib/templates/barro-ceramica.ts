import { Palette, Globe, Wand2, Star, Zap, ThumbsUp, Award, Droplet } from "lucide-react";
import type { BusinessTemplate } from "./types";

/**
 * BARRO — Cerámica Artesanal
 * Fictional bilingual Miami studio making handmade clay drinkware.
 * Uses the custom "oryzo" site variant: a single-product darkroom editorial renderer.
 */
const barroCeramica: BusinessTemplate = {
  slug: "barro-ceramica",
  industry: "Ceramics Studio",
  industryEs: "Estudio de Cerámica",
  websiteType: "Single-Product Editorial Website",
  defaultServicesField: "BARRO No.1 Handmade Terracotta Mug",
  siteVariant: "oryzo",
  brand: {
    name: "BARRO",
    city: "Miami",
    phone: "(305) 555-1020",
    phoneHref: "tel:+13055551020",
    email: "hola@barroceramica.com",
    address: "2450 NW 2nd Ave, Miami, FL 33127",
    heroIcon: Droplet,
    palette: {
      primary: "#dc5000", primaryDark: "#b84200", accent: "#ffedd7",
      heroFrom: "#100904", heroVia: "#1a0f07", heroTo: "#100904",
      heroGlow1: "rgba(220,80,0,0.50)", heroGlow2: "rgba(255,237,215,0.30)",
      heroIconFrom: "#dc5000", heroIconTo: "#ffedd7",
      contactFrom: "#dc5000", contactTo: "#ffedd7",
    },
  },
  media: {
    hero: "/template-assets/barro-ceramica/barro_hero.jpg",
    teamPortrait: "/template-assets/barro-ceramica/barro_void.jpg",
    gallery: [
      "/template-assets/barro-ceramica/barro_stack.jpg",
      "/template-assets/barro-ceramica/barro_camp.jpg",
      "/template-assets/barro-ceramica/barro_orange.jpg",
    ],
  },
  serviceIcons: [Droplet, Star, Globe],
  whyIcons: [Star, Zap, ThumbsUp, Award],
  content: {
    en: {
      nav: { services: "The Mug", why: "Craft", process: "Process", testimonials: "Journal", faq: "FAQ", contact: "Order", call: "Call" },
      hero: {
        eyebrow: "Handmade in Miami",
        title1: "BARRO",
        title2: "No.1",
        subtitle: "The only mug you will ever need. Crafted from raw terracotta, fired for eternity.",
        cta1: "SCROLL TO CONTINUE", cta2: "ORDER NOW",
        badges: ["Handmade", "Terracotta", "Miami"],
        ratingTitle: "5.0", ratingSubtitle: "A lifetime object",
        trustTitle: "Eternity", trustSubtitle: "In your hands",
      },
      services: {
        title: "The Object", blurb: "A return to raw earth.",
        items: [
          { title: "Raw Terracotta", blurb: "Unnglazed exterior for tactile warmth." },
          { title: "Perfect Weight", blurb: "Balanced to sit heavy in the hand." },
          { title: "Fired at 2200°F", blurb: "Durable enough for campfire coffee or quiet mornings." },
        ],
      },
      why: {
        title: "Craft",
        items: [
          { title: "One Design", blurb: "We make one thing, and we make it perfectly." },
          { title: "Miami Soil", blurb: "Rooted in the warmth of the sun." },
          { title: "Hand-thrown", blurb: "Every piece bears the mark of the maker." },
          { title: "Sustainable", blurb: "Earth returning to earth." },
        ],
      },
      process: {
        title: "Process",
        items: [
          { title: "Wedge", blurb: "Preparing the clay." },
          { title: "Throw", blurb: "Shaping on the wheel." },
          { title: "Fire", blurb: "Forged in the kiln." },
          { title: "Rest", blurb: "Ready for your coffee." },
        ],
      },
      testimonials: {
        title: "Journal",
        items: [
          { name: "Julian S.", role: "Coffee Roaster", quote: "It holds heat unlike any other cup. It feels alive." },
          { name: "Elena M.", role: "Architect", quote: "The texture is incredible. It grounds my morning routine." },
          { name: "Marcus T.", role: "Chef", quote: "A humble masterpiece of functional design." },
        ],
      },
      faq: {
        title: "Details",
        items: [
          { q: "Is it dishwasher safe?", a: "Yes, though we recommend hand washing to preserve the tactile finish over decades." },
          { q: "How long does shipping take?", a: "Each batch is made to order. Expect 2-3 weeks for delivery." },
          { q: "Does the outside stain?", a: "The raw terracotta will develop a beautiful patina over time from your hands and coffee." },
          { q: "Do you make plates?", a: "No. Only the No.1 mug." },
        ],
      },
      contact: {
        title: "RESERVE YOURS", blurb: "Join the waitlist for the next kiln firing.",
        name: "Name", phone: "Phone", service: "Quantity", message: "Notes (Optional)",
        submit: "JOIN WAITLIST", success: "You are on the list. We will reach out soon.",
        pick: "Select quantity",
        services: ["One (1) Mug", "Pair (2) Mugs", "Set of Four (4)"],
      },
      footer: { tagline: "Cerámica Artesanal.", hours: "Mon–Fri · Studio Hours", rights: "All rights reserved.", hoursLabel: "Studio" },
    },
    es: {
      nav: { services: "La Taza", why: "Artesanía", process: "Proceso", testimonials: "Diario", faq: "FAQ", contact: "Ordenar", call: "Llamar" },
      hero: {
        eyebrow: "Hecho a mano en Miami",
        title1: "BARRO",
        title2: "No.1",
        subtitle: "La única taza que necesitarás. Creada con terracota cruda, horneada para la eternidad.",
        cta1: "DESLIZA PARA CONTINUAR", cta2: "ORDENAR AHORA",
        badges: ["Hecho a mano", "Terracota", "Miami"],
        ratingTitle: "5.0", ratingSubtitle: "Un objeto para toda la vida",
        trustTitle: "Eternidad", trustSubtitle: "En tus manos",
      },
      services: {
        title: "El Objeto", blurb: "Un retorno a la tierra cruda.",
        items: [
          { title: "Terracota Cruda", blurb: "Exterior sin esmalte para una calidez táctil." },
          { title: "Peso Perfecto", blurb: "Equilibrada para sentirse pesada en la mano." },
          { title: "Horneada a 1200°C", blurb: "Suficientemente resistente para fogatas o mañanas tranquilas." },
        ],
      },
      why: {
        title: "Artesanía",
        items: [
          { title: "Un Diseño", blurb: "Hacemos una sola cosa, y la hacemos perfecta." },
          { title: "Suelo de Miami", blurb: "Enraizado en el calor del sol." },
          { title: "Torneada a Mano", blurb: "Cada pieza lleva la marca de su creador." },
          { title: "Sostenible", blurb: "Tierra que vuelve a la tierra." },
        ],
      },
      process: {
        title: "Proceso",
        items: [
          { title: "Amasar", blurb: "Preparando el barro." },
          { title: "Tornear", blurb: "Dando forma en el torno." },
          { title: "Hornear", blurb: "Forjada en el horno." },
          { title: "Reposar", blurb: "Lista para tu café." },
        ],
      },
      testimonials: {
        title: "Diario",
        items: [
          { name: "Julian S.", role: "Tostador de Café", quote: "Mantiene el calor como ninguna otra taza. Se siente viva." },
          { name: "Elena M.", role: "Arquitecta", quote: "La textura es increíble. Enraíza mi rutina matutina." },
          { name: "Marcus T.", role: "Chef", quote: "Una obra maestra humilde de diseño funcional." },
        ],
      },
      faq: {
        title: "Detalles",
        items: [
          { q: "¿Es apta para lavavajillas?", a: "Sí, aunque recomendamos lavarla a mano para preservar el acabado táctil por décadas." },
          { q: "¿Cuánto tarda el envío?", a: "Cada lote se hace por encargo. Espere de 2 a 3 semanas para la entrega." },
          { q: "¿Se mancha el exterior?", a: "La terracota cruda desarrollará una hermosa pátina con el tiempo por el contacto con sus manos y el café." },
          { q: "¿Hacen platos?", a: "No. Solo la taza No.1." },
        ],
      },
      contact: {
        title: "RESERVA LA TUYA", blurb: "Únete a la lista de espera para el próximo horneado.",
        name: "Nombre", phone: "Teléfono", service: "Cantidad", message: "Notas (Opcional)",
        submit: "UNIRSE A LA LISTA", success: "Estás en la lista. Te contactaremos pronto.",
        pick: "Seleccionar cantidad",
        services: ["Una (1) Taza", "Par (2) Tazas", "Juego de Cuatro (4)"],
      },
      footer: { tagline: "Cerámica Artesanal.", hours: "Lun–Vie · Horario de Estudio", rights: "Todos los derechos reservados.", hoursLabel: "Estudio" },
    },
  },
};

export default barroCeramica;
