import { Wrench, ShieldCheck, Clock, Settings, Settings2, Wind, ThermometerSnowflake, Droplets } from "lucide-react";
import type { BusinessTemplate } from "./types";

const autoServicioRym: BusinessTemplate = {
  slug: "auto-servicio-rym",
  industry: "Mechanic Shop",
  industryEs: "Taller Mecánico",
  websiteType: "Mechanic Shop Showcase",
  defaultServicesField: "Reparación General",
  siteVariant: "rym",
  brand: {
    name: "Auto Servicio RyM",
    city: "San José",
    phone: "+506 6419 5247",
    phoneHref: "tel:+50664195247",
    email: "", // Removed unverified email
    address: "200 mts oeste de Casa Presidencial, contiguo a Edificio Mira, San José",
    heroIcon: Wrench,
    logo: "/template-assets/auto-servicio-rym/rym_logo.png",
    palette: {
      primary: "#c9a227", primaryDark: "#a88620", accent: "#f0b323",
      heroFrom: "#3d3d3d", heroVia: "#2a2a2a", heroTo: "#1a1a1a",
      heroGlow1: "rgba(201,162,39,0.30)", heroGlow2: "rgba(240,179,35,0.15)",
      heroIconFrom: "#c9a227", heroIconTo: "#f0b323",
      contactFrom: "#3d3d3d", contactTo: "#1a1a1a",
    },
  },
  lockedLang: "es",
  media: {
    hero: "/template-assets/auto-servicio-rym/rym_new_02.jpg",
    heroVideo: "/template-assets/auto-servicio-rym/rym_hero_loop.mp4",
    heroPoster: "/template-assets/auto-servicio-rym/rym_hero_poster.jpg",
    video: "/template-assets/auto-servicio-rym/rym_band_loop.mp4",
    teamPortrait: "/template-assets/auto-servicio-rym/rym_new_11.jpg",
    gallery: [
      "/template-assets/auto-servicio-rym/rym_new_04.jpg",
      "/template-assets/auto-servicio-rym/rym_new_06.jpg",
      "/template-assets/auto-servicio-rym/rym_new_08.jpg",
      "/template-assets/auto-servicio-rym/rym_new_01.jpg",
      "/template-assets/auto-servicio-rym/rym_new_03.jpg",
      "/template-assets/auto-servicio-rym/rym_new_05.jpg",
      "/template-assets/auto-servicio-rym/rym_new_07.jpg",
      "/template-assets/auto-servicio-rym/rym_new_09.jpg",
      "/template-assets/auto-servicio-rym/rym_new_10.jpg",
      "/template-assets/auto-servicio-rym/rym_new_12.jpg",
      "/template-assets/auto-servicio-rym/rym_new_13.jpg",
      "/template-assets/auto-servicio-rym/rym_new_14.jpg",
    ],
  },
  serviceIcons: [Settings2, ShieldCheck, Wind, ThermometerSnowflake, Droplets],
  whyIcons: [Wrench, ShieldCheck, Clock, Settings],
  content: {
    en: {
      nav: { services: "Services", why: "About Us", process: "Process", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "PROFESSIONAL AUTOMOTIVE SERVICE",
        title1: "We Care For",
        title2: "Your Vehicle",
        subtitle: "Professional maintenance and repair to keep your vehicle running smoothly.",
        cta1: "Schedule Appointment", cta2: "Message on WhatsApp",
        badges: ["Personalized Attention", "Automotive Diagnostics"],
        ratingTitle: "", ratingSubtitle: "",
        trustTitle: "", trustSubtitle: "",
      },
      services: {
        title: "Our Services", blurb: "We service all makes — from daily sedans to lifted trucks and SUVs.",
        items: [
          { title: "Automotive Diagnostics", blurb: "We put the vehicle on the lift to check the engine bay, suspension, brakes and fluid levels, and walk you through what we find." },
          { title: "Preventive Maintenance", blurb: "Oil and filter changes, fluid top-offs, and checkups timed to your vehicle's mileage to catch small issues early." },
          { title: "Brake Systems", blurb: "Pad, rotor and caliper inspection, with replacement based on the wear found on the lift." },
          { title: "General Mechanics", blurb: "Engine, suspension and steering work on trucks, SUVs and sedans — Ram, Nissan, Hyundai, Mercedes, BMW, Jaguar and other makes have passed through our bays." },
        ],
      },
      why: {
        title: "Why Choose Us",
        items: [
          { title: "Clear Communication", blurb: "We coordinate over WhatsApp — send photos, describe the issue, and we reply with next steps." },
          { title: "Careful Inspection", blurb: "We inspect on the lift and explain what we find before recommending a part be replaced." },
          { title: "All Makes Serviced", blurb: "Pickups, SUVs and sedans of different brands come through our shop for service." },
          { title: "Direct Contact", blurb: "You speak with the person working on your vehicle, not a call center." },
        ],
      },
      process: {
        title: "Our Process",
        items: [
          { title: "1. Request", blurb: "Contact us via WhatsApp to explain what your vehicle needs." },
          { title: "2. Inspection", blurb: "We evaluate your vehicle in our shop." },
          { title: "3. Quote", blurb: "We provide an estimate based on the inspection and required parts." },
          { title: "4. Service", blurb: "We perform the agreed-upon work." },
        ],
      },
      testimonials: {
        title: "",
        items: [],
      },
      faq: {
        title: "FAQ",
        items: [
          { q: "Do I need an appointment?", a: "We recommend scheduling via WhatsApp to ensure prompt attention." },
          { q: "What are your hours?", a: "Mon-Fri 7:00 AM - 6:00 PM, Sat 7:00 AM - 1:00 PM." },
          { q: "How much does a repair cost?", a: "Costs are determined after a physical inspection of the vehicle." },
        ],
      },
      contact: {
        title: "Schedule Your Service", blurb: "Contact us via WhatsApp to coordinate an appointment.",
        name: "Name", phone: "Phone", service: "Service Needed", message: "Additional Details",
        submit: "Send Message", success: "Message received!",
        pick: "View More Services",
        services: ["General Repair", "Brakes", "Maintenance", "Other"],
      },
      footer: { tagline: "Your mechanic shop.", hours: "Mon-Fri 7:00-18:00, Sat 7:00-13:00", rights: "All rights reserved.", hoursLabel: "Hours:" },
    },
    es: {
      nav: { services: "Servicios", why: "Nosotros", process: "Proceso", testimonials: "Testimonios", faq: "FAQ", contact: "Contacto", call: "Llamar" },
      hero: {
        eyebrow: "SERVICIO AUTOMOTRIZ PROFESIONAL",
        title1: "Cuidamos",
        title2: "Tu Vehículo",
        subtitle: "Diagnóstico, mantenimiento y atención profesional para ayudarte a mantener tu vehículo seguro y funcionando correctamente.",
        cta1: "Solicitar una cita", cta2: "Consultar por WhatsApp",
        badges: ["Atención Personalizada", "Diagnóstico Automotriz"],
        ratingTitle: "", ratingSubtitle: "",
        trustTitle: "", trustSubtitle: "",
      },
      services: {
        title: "Nuestros Servicios", blurb: "Atendemos vehículos de todas las marcas: desde sedanes de uso diario hasta pickups y SUVs preparadas.",
        items: [
          { title: "Diagnóstico Automotriz", blurb: "Subimos el vehículo al elevador para revisar motor, suspensión, frenos y niveles de fluidos, y te explicamos lo que encontramos." },
          { title: "Mantenimiento Preventivo", blurb: "Cambio de aceite y filtros, revisión de fluidos y chequeos según el kilometraje del vehículo para adelantarnos a problemas." },
          { title: "Sistema de Frenos", blurb: "Inspección de pastillas, discos y calipers, con reemplazo según el desgaste encontrado en el elevador." },
          { title: "Mecánica General", blurb: "Trabajo de motor, suspensión y dirección en pickups, SUVs y sedanes — por el taller han pasado Ram, Nissan, Hyundai, Mercedes, BMW, Jaguar y otras marcas." },
        ],
      },
      why: {
        title: "Por qué elegirnos",
        items: [
          { title: "Comunicación Directa", blurb: "Coordinamos por WhatsApp: enviás fotos, describís el problema y te respondemos con los siguientes pasos." },
          { title: "Inspección Cuidadosa", blurb: "Revisamos en el elevador y te explicamos lo que encontramos antes de recomendar el reemplazo de una pieza." },
          { title: "Todas las Marcas", blurb: "Por el taller pasan pickups, SUVs y sedanes de distintas marcas para su servicio." },
          { title: "Atención Personalizada", blurb: "Hablás con quien trabaja en tu vehículo, no con un centro de llamadas." },
        ],
      },
      process: {
        title: "Cómo funciona nuestro proceso",
        items: [
          { title: "Contanos qué presenta", blurb: "Escribinos y explicanos los síntomas o el mantenimiento que buscás." },
          { title: "Coordinamos una revisión", blurb: "Agendamos el espacio para recibir tu vehículo en el taller." },
          { title: "Diagnóstico y recomendación", blurb: "Evaluamos y te indicamos exactamente qué necesita." },
          { title: "Autorizás el trabajo", blurb: "Aprobás la reparación directamente con nuestro equipo." },
        ],
      },
      testimonials: {
        title: "Testimonios",
        items: [],
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Necesito sacar cita?", a: "Sí, trabajamos con cita previa para garantizar la mejor atención. Podés solicitarla fácilmente a través de WhatsApp." },
          { q: "¿Qué métodos de pago aceptan?", a: "Para confirmar los métodos de pago disponibles actualmente, consultá directamente con nosotros al momento de coordinar tu trabajo." },
          { q: "¿Dónde están ubicados?", a: "Estamos ubicados 200 mts oeste de Casa Presidencial, contiguo a Edificio Mira, San José." },
          { q: "¿Puedo consultar un presupuesto por WhatsApp?", a: "Podés describirnos el problema y enviarnos fotos. Te daremos una orientación, pero el costo final se confirma únicamente tras la inspección física del vehículo." },
        ],
      },
      contact: {
        title: "¡Agenda tu servicio hoy!", blurb: "Contáctenos para mantener su vehículo en perfectas condiciones.",
        name: "Nombre", phone: "Teléfono", service: "Servicio Necesario", message: "Detalles Adicionales",
        submit: "Enviar Mensaje", success: "¡Mensaje recibido! Nos pondremos en contacto pronto.",
        pick: "Ver más servicios",
        services: ["Reparación General", "Frenos", "Mantenimiento", "Otro"],
      },
      footer: { tagline: "Su taller mecánico de confianza.", hours: "L-V 7:00-18:00, Sáb 7:00-13:00", rights: "Todos los derechos reservados.", hoursLabel: "Horario:" },
    },
  }
};

export default autoServicioRym;