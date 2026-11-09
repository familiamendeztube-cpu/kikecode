import { Wrench, Hammer, Drill, Plug, Clock, ShieldCheck, ThumbsUp, Sparkles } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/handyman`;

const handyman: BusinessTemplate = {
  slug: "handyman",
  industry: "Handyman / Repairs",
  industryEs: "Reparaciones",
  websiteType: "Construction Website",
  defaultServicesField: "Drywall, Plumbing repairs, Electrical, Furniture assembly, Painting, Doors & locks, TV mounting",
  brand: {
    name: "Hernández Handyman",
    city: "Guadalupe",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hello@hernandezhandyman.com",
    address: "De la iglesia católica de Guadalupe, 300 m norte y 50 m este, Guadalupe, Goicoechea, San José",
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
        title: "What We Repair", blurb: "From a stuck door to a full to-do list.",
        items: [
          { title: "Carpentry & Repairs", blurb: "Doors, trim, drywall, shelving, deck boards. Done right the first time." },
          { title: "Mounting & Assembly", blurb: "TVs, shelves, flat-pack furniture, blinds, baby gear, anchors that hold." },
          { title: "Electrical & Plumbing", blurb: "Fixtures, faucets, ceiling fans, outlets, toilets. Small jobs, fast." },
        ],
      },
      why: {
        title: "Why People Call Us First",
        items: [
          { title: "Show up on time, every time", blurb: "We send a WhatsApp on the way. No waiting all day." },
          { title: "Insured with the INS",        blurb: "Your home is fully protected." },
          { title: "Flat, fair pricing",          blurb: "You see the price before we start." },
          { title: "Clean, careful work",         blurb: "Drop cloths, neat finish, no mess left behind." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Message or call",     blurb: "Send a photo of what needs fixing." },
          { title: "Quick flat quote",    blurb: "We give the full price up front." },
          { title: "We arrive on time",   blurb: "Same or next day. Tools and parts ready." },
          { title: "Fixed & guaranteed",  blurb: "Backed by a workmanship guarantee." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Daniela T.",    role: "Neighbor in Guadalupe",            quote: "Came the same day, mounted three TVs, hung a heavy mirror. Perfect work, fair price." },
          { name: "Mauricio M.",   role: "Rents out apartments in Moravia",  quote: "Reliable every time a tenant moves out. Drywall, paint touch-ups, plumbing — all in one visit." },
          { name: "Ana Lucía Q.",  role: "Office manager in San Pedro",      quote: "Our go-to for the office. They message when on the way and leave the space cleaner than they found it." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "What does a typical job cost?", a: "Most small jobs are a flat ₡45 000–₡125 000. We always give the full price before we start — no surprises." },
          { q: "How fast can you come out?",    a: "Most weeks we offer same-day or next-day service. Emergencies get priority." },
          { q: "Do you bring your own parts?",  a: "Yes for common parts. For specialty parts we pick them up at cost or you can supply them." },
          { q: "Is your work guaranteed?",      a: "Yes. Every job comes with a 30-day workmanship guarantee. If it's not right, we make it right." },
        ],
      },
      contact: {
        title: "Get a Fast Free Quote", blurb: "Send a photo and a quick description. We reply within an hour during business hours.",
        name: "Your name", phone: "Phone", service: "What needs fixing?", message: "Describe the job",
        submit: "Send Request", success: "Thanks — we'll message you back shortly with a quote.",
        pick: "— Pick a service —",
        services: ["Drywall & paint", "Electrical / plumbing", "Mounting & assembly", "Door / lock", "Other"],
      },
      footer: { tagline: "Honest handyman service for Guadalupe and nearby neighborhoods.", hours: "Mon–Sat · 7:00 a.m.–8:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Citas el mismo día o al día siguiente",
        title1: "Reparaciones de Confianza para",
        title2: "Todo lo Que Necesite Arreglar",
        subtitle: "Gypsum, fontanería, electricidad, muebles, instalación de TVs y más. Bilingüe. Precios honestos. Trabajo limpio.",
        cta1: "Cotización Gratis", cta2: "Llame Ahora",
        badges: ["Servicio el Mismo Día", "Bilingüe EN/ES", "Precio Fijo", "Garantía de Trabajo"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "500+ reseñas de 5 estrellas",
        trustTitle: "Técnicos Asegurados", trustSubtitle: "Antecedentes verificados",
      },
      services: {
        title: "Lo Que Reparamos", blurb: "Desde una puerta trabada hasta una lista completa de arreglos.",
        items: [
          { title: "Carpintería y Reparaciones", blurb: "Puertas, molduras, gypsum, repisas. Bien hecho a la primera." },
          { title: "Instalación y Armado",       blurb: "TVs, repisas, muebles para armar, persianas. Anclajes que aguantan." },
          { title: "Electricidad y Fontanería",  blurb: "Lámparas, llaves de agua, abanicos, tomacorrientes, inodoros. Trabajos pequeños, rápidos." },
        ],
      },
      why: {
        title: "Por Qué Nos Llaman Primero",
        items: [
          { title: "Llegamos a tiempo, siempre",  blurb: "Le avisamos por WhatsApp. No espera todo el día." },
          { title: "Asegurados ante el INS",      blurb: "Su casa está totalmente protegida." },
          { title: "Precios fijos y justos",      blurb: "Le damos el precio antes de empezar." },
          { title: "Trabajo limpio y cuidadoso",  blurb: "Cubrimos todo, acabado limpio, sin desorden." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Escriba o llame",         blurb: "Mándenos una foto de lo que necesita." },
          { title: "Cotización fija rápida",  blurb: "Le damos el precio total antes de empezar." },
          { title: "Llegamos a tiempo",       blurb: "El mismo día o al siguiente. Herramientas listas." },
          { title: "Arreglado y garantizado", blurb: "Con garantía de trabajo." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Daniela T.",   role: "Vecina de Guadalupe",                quote: "Vinieron el mismo día, instalaron 3 TVs y colgaron un espejo pesado. Trabajo perfecto, precio justo." },
          { name: "Mauricio M.",  role: "Alquila apartamentos en Moravia",    quote: "Confiables cada vez que se va un inquilino. Gypsum, retoques de pintura, fontanería — todo en una visita." },
          { name: "Ana Lucía Q.", role: "Gerente de oficina en San Pedro",    quote: "Nuestros favoritos para la oficina. Avisan por WhatsApp cuando vienen y dejan el lugar más limpio de como lo encontraron." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta un trabajo típico?", a: "La mayoría de trabajos pequeños cuestan entre ₡45 000 y ₡125 000, precio fijo. Siempre le damos el precio total antes de empezar — sin sorpresas." },
          { q: "¿Qué tan rápido pueden venir?",     a: "La mayoría de semanas ofrecemos servicio el mismo día o al siguiente. Las emergencias tienen prioridad." },
          { q: "¿Traen los repuestos?",             a: "Sí, los más comunes. Los especiales los compramos al costo o usted los puede aportar." },
          { q: "¿Tienen garantía?",                 a: "Sí. Cada trabajo tiene garantía de 30 días en mano de obra. Si no quedó bien, lo arreglamos." },
        ],
      },
      contact: {
        title: "Reciba una Cotización Gratis", blurb: "Mándenos una foto y una descripción rápida. Respondemos en una hora en horario de oficina.",
        name: "Su nombre", phone: "Teléfono", service: "¿Qué necesita arreglar?", message: "Describa el trabajo",
        submit: "Enviar Solicitud", success: "Gracias — pronto le enviamos una cotización.",
        pick: "— Elija un servicio —",
        services: ["Gypsum y pintura", "Electricidad / fontanería", "Instalación y armado", "Puerta / cerradura", "Otro"],
      },
      footer: { tagline: "Servicio honesto de reparaciones en Guadalupe y alrededores.", hours: "Lun a sáb · 7:00 a. m. – 8:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  facts: {
    stats: [
      { value: "12+", labelEn: "Years on call", labelEs: "Años de servicio" },
      { value: "8500+", labelEn: "Jobs completed", labelEs: "Trabajos completados" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación en Google" },
      { value: "<2h", labelEn: "Emergency arrival", labelEs: "Llegada de emergencia" },
    ],
    areasEn: ["Guadalupe", "Calle Blancos", "Mata de Plátano", "Ipís", "Purral", "San Francisco", "Moravia", "Coronado", "Tibás", "San Pedro", "Barrio Escalante", "Curridabat"],
    areasEs: ["Guadalupe", "Calle Blancos", "Mata de Plátano", "Ipís", "Purral", "San Francisco", "Moravia", "Coronado", "Tibás", "San Pedro", "Barrio Escalante", "Curridabat"],
    certsEn: ["INS-Insured Crew", "Liability Insurance", "INS Workers' Risk Policy", "Trained Technicians", "Safety-Trained Crews", "Background-checked Crews"],
    certsEs: ["Personal asegurado ante el INS", "Póliza de responsabilidad civil", "Póliza de riesgos del trabajo", "Técnicos capacitados", "Capacitación en seguridad laboral", "Antecedentes verificados"],
    guaranteeEn: { title: "Done-right or it's free", blurb: "If a repair fails within 90 days, we return and fix it at no charge. We send photos when finished." },
    guaranteeEs: { title: "Bien hecho o es gratis", blurb: "Si una reparación falla en 90 días, regresamos y la arreglamos sin costo. Le mandamos fotos al terminar." },
  },
  availability: { en: "Open 24/7 · Emergency dispatch", es: "Abierto 24/7 · Atención de emergencias" },
  assistant: {
    name: "Sofía",
    en: "Hi! I'm Sofía, your assistant at {business}. We're on call 24/7 — book a free home visit anytime.",
    es: "¡Hola! Soy Sofía, su asistente en {business}. Estamos disponibles 24/7 — agende una visita gratis cuando guste.",
    roleEn: "Dispatch coordinator", roleEs: "Coordinadora de visitas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",      title: "24/7 emergency",       blurb: "Burst pipe? Broken outlet? We're there same day." },
      { icon: "Wrench",     title: "100+ services",        blurb: "Drywall, plumbing, electrical, mounting, assembly." },
      { icon: "Banknote",   title: "Flat-rate pricing",    blurb: "No surprises. Quote before work starts." },
      { icon: "ShieldCheck",title: "Insured crew",         blurb: "Insured with the INS · liability coverage on every visit." },
      { icon: "Languages",  title: "Bilingual EN/ES",      blurb: "We explain every fix in English or Spanish." },
      { icon: "Star",       title: "4.9★ on Google",       blurb: "Over 1,200 five-star reviews." },
    ],
    es: [
      { icon: "Clock",      title: "Emergencia 24/7",       blurb: "¿Tubería rota? ¿Tomacorriente quemado? Llegamos el mismo día." },
      { icon: "Wrench",     title: "100+ servicios",        blurb: "Gypsum, fontanería, electricidad, instalación, armado." },
      { icon: "Banknote",   title: "Precio fijo",           blurb: "Sin sorpresas. Cotización antes de empezar." },
      { icon: "ShieldCheck",title: "Personal asegurado",    blurb: "Asegurados ante el INS · responsabilidad civil en cada visita." },
      { icon: "Languages",  title: "Bilingüe EN/ES",        blurb: "Le explicamos cada arreglo en inglés o español." },
      { icon: "Star",       title: "4.9★ en Google",        blurb: "Más de 1200 reseñas de cinco estrellas." },
    ],
  },
  galleryCaptions: {
    en: ["Kitchen sink — leak repair", "Drywall patch & paint match", "Light fixture install"],
    es: ["Fregadero — reparación de fuga", "Parche de gypsum y pintura igualada", "Instalación de lámpara"],
  },
};

export default handyman;
