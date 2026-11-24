import { describe, expect, it } from "vitest";
import { brandFields, sitePayload } from "@/editor/save";
import { rebuildTemplate, type SavedSite } from "@/lib/saved-site";
import { getTemplate, templateVersion, TEMPLATES } from "@/templates";

/*
  Saved sites name their template by slug and render through today's code. A
  deploy must never break a site saved earlier: no slug may disappear, and a
  site saved from any template must load back (and, published, keep its forms
  live; previewed, keep them off).
*/

/**
 * Every slug a site may have been saved with. Add new templates here; never
 * remove one while a site in kike_sites uses it (check with
 * `select slug, count(*) from kike_sites group by slug` first).
 */
const SAVED_SLUGS = [
  "auto", "auto-detailing", "auto-servicio-rym", "bakery", "barber", "barro-ceramica", "beauty", "catering",
  "chales-garage", "cleaning", "concrete", "construction", "electrician", "events", "fencing", "flooring",
  "garage-doors", "glass", "handyman", "hvac", "hyperion-synthetic-turf", "landscaping", "los-primos-plumbing",
  "lumina-studio", "moving", "nails", "nicaraguan-restaurant", "painting", "pest-control", "photography",
  "plw-auto", "plw-business", "plw-clinic", "plw-gym", "plw-real-estate", "plw-restaurant", "plw-shop",
  "plw-tourism-stays", "plw-tourism-tours", "pool-service", "pressure-washing", "restaurant", "roofing", "snuvalys-construccions", "suplidora-fenix",
  "tamarindo-tours-discovery", "tree-service", "welding",
];

describe("template registry", () => {
  it("still has every slug a saved site may use", () => {
    for (const slug of SAVED_SLUGS) expect(getTemplate(slug), slug).not.toBeNull();
  });

  it("lists every registered slug above, so removing one later is caught", () => {
    expect(TEMPLATES.map((t) => t.slug).sort()).toEqual([...SAVED_SLUGS].sort());
  });

  it("gives every template a positive integer version", () => {
    for (const t of TEMPLATES) expect(Number.isInteger(templateVersion(t.slug)) && templateVersion(t.slug) > 0).toBe(true);
  });
});

/*
  Every client is Costa Rican. Only the real US businesses (defaultLang "en")
  keep their own US data, as the owner decided on 2026-11-09.
*/
/*
  Costa Rican businesses that sell to foreign tourists open in English and
  price in US dollars ("US$600"), as they charge (owner decision 2026-11-24).
  Their phone and address are still Costa Rican.
*/
const FOR_TOURISTS = ["tamarindo-tours-discovery"];

describe("Costa Rican templates", () => {
  const costaRican = TEMPLATES.filter((t) => t.defaultLang !== "en" || FOR_TOURISTS.includes(t.slug));
  // The PLW samples start with no public phone: the draft adds the
  // client's confirmed number when it is saved.
  const NO_PHONE_YET = TEMPLATES.filter((t) => t.slug.startsWith("plw-")).map((t) => t.slug);

  it("open in Spanish, except the real US businesses", () => {
    expect(TEMPLATES.filter((t) => t.defaultLang === "en" && !FOR_TOURISTS.includes(t.slug)).map((t) => t.slug).sort())
      .toEqual(["hyperion-synthetic-turf", "los-primos-plumbing", "nicaraguan-restaurant"]);
  });

  it.each(costaRican.map((t) => [t.slug, t] as const))("%s has a Costa Rican phone, address and prices", (_slug, t) => {
    if (NO_PHONE_YET.includes(t.slug)) {
      expect(t.brand.phone).toBe("");
      expect(t.brand.phoneHref).toBe("");
    } else {
      expect(t.brand.phone).toMatch(/^\+506 \d{4}-\d{4}$/);
      expect(t.brand.phoneHref).toBe(`tel:+506${t.brand.phone.slice(5).replace("-", "")}`);
    }
    // No US ZIP code or state abbreviation ("Miami, FL 33135").
    expect(`${t.brand.address} | ${t.brand.city}`).not.toMatch(/\b\d{5}\b|, [A-Z]{2}\b/);
    // A tourist business's "US$600" is its real price; a bare "$600" still fails.
    const text = JSON.stringify(t).replace(FOR_TOURISTS.includes(t.slug) ? /US\$[\d,.]+/g : /(?!)/g, "");
    // Colones, not dollars; metric units; no US sample numbers.
    expect(text).not.toMatch(/\$ ?\d|DollarSign|\(555\)|555-01|\d ?(miles?|mi)\b|°F|\bsq\.? ?ft\b|square f(ee|oo)t/i);
  });
});

describe("a saved site from every template", () => {
  it.each(TEMPLATES.map((t) => [t.slug, t] as const))("%s loads back from what the editor saves", (_slug, base) => {
    const payload = sitePayload(base.slug, brandFields({ ...base.brand, name: "Negocio de Prueba" }), base);
    // What kike-sites stores and returns: JSON, with the site id added.
    const saved = JSON.parse(JSON.stringify({ id: "11111111-1111-4111-8111-111111111111", ...payload })) as SavedSite;
    expect(saved.template_version).toBe(templateVersion(base.slug));

    const published = rebuildTemplate(base, saved, true);
    expect(published.brand.name).toBe("Negocio de Prueba");
    expect(published.content).toEqual(JSON.parse(JSON.stringify(base.content)));
    expect(published.plwSiteId).toBe(saved.id);

    const preview = rebuildTemplate(base, saved, false);
    expect(preview.plwSiteId).toBeUndefined();
  });
});
