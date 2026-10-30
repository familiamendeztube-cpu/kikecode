import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getTemplate } from "@/templates";

/*
  A preview link shows the draft with forms that never send (the template has
  no site id); a share link or a client domain shows the published revision
  with live forms. And a domain is linked only once it serves the site.
*/

const SITE = "11111111-1111-4111-8111-111111111111";

async function load() {
  vi.resetModules();
  vi.stubEnv("VITE_SUPABASE_URL", "https://plw.example.supabase.co");
  vi.stubEnv("VITE_SUPABASE_ANON_KEY", "anon");
  return await import("./saved-site");
}

function serve(status: number, body: unknown = {}) {
  const fetchMock = vi.fn(async () => new Response(JSON.stringify(body), { status }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

const barber = getTemplate("barber")!;
const savedBarber = () => JSON.parse(JSON.stringify({
  id: SITE, slug: "barber", template_version: 1, brand: barber.brand, content: barber.content, photos: {}, overrides: null,
}));

beforeEach(() => {
  vi.stubGlobal("window", { location: { origin: "https://kike.example" } });
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("loading a site for visitors", () => {
  it("renders a preview without a site id, so its forms never create a lead", async () => {
    const { loadPublishedSite } = await load();
    const fetchMock = serve(200, { ...savedBarber(), preview: true, status: "draft" });
    const site = await loadPublishedSite({ preview: "a".repeat(64) });
    expect(fetchMock).toHaveBeenCalledWith(`https://plw.example.supabase.co/functions/v1/kike-sites?preview=${"a".repeat(64)}`);
    expect(site.status).toBe("ok");
    expect(site.status === "ok" && site.template.plwSiteId).toBeUndefined();
  });

  it("renders a published site with its id, so its forms reach PLW", async () => {
    const { loadPublishedSite } = await load();
    serve(200, savedBarber());
    const site = await loadPublishedSite({ id: SITE });
    expect(site.status === "ok" && site.template.plwSiteId).toBe(SITE);
  });

  it("reports a draft or unknown site as not found and a suspended one as disabled", async () => {
    const { loadPublishedSite } = await load();
    serve(404);
    expect(await loadPublishedSite({ id: SITE })).toEqual({ status: "notfound" });
    serve(410);
    expect(await loadPublishedSite({ domain: "elrey.cr" })).toEqual({ status: "disabled" });
  });
});

describe("site links", () => {
  it("uses the client domain only once it serves the site", async () => {
    const { publishedUrl, previewUrl } = await load();
    expect(publishedUrl({ id: SITE, custom_domain: "elrey.cr", domain_status: "active" })).toBe("https://elrey.cr");
    expect(publishedUrl({ id: SITE, custom_domain: "elrey.cr", domain_status: "verified" })).toBe(`https://kike.example/share/${SITE}`);
    expect(previewUrl("b".repeat(64))).toBe(`https://kike.example/preview/${"b".repeat(64)}`);
  });
});
