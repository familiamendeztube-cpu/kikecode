import { Utensils, ChefHat, Drumstick, Beef, Clock, ShieldCheck, Languages, Star } from "lucide-react";
import type { BusinessTemplate } from "./types";

const HERITAGE = "/template-assets/nicaraguan-restaurant/heritage";

const nicaraguanRestaurant: BusinessTemplate = {
  slug: "nicaraguan-restaurant",
  industry: "Nicaraguan Restaurant",
  industryEs: "Restaurante Nicaragüense",
  websiteType: "Restaurant Website",
  defaultServicesField:
    "Comida típica nicaragüense, Asados, Enchiladas, Tajadas con queso, Pollo asado, Catering para eventos, Pedidos para llevar",
  brand: {
    name: "Güe Güe",
    city: "Chicago",
    phone: "(312) 409-9095",
    phoneHref: "tel:+13124099095",
    phoneAlt: "(323) 621-2656",
    phoneAltHref: "tel:+13236212656",
    email: "hola@guegue.com",
    address: "Chicago, IL",
    heroIcon: Utensils,
    socials: {
      tiktok: "https://www.tiktok.com/@ge.ge51",
      facebook: "https://www.facebook.com/people/Gue-Gue/61560000000000/",
    },
    palette: {
      primary: "#0F47AF", primaryDark: "#0A3380", accent: "#FFD43B",
      heroFrom: "#0A2A6B", heroVia: "#06205A", heroTo: "#0A2A6B",
      heroGlow1: "rgba(255,212,59,0.40)", heroGlow2: "rgba(255,255,255,0.14)",
      heroIconFrom: "#0F47AF", heroIconTo: "#0A3380",
      contactFrom: "#0F47AF", contactTo: "#06205A",
    },
  },
  serviceIcons: [ChefHat, Drumstick, Beef],
  whyIcons: [Clock, Languages, ShieldCheck, Star],
  content: {
    en: {
      nav: { services: "Menu", why: "Why Us", process: "Order", testimonials: "Reviews", faq: "FAQ", contact: "Visit", call: "Call" },
      hero: {
        eyebrow: "Authentic Nicaraguan food",
        title1: "A Taste of Nicaragua,",
        title2: "Made Fresh With Love",
        subtitle: "Asados, enchiladas, tajadas con queso, pollo asado and more — real Nicaraguan home cooking. Pick up, or let us cater your next celebration.",
        cta1: "See the Menu", cta2: "Call to Order",
        badges: ["Comida Típica", "Made Fresh Daily", "Catering Available", "Family Recipes"],
        ratingTitle: "Comida Típica", ratingSubtitle: "Nicaraguan home cooking",
        trustTitle: "Hecho con Amor", trustSubtitle: "Family recipes",
      },
      services: {
        title: "What We Serve", blurb: "The flavors of Nicaragua — generous plates, made the way abuela taught us.",
        items: [
          { title: "Asados & Grilled Plates", blurb: "Asado de cerdo, carne asada and pollo asado with sweet plantains, gallo pinto and cabbage salad." },
          { title: "Enchiladas & Antojitos", blurb: "Crispy Nicaraguan enchiladas, tajadas con queso, and fried cheese — our most-requested antojitos." },
          { title: "Catering & Big Trays", blurb: "Family-style trays for parties and events. We feed the whole crowd — just tell us how many." },
        ],
      },
      why: {
        title: "Why People Keep Coming Back",
        items: [
          { title: "Open daily", blurb: "Fresh food ready when your craving hits." },
          { title: "Bilingual service", blurb: "Te atendemos en español y English." },
          { title: "Always fresh", blurb: "Cooked to order — never frozen, never reheated." },
          { title: "Loved online", blurb: "Follow our daily plates on TikTok @ge.ge51." },
        ],
      },
      process: {
        title: "How to Order",
        items: [
          { title: "Call or message", blurb: "Phone us or DM on TikTok / Facebook." },
          { title: "Pick your plates", blurb: "Asado, enchiladas, catering tray — your choice." },
          { title: "We cook fresh", blurb: "Everything made to order, hot and ready." },
          { title: "Pick up & enjoy", blurb: "Grab it to go or set up your event." },
        ],
      },
      testimonials: {
        title: "What Guests Say",
        items: [
          { name: "Marvin G.", role: "Regular", quote: "Sabe igualito a Nicaragua. The asado and tajadas take me straight home. Best Nica food in the city." },
          { name: "Yamileth R.", role: "Party host", quote: "They catered my daughter's birthday. The trays were huge, everything fresh, and everyone asked who made it!" },
          { name: "Carlos M.", role: "TikTok follower", quote: "Found them on TikTok, drove across town. Worth every mile — the pollo asado is unreal." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How do I place an order?", a: "Call us at (312) 409-9095 or (323) 621-2656, or send a message on TikTok @ge.ge51 or Facebook." },
          { q: "Do you cater events?", a: "Yes — we make big family-style trays for parties, birthdays and gatherings. Tell us the headcount and date." },
          { q: "What Nicaraguan dishes do you make?", a: "Asado de cerdo, carne asada, pollo asado, enchiladas, tajadas con queso, carne desmenuzada and more típico favorites." },
          { q: "Is everything made fresh?", a: "Yes — every plate is cooked to order with family recipes. Nothing frozen, nothing reheated." },
        ],
      },
      contact: {
        title: "Order or Book Catering", blurb: "Call, message us on social, or ask about catering. We respond fast.",
        name: "Your name", phone: "Phone", service: "What can we help with?", message: "Tell us your order or event",
        submit: "Send Request", success: "Thank you — we'll be in touch shortly.",
        pick: "— Pick an option —",
        services: ["Pickup order", "Catering inquiry", "Party / event", "Daily specials", "Other"],
      },
      footer: { tagline: "Nicaraguan flavors, hechos con amor.", hours: "Open daily · Call for hours", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Menú", why: "Por Qué", process: "Pedir", testimonials: "Reseñas", faq: "FAQ", contact: "Visite", call: "Llame" },
      hero: {
        eyebrow: "Comida nicaragüense auténtica",
        title1: "Un Sabor de Nicaragua,",
        title2: "Hecho Fresco Con Amor",
        subtitle: "Asados, enchiladas, tajadas con queso, pollo asado y más — comida típica nicaragüense. Para llevar, o catering para su próxima celebración.",
        cta1: "Ver el Menú", cta2: "Llame para Ordenar",
        badges: ["Comida Típica", "Hecho Fresco", "Catering Disponible", "Recetas Familiares"],
        ratingTitle: "Comida Típica", ratingSubtitle: "Cocina nicaragüense",
        trustTitle: "Hecho con Amor", trustSubtitle: "Recetas familiares",
      },
      services: {
        title: "Lo Que Servimos", blurb: "Los sabores de Nicaragua — platos generosos, como nos enseñó la abuela.",
        items: [
          { title: "Asados y Platos a la Parrilla", blurb: "Asado de cerdo, carne asada y pollo asado con maduros, gallo pinto y ensalada." },
          { title: "Enchiladas y Antojitos", blurb: "Enchiladas nicaragüenses, tajadas con queso y queso frito — nuestros antojitos más pedidos." },
          { title: "Catering y Bandejas Grandes", blurb: "Bandejas familiares para fiestas y eventos. Alimentamos a toda su gente — solo díganos cuántos." },
        ],
      },
      why: {
        title: "Por Qué Regresan",
        items: [
          { title: "Abierto a diario", blurb: "Comida fresca lista cuando le da el antojo." },
          { title: "Servicio bilingüe", blurb: "We serve you in English y español." },
          { title: "Siempre fresco", blurb: "Hecho al momento — nunca congelado, nunca recalentado." },
          { title: "Querido en línea", blurb: "Vea nuestros platos diarios en TikTok @ge.ge51." },
        ],
      },
      process: {
        title: "Cómo Pedir",
        items: [
          { title: "Llame o escriba", blurb: "Llámenos o mándenos DM en TikTok / Facebook." },
          { title: "Elija sus platos", blurb: "Asado, enchiladas, bandeja de catering — usted elige." },
          { title: "Cocinamos fresco", blurb: "Todo hecho al momento, caliente y listo." },
          { title: "Recoja y disfrute", blurb: "Llévelo o prepare su evento." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Marvin G.", role: "Cliente fiel", quote: "Sabe igualito a Nicaragua. El asado y las tajadas me llevan a casa. La mejor comida nica de la ciudad." },
          { name: "Yamileth R.", role: "Anfitriona", quote: "Hicieron el catering del cumpleaños de mi hija. ¡Las bandejas enormes, todo fresco, y todos preguntaron quién cocinó!" },
          { name: "Carlos M.", role: "Seguidor de TikTok", quote: "Los encontré en TikTok y manejé por toda la ciudad. Valió cada milla — el pollo asado es increíble." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cómo hago un pedido?", a: "Llámenos al (312) 409-9095 o (323) 621-2656, o escríbanos en TikTok @ge.ge51 o Facebook." },
          { q: "¿Hacen catering para eventos?", a: "Sí — hacemos bandejas familiares grandes para fiestas, cumpleaños y reuniones. Díganos cuántas personas y la fecha." },
          { q: "¿Qué platos nicaragüenses hacen?", a: "Asado de cerdo, carne asada, pollo asado, enchiladas, tajadas con queso, carne desmenuzada y más favoritos típicos." },
          { q: "¿Todo es hecho fresco?", a: "Sí — cada plato se cocina al momento con recetas familiares. Nada congelado, nada recalentado." },
        ],
      },
      contact: {
        title: "Ordene o Reserve Catering", blurb: "Llame, escríbanos en redes, o pregunte por catering. Respondemos rápido.",
        name: "Su nombre", phone: "Teléfono", service: "¿En qué le ayudamos?", message: "Cuéntenos su pedido o evento",
        submit: "Enviar Solicitud", success: "Gracias — nos pondremos en contacto pronto.",
        pick: "— Elija una opción —",
        services: ["Pedido para llevar", "Pregunta de catering", "Fiesta / evento", "Especiales del día", "Otro"],
      },
      footer: { tagline: "Sabores de Nicaragua, hechos con amor.", hours: "Abierto a diario · Llame por horario", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  heritage: {
    title: {
      en: "From the land of lakes and volcanoes",
      es: "De la tierra de lagos y volcanes",
    },
    blurb: {
      en: "Our name honors El Güegüense — Nicaragua's beloved 500-year-old folk masterpiece. Every plate carries the flavors, history, and pride of our homeland.",
      es: "Nuestro nombre honra a El Güegüense — la querida obra folclórica de Nicaragua de hace 500 años. Cada plato lleva los sabores, la historia y el orgullo de nuestra tierra.",
    },
    images: [
      {
        src: `${HERITAGE}/gueguense.jpg`,
        en: "El Güegüense — Nicaragua's UNESCO folk drama, our namesake",
        es: "El Güegüense — el drama folclórico de Nicaragua (UNESCO), nuestro homónimo",
      },
      {
        src: `${HERITAGE}/granada.jpg`,
        en: "Granada — the colorful colonial heart of Nicaragua",
        es: "Granada — el colorido corazón colonial de Nicaragua",
      },
      {
        src: `${HERITAGE}/momotombo.jpg`,
        en: "Momotombo volcano over Lake Managua",
        es: "El volcán Momotombo sobre el lago de Managua",
      },
      {
        src: `${HERITAGE}/ometepe.jpg`,
        en: "Ometepe — twin volcanoes rising from Lake Nicaragua",
        es: "Ometepe — volcanes gemelos sobre el lago de Nicaragua",
      },
      {
        src: `${HERITAGE}/leon-1907.jpg`,
        en: "León Cathedral in 1907 — a piece of our history",
        es: "La Catedral de León en 1907 — un pedazo de nuestra historia",
      },
      {
        src: `${HERITAGE}/folklore.jpg`,
        en: "Traditional Nicaraguan folklore and festivals",
        es: "Folclore y fiestas tradicionales de Nicaragua",
      },
    ],
    history: {
      title: {
        en: "A little history of Nicaragua",
        es: "Un poco de la historia de Nicaragua",
      },
      milestones: [
        {
          year: { en: "1524", es: "1524" },
          title: {
            en: "Granada & León are founded",
            es: "Se fundan Granada y León",
          },
          text: {
            en: "Spanish settlers establish two of the oldest cities on the American mainland — colonial gems that still define Nicaragua today.",
            es: "Los colonos españoles fundan dos de las ciudades más antiguas de tierra firme en América — joyas coloniales que aún definen a Nicaragua.",
          },
        },
        {
          year: { en: "1821", es: "1821" },
          title: {
            en: "Independence from Spain",
            es: "Independencia de España",
          },
          text: {
            en: "On September 15, Nicaragua wins its freedom — a date Nicaraguans everywhere still celebrate with pride.",
            es: "El 15 de septiembre, Nicaragua obtiene su libertad — una fecha que los nicaragüenses celebramos con orgullo dondequiera que estemos.",
          },
        },
        {
          year: { en: "1838", es: "1838" },
          title: {
            en: "A sovereign republic",
            es: "Una república soberana",
          },
          text: {
            en: "Nicaragua becomes a fully independent nation — the land of lakes, volcanoes, and a cuisine passed down for generations.",
            es: "Nicaragua se convierte en una nación plenamente independiente — la tierra de lagos, volcanes y una cocina heredada por generaciones.",
          },
        },
        {
          year: { en: "2005", es: "2005" },
          title: {
            en: "El Güegüense honored by UNESCO",
            es: "El Güegüense reconocido por la UNESCO",
          },
          text: {
            en: "Our namesake folk drama — a 500-year-old satire of song, dance, and theater — is declared a Masterpiece of the Oral and Intangible Heritage of Humanity.",
            es: "Nuestro homónimo drama folclórico — una sátira de 500 años de canto, danza y teatro — es declarado Obra Maestra del Patrimonio Oral e Intangible de la Humanidad.",
          },
        },
        {
          year: { en: "Today", es: "Hoy" },
          title: {
            en: "Nicaragua comes to Chicago",
            es: "Nicaragua llega a Chicago",
          },
          text: {
            en: "We bring those flavors and that pride to your table — real asados, enchiladas, and tajadas, made the way abuela taught us.",
            es: "Traemos esos sabores y ese orgullo a tu mesa — asados, enchiladas y tajadas de verdad, hechos como nos enseñó la abuela.",
          },
        },
      ],
    },
  },
};

export default nicaraguanRestaurant;
