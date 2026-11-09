import { describe, expect, it } from "vitest";
import { TEMPLATES } from "@/templates";
import { contrast, dimmed, readablePalette, scrimFor, whiteContrast } from "./ui";

describe("the palette the shared site draws with", () => {
  it("gives every template white button text and accent text on the hero at 4.5:1 or better", () => {
    const failing = TEMPLATES.flatMap((t) => {
      const p = readablePalette(t.brand.palette);
      const issues: string[] = [];
      if (whiteContrast(p.primary) < 4.5) issues.push(`${t.slug} primary ${p.primary}`);
      if (whiteContrast(p.primaryDark) < 4.5) issues.push(`${t.slug} primaryDark ${p.primaryDark}`);
      if (contrast(p.accent, p.heroFrom) < 4.5) issues.push(`${t.slug} accent ${p.accent} on ${p.heroFrom}`);
      return issues;
    });
    expect(failing).toEqual([]);
  });

  it("leaves a color that already reads untouched", () => {
    const nica = TEMPLATES.find((t) => t.slug === "nicaraguan-restaurant")!.brand.palette;
    expect(readablePalette(nica)).toEqual(nica);
  });
});

describe("white text on the contact section", () => {
  it("needs no overlay on a dark color", () => {
    expect(scrimFor("#0A1A29")).toBe(0);
  });

  it("reads at 4.5:1 or better on every template's contact colors once dimmed", () => {
    const colors = TEMPLATES.flatMap((t) => [t.brand.palette.contactFrom, t.brand.palette.contactTo]);
    const failing = colors.filter((c) => whiteContrast(dimmed(c, scrimFor(c))) < 4.5);
    expect(failing).toEqual([]);
  });
});
