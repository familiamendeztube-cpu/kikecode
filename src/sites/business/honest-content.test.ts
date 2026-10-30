import { describe, expect, it } from "vitest";
import { brandFields, sitePayload } from "@/editor/save";
import { rebuildTemplate, type SavedSite } from "@/lib/saved-site";
import { getTemplate, TEMPLATES } from "@/templates";
import { isSampleContent } from "./ui";

/*
  A client's site must not invent reviews, ratings or promises. The shared
  site code may only show reviews and claims from the site's content, and on a
  generic template those carry a visible Sample tag until staff confirm them
  with the business (contentConfirmed).
*/

/** Every source file under src/sites, as text. */
const SOURCES = import.meta.glob(["../**/*.ts", "../**/*.tsx", "!../**/*.test.ts"], {
  query: "?raw", import: "default", eager: true,
}) as Record<string, string>;

/** Invented by the site code itself, not by anyone's content. */
const FABRICATED = [
  /\b\d{2,}\+ (verified )?(reviews|reseñas)/i,
  /verified reviews|reseñas verificadas/i,
  /Verified \$\{platform\}|Reseña verificada/i,
  /EXTRA_REVIEWS|REVIEW_PLATFORMS|REVIEW_DATES/,
  /real person answers 24\/7|team member answers 24\/7|persona real[^"]*contesta 24\/7/i,
  /Licensed, insured|Con licencia, seguro y orgullosamente/i,
  /24-hour AI assistant|Asistente IA disponible 24 horas|Asistente IA 24\/7|24\/7 AI assistant/i,
  /Online now|Conectada ahora/i,
  /no robots, no bots|sin robots, sin bots/i,
  /Same-day and urgent service available|Servicio el mismo día y urgencias disponibles/i,
  /The other guys|Los demás<\/?/,
];

describe("site code", () => {
  it("invents no rating, verified review, competitor comparison or unverifiable promise", () => {
    expect(Object.keys(SOURCES).length).toBeGreaterThan(20);
    const offenders = Object.entries(SOURCES).flatMap(([file, text]) =>
      FABRICATED.filter((pattern) => pattern.test(text)).map((pattern) => `${file}: ${pattern}`));
    expect(offenders).toEqual([]);
  });
});

describe("sample reviews and claims", () => {
  const generic = getTemplate("barber")!;
  const real = TEMPLATES.find((t) => t.realBusiness)!;

  it("are samples on a generic template until staff confirm them, never on a real business's own", () => {
    expect(isSampleContent(generic)).toBe(true);
    expect(isSampleContent({ ...generic, contentConfirmed: true })).toBe(false);
    expect(isSampleContent(real)).toBe(false);
  });

  it("keep the staff confirmation through a save and a reload", () => {
    const confirmed = { ...generic, contentConfirmed: true };
    const saved = JSON.parse(JSON.stringify({ id: "11111111-1111-4111-8111-111111111111", ...sitePayload("barber", brandFields(generic.brand), confirmed) })) as SavedSite;
    expect(isSampleContent(rebuildTemplate(generic, saved, true))).toBe(false);
    const unconfirmed = JSON.parse(JSON.stringify({ id: "x", ...sitePayload("barber", brandFields(generic.brand), generic) })) as SavedSite;
    expect(isSampleContent(rebuildTemplate(generic, unconfirmed, true))).toBe(true);
  });
});
