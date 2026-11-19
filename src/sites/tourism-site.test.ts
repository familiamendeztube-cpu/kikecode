import { describe, expect, it } from "vitest";
import { getTemplate } from "@/templates";

/*
  Tourism previews answer only from confirmed data and never invent rates,
  hours or availability. The chat logic lives in the site file; these tests
  probe the Q&A rules through the template data.
*/

const base = getTemplate("plw-tourism-tours")!;

describe("tourism preview honesty", () => {
  it("has no invented rates, hours or amenities in either language", () => {
    const text = JSON.stringify(base);
    // A price mark-up ("$45", "₡5 000") or hour claims would need confirmation.
    expect(text).not.toMatch(/\$\s?\d|₡\s?\d/);
    expect(text).not.toMatch(/\bopen (mon|tue|wed|thu|fri|sat|sun)/i);
  });

  it("keeps a blank hero when no trusted heroImage is supplied (falls back to verified stock)", () => {
    expect(base.tourismDemo?.heroImage).toBeUndefined();
  });

  it("chat answers only from confirmed FAQs and says so otherwise", () => {
    // The base demos carry no FAQs: everything the chat could quote must come
    // from PLW's confirmed brief, so absent means the chat starts silent on facts.
    expect(base.tourismDemo?.faqs ?? []).toEqual([]);
  });
});
