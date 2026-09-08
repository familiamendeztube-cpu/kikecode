import { Car, Banknote, KeyRound, BadgeCheck, Gauge, ShieldCheck, Headset } from "lucide-react";
import type { BusinessTemplate } from "./types";

const chalesGarage: BusinessTemplate = {
  slug: "chales-garage",
  industry: "Car Dealership",
  industryEs: "Venta de Vehículos",
  websiteType: "Car Dealership Website",
  defaultServicesField:
    "New & used vehicles, Auto financing, Trade-ins, Test drives, Vehicle inspection, Imported vehicles",
  brand: {
    name: "Chale's Garage",
    logo: "/template-assets/chales-garage/logo-mark.png",
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
};

export default chalesGarage;
