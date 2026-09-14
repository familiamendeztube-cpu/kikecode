import { createClient } from "@supabase/supabase-js";

/*
  Kike Code's backend is Professional Latino Workers' Supabase project: staff
  sign in with their PLW accounts, sites are stored by the `kike-sites`
  function, the AI and greeting audio run in `kike-ai`, and site contact forms
  post to `lead-intake`. The functions live in the PLW repo
  (supabase/functions/kike-*).

  The URL and anon key are public by design — they ship in PLW's own bundle.
*/

const url = ((import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "").replace(/\/$/, "");
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "";

export const hasPlwConfig = Boolean(url && anonKey);

// A placeholder keeps createClient from throwing at import when the env is
// missing; every caller checks hasPlwConfig first.
export const supabase = createClient(url || "http://localhost", anonKey || "missing-anon-key", {
  auth: { storageKey: "kike-plw-auth" },
});

export function fnUrl(name: string): string {
  return `${url}/functions/v1/${name}`;
}

/** POST to a PLW edge function as the signed-in staff member. Throws with the server's error text. */
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
  const payload = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) throw new Error(payload.error || `Server returned ${res.status}`);
  return payload as T;
}

export type LeadFields = {
  name: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  preferredTime?: string;
};

/**
 * Send a site visitor's form to PLW, which stores the lead and emails the
 * business. A template preview (or the editor) has no site id and keeps the
 * old local-only success. Resolves false when PLW did not accept it.
 */
export async function submitLead(siteId: string | undefined, lead: LeadFields, lang: "en" | "es"): Promise<boolean> {
  if (!siteId || !hasPlwConfig) return true;
  try {
    const res = await fetch(fnUrl("lead-intake"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "website_contact",
        site_id: siteId,
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
    return res.ok;
  } catch {
    return false;
  }
}
