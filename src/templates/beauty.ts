import { Scissors, Palette, Sparkles, Brush, Clock, ShieldCheck, Languages, Star } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";

const assets = `${TEMPLATE_ASSETS}/beauty`;

const beauty: BusinessTemplate = {
  slug: "beauty",
  industry: "Beauty Salon / Barber",
  industryEs: "Salón de Belleza / Barbería",
  websiteType: "Barber Website",
  defaultServicesField: "Haircuts, Color, Highlights, Blowouts, Manicure / Pedicure, Waxing, Bridal services, Men's grooming",
  brand: {
    name: "Bella Beauty Studio",
    city: "Tibás",
    phone: "+506 0000-0000",
    phoneHref: "tel:+50600000000",
    email: "hola@bellabeautystudio.com",
    address: "De la iglesia católica de San Juan, 100 m norte y 25 m este, San Juan, Tibás, San José",
    heroIcon: Scissors,
    palette: {
      primary: "#2098D1", primaryDark: "#1772a0", accent: "#DFF300",
      heroFrom: "#0a1929", heroVia: "#1e3a5f", heroTo: "#0a1929",
      heroGlow1: "rgba(32,152,209,0.55)", heroGlow2: "rgba(223,243,0,0.3)",
      heroIconFrom: "#2098D1", heroIconTo: "#1772a0",
      contactFrom: "#2098D1", contactTo: "#1772a0",
    },
  },
  serviceIcons: [Palette, Sparkles, Brush],
  whyIcons: [Clock, Languages, ShieldCheck, Star],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Booking", testimonials: "Reviews", faq: "FAQ", contact: "Visit", call: "Call" },
      hero: {
        eyebrow: "Boutique salon experience in Tibás",
        title1: "Look Stunning,",
        title2: "Feel Even More Confident",
        subtitle: "Hair, color, nails, lashes, brows. Talented bilingual stylists. Easy online booking.",
        cta1: "Book Online", cta2: "Call Now",
        badges: ["Top Stylists", "Premium Products", "Bilingual EN/ES", "Online Booking"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "1,200+ five-star reviews",
        trustTitle: "Master Stylists", trustSubtitle: "10+ years experience",
      },
      services: {
        title: "Our Services", blurb: "Beauty done your way.",
        items: [
          { title: "Hair & Color",        blurb: "Cut, color, highlights, balayage, keratin. Stylists who actually listen." },
          { title: "Nails & Lashes",      blurb: "Manicure, pedicure, gel, acrylic, lash extensions, brow shaping." },
          { title: "Bridal & Special",    blurb: "Wedding hair & makeup, quinceañeras, special events. We can also come to you." },
        ],
      },
      why: {
        title: "Why Clients Love Us",
        items: [
          { title: "Open 6 days, evenings too", blurb: "Easy to fit in around work and studies." },
          { title: "Bilingual stylists",         blurb: "Comfortable for English & Spanish clients." },
          { title: "Trained cosmetologists",     blurb: "Every stylist professionally trained and always learning." },
          { title: "Loved on Instagram",         blurb: "10k+ followers love the looks we create." },
        ],
      },
      process: {
        title: "How Booking Works",
        items: [
          { title: "Browse stylists",        blurb: "Pick the stylist whose style speaks to you." },
          { title: "Book online instantly",  blurb: "Real-time availability, no phone tag." },
          { title: "Get a friendly reminder", blurb: "A WhatsApp message the day before so you don't forget." },
          { title: "Leave glowing",          blurb: "Tag us — we love seeing your new look." },
        ],
      },
      testimonials: {
        title: "What Clients Say",
        items: [
          { name: "María José R.", role: "Bride, Moravia",           quote: "They did my wedding hair and makeup — I cried happy tears. Stunning is an understatement." },
          { name: "Karla T.",      role: "Color client, Guadalupe",  quote: "Finally found my color person. Balayage looks more natural than I imagined." },
          { name: "Ana Lucía G.",  role: "Regular client, Tibás",    quote: "Three years coming here. Every cut is perfect. The whole vibe feels luxurious." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do I need an appointment?",       a: "Yes — book online or call. We do sometimes have same-day openings, so it never hurts to ask." },
          { q: "What's your cancellation policy?", a: "24-hour notice is appreciated. Cancellations with less than 24 hours' notice may carry a small fee." },
          { q: "Do you do men's cuts?",            a: "Yes — modern men's cuts, beard work, color and gray-blending. Skilled with all hair types." },
          { q: "Do you come to weddings?",         a: "Yes — our bridal team travels for weddings, quinceañeras and special events." },
        ],
      },
      contact: {
        title: "Book Your Visit", blurb: "Book your appointment or ask about a special look. We reply within hours.",
        name: "Your name", phone: "Phone", service: "Service you'd like", message: "Tell us what you have in mind",
        submit: "Send Request", success: "Thank you — we'll message you back soon.",
        pick: "— Pick a service —",
        services: ["Haircut", "Color / highlights", "Nails / lashes", "Bridal package", "Other"],
      },
      footer: { tagline: "Boutique beauty in Tibás for every confident client.", hours: "Tue–Sun · 9:00 a.m.–8:00 p.m.", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Reservar", testimonials: "Reseñas", faq: "Preguntas", contact: "Visítenos", call: "Llame" },
      hero: {
        eyebrow: "Experiencia de salón boutique en Tibás",
        title1: "Luzca Hermosa,",
        title2: "Siéntase Aún Más Segura",
        subtitle: "Cabello, color, uñas, pestañas, cejas. Estilistas bilingües con talento. Reserve su cita fácil en línea.",
        cta1: "Reserve en Línea", cta2: "Llame Ahora",
        badges: ["Mejores Estilistas", "Productos Premium", "Bilingüe EN/ES", "Reservas en Línea"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "Más de 1200 reseñas de 5 estrellas",
        trustTitle: "Estilistas Expertas", trustSubtitle: "Más de 10 años de experiencia",
      },
      services: {
        title: "Nuestros Servicios", blurb: "Belleza hecha a su manera.",
        items: [
          { title: "Cabello y Color",       blurb: "Corte, color, mechas, balayage, keratina. Estilistas que sí la escuchan." },
          { title: "Uñas y Pestañas",       blurb: "Manicure, pedicure, gel, acrílico, extensiones de pestañas, diseño de cejas." },
          { title: "Novias y Ocasiones",    blurb: "Peinado y maquillaje para bodas, quince años y eventos especiales. También vamos a domicilio." },
        ],
      },
      why: {
        title: "Por Qué Las Clientas Nos Prefieren",
        items: [
          { title: "Abierto 6 días, también de noche", blurb: "Fácil de acomodar con el trabajo y los estudios." },
          { title: "Estilistas bilingües",       blurb: "Cómodo para clientas en inglés y español." },
          { title: "Cosmetólogas capacitadas",   blurb: "Cada estilista con formación profesional y capacitación continua." },
          { title: "Nos siguen en Instagram",    blurb: "Más de 10 mil seguidoras aman los looks que creamos." },
        ],
      },
      process: {
        title: "Cómo Reservar",
        items: [
          { title: "Vea las estilistas",       blurb: "Elija a la estilista cuyo estilo más le guste." },
          { title: "Reserve al instante",      blurb: "Disponibilidad en tiempo real, sin llamadas." },
          { title: "Reciba un recordatorio",   blurb: "Le escribimos por WhatsApp el día antes para que no se le olvide." },
          { title: "Salga brillando",          blurb: "Etiquétenos — nos encanta ver su nuevo look." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Las Clientas",
        items: [
          { name: "María José R.", role: "Novia, Moravia",              quote: "Hicieron mi peinado y maquillaje de boda — lloré de felicidad. Decir que quedé hermosa es poco." },
          { name: "Karla T.",      role: "Clienta de color, Guadalupe", quote: "Por fin encontré a mi colorista. El balayage se ve más natural de lo que imaginé." },
          { name: "Ana Lucía G.",  role: "Clienta frecuente, Tibás",    quote: "Tres años de venir aquí. Cada corte es perfecto. Todo el ambiente se siente de lujo." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Necesito cita?",                  a: "Sí — reserve en línea o llame. A veces hay espacio el mismo día, así que no está de más preguntar." },
          { q: "¿Cuál es la política de cancelación?", a: "Le agradecemos avisar con 24 horas. Las cancelaciones con menos de 24 horas de aviso pueden tener un pequeño cargo." },
          { q: "¿Hacen cortes de hombre?",         a: "Sí — cortes modernos, barba, color y cobertura de canas. Expertos en todo tipo de cabello." },
          { q: "¿Van a domicilio para bodas?",     a: "Sí — nuestro equipo de novias se traslada para bodas, quince años y eventos especiales." },
        ],
      },
      contact: {
        title: "Reserve Su Visita", blurb: "Aparte su cita o pregunte por un look especial. Respondemos en pocas horas.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio que desea", message: "Cuéntenos qué tiene en mente",
        submit: "Enviar Solicitud", success: "Gracias — le responderemos pronto.",
        pick: "— Elija un servicio —",
        services: ["Corte", "Color / mechas", "Uñas / pestañas", "Paquete de novia", "Otro"],
      },
      footer: { tagline: "Belleza boutique en Tibás para cada clienta segura.", hours: "Mar a dom · 9:00 a. m. – 8:00 p. m.", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
  category: "beauty",
  facts: {
    stats: [
      { value: "9+", labelEn: "Years styling", labelEs: "Años de experiencia" },
      { value: "6800+", labelEn: "Clients served", labelEs: "Clientas atendidas" },
      { value: "4.9★", labelEn: "Google reviews", labelEs: "Reseñas en Google" },
      { value: "Evenings", valueEs: "De noche", labelEn: "By appointment", labelEs: "Con cita previa" },
    ],
    areasEn: ["Tibás", "San Juan", "Cinco Esquinas", "Anselmo Llorente", "León XIII", "Colima", "Moravia", "Guadalupe", "Calle Blancos", "Santo Domingo", "La Uruca", "Coronado"],
    areasEs: ["Tibás", "San Juan", "Cinco Esquinas", "Anselmo Llorente", "León XIII", "Colima", "Moravia", "Guadalupe", "Calle Blancos", "Santo Domingo", "La Uruca", "Coronado"],
    certsEn: ["Health operating permit up to date", "Redken Certified Colorists", "Olaplex Treatments", "Dermalogica Trained", "Google Reviews", "Cruelty-Free Products"],
    certsEs: ["Permiso sanitario de funcionamiento al día", "Coloristas certificadas Redken", "Tratamientos Olaplex", "Formación Dermalogica", "Reseñas en Google", "Productos libres de crueldad animal"],
    guaranteeEn: { title: "Love your look or it's on us", blurb: "If you walk out unhappy, come back within 7 days — we'll redo the service free. Our reputation depends on it." },
    guaranteeEs: { title: "Le encanta o va por nuestra cuenta", blurb: "Si sale insatisfecha, vuelva dentro de 7 días y repetimos el servicio gratis. Nuestra reputación depende de eso." },
  },
  availability: { en: "Open 6 days · Evening appointments", es: "Abierto 6 días · Citas hasta la noche" },
  assistant: {
    name: "Valentina",
    en: "Hi! I'm Valentina at {business}. Book online 24/7 — hair, color, nails, lashes.",
    es: "¡Hola! Soy Valentina de {business}. Reserve en línea 24/7 — cabello, color, uñas, pestañas.",
    roleEn: "Booking assistant", roleEs: "Asistente de reservas",
  },
  media: {
    hero: `${assets}/hero.jpg`,
    video: `${assets}/brand-film.mp4`,
    gallery: [`${assets}/gal1.jpg`, `${assets}/gal2.jpg`, `${assets}/gal3.jpg`, `${assets}/action1.jpg`, `${assets}/action2.jpg`, `${assets}/gal4.jpg`],
    teamPortrait: `${assets}/team.jpg`,
  },
  offers: {
    en: [
      { icon: "Clock",       title: "Book 24/7 online",       blurb: "Self-serve calendar with real-time availability." },
      { icon: "Sparkles",    title: "Master colorists",       blurb: "Balayage, highlights, color correction specialists." },
      { icon: "Heart",       title: "First visit -20%",       blurb: "New clients save on any service over ₡40 000." },
      { icon: "Banknote",    title: "Transparent menu",       blurb: "Every price listed online — zero surprises." },
      { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Estilistas bilingües en cada turno." },
      { icon: "BadgeCheck",  title: "1,200+ five-star",       blurb: "Five-star reviews from our clients on Google." },
    ],
    es: [
      { icon: "Clock",       title: "Reservas 24/7 en línea",  blurb: "Calendario en tiempo real, sin esperas." },
      { icon: "Sparkles",    title: "Coloristas expertas",     blurb: "Especialistas en balayage, mechas y correcciones de color." },
      { icon: "Heart",       title: "Primera visita -20%",     blurb: "Clientas nuevas ahorran en servicios de más de ₡40 000." },
      { icon: "Banknote",    title: "Precios a la vista",      blurb: "Cada precio publicado en línea — sin sorpresas." },
      { icon: "Languages",   title: "Bilingual EN/ES",         blurb: "Bilingual stylists on every shift." },
      { icon: "BadgeCheck",  title: "Más de 1200 de 5 estrellas", blurb: "Reseñas de cinco estrellas de nuestras clientas en Google." },
    ],
  },
  galleryCaptions: {
    en: ["Gel manicure detail", "Modern studio floor", "Color & highlight service"],
    es: ["Detalle de manicure en gel", "Nuestro salón moderno", "Servicio de color y mechas"],
  },
};

export default beauty;
