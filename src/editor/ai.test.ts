import { describe, expect, it } from "vitest";
import { getTemplate } from "@/templates";
import type { BusinessTemplate } from "@/templates/types";
import { aiSite, applyAiEdits } from "./ai";

const barber = getTemplate("barber")!;

describe("the editor AI's changes", () => {
  it("applies text, colors, prices and photo swaps the site can take", () => {
    const [, second] = barber.media!.gallery;
    const { tpl, skipped } = applyAiEdits(barber, [
      { path: ["content", "es", "hero", "title1"], value: "Cortes con estilo" },
      { path: ["brand", "palette"], value: { primary: "#1D4ED8", heroGlow1: "rgba(29,78,216,0.45)" } },
      { path: ["media", "hero"], value: second },
      { path: ["offers", "es", 0, "title"], value: "Corte: ₡6 000" },
      { path: ["brand", "socials"], value: { facebook: "https://facebook.com/barberia" } },
      { path: ["brand", "phone"], value: "8888 1234" },
    ]);
    expect(skipped).toBe(0);
    expect(tpl.content.es.hero.title1).toBe("Cortes con estilo");
    expect(tpl.brand.palette.primary).toBe("#1D4ED8");
    expect(tpl.brand.palette.accent).toBe(barber.brand.palette.accent); // objects merge
    expect(tpl.media!.hero).toBe(second);
    expect(tpl.offers!.es[0].title).toBe("Corte: ₡6 000");
    expect(tpl.brand.socials?.facebook).toBe("https://facebook.com/barberia");
    expect(tpl.brand).toMatchObject({ phone: "+506 8888-1234", phoneHref: "tel:+50688881234" });
  });

  it("replaces a whole list, so items can be removed or added", () => {
    const items = [{ title: "Solo cortes", blurb: "Cortes y fades." }];
    const { tpl, skipped } = applyAiEdits(barber, [{ path: ["content", "es", "services", "items"], value: items }]);
    expect(skipped).toBe(0);
    expect(tpl.content.es.services.items).toEqual(items);
  });

  it("skips what would break the page, invent a photo or touch staff-only fields", () => {
    const nested = {
      ...barber,
      offers: { en: [{ title: "A", blurb: "B", features: ["x"] }], es: [{ title: "A", blurb: "B", features: ["x"] }] },
    } as unknown as BusinessTemplate;
    const { tpl, skipped } = applyAiEdits(nested, [
      { path: ["media", "hero"], value: "https://images.unsplash.com/photo-123" }, // a photo the site does not have
      { path: ["brand", "palette", "primary"], value: "azul" }, // not a color
      { path: ["content", "es", "services", "items"], value: "Cortes" }, // a list turned into text
      { path: ["offers", "es"], value: [{ title: "Sin lista" }] }, // item lost its nested list
      { path: ["contentConfirmed"], value: true }, // only staff confirm reviews are true
      { path: ["brand", "phoneHref"], value: "tel:123" }, // rebuilt from the phone
      { path: ["__proto__", "polluted"], value: "x" },
    ]);
    expect(skipped).toBe(7);
    expect(tpl).toBe(nested);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it("gives the AI a place for captions but nothing staff-only", () => {
    const site = aiSite({ ...barber, galleryCaptions: undefined, contentConfirmed: true });
    expect(site.galleryCaptions).toEqual({ en: [], es: [] });
    expect(site).not.toHaveProperty("contentConfirmed");
  });
});
