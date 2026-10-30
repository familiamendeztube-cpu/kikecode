import type { Lang } from "@/templates/types";

/*
  What the floating assistant says while taking an appointment request.

  The site cannot see the business's calendar, so the assistant never offers
  times it does not know are free and never calls anything "booked": the
  visitor states a preference, PLW stores it as a lead, and the business
  confirms the real time. booking-copy.test.ts holds every line to that.
*/

/** Preferences, not openings: none of these is a time the business has free. */
export const PREFERRED_TIMES: Record<Lang, string[]> = {
  en: ["As soon as possible", "Weekday morning", "Weekday afternoon", "Saturday"],
  es: ["Lo antes posible", "Entre semana, en la mañana", "Entre semana, en la tarde", "Sábado"],
};

export function bookingCopy(lang: Lang, brandName: string) {
  return lang === "en"
    ? {
        whenPrompt: (need: string) => `Got it — "${need}". When would you prefer? ${brandName} will confirm the exact time with you.`,
        whenPh: "Or type a day and time…",
        contactPrompt: (when: string) => `Noted: ${when}. What number should ${brandName} text to confirm?`,
        doneMsg: (phone: string) => `✅ Request sent. ${brandName} will text ${phone} to confirm a time. Your appointment is not confirmed until they do.`,
        doneBadge: "Request sent — pending confirmation",
        previewMsg: "This is a preview, so the request was not sent. On the published site it goes straight to the business.",
        previewBadge: "Preview — nothing was sent",
        startOver: "New request",
      }
    : {
        whenPrompt: (need: string) => `Entendido — "${need}". ¿Cuándo te quedaría mejor? ${brandName} te confirmará la hora exacta.`,
        whenPh: "O escribe un día y una hora…",
        contactPrompt: (when: string) => `Anotado: ${when}. ¿A qué número te escribe ${brandName} para confirmar?`,
        doneMsg: (phone: string) => `✅ Solicitud enviada. ${brandName} te escribirá al ${phone} para confirmar la hora. Tu cita no está confirmada hasta que te respondan.`,
        doneBadge: "Solicitud enviada — pendiente de confirmar",
        previewMsg: "Esto es una vista previa, así que la solicitud no se envió. En el sitio publicado le llega directamente al negocio.",
        previewBadge: "Vista previa — no se envió nada",
        startOver: "Nueva solicitud",
      };
}
