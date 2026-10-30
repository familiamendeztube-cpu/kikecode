/*
  Netlify Edge Function: each client site's own <head>, robots.txt and
  sitemap.xml, so search engines and link previews (WhatsApp, Facebook) see
  the business, not "Kike Code". Netlify builds this repo for the client
  domains (netlify.toml); Bolt's publish does not run edge functions, and the
  operator app it hosts needs none. The logic is src/lib/site-meta.ts.

  Env (Netlify → Site configuration → Environment variables):
    VITE_SUPABASE_URL  PLW's project URL, the same value the build uses.
    KIKE_APP_HOSTS     comma-separated hosts that are the operator app itself
                       (e.g. kike.example.com); *.netlify.app and *.bolt.host
                       always are. Every other host is looked up as a client domain.

  Any failure (kike-sites slow or down, an unknown host) passes the page
  through untouched: SEO degrades, the site never does.
*/

import { injectHead, robotsTxt, siteHead, sitemapXml, type PageKind, type PublicSiteData } from "../../src/lib/site-meta.ts";

declare const Netlify: { env: { get(name: string): string | undefined } };

type Context = { next(): Promise<Response> };

const LOOKUP_TIMEOUT_MS = 2000;
const CACHE_MS = 60_000;
const cache = new Map<string, { at: number; site: PublicSiteData | null }>();

/** kike-sites' public read, cached per isolate for a minute (it caches 60 s itself). */
async function lookup(query: string): Promise<PublicSiteData | null> {
  const hit = cache.get(query);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.site;
  const base = Netlify.env.get("VITE_SUPABASE_URL")?.replace(/\/$/, "");
  if (!base) return null;
  let site: PublicSiteData | null = null;
  try {
    const res = await fetch(`${base}/functions/v1/kike-sites?${query}`, { signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS) });
    site = res.ok ? ((await res.json()) as PublicSiteData) : null;
  } catch {
    site = null;
  }
  cache.set(query, { at: Date.now(), site });
  return site;
}

function isAppHost(host: string): boolean {
  const listed = (Netlify.env.get("KIKE_APP_HOSTS") ?? "").split(",").map((h) => h.trim().toLowerCase()).filter(Boolean);
  return host === "localhost" || host.endsWith(".netlify.app") || host.endsWith(".bolt.host") || listed.includes(host);
}

/** Which site a request shows, if any: a client domain, a share link or a preview link. */
function target(url: URL): { kind: PageKind; query: string } | null {
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (!isAppHost(host)) return { kind: "domain", query: `domain=${encodeURIComponent(host)}` };
  const share = /^\/share\/([0-9a-f-]{36})\/?$/i.exec(url.pathname);
  if (share) return { kind: "share", query: `id=${share[1]}` };
  const preview = /^\/preview\/([0-9a-f]{64})\/?$/i.exec(url.pathname);
  if (preview) return { kind: "preview", query: `preview=${preview[1]}` };
  return null;
}

export default async function siteMeta(request: Request, context: Context): Promise<Response | undefined> {
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  const page = target(url);

  if (url.pathname === "/robots.txt" || url.pathname === "/sitemap.xml") {
    const site = page?.kind === "domain" ? await lookup(page.query) : null;
    if (url.pathname === "/robots.txt") {
      return new Response(robotsTxt(url.origin, !!site), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
    }
    if (!site) return new Response("Not found", { status: 404 });
    return new Response(sitemapXml(url.origin), { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
  }

  if (!page || !(request.headers.get("accept") ?? "").includes("text/html")) return;
  const [response, site] = await Promise.all([context.next(), lookup(page.query)]);
  if (!site || !(response.headers.get("content-type") ?? "").includes("text/html")) return response;

  const head = siteHead(site, page.kind, url);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  if (page.kind !== "domain") headers.set("x-robots-tag", head.robots);
  return new Response(injectHead(await response.text(), head), { status: response.status, headers });
}

export const config = {
  path: "/*",
  excludedPath: ["/assets/*", "/favicon.svg", "/opengraph.jpg"],
};
