import { Camera, Heart, Users, Star, Clock, Award, ThumbsUp, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";

const photography: BusinessTemplate = {
  slug: "photography",
  industry: "Photography",
  industryEs: "Fotografía",
  websiteType: "Creative Services Website",
  defaultServicesField: "Quinceañeras, Weddings, Family portraits, Events, Newborn & maternity, Studio sessions",
  brand: {
    name: "Luz & Recuerdos Photography",
    city: "Phoenix",
    phone: "(555) 010-0013",
    phoneHref: "tel:+15550100013",
    email: "hola@luzyrecuerdos.com",
    address: "740 Camelback Rd, Phoenix, AZ 85013",
    heroIcon: Camera,
    palette: {
      primary: "#2563EB", primaryDark: "#1e3a8a", accent: "#06B6D4",
      heroFrom: "#0a0f1f", heroVia: "#0f1a2e", heroTo: "#070b16",
      heroGlow1: "rgba(37,99,235,0.50)", heroGlow2: "rgba(6,182,212,0.30)",
      heroIconFrom: "#2563EB", heroIconTo: "#06B6D4",
      contactFrom: "#2563EB", contactTo: "#06B6D4",
    },
  },
  serviceIcons: [Camera, Heart, Users],
  whyIcons: [Star, Clock, Award, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Capturing your moments since 2013",
        title1: "Beautiful Photography for",
        title2: "Quinceañeras, Weddings & Family",
        subtitle: "Timeless portraits, full event coverage, and studio sessions that tell your story. Bilingual photographers. Free consultations.",
        cta1: "Book a Session", cta2: "Call Now",
        badges: ["Same-Week Booking", "Bilingual EN/ES", "Free Consultation", "Pro Editing Included"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ sessions captured",
        trustTitle: "Insured Photographers", trustSubtitle: "Backup gear, always",
      },
      services: {
        title: "What We Capture", blurb: "Every milestone, beautifully preserved.",
        items: [
          { title: "Quinceañeras & Weddings", blurb: "Full-day coverage, candid moments, and stunning portraits of your big celebration." },
          { title: "Family & Newborn", blurb: "Warm, natural portraits at home, in studio, or your favorite outdoor spot." },
          { title: "Events & Portraits", blurb: "Birthdays, baptisms, graduations, and professional headshots — done with care." },
        ],
      },
      why: {
        title: "Why Families Choose Us",
        items: [
          { title: "An eye for real moments", blurb: "We capture genuine emotion, not stiff poses." },
          { title: "Fast, reliable delivery", blurb: "Edited galleries delivered on time, every time." },
          { title: "Pro editing included", blurb: "Color, retouching, and polish in every package." },
          { title: "Relaxed, fun sessions", blurb: "We make everyone comfortable so you look your best." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Free consultation", blurb: "We talk through your vision, date, and locations." },
          { title: "Plan the session", blurb: "Pick a package, outfits, and timeline together." },
          { title: "Shoot day", blurb: "Relaxed, fun, and fully directed — just enjoy it." },
          { title: "Edited gallery delivered", blurb: "Receive your polished photos in a private online gallery." },
        ],
      },
      testimonials: {
        title: "What Clients Say",
        items: [
          { name: "Gabriela L.", role: "Quince mom", quote: "Every photo from my daughter's quinceañera is a treasure. They captured emotions we'll never forget." },
          { name: "Andrew & Mia", role: "Newlyweds", quote: "Our wedding gallery is breathtaking. They were everywhere and nowhere — never intrusive, always ready." },
          { name: "Teresa R.", role: "New mom", quote: "The newborn session was so gentle and patient. The photos make me cry happy tears every time." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "How much do sessions cost?", a: "Portrait sessions start at $250; event and wedding packages start at $900. We'll quote based on your needs." },
          { q: "When will I get my photos?", a: "Portrait galleries in 1–2 weeks; weddings and large events in 3–4 weeks. Sneak peeks come even sooner." },
          { q: "Do you travel for shoots?", a: "Yes — we cover the whole metro area and travel beyond for an additional fee." },
          { q: "Can we choose the location?", a: "Absolutely. We shoot at home, in our studio, or any outdoor spot that's meaningful to you." },
        ],
      },
      contact: {
        title: "Book Your Session", blurb: "Tell us what you're celebrating and when. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Type of session", message: "Tell us about your session",
        submit: "Request Booking", success: "Thank you — we'll reach out within 1 business day.",
        pick: "— Pick a session type —",
        services: ["Quinceañera", "Wedding", "Family portraits", "Event coverage", "Studio session"],
      },
      footer: { tagline: "Capturing the moments that matter most.", hours: "Mon–Sat · 9am–7pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Capturando sus momentos desde 2013",
        title1: "Fotografía Hermosa para",
        title2: "Quinceañeras, Bodas y Familia",
        subtitle: "Retratos atemporales, cobertura completa de eventos y sesiones de estudio que cuentan su historia. Fotógrafos bilingües. Consultas gratis.",
        cta1: "Reserve su Sesión", cta2: "Llame Ahora",
        badges: ["Reserva en la Semana", "Bilingüe EN/ES", "Consulta Gratis", "Edición Profesional Incluida"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "600+ sesiones capturadas",
        trustTitle: "Fotógrafos Asegurados", trustSubtitle: "Equipo de respaldo, siempre",
      },
      services: {
        title: "Lo Que Capturamos", blurb: "Cada momento especial, bellamente preservado.",
        items: [
          { title: "Quinceañeras y Bodas", blurb: "Cobertura del día completo, momentos espontáneos y retratos impresionantes de su gran celebración." },
          { title: "Familia y Recién Nacidos", blurb: "Retratos cálidos y naturales en casa, en estudio o en su lugar favorito al aire libre." },
          { title: "Eventos y Retratos", blurb: "Cumpleaños, bautizos, graduaciones y fotos profesionales — hechos con cuidado." },
        ],
      },
      why: {
        title: "Por Qué Las Familias Nos Eligen",
        items: [
          { title: "Ojo para momentos reales", blurb: "Capturamos emoción genuina, no poses rígidas." },
          { title: "Entrega rápida y confiable", blurb: "Galerías editadas entregadas a tiempo, siempre." },
          { title: "Edición profesional incluida", blurb: "Color, retoque y pulido en cada paquete." },
          { title: "Sesiones relajadas y divertidas", blurb: "Hacemos sentir cómodos a todos para que luzcan mejor." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Consulta gratis", blurb: "Conversamos sobre su visión, fecha y locaciones." },
          { title: "Planeamos la sesión", blurb: "Elegimos juntos paquete, vestuario y horario." },
          { title: "Día de la sesión", blurb: "Relajada, divertida y bien dirigida — solo disfrute." },
          { title: "Galería editada entregada", blurb: "Reciba sus fotos pulidas en una galería privada en línea." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Gabriela L.", role: "Mamá de quinceañera", quote: "Cada foto de la quinceañera de mi hija es un tesoro. Capturaron emociones que nunca olvidaremos." },
          { name: "Andrew y Mía", role: "Recién casados", quote: "Nuestra galería de boda es impresionante. Estaban en todos lados sin ser intrusivos, siempre listos." },
          { name: "Teresa R.", role: "Mamá primeriza", quote: "La sesión de recién nacido fue muy delicada y paciente. Las fotos me sacan lágrimas de felicidad cada vez." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuestan las sesiones?", a: "Las sesiones de retrato desde $250; los paquetes de eventos y bodas desde $900. Cotizamos según sus necesidades." },
          { q: "¿Cuándo recibo mis fotos?", a: "Galerías de retrato en 1–2 semanas; bodas y eventos grandes en 3–4 semanas. Los adelantos llegan aún antes." },
          { q: "¿Viajan para las sesiones?", a: "Sí — cubrimos toda el área metropolitana y viajamos más lejos por una tarifa adicional." },
          { q: "¿Podemos elegir la locación?", a: "Por supuesto. Fotografiamos en casa, en nuestro estudio o en cualquier lugar al aire libre que sea especial para usted." },
        ],
      },
      contact: {
        title: "Reserve su Sesión", blurb: "Díganos qué celebra y cuándo. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Tipo de sesión", message: "Cuéntenos sobre su sesión",
        submit: "Solicitar Reserva", success: "Gracias — le contactaremos en 1 día hábil.",
        pick: "— Elija un tipo de sesión —",
        services: ["Quinceañera", "Boda", "Retratos de familia", "Cobertura de evento", "Sesión de estudio"],
      },
      footer: { tagline: "Capturando los momentos que más importan.", hours: "Lun–Sáb · 9am–7pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default photography;
