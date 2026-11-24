import { Anchor, Fish, Sunset, Waves, Compass, ShieldCheck } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { TEMPLATE_ASSETS } from "@/lib/plw";
import { tourServices } from "./tour-services";

/*
  Tamarindo Tours Discovery — Captain Willy Vega's private boat tours from
  Playa Tamarindo. Everything here comes from the business: its own site
  (tamarindotoursdiscovery.com, read 2026-11-24) and PLW's visit (WhatsApp
  number). The photos are the business's own, copied to template-assets.

  It sells to foreign tourists, so it opens in English and prices in US
  dollars, as Willy charges (owner decision 2026-11-24; registry.test.ts).
*/

const a = `${TEMPLATE_ASSETS}/tamarindo-tours-discovery`;

const tamarindoToursDiscovery: BusinessTemplate = {
  slug: "tamarindo-tours-discovery",
  siteVariant: "tamarindo",
  industry: "Private Boat Tours",
  industryEs: "Tours privados en bote",
  websiteType: "Boat Tour Operator",
  defaultServicesField: "Sport fishing, snorkeling, sunset tours",
  defaultLang: "en",
  realBusiness: true,
  secretaria: true,
  brand: {
    name: "Tamarindo Tours Discovery",
    city: "Tamarindo",
    phone: "+506 8763-8671",
    phoneHref: "tel:+50687638671",
    email: "discoverytamarindocr@gmail.com",
    address: "Playa Tamarindo, Guanacaste",
    heroIcon: Anchor,
    logo: `${a}/logo.webp`,
    socials: {
      instagram: "https://www.instagram.com/tamarindo_tours_discovery",
      facebook: "https://www.facebook.com/TamarindoToursDiscovery",
    },
    palette: {
      primary: "#13A5B5", primaryDark: "#0C3550", accent: "#F29F45",
      heroFrom: "#06182A", heroVia: "#0C3550", heroTo: "#04101C",
      heroGlow1: "rgba(242,159,69,0.25)", heroGlow2: "rgba(19,165,181,0.30)",
      heroIconFrom: "#F29F45", heroIconTo: "#13A5B5",
      contactFrom: "#0C3550", contactTo: "#06182A",
    },
  },
  serviceIcons: [Fish, Fish, Waves, Sunset, Compass, Anchor],
  whyIcons: [Anchor, Compass, Waves, ShieldCheck],
  tours: [
    {
      title: { en: "Inshore Sport Fishing", es: "Pesca costera" },
      blurb: {
        en: "Roosterfish, snapper and jack in the coastal waters off Tamarindo.",
        es: "Pez gallo, pargo y jurel en las aguas costeras frente a Tamarindo.",
      },
      priceUsd: 600,
      guests: 5,
      image: `${a}/tour-inshore-roosterfish.webp`,
      includes: {
        en: ["Fishing gear, bait and tackle", "Crew on board", "Snacks and drinks"],
        es: ["Equipo de pesca, carnada y aparejos", "Tripulación a bordo", "Snacks y bebidas"],
      },
    },
    {
      title: { en: "Offshore Sport Fishing", es: "Pesca en altamar" },
      blurb: {
        en: "Out to the deep Pacific for marlin, sailfish, tuna and mahi-mahi.",
        es: "Mar adentro en el Pacífico, tras marlín, pez vela, atún y dorado.",
      },
      priceUsd: 1000,
      guests: 5,
      image: `${a}/tour-offshore-sailfish.webp`,
      includes: {
        en: ["Heavy-duty gear, bait and tackle", "Crew on board", "Snacks and drinks"],
        es: ["Equipo pesado, carnada y aparejos", "Tripulación a bordo", "Snacks y bebidas"],
      },
    },
    {
      title: { en: "Snorkeling & Tubing", es: "Snorkel y tubing" },
      blurb: {
        en: "Reefs and coves with sea turtles, rays and tropical fish. Willy picks the spots by the day's tide and weather.",
        es: "Arrecifes y caletas con tortugas, rayas y peces tropicales. Willy escoge los puntos según la marea y el clima del día.",
      },
      priceUsd: 600,
      guests: 6,
      image: `${a}/tour-snorkel-cove.webp`,
      includes: {
        en: ["Snorkel and safety gear", "Tubing", "Coastal stops", "Snacks and drinks"],
        es: ["Equipo de snorkel y seguridad", "Tubing", "Paradas en la costa", "Snacks y bebidas"],
      },
    },
    {
      title: { en: "Sunset on the Water", es: "Atardecer en el mar" },
      blurb: {
        en: "An afternoon along the coast, from 1 to 6 p.m., that ends with the Pacific sunset seen from the boat.",
        es: "Una tarde por la costa, de 1 a 6 p. m., que termina con el atardecer del Pacífico desde el bote.",
      },
      priceUsd: 600,
      guests: 6,
      image: `${a}/tour-sunset-bay.webp`,
      includes: {
        en: ["Sunset from the water", "Drinks on board", "Scenic stops", "Crew on board"],
        es: ["El atardecer desde el mar", "Bebidas a bordo", "Paradas panorámicas", "Tripulación a bordo"],
      },
    },
    {
      title: { en: "Private Coastal Tour", es: "Tour privado por la costa" },
      blurb: {
        en: "Cruise the Guanacaste coastline to secluded beaches, cliffs and landmarks.",
        es: "Recorra la costa de Guanacaste hasta playas escondidas, acantilados y lugares emblemáticos.",
      },
      priceUsd: 600,
      guests: 6,
      image: `${a}/tour-coast-cliffs.webp`,
      includes: {
        en: ["Coastal navigation", "Scenic and photo stops", "Snacks and drinks", "Crew on board"],
        es: ["Navegación por la costa", "Paradas para fotos", "Snacks y bebidas", "Tripulación a bordo"],
      },
    },
    {
      title: { en: "Custom Private Tour", es: "Tour privado a la medida" },
      blurb: {
        en: "Mix fishing, snorkeling, beach stops and coastal cruising into one day you plan with Willy.",
        es: "Combine pesca, snorkel, playas y paseo por la costa en un día que planea con Willy.",
      },
      priceUsd: 600,
      image: `${a}/tour-custom-beach.webp`,
      includes: {
        en: ["An itinerary planned with Willy", "Dedicated crew", "Gear for each activity", "Snacks and drinks"],
        es: ["Itinerario planeado con Willy", "Tripulación dedicada", "Equipo para cada actividad", "Snacks y bebidas"],
      },
    },
  ],
  // His own quote tool (2026-11-24): by length, whole boat, any tour; US$220 PayPal deposit; card +13%.
  tourPricing: {
    durations: [
      { name: { en: "Half day", es: "Medio día" }, hours: 5, priceUsd: 600 },
      { name: { en: "¾ day", es: "¾ de día" }, hours: 7.5, priceUsd: 850 },
      { name: { en: "Full day", es: "Día completo" }, hours: 9, priceUsd: 1000, lunch: true },
    ],
    depositUsd: 220,
    cardSurchargePct: 13,
  },
  facts: {
    stats: [
      { value: "26", labelEn: "years on Guanacaste's waters", labelEs: "años en las aguas de Guanacaste" },
      { value: "4.9", valueEs: "4,9", labelEn: "on Google · 137 reviews", labelEs: "en Google · 137 reseñas" },
      { value: "5.0", valueEs: "5,0", labelEn: "on Tripadvisor · 166 reviews", labelEs: "en Tripadvisor · 166 reseñas" },
    ],
    certsEn: [], certsEs: [],
    guaranteeEn: { title: "If we cancel, you choose", blurb: "If the captain has to cancel, you pick a refund or a new date." },
    guaranteeEs: { title: "Si cancelamos, usted elige", blurb: "Si el capitán tiene que cancelar, usted escoge un reembolso o una nueva fecha." },
  },
  content: {
    en: {
      nav: { services: "Tours", why: "The captain", process: "Booking", testimonials: "Reviews", faq: "FAQ", contact: "Contact", call: "Call" },
      hero: {
        eyebrow: "Tamarindo · Guanacaste · Costa Rica",
        title1: "Private boat tours",
        title2: "in Tamarindo",
        subtitle: "Sport fishing, snorkeling and sunset cruises with Captain Willy, 26 years on these waters. Only your group on board.",
        cta1: "Book on WhatsApp",
        cta2: "See the tours",
        badges: ["Private boat from US$600", "Gear, drinks and snacks included"],
        ratingTitle: "", ratingSubtitle: "",
        trustTitle: "", trustSubtitle: "",
      },
      services: {
        title: "Six ways to spend a day at sea",
        blurb: "Every tour is private: the boat, the crew and the day are only for your group. Prices are for the whole boat, not per person.",
        items: [],
      },
      why: {
        title: "One boat, one captain, your group",
        items: [
          { title: "Only your group on board", blurb: "A private boat with no strangers and no fixed schedule: the day moves at your pace." },
          { title: "26 years on these waters", blurb: "Captain Willy has fished and navigated the Guanacaste coast for 26 years." },
          { title: "Planned around the sea", blurb: "Routes and snorkel spots are chosen by each day's tide and weather." },
          { title: "Everything on board", blurb: "Fishing and snorkel gear, water, sodas, beer and snacks. Lunch on full-day trips." },
        ],
      },
      process: {
        title: "Booking takes one message",
        items: [
          { title: "Message Willy", blurb: "Send your date, how many you are and what you'd like to do." },
          { title: "Hold your date", blurb: "A US$220 PayPal deposit confirms it and counts toward the total." },
          { title: "Meet at the beach", blurb: "We leave from Playa Tamarindo, in front of Restaurante El Chiringuito." },
          { title: "Pay the rest on the day", blurb: "In cash, or by card with 13% added to the balance." },
        ],
      },
      testimonials: { title: "Reviews", items: [] },
      faq: {
        title: "Before you come aboard",
        items: [
          { q: "How much does a private tour cost?", a: "Prices are for the whole boat, not per person: from US$600 for a half day (5 hours). Fishing is US$850 for 7.5 hours and US$1,000 for a 9-hour full day with lunch." },
          { q: "What's included?", a: "The private boat and its crew, water, sodas, beer and snacks. Fishing tours add the gear, bait and tackle; snorkeling adds snorkel and safety gear and the tube. Full days include lunch." },
          { q: "How many people fit on the boat?", a: "Up to 5 guests for fishing and up to 6 for the other tours. Traveling with children? Message us first so we can plan the day." },
          { q: "How do I book?", a: "Message us on WhatsApp with your date. Willy confirms it once the US$220 PayPal deposit is in; the deposit counts toward the total." },
          { q: "How do I pay the rest?", a: "On the day of the tour, in cash or by card (Visa, Mastercard, American Express). Card payments add 13% to the balance." },
          { q: "What if I need to cancel?", a: "Cancellations by the guest are not refunded. You can move your date once with at least 48 hours' notice, subject to availability. If the captain cancels, you choose a refund or a new date." },
          { q: "What should I bring?", a: "Sun protection. Gear, water, sodas, beer and snacks are on board. Note that there is no bathroom on the boat." },
          { q: "Where do we meet?", a: "On the beach at Playa Tamarindo, in front of Restaurante El Chiringuito." },
        ],
      },
      contact: {
        title: "Plan your day on the water",
        blurb: "Send your date and group size. Willy replies with availability and the price for your trip.",
        name: "Your name", phone: "WhatsApp or phone", service: "Tour",
        message: "Anything else we should know",
        submit: "Send request",
        success: "Request sent. Willy will write to you to confirm availability; your date is held once the deposit is in.",
        pick: "Choose a tour",
        services: ["Inshore Sport Fishing", "Offshore Sport Fishing", "Snorkeling & Tubing", "Sunset on the Water", "Private Coastal Tour", "Custom Private Tour"],
      },
      footer: {
        tagline: "Private boat tours from Playa Tamarindo: sport fishing, snorkeling, sunsets and days you plan with the captain.",
        hours: "Every day, 6:00 a.m. – 6:30 p.m.",
        rights: "All rights reserved.",
        hoursLabel: "Hours",
      },
    },
    es: {
      nav: { services: "Tours", why: "El capitán", process: "Reservas", testimonials: "Reseñas", faq: "Preguntas", contact: "Contacto", call: "Llamar" },
      hero: {
        eyebrow: "Tamarindo · Guanacaste · Costa Rica",
        title1: "Tours privados en bote",
        title2: "en Tamarindo",
        subtitle: "Pesca deportiva, snorkel y atardeceres con el Capitán Willy, 26 años en estas aguas. Solo su grupo a bordo.",
        cta1: "Reservar por WhatsApp",
        cta2: "Ver los tours",
        badges: ["Bote privado desde US$600", "Equipo, bebidas y snacks incluidos"],
        ratingTitle: "", ratingSubtitle: "",
        trustTitle: "", trustSubtitle: "",
      },
      services: {
        title: "Seis formas de pasar un día en el mar",
        blurb: "Todos los tours son privados: el bote, la tripulación y el día son solo para su grupo. Los precios son por el bote completo, no por persona.",
        items: [],
      },
      why: {
        title: "Un bote, un capitán, su grupo",
        items: [
          { title: "Solo su grupo a bordo", blurb: "Un bote privado, sin desconocidos ni horario fijo: el día va a su ritmo." },
          { title: "26 años en estas aguas", blurb: "El Capitán Willy ha pescado y navegado la costa de Guanacaste durante 26 años." },
          { title: "Planeado según el mar", blurb: "Las rutas y los puntos de snorkel se escogen según la marea y el clima de cada día." },
          { title: "Todo a bordo", blurb: "Equipo de pesca y snorkel, agua, refrescos, cerveza y snacks. Almuerzo en los días completos." },
        ],
      },
      process: {
        title: "Reservar toma un mensaje",
        items: [
          { title: "Escríbale a Willy", blurb: "Envíe su fecha, cuántos son y qué les gustaría hacer." },
          { title: "Aparte su fecha", blurb: "Un depósito de US$220 por PayPal la confirma y se rebaja del total." },
          { title: "Nos vemos en la playa", blurb: "Salimos de Playa Tamarindo, frente al Restaurante El Chiringuito." },
          { title: "El resto, el día del tour", blurb: "En efectivo, o con tarjeta sumando un 13 % al saldo." },
        ],
      },
      testimonials: { title: "Reseñas", items: [] },
      faq: {
        title: "Antes de subir a bordo",
        items: [
          { q: "¿Cuánto cuesta un tour privado?", a: "Los precios son por el bote completo, no por persona: desde US$600 por medio día (5 horas). La pesca cuesta US$850 por 7,5 horas y US$1 000 por un día completo de 9 horas con almuerzo." },
          { q: "¿Qué incluye?", a: "El bote privado con su tripulación, agua, refrescos, cerveza y snacks. Los tours de pesca suman el equipo, la carnada y los aparejos; el de snorkel, el equipo de snorkel y seguridad y el tubing. Los días completos incluyen almuerzo." },
          { q: "¿Cuántas personas caben en el bote?", a: "Hasta 5 personas para pesca y hasta 6 para los demás tours. ¿Viaja con niños? Escríbanos antes para planear el día." },
          { q: "¿Cómo reservo?", a: "Escríbanos por WhatsApp con su fecha. Willy la confirma cuando recibe el depósito de US$220 por PayPal, que se rebaja del total." },
          { q: "¿Cómo pago el resto?", a: "El día del tour, en efectivo o con tarjeta (Visa, Mastercard, American Express). Con tarjeta se suma un 13 % al saldo." },
          { q: "¿Y si necesito cancelar?", a: "Las cancelaciones del cliente no tienen reembolso. Puede cambiar su fecha una vez avisando con al menos 48 horas, según disponibilidad. Si el capitán cancela, usted escoge un reembolso o una nueva fecha." },
          { q: "¿Qué debo llevar?", a: "Protector solar. El equipo, el agua, los refrescos, la cerveza y los snacks van a bordo. El bote no tiene baño." },
          { q: "¿Dónde nos encontramos?", a: "En la playa de Tamarindo, frente al Restaurante El Chiringuito." },
        ],
      },
      contact: {
        title: "Planee su día en el mar",
        blurb: "Envíe su fecha y cuántos son. Willy le responde con la disponibilidad y el precio de su tour.",
        name: "Su nombre", phone: "WhatsApp o teléfono", service: "Tour",
        message: "¿Algo más que debamos saber?",
        submit: "Enviar solicitud",
        success: "Solicitud enviada. Willy le escribirá para confirmar la disponibilidad; su fecha queda apartada con el depósito.",
        pick: "Escoja un tour",
        services: ["Pesca costera", "Pesca en altamar", "Snorkel y tubing", "Atardecer en el mar", "Tour privado por la costa", "Tour privado a la medida"],
      },
      footer: {
        tagline: "Tours privados en bote desde Playa Tamarindo: pesca deportiva, snorkel, atardeceres y días que usted planea con el capitán.",
        hours: "Todos los días, 6:00 a. m. – 6:30 p. m.",
        rights: "Todos los derechos reservados.",
        hoursLabel: "Horario",
      },
    },
  },
  media: {
    hero: `${a}/hero-boat-aerial.webp`,
    heroFocus: "62% 60%",
    teamPortrait: `${a}/captain-willy.webp`,
    gallery: [
      `${a}/gallery-01-willy-gold.webp`,
      `${a}/gallery-02-sunset-tubing.webp`,
      `${a}/gallery-03-underwater.webp`,
      `${a}/gallery-04-two-men.webp`,
      `${a}/gallery-05-snorkel.webp`,
      `${a}/gallery-06-mahi-water.webp`,
      `${a}/gallery-07-women-tubing.webp`,
      `${a}/gallery-09-family-snorkel.webp`,
      `${a}/gallery-10-ski.webp`,
      `${a}/gallery-11-happy.webp`,
      `${a}/gallery-12-red-mahi.webp`,
    ],
  },
  // Alt text for the gallery photos (the site shows no captions). The sailfish
  // shot is the offshore tour's photo, so the gallery leaves it out.
  galleryCaptions: {
    en: [
      "Captain Willy holding a large golden fish on the boat",
      "Guests tubing behind the boat at sunset",
      "A snorkeler gliding over the reef",
      "Two anglers with their offshore catch",
      "A family riding the tube behind the boat",
      "A young angler in the water with a mahi-mahi",
      "Two women tubing at sunset",
      "A family snorkeling together",
      "Water-skiing behind the boat at sunset",
      "Anglers celebrating a day's catch",
      "An angler in a red shirt with a mahi-mahi",
    ],
    es: [
      "El Capitán Willy con un gran pez dorado en el bote",
      "Invitados en el tubo detrás del bote al atardecer",
      "Un buzo de snorkel sobre el arrecife",
      "Dos pescadores con su pesca de altamar",
      "Una familia en el tubo detrás del bote",
      "Un joven pescador en el agua con un dorado",
      "Dos mujeres en el tubo al atardecer",
      "Una familia haciendo snorkel",
      "Esquí acuático detrás del bote al atardecer",
      "Pescadores celebrando la pesca del día",
      "Un pescador de camisa roja con un dorado",
    ],
  },
};

// The services list is the tours with their prices: what PLW's Secretaria IA reads (tour-services.ts).
for (const lang of ["en", "es"] as const) {
  tamarindoToursDiscovery.content[lang].services.items = tourServices(tamarindoToursDiscovery.tours!, lang);
}

export default tamarindoToursDiscovery;
