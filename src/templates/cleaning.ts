import { Sparkles, Home, Building2, SprayCan, Clock, ShieldCheck, Languages, ThumbsUp } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/cleaning`;

const cleaning: BusinessTemplate = {
  slug: "cleaning",
  industry: "House Cleaning",
  industryEs: "Limpieza de Casas",
  websiteType: "Cleaning Company Website",
  defaultServicesField: "Recurring house cleaning, Deep cleaning, Move-in / move-out, Office cleaning, Post-construction, Airbnb turnovers",
  brand: {
    name: "Brilla Cleaning",
    city: "Santo Domingo",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@brillacleaning.com",
    address: "De la iglesia católica, 200 m norte y 75 m este, Santo Domingo, Heredia",
    heroIcon: Sparkles,
    palette: {
      primary: "#066794", primaryDark: "#044f70", accent: "#0096D6",
      heroFrom: "#042a3c", heroVia: "#066794", heroTo: "#042a3c",
      heroGlow1: "rgba(0,150,214,0.55)", heroGlow2: "rgba(38,151,128,0.35)",
      heroIconFrom: "#0096D6", heroIconTo: "#066794",
      contactFrom: "#066794", contactTo: "#0096D6",
    },
  },
  serviceIcons: [Home, Building2, SprayCan],
  whyIcons: [Clock, Languages, ShieldCheck, ThumbsUp],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Same cleaners every time",
        title1: "A Sparkling Clean Home",
        title2: "Without Lifting a Finger",
        subtitle: "Trusted house and office cleaning in Santo Domingo and nearby towns. Bilingual team. Eco-friendly products. Background-checked.",
        cta1: "Book a Cleaning", cta2: "Call Now",
        badges: ["Same Cleaner", "Eco-Friendly", "Insured Staff", "100% Guarantee"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1,000+ five-star cleans",
        trustTitle: "Insured Staff", trustSubtitle: "Background-checked",
      },
      services: {
        title: "What We Clean", blurb: "Homes, offices, turnovers. Same trusted crew.",
        items: [
          { title: "Recurring Home Cleaning", blurb: "Weekly, every two weeks or monthly. Same cleaners, every visit, every detail." },
          { title: "Offices & Commercial",    blurb: "After-hours cleaning for offices, clinics, shops. Daily or weekly schedules." },
          { title: "Deep & Move-Out Cleans",  blurb: "Top-to-bottom deep clean. Move-in, move-out, post-construction, Airbnb turnovers." },
        ],
      },
      why: {
        title: "Why Families Trust Us",
        items: [
          { title: "Same cleaner, every time",       blurb: "Build trust. Know your space. Better clean." },
          { title: "Bilingual: English & Spanish",   blurb: "Easy communication that respects you." },
          { title: "Insured & background-checked",   blurb: "Your home is fully protected." },
          { title: "100% satisfaction guarantee",    blurb: "If it's not right, we re-clean for free." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Book online or call",       blurb: "Tell us your space and schedule." },
          { title: "Free in-home walk-through", blurb: "Flat written quote — you know the price." },
          { title: "We clean to a checklist",   blurb: "200-point checklist. Same crew every time." },
          { title: "Love it, guaranteed",       blurb: "Not happy? We come back free." },
        ],
      },
      testimonials: {
        title: "What Customers Say",
        items: [
          { name: "Marianela B.", role: "Mom of three, Santo Domingo", quote: "The same crew every week. Our house has never been this consistently clean. Worth every colón." },
          { name: "Mauricio D.",  role: "Office manager, Heredia",     quote: "Bathrooms, kitchen, meeting rooms — spotless every morning. Our team noticed immediately." },
          { name: "Yolanda P.",   role: "Airbnb host, San Pablo",      quote: "Turnover cleanings done perfectly between guests. They send photos on WhatsApp when finished." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "What does a typical cleaning cost?", a: "Most homes ₡60 000–₡120 000 per visit depending on size. Recurring cleanings save 10–20%." },
          { q: "Do you bring your own supplies?",    a: "Yes — all supplies and eco-friendly products included. We can use your products if preferred." },
          { q: "Are you insured?",                   a: "Yes — our staff is insured with the INS, and every cleaner is background-checked." },
          { q: "What if I'm not happy?",             a: "We come back and re-clean for free within 24 hours. That's our 100% guarantee." },
        ],
      },
      contact: {
        title: "Book Your First Cleaning", blurb: "Tell us about your space. We respond within 1 business day.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Tell us about your space",
        submit: "Send Request", success: "Thank you — we'll call you within 1 business day.",
        pick: "— Pick a service —",
        services: ["Recurring home", "Deep clean", "Move-in / move-out", "Office", "Airbnb turnover"],
      },
      footer: { tagline: "Trusted cleaning for homes and offices in Heredia.", hours: "Mon–Sat · 8:00 a.m.–7:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Las mismas limpiadoras cada vez",
        title1: "Una Casa Brillante",
        title2: "Sin Mover un Dedo",
        subtitle: "Limpieza confiable de casas y oficinas en Santo Domingo y alrededores. Equipo bilingüe. Productos ecológicos. Antecedentes verificados.",
        cta1: "Reserve una Limpieza", cta2: "Llame Ahora",
        badges: ["Misma Limpiadora", "Ecológico", "Personal Asegurado", "Garantía 100%"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "Más de 1000 limpiezas de 5 estrellas",
        trustTitle: "Personal Asegurado", trustSubtitle: "Antecedentes verificados",
      },
      services: {
        title: "Lo Que Limpiamos", blurb: "Casas, oficinas, alquileres por noche. El mismo equipo de confianza.",
        items: [
          { title: "Limpieza Recurrente",       blurb: "Semanal, quincenal o mensual. Las mismas limpiadoras en cada visita, en cada detalle." },
          { title: "Oficinas y Comercios",      blurb: "Limpieza fuera de horario para oficinas, clínicas y tiendas. Diaria o semanal." },
          { title: "Limpieza Profunda y Mudanza", blurb: "Limpieza profunda de arriba abajo. Entrada, salida, post-construcción, Airbnb." },
        ],
      },
      why: {
        title: "Por Qué Las Familias Confían en Nosotros",
        items: [
          { title: "Misma limpiadora, cada vez",  blurb: "Genera confianza. Conoce su espacio. Mejor limpieza." },
          { title: "Bilingüe: Inglés y Español",  blurb: "Comunicación clara que lo respeta." },
          { title: "Asegurado y con antecedentes verificados", blurb: "Su casa está totalmente protegida." },
          { title: "Garantía 100% de satisfacción", blurb: "Si no está bien, regresamos gratis." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Reserve en línea o llame",    blurb: "Cuéntenos sobre su espacio y horario." },
          { title: "Visita gratis en casa",       blurb: "Cotización fija por escrito — usted sabe el precio." },
          { title: "Limpiamos con una lista",     blurb: "Lista de 200 puntos. El mismo equipo cada vez." },
          { title: "Le encantará, garantizado",   blurb: "¿No le gusta? Regresamos gratis." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Los Clientes",
        items: [
          { name: "Marianela B.", role: "Mamá de tres, Santo Domingo", quote: "El mismo equipo cada semana. Nuestra casa nunca había estado tan limpia. Vale cada colón." },
          { name: "Mauricio D.",  role: "Gerente de oficina, Heredia", quote: "Baños, cocina, salas de reuniones — impecables cada mañana. El equipo lo notó de inmediato." },
          { name: "Yolanda P.",   role: "Anfitriona de Airbnb, San Pablo", quote: "Limpiezas perfectas entre huéspedes. Mandan fotos por WhatsApp al terminar." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Cuánto cuesta una limpieza típica?", a: "La mayoría de casas ₡60 000–₡120 000 por visita según el tamaño. Las limpiezas recurrentes ahorran 10–20%." },
          { q: "¿Traen sus propios productos?",       a: "Sí — todos los productos ecológicos incluidos. Podemos usar los suyos si prefiere." },
          { q: "¿Están aseguradas?",                  a: "Sí — nuestro personal está asegurado ante el INS y cada limpiadora tiene antecedentes verificados." },
          { q: "¿Y si no quedo contenta?",            a: "Regresamos y volvemos a limpiar gratis en 24 horas. Esa es nuestra garantía." },
        ],
      },
      contact: {
        title: "Reserve Su Primera Limpieza", blurb: "Cuéntenos sobre su espacio. Respondemos en 1 día hábil.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio que necesita", message: "Cuéntenos sobre su espacio",
        submit: "Enviar Solicitud", success: "Gracias — le llamaremos en 1 día hábil.",
        pick: "— Elija un servicio —",
        services: ["Casa recurrente", "Limpieza profunda", "Mudanza entrada / salida", "Oficina", "Limpieza de Airbnb"],
      },
      footer: { tagline: "Limpieza confiable para casas y oficinas en Heredia.", hours: "Lun a sáb · 8:00 a. m. – 7:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  facts: {
    stats: [
      { value: "10+", labelEn: "Years cleaning", labelEs: "Años limpiando" },
      { value: "5200+", labelEn: "Homes served", labelEs: "Hogares atendidos" },
      { value: "4.9★", labelEn: "Google rating", labelEs: "Calificación en Google" },
      { value: "100%", labelEn: "Satisfaction guarantee", labelEs: "Satisfacción garantizada" },
    ],
    areasEn: ["Santo Domingo", "Santo Tomás", "Santa Rosa", "Tures", "San Miguel", "Paracito", "Heredia", "San Pablo", "Barva", "San Isidro de Heredia", "Tibás", "Moravia"],
    areasEs: ["Santo Domingo", "Santo Tomás", "Santa Rosa", "Tures", "San Miguel", "Paracito", "Heredia", "San Pablo", "Barva", "San Isidro de Heredia", "Tibás", "Moravia"],
    certsEn: ["Recommended by Neighbors", "Eco-Friendly Cleaning Products", "Liability Insurance", "Staff Insured with the INS", "Background-Checked Staff", "Pet & Child Safe Solutions"],
    certsEs: ["Recomendados por vecinos", "Productos de limpieza ecológicos", "Póliza de responsabilidad civil", "Personal asegurado ante el INS", "Antecedentes verificados", "Seguro para mascotas y niños"],
    guaranteeEn: { title: "24-hour re-clean guarantee", blurb: "Not happy with any room? Tell us within 24 hours and we re-clean it — no charge, no questions." },
    guaranteeEs: { title: "Garantía de re-limpieza en 24 horas", blurb: "¿No le gustó algún cuarto? Avísenos en 24 horas y lo limpiamos otra vez — sin costo, sin preguntas." },
  },
  availability: { en: "Book 24/7 · Same-day cleans available", es: "Reservas 24/7 · Limpiezas el mismo día" },
  assistant: {
    name: "Lucía",
    en: "Hi! I'm Lucía at {business}. Book 24/7 — a one-time or recurring clean in 60 seconds.",
    es: "¡Hola! Soy Lucía de {business}. Reserve 24/7 — agende una limpieza única o recurrente en 60 segundos.",
    roleEn: "Booking assistant", roleEs: "Asistente de reservas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/action1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "24/7 booking",          blurb: "Schedule recurring or last-minute cleans any time." },
      { icon: "Sparkles",    title: "Eco supplies included", blurb: "Non-toxic products safe for kids & pets." },
      { icon: "Banknote",    title: "Flat-rate by home size",blurb: "Studio apartments from ₡45 000 · 3-bedroom homes from ₡90 000." },
      { icon: "ShieldCheck", title: "Insured staff",         blurb: "Background-checked cleaners on every visit." },
      { icon: "Languages",   title: "Bilingual EN/ES",        blurb: "Bilingual teams on every shift." },
      { icon: "BadgeCheck",  title: "Re-clean guarantee",    blurb: "Not happy? We come back free within 24 hours." },
    ],
    es: [
      { icon: "Clock",       title: "Reservas 24/7",          blurb: "Programe limpiezas recurrentes o de último momento." },
      { icon: "Sparkles",    title: "Productos ecológicos",   blurb: "Productos no tóxicos seguros para niños y mascotas." },
      { icon: "Banknote",    title: "Precio fijo por tamaño", blurb: "Apartamentos tipo estudio desde ₡45 000 · casas de 3 cuartos desde ₡90 000." },
      { icon: "ShieldCheck", title: "Personal asegurado",     blurb: "Personal con verificación de antecedentes." },
      { icon: "Languages",   title: "Bilingüe EN/ES",        blurb: "Equipos bilingües en cada turno." },
      { icon: "BadgeCheck",  title: "Garantía de re-limpieza",blurb: "¿No le gustó? Regresamos gratis en 24 horas." },
    ],
  },
  galleryCaptions: {
    en: ["Weekly vacuum & dust", "Counters wiped down", "Move-out bathroom shine", "Bedrooms dusted & tidied"],
    es: ["Aspirado y sacudido semanal", "Superficies desinfectadas", "Baño reluciente para mudanza", "Habitaciones sacudidas y ordenadas"],
  },
};

export default cleaning;
