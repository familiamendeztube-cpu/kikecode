import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/*
  A public form may say "received" only when PLW stored the lead. These pin
  submitLead's contract: no site id is a preview (never sent, never "sent"),
  and every failure PLW or the network can produce is reported as one.
*/

const SITE = "11111111-1111-4111-8111-111111111111";
const LEAD = { form: "contact" as const, name: "Ana", phone: "8888 8888" };

async function load(configured = true) {
  vi.resetModules();
  vi.stubEnv("VITE_SUPABASE_URL", configured ? "https://plw.example.supabase.co" : "");
  vi.stubEnv("VITE_SUPABASE_ANON_KEY", configured ? "anon" : "");
  return await import("./plw");
}

function answer(status: number, body: unknown) {
  const fetchMock = vi.fn(async () => new Response(typeof body === "string" ? body : JSON.stringify(body), { status }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  vi.stubGlobal("window", { location: { href: "https://cliente.cr/#contact" } });
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("submitLead", () => {
  it("is a preview, and sends nothing, when the site has no id", async () => {
    const { submitLead } = await load();
    const fetchMock = answer(200, { ok: true });
    expect(await submitLead(undefined, LEAD, "es")).toEqual({ status: "preview" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails instead of pretending when a published site has no backend configured", async () => {
    const { submitLead } = await load(false);
    expect(await submitLead(SITE, LEAD, "es")).toEqual({ status: "failed", reason: "not_configured" });
  });

  it("is sent only when lead-intake answers ok: true", async () => {
    const { submitLead } = await load();
    const fetchMock = answer(200, { ok: true });
    expect(await submitLead(SITE, LEAD, "en")).toEqual({ status: "sent" });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://plw.example.supabase.co/functions/v1/lead-intake");
    expect(JSON.parse(String(init.body))).toMatchObject({
      kind: "website_contact", site_id: SITE, form: "contact", name: "Ana", language: "en", page_url: "https://cliente.cr/#contact",
    });
  });

  it("counts a duplicate as sent: lead-intake already stored the first one", async () => {
    const { submitLead } = await load();
    answer(200, { ok: true, duplicate: true });
    expect(await submitLead(SITE, LEAD, "es")).toEqual({ status: "sent" });
  });

  it.each([
    [429, { ok: false, error: "rate_limited" }, "rate_limited"],
    [400, { ok: false, error: "invalid_payload", fields: ["phone"] }, "rejected"],
    [404, { ok: false, error: "site_not_found" }, "rejected"],
    [500, { ok: false, error: "server_error" }, "server"],
    [503, "Service Unavailable", "server"],
    [200, "<html>proxy page</html>", "server"],
    [200, { ok: false }, "server"],
  ])("reports HTTP %i as a failure (%j)", async (status, body, reason) => {
    const { submitLead } = await load();
    answer(status, body);
    expect(await submitLead(SITE, LEAD, "es")).toEqual({ status: "failed", reason });
  });

  it("reports a network error or timeout as a failure", async () => {
    const { submitLead } = await load();
    vi.stubGlobal("fetch", vi.fn(async () => { throw new TypeError("Failed to fetch"); }));
    expect(await submitLead(SITE, LEAD, "es")).toEqual({ status: "failed", reason: "network" });
  });
});
