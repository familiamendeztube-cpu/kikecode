import { Wrench, Hammer, Drill, Plug, Clock, ShieldCheck, ThumbsUp, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";

const handyman: BusinessTemplate = {
  slug: "handyman",
  industry: "Handyman / Repairs",
  industryEs: "Reparaciones",
  websiteType: "Construction Website",
  defaultServicesField: "Drywall, Plumbing repairs, Electrical, Furniture assembly, Painting, Doors & locks, TV mounting",
  brand: {
    name: "Mr. Fix-It Pro",
    city: "Houston",
    phone: "(555) 010-0002",
    phoneHref: "tel:+15550100002",
    email: "hello@mrfixitpro.com",
    address: "200 Main St, Houston, TX 77002",
    heroIcon: Wrench,
    palette: {
      primary: "#B52126", primaryDark: "#7f1d1d", accent: "#1F2937",
      heroFrom: "#111827", heroVia: "#1F2937", heroTo: "#0b0f17",
      heroGlow1: "rgba(181,33,38,0.55)", heroGlow2: "rgba(255,255,255,0.08)",
      heroIconFrom: "#B52126", heroIconTo: "#7f1d1d",
      contactFrom: "#B52126", contactTo: "#1F2937",
    },
  },
  serviceIcons: [Hammer, Drill, Plug],
  whyIcons: [Clock, ShieldCheck, ThumbsUp, Sparkles],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Same-day & next-day appointments",
        title1: "Trusted Handyman for",
        title2: "Anything That Needs Fixing",
        subtitle: "Drywall, plumbing, electrical, furniture, TV mounting and more. Bilingual. Honest pricing. Clean work.",
        cta1: "Get Free Quote", cta2: "Call Now",
        badges: ["Same-Day Service", "Bilingual EN/ES", "Up-front Pricing", "Workmanship Guarantee"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "500+ five-star jobs",
        trustTitle: "Insured Technicians", trustSubtitle: "Background-checked",
      },
      services: {
        title: "What We Repair", blurb: "From a stuck door to a full punch list.",
        items: [
          { title: "Carpentry & Repairs", blurb: "Doors, trim, drywall, shelving, deck boards. Done right the first time." },
          { title: "Mounting & Assembly", blurb: "TVs, shelves, IKEA furniture, blinds, baby gear, anchors that hold." },
          { title: "Electrical & Plumbing", blurb: "Fixtures, faucets, ceiling fans, outlets, toilets. Small jobs, fast." },
        ],
      },
      why: {
        title: "Why People Call Us First",
        items: [
          { title: "Show up on time, every time", blurb: "We text on the way. No waiting all day." },
          { title: "Licensed & insured",          blurb: "Your home is fully protected." },
          { title: "Flat, fair pricing",          blurb: "You see the price before we start." },
          { title: "Clean, careful work",         blurb: "Drop cloths, neat finish, no mess left behind." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Text or call",        blurb: "Send a photo of what needs fixing." },
          { title: "Quick flat quote",    blurb: "We give the full price up front." },
          { title: "We arrive on time",   blurb: "Same or next day. Tools and parts ready." },
          { title: "Fixed & guaranteed",  blurb: "Backed by a workmanship guarantee." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Jennifer T.", role: "Homeowner",      quote: "Came the same day, mounted three TVs, hung a heavy mirror. Perfect work, fair price." },
          { name: "Carlos M.",   role: "Small landlord", quote: "Reliable for every turnover. Drywall, paint touch-ups, plumbing — all in one visit." },
          { name: "Aisha K.",    role: "Office manager", quote: "Our go-to for the office. Texts when on the way, leaves the space cleaner than they found it." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "What does a typical job cost?", a: "Most small jobs are $89–$249 flat. We always give the full price before we start — no surprises." },
          { q: "How fast can you come out?",    a: "Most weeks we offer same-day or next-day service. Emergencies get priority." },
          { q: "Do you bring your own parts?",  a: "Yes for common parts. For specialty parts we pick them up at cost or you can supply them." },
          { q: "Is your work guaranteed?",      a: "Yes. Every job comes with a 30-day workmanship guarantee. If it's not right, we make it right." },
        ],
      },
      contact: {
        title: "Get a Fast Free Quote", blurb: "Send a photo and a quick description. We reply within an hour during business hours.",
        name: "Your name", phone: "Phone", service: "What needs fixing?", message: "Describe the job",
        submit: "Send Request", success: "Thanks — we'll text you back shortly with a quote.",
        pick: "— Pick a service —",
        services: ["Drywall & paint", "Electrical / plumbing", "Mounting & assembly", "Door / lock", "Other"],
      },
      footer: { tagline: "Honest handyman service for the whole neighborhood.", hours: "Mon–Sat · 7am–8pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Citas el mismo día o al día siguiente",
        title1: "Manitas de Confianza para",
        title2: "Cualquier Reparación de Su Casa",
        subtitle: "Drywall, plomería, eléctrica, muebles, TVs y más. Bilingüe. Precios honestos. Trabajo limpio.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Servicio el Mismo Día", "Bilingüe EN/ES", "Precio Fijo", "Garantía de Trabajo"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "500+ reseñas de 5 estrellas",
        trustTitle: "Técnicos Asegurados", trustSubtitle: "Verificados",
      },
      services: {
        title: "Lo Que Reparamos", blurb: "Desde una puerta atorada hasta una lista completa.",
        items: [
          { title: "Carpintería y Reparaciones", blurb: "Puertas, molduras, drywall, repisas. Bien hecho a la primera." },
          { title: "Instalación y Armado",       blurb: "TVs, repisas, muebles de IKEA, persianas. Anclajes que aguantan." },
          { title: "Eléctrica y Plomería",       blurb: "Llaves, ventiladores, focos, baños. Trabajos pequeños, rápidos." },
        ],
      },
      why: {
        title: "Por Qué Nos Llaman Primero",
        items: [
          { title: "Llegamos a tiempo, siempre",  blurb: "Le avisamos por texto. No espera todo el día." },
          { title: "Con licencia y seguro",       blurb: "Su casa está totalmente protegida." },
          { title: "Precios fijos y justos",      blurb: "Le damos el precio antes de empezar." },
          { title: "Trabajo limpio y cuidadoso",  blurb: "Cubiertas, acabado limpio, sin desorden." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Mande mensaje o llame",   blurb: "Mande una foto de lo que necesita." },
          { title: "Cotización fija rápida",  blurb: "Le damos el precio total antes de empezar." },
          { title: "Llegamos a tiempo",       blurb: "Mismo día o al siguiente. Herramientas listas." },
          { title: "Arreglado y garantizado", blurb: "Con garantía de trabajo." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Jennifer T.", role: "Dueña de casa",         quote: "Vinieron el mismo día, instalaron 3 TVs y colgaron un espejo pesado. Trabajo perfecto." },
          { name: "Carlos M.",   role: "Pequeño arrendador",    quote: "Confiable para cada cambio de inquilino. Drywall, retoques, plomería — todo en una visita." },
          { name: "Aisha K.",    role: "Gerente de oficina",    quote: "Nuestro favorito. Avisan por texto, dejan el lugar más limpio que lo encontraron." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un trabajo típico?", a: "La mayoría de trabajos pequeños son $89–$249 fijos. Siempre damos el precio total antes — sin sorpresas." },
          { q: "¿Qué tan rápido pueden venir?",     a: "La mayoría de semanas ofrecemos mismo día o siguiente. Emergencias con prioridad." },
          { q: "¿Traen sus propias piezas?",        a: "Sí para piezas comunes. Para especiales las compramos al costo o usted las puede aportar." },
          { q: "¿Tienen garantía?",                 a: "Sí. Garantía de trabajo de 30 días. Si no está bien, lo arreglamos." },
        ],
      },
      contact: {
        title: "Reciba una Cotización Gratis", blurb: "Mande una foto y descripción rápida. Respondemos en una hora en horario de oficina.",
        name: "Su nombre", phone: "Teléfono", service: "¿Qué necesita arreglar?", message: "Describa el trabajo",
        submit: "Enviar Solicitud", success: "Gracias — le mandamos una cotización pronto.",
        pick: "— Elija un servicio —",
        services: ["Drywall y pintura", "Eléctrica / plomería", "Instalación y armado", "Puerta / cerradura", "Otro"],
      },
      footer: { tagline: "Servicio honesto de manitas para todo el vecindario.", hours: "Lun–Sáb · 7am–8pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default handyman;
