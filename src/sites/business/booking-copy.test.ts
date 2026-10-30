import { describe, expect, it } from "vitest";
import type { Lang } from "@/templates/types";
import { bookingCopy, PREFERRED_TIMES } from "./booking-copy";
import { buildGreeting } from "./data";

/*
  The site cannot see the business's calendar. The assistant takes a request;
  it must never offer openings or tell a visitor they are booked.
*/

const CLAIMS_A_BOOKING = /you'?re booked|all set|appointment booked|confirmed for|quedaste agendad|cita agendada|te agendo|¡listo!/i;
const LANGS: Lang[] = ["en", "es"];

function everyLine(lang: Lang): string[] {
  const copy = bookingCopy(lang, "Barbería El Rey");
  return Object.values(copy).map((value) => (typeof value === "function" ? value("8888 8888") : value));
}

describe("assistant booking copy", () => {
  it.each(LANGS)("never claims a confirmed appointment (%s)", (lang) => {
    for (const line of everyLine(lang)) expect(line).not.toMatch(CLAIMS_A_BOOKING);
    const greeting = buildGreeting({ name: "Ana", roleEn: "", roleEs: "", en: "Hi, I'm Ana from {business}.", es: "Hola, soy Ana de {business}." }, lang, "El Rey");
    expect(greeting).not.toMatch(CLAIMS_A_BOOKING);
  });

  it.each(LANGS)("says the request still needs the business to confirm it (%s)", (lang) => {
    const copy = bookingCopy(lang, "El Rey");
    expect(copy.doneMsg("8888 8888")).toMatch(lang === "en" ? /not confirmed until/ : /no está confirmada hasta/);
    expect(copy.doneBadge).toMatch(lang === "en" ? /pending confirmation/ : /pendiente de confirmar/);
  });

  it.each(LANGS)("offers preferences, never a clock time or date (%s)", (lang) => {
    for (const option of PREFERRED_TIMES[lang]) expect(option).not.toMatch(/\d/);
  });
});
