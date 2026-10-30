import type { Lang } from "@/templates/types";

/** The English or Spanish version of copy written inline in a component.
 *  Data that already has `{ en, es }` fields reads as `text[lang]` instead. */
export function pick<T>(lang: Lang, en: T, es: T): T {
  return lang === "en" ? en : es;
}
