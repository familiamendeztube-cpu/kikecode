import { Car, Sparkles, Droplets, Clock, ShieldCheck, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";

const autoDetailing: BusinessTemplate = {
  slug: "auto-detailing",
  industry: "Auto Detailing",
  industryEs: "Detallado de Autos",
  websiteType: "Auto Services Website",
  defaultServicesField: "Full detail, Interior deep clean, Ceramic coating, Paint correction, Headlight restoration, Hand wash & wax",
  brand: {
    name: "Brillo Auto Detailing",
    city: "Phoenix",
    phone: "(555) 010-0017",
    phoneHref: "tel:+15550100017",
    email: "hello@brilloautodetailing.com",
    address: "455 Shine Blvd, Phoenix, AZ 85003",
    heroIcon: Car,
    palette: {
      primary: "#0EA5E9", primaryDark: "#0369a1", accent: "#22D3EE",
      heroFrom: "#05080f", heroVia: "#0b1828", heroTo: "#05080f",
      heroGlow1: "rgba(14,165,233,0.55)", heroGlow2: "rgba(34,211,238,0.30)",
      heroIconFrom: "#0EA5E9", heroIconTo: "#0369a1",
      contactFrom: "#0EA5E9", contactTo: "#0369a1",
    },
  },
  serviceIcons: [Sparkles, Droplets, Car],
  whyIcons: [Clock, ShieldCheck, Award, Languages],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Mobile detailing across the valley",
        title1: "A Showroom Shine,",
        title2: "Inside & Out",
        subtitle: "Full details, ceramic coatings, paint correction and interior deep cleans. We come to you. Bilingual crew.",
        cta1: "Book a Detail", cta2: "Call Now",
        badges: ["Mobile Service", "Bilingual EN/ES", "Ceramic Specialists", "Satisfaction Guaranteed"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "900+ cars detailed",
        trustTitle: "Ceramic Certified", trustSubtitle: "Pro-grade products",
      },
      services: {
        title: "What We Do", blurb: "From a quick refresh to a full transformation.",
        items: [
          { title: "Full Detail", blurb: "Exterior wash, clay, polish and a deep interior clean that makes it feel new." },
          { title: "Ceramic Coating", blurb: "Long-lasting gloss and protection that beads water and resists scratches." },
          { title: "Interior Deep Clean", blurb: "Shampoo, steam, leather care and odor removal — every crack and crevice." },
        ],
      },
      why: {
        title: "Why Drivers Choose Us",
        items: [
          { title: "We come to you", blurb: "Home or office — we bring water, power and everything we need." },
          { title: "Fully insured", blurb: "Your vehicle is protected from arrival to final wipe-down." },
          { title: "Pro-grade products", blurb: "Certified ceramic coatings and safe, premium chemicals." },
          { title: "Bilingual: English & Spanish", blurb: "Clear service and respect in your language." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Book online or call", blurb: "Pick a package and a time that works for you." },
          { title: "We arrive to you", blurb: "Fully equipped van, no need to leave home." },
          { title: "We detail your car", blurb: "Careful, thorough work inside and out." },
          { title: "Walk-around & shine", blurb: "We review the results with you before we leave." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Daniel R.", role: "Truck owner", quote: "They came to my house and my truck looked better than the day I bought it. The ceramic coating is unreal." },
          { name: "Karen M.", role: "SUV owner", quote: "Got the kids' mess out of every seat. Smells brand new and they were so professional." },
          { name: "Luis G.", role: "Car enthusiast", quote: "Best paint correction in the valley. Swirl marks gone, deep gloss, fair price." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you really come to me?", a: "Yes — we're fully mobile. We bring our own water and power to your home or office." },
          { q: "How long does a full detail take?", a: "Most full details take 2–4 hours depending on the vehicle's size and condition." },
          { q: "How long does ceramic coating last?", a: "Our coatings last 2–5 years depending on the package and care. We explain each option up front." },
          { q: "What does it cost?", a: "Packages start affordable and scale with the service. We always quote you before we start." },
        ],
      },
      contact: {
        title: "Book Your Detail", blurb: "Tell us about your vehicle. We respond same day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Vehicle make/model and what you'd like",
        submit: "Request Booking", success: "Thank you — we'll text you today to confirm your detail.",
        pick: "— Pick a service —",
        services: ["Full detail", "Ceramic coating", "Interior deep clean", "Paint correction", "Wash & wax", "Other"],
      },
      footer: { tagline: "Detailing done right — we come to you.", hours: "Mon–Sat · 8am–6pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Detallado móvil en toda la ciudad",
        title1: "Brillo de Exhibición,",
        title2: "Por Dentro y Por Fuera",
        subtitle: "Detallado completo, recubrimiento cerámico, corrección de pintura y limpieza interior profunda. Vamos a usted. Equipo bilingüe.",
        cta1: "Reserve un Detallado", cta2: "Llame Ahora",
        badges: ["Servicio Móvil", "Bilingüe EN/ES", "Especialistas en Cerámico", "Satisfacción Garantizada"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "900+ autos detallados",
        trustTitle: "Certificados en Cerámico", trustSubtitle: "Productos profesionales",
      },
      services: {
        title: "Lo Que Hacemos", blurb: "Desde un refresco rápido hasta una transformación completa.",
        items: [
          { title: "Detallado Completo", blurb: "Lavado exterior, arcilla, pulido y limpieza interior profunda que lo deja como nuevo." },
          { title: "Recubrimiento Cerámico", blurb: "Brillo y protección duraderos que repelen el agua y resisten rayones." },
          { title: "Limpieza Interior Profunda", blurb: "Champú, vapor, cuidado de cuero y eliminación de olores — cada rincón." },
        ],
      },
      why: {
        title: "Por Qué Nos Eligen",
        items: [
          { title: "Vamos a usted", blurb: "Casa u oficina — llevamos agua, energía y todo lo necesario." },
          { title: "Totalmente asegurados", blurb: "Su vehículo está protegido de principio a fin." },
          { title: "Productos profesionales", blurb: "Recubrimientos cerámicos certificados y químicos seguros de calidad." },
          { title: "Bilingüe: Inglés y Español", blurb: "Servicio claro y respeto en su idioma." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Reserve en línea o llame", blurb: "Elija un paquete y una hora que le convenga." },
          { title: "Llegamos a usted", blurb: "Camioneta totalmente equipada, sin salir de casa." },
          { title: "Detallamos su auto", blurb: "Trabajo cuidadoso y completo por dentro y por fuera." },
          { title: "Revisión y brillo", blurb: "Revisamos los resultados con usted antes de irnos." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Daniel R.", role: "Dueño de camioneta", quote: "Vinieron a mi casa y mi troca quedó mejor que el día que la compré. El cerámico es increíble." },
          { name: "Karen M.", role: "Dueña de SUV", quote: "Sacaron el desorden de los niños de cada asiento. Huele a nuevo y fueron muy profesionales." },
          { name: "Luis G.", role: "Aficionado a los autos", quote: "La mejor corrección de pintura de la ciudad. Sin rayones, brillo profundo, precio justo." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿De verdad vienen a mí?", a: "Sí — somos totalmente móviles. Llevamos nuestra propia agua y energía a su casa u oficina." },
          { q: "¿Cuánto tarda un detallado completo?", a: "La mayoría toma de 2 a 4 horas según el tamaño y la condición del vehículo." },
          { q: "¿Cuánto dura el recubrimiento cerámico?", a: "Nuestros recubrimientos duran de 2 a 5 años según el paquete y el cuidado. Le explicamos cada opción." },
          { q: "¿Cuánto cuesta?", a: "Los paquetes empiezan accesibles y suben según el servicio. Siempre le cotizamos antes de empezar." },
        ],
      },
      contact: {
        title: "Reserve su Detallado", blurb: "Cuéntenos de su vehículo. Respondemos el mismo día.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Marca/modelo del vehículo y lo que desea",
        submit: "Solicitar Reserva", success: "Gracias — le escribiremos hoy para confirmar su detallado.",
        pick: "— Elija un servicio —",
        services: ["Detallado completo", "Recubrimiento cerámico", "Limpieza interior", "Corrección de pintura", "Lavado y cera", "Otro"],
      },
      footer: { tagline: "Detallado bien hecho — vamos a usted.", hours: "Lun–Sáb · 8am–6pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default autoDetailing;
