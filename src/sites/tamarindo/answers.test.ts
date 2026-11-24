import { describe, expect, it } from "vitest";
import { getTemplate } from "@/templates";
import { answer } from "./answers";
import { durationsFor, quoteMath, quoteMessage, usd } from "./quote";

const draft = getTemplate("tamarindo-tours-discovery")!;
const live = { ...draft, plwSiteId: "11111111-1111-4111-8111-111111111111" };
const pricing = draft.tourPricing!;
const tour = (word: string) => draft.tours!.findIndex((t) => t.title.en.includes(word));

describe("the quote", () => {
  it("offers each tour the lengths priced at or above its own starting price", () => {
    expect(durationsFor(draft.tours![tour("Inshore")], pricing).map((d) => d.priceUsd)).toEqual([600, 850, 1000]);
    expect(durationsFor(draft.tours![tour("Offshore")], pricing).map((d) => d.priceUsd)).toEqual([1000]);
    expect(durationsFor({ ...draft.tours![0], priceUsd: 1500 }, pricing)).toEqual([{ ...pricing.durations[2], priceUsd: 1500 }]);
  });

  it("splits the deposit from the balance, and adds 13% to a card balance to the cent", () => {
    expect(quoteMath(850, pricing)).toEqual({ total: 850, deposit: 220, balance: 630, balanceByCard: 711.9 });
    expect(usd(711.9, "en")).toBe("US$711.90");
    expect(usd(711.9, "es")).toBe("US$711,90");
  });

  it("writes Willy a message with every choice and no empty lines for blank fields", () => {
    const t = draft.tours![tour("Sunset")];
    const msg = quoteMessage({ tour: t, duration: pricing.durations[0], date: "2026-12-05", start: "Afternoon", guests: 4, kids: true, name: "Ana", email: "", notes: "" }, pricing, "en");
    expect(msg).toContain("Sunset on the Water");
    expect(msg).toContain("Saturday, December 5 · Afternoon");
    expect(msg).toContain("Guests: 4 (with children)");
    expect(msg).toContain("US$600 for the whole boat");
    expect(msg).not.toContain("Notes");
    expect(msg).not.toContain("Email");
  });
});

describe("the concierge", () => {
  it.each([
    ["How much is a private tour?", "en", "Prices are for the whole boat"],
    ["¿Cuánto cuesta un tour privado?", "es", "por el bote completo"],
    ["how much for offshore fishing", "en", "Offshore Sport Fishing: whole boat, up to 5 guests. Full day"],
    ["What's included in the snorkel tour?", "en", "Snorkel and safety gear"],
    ["What's included?", "en", "The private boat and its crew"],
    ["What should I bring?", "en", "Sun protection"],
    ["Where do we meet?", "en", "El Chiringuito"],
    ["¿Dónde nos encontramos?", "es", "El Chiringuito"],
    ["What if I cancel?", "en", "48 hours"],
    ["¿Y si cancelo?", "es", "48 horas"],
    ["Can we bring kids?", "en", "children"],
    ["Is there a bathroom?", "en", "no bathroom"],
    ["How much is the deposit?", "en", "US$220"],
    ["Can I pay by card?", "en", "13%"],
    ["What are your opening hours?", "en", "6:00 a.m."],
    ["How many hours is the inshore trip?", "en", "Half day (5 hours"],
    ["Hi! how much is fishing?", "en", "Inshore Sport Fishing: from US$600"],
    ["Can we see turtles?", "en", "sea turtles"],
  ] as const)("answers %j from the site's own data", (q, lang, expected) => {
    expect(answer(q, draft, lang).text).toContain(expected);
  });

  it("offers the quote with the tour the question was about", () => {
    const r = answer("Tell me about the sunset tour", draft, "en");
    expect(r.tour).toBe(tour("Sunset"));
    expect(r.actions).toContain("quote");
    expect(answer("¿Tienen disponible el sábado para pesca en altamar?", draft, "es").tour).toBe(tour("Offshore"));
  });

  it("says the full version answers anything, while the site is a demo", () => {
    const r = answer("Do you rent paddle boards?", draft, "en");
    expect(r.text).toContain("full version");
    expect(r.actions).toEqual(["whatsapp"]);
  });

  it("hands Willy the question on WhatsApp once published, never calling his site a demo", () => {
    for (const q of ["Do you rent paddle boards?", "Is Saturday available?"]) {
      const text = answer(q, live, "en").text;
      expect(text).not.toMatch(/demo|full version/i);
    }
  });

  it("never invents availability or claims a booking", () => {
    for (const lang of ["en", "es"] as const) {
      const text = answer(lang === "en" ? "Are you available tomorrow?" : "¿Tienen disponible mañana?", draft, lang).text;
      expect(text).toMatch(/full version|versión completa/);
      expect(text).not.toMatch(/\bbooked\b|is available|está disponible|reservado/i);
    }
  });
});
