import { Globe, Star, Zap, ThumbsUp, Award, Droplet } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

/**
 * BARRO — Cerámica Artesanal
 * Fictional bilingual pottery workshop in San Vicente de Nicoya, Guanacaste, making handmade clay drinkware.
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
    city: "San Vicente de Nicoya",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@barroceramica.com",
    address: "Costado oeste de la plaza de deportes, San Vicente, Nicoya, Guanacaste",
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
    hero: `${TEMPLATE_ASSETS}/barro-ceramica/barro_hero.jpg`,
    teamPortrait: `${TEMPLATE_ASSETS}/barro-ceramica/barro_void.jpg`,
    gallery: [
      `${TEMPLATE_ASSETS}/barro-ceramica/barro_stack.jpg`,
      `${TEMPLATE_ASSETS}/barro-ceramica/barro_camp.jpg`,
      `${TEMPLATE_ASSETS}/barro-ceramica/barro_orange.jpg`,
    ],
  },
  serviceIcons: [Droplet, Star, Globe],
  whyIcons: [Star, Zap, ThumbsUp, Award],
  content: {
    en: {
      nav: { services: "The Mug", why: "Craft", process: "Process", testimonials: "Journal", faq: "FAQ", contact: "Order", call: "Call" },
      hero: {
        eyebrow: "Handmade in San Vicente de Nicoya, Guanacaste",
        title1: "BARRO",
        title2: "No.1",
        subtitle: "The only mug you will ever need. Crafted from raw terracotta, fired for eternity.",
        cta1: "SCROLL TO CONTINUE", cta2: "ORDER NOW",
        badges: ["Handmade", "Terracotta", "Guanacaste"],
        ratingTitle: "5.0", ratingSubtitle: "A lifetime object",
        trustTitle: "Eternity", trustSubtitle: "In your hands",
      },
      services: {
        title: "The Object", blurb: "A return to raw earth.",
        items: [
          { title: "Raw Terracotta", blurb: "Unglazed exterior for tactile warmth." },
          { title: "Perfect Weight", blurb: "Balanced to sit heavy in the hand." },
          { title: "Fired at 1200°C", blurb: "Durable enough for campfire coffee or quiet mornings." },
        ],
      },
      why: {
        title: "Craft",
        items: [
          { title: "One Design", blurb: "We make one thing, and we make it perfectly." },
          { title: "Guanacaste Clay", blurb: "Rooted in the warmth of the Guanacaste sun." },
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
          { name: "Julián S.", role: "Coffee Roaster, Tarrazú", quote: "It holds heat unlike any other cup. It feels alive." },
          { name: "Elena M.", role: "Architect, Nosara", quote: "The texture is incredible. It grounds my morning routine." },
          { name: "Esteban T.", role: "Chef, Nicoya", quote: "A humble masterpiece of functional design." },
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
      footer: { tagline: "Cerámica Artesanal.", hours: "Mon–Fri · Workshop Hours", rights: "All rights reserved.", hoursLabel: "Workshop" },
    },
    es: {
      nav: { services: "La Taza", why: "Artesanía", process: "Proceso", testimonials: "Diario", faq: "Preguntas", contact: "Pedir", call: "Llamar" },
      hero: {
        eyebrow: "Hecho a mano en San Vicente de Nicoya, Guanacaste",
        title1: "BARRO",
        title2: "No.1",
        subtitle: "La única taza que va a necesitar. Hecha con terracota cruda, horneada para la eternidad.",
        cta1: "DESLICE PARA CONTINUAR", cta2: "PEDIR AHORA",
        badges: ["Hecho a mano", "Terracota", "Guanacaste"],
        ratingTitle: "5.0", ratingSubtitle: "Un objeto para toda la vida",
        trustTitle: "Eternidad", trustSubtitle: "En sus manos",
      },
      services: {
        title: "El Objeto", blurb: "Un retorno a la tierra cruda.",
        items: [
          { title: "Terracota Cruda", blurb: "Exterior sin esmalte para una calidez táctil." },
          { title: "Peso Perfecto", blurb: "Equilibrada para sentirse pesada en la mano." },
          { title: "Horneada a 1200°C", blurb: "Suficientemente resistente para un café junto a la fogata o mañanas tranquilas." },
        ],
      },
      why: {
        title: "Artesanía",
        items: [
          { title: "Un Diseño", blurb: "Hacemos una sola cosa, y la hacemos perfecta." },
          { title: "Barro de Guanacaste", blurb: "Enraizada en el calor del sol guanacasteco." },
          { title: "Torneada a Mano", blurb: "Cada pieza lleva la marca de quien la hizo." },
          { title: "Sostenible", blurb: "Tierra que vuelve a la tierra." },
        ],
      },
      process: {
        title: "Proceso",
        items: [
          { title: "Amasar", blurb: "Preparando el barro." },
          { title: "Tornear", blurb: "Dando forma en el torno." },
          { title: "Hornear", blurb: "Forjada en el horno." },
          { title: "Reposar", blurb: "Lista para su café." },
        ],
      },
      testimonials: {
        title: "Diario",
        items: [
          { name: "Julián S.", role: "Tostador de Café, Tarrazú", quote: "Mantiene el calor como ninguna otra taza. Se siente viva." },
          { name: "Elena M.", role: "Arquitecta, Nosara", quote: "La textura es increíble. Le da raíz a mi rutina de la mañana." },
          { name: "Esteban T.", role: "Chef, Nicoya", quote: "Una obra maestra humilde de diseño funcional." },
        ],
      },
      faq: {
        title: "Detalles",
        items: [
          { q: "¿Se puede lavar en la máquina lavaplatos?", a: "Sí, aunque recomendamos lavarla a mano para conservar el acabado táctil por décadas." },
          { q: "¿Cuánto tarda el envío?", a: "Cada lote se hace por encargo. Espere de 2 a 3 semanas para la entrega." },
          { q: "¿Se mancha el exterior?", a: "La terracota cruda desarrollará una hermosa pátina con el tiempo por el contacto con sus manos y el café." },
          { q: "¿Hacen platos?", a: "No. Solo la taza No.1." },
        ],
      },
      contact: {
        title: "RESERVE LA SUYA", blurb: "Únase a la lista de espera para la próxima quema en el horno.",
        name: "Nombre", phone: "Teléfono", service: "Cantidad", message: "Notas (Opcional)",
        submit: "UNIRSE A LA LISTA", success: "Ya está en la lista. Le contactaremos pronto.",
        pick: "Seleccione la cantidad",
        services: ["Una (1) Taza", "Par (2) Tazas", "Juego de Cuatro (4)"],
      },
      footer: { tagline: "Cerámica Artesanal.", hours: "Lun a vie · Horario del taller", rights: "Todos los derechos reservados.", hoursLabel: "Taller" },
    },
  },
};

export default barroCeramica;
