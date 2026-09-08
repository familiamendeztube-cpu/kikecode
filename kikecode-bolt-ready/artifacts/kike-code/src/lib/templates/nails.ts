import { Sparkles, Brush, Heart, Clock, ShieldCheck, Star, Award, Languages } from "lucide-react";
import type { BusinessTemplate } from "./types";

const nails: BusinessTemplate = {
  slug: "nails",
  industry: "Nail Salon",
  industryEs: "Salón de Uñas",
  websiteType: "Beauty & Grooming Website",
  defaultServicesField: "Manicures, Pedicures, Acrylics, Gel & dip, Nail art, Spa treatments",
  brand: {
    name: "Bella Uñas Studio",
    city: "Miami",
    phone: "(555) 010-0012",
    phoneHref: "tel:+15550100012",
    email: "hola@bellaunasstudio.com",
    address: "318 Coral Way, Miami, FL 33145",
    heroIcon: Sparkles,
    palette: {
      primary: "#C026D3", primaryDark: "#86198f", accent: "#F472B6",
      heroFrom: "#1a0f1f", heroVia: "#26122a", heroTo: "#140a17",
      heroGlow1: "rgba(192,38,211,0.50)", heroGlow2: "rgba(244,114,182,0.32)",
      heroIconFrom: "#C026D3", heroIconTo: "#F472B6",
      contactFrom: "#C026D3", contactTo: "#F472B6",
    },
  },
  serviceIcons: [Brush, Sparkles, Heart],
  whyIcons: [Clock, ShieldCheck, Star, Award],
  content: {
    en: {
      nav: { services: "Services", why: "Why Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Pampering hands & feet since 2015",
        title1: "Beautiful Nails & Spa Care for",
        title2: "Every Occasion & Everyday",
        subtitle: "Manicures, pedicures, acrylics, gel, and custom nail art in a clean, relaxing studio. Bilingual techs. Walk-ins welcome.",
        cta1: "Book Now", cta2: "Call Now",
        badges: ["Walk-Ins Welcome", "Bilingual EN/ES", "Sanitized Tools", "Custom Nail Art"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "800+ happy clients",
        trustTitle: "Licensed Techs", trustSubtitle: "Hospital-grade sanitation",
      },
      services: {
        title: "What We Offer", blurb: "Relax, refresh, and leave glowing.",
        items: [
          { title: "Manicures & Pedicures", blurb: "Classic, spa, and deluxe treatments with massage and exfoliation." },
          { title: "Acrylics, Gel & Dip", blurb: "Long-lasting full sets, fills, and natural overlays in any length or shape." },
          { title: "Custom Nail Art", blurb: "Hand-painted designs, rhinestones, French, ombré — perfect for any occasion." },
        ],
      },
      why: {
        title: "Why Clients Love Us",
        items: [
          { title: "On time, never rushed", blurb: "We respect your appointment and take care with every detail." },
          { title: "Spotless & sanitized", blurb: "Fresh tools for every client and hospital-grade cleaning." },
          { title: "Talented, certified techs", blurb: "Skilled artists who make your vision come to life." },
          { title: "Premium, long-lasting products", blurb: "Quality polishes and gels that stay beautiful for weeks." },
        ],
      },
      process: {
        title: "How It Works",
        items: [
          { title: "Book or walk in", blurb: "Reserve your spot online or come on by." },
          { title: "Pick your look", blurb: "Browse our color wall and art ideas, or ask for a recommendation." },
          { title: "Relax & be pampered", blurb: "Enjoy a soothing treatment from start to finish." },
          { title: "Leave glowing", blurb: "Walk out with flawless nails ready to show off." },
        ],
      },
      testimonials: {
        title: "What Clients Say",
        items: [
          { name: "Daniela V.", role: "Regular client", quote: "My gel set lasts three weeks with zero chips. The art is always exactly what I picture. Obsessed!" },
          { name: "Karen B.", role: "Bride", quote: "They did my entire bridal party. Gorgeous, on time, and so relaxing. Everyone loved it." },
          { name: "Priya S.", role: "Busy mom", quote: "Spotless studio, friendly techs, and my pedicure felt like a mini vacation. My new go-to spot." },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Do you take walk-ins?", a: "Yes! Walk-ins are welcome, though booking ahead guarantees your preferred time and tech." },
          { q: "How much is a full set?", a: "Acrylic and gel full sets start at $45; pedicures from $35. Nail art is priced by design." },
          { q: "How long does gel last?", a: "Gel typically lasts 2–3 weeks without chipping. We also offer safe, gentle removal." },
          { q: "Are your tools sanitized?", a: "Always. We use fresh files per client and hospital-grade sterilization for all reusable tools." },
        ],
      },
      contact: {
        title: "Book Your Appointment", blurb: "Tell us the look you want and when. We'll confirm fast.",
        name: "Your name", phone: "Phone", service: "Service needed", message: "Preferred day & time",
        submit: "Request Appointment", success: "Thanks — we'll text you to confirm your appointment.",
        pick: "— Pick a service —",
        services: ["Manicure", "Pedicure", "Acrylic / gel full set", "Nail art", "Spa treatment"],
      },
      footer: { tagline: "Beautiful, long-lasting nails in a relaxing studio.", hours: "Tue–Sun · 9am–7pm", rights: "All rights reserved.", hoursLabel: "Hours" },
    },
    es: {
      nav: { services: "Servicios", why: "Por Qué", process: "Proceso", testimonials: "Reseñas", faq: "FAQ", contact: "Contacto", call: "Llame" },
      hero: {
        eyebrow: "Consintiendo manos y pies desde 2015",
        title1: "Uñas Hermosas y Cuidado Spa para",
        title2: "Cada Ocasión y el Día a Día",
        subtitle: "Manicuras, pedicuras, acrílicas, gel y arte de uñas personalizado en un estudio limpio y relajante. Técnicas bilingües. Sin cita bienvenidas.",
        cta1: "Reserve Ahora", cta2: "Llame Ahora",
        badges: ["Sin Cita Bienvenidas", "Bilingüe EN/ES", "Herramientas Esterilizadas", "Arte Personalizado"],
        ratingTitle: "4.9 / 5", ratingSubtitle: "800+ clientas felices",
        trustTitle: "Técnicas con Licencia", trustSubtitle: "Higiene de grado hospitalario",
      },
      services: {
        title: "Lo Que Ofrecemos", blurb: "Relájese, renuévese y salga radiante.",
        items: [
          { title: "Manicuras y Pedicuras", blurb: "Tratamientos clásicos, spa y de lujo con masaje y exfoliación." },
          { title: "Acrílicas, Gel y Dip", blurb: "Sets completos duraderos, rellenos y cubiertas naturales en cualquier largo o forma." },
          { title: "Arte de Uñas Personalizado", blurb: "Diseños pintados a mano, brillantes, francés, ombré — perfectos para cualquier ocasión." },
        ],
      },
      why: {
        title: "Por Qué Nos Aman",
        items: [
          { title: "Puntuales y sin prisas", blurb: "Respetamos su cita y cuidamos cada detalle." },
          { title: "Impecable y esterilizado", blurb: "Herramientas nuevas para cada clienta y limpieza de grado hospitalario." },
          { title: "Técnicas talentosas y certificadas", blurb: "Artistas hábiles que hacen realidad su visión." },
          { title: "Productos premium y duraderos", blurb: "Esmaltes y geles de calidad que se mantienen hermosos por semanas." },
        ],
      },
      process: {
        title: "Cómo Funciona",
        items: [
          { title: "Reserve o pásese", blurb: "Aparte su lugar en línea o simplemente venga." },
          { title: "Elija su estilo", blurb: "Explore nuestra pared de colores e ideas de arte, o pida una recomendación." },
          { title: "Relájese y déjese consentir", blurb: "Disfrute un tratamiento relajante de principio a fin." },
          { title: "Salga radiante", blurb: "Salga con uñas impecables listas para presumir." },
        ],
      },
      testimonials: {
        title: "Lo Que Dicen Las Clientas",
        items: [
          { name: "Daniela V.", role: "Clienta frecuente", quote: "Mi set de gel dura tres semanas sin saltarse. El arte siempre es justo lo que imagino. ¡Encantada!" },
          { name: "Karen B.", role: "Novia", quote: "Atendieron a todo mi cortejo de boda. Hermosas, puntuales y muy relajante. A todas les encantó." },
          { name: "Priya S.", role: "Mamá ocupada", quote: "Estudio impecable, técnicas amables y mi pedicura se sintió como mini vacaciones. Mi nuevo lugar favorito." },
        ],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Aceptan sin cita?", a: "¡Sí! Son bienvenidas sin cita, aunque reservar antes garantiza su hora y técnica preferidas." },
          { q: "¿Cuánto cuesta un set completo?", a: "Los sets de acrílico y gel desde $45; las pedicuras desde $35. El arte se cotiza según el diseño." },
          { q: "¿Cuánto dura el gel?", a: "El gel suele durar 2–3 semanas sin saltarse. También ofrecemos remoción segura y delicada." },
          { q: "¿Esterilizan sus herramientas?", a: "Siempre. Usamos limas nuevas por clienta y esterilización de grado hospitalario para todo lo reutilizable." },
        ],
      },
      contact: {
        title: "Reserve su Cita", blurb: "Díganos el estilo que desea y cuándo. Confirmamos rápido.",
        name: "Su nombre", phone: "Teléfono", service: "Servicio necesario", message: "Día y hora preferidos",
        submit: "Solicitar Cita", success: "Gracias — le mandamos un texto para confirmar su cita.",
        pick: "— Elija un servicio —",
        services: ["Manicura", "Pedicura", "Set completo de acrílico / gel", "Arte de uñas", "Tratamiento spa"],
      },
      footer: { tagline: "Uñas hermosas y duraderas en un estudio relajante.", hours: "Mar–Dom · 9am–7pm", rights: "Todos los derechos reservados.", hoursLabel: "Horario" },
    },
  },
};

export default nails;
