import { createClient } from "@supabase/supabase-js";

/*
  Kike Code's backend is Professional Latino Workers' Supabase project: staff
  sign in with their PLW accounts, sites are stored by the `kike-sites`
  function, the editor AI runs in `kike-ai`, and site contact forms
  post to `lead-intake`. The functions live in the PLW repo
  (supabase/functions/kike-*).

  The URL and anon key are public by design — they ship in PLW's own bundle.
*/

const url = ((import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "").replace(/\/$/, "");
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "";

export const hasPlwConfig = Boolean(url && anonKey);

/**
 * Stock template photos and videos, kept out of the repo (too big for Bolt):
 * the template-assets/ folder of PLW's public `template-assets` bucket.
 */
export const TEMPLATE_ASSETS = `${url}/storage/v1/object/public/template-assets/template-assets`;

// A placeholder keeps createClient from throwing at import when the env is
// missing; every caller checks hasPlwConfig first.
export const supabase = createClient(url || "http://localhost", anonKey || "missing-anon-key", {
  auth: { storageKey: "kike-plw-auth" },
});

export function fnUrl(name: string): string {
  return `${url}/functions/v1/${name}`;
}

/**
 * POST to a PLW edge function as the signed-in staff member. Throws with the
 * server's error text; `fields` on the error names what failed validation and
 * `body` is the whole error response (kike-sites' publish puts its blockers there).
 */
export async function callFn<T>(name: string, body: Record<string, unknown>): Promise<T> {
  if (!hasPlwConfig) throw new Error("PLW is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).");
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(fnUrl(name), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${session?.access_token ?? anonKey}`,
    },
    body: JSON.stringify(body),
  });
  const payload = (await res.json().catch(() => ({}))) as { error?: string; fields?: string[] };
  if (!res.ok) {
    throw Object.assign(new Error(payload.error || `Server returned ${res.status}`), { fields: payload.fields, status: res.status, body: payload });
  }
  return payload as T;
}

/** Which form on the site sent the lead; lead-intake records it with the lead. */
export type LeadForm = "contact" | "assistant" | "appointment" | "quote" | "waitlist";

export type LeadFields = {
  name: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  preferredTime?: string;
  form: LeadForm;
};

/**
 * What happened to a visitor's form. Only "sent" means PLW stored the lead.
 * "preview" is a site that is not published (template preview, editor, preview
 * link): nothing is sent, by design, and the form has to say so.
 */
export type LeadResult =
  | { status: "sent" }
  | { status: "preview" }
  | { status: "failed"; reason: "not_configured" | "network" | "rate_limited" | "rejected" | "server" };

const LEAD_TIMEOUT_MS = 15_000;

/**
 * Send a site visitor's form to PLW, which stores the lead and emails the
 * business. Resolves "sent" only when lead-intake answered `{ ok: true }`;
 * a published site with no backend configured fails instead of pretending.
 */
export async function submitLead(siteId: string | undefined, lead: LeadFields, lang: "en" | "es"): Promise<LeadResult> {
  if (!siteId) return { status: "preview" };
  if (!hasPlwConfig) return { status: "failed", reason: "not_configured" };
  let res: Response;
  try {
    res = await fetch(fnUrl("lead-intake"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(LEAD_TIMEOUT_MS),
      body: JSON.stringify({
        kind: "website_contact",
        site_id: siteId,
        form: lead.form,
        name: lead.name,
        phone: lead.phone || null,
        email: lead.email || null,
        service: lead.service || null,
        message: lead.message || null,
        preferred_time: lead.preferredTime || null,
        language: lang,
        page_url: window.location.href,
        plw_hp: "",
      }),
    });
  } catch {
    return { status: "failed", reason: "network" };
  }
  if (res.status === 429) return { status: "failed", reason: "rate_limited" };
  // 400: a field PLW refused. 404: the site is not published, or was suspended.
  if (res.status === 400 || res.status === 404) return { status: "failed", reason: "rejected" };
  const body = (await res.json().catch(() => null)) as { ok?: unknown } | null;
  return res.ok && body?.ok === true ? { status: "sent" } : { status: "failed", reason: "server" };
}
