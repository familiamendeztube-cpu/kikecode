import painting from "./painting";
import handyman from "./handyman";
import landscaping from "./landscaping";
import cleaning from "./cleaning";
import auto from "./auto";
import restaurant from "./restaurant";
import beauty from "./beauty";
import events from "./events";
import moving from "./moving";
import bakery from "./bakery";
import construction from "./construction";
import nicaraguanRestaurant from "./nicaraguan-restaurant";
import hyperionSyntheticTurf from "./hyperion-synthetic-turf";
import losPrimosPlumbing from "./los-primos-plumbing";
import chalesGarage from "./chales-garage";
import roofing from "./roofing";
import hvac from "./hvac";
import electrician from "./electrician";
import flooring from "./flooring";
import poolService from "./pool-service";
import pestControl from "./pest-control";
import treeService from "./tree-service";
import fencing from "./fencing";
import concrete from "./concrete";
import pressureWashing from "./pressure-washing";
import garageDoors from "./garage-doors";
import welding from "./welding";
import catering from "./catering";
import barber from "./barber";
import nails from "./nails";
import photography from "./photography";
import autoDetailing from "./auto-detailing";
import glass from "./glass";
import luminaStudio from "./lumina-studio";
import barroCeramica from "./barro-ceramica";
import autoServicioRym from "./auto-servicio-rym";
import suplidoraFenix from "./suplidora-fenix";
import { ENRICHMENTS } from "./enrichments";
import type { BusinessTemplate } from "./types";

// Brand name + city overrides must match the names baked into the prerecorded
// MP3 greetings in enrichments.ts (otherwise the page would show one brand
// while the audio says another).
const BRAND_OVERRIDES: Record<string, { name: string; city: string }> = {
  painting:    { name: "Carlos Painting",       city: "Los Angeles, CA" },
  handyman:    { name: "Hernandez Handyman",    city: "Houston, TX" },
  landscaping: { name: "Verde Landscaping",     city: "Hollywood, CA" },
  cleaning:    { name: "Brilla Cleaning",       city: "San Antonio, TX" },
  auto:        { name: "Ramirez Auto Repair",   city: "Houston, TX" },
  restaurant:  { name: "La Cocina Bistro",      city: "San Antonio, TX" },
  beauty:      { name: "Bella Beauty Studio",   city: "Orlando, FL" },
  events:      { name: "Fiesta Events Decor",   city: "Miami, FL" },
  moving:      { name: "Mudanza Moving",        city: "Bronx, NY" },
  bakery:      { name: "Dulce Bakery",          city: "Miami, FL" },
};

function enrich(t: BusinessTemplate): BusinessTemplate {
  const e = ENRICHMENTS[t.slug];
  if (!e) return t;
  const bo = BRAND_OVERRIDES[t.slug];
  return {
    ...t,
    brand: {
      ...t.brand,
      ...(bo ? { name: bo.name, city: bo.city } : {}),
      ...(e.phone ? { phone: e.phone } : {}),
      ...(e.phoneHref ? { phoneHref: e.phoneHref } : {}),
      ...(e.phoneAlt ? { phoneAlt: e.phoneAlt } : {}),
      ...(e.phoneAltHref ? { phoneAltHref: e.phoneAltHref } : {}),
      ...(e.address ? { address: e.address } : {}),
      ...(e.email ? { email: e.email } : {}),
    },
    media: e.media,
    assistant: e.assistant,
    availability: e.availability,
    offers: e.offers,
    galleryCaptions: e.galleryCaptions,
    videoGallery: e.videoGallery,
    transformation: e.transformation,
    clientTrust: e.clientTrust,
    projectSelector: e.projectSelector,
    inventory: e.inventory,
  };
}

const RAW: BusinessTemplate[] = [
  chalesGarage,
  hyperionSyntheticTurf,
  losPrimosPlumbing,
  nicaraguanRestaurant,
  painting, handyman, landscaping, cleaning, auto,
  restaurant, beauty, events, moving, bakery, construction,
  roofing, hvac, electrician, flooring,
  poolService, pestControl, treeService, fencing,
  concrete, pressureWashing, garageDoors, welding,
  catering, barber, nails, photography, autoDetailing, glass,
  luminaStudio, barroCeramica, autoServicioRym, suplidoraFenix,
];

export const TEMPLATES: BusinessTemplate[] = RAW.map(enrich);

const BY_SLUG: Record<string, BusinessTemplate> = Object.fromEntries(
  TEMPLATES.map((t) => [t.slug, t])
);

export function getTemplate(slug: string): BusinessTemplate | null {
  return BY_SLUG[slug] ?? null;
}

export type { BusinessTemplate } from "./types";
