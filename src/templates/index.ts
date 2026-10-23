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
import type { BusinessTemplate } from "./types";

export const TEMPLATES: BusinessTemplate[] = [
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

const BY_SLUG: Record<string, BusinessTemplate> = Object.fromEntries(
  TEMPLATES.map((t) => [t.slug, t])
);

export function getTemplate(slug: string): BusinessTemplate | null {
  return BY_SLUG[slug] ?? null;
}

export type { BusinessTemplate } from "./types";
