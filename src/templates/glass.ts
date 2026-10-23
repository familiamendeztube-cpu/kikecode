import { AppWindow, Frame, Sparkles, MapPin, ShieldCheck, Clock, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/glass`;

const glass: BusinessTemplate = {
  slug: "glass",
  industry: "Glass, Windows & Mirrors",
  industryEs: "Vidrios, Ventanas y Espejos",
  websiteType: "Glass & Mirror Company Website",
  defaultServicesField:
    "Window installation, Window replacement, Custom mirrors, Glass shower enclosures, Glass doors, Glass railings, Storefront glass, Tabletops, Glass repair",
  brand: {
    name: "VidrioTico",
    city: "San José, Costa Rica",
    phone: "+506 8888 1234",
    phoneHref: "tel:+50688881234",
    email: "info@vidriotico.cr",
    address: "San José, Costa Rica — servicio a todo el país",
    heroIcon: AppWindow,
    palette: {
      primary: "#0891B2", primaryDark: "#155e75", accent: "#22D3EE",
      heroFrom: "#04121a", heroVia: "#062a35", heroTo: "#04121a",
      heroGlow1: "rgba(8,145,178,0.55)", heroGlow2: "rgba(34,211,238,0.30)",
      heroIconFrom: "#0891B2", heroIconTo: "#155e75",
      contactFrom: "#0891B2", contactTo: "#155e75",
    },
  },
  serviceIcons: [AppWindow, Frame, Sparkles],
  whyIcons: [MapPin, ShieldCheck, Clock, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Glass, windows & mirrors — all of Costa Rica",
        title1: "Glass Done Right,",
        title2: "Anywhere in Costa Rica",
        subtitle: "Windows, mirrors, glass doors, shower enclosures and railings — designed, made and installed. Based in San José, we travel to every province. Bilingual, honest, on time.",
        cta1: "Get a Free Quote", cta2: "WhatsApp Us",
        badges: ["Nationwide service", "Windows & mirrors", "Custom glass design", "Bilingual EN/ES"],
        ratingTitle: "5.0 / 5", ratingSubtitle: "Homes & businesses served",
        trustTitle: "We travel countrywide", trustSubtitle: "San José to the coast",
      },
      services: {
        title: "What We Do", blurb: "One glass company for the whole home or business — from a single mirror to a full glass facade.",
        items: [
          { title: "Windows & Glass", blurb: "Supply, replace and install windows, sliding doors, tempered glass, storefronts and tabletops — measured and fitted to your space." },
          { title: "Custom Mirrors", blurb: "Bathroom, gym, closet and decorative wall mirrors cut to any size and shape, delivered and mounted with a clean finish." },
          { title: "Doors, Showers & Railings", blurb: "Frameless glass shower enclosures, glass doors, partitions and modern tempered-glass railings for stairs and balconies." },
        ],
      },
      why: {
        title: "Why People Choose Us",
        items: [
          { title: "We go anywhere in Costa Rica", blurb: "Based in San José, we travel to every province — Guanacaste, Puntarenas, Limón, the whole country." },
          { title: "Made to measure & guaranteed", blurb: "Every piece is measured on site and installed by our own crew, backed by a written workmanship guarantee." },
          { title: "On time, clean work", blurb: "We show up when we say, protect your space, and leave it spotless — no mess, no surprises." },
          { title: "Bilingual: English & Spanish", blurb: "Clear communication and respect in your language, start to finish." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Tell us what you need", blurb: "Send a photo and your location by WhatsApp or the form — anywhere in the country." },
          { title: "Free measure & quote", blurb: "We measure on site and give you a clear, written price with no obligation." },
          { title: "We make your glass", blurb: "Cut, tempered and finished to your exact size in our workshop." },
          { title: "Installed & guaranteed", blurb: "Our crew installs it clean and safe, and stands behind the work." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "María F.", role: "Homeowner · Alajuela", quote: "They drove all the way to Alajuela, measured everything and installed our new windows perfectly. Beautiful work and very kind." },
          { name: "Carlos J.", role: "Café owner · San José", quote: "New glass storefront for my café — looks amazing and was done fast. Fair price and they cleaned up everything." },
          { name: "Andrea S.", role: "Homeowner · Guanacaste", quote: "Ordered a huge custom mirror and a glass shower. They came all the way to Guanacaste. Professional from start to finish." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you really travel across the country?", a: "Yes. We're based in San José but install glass, windows and mirrors in every province of Costa Rica. Just tell us your location." },
          { q: "Do you make custom sizes?", a: "Absolutely — everything is cut and made to measure. Send us the measurements or we'll measure on site." },
          { q: "Do you do both homes and businesses?", a: "Yes. Residential windows and mirrors, and commercial storefronts, partitions and facades." },
          { q: "How much does it cost?", a: "It depends on the glass and size. We give a clear written quote before any work — always free, no obligation." },
        ],
      },
      contact: {
        title: "Get Your Free Quote", blurb: "Tell us what you need and where you are in Costa Rica. We respond the same day.",
        name: "Your name", phone: "Phone / WhatsApp", service: "What do you need?", message: "Describe your project and location (province)",
        submit: "Request Free Quote", success: "Thank you — we'll message you today to confirm your quote.",
        pick: "— Pick a service —",
        services: ["Windows", "Custom mirrors", "Glass shower / doors", "Glass railings", "Storefront glass", "Glass repair", "Other"],
      },
      footer: { tagline: "Glass, windows & mirrors — anywhere in Costa Rica.", hours: "Mon–Sat · 7am–5pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llamar" },
      hero: {
        eyebrow: "Vidrios, ventanas y espejos — todo Costa Rica",
        title1: "Vidrio Bien Hecho,",
        title2: "En Todo Costa Rica",
        subtitle: "Ventanas, espejos, puertas de vidrio, mamparas de baño y barandas — diseñamos, fabricamos e instalamos. Ubicados en San José, viajamos a todas las provincias. Bilingües, honestos y puntuales.",
        cta1: "Cotización Gratis", cta2: "Escríbanos por WhatsApp",
        badges: ["Servicio a todo el país", "Ventanas y espejos", "Diseño en vidrio a medida", "Bilingüe EN/ES"],
        ratingTitle: "5.0 / 5", ratingSubtitle: "Casas y negocios atendidos",
        trustTitle: "Viajamos a todo el país", trustSubtitle: "De San José a la costa",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Una sola empresa de vidrio para toda la casa o el negocio — desde un espejo hasta una fachada completa.",
        items: [
          { title: "Ventanas y Vidrios", blurb: "Suministro, cambio e instalación de ventanas, puertas corredizas, vidrio templado, vitrinas y cubiertas — medido y ajustado a su espacio." },
          { title: "Espejos a Medida", blurb: "Espejos de baño, gimnasio, clóset y decorativos, cortados a cualquier tamaño y forma, entregados e instalados con acabado limpio." },
          { title: "Puertas, Mamparas y Barandas", blurb: "Mamparas de baño en vidrio sin marco, puertas de vidrio, divisiones y barandas modernas de vidrio templado para gradas y balcones." },
        ],
      },
      why: {
        title: "Por Qué Nos Eligen",
        items: [
          { title: "Vamos a cualquier lugar de Costa Rica", blurb: "Ubicados en San José, viajamos a todas las provincias — Guanacaste, Puntarenas, Limón, todo el país." },
          { title: "A la medida y garantizado", blurb: "Cada pieza se mide en sitio y la instala nuestro propio equipo, con garantía escrita de mano de obra." },
          { title: "Puntuales y trabajo limpio", blurb: "Llegamos cuando decimos, protegemos su espacio y lo dejamos impecable — sin desorden, sin sorpresas." },
          { title: "Bilingüe: Inglés y Español", blurb: "Comunicación clara y respeto en su idioma, de principio a fin." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Cuéntenos qué necesita", blurb: "Envíe una foto y su ubicación por WhatsApp o el formulario — a cualquier lugar del país." },
          { title: "Medición y cotización gratis", blurb: "Medimos en sitio y le damos un precio claro por escrito, sin compromiso." },
          { title: "Fabricamos su vidrio", blurb: "Cortado, templado y con acabado a su medida exacta en nuestro taller." },
          { title: "Instalado y garantizado", blurb: "Nuestro equipo lo instala limpio y seguro, y respalda el trabajo." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "María F.", role: "Dueña de casa · Alajuela", quote: "Viajaron hasta Alajuela, midieron todo e instalaron nuestras ventanas nuevas perfectas. Un trabajo hermoso y muy amables." },
          { name: "Carlos J.", role: "Dueño de café · San José", quote: "Vitrina de vidrio nueva para mi café — quedó increíble y rápido. Precio justo y dejaron todo limpio." },
          { name: "Andrea S.", role: "Dueña de casa · Guanacaste", quote: "Pedí un espejo enorme a medida y una mampara de baño. Llegaron hasta Guanacaste. Profesionales de principio a fin." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿De verdad viajan por todo el país?", a: "Sí. Estamos en San José pero instalamos vidrios, ventanas y espejos en todas las provincias de Costa Rica. Solo indíquenos su ubicación." },
          { q: "¿Hacen tamaños a la medida?", a: "Claro — todo se corta y fabrica a la medida. Envíenos las medidas o las tomamos en sitio." },
          { q: "¿Atienden casas y negocios?", a: "Sí. Ventanas y espejos residenciales, y vitrinas, divisiones y fachadas comerciales." },
          { q: "¿Cuánto cuesta?", a: "Depende del vidrio y el tamaño. Le damos una cotización clara por escrito antes de cualquier trabajo — siempre gratis y sin compromiso." },
        ],
      },
      contact: {
        title: "Reciba su Cotización Gratis", blurb: "Cuéntenos qué necesita y dónde está en Costa Rica. Respondemos el mismo día.",
        name: "Su nombre", phone: "Teléfono / WhatsApp", service: "¿Qué necesita?", message: "Describa su proyecto y su ubicación (provincia)",
        submit: "Solicitar Cotización Gratis", success: "Gracias — le escribiremos hoy para confirmar su cotización.",
        pick: "— Elija un servicio —",
        services: ["Ventanas", "Espejos a medida", "Mampara / puertas de vidrio", "Barandas de vidrio", "Vidrio comercial", "Reparación de vidrio", "Otro"],
      },
      footer: { tagline: "Vidrios, ventanas y espejos — en todo Costa Rica.", hours: "Lun–Sáb · 7am–5pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  facts: {
    stats: [
      { value: "Nationwide", valueEs: "Todo el país", labelEn: "We travel anywhere in CR", labelEs: "Vamos a todo Costa Rica" },
      { value: "Custom", valueEs: "A medida", labelEn: "Cut to any size", labelEs: "Cortado a su medida" },
      { value: "Free", valueEs: "Gratis", labelEn: "Measure & quote", labelEs: "Medición y cotización" },
      { value: "Bilingual", valueEs: "Bilingüe", labelEn: "English & Spanish", labelEs: "Inglés y español" },
    ],
    areasEn: ["San José", "Alajuela", "Heredia", "Cartago", "Guanacaste", "Puntarenas", "Limón", "Liberia", "Jacó", "Tamarindo", "Pérez Zeledón", "All of Costa Rica"],
    areasEs: ["San José", "Alajuela", "Heredia", "Cartago", "Guanacaste", "Puntarenas", "Limón", "Liberia", "Jacó", "Tamarindo", "Pérez Zeledón", "Todo Costa Rica"],
    certsEn: ["Se Habla Español", "Free Measure & Quote", "Tempered & Safety Glass", "Made to Measure", "Nationwide Installation", "Workmanship Guaranteed"],
    certsEs: ["Se Habla Español", "Medición y Cotización Gratis", "Vidrio Templado y de Seguridad", "Hecho a la Medida", "Instalación en Todo el País", "Mano de Obra Garantizada"],
    guaranteeEn: { title: "Fits right or we make it right", blurb: "Every piece is measured on site and installed by our own crew. If anything isn't right, we come back and fix it — anywhere in Costa Rica." },
    guaranteeEs: { title: "Queda bien o lo arreglamos", blurb: "Cada pieza se mide en sitio y la instala nuestro propio equipo. Si algo no está bien, regresamos y lo arreglamos — en cualquier parte de Costa Rica." },
  },
  availability: { en: "Mon–Sat · 7am–5pm", es: "Lun–Sáb · 7am–5pm" },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Do you need windows, mirrors, a glass shower or railings? And what part of Costa Rica are you in?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Necesita ventanas, espejos, mampara de baño o barandas? ¿Y en qué parte de Costa Rica se encuentra?",
    roleEn: "Glass Advisor", roleEs: "Asesora de Vidrio",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/gal4.jpg`, `${assets}/gal5.jpg`, `${assets}/gal6.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Truck", title: "We go anywhere in Costa Rica", blurb: "Based in San José, serving the whole country." },
      { icon: "Sparkles", title: "Custom mirrors & glass", blurb: "Cut to any size and shape you need." },
      { icon: "ShieldCheck", title: "Installed & guaranteed", blurb: "Fitted by our own crew, work guaranteed." },
      { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
    ],
    es: [
      { icon: "Truck", title: "Vamos a todo Costa Rica", blurb: "En San José, atendemos todo el país." },
      { icon: "Sparkles", title: "Espejos y vidrio a medida", blurb: "Cortados al tamaño y forma que necesite." },
      { icon: "ShieldCheck", title: "Instalado y garantizado", blurb: "Instalado por nuestro equipo, trabajo garantizado." },
      { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
    ],
  },
  galleryCaptions: {
    en: ["Floor-to-ceiling home windows", "Frameless glass shower & mirror", "Cut & measured to size", "Tempered glass railing", "Custom decorative mirror wall", "Commercial glass storefront"],
    es: ["Ventanas de piso a techo", "Mampara sin marco y espejo", "Cortado y medido a la medida", "Baranda de vidrio templado", "Espejo decorativo a medida", "Vitrina comercial de vidrio"],
  },
  clientTrust: {
    title: { en: "Trusted in homes across Costa Rica", es: "De confianza en hogares de todo Costa Rica" },
    blurb: { en: "Real families and businesses, from San José to the coast — measured, installed and left spotless.", es: "Familias y negocios reales, de San José a la costa — medido, instalado y dejado impecable." },
    images: [
      { src: `${assets}/trust1.jpg`, caption: { en: "Happy homeowner with new windows", es: "Cliente feliz con sus ventanas nuevas" } },
      { src: `${assets}/trust2.jpg`, caption: { en: "Choosing a custom mirror together", es: "Eligiendo un espejo a medida juntos" } },
      { src: `${assets}/team.jpg`, caption: { en: "Our crew travels countrywide", es: "Nuestro equipo viaja por todo el país" } },
    ],
  },
};

export default glass;
