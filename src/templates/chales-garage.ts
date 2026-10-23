import { Car, Banknote, KeyRound, BadgeCheck, Gauge, ShieldCheck, Headset } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/chales-garage`;

const chalesGarage: BusinessTemplate = {
  slug: "chales-garage",
  industry: "Car Dealership",
  industryEs: "Venta de Vehículos",
  websiteType: "Car Dealership Website",
  defaultServicesField:
    "New & used vehicles, Auto financing, Trade-ins, Test drives, Vehicle inspection, Imported vehicles",
  brand: {
    name: "Chale's Garage",
    logo: `${TEMPLATE_ASSETS}/chales-garage/logo-mark.png`,
    city: "Muelle, San Carlos · Costa Rica",
    phone: "8561-2228",
    phoneHref: "tel:+50685612228",
    email: "Alejandrov@chalesgarage.com",
    address: "Muelle de San Carlos, Alajuela, Costa Rica",
    heroIcon: Car,
    socials: {
      facebook: "https://www.facebook.com/p/Chales-Garage-100092127770480/",
      instagram: "https://www.instagram.com/chales_garage/",
    },
    palette: {
      primary: "#C2410C", primaryDark: "#9A3412", accent: "#FB923C",
      heroFrom: "#0A0B0E", heroVia: "#121418", heroTo: "#08090C",
      heroGlow1: "rgba(234,88,12,0.34)", heroGlow2: "rgba(255,255,255,0.06)",
      heroIconFrom: "#F97316", heroIconTo: "#C2410C",
      contactFrom: "#0A0B0E", contactTo: "#15171C",
    },
  },
  serviceIcons: [Car, Banknote, KeyRound],
  whyIcons: [BadgeCheck, Gauge, ShieldCheck, Headset],
  lockedLang: "es",
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "How It Works", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "New & used vehicles · Muelle, San Carlos",
        title1: "Find Your Next Car",
        title2: "With Total Confidence",
        subtitle: "Hand-picked new and used cars, SUVs, and pickups — inspected, financed, and ready to drive. Browse our full inventory and find the perfect vehicle for your family.",
        cta1: "View Inventory", cta2: "Call Now",
        badges: ["Financing Available", "Trade-Ins Welcome", "Every Vehicle Inspected", "Bilingual Service"],
        ratingTitle: "Financing", ratingSubtitle: "Options available",
        trustTitle: "Quality Guaranteed", trustSubtitle: "Every vehicle inspected",
      },
      services: {
        title: "Everything You Need to Drive Away Happy", blurb: "From browsing to financing to the keys in your hand — we make buying a car simple.",
        items: [
          { title: "New & Used Vehicles", blurb: "A constantly updated selection of inspected cars, SUVs, and pickups for every budget." },
          { title: "Financing Made Easy", blurb: "We help you find financing options that fit your budget, with friendly guidance every step." },
          { title: "Trade-In & Test Drive", blurb: "Bring your current vehicle for a fair trade-in value, and take any car for a test drive." },
        ],
      },
      why: {
        title: "Why Families Buy From Chale's Garage",
        items: [
          { title: "Honest, no-pressure service", blurb: "We help you find the right vehicle — we never push you into one." },
          { title: "Every vehicle inspected",     blurb: "Each car is checked over so you drive away with total peace of mind." },
          { title: "Financing & trade-ins",       blurb: "Flexible financing options and a fair value for your current vehicle." },
          { title: "Bilingual, local team",       blurb: "Family-owned in Muelle, San Carlos — we treat every customer like a neighbor." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Browse the inventory", blurb: "See every vehicle we have, with photos inside and out." },
          { title: "Tell us what you need", blurb: "Message or call and we'll match you with the right car." },
          { title: "Test drive & finance", blurb: "Take it for a spin and we handle the financing paperwork." },
          { title: "Drive away happy",     blurb: "Sign, grab your keys, and enjoy your new vehicle." },
        ],
      },
      testimonials: {
        title: "What Our Customers Say",
        items: [
          { name: "Marvin C.", role: "Customer, Ciudad Quesada", quote: "Bought my pickup here and the whole process was honest and easy. They explained the financing clearly and never pressured me." },
          { name: "Karla R.",  role: "Customer, Muelle",          quote: "I found the exact SUV I wanted for my family. The team let me take my time and even helped with my trade-in." },
          { name: "José A.",   role: "Customer, Aguas Zarcas",    quote: "Great prices and the car was exactly as shown online. Real photos, real condition. Highly recommend Chale's Garage." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you offer financing?",            a: "Yes. We work with financing options to fit different budgets and walk you through every step. Message us and we'll help you get started." },
          { q: "Do you accept trade-ins?",           a: "Absolutely. Bring your current vehicle and we'll give you a fair trade-in value to put toward your next car." },
          { q: "Are your vehicles inspected?",       a: "Every vehicle is inspected before it goes on the lot, so you can buy with confidence. We'll gladly show you the details of any car." },
          { q: "Can I see more photos of a car?",    a: "Yes — click any vehicle to look inside and out. Want even more? Message us on WhatsApp and we'll send additional photos or arrange a test drive." },
        ],
      },
      contact: {
        title: "Ask About a Vehicle", blurb: "Tell us what you're looking for and we'll help you find it. We reply fast on WhatsApp and by phone.",
        name: "Your name", phone: "Phone", service: "What are you looking for?", message: "Tell us which vehicle or what you need",
        submit: "Send Message", success: "Thanks — we'll reply right away with details and availability.",
        pick: "— Choose an option —",
        services: ["SUV", "Pickup", "Sedan", "Financing question", "Trade-in valuation", "Other"],
      },
      footer: { tagline: "New and used vehicles, financing, and honest service in Muelle, San Carlos.", hours: "Mon–Sat · 8am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Cómo Funciona", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Vehículos nuevos y usados · Muelle, San Carlos",
        title1: "Encuentre Su Próximo Auto",
        title2: "Con Total Confianza",
        subtitle: "Autos, SUVs y pick-ups nuevos y usados, seleccionados a mano — revisados, con financiamiento y listos para rodar. Explore todo nuestro inventario y encuentre el vehículo perfecto para su familia.",
        cta1: "Ver Inventario", cta2: "Llame Ahora",
        badges: ["Financiamiento Disponible", "Aceptamos su Vehículo", "Cada Vehículo Revisado", "Servicio Bilingüe"],
        ratingTitle: "Financiamiento", ratingSubtitle: "Opciones disponibles",
        trustTitle: "Calidad Garantizada", trustSubtitle: "Cada vehículo revisado",
      },
      services: {
        title: "Todo Lo Que Necesita Para Estrenar Vehículo", blurb: "Desde explorar hasta el financiamiento y las llaves en su mano — hacemos fácil comprar su auto.",
        items: [
          { title: "Vehículos Nuevos y Usados", blurb: "Una selección siempre actualizada de autos, SUVs y pick-ups revisados para todo presupuesto." },
          { title: "Financiamiento Fácil",      blurb: "Le ayudamos a encontrar opciones de financiamiento a su medida, con asesoría amable en cada paso." },
          { title: "Recibimos y Pruebe de Manejo", blurb: "Traiga su vehículo actual por un valor justo de cambio, y maneje cualquier auto de prueba." },
        ],
      },
      why: {
        title: "Por Qué Las Familias Compran en Chale's Garage",
        items: [
          { title: "Servicio honesto, sin presión", blurb: "Le ayudamos a encontrar el vehículo correcto — nunca lo presionamos." },
          { title: "Cada vehículo revisado",        blurb: "Cada auto es inspeccionado para que maneje con total tranquilidad." },
          { title: "Financiamiento y recibos",      blurb: "Opciones flexibles de financiamiento y un valor justo por su vehículo actual." },
          { title: "Equipo local y bilingüe",       blurb: "Negocio familiar en Muelle, San Carlos — tratamos a cada cliente como a un vecino." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Explore el inventario",     blurb: "Vea todos los vehículos que tenemos, con fotos por dentro y por fuera." },
          { title: "Díganos qué necesita",      blurb: "Escríbanos o llame y le buscamos el auto ideal." },
          { title: "Pruebe y financie",         blurb: "Manéjelo de prueba y nosotros gestionamos el financiamiento." },
          { title: "Estrene su vehículo",       blurb: "Firme, reciba sus llaves y disfrute su nuevo vehículo." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Nuestros Clientes",
        items: [
          { name: "Marvin C.", role: "Cliente, Ciudad Quesada", quote: "Compré mi pick-up aquí y todo el proceso fue honesto y sencillo. Me explicaron el financiamiento con claridad y nunca me presionaron." },
          { name: "Karla R.",  role: "Cliente, Muelle",          quote: "Encontré la SUV exacta que quería para mi familia. El equipo me dio mi tiempo y hasta me ayudó con el cambio de mi carro." },
          { name: "José A.",   role: "Cliente, Aguas Zarcas",    quote: "Buenos precios y el carro estaba tal cual se mostraba en línea. Fotos reales, condición real. Recomiendo Chale's Garage." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Ofrecen financiamiento?",           a: "Sí. Trabajamos con opciones de financiamiento para distintos presupuestos y le acompañamos en cada paso. Escríbanos y le ayudamos a empezar." },
          { q: "¿Reciben mi vehículo como parte de pago?", a: "Claro que sí. Traiga su vehículo actual y le damos un valor justo de cambio para su próximo auto." },
          { q: "¿Los vehículos están revisados?",    a: "Cada vehículo es inspeccionado antes de salir a la venta, para que compre con confianza. Con gusto le mostramos los detalles de cualquier auto." },
          { q: "¿Puedo ver más fotos de un auto?",   a: "Sí — haga clic en cualquier vehículo para verlo por dentro y por fuera. ¿Quiere más? Escríbanos por WhatsApp y le enviamos fotos adicionales o agendamos una prueba de manejo." },
        ],
      },
      contact: {
        title: "Pregunte por un Vehículo", blurb: "Cuéntenos qué busca y le ayudamos a encontrarlo. Respondemos rápido por WhatsApp y por teléfono.",
        name: "Su nombre", phone: "Teléfono", service: "¿Qué está buscando?", message: "Díganos qué vehículo o qué necesita",
        submit: "Enviar Mensaje", success: "Gracias — le respondemos de inmediato con detalles y disponibilidad.",
        pick: "— Elija una opción —",
        services: ["SUV", "Pick-up", "Sedán", "Pregunta de financiamiento", "Valoración de su vehículo", "Otro"],
      },
      footer: { tagline: "Vehículos nuevos y usados, financiamiento y servicio honesto en Muelle, San Carlos.", hours: "Lun–Sáb · 8am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  realBusiness: true,
  category: "auto",
  facts: {
    stats: [
      { value: "New & Used", valueEs: "Nuevos y Usados", labelEn: "Vehicles in stock", labelEs: "Vehículos en inventario" },
      { value: "Financing", valueEs: "Financiamiento", labelEn: "Options available", labelEs: "Opciones disponibles" },
      { value: "Trade-Ins", valueEs: "Recibimos", labelEn: "Your vehicle welcome", labelEs: "Aceptamos su vehículo" },
      { value: "Bilingual", valueEs: "Bilingüe", labelEn: "English & Spanish", labelEs: "Inglés y español" },
    ],
    certsEn: ["New & Used Vehicles", "Financing Available", "Trade-Ins Accepted", "Every Vehicle Inspected", "Bilingual EN/ES", "Honest, No-Pressure Service"],
    certsEs: ["Vehículos Nuevos y Usados", "Financiamiento Disponible", "Aceptamos su Vehículo", "Cada Vehículo Revisado", "Bilingüe EN/ES", "Servicio Honesto y Sin Presión"],
    guaranteeEn: { title: "Buy with total confidence", blurb: "Every vehicle is inspected before it reaches our lot, and what you see online is what you get. No surprises, no pressure." },
    guaranteeEs: { title: "Compre con total confianza", blurb: "Cada vehículo es revisado antes de salir a la venta, y lo que ve en línea es lo que recibe. Sin sorpresas, sin presión." },
  },
  availability: {
    en: "Mon–Sat · 8am–6pm",
    es: "Lun–Sáb · 8am–6pm",
  },
  assistant: {
    name: "Sofía",
    en: "Hi! Thanks for contacting {business}. Which vehicle can I help you find today?",
    es: "¡Hola! Gracias por contactar a {business}. ¿Qué vehículo le ayudo a encontrar hoy?",
    roleEn: "Sales Advisor",
    roleEs: "Asesora de Ventas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    heroVideo: `${assets}/reel-promo.mp4`,
    heroPoster: `${assets}/hero.jpg`,
    gallery: [
      `${assets}/real-lot.jpg`,
      `${assets}/real-4x4.jpg`,
      `${assets}/real-premium.jpg`,
      `${assets}/real-interior.jpg`,
      `${assets}/real-owner.jpg`,
      `${assets}/real-showroom.jpg`,
    ],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "DollarSign",  title: "Financing available",    blurb: "Flexible options to fit your budget." },
      { icon: "Truck",       title: "Trade-ins welcome",       blurb: "Fair value for your current vehicle." },
      { icon: "ShieldCheck", title: "Every vehicle inspected", blurb: "Checked over before it hits the lot." },
      { icon: "BadgeCheck",  title: "Quality guaranteed",      blurb: "What you see online is what you get." },
      { icon: "Languages",   title: "Bilingual service",       blurb: "We serve you in English or Spanish." },
      { icon: "Star",        title: "Honest, no pressure",     blurb: "Browse and buy at your own pace." },
    ],
    es: [
      { icon: "DollarSign",  title: "Financiamiento disponible", blurb: "Opciones flexibles a su presupuesto." },
      { icon: "Truck",       title: "Aceptamos su vehículo",     blurb: "Valor justo por su carro actual." },
      { icon: "ShieldCheck", title: "Cada vehículo revisado",    blurb: "Inspeccionado antes de salir a la venta." },
      { icon: "BadgeCheck",  title: "Calidad garantizada",       blurb: "Lo que ve en línea es lo que recibe." },
      { icon: "Languages",   title: "Servicio bilingüe",         blurb: "Le atendemos en inglés o español." },
      { icon: "Star",        title: "Honesto, sin presión",      blurb: "Explore y compre a su propio ritmo." },
    ],
  },
  galleryCaptions: {
    en: [
      "Our lot in Muelle, San Carlos",
      "Classic 4x4s ready for any road",
      "Premium vehicles, inspected in detail",
      "Sporty, well-kept interiors",
      "Personal, honest service from our team",
      "We show you every vehicle in our showroom",
    ],
    es: [
      "Nuestro lote en Muelle, San Carlos",
      "4x4 clásicos listos para todo terreno",
      "Vehículos premium revisados a detalle",
      "Interiores deportivos y bien cuidados",
      "Atención personal y honesta de nuestro equipo",
      "Le mostramos cada vehículo en nuestro showroom",
    ],
  },
  videoGallery: {
    title: { en: "See Chale's Garage in Action", es: "Conozca Chale's Garage en Video" },
    blurb: {
      en: "Real footage from our lot in Muelle, San Carlos — special promotions and credit approval in 24 hours.",
      es: "Video real de nuestro lote en Muelle, San Carlos — promociones especiales y créditos en 24 horas.",
    },
    eyebrow: { en: "Real footage, real cars", es: "Video real, carros reales" },
    ctaLabel: { en: "I'm Interested", es: "Me Interesa" },
    items: [
      {
        src: `${assets}/reel-promo.mp4`, poster: `${assets}/reel-promo.jpg`,
        title: { en: "Find Your Car at Chale's Garage", es: "Encuentre Su Carro en Chale's Garage" },
        caption: {
          en: "Special promotions and credit in 24 hours. Come visit us in Muelle, San Carlos.",
          es: "Promociones especiales y créditos en 24 horas. Visítenos en Muelle, San Carlos.",
        },
      },
      {
        src: `${assets}/reel-7.mp4`, poster: `${assets}/reel-7.jpg`,
        title: { en: "The Chale's Family", es: "La Familia Chale's" },
        caption: {
          en: "New SUVs delivered with pride — welcome to the Chale's Garage family.",
          es: "SUVs nuevas entregadas con orgullo — bienvenido a la familia Chale's Garage.",
        },
      },
      {
        src: `${assets}/reel-8.mp4`, poster: `${assets}/reel-8.jpg`,
        title: { en: "Tough 4x4s", es: "4x4 Para Todo Terreno" },
        caption: {
          en: "Genuine 4-wheel-drive Toyotas built for Costa Rican roads.",
          es: "Toyotas 4x4 auténticos, hechos para los caminos de Costa Rica.",
        },
      },
      {
        src: `${assets}/reel-2.mp4`, poster: `${assets}/reel-2.jpg`,
        title: { en: "Built for Adventure", es: "Listos Para la Aventura" },
        caption: {
          en: "Powerful off-road vehicles ready for any terrain in Costa Rica.",
          es: "Vehículos todoterreno potentes, listos para cualquier camino de Costa Rica.",
        },
      },
      {
        src: `${assets}/reel-5.mp4`, poster: `${assets}/reel-5.jpg`,
        title: { en: "Service With a Smile", es: "Atención Con Una Sonrisa" },
        caption: {
          en: "A friendly, bilingual team ready to help you find the right vehicle.",
          es: "Un equipo amable y bilingüe listo para ayudarle a encontrar su vehículo ideal.",
        },
      },
      {
        src: `${assets}/reel-6.mp4`, poster: `${assets}/reel-6.jpg`,
        title: { en: "Inspected and Ready to Drive", es: "Revisado y Listo Para Rodar" },
        caption: {
          en: "Clean, reliable sedans checked over and ready for your family.",
          es: "Sedanes limpios y confiables, revisados y listos para su familia.",
        },
      },
      {
        src: `${assets}/reel-4.mp4`, poster: `${assets}/reel-4.jpg`,
        title: { en: "Premium Interiors", es: "Interiores Premium" },
        caption: {
          en: "Sporty, well-kept interiors — every detail inspected before delivery.",
          es: "Interiores deportivos y bien cuidados — cada detalle revisado antes de entregar.",
        },
      },
      {
        src: `${assets}/reel-3.mp4`, poster: `${assets}/reel-3.jpg`,
        title: { en: "The Chale's Garage Team", es: "El Equipo de Chale's Garage" },
        caption: {
          en: "Honest, family-owned service — we treat every customer like a neighbor.",
          es: "Servicio honesto y familiar — tratamos a cada cliente como a un vecino.",
        },
      },
    ],
  },
  inventory: {
    title: { en: "Vehicles On Our Lot", es: "Vehículos en Nuestro Lote" },
    blurb: {
      en: "Real vehicles from Chale's Garage. Click any one for more photos, then message us on WhatsApp for the current price and availability.",
      es: "Vehículos reales de Chale's Garage. Haga clic en cualquiera para ver más fotos y escríbanos por WhatsApp para conocer el precio y la disponibilidad actual.",
    },
    vehicles: [
      {
        id: "bmw-x6", name: "BMW X6", bodyStyle: "SUV",
        price: "Consultar", status: { en: "On the lot", es: "En el lote" },
        transmission: { en: "Automatic", es: "Automática" }, fuel: { en: "Gasoline", es: "Gasolina" }, drivetrain: { en: "AWD xDrive", es: "Tracción AWD xDrive" },
        images: [`${assets}/real-premium.jpg`, `${assets}/real-interior.jpg`],
        highlights: {
          en: ["Premium SUV coupe", "Red leather sport interior", "Black sport wheels", "Head-turning presence"],
          es: ["SUV coupé premium", "Interior deportivo en cuero rojo", "Rines deportivos negros", "Presencia imponente"],
        },
        featured: true,
      },
      {
        id: "toyota-land-cruiser-fj40", name: "Toyota Land Cruiser FJ40", bodyStyle: "SUV",
        price: "Consultar", status: { en: "Classic", es: "Clásico" },
        drivetrain: { en: "4x4", es: "4x4" },
        images: [`${assets}/landcruiser.jpg`, `${assets}/landcruiser-int.jpg`],
        highlights: {
          en: ["Iconic off-road classic", "4x4 with front winch", "A true collector's piece", "Unmistakable presence"],
          es: ["Clásico todoterreno icónico", "4x4 con winche frontal", "Una verdadera joya de colección", "Presencia inconfundible"],
        },
        featured: true,
      },
      {
        id: "nissan-tiida", name: "Nissan Tiida", bodyStyle: "Sedan",
        price: "Consultar", status: { en: "On the lot", es: "En el lote" },
        fuel: { en: "Gasoline", es: "Gasolina" },
        images: [`${assets}/tiida.jpg`],
        highlights: {
          en: ["Compact and economical", "Great for the city", "Low fuel consumption", "Well cared for"],
          es: ["Compacto y económico", "Ideal para la ciudad", "Bajo consumo de combustible", "Bien cuidado"],
        },
      },
    ],
  },
};

export default chalesGarage;
