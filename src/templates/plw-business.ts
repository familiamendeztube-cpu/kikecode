import { Car, Dumbbell, House, ShoppingBag, Stethoscope, Store, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { BusinessTemplate } from "./types";
import { tourismBrand, tourismContent } from "./tourism-shared";

/*
  PLW website samples for the business types beyond tourism, plus `plw-business`,
  the generic one a PLW draft with an unknown slug falls back to. They render
  through the tourism demo site (siteVariant "tourism"): only the copy, the icon
  and the calls to action change per type, so they live together in this table
  instead of one near-identical file each.

  Same honesty rule as the tourism templates: every fact about the business comes
  from the draft (overrides.tourismDemo); this file holds only neutral copy, with
  no prices, hours or claims a business could contradict. No stock photos either:
  until PLW approves images for a draft, its hero is plain.
*/

type Kind = {
  slug: string;
  industry: string;
  industryEs: string;
  icon: LucideIcon;
  /** Sample name shown only when the template is previewed without a draft. */
  name: string;
  eyebrow: string;
  title1: string;
  title2: string;
  servicesTitle: string;
  servicesBlurb: string;
  contactTitle: string;
  contactBlurb: string;
  defaultServices: string;
  plwSite: NonNullable<BusinessTemplate["plwSite"]>;
};

const KINDS: Kind[] = [
  {
    slug: "plw-restaurant", industry: "Restaurant", industryEs: "Restaurante / soda", icon: UtensilsCrossed,
    name: "Restaurante Costa Rica", eyebrow: "Restaurante", title1: "Su mesa", title2: "lo espera",
    servicesTitle: "Menú y servicios",
    servicesBlurb: "Esto es lo que ofrecemos. Escríbanos para reservar una mesa o hacer su pedido.",
    contactTitle: "Reserve o haga su pedido",
    contactBlurb: "Escríbanos o llámenos y le confirmamos su reservación o su pedido.",
    defaultServices: "Almuerzos, Desayunos, Comida para llevar, Pedidos a domicilio",
    plwSite: {
      ctas: [
        { label: "Reservar mesa", message: "¡Hola! Quisiera reservar una mesa." },
        { label: "Hacer un pedido", message: "¡Hola! Quisiera hacer un pedido." },
      ],
      chatTopics: "el menú, las reservaciones o cómo contactarnos",
    },
  },
  {
    slug: "plw-clinic", industry: "Clinic", industryEs: "Clínica", icon: Stethoscope,
    name: "Clínica Costa Rica", eyebrow: "Clínica", title1: "Atención cercana,", title2: "con cita previa",
    servicesTitle: "Servicios de la clínica",
    servicesBlurb: "Estos son los servicios que ofrecemos. Escríbanos para agendar su cita.",
    contactTitle: "Agende su cita",
    contactBlurb: "Escríbanos o llámenos y le confirmamos el día y la hora de su cita.",
    defaultServices: "Consulta general, Odontología, Veterinaria, Exámenes",
    plwSite: {
      ctas: [{ label: "Agendar una cita", message: "¡Hola! Quisiera agendar una cita." }],
      chatTopics: "los servicios, las citas o cómo contactarnos",
    },
  },
  {
    slug: "plw-shop", industry: "Shop", industryEs: "Tienda", icon: ShoppingBag,
    name: "Tienda Costa Rica", eyebrow: "Tienda", title1: "Lo que busca,", title2: "cerca de usted",
    servicesTitle: "Productos y servicios",
    servicesBlurb: "Esto es lo que ofrecemos. Escríbanos para consultar disponibilidad.",
    contactTitle: "Consulte disponibilidad",
    contactBlurb: "Escríbanos qué busca y le confirmamos si lo tenemos.",
    defaultServices: "Productos, Encargos, Envíos",
    plwSite: {
      ctas: [{ label: "Consultar disponibilidad", message: "¡Hola! Quisiera consultar la disponibilidad de un producto." }],
      chatTopics: "los productos, la disponibilidad o cómo contactarnos",
    },
  },
  {
    slug: "plw-gym", industry: "Gym", industryEs: "Gimnasio", icon: Dumbbell,
    name: "Gimnasio Costa Rica", eyebrow: "Gimnasio", title1: "Entrene", title2: "a su ritmo",
    servicesTitle: "Clases y servicios",
    servicesBlurb: "Esto es lo que ofrecemos. Escríbanos para agendar una clase de prueba.",
    contactTitle: "Agende su clase de prueba",
    contactBlurb: "Escríbanos y le confirmamos el día y la hora de su clase.",
    defaultServices: "Pesas, Clases grupales, Entrenamiento personal",
    plwSite: {
      ctas: [{ label: "Agendar clase de prueba", message: "¡Hola! Quisiera agendar una clase de prueba." }],
      chatTopics: "las clases, la clase de prueba o cómo contactarnos",
    },
  },
  {
    slug: "plw-real-estate", industry: "Real estate", industryEs: "Bienes raíces", icon: House,
    name: "Bienes Raíces Costa Rica", eyebrow: "Bienes raíces", title1: "Su próximo lugar", title2: "empieza aquí",
    servicesTitle: "Propiedades y servicios",
    servicesBlurb: "Esto es lo que ofrecemos. Escríbanos para agendar una visita.",
    contactTitle: "Agende una visita",
    contactBlurb: "Escríbanos qué busca y coordinamos una visita.",
    defaultServices: "Venta de propiedades, Alquileres, Lotes",
    plwSite: {
      ctas: [{ label: "Agendar una visita", message: "¡Hola! Quisiera agendar una visita a una propiedad." }],
      chatTopics: "las propiedades, las visitas o cómo contactarnos",
    },
  },
  {
    slug: "plw-auto", industry: "Auto shop or dealership", industryEs: "Taller o agencia de autos", icon: Car,
    name: "Autos Costa Rica", eyebrow: "Taller y autos", title1: "Su carro,", title2: "en buenas manos",
    servicesTitle: "Servicios y vehículos",
    servicesBlurb: "Esto es lo que ofrecemos. Escríbanos para agendar una cita o cotizar un vehículo.",
    contactTitle: "Agende o cotice",
    contactBlurb: "Escríbanos y le respondemos con su cita o su cotización.",
    defaultServices: "Mantenimiento, Mecánica general, Venta de vehículos",
    plwSite: {
      ctas: [
        { label: "Agendar cita", message: "¡Hola! Quisiera agendar una cita para mi carro." },
        { label: "Cotizar vehículo", message: "¡Hola! Quisiera cotizar un vehículo." },
      ],
      chatTopics: "los servicios, las citas o cómo contactarnos",
    },
  },
  {
    slug: "plw-business", industry: "Local business", industryEs: "Negocio local", icon: Store,
    name: "Negocio Costa Rica", eyebrow: "Negocio local", title1: "Atención directa,", title2: "a un mensaje de distancia",
    servicesTitle: "Nuestros servicios",
    servicesBlurb: "Esto es lo que ofrecemos. Escríbanos para más información.",
    contactTitle: "Contáctenos",
    contactBlurb: "Escríbanos o llámenos y le respondemos con los detalles.",
    defaultServices: "Servicios",
    plwSite: {
      ctas: [{ label: "Contáctenos", message: "¡Hola! Quisiera más información." }],
      chatTopics: "los servicios o cómo contactarnos",
    },
  },
];

function plwTemplate(k: Kind): BusinessTemplate {
  const same = (s: string) => ({ en: s, es: s });
  const base = tourismContent({
    noun: same(k.eyebrow),
    servicesTitle: same(k.servicesTitle),
    servicesBlurb: same(k.servicesBlurb),
    subtitle: same(`${k.title1} ${k.title2}`),
    navExplore: same("Servicios"),
    exploreAnchor: "services",
  }).es;
  // Spanish only; nothing tourism-specific left behind (why/process/FAQ items are not rendered).
  const es = {
    ...base,
    hero: {
      ...base.hero, eyebrow: k.eyebrow, title1: k.title1, title2: k.title2,
      cta1: k.plwSite.ctas[0].label, cta2: k.plwSite.ctas[1]?.label ?? "Ver servicios",
      trustTitle: "", trustSubtitle: "",
    },
    why: { title: "", items: [] },
    process: { title: "", items: [] },
    faq: { title: "Preguntas frecuentes", items: [] },
    contact: { ...base.contact, title: k.contactTitle, blurb: k.contactBlurb, message: "Su mensaje" },
    footer: { ...base.footer, tagline: "" },
  };
  return {
    slug: k.slug,
    siteVariant: "tourism",
    lockedLang: "es",
    industry: k.industry,
    industryEs: k.industryEs,
    websiteType: `${k.industry} Website`,
    defaultServicesField: k.defaultServices,
    brand: { ...tourismBrand({ name: k.name, city: "San José", phone: "", phoneHref: "", logo: "" }), heroIcon: k.icon },
    serviceIcons: [k.icon],
    whyIcons: [k.icon],
    realBusiness: true,
    plwSite: k.plwSite,
    tourismDemo: { services: [], highlight: "" },
    content: { en: es, es },
  };
}

/** Every PLW sample type that isn't tourism; `plw-business` is the generic fallback. */
export const PLW_BUSINESS_TEMPLATES = KINDS.map(plwTemplate);
export const PLW_GENERIC_SLUG = "plw-business";
