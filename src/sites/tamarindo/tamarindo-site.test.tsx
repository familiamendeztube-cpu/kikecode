import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { getTemplate } from "@/templates";
import type { BusinessTemplate } from "@/templates/types";
import { brandFields, sitePayload } from "@/editor/save";
import TamarindoSite from "./tamarindo-site";
import { usd } from "./quote";

const base = getTemplate("tamarindo-tours-discovery")!;
const TOKEN = "a".repeat(64);
const SITE_ID = "11111111-1111-4111-8111-111111111111";
const html = (template: BusinessTemplate = base, draftToken?: string) =>
  renderToStaticMarkup(<TamarindoSite template={template} draftToken={draftToken} />).replace(/<!-- -->/g, "");
/** What a visitor reads: headings are split into word spans, so match on the text. */
const text = (page: string) => page.replace(/<[^>]+>/g, "").replaceAll("&amp;", "&").replaceAll("&#x27;", "'");

describe("the Tamarindo site", () => {
  it("opens in English with every tour", () => {
    const page = text(html());
    for (const tour of base.tours!) expect(page).toContain(tour.title.en);
    expect(page).toContain("US$1,000");
  });

  it("writes the whole boat's price the way each language does", () => {
    expect(usd(1000, "en")).toBe("US$1,000");
    expect(usd(1000, "es")).toBe("US$1 000");
    expect(usd(600, "es")).toBe("US$600");
  });

  it("gives a draft's preview link the live Secretaria demo", () => {
    const page = html(base, TOKEN);
    expect(page).toContain(`/preview/${TOKEN}/secretaria`);
    expect(page).not.toContain("The AI Secretary goes here");
  });

  it("invites visitors to call once published: no demo, and the form is live", () => {
    const page = html({ ...base, plwSiteId: SITE_ID });
    expect(text(page)).toContain("Ask about your trip, any hour");
    expect(page).toContain(`href="${base.brand.phoneHref}"`);
    expect(page).not.toContain("/secretaria");
    expect(page).not.toContain("this form is not active yet");
  });

  it("tells staff where the Secretaria goes, and says an unpublished form sends nothing", () => {
    const page = html();
    expect(page).toContain("The AI Secretary goes here");
    expect(page).toContain("Preview: this form is not active yet, so messages are not sent. This feature comes with our full version.");
  });

  it("lists Secretaria's languages and puts the FAQ after the contact section", () => {
    const page = html(base, TOKEN);
    expect(text(page)).toContain("Speaks Spanish, English, Mandarin, French, German, etc.");
    expect(page.indexOf('id="faq"')).toBeGreaterThan(page.indexOf('id="contact"'));
  });

  it("saves the tours, with prices, where PLW's Secretaria IA reads a draft's services", () => {
    const tours = [...base.tours!];
    tours[1] = { ...tours[1], priceUsd: 1200 }; // an editor change to a price
    const saved = sitePayload(base.slug, brandFields(base.brand), { ...base, tours });
    // PLW's kikeDraft.ts reads content.es.services.items[].title (80 characters each).
    const services = saved.content.es.services.items.map((s) => s.title);
    expect(services).toContain("Pesca en altamar (desde US$1 200 el bote, hasta 5 personas)");
    expect(services).toContain("Tour privado a la medida (desde US$600 el bote)");
    expect(services.every((s) => s.length <= 80)).toBe(true);
    expect(saved.content.es.faq.items.map((f) => f.q)).toContain("¿Qué incluye?");
    expect(saved.overrides).toMatchObject({ tours, tourPricing: base.tourPricing });
  });

  it("has no Secretaria section when the site has it off", () => {
    expect(html({ ...base, secretaria: false }, TOKEN)).not.toContain('id="secretaria"');
  });

  it("never calls a request a booking, in either language", () => {
    for (const lang of ["en", "es"] as const) {
      const page = html({ ...base, defaultLang: lang, plwSiteId: SITE_ID });
      expect(page).not.toMatch(/\bbooked\b|booking (is )?confirmed|reserva confirmada|queda reservad/i);
    }
  });
});
