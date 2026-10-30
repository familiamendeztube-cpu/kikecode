import { useRef, useState } from "react";
import { submitLead, type LeadFields, type LeadResult } from "@/lib/plw";
import type { Lang } from "@/templates/types";

export type LeadFormState = { status: "idle" } | { status: "sending" } | LeadResult;

/**
 * One form's submission. A second submit while one is in flight is dropped (a
 * ref, so even a double click inside one frame sends once); lead-intake also
 * drops exact repeats for ten minutes. `isPreview` is a site that is not
 * published: its forms never send and must say so before anyone types.
 */
export function useLeadForm(siteId: string | undefined, lang: Lang) {
  const [state, setState] = useState<LeadFormState>({ status: "idle" });
  const inFlight = useRef(false);

  async function submit(fields: LeadFields): Promise<LeadResult | null> {
    if (inFlight.current) return null;
    inFlight.current = true;
    setState({ status: "sending" });
    try {
      const result = await submitLead(siteId, fields, lang);
      setState(result);
      return result;
    } finally {
      inFlight.current = false;
    }
  }

  return {
    state,
    submit,
    sending: state.status === "sending",
    isPreview: !siteId,
    reset: () => setState({ status: "idle" }),
  };
}

const PREVIEW_NOTICE: Record<Lang, string> = {
  en: "Preview: this form is not active yet, so messages are not sent.",
  es: "Vista previa: este formulario aún no está activo y los mensajes no se envían.",
};

const PREVIEW_RESULT: Record<Lang, string> = {
  en: "Preview only — nothing was sent. On the published site, this message goes straight to the business.",
  es: "Solo vista previa: no se envió nada. En el sitio publicado, este mensaje le llega directamente al negocio.",
};

const FAILURE: Record<Extract<LeadResult, { status: "failed" }>["reason"], Record<Lang, string>> = {
  network: {
    en: "We couldn't reach the server, so your message was not sent. Check your connection and try again.",
    es: "No pudimos conectar con el servidor y su mensaje no se envió. Revise su conexión e intente de nuevo.",
  },
  rate_limited: {
    en: "Too many messages from this connection. Please try again later.",
    es: "Demasiados mensajes desde esta conexión. Intente de nuevo más tarde.",
  },
  rejected: {
    en: "We couldn't accept this message. Please check your phone number and try again.",
    es: "No pudimos aceptar este mensaje. Revise su número de teléfono e intente de nuevo.",
  },
  server: {
    en: "Something went wrong on our side and your message was not sent.",
    es: "Algo falló de nuestro lado y su mensaje no se envió.",
  },
  not_configured: {
    en: "This form is not connected yet, so your message was not sent.",
    es: "Este formulario aún no está conectado y su mensaje no se envió.",
  },
};

/** Shown on a form while its site is not published. */
export function previewNotice(lang: Lang): string {
  return PREVIEW_NOTICE[lang];
}

/**
 * The line a visitor reads after submitting, for every outcome but "sent"
 * (each form words its own success). Failures offer the phone when there is one.
 */
export function leadOutcomeMessage(state: LeadFormState, lang: Lang, phone?: string): string | null {
  if (state.status === "preview") return PREVIEW_RESULT[lang];
  if (state.status !== "failed") return null;
  const call = phone ? (lang === "en" ? ` You can also call ${phone}.` : ` También puede llamar al ${phone}.`) : "";
  return FAILURE[state.reason][lang] + call;
}
