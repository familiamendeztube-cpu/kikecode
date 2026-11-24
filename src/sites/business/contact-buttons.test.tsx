import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { getTemplate } from "@/templates";
import { AssistantStrip } from "./assistant";
import { ClosingCta } from "./contact";
import type { SiteProps } from "./ui";

const tpl = getTemplate("snuvalys-construccions")!;
const props = { template: tpl, brand: tpl.brand, p: tpl.brand.palette, lang: "es", t: tpl.content.es } as unknown as SiteProps;
// React's text separators and escaped ampersands, so the assertions read like the page.
const decode = (html: string) => html.replace(/<!-- -->/g, "").replace(/&amp;/g, "&");

/* A tel: link does nothing on a computer. Buttons computers see either open
   WhatsApp or show the number, so clicking one never looks broken. */
describe("contact buttons on a computer", () => {
  it('"Hable con una persona" (computers only) opens WhatsApp, not the dialer', () => {
    const html = decode(renderToStaticMarkup(<AssistantStrip {...props} />));
    const button = html.match(/<a [^>]*>(?:(?!<\/a>).)*Hable con una persona/)?.[0] ?? "";
    expect(button).toContain('href="https://wa.me/50661736310?text=');
    expect(button).toContain('target="_blank"');
  });

  it('"Llamar" in the closing band shows the number it dials', () => {
    const html = decode(renderToStaticMarkup(<ClosingCta {...props} />));
    expect(html).toMatch(/href="tel:\+50661736310"[^>]*>(?:(?!<\/a>).)*Llamar al \+506 6173-6310/);
  });
});
