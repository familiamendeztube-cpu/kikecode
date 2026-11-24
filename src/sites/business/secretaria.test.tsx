import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { getTemplate } from "@/templates";
import type { BusinessTemplate } from "@/templates/types";
import { rebuildTemplate, type SavedSite } from "@/lib/saved-site";
import { brandFields, sitePayload } from "@/editor/save";
import { SecretariaSection } from "./secretaria";
import type { SiteProps } from "./ui";

const barber = getTemplate("barber")!;
const TOKEN = "a".repeat(64);
const render = (template: BusinessTemplate, draftToken?: string) =>
  renderToStaticMarkup(
    <SecretariaSection {...({ template, brand: template.brand, p: template.brand.palette, lang: "es", t: template.content.es } as unknown as SiteProps)} draftToken={draftToken} />,
  ).replace(/<!-- -->/g, "");

describe("the Secretaria IA section", () => {
  it("is not there unless the site has it on", () => {
    expect(render(barber, TOKEN)).toBe("");
  });

  it("is the live demo on a draft's preview link", () => {
    const html = render({ ...barber, secretaria: true }, TOKEN);
    expect(html).toContain("Una recepcionista que atiende a sus clientes");
    expect(html).toContain(`/preview/${TOKEN}/secretaria`);
    expect(html).not.toContain("Aquí va la Secretaria IA");
  });

  it("invites visitors to call or write once published, with no demo", () => {
    const html = render({ ...barber, secretaria: true, plwSiteId: "11111111-1111-4111-8111-111111111111" });
    expect(html).toContain("Llámenos a cualquier hora");
    expect(html).toContain(`href="${barber.brand.phoneHref}"`);
    expect(html).toContain(`Llamar al ${barber.brand.phone}`);
    expect(html).toContain("https://wa.me/");
    expect(html).not.toContain("/secretaria");
  });

  it("tells staff where to try it in the editor and the gallery", () => {
    expect(render({ ...barber, secretaria: true })).toContain("Aquí va la Secretaria IA");
  });

  it("is saved with the site and comes back when it loads", () => {
    const payload = sitePayload("barber", brandFields(barber.brand), { ...barber, secretaria: true });
    const saved = JSON.parse(JSON.stringify({ id: "x", ...payload })) as SavedSite;
    expect(rebuildTemplate(barber, saved, true).secretaria).toBe(true);
  });
});
