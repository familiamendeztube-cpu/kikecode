import type { TemplateEnrichment } from "./types";

const base = (slug: string) => `/template-assets/${slug}`;
const hyp = base("hyperion-synthetic-turf");
const lpp = base("los-primos-plumbing");
const chg = base("chales-garage");
const rym = base("auto-servicio-rym");
const fenix = base("suplidora-fenix");

export const ENRICHMENTS: Record<string, TemplateEnrichment> = {
  "suplidora-fenix": {
    email: "",
    phone: "+506 7297 4936",
    phoneHref: "tel:+50672974936",
    address: "",
    assistant: {
      name: "Fénix",
      en: "Hi! Thanks for contacting {business}. What barber tools are you looking for today?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Qué herramientas de barbería buscas hoy?",
      roleEn: "Sales",
      roleEs: "Ventas",
    },
    media: {
      hero: `${fenix}/fenix_hero.jpg`,
      heroVideo: `${fenix}/fenix_hero_loop.mp4`,
      heroPoster: `${fenix}/fenix_hero_poster.jpg`,
      video: `${fenix}/fenix_band_loop.mp4`,
      teamPortrait: `${fenix}/fenix_owner.jpg`,
      gallery: [
        `${fenix}/fenix_clipper_kit.jpg`,
        `${fenix}/fenix_white_set.jpg`,
        `${fenix}/fenix_shaver_red.jpg`,
        `${fenix}/fenix_gold_shaver.jpg`,
        `${fenix}/fenix_vgr.jpg`,
        `${fenix}/fenix_gold_set.jpg`,
        `${fenix}/fenix_clipper_box.jpg`,
        `${fenix}/fenix_shaver_hands.jpg`,
      ],
    },
  },
  "auto-servicio-rym": {
    phone: "+506 6419 5247",
    phoneHref: "tel:+50664195247",
    address: "200 mts oeste de Casa Presidencial, contiguo a Edificio Mira, San José",
    email: "",
    availability: {
      en: "Mon-Fri 7:00-18:00, Sat 7:00-13:00",
      es: "L-V 7:00-18:00, Sáb 7:00-13:00",
    },
    assistant: {
      name: "Asesor de Servicio",
      en: "Hi! Thanks for contacting {business}. How can we help you with your vehicle today?",
      es: "¡Hola! Gracias por contactar a {business}. ¿En qué podemos ayudarle con su vehículo hoy?",
      roleEn: "Service Advisor",
      roleEs: "Asesor de Servicio",
    },
    media: {
      hero: `${rym}/rym_new_02.jpg`,
      heroVideo: `${rym}/rym_hero_loop.mp4`,
      heroPoster: `${rym}/rym_hero_poster.jpg`,
      video: `${rym}/rym_band_loop.mp4`,
      teamPortrait: `${rym}/rym_new_11.jpg`,
      gallery: [
        `${rym}/rym_new_04.jpg`,
        `${rym}/rym_new_06.jpg`,
        `${rym}/rym_new_08.jpg`,
        `${rym}/rym_new_01.jpg`,
        `${rym}/rym_new_03.jpg`,
        `${rym}/rym_new_05.jpg`,
        `${rym}/rym_new_07.jpg`,
        `${rym}/rym_new_09.jpg`,
        `${rym}/rym_new_10.jpg`,
        `${rym}/rym_new_12.jpg`,
        `${rym}/rym_new_13.jpg`,
        `${rym}/rym_new_14.jpg`,
      ],
    },
  },
  "chales-garage": {
    phone: "8561-2228",
    phoneHref: "tel:+50685612228",
    address: "Muelle de San Carlos, Alajuela, Costa Rica",
    email: "Alejandrov@chalesgarage.com",
    availability: {
      en: "Mon–Sat · 8am–6pm",
      es: "Lun–Sáb · 8am–6pm",
    },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Which vehicle can I help you find today?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Qué vehículo le ayudo a encontrar hoy?",
      roleEn: "Sales Advisor",
      roleEs: "Asesora de Ventas",
    },
    media: {
      hero: `${chg}/hero.jpg`,
      heroVideo: `${chg}/reel-promo.mp4`,
      heroPoster: `${chg}/hero.jpg`,
      gallery: [
        `${chg}/real-lot.jpg`,
        `${chg}/real-4x4.jpg`,
        `${chg}/real-premium.jpg`,
        `${chg}/real-interior.jpg`,
        `${chg}/real-owner.jpg`,
        `${chg}/real-showroom.jpg`,
      ],
      teamPortrait: `${chg}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "DollarSign",  title: "Financing available",    blurb: "Flexible options to fit your budget." },
        { icon: "Truck",       title: "Trade-ins welcome",       blurb: "Fair value for your current vehicle." },
        { icon: "ShieldCheck", title: "Every vehicle inspected", blurb: "Checked over before it hits the lot." },
        { icon: "BadgeCheck",  title: "Quality guaranteed",      blurb: "What you see online is what you get." },
        { icon: "Languages",   title: "Bilingual service",       blurb: "We serve you in English or Spanish." },
        { icon: "Star",        title: "Honest, no pressure",     blurb: "Browse and buy at your own pace." },
      ],
      es: [
        { icon: "DollarSign",  title: "Financiamiento disponible", blurb: "Opciones flexibles a su presupuesto." },
        { icon: "Truck",       title: "Aceptamos su vehículo",     blurb: "Valor justo por su carro actual." },
        { icon: "ShieldCheck", title: "Cada vehículo revisado",    blurb: "Inspeccionado antes de salir a la venta." },
        { icon: "BadgeCheck",  title: "Calidad garantizada",       blurb: "Lo que ve en línea es lo que recibe." },
        { icon: "Languages",   title: "Servicio bilingüe",         blurb: "Le atendemos en inglés o español." },
        { icon: "Star",        title: "Honesto, sin presión",      blurb: "Explore y compre a su propio ritmo." },
      ],
    },
    galleryCaptions: {
      en: [
        "Our lot in Muelle, San Carlos",
        "Classic 4x4s ready for any road",
        "Premium vehicles, inspected in detail",
        "Sporty, well-kept interiors",
        "Personal, honest service from our team",
        "We show you every vehicle in our showroom",
      ],
      es: [
        "Nuestro lote en Muelle, San Carlos",
        "4x4 clásicos listos para todo terreno",
        "Vehículos premium revisados a detalle",
        "Interiores deportivos y bien cuidados",
        "Atención personal y honesta de nuestro equipo",
        "Le mostramos cada vehículo en nuestro showroom",
      ],
    },
    videoGallery: {
      title: { en: "See Chale's Garage in Action", es: "Conozca Chale's Garage en Video" },
      blurb: {
        en: "Real footage from our lot in Muelle, San Carlos — special promotions and credit approval in 24 hours.",
        es: "Video real de nuestro lote en Muelle, San Carlos — promociones especiales y créditos en 24 horas.",
      },
      eyebrow: { en: "Real footage, real cars", es: "Video real, carros reales" },
      ctaLabel: { en: "I'm Interested", es: "Me Interesa" },
      items: [
        {
          src: `${chg}/reel-promo.mp4`, poster: `${chg}/reel-promo.jpg`,
          title: { en: "Find Your Car at Chale's Garage", es: "Encuentre Su Carro en Chale's Garage" },
          caption: {
            en: "Special promotions and credit in 24 hours. Come visit us in Muelle, San Carlos.",
            es: "Promociones especiales y créditos en 24 horas. Visítenos en Muelle, San Carlos.",
          },
        },
        {
          src: `${chg}/reel-7.mp4`, poster: `${chg}/reel-7.jpg`,
          title: { en: "The Chale's Family", es: "La Familia Chale's" },
          caption: {
            en: "New SUVs delivered with pride — welcome to the Chale's Garage family.",
            es: "SUVs nuevas entregadas con orgullo — bienvenido a la familia Chale's Garage.",
          },
        },
        {
          src: `${chg}/reel-8.mp4`, poster: `${chg}/reel-8.jpg`,
          title: { en: "Tough 4x4s", es: "4x4 Para Todo Terreno" },
          caption: {
            en: "Genuine 4-wheel-drive Toyotas built for Costa Rican roads.",
            es: "Toyotas 4x4 auténticos, hechos para los caminos de Costa Rica.",
          },
        },
        {
          src: `${chg}/reel-2.mp4`, poster: `${chg}/reel-2.jpg`,
          title: { en: "Built for Adventure", es: "Listos Para la Aventura" },
          caption: {
            en: "Powerful off-road vehicles ready for any terrain in Costa Rica.",
            es: "Vehículos todoterreno potentes, listos para cualquier camino de Costa Rica.",
          },
        },
        {
          src: `${chg}/reel-5.mp4`, poster: `${chg}/reel-5.jpg`,
          title: { en: "Service With a Smile", es: "Atención Con Una Sonrisa" },
          caption: {
            en: "A friendly, bilingual team ready to help you find the right vehicle.",
            es: "Un equipo amable y bilingüe listo para ayudarle a encontrar su vehículo ideal.",
          },
        },
        {
          src: `${chg}/reel-6.mp4`, poster: `${chg}/reel-6.jpg`,
          title: { en: "Inspected and Ready to Drive", es: "Revisado y Listo Para Rodar" },
          caption: {
            en: "Clean, reliable sedans checked over and ready for your family.",
            es: "Sedanes limpios y confiables, revisados y listos para su familia.",
          },
        },
        {
          src: `${chg}/reel-4.mp4`, poster: `${chg}/reel-4.jpg`,
          title: { en: "Premium Interiors", es: "Interiores Premium" },
          caption: {
            en: "Sporty, well-kept interiors — every detail inspected before delivery.",
            es: "Interiores deportivos y bien cuidados — cada detalle revisado antes de entregar.",
          },
        },
        {
          src: `${chg}/reel-3.mp4`, poster: `${chg}/reel-3.jpg`,
          title: { en: "The Chale's Garage Team", es: "El Equipo de Chale's Garage" },
          caption: {
            en: "Honest, family-owned service — we treat every customer like a neighbor.",
            es: "Servicio honesto y familiar — tratamos a cada cliente como a un vecino.",
          },
        },
      ],
    },
    inventory: {
      title: { en: "Vehicles On Our Lot", es: "Vehículos en Nuestro Lote" },
      blurb: {
        en: "Real vehicles from Chale's Garage. Click any one for more photos, then message us on WhatsApp for the current price and availability.",
        es: "Vehículos reales de Chale's Garage. Haga clic en cualquiera para ver más fotos y escríbanos por WhatsApp para conocer el precio y la disponibilidad actual.",
      },
      vehicles: [
        {
          id: "bmw-x6", name: "BMW X6", bodyStyle: "SUV",
          price: "Consultar", status: { en: "On the lot", es: "En el lote" },
          transmission: { en: "Automatic", es: "Automática" }, fuel: { en: "Gasoline", es: "Gasolina" }, drivetrain: { en: "AWD xDrive", es: "Tracción AWD xDrive" },
          images: [`${chg}/real-premium.jpg`, `${chg}/real-interior.jpg`],
          highlights: {
            en: ["Premium SUV coupe", "Red leather sport interior", "Black sport wheels", "Head-turning presence"],
            es: ["SUV coupé premium", "Interior deportivo en cuero rojo", "Rines deportivos negros", "Presencia imponente"],
          },
          featured: true,
        },
        {
          id: "toyota-land-cruiser-fj40", name: "Toyota Land Cruiser FJ40", bodyStyle: "SUV",
          price: "Consultar", status: { en: "Classic", es: "Clásico" },
          drivetrain: { en: "4x4", es: "4x4" },
          images: [`${chg}/landcruiser.jpg`, `${chg}/landcruiser-int.jpg`],
          highlights: {
            en: ["Iconic off-road classic", "4x4 with front winch", "A true collector's piece", "Unmistakable presence"],
            es: ["Clásico todoterreno icónico", "4x4 con winche frontal", "Una verdadera joya de colección", "Presencia inconfundible"],
          },
          featured: true,
        },
        {
          id: "nissan-tiida", name: "Nissan Tiida", bodyStyle: "Sedan",
          price: "Consultar", status: { en: "On the lot", es: "En el lote" },
          fuel: { en: "Gasoline", es: "Gasolina" },
          images: [`${chg}/tiida.jpg`],
          highlights: {
            en: ["Compact and economical", "Great for the city", "Low fuel consumption", "Well cared for"],
            es: ["Compacto y económico", "Ideal para la ciudad", "Bajo consumo de combustible", "Bien cuidado"],
          },
        },
      ],
    },
  },
  "los-primos-plumbing": {
    phone: "(562) 550-9099",
    phoneHref: "tel:+15625509099",
    address: "Serving the Los Angeles area, Whittier & La Habra",
    email: "info@losprimosplumbing.com",
    availability: {
      en: "Mon–Sat · 7am–7pm · 24/7 emergency service",
      es: "Lun–Sáb · 7am–7pm · Servicio de emergencia 24/7",
    },
    assistant: {
      name: "Ana",
      en: "Hi! Thanks for calling {business}. How can we help with your plumbing today?",
      es: "¡Hola! Gracias por llamar a {business}. ¿Cómo le podemos ayudar con su plomería hoy?",
      roleEn: "Service Coordinator",
      roleEs: "Coordinadora de Servicio",
    },
    media: {
      hero: `${lpp}/hero.jpg`,
      gallery: [
        `${lpp}/gal1.jpg`,
        `${lpp}/gal2.jpg`,
        `${lpp}/gal3.jpg`,
        `${lpp}/action1.jpg`,
        `${lpp}/action2.jpg`,
        `${lpp}/gal4.jpg`,
      ],
      teamPortrait: `${lpp}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",       title: "Same-day service",       blurb: "Most calls handled the same day you call." },
        { icon: "ShieldCheck", title: "Licensed & insured",     blurb: "Fully covered on every single job." },
        { icon: "DollarSign",  title: "Upfront flat pricing",   blurb: "Approve the price before we start." },
        { icon: "Wrench",      title: "Expert repairs",         blurb: "Done right the first time, to code." },
        { icon: "Languages",   title: "Bilingual EN/ES",        blurb: "We serve you in English or Spanish." },
        { icon: "Star",        title: "Honest service",         blurb: "Clean work and upfront pricing." },
      ],
      es: [
        { icon: "Clock",       title: "Servicio el mismo día",       blurb: "La mayoría de llamadas el mismo día." },
        { icon: "ShieldCheck", title: "Con licencia y seguro",       blurb: "Totalmente cubierto en cada trabajo." },
        { icon: "DollarSign",  title: "Precio fijo por adelantado",  blurb: "Apruebe el precio antes de empezar." },
        { icon: "Wrench",      title: "Reparaciones expertas",       blurb: "Bien hecho a la primera, a código." },
        { icon: "Languages",   title: "Bilingüe EN/ES",              blurb: "Le atendemos en inglés o español." },
        { icon: "Star",        title: "Servicio honesto",            blurb: "Trabajo limpio y precio claro." },
      ],
    },
    galleryCaptions: {
      en: [
        "Clean, modern bathroom remodels",
        "Tankless & tank water heater installs",
        "Leak detection and pipe repair",
        "Fast drain & sewer cleaning",
        "Friendly, uniformed local crew",
        "Kitchen sink & faucet installation",
      ],
      es: [
        "Remodelaciones de baño limpias y modernas",
        "Instalación de calentadores con y sin tanque",
        "Detección de fugas y reparación de tuberías",
        "Limpieza rápida de drenajes y alcantarillado",
        "Equipo local amable y uniformado",
        "Instalación de fregaderos y llaves de cocina",
      ],
    },
    videoGallery: {
      title: { en: "Watch Our Work in Action", es: "Vea Nuestro Trabajo en Acción" },
      blurb: {
        en: "Real commercials, real Los Primos crew. Professional, licensed, and bilingual plumbers serving the Los Angeles area.",
        es: "Comerciales reales, equipo real de Los Primos. Plomeros profesionales, con licencia y bilingües al servicio del área de Los Ángeles.",
      },
      items: [
        {
          src: `${lpp}/video-1.mp4`,
          poster: `${lpp}/video-1.jpg`,
          title: { en: "Professional Latino Workers", es: "Trabajadores Latinos Profesionales" },
          caption: {
            en: "Expert plumbing service and top-quality work, done right the first time.",
            es: "Servicio de plomería experto y trabajo de primera calidad, bien hecho a la primera.",
          },
        },
        {
          src: `${lpp}/video-2.mp4`,
          poster: `${lpp}/video-2.jpg`,
          title: { en: "Premium Plumbing Work", es: "Trabajo de Plomería Premium" },
          caption: {
            en: "Licensed, insured, and bilingual — serving the Los Angeles area, Whittier & La Habra.",
            es: "Con licencia, asegurados y bilingües — al servicio de Los Ángeles, Whittier y La Habra.",
          },
        },
      ],
    },
  },
  "hyperion-synthetic-turf": {
    phone: "(626) 320-0466",
    phoneHref: "tel:+16263200466",
    phoneAlt: "(626) 804-0171",
    phoneAltHref: "tel:+16268040171",
    address: "Serving Greater Los Angeles & Southern California",
    email: "Hyperionsyntheticturf@gmail.com",
    availability: { en: "Mon–Sat · 7am–6pm · Sun closed · Free estimates", es: "Lun–Sáb · 7am–6pm · Dom cerrado · Estimados gratis" },
    assistant: {
      name: "Ana",
      en: "Thank you for calling {business}. We specialize in synthetic turf, landscaping, hardscape, and outdoor living improvements across Southern California. How can we help with your project today?",
      es: "Gracias por llamar a {business}. Nos especializamos en césped sintético, landscaping, hardscape y mejoras exteriores en el sur de California. ¿Qué tipo de proyecto necesita?",
      roleEn: "Project reception",
      roleEs: "Recepción de proyectos",
    },
    media: {
      hero: `${hyp}/hero.jpg`,
      heroVideo: `${hyp}/hero-video.mp4`,
      heroPoster: `${hyp}/hero-video.jpg`,
      gallery: [`${hyp}/gal1.jpg`, `${hyp}/gal2.jpg`, `${hyp}/gal3.jpg`, `${hyp}/action1.jpg`, `${hyp}/action2.jpg`, `${hyp}/gal4.jpg`],
      teamPortrait: `${hyp}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Sparkles",    title: "Premium materials",       blurb: "Quality synthetic turf built to last." },
        { icon: "Languages",   title: "Hablamos Español",        blurb: "Bilingual service from first call to final walkthrough." },
        { icon: "Leaf",        title: "Low-maintenance",         blurb: "No mowing, no watering — green all year round." },
        { icon: "Heart",       title: "Pet & family friendly",   blurb: "Safe, soft, durable turf the whole family loves." },
        { icon: "ShieldCheck", title: "Residential & commercial",blurb: "Insured crews for homes and business properties." },
        { icon: "DollarSign",  title: "Free estimates",          blurb: "Honest written quotes with no pressure." },
      ],
      es: [
        { icon: "Sparkles",    title: "Materiales premium",      blurb: "Césped sintético de calidad que dura." },
        { icon: "Languages",   title: "Hablamos Español",        blurb: "Servicio bilingüe desde la primera llamada hasta el final." },
        { icon: "Leaf",        title: "Bajo mantenimiento",      blurb: "Sin cortar, sin regar — verde todo el año." },
        { icon: "Heart",       title: "Para mascotas y familias",blurb: "Césped seguro, suave y resistente que toda la familia ama." },
        { icon: "ShieldCheck", title: "Residencial y comercial", blurb: "Equipos asegurados para casas y negocios." },
        { icon: "DollarSign",  title: "Estimados gratis",        blurb: "Cotizaciones honestas y por escrito, sin presión." },
      ],
    },
    galleryCaptions: {
      en: ["Backyard transformation — lush synthetic turf", "Front yard redesign — clean modern curb appeal", "Hardscape patio with pavers & borders", "Pet-friendly turf — soft, clean & durable", "Crew installing premium turf base", "Modern outdoor living space"],
      es: ["Transformación de patio — césped sintético exuberante", "Rediseño de jardín delantero — apariencia moderna", "Patio de hardscape con adoquines y bordes", "Césped para mascotas — suave, limpio y resistente", "Equipo instalando base de césped premium", "Espacio exterior moderno"],
    },
    videoGallery: {
      title: { en: "Watch Real Outdoor Work", es: "Vea Trabajos Reales en Exterior" },
      blurb: { en: "Real crews, real projects across Southern California — pressing play tells the story better than any photo.", es: "Equipos reales, proyectos reales en el sur de California — un video lo dice mejor que cualquier foto." },
      items: [
        { src: `${hyp}/project-video-1.mp4`, poster: `${hyp}/project-video-1.jpg`,
          title: { en: "Backyard Transformation", es: "Transformación de Patio" },
          caption: { en: "From a tired lawn to clean, low-maintenance turf.", es: "De un césped cansado a césped limpio y de bajo mantenimiento." } },
        { src: `${hyp}/project-video-2.mp4`, poster: `${hyp}/project-video-2.jpg`,
          title: { en: "Installation Process", es: "Proceso de Instalación" },
          caption: { en: "Careful base prep and precise, professional installation.", es: "Preparación de base cuidadosa e instalación profesional y precisa." } },
        { src: `${hyp}/hero-video.mp4`, poster: `${hyp}/hero-video.jpg`,
          title: { en: "Finished Turf Look", es: "Resultado Final de Césped" },
          caption: { en: "A premium outdoor space that stays green all year round.", es: "Un espacio exterior premium que se mantiene verde todo el año." } },
      ],
    },
    transformation: {
      title: { en: "From Ordinary Yard to Premium Outdoor Space", es: "De un patio común a un espacio exterior premium" },
      blurb: { en: "Professional turf and hardscape work starts with preparation, detail, and the right team.", es: "Un buen trabajo de césped y hardscape empieza con preparación, detalle y el equipo correcto." },
      steps: [
        { src: `${hyp}/project-in-progress.jpg`, phase: { en: "Before", es: "Antes" }, label: { en: "Project Planning", es: "Planeación del Proyecto" }, caption: { en: "We start by clearing and grading the yard for a clean, level base.", es: "Empezamos limpiando y nivelando el patio para una base limpia y pareja." } },
        { src: `${hyp}/action2.jpg`, phase: { en: "During", es: "Durante" }, label: { en: "Professional Preparation", es: "Preparación Profesional" }, caption: { en: "Our crew installs the base and turf with care and precision.", es: "Nuestro equipo instala la base y el césped con cuidado y precisión." } },
        { src: `${hyp}/gal1.jpg`, phase: { en: "After", es: "Después" }, label: { en: "Clean Outdoor Finish", es: "Acabado Exterior Limpio" }, caption: { en: "A beautiful, low-maintenance space ready to enjoy year-round.", es: "Un espacio hermoso y de bajo mantenimiento listo para disfrutar todo el año." } },
      ],
    },
    clientTrust: {
      title: { en: "Trusted by Local Homeowners", es: "Clientes Locales Confían en Hyperion" },
      blurb: { en: "Real projects, real people, and outdoor spaces built with pride.", es: "Proyectos reales, personas reales y espacios exteriores hechos con orgullo." },
      images: [
        { src: `${hyp}/team-client-1.jpg`, caption: { en: "Trusted by homeowners and local clients across Southern California.", es: "Clientes y familias confían en Hyperion en el sur de California." } },
        { src: `${hyp}/team-client-2.jpg`, caption: { en: "Beautiful outdoor spaces built with care, detail, and professional service.", es: "Espacios exteriores hermosos, hechos con cuidado, detalle y servicio profesional." } },
      ],
    },
    projectSelector: {
      title: { en: "What Type of Project Do You Need?", es: "¿Qué tipo de proyecto necesita?" },
      blurb: { en: "Pick what you're thinking about and we'll point you in the right direction.", es: "Elija lo que tiene en mente y le orientamos hacia la mejor solución." },
      options: [
        { en: "Backyard turf", es: "Césped en patio trasero" },
        { en: "Front yard turf", es: "Césped en patio delantero" },
        { en: "Pet area", es: "Área para mascotas" },
        { en: "Putting green", es: "Putting green" },
        { en: "Pavers / patio", es: "Adoquines / patio" },
        { en: "Concrete / driveway", es: "Concreto / driveway" },
        { en: "Retaining wall", es: "Muro de contención" },
        { en: "Irrigation", es: "Irrigación" },
        { en: "Commercial property", es: "Propiedad comercial" },
        { en: "Full outdoor transformation", es: "Transformación completa" },
        { en: "Not sure yet", es: "Aún no estoy seguro" },
      ],
      recommendation: { en: "For this type of project, Hyperion can inspect the area, recommend the right turf or hardscape solution, and provide a free estimate.", es: "Para este tipo de proyecto, Hyperion puede revisar el área, recomendar la mejor solución de césped o hardscape y preparar un estimado gratis." },
    },
  },

  painting: {
    phone: "1-800-555-0110",
    phoneHref: "tel:+18005550110",
    address: "2418 W Olympic Blvd, Los Angeles, CA 90006",
    email: "hello@carlospainting.com",
    availability: { en: "Open 24/7 · Same-day estimates", es: "Abierto 24/7 · Estimados el mismo día" },
    assistant: {
      name: "María",
      en: "Hi! I'm María, your assistant at {business}. We're available 24/7 — call or text anytime for a free estimate.",
      es: "¡Hola! Soy María, tu asistente en {business}. Estamos disponibles 24/7 — llámanos o escríbenos para una cotización gratis.",
      roleEn: "Live booking assistant",
      roleEs: "Asistente de reservas en vivo",
    },
    media: {
      hero: `${base("painting")}/hero.jpg`,
      video: `${base("painting")}/brand-film.mp4`,
      gallery: [`${base("painting")}/gal1.jpg`, `${base("painting")}/gal2.jpg`, `${base("painting")}/gal3.jpg`, `${base("painting")}/action1.jpg`, `${base("painting")}/action2.jpg`, `${base("painting")}/gal4.jpg`],
      teamPortrait: `${base("painting")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",      title: "24/7 service",         blurb: "Call or text any hour, any day. Real humans answer." },
        { icon: "DollarSign", title: "Free estimates",       blurb: "On-site quotes in 24 hours, no obligation." },
        { icon: "ShieldCheck",title: "Licensed & insured",   blurb: "CSLB #1083449 · $2M liability coverage." },
        { icon: "Languages",  title: "Bilingüe EN/ES",       blurb: "Hablamos español. Same crew, two languages." },
        { icon: "BadgeCheck", title: "5-year workmanship",   blurb: "Written warranty on every interior & exterior job." },
        { icon: "Truck",      title: "Same-week start",      blurb: "Most jobs scheduled within 5 business days." },
      ],
      es: [
        { icon: "Clock",      title: "Servicio 24/7",         blurb: "Llama o escribe a cualquier hora. Te contesta una persona real." },
        { icon: "DollarSign", title: "Estimados gratis",      blurb: "Cotización en sitio en 24 horas, sin compromiso." },
        { icon: "ShieldCheck",title: "Licencia y seguro",     blurb: "CSLB #1083449 · cobertura de $2M." },
        { icon: "Languages",  title: "Bilingual EN/ES",       blurb: "We speak English. Misma cuadrilla, dos idiomas." },
        { icon: "BadgeCheck", title: "Garantía de 5 años",    blurb: "Garantía escrita en cada trabajo interior y exterior." },
        { icon: "Truck",      title: "Inicio en la misma semana", blurb: "Mayoría de trabajos programados en 5 días hábiles." },
      ],
    },
    galleryCaptions: {
      en: ["Crew on-site, exterior repaint", "Living room finish, premium low-VOC", "Detail prep — tape, sand, prime"],
      es: ["Cuadrilla en sitio, repintado exterior", "Acabado en sala, bajo en VOC", "Detalle de preparación — cinta, lija, sello"],
    },
  },

  handyman: {
    phone: "1-800-555-0220",
    phoneHref: "tel:+18005550220",
    address: "5710 Bissonnet St, Houston, TX 77081",
    email: "hello@hernandezhandyman.com",
    availability: { en: "Open 24/7 · Emergency dispatch", es: "Abierto 24/7 · Despacho de emergencia" },
    assistant: {
      name: "Sofía",
      en: "Hi! I'm Sofía, your assistant at {business}. We're on-call 24/7 — book a free home visit anytime.",
      es: "¡Hola! Soy Sofía, tu asistente en {business}. Estamos disponibles 24/7 — agenda una visita gratis cuando quieras.",
      roleEn: "Dispatch coordinator", roleEs: "Coordinadora de despacho",
    },
    media: {
      hero: `${base("handyman")}/hero.jpg`,
      video: `${base("handyman")}/brand-film.mp4`,
      gallery: [`${base("handyman")}/gal1.jpg`, `${base("handyman")}/gal2.jpg`, `${base("handyman")}/gal3.jpg`, `${base("handyman")}/action1.jpg`, `${base("handyman")}/action2.jpg`, `${base("handyman")}/gal4.jpg`],
      teamPortrait: `${base("handyman")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",      title: "24/7 emergency",       blurb: "Burst pipe? Broken outlet? We're there same day." },
        { icon: "Wrench",     title: "100+ services",        blurb: "Drywall, plumbing, electrical, mounting, assembly." },
        { icon: "DollarSign", title: "Flat-rate pricing",    blurb: "No surprises. Quote before work starts." },
        { icon: "ShieldCheck",title: "Licensed & bonded",    blurb: "TDLR licensed · $1M coverage on every visit." },
        { icon: "Languages",  title: "Bilingüe EN/ES",       blurb: "Te explicamos cada arreglo en tu idioma." },
        { icon: "Star",       title: "4.9★ on Google",       blurb: "Over 1,200 verified five-star reviews." },
      ],
      es: [
        { icon: "Clock",      title: "Emergencia 24/7",       blurb: "¿Tubo roto? ¿Enchufe quemado? Llegamos el mismo día." },
        { icon: "Wrench",     title: "100+ servicios",        blurb: "Drywall, plomería, eléctrico, montaje, ensamble." },
        { icon: "DollarSign", title: "Precio fijo",           blurb: "Sin sorpresas. Cotización antes de empezar." },
        { icon: "ShieldCheck",title: "Licencia y fianza",     blurb: "Licencia TDLR · cobertura de $1M en cada visita." },
        { icon: "Languages",  title: "Bilingual EN/ES",       blurb: "We explain every fix in your language." },
        { icon: "Star",       title: "4.9★ en Google",        blurb: "Más de 1,200 reseñas de cinco estrellas verificadas." },
      ],
    },
    galleryCaptions: {
      en: ["Kitchen sink — leak repair", "Drywall patch & paint match", "Light fixture install"],
      es: ["Fregadero — reparación de fuga", "Parche y pintura de drywall", "Instalación de luminaria"],
    },
  },

  landscaping: {
    phone: "1-800-555-0330",
    phoneHref: "tel:+18005550330",
    address: "1340 N Highland Ave, Hollywood, CA 90028",
    email: "hola@verdelandscaping.com",
    availability: { en: "Open 7 days · Weekly maintenance routes", es: "Abierto 7 días · Rutas de mantenimiento semanales" },
    assistant: {
      name: "Carmen",
      en: "Hi! I'm Carmen at {business}. We're here 24/7 — book a free yard walk-through anytime.",
      es: "¡Hola! Soy Carmen de {business}. Estamos 24/7 — agenda un recorrido gratis de tu jardín cuando quieras.",
      roleEn: "Route coordinator", roleEs: "Coordinadora de rutas",
    },
    media: {
      hero: `${base("landscaping")}/hero.jpg`,
      video: `${base("landscaping")}/brand-film.mp4`,
      gallery: [`${base("landscaping")}/gal1.jpg`, `${base("landscaping")}/gal2.jpg`, `${base("landscaping")}/gal3.jpg`, `${base("landscaping")}/action1.jpg`, `${base("landscaping")}/action2.jpg`, `${base("landscaping")}/gal4.jpg`],
      teamPortrait: `${base("landscaping")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",       title: "24/7 booking",         blurb: "Set up routes online or by phone any hour." },
        { icon: "Leaf",        title: "Eco-friendly crews",   blurb: "Electric mowers, organic fertilizers on request." },
        { icon: "DollarSign",  title: "Flat monthly plans",   blurb: "Weekly maintenance starts at $89/mo." },
        { icon: "ShieldCheck", title: "Licensed C-27",        blurb: "California Landscape Contractor · fully insured." },
        { icon: "Languages",   title: "Bilingüe EN/ES",       blurb: "Cuadrillas bilingües en cada ruta." },
        { icon: "Sparkles",    title: "Free design consult",  blurb: "Drought-tolerant redesigns from $1,500." },
      ],
      es: [
        { icon: "Clock",       title: "Reservas 24/7",         blurb: "Programa rutas en línea o por teléfono a cualquier hora." },
        { icon: "Leaf",        title: "Cuadrillas ecológicas", blurb: "Cortadoras eléctricas, fertilizantes orgánicos opcionales." },
        { icon: "DollarSign",  title: "Planes mensuales fijos",blurb: "Mantenimiento semanal desde $89/mes." },
        { icon: "ShieldCheck", title: "Licencia C-27",         blurb: "Contratista de paisaje de California · totalmente asegurado." },
        { icon: "Languages",   title: "Bilingual EN/ES",       blurb: "Bilingual crews on every route." },
        { icon: "Sparkles",    title: "Consulta de diseño gratis", blurb: "Rediseños resistentes a sequía desde $1,500." },
      ],
    },
    galleryCaptions: {
      en: ["Hedge trim & shape", "Full-yard redesign", "Smart sprinkler tune-up"],
      es: ["Corte y forma de setos", "Rediseño completo del jardín", "Ajuste de aspersores inteligentes"],
    },
  },

  cleaning: {
    phone: "1-800-555-0440",
    phoneHref: "tel:+18005550440",
    address: "215 W Commerce St, San Antonio, TX 78205",
    email: "hola@brillacleaning.com",
    availability: { en: "Open 24/7 · Same-day cleans available", es: "Abierto 24/7 · Limpieza el mismo día disponible" },
    assistant: {
      name: "Lucía",
      en: "Hi! I'm Lucía at {business}. Our team is reachable 24/7 — book a one-time or recurring clean in 60 seconds.",
      es: "¡Hola! Soy Lucía de {business}. Estamos disponibles 24/7 — agenda una limpieza única o recurrente en 60 segundos.",
      roleEn: "Booking assistant", roleEs: "Asistente de reservas",
    },
    media: {
      hero: `${base("cleaning")}/hero.jpg`,
      video: `${base("cleaning")}/brand-film.mp4`,
      gallery: [`${base("cleaning")}/gal1.jpg`, `${base("cleaning")}/gal2.jpg`, `${base("cleaning")}/gal3.jpg`, `${base("cleaning")}/action1.jpg`, `${base("cleaning")}/action2.jpg`, `${base("cleaning")}/gal4.jpg`],
      teamPortrait: `${base("cleaning")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",       title: "24/7 booking",          blurb: "Schedule recurring or last-minute cleans any time." },
        { icon: "Sparkles",    title: "Eco supplies included", blurb: "Non-toxic products safe for kids & pets." },
        { icon: "DollarSign",  title: "Flat-rate by home size",blurb: "Studios from $89 · 3BR from $179." },
        { icon: "ShieldCheck", title: "Bonded & insured",      blurb: "Background-checked cleaners on every visit." },
        { icon: "Languages",   title: "Bilingüe EN/ES",        blurb: "Equipos bilingües en cada turno." },
        { icon: "BadgeCheck",  title: "Re-clean guarantee",    blurb: "Not happy? We come back free within 24h." },
      ],
      es: [
        { icon: "Clock",       title: "Reservas 24/7",          blurb: "Programa limpiezas recurrentes o de último momento." },
        { icon: "Sparkles",    title: "Productos ecológicos",   blurb: "Productos no tóxicos seguros para niños y mascotas." },
        { icon: "DollarSign",  title: "Precio fijo por tamaño", blurb: "Estudios desde $89 · 3 recámaras desde $179." },
        { icon: "ShieldCheck", title: "Fianza y seguro",        blurb: "Personal con verificación de antecedentes." },
        { icon: "Languages",   title: "Bilingual EN/ES",        blurb: "Bilingual teams on every shift." },
        { icon: "BadgeCheck",  title: "Garantía de re-limpieza",blurb: "¿No te gustó? Regresamos gratis en 24h." },
      ],
    },
    galleryCaptions: {
      en: ["Deep clean — full kitchen", "Move-out bathroom shine", "Recurring vacuum & dust"],
      es: ["Limpieza profunda — cocina completa", "Brillo de baño para mudanza", "Aspirado y sacudido recurrente"],
    },
  },

  auto: {
    phone: "1-800-555-0550",
    phoneHref: "tel:+18005550550",
    address: "8412 Telephone Rd, Houston, TX 77017",
    email: "service@ramirezauto.com",
    availability: { en: "Open Mon–Sat · 24/7 emergency tow", es: "Abierto lun–sáb · Grúa 24/7" },
    assistant: {
      name: "Isabel",
      en: "Hi! I'm Isabel at {business}. Need a tow or a quote? We're reachable 24/7 — book online or call.",
      es: "¡Hola! Soy Isabel de {business}. ¿Necesitas grúa o cotización? Estamos 24/7 — reserva en línea o llama.",
      roleEn: "Service advisor", roleEs: "Asesora de servicio",
    },
    media: {
      hero: `${base("auto")}/hero.jpg`,
      video: `${base("auto")}/brand-film.mp4`,
      gallery: [`${base("auto")}/gal1.jpg`, `${base("auto")}/gal2.jpg`, `${base("auto")}/gal3.jpg`, `${base("auto")}/action1.jpg`, `${base("auto")}/action2.jpg`, `${base("auto")}/gal4.jpg`],
      teamPortrait: `${base("auto")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",       title: "24/7 tow dispatch",    blurb: "Stuck on the road? We arrive within 45 min." },
        { icon: "Wrench",      title: "ASE-certified techs",  blurb: "Master techs · diagnostics on all makes." },
        { icon: "DollarSign",  title: "Free diagnostic",      blurb: "Check engine light? We scan it free." },
        { icon: "ShieldCheck", title: "12-month warranty",    blurb: "Parts & labor warranty on every repair." },
        { icon: "Languages",   title: "Bilingüe EN/ES",       blurb: "Te explicamos el problema sin tecnicismos." },
        { icon: "BadgeCheck",  title: "Honest pricing",       blurb: "Photo proof of every needed repair." },
      ],
      es: [
        { icon: "Clock",       title: "Grúa 24/7",             blurb: "¿Varado en la carretera? Llegamos en 45 min." },
        { icon: "Wrench",      title: "Técnicos ASE",          blurb: "Técnicos maestros · diagnóstico en todas las marcas." },
        { icon: "DollarSign",  title: "Diagnóstico gratis",    blurb: "¿Luz de check engine? Escaneamos gratis." },
        { icon: "ShieldCheck", title: "12 meses de garantía",  blurb: "Garantía de partes y mano de obra." },
        { icon: "Languages",   title: "Bilingual EN/ES",       blurb: "We explain the problem in plain language." },
        { icon: "BadgeCheck",  title: "Precios honestos",      blurb: "Foto de cada reparación necesaria." },
      ],
    },
    galleryCaptions: {
      en: ["Engine diagnostics", "Tire rotation & balance", "Lifts, bays, modern shop"],
      es: ["Diagnóstico de motor", "Rotación y balanceo", "Elevadores, bahías, taller moderno"],
    },
  },

  restaurant: {
    phone: "1-800-555-0660",
    phoneHref: "tel:+18005550660",
    address: "316 Alamo Plaza, San Antonio, TX 78205",
    email: "reservas@lacocinabistro.com",
    availability: { en: "Open daily · Catering 7 days a week", es: "Abierto todos los días · Catering 7 días" },
    assistant: {
      name: "Rosa",
      en: "Hi! I'm Rosa at {business}. Want a table or to book catering? We're here 24/7 — call or message anytime.",
      es: "¡Hola! Soy Rosa de {business}. ¿Quieres mesa o catering? Estamos 24/7 — llama o escribe cuando quieras.",
      roleEn: "Reservations host", roleEs: "Anfitriona de reservas",
    },
    media: {
      hero: `${base("restaurant")}/hero.jpg`,
      video: `${base("restaurant")}/brand-film.mp4`,
      gallery: [`${base("restaurant")}/gal1.jpg`, `${base("restaurant")}/gal2.jpg`, `${base("restaurant")}/gal3.jpg`, `${base("restaurant")}/action1.jpg`, `${base("restaurant")}/action2.jpg`, `${base("restaurant")}/gal4.jpg`],
      teamPortrait: `${base("restaurant")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",       title: "24/7 reservations",      blurb: "Book a table or catering any hour, online or phone." },
        { icon: "Sparkles",    title: "Made-from-scratch daily",blurb: "Family recipes since 1998 · zero pre-mixes." },
        { icon: "Truck",       title: "Catering 7 days",        blurb: "Office, wedding, quinceañera — from 10 to 500 guests." },
        { icon: "DollarSign",  title: "Free dessert",           blurb: "Mention this site, get a free flan on first visit." },
        { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Menus & staff bilingual." },
        { icon: "BadgeCheck",  title: "4.9★ on Yelp",           blurb: "Top 10 Tex-Mex in San Antonio · 1,500+ reviews." },
      ],
      es: [
        { icon: "Clock",       title: "Reservas 24/7",          blurb: "Reserva mesa o catering a cualquier hora." },
        { icon: "Sparkles",    title: "Hecho a mano cada día",  blurb: "Recetas familiares desde 1998 · cero mezclas." },
        { icon: "Truck",       title: "Catering 7 días",        blurb: "Oficina, boda, quinceañera — de 10 a 500 invitados." },
        { icon: "DollarSign",  title: "Postre gratis",          blurb: "Menciona este sitio, recibe un flan gratis." },
        { icon: "Languages",   title: "Bilingual EN/ES",        blurb: "Menús y personal bilingüe." },
        { icon: "BadgeCheck",  title: "4.9★ en Yelp",           blurb: "Top 10 Tex-Mex en San Antonio · más de 1,500 reseñas." },
      ],
    },
    galleryCaptions: {
      en: ["Signature tacos al pastor", "Warm, family dining room", "Catered family celebration"],
      es: ["Tacos al pastor de la casa", "Salón cálido y familiar", "Celebración familiar con catering"],
    },
  },

  beauty: {
    phone: "1-800-555-0770",
    phoneHref: "tel:+18005550770",
    address: "7600 W Sand Lake Rd, Orlando, FL 32819",
    email: "hola@bellabeautystudio.com",
    availability: { en: "Open 7 days · Late-night appointments", es: "Abierto 7 días · Citas hasta la noche" },
    assistant: {
      name: "Valentina",
      en: "Hi! I'm Valentina at {business}. Book online 24/7 — hair, color, nails, lashes.",
      es: "¡Hola! Soy Valentina de {business}. Reserva en línea 24/7 — cabello, color, uñas, pestañas.",
      roleEn: "Booking concierge", roleEs: "Conserje de reservas",
    },
    media: {
      hero: `${base("beauty")}/hero.jpg`,
      video: `${base("beauty")}/brand-film.mp4`,
      gallery: [`${base("beauty")}/gal1.jpg`, `${base("beauty")}/gal2.jpg`, `${base("beauty")}/gal3.jpg`, `${base("beauty")}/action1.jpg`, `${base("beauty")}/action2.jpg`, `${base("beauty")}/gal4.jpg`],
      teamPortrait: `${base("beauty")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",       title: "Book 24/7 online",       blurb: "Self-serve calendar with real-time availability." },
        { icon: "Sparkles",    title: "Master colorists",       blurb: "Balayage, highlights, color correction specialists." },
        { icon: "Heart",       title: "First visit -20%",       blurb: "New clients save on any service over $80." },
        { icon: "DollarSign",  title: "Transparent menu",       blurb: "Every price listed online — zero surprises." },
        { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Estilistas bilingües en cada turno." },
        { icon: "BadgeCheck",  title: "1,200+ five-star",       blurb: "Top-rated salon in Orlando on Yelp & Google." },
      ],
      es: [
        { icon: "Clock",       title: "Reserva 24/7 en línea",   blurb: "Calendario en tiempo real, sin esperas." },
        { icon: "Sparkles",    title: "Coloristas expertas",     blurb: "Especialistas en balayage, mechas y correcciones." },
        { icon: "Heart",       title: "Primera visita -20%",     blurb: "Clientes nuevos ahorran en servicios sobre $80." },
        { icon: "DollarSign",  title: "Menú transparente",       blurb: "Cada precio en línea — sin sorpresas." },
        { icon: "Languages",   title: "Bilingual EN/ES",         blurb: "Bilingual stylists on every shift." },
        { icon: "BadgeCheck",  title: "1,200+ cinco estrellas",  blurb: "Salón mejor calificado de Orlando." },
      ],
    },
    galleryCaptions: {
      en: ["Gel manicure detail", "Modern studio floor", "Color & highlight service"],
      es: ["Detalle de manicure en gel", "Salón moderno", "Servicio de color y mechas"],
    },
  },

  events: {
    phone: "1-800-555-0880",
    phoneHref: "tel:+18005550880",
    address: "1230 SW 8th St, Miami, FL 33135",
    email: "hola@fiestaeventsdecor.com",
    availability: { en: "Open 24/7 · Same-week installs", es: "Abierto 24/7 · Instalaciones esa misma semana" },
    assistant: {
      name: "Camila",
      en: "Hi! I'm Camila at {business}. We're on-call 24/7 — book balloons, backdrops, full setups online or by phone.",
      es: "¡Hola! Soy Camila de {business}. Estamos 24/7 — reserva globos, backdrops y montajes completos.",
      roleEn: "Event planner", roleEs: "Planificadora de eventos",
    },
    media: {
      hero: `${base("events")}/hero.jpg`,
      video: `${base("events")}/brand-film.mp4`,
      gallery: [`${base("events")}/gal1.jpg`, `${base("events")}/gal2.jpg`, `${base("events")}/gal3.jpg`, `${base("events")}/action1.jpg`, `${base("events")}/action2.jpg`, `${base("events")}/gal4.jpg`],
      teamPortrait: `${base("events")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",       title: "24/7 planning",          blurb: "Last-minute? We do 48-hour rush events." },
        { icon: "Sparkles",    title: "Custom themes",          blurb: "Quinceañera, sweet 16, wedding, baby shower." },
        { icon: "Truck",       title: "Delivery & breakdown",   blurb: "We arrive, set up, clean up — you celebrate." },
        { icon: "DollarSign",  title: "Packages from $499",     blurb: "Balloon arch, backdrop, photo prop included." },
        { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Coordinadoras bilingües." },
        { icon: "Heart",       title: "Free consult",           blurb: "1-hour planning call, zero obligation." },
      ],
      es: [
        { icon: "Clock",       title: "Planificación 24/7",      blurb: "¿De último momento? Eventos express en 48 horas." },
        { icon: "Sparkles",    title: "Temas personalizados",    blurb: "Quinceañera, sweet 16, boda, baby shower." },
        { icon: "Truck",       title: "Entrega y desmontaje",    blurb: "Llegamos, montamos, limpiamos — tú celebras." },
        { icon: "DollarSign",  title: "Paquetes desde $499",     blurb: "Arco de globos, backdrop, prop fotográfico." },
        { icon: "Languages",   title: "Bilingual EN/ES",         blurb: "Bilingual coordinators." },
        { icon: "Heart",       title: "Consulta gratis",         blurb: "Llamada de planeación de 1 hora, sin compromiso." },
      ],
    },
    galleryCaptions: {
      en: ["Wedding reception setup", "Pastel birthday backdrop", "Quinceañera dance floor"],
      es: ["Montaje de recepción de boda", "Backdrop pastel de cumpleaños", "Pista de baile de quinceañera"],
    },
  },

  moving: {
    phone: "1-800-555-0990",
    phoneHref: "tel:+18005550990",
    address: "4501 Bruckner Blvd, Bronx, NY 10465",
    email: "hola@mudanzamoving.com",
    availability: { en: "Open 7 days · 24/7 booking", es: "Abierto 7 días · Reservas 24/7" },
    assistant: {
      name: "Adriana",
      en: "Hi! I'm Adriana at {business}. Book a free in-home quote 24/7 — local, long-distance, packing included.",
      es: "¡Hola! Soy Adriana de {business}. Reserva una cotización gratis 24/7 — local, larga distancia, empaque incluido.",
      roleEn: "Move coordinator", roleEs: "Coordinadora de mudanzas",
    },
    media: {
      hero: `${base("moving")}/hero.jpg`,
      video: `${base("moving")}/brand-film.mp4`,
      gallery: [`${base("moving")}/gal1.jpg`, `${base("moving")}/gal2.jpg`, `${base("moving")}/gal3.jpg`, `${base("moving")}/action1.jpg`, `${base("moving")}/action2.jpg`, `${base("moving")}/gal4.jpg`],
      teamPortrait: `${base("moving")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",       title: "Book 24/7",              blurb: "Online or by phone — instant confirmation." },
        { icon: "Truck",       title: "Local & long-distance",  blurb: "Tri-state moves daily · USDOT #3849221." },
        { icon: "DollarSign",  title: "Flat-rate quotes",       blurb: "Free in-home estimate — no hidden fees." },
        { icon: "ShieldCheck", title: "Fully insured",          blurb: "$100K cargo coverage included on every move." },
        { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Cuadrillas bilingües en cada camión." },
        { icon: "BadgeCheck",  title: "Same-day available",     blurb: "Last-minute? We have crews on standby." },
      ],
      es: [
        { icon: "Clock",       title: "Reserva 24/7",            blurb: "En línea o por teléfono — confirmación instantánea." },
        { icon: "Truck",       title: "Local y larga distancia", blurb: "Mudanzas tri-estatales diarias · USDOT #3849221." },
        { icon: "DollarSign",  title: "Precios fijos",           blurb: "Cotización gratis en casa — sin cargos ocultos." },
        { icon: "ShieldCheck", title: "Totalmente asegurado",    blurb: "Cobertura de carga de $100K incluida." },
        { icon: "Languages",   title: "Bilingual EN/ES",         blurb: "Bilingual crews on every truck." },
        { icon: "BadgeCheck",  title: "Mismo día disponible",    blurb: "¿Último momento? Tenemos cuadrillas en espera." },
      ],
    },
    galleryCaptions: {
      en: ["Furniture wrapped & loaded", "Boxes organized in truck", "Welcome to your new home"],
      es: ["Muebles envueltos y cargados", "Cajas organizadas en camión", "Bienvenidos a su nuevo hogar"],
    },
  },

  bakery: {
    phone: "1-800-555-0119",
    phoneHref: "tel:+18005550119",
    address: "1418 Calle 8, Miami, FL 33135",
    email: "hola@dulcebakery.com",
    availability: { en: "Open 7 days · Custom orders 24/7", es: "Abierto 7 días · Pedidos especiales 24/7" },
    assistant: {
      name: "Elena",
      en: "Hi! I'm Elena at {business}. Order custom cakes, pan dulce trays, or wedding desserts 24/7 — we'll text photos before pickup.",
      es: "¡Hola! Soy Elena de {business}. Pide pasteles personalizados, charolas de pan dulce o postres de boda 24/7 — te enviamos fotos antes.",
      roleEn: "Order specialist", roleEs: "Especialista de pedidos",
    },
    media: {
      hero: `${base("bakery")}/hero.jpg`,
      video: `${base("bakery")}/brand-film.mp4`,
      gallery: [`${base("bakery")}/gal1.jpg`, `${base("bakery")}/gal2.jpg`, `${base("bakery")}/gal3.jpg`, `${base("bakery")}/action1.jpg`, `${base("bakery")}/action2.jpg`, `${base("bakery")}/gal4.jpg`],
      teamPortrait: `${base("bakery")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock",       title: "Order 24/7",             blurb: "Custom cake quotes online or by phone any hour." },
        { icon: "Sparkles",    title: "From-scratch daily",     blurb: "No mixes, no shortcuts — true panadería tradition." },
        { icon: "Heart",       title: "Custom designs",         blurb: "Send a photo, we'll match it · approval before bake." },
        { icon: "DollarSign",  title: "Bulk discounts",         blurb: "Pan dulce trays from $24 · save 15% on 3+ dozen." },
        { icon: "Languages",   title: "Bilingüe EN/ES",         blurb: "Personal y pedidos bilingües." },
        { icon: "Truck",       title: "Delivery available",     blurb: "We deliver across South Florida — fee from $15." },
      ],
      es: [
        { icon: "Clock",       title: "Pide 24/7",               blurb: "Cotizaciones de pasteles a cualquier hora." },
        { icon: "Sparkles",    title: "Hecho a mano cada día",   blurb: "Sin mezclas, sin atajos — auténtica tradición." },
        { icon: "Heart",       title: "Diseños personalizados",  blurb: "Envía una foto, la igualamos · aprobación antes de hornear." },
        { icon: "DollarSign",  title: "Descuento por volumen",   blurb: "Charolas de pan dulce desde $24 · 15% en 3+ docenas." },
        { icon: "Languages",   title: "Bilingual EN/ES",         blurb: "Bilingual orders & staff." },
        { icon: "Truck",       title: "Entrega disponible",      blurb: "Entregamos en el sur de Florida — desde $15." },
      ],
    },
    galleryCaptions: {
      en: ["Pan dulce — daily display", "Custom wedding cake", "Fresh from the oven"],
      es: ["Pan dulce — exhibición diaria", "Pastel de boda personalizado", "Recién salido del horno"],
    },
  },

  "nicaraguan-restaurant": {
    phone: "(312) 409-9095",
    phoneHref: "tel:+13124099095",
    address: "Chicago, IL",
    email: "hola@guegue.com",
    availability: { en: "Open daily · Call or message to order", es: "Abierto a diario · Llame o escriba para ordenar" },
    assistant: {
      name: "Güe Güe",
      en: "¡Hola! Welcome to {business} — real Nicaraguan home cooking. Call or message us on TikTok @ge.ge51 to order or book catering.",
      es: "¡Hola! Bienvenido a {business} — auténtica comida nicaragüense. Llámenos o escríbanos en TikTok @ge.ge51 para ordenar o reservar catering.",
      roleEn: "Order & catering assistant",
      roleEs: "Asistente de pedidos y catering",
    },
    media: {
      hero: `${base("nicaraguan-restaurant")}/hero.jpg`,
      video: `${base("nicaraguan-restaurant")}/brand-film.mp4`,
      gallery: [
        `${base("nicaraguan-restaurant")}/gal1.jpg`,
        `${base("nicaraguan-restaurant")}/gal2.jpg`,
        `${base("nicaraguan-restaurant")}/gal3.jpg`,
        `${base("nicaraguan-restaurant")}/action1.jpg`,
        `${base("nicaraguan-restaurant")}/action2.jpg`,
        `${base("nicaraguan-restaurant")}/gal4.jpg`,
      ],
      teamPortrait: `${base("nicaraguan-restaurant")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "BadgeCheck", title: "Comida típica", blurb: "Asado, enchiladas, tajadas con queso — the real flavors of Nicaragua." },
        { icon: "Sparkles", title: "Made fresh daily", blurb: "Cooked to order with family recipes. Never frozen, never reheated." },
        { icon: "Truck", title: "Catering & big trays", blurb: "Family-style trays for parties, birthdays and events." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Te atendemos en español and English." },
        { icon: "Heart", title: "Hecho con amor", blurb: "Generous plates, made the way abuela taught us." },
        { icon: "Star", title: "Loved on social", blurb: "Follow our daily plates on TikTok @ge.ge51 & Facebook." },
      ],
      es: [
        { icon: "BadgeCheck", title: "Comida típica", blurb: "Asado, enchiladas, tajadas con queso — los sabores reales de Nicaragua." },
        { icon: "Sparkles", title: "Hecho fresco a diario", blurb: "Cocinado al momento con recetas familiares. Nunca congelado." },
        { icon: "Truck", title: "Catering y bandejas", blurb: "Bandejas familiares para fiestas, cumpleaños y eventos." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in English y español." },
        { icon: "Heart", title: "Hecho con amor", blurb: "Platos generosos, como nos enseñó la abuela." },
        { icon: "Star", title: "Querido en redes", blurb: "Vea nuestros platos diarios en TikTok @ge.ge51 y Facebook." },
      ],
    },
    galleryCaptions: {
      en: ["Asado de cerdo plate", "Tajadas con queso", "Pollo asado", "Catering tray", "Queso frito", "Carne asada plate"],
      es: ["Plato de asado de cerdo", "Tajadas con queso", "Pollo asado", "Bandeja de catering", "Queso frito", "Plato de carne asada"],
    },
  },

  "roofing": {
    availability: { en: "Mon–Sat · 7am–6pm", es: "Lun–Sáb · 7am–6pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Need a free roof inspection or a repair?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Necesita una inspección gratis o una reparación?",
      roleEn: "Roofing Advisor", roleEs: "Asesora de Techos",
    },
    media: {
      hero: `${base("roofing")}/hero.jpg`,
      gallery: [`${base("roofing")}/gal1.jpg`, `${base("roofing")}/gal2.jpg`, `${base("roofing")}/gal3.jpg`, `${base("roofing")}/gal4.jpg`, `${base("roofing")}/gal5.jpg`, `${base("roofing")}/gal6.jpg`],
      teamPortrait: `${base("roofing")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Your property is protected on every job." },
        { icon: "Clock", title: "Free inspections", blurb: "Honest photo reports, no pressure." },
        { icon: "BadgeCheck", title: "Manufacturer certified", blurb: "Certified installers with warranty options." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "Clear answers in your language." },
      ],
      es: [
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Su propiedad protegida en cada trabajo." },
        { icon: "Clock", title: "Inspecciones gratis", blurb: "Reportes con fotos, sin presión." },
        { icon: "BadgeCheck", title: "Certificados de fábrica", blurb: "Instaladores certificados con garantía." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Respuestas claras en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["New architectural shingles", "Storm damage repair", "Seamless gutter install", "Roof tear-off", "Metal roof system", "Finished roof"],
      es: ["Tejas arquitectónicas nuevas", "Reparación por tormenta", "Canaletas continuas", "Retiro de techo viejo", "Techo metálico", "Techo terminado"],
    },
  },

  "hvac": {
    availability: { en: "Mon–Sun · 24/7", es: "Lun–Dom · 24/7" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Is your AC or heating acting up?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Su aire o calefacción está fallando?",
      roleEn: "Comfort Advisor", roleEs: "Asesora de Climatización",
    },
    media: {
      hero: `${base("hvac")}/hero.jpg`,
      gallery: [`${base("hvac")}/gal1.jpg`, `${base("hvac")}/gal2.jpg`, `${base("hvac")}/gal3.jpg`, `${base("hvac")}/gal4.jpg`, `${base("hvac")}/gal5.jpg`, `${base("hvac")}/gal6.jpg`],
      teamPortrait: `${base("hvac")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock", title: "24/7 emergency service", blurb: "We're here when the heat or cold won't wait." },
        { icon: "DollarSign", title: "Free estimates", blurb: "Upfront pricing on new systems." },
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Certified, background-checked techs." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in English or Spanish." },
      ],
      es: [
        { icon: "Clock", title: "Emergencia 24/7", blurb: "Estamos cuando el calor o frío no espera." },
        { icon: "DollarSign", title: "Estimados gratis", blurb: "Precios claros en sistemas nuevos." },
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Técnicos certificados y verificados." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en inglés o español." },
      ],
    },
    galleryCaptions: {
      en: ["New AC condenser install", "Furnace tune-up", "Ductwork replacement", "Thermostat upgrade", "Mini-split system", "Emergency repair"],
      es: ["Instalación de aire nuevo", "Mantenimiento de calefacción", "Reemplazo de ductos", "Termostato nuevo", "Sistema mini-split", "Reparación de emergencia"],
    },
  },

  "electrician": {
    availability: { en: "Mon–Sat · 7am–7pm", es: "Lun–Sáb · 7am–7pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. What electrical work can we help with?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Con qué trabajo eléctrico le ayudamos?",
      roleEn: "Electrical Advisor", roleEs: "Asesora Eléctrica",
    },
    media: {
      hero: `${base("electrician")}/hero.jpg`,
      gallery: [`${base("electrician")}/gal1.jpg`, `${base("electrician")}/gal2.jpg`, `${base("electrician")}/gal3.jpg`, `${base("electrician")}/gal4.jpg`, `${base("electrician")}/gal5.jpg`, `${base("electrician")}/gal6.jpg`],
      teamPortrait: `${base("electrician")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Safe, code-compliant work every time." },
        { icon: "Clock", title: "Same-day service", blurb: "Fast response for urgent issues." },
        { icon: "BadgeCheck", title: "Up to code, guaranteed", blurb: "Permits and inspections handled." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "Clear answers in your language." },
      ],
      es: [
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Trabajo seguro y según el código." },
        { icon: "Clock", title: "Servicio el mismo día", blurb: "Respuesta rápida para urgencias." },
        { icon: "BadgeCheck", title: "Cumple el código", blurb: "Manejamos permisos e inspecciones." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Respuestas claras en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Panel upgrade", "Recessed lighting", "EV charger install", "Outlet & wiring repair", "Ceiling fan install", "Whole-home rewiring"],
      es: ["Mejora de panel eléctrico", "Luces empotradas", "Cargador para auto eléctrico", "Reparación de tomas y cableado", "Instalación de ventilador", "Recableado completo"],
    },
  },

  "flooring": {
    availability: { en: "Mon–Sat · 8am–6pm", es: "Lun–Sáb · 8am–6pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Looking for new floors? Tell me about the room.",
      es: "¡Hola! Gracias por contactar a {business}. ¿Busca pisos nuevos? Cuénteme del cuarto.",
      roleEn: "Flooring Advisor", roleEs: "Asesora de Pisos",
    },
    media: {
      hero: `${base("flooring")}/hero.jpg`,
      gallery: [`${base("flooring")}/gal1.jpg`, `${base("flooring")}/gal2.jpg`, `${base("flooring")}/gal3.jpg`, `${base("flooring")}/gal4.jpg`, `${base("flooring")}/gal5.jpg`, `${base("flooring")}/gal6.jpg`],
      teamPortrait: `${base("flooring")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "DollarSign", title: "Free in-home estimates", blurb: "We measure and quote at no cost." },
        { icon: "BadgeCheck", title: "Expert installation", blurb: "Clean, level, long-lasting results." },
        { icon: "Sparkles", title: "Wide material selection", blurb: "Wood, tile, vinyl and laminate." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "DollarSign", title: "Estimados gratis a domicilio", blurb: "Medimos y cotizamos sin costo." },
        { icon: "BadgeCheck", title: "Instalación experta", blurb: "Resultados limpios, nivelados y duraderos." },
        { icon: "Sparkles", title: "Gran variedad de materiales", blurb: "Madera, azulejo, vinil y laminado." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Hardwood floor install", "Porcelain tile work", "Luxury vinyl plank", "Floor refinishing", "Tile backsplash", "Finished living room"],
      es: ["Instalación de piso de madera", "Trabajo de porcelanato", "Vinil de lujo", "Restauración de pisos", "Salpicadero de azulejo", "Sala terminada"],
    },
  },

  "pool-service": {
    availability: { en: "Mon–Sat · 8am–5pm", es: "Lun–Sáb · 8am–5pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Need weekly service or a one-time clean?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Necesita servicio semanal o una limpieza única?",
      roleEn: "Pool Care Advisor", roleEs: "Asesora de Piscinas",
    },
    media: {
      hero: `${base("pool-service")}/hero.jpg`,
      gallery: [`${base("pool-service")}/gal1.jpg`, `${base("pool-service")}/gal2.jpg`, `${base("pool-service")}/gal3.jpg`, `${base("pool-service")}/gal4.jpg`, `${base("pool-service")}/gal5.jpg`, `${base("pool-service")}/gal6.jpg`],
      teamPortrait: `${base("pool-service")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Sparkles", title: "Weekly maintenance plans", blurb: "Crystal-clear water, hands-off for you." },
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Trusted, reliable pool techs." },
        { icon: "DollarSign", title: "Free water testing", blurb: "We balance chemicals the right way." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "Sparkles", title: "Planes de mantenimiento semanal", blurb: "Agua cristalina sin que usted se preocupe." },
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Técnicos de confianza." },
        { icon: "DollarSign", title: "Prueba de agua gratis", blurb: "Balanceamos los químicos correctamente." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Crystal-clear pool", "Weekly cleaning service", "Filter & pump repair", "Chemical balancing", "Tile & deck cleaning", "Green-to-clean recovery"],
      es: ["Piscina cristalina", "Limpieza semanal", "Reparación de filtro y bomba", "Balance químico", "Limpieza de azulejo y borde", "Recuperación de agua verde"],
    },
  },

  "pest-control": {
    availability: { en: "Mon–Sat · 7am–6pm", es: "Lun–Sáb · 7am–6pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. What pests are bothering you?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Qué plagas le molestan?",
      roleEn: "Pest Advisor", roleEs: "Asesora de Control de Plagas",
    },
    media: {
      hero: `${base("pest-control")}/hero.jpg`,
      gallery: [`${base("pest-control")}/gal1.jpg`, `${base("pest-control")}/gal2.jpg`, `${base("pest-control")}/gal3.jpg`, `${base("pest-control")}/gal4.jpg`, `${base("pest-control")}/gal5.jpg`, `${base("pest-control")}/gal6.jpg`],
      teamPortrait: `${base("pest-control")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Certified, professional technicians." },
        { icon: "Leaf", title: "Family & pet safe", blurb: "Effective treatments, safe for your home." },
        { icon: "Clock", title: "Same-day service", blurb: "Fast relief when pests show up." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Técnicos certificados y profesionales." },
        { icon: "Leaf", title: "Seguro para familia y mascotas", blurb: "Tratamientos efectivos y seguros." },
        { icon: "Clock", title: "Servicio el mismo día", blurb: "Alivio rápido cuando hay plagas." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Home perimeter treatment", "Termite inspection", "Rodent exclusion", "Ant & roach control", "Mosquito treatment", "Eco-friendly products"],
      es: ["Tratamiento del perímetro", "Inspección de termitas", "Control de roedores", "Hormigas y cucarachas", "Tratamiento de mosquitos", "Productos ecológicos"],
    },
  },

  "tree-service": {
    availability: { en: "Mon–Sat · 7am–6pm", es: "Lun–Sáb · 7am–6pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Need a tree trimmed or removed?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Necesita podar o quitar un árbol?",
      roleEn: "Tree Care Advisor", roleEs: "Asesora de Árboles",
    },
    media: {
      hero: `${base("tree-service")}/hero.jpg`,
      gallery: [`${base("tree-service")}/gal1.jpg`, `${base("tree-service")}/gal2.jpg`, `${base("tree-service")}/gal3.jpg`, `${base("tree-service")}/gal4.jpg`, `${base("tree-service")}/gal5.jpg`, `${base("tree-service")}/gal6.jpg`],
      teamPortrait: `${base("tree-service")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Safe work, fully covered." },
        { icon: "Clock", title: "24/7 storm response", blurb: "Emergency removal when it counts." },
        { icon: "DollarSign", title: "Free estimates", blurb: "Honest quotes, no surprises." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Trabajo seguro y cubierto." },
        { icon: "Clock", title: "Respuesta 24/7 ante tormentas", blurb: "Remoción de emergencia cuando importa." },
        { icon: "DollarSign", title: "Estimados gratis", blurb: "Cotizaciones honestas, sin sorpresas." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Large tree removal", "Professional trimming", "Stump grinding", "Storm cleanup", "Crown reduction", "Lot clearing"],
      es: ["Remoción de árbol grande", "Poda profesional", "Remoción de tocones", "Limpieza tras tormenta", "Reducción de copa", "Limpieza de terreno"],
    },
  },

  "fencing": {
    availability: { en: "Mon–Sat · 7am–6pm", es: "Lun–Sáb · 7am–6pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. What kind of fence are you planning?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Qué tipo de cerca está planeando?",
      roleEn: "Fencing Advisor", roleEs: "Asesora de Cercas",
    },
    media: {
      hero: `${base("fencing")}/hero.jpg`,
      gallery: [`${base("fencing")}/gal1.jpg`, `${base("fencing")}/gal2.jpg`, `${base("fencing")}/gal3.jpg`, `${base("fencing")}/gal4.jpg`, `${base("fencing")}/gal5.jpg`, `${base("fencing")}/gal6.jpg`],
      teamPortrait: `${base("fencing")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "BadgeCheck", title: "Custom-built to fit", blurb: "Designed for your yard and style." },
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Quality posts set to last." },
        { icon: "DollarSign", title: "Free estimates", blurb: "Clear quotes, no pressure." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "BadgeCheck", title: "Hecho a su medida", blurb: "Diseñado para su patio y estilo." },
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Postes de calidad para durar." },
        { icon: "DollarSign", title: "Estimados gratis", blurb: "Cotizaciones claras, sin presión." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["New wood privacy fence", "Vinyl fence install", "Aluminum & metal fence", "Custom gate build", "Chain-link fencing", "Finished backyard fence"],
      es: ["Cerca de madera nueva", "Instalación de cerca de vinil", "Cerca de aluminio y metal", "Portón a medida", "Cerca de malla", "Cerca de patio terminada"],
    },
  },

  "concrete": {
    availability: { en: "Mon–Sat · 7am–5pm", es: "Lun–Sáb · 7am–5pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Driveway, patio or something else?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Entrada, patio u otra cosa?",
      roleEn: "Concrete Advisor", roleEs: "Asesora de Concreto",
    },
    media: {
      hero: `${base("concrete")}/hero.jpg`,
      gallery: [`${base("concrete")}/gal1.jpg`, `${base("concrete")}/gal2.jpg`, `${base("concrete")}/gal3.jpg`, `${base("concrete")}/gal4.jpg`, `${base("concrete")}/gal5.jpg`, `${base("concrete")}/gal6.jpg`],
      teamPortrait: `${base("concrete")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "BadgeCheck", title: "Quality craftsmanship", blurb: "Smooth, durable, built to last." },
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Professional crews you can trust." },
        { icon: "DollarSign", title: "Free estimates", blurb: "Fair pricing, written quotes." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "BadgeCheck", title: "Trabajo de calidad", blurb: "Liso, durable y hecho para durar." },
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Equipos profesionales de confianza." },
        { icon: "DollarSign", title: "Estimados gratis", blurb: "Precio justo, cotización por escrito." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["New concrete driveway", "Stamped patio", "Sidewalk & walkway", "Foundation slab", "Decorative finish", "Finished pour"],
      es: ["Entrada de concreto nueva", "Patio estampado", "Acera y caminos", "Losa de cimiento", "Acabado decorativo", "Colado terminado"],
    },
  },

  "pressure-washing": {
    availability: { en: "Mon–Sat · 8am–6pm", es: "Lun–Sáb · 8am–6pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. What surface needs cleaning?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Qué superficie necesita limpieza?",
      roleEn: "Cleaning Advisor", roleEs: "Asesora de Limpieza",
    },
    media: {
      hero: `${base("pressure-washing")}/hero.jpg`,
      gallery: [`${base("pressure-washing")}/gal1.jpg`, `${base("pressure-washing")}/gal2.jpg`, `${base("pressure-washing")}/gal3.jpg`, `${base("pressure-washing")}/gal4.jpg`, `${base("pressure-washing")}/gal5.jpg`, `${base("pressure-washing")}/gal6.jpg`],
      teamPortrait: `${base("pressure-washing")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Sparkles", title: "Spotless results", blurb: "Like-new surfaces, every time." },
        { icon: "DollarSign", title: "Free quotes", blurb: "Fast, friendly pricing." },
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Safe for your property." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "Sparkles", title: "Resultados impecables", blurb: "Superficies como nuevas, siempre." },
        { icon: "DollarSign", title: "Cotizaciones gratis", blurb: "Precios rápidos y amables." },
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Seguro para su propiedad." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Driveway power wash", "House exterior wash", "Deck & patio cleaning", "Roof soft wash", "Sidewalk cleaning", "Before & after shine"],
      es: ["Lavado de entrada", "Lavado de fachada", "Limpieza de terraza", "Lavado suave de techo", "Limpieza de aceras", "Antes y después"],
    },
  },

  "garage-doors": {
    availability: { en: "Mon–Sat · 7am–7pm", es: "Lun–Sáb · 7am–7pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Broken spring or a new door?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Resorte roto o puerta nueva?",
      roleEn: "Garage Door Advisor", roleEs: "Asesora de Puertas",
    },
    media: {
      hero: `${base("garage-doors")}/hero.jpg`,
      gallery: [`${base("garage-doors")}/gal1.jpg`, `${base("garage-doors")}/gal2.jpg`, `${base("garage-doors")}/gal3.jpg`, `${base("garage-doors")}/gal4.jpg`, `${base("garage-doors")}/gal5.jpg`, `${base("garage-doors")}/gal6.jpg`],
      teamPortrait: `${base("garage-doors")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock", title: "Same-day repairs", blurb: "Fast fixes for springs and openers." },
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Safe, professional installs." },
        { icon: "DollarSign", title: "Free estimates", blurb: "Honest quotes on new doors." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "Clock", title: "Reparaciones el mismo día", blurb: "Arreglos rápidos de resortes y motores." },
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Instalaciones seguras y profesionales." },
        { icon: "DollarSign", title: "Estimados gratis", blurb: "Cotizaciones honestas en puertas nuevas." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["New garage door install", "Spring & cable repair", "Opener installation", "Custom carriage door", "Same-day repair", "Finished modern door"],
      es: ["Instalación de puerta nueva", "Reparación de resortes y cables", "Instalación de motor", "Puerta estilo carruaje", "Reparación el mismo día", "Puerta moderna terminada"],
    },
  },

  "welding": {
    availability: { en: "Mon–Sat · 7am–6pm", es: "Lun–Sáb · 7am–6pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Gates, railings or a repair?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Portones, barandas o una reparación?",
      roleEn: "Fabrication Advisor", roleEs: "Asesora de Fabricación",
    },
    media: {
      hero: `${base("welding")}/hero.jpg`,
      gallery: [`${base("welding")}/gal1.jpg`, `${base("welding")}/gal2.jpg`, `${base("welding")}/gal3.jpg`, `${base("welding")}/gal4.jpg`, `${base("welding")}/gal5.jpg`, `${base("welding")}/gal6.jpg`],
      teamPortrait: `${base("welding")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "BadgeCheck", title: "Custom fabrication", blurb: "Gates, railings and structural steel." },
        { icon: "Truck", title: "Mobile welding service", blurb: "On-site repairs where you need them." },
        { icon: "ShieldCheck", title: "Licensed & insured", blurb: "Strong, certified welds." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "BadgeCheck", title: "Fabricación a medida", blurb: "Portones, barandas y acero estructural." },
        { icon: "Truck", title: "Soldadura a domicilio", blurb: "Reparaciones en sitio donde las necesite." },
        { icon: "ShieldCheck", title: "Con licencia y seguro", blurb: "Soldaduras fuertes y certificadas." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Custom iron gate", "Steel railing fabrication", "Mobile welding repair", "Security door build", "Structural welding", "Finished metalwork"],
      es: ["Portón de hierro a medida", "Fabricación de barandas", "Soldadura móvil", "Puerta de seguridad", "Soldadura estructural", "Trabajo de metal terminado"],
    },
  },

  "catering": {
    availability: { en: "Tue–Sun · 9am–9pm", es: "Mar–Dom · 9am–9pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Tell me about your event and guest count.",
      es: "¡Hola! Gracias por contactar a {business}. Cuénteme de su evento y cuántos invitados.",
      roleEn: "Catering Advisor", roleEs: "Asesora de Catering",
    },
    media: {
      hero: `${base("catering")}/hero.jpg`,
      gallery: [`${base("catering")}/gal1.jpg`, `${base("catering")}/gal2.jpg`, `${base("catering")}/gal3.jpg`, `${base("catering")}/gal4.jpg`, `${base("catering")}/gal5.jpg`, `${base("catering")}/gal6.jpg`],
      teamPortrait: `${base("catering")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Truck", title: "Delivery & setup", blurb: "We bring the feast and set it up." },
        { icon: "Heart", title: "Made fresh to order", blurb: "Real recipes, generous portions." },
        { icon: "DollarSign", title: "Custom packages", blurb: "Menus to fit your event and budget." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "Truck", title: "Entrega e instalación", blurb: "Llevamos el banquete y lo montamos." },
        { icon: "Heart", title: "Hecho fresco al momento", blurb: "Recetas reales, porciones generosas." },
        { icon: "DollarSign", title: "Paquetes a su medida", blurb: "Menús para su evento y presupuesto." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Event buffet spread", "Taco bar catering", "Party trays", "Plated dinner service", "Dessert table", "Happy guests"],
      es: ["Buffet para eventos", "Barra de tacos", "Bandejas para fiestas", "Servicio de cena", "Mesa de postres", "Invitados felices"],
    },
  },

  "barber": {
    availability: { en: "Tue–Sun · 9am–7pm", es: "Mar–Dom · 9am–7pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Want to book a cut or a shave?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Quiere reservar un corte o afeitado?",
      roleEn: "Front Desk", roleEs: "Recepción",
    },
    media: {
      hero: `${base("barber")}/hero.jpg`,
      gallery: [`${base("barber")}/gal1.jpg`, `${base("barber")}/gal2.jpg`, `${base("barber")}/gal3.jpg`, `${base("barber")}/gal4.jpg`, `${base("barber")}/gal5.jpg`, `${base("barber")}/gal6.jpg`],
      teamPortrait: `${base("barber")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Clock", title: "Walk-ins welcome", blurb: "Drop by or book ahead online." },
        { icon: "Star", title: "Top-rated barbers", blurb: "Skilled with every style and fade." },
        { icon: "Sparkles", title: "Clean, modern shop", blurb: "A fresh, comfortable experience." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "Clock", title: "Sin cita, bienvenido", blurb: "Pase o reserve en línea." },
        { icon: "Star", title: "Barberos mejor calificados", blurb: "Expertos en todo estilo y fade." },
        { icon: "Sparkles", title: "Local limpio y moderno", blurb: "Una experiencia fresca y cómoda." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Classic fade", "Beard line-up", "Hot towel shave", "Kids' cuts", "Designs & details", "Fresh finish"],
      es: ["Fade clásico", "Perfilado de barba", "Afeitado con toalla caliente", "Cortes para niños", "Diseños y detalles", "Acabado fresco"],
    },
  },

  "nails": {
    availability: { en: "Mon–Sat · 9am–7pm", es: "Lun–Sáb · 9am–7pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. What service would you like to book?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Qué servicio le gustaría reservar?",
      roleEn: "Front Desk", roleEs: "Recepción",
    },
    media: {
      hero: `${base("nails")}/hero.jpg`,
      gallery: [`${base("nails")}/gal1.jpg`, `${base("nails")}/gal2.jpg`, `${base("nails")}/gal3.jpg`, `${base("nails")}/gal4.jpg`, `${base("nails")}/gal5.jpg`, `${base("nails")}/gal6.jpg`],
      teamPortrait: `${base("nails")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Sparkles", title: "Relaxing spa experience", blurb: "Unwind while we pamper you." },
        { icon: "ShieldCheck", title: "Clean & sanitized tools", blurb: "Hospital-grade hygiene every visit." },
        { icon: "Clock", title: "Walk-ins welcome", blurb: "Stop by or book your spot." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "Sparkles", title: "Experiencia spa relajante", blurb: "Relájese mientras la consentimos." },
        { icon: "ShieldCheck", title: "Herramientas esterilizadas", blurb: "Higiene de grado hospitalario." },
        { icon: "Clock", title: "Sin cita, bienvenida", blurb: "Pase o reserve su lugar." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Acrylic full set", "Gel manicure", "Spa pedicure", "Custom nail art", "Dip powder", "Pampered hands"],
      es: ["Set completo de acrílico", "Manicura en gel", "Pedicura spa", "Arte de uñas", "Polvo dip", "Manos consentidas"],
    },
  },

  "photography": {
    availability: { en: "By appointment · 7 days", es: "Con cita · 7 días" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. What kind of session are you planning?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Qué tipo de sesión está planeando?",
      roleEn: "Booking Advisor", roleEs: "Asesora de Reservas",
    },
    media: {
      hero: `${base("photography")}/hero.jpg`,
      gallery: [`${base("photography")}/gal1.jpg`, `${base("photography")}/gal2.jpg`, `${base("photography")}/gal3.jpg`, `${base("photography")}/gal4.jpg`, `${base("photography")}/gal5.jpg`, `${base("photography")}/gal6.jpg`],
      teamPortrait: `${base("photography")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Star", title: "Award-winning work", blurb: "A portfolio families love." },
        { icon: "BadgeCheck", title: "Edited high-res photos", blurb: "Professionally retouched galleries." },
        { icon: "Heart", title: "Capturing real moments", blurb: "Natural, heartfelt storytelling." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "Star", title: "Trabajo premiado", blurb: "Un portafolio que las familias adoran." },
        { icon: "BadgeCheck", title: "Fotos en alta resolución", blurb: "Galerías retocadas profesionalmente." },
        { icon: "Heart", title: "Capturamos momentos reales", blurb: "Historias naturales y con sentimiento." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Wedding photography", "Quinceañera portraits", "Family sessions", "Newborn shoot", "Event coverage", "Studio portraits"],
      es: ["Fotografía de bodas", "Retratos de quinceañera", "Sesiones familiares", "Sesión de recién nacido", "Cobertura de eventos", "Retratos de estudio"],
    },
  },

  "auto-detailing": {
    availability: { en: "Mon–Sat · 8am–6pm", es: "Lun–Sáb · 8am–6pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Want a wash, full detail or ceramic coating?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Lavado, detallado completo o recubrimiento cerámico?",
      roleEn: "Detailing Advisor", roleEs: "Asesora de Detallado",
    },
    media: {
      hero: `${base("auto-detailing")}/hero.jpg`,
      gallery: [`${base("auto-detailing")}/gal1.jpg`, `${base("auto-detailing")}/gal2.jpg`, `${base("auto-detailing")}/gal3.jpg`, `${base("auto-detailing")}/gal4.jpg`, `${base("auto-detailing")}/gal5.jpg`, `${base("auto-detailing")}/gal6.jpg`],
      teamPortrait: `${base("auto-detailing")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Sparkles", title: "Showroom shine", blurb: "Inside and out, like new again." },
        { icon: "Truck", title: "We come to you", blurb: "Fully mobile — home or office." },
        { icon: "ShieldCheck", title: "Ceramic coating specialists", blurb: "Long-lasting gloss and protection." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "Sparkles", title: "Brillo de exhibición", blurb: "Por dentro y por fuera, como nuevo." },
        { icon: "Truck", title: "Vamos a usted", blurb: "Totalmente móvil — casa u oficina." },
        { icon: "ShieldCheck", title: "Especialistas en cerámico", blurb: "Brillo y protección duraderos." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Showroom-shine exterior", "Deep interior clean", "Ceramic coating", "Paint correction", "Headlight restoration", "Engine bay detail"],
      es: ["Brillo de exhibición", "Limpieza interior profunda", "Recubrimiento cerámico", "Corrección de pintura", "Restauración de faros", "Detallado de motor"],
    },
  },
  glass: {
    availability: { en: "Mon–Sat · 7am–5pm", es: "Lun–Sáb · 7am–5pm" },
    assistant: {
      name: "Sofía",
      en: "Hi! Thanks for contacting {business}. Do you need windows, mirrors, a glass shower or railings? And what part of Costa Rica are you in?",
      es: "¡Hola! Gracias por contactar a {business}. ¿Necesita ventanas, espejos, mampara de baño o barandas? ¿Y en qué parte de Costa Rica se encuentra?",
      roleEn: "Glass Advisor", roleEs: "Asesora de Vidrio",
    },
    media: {
      hero: `${base("glass")}/hero.jpg`,
      gallery: [`${base("glass")}/gal1.jpg`, `${base("glass")}/gal2.jpg`, `${base("glass")}/gal3.jpg`, `${base("glass")}/gal4.jpg`, `${base("glass")}/gal5.jpg`, `${base("glass")}/gal6.jpg`],
      teamPortrait: `${base("glass")}/team.jpg`,
    },
    offers: {
      en: [
        { icon: "Truck", title: "We go anywhere in Costa Rica", blurb: "Based in San José, serving the whole country." },
        { icon: "Sparkles", title: "Custom mirrors & glass", blurb: "Cut to any size and shape you need." },
        { icon: "ShieldCheck", title: "Installed & guaranteed", blurb: "Fitted by our own crew, work guaranteed." },
        { icon: "Languages", title: "Bilingual EN/ES", blurb: "We serve you in your language." },
      ],
      es: [
        { icon: "Truck", title: "Vamos a todo Costa Rica", blurb: "En San José, atendemos todo el país." },
        { icon: "Sparkles", title: "Espejos y vidrio a medida", blurb: "Cortados al tamaño y forma que necesite." },
        { icon: "ShieldCheck", title: "Instalado y garantizado", blurb: "Instalado por nuestro equipo, trabajo garantizado." },
        { icon: "Languages", title: "Bilingüe EN/ES", blurb: "Le atendemos en su idioma." },
      ],
    },
    galleryCaptions: {
      en: ["Floor-to-ceiling home windows", "Frameless glass shower & mirror", "Cut & measured to size", "Tempered glass railing", "Custom decorative mirror wall", "Commercial glass storefront"],
      es: ["Ventanas de piso a techo", "Mampara sin marco y espejo", "Cortado y medido a la medida", "Baranda de vidrio templado", "Espejo decorativo a medida", "Vitrina comercial de vidrio"],
    },
    clientTrust: {
      title: { en: "Trusted in homes across Costa Rica", es: "De confianza en hogares de todo Costa Rica" },
      blurb: { en: "Real families and businesses, from San José to the coast — measured, installed and left spotless.", es: "Familias y negocios reales, de San José a la costa — medido, instalado y dejado impecable." },
      images: [
        { src: `${base("glass")}/trust1.jpg`, caption: { en: "Happy homeowner with new windows", es: "Cliente feliz con sus ventanas nuevas" } },
        { src: `${base("glass")}/trust2.jpg`, caption: { en: "Choosing a custom mirror together", es: "Eligiendo un espejo a medida juntos" } },
        { src: `${base("glass")}/team.jpg`, caption: { en: "Our crew travels countrywide", es: "Nuestro equipo viaja por todo el país" } },
      ],
    },
  },
};
