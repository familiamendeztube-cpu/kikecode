/*
  The <head> a client site needs before any JavaScript runs. Search crawlers
  and link-preview bots (WhatsApp, Facebook, iMessage) read the HTML the
  server sends, and Kike Code is a client-rendered app whose index.html is the
  same for every site. netlify/edge-functions/site-meta.ts asks kike-sites for
  the site behind a host or link and rewrites the head with this, on the
  Netlify build that serves client domains. Pure, so the tests pin it.
*/

type Lang = "en" | "es";
type Hero = { title1?: string; title2?: string; subtitle?: string };

/** What kike-sites' public GET returns (only the fields used here). */
export type PublicSiteData = {
  id: string;
  brand: { name: string; city?: string; phone?: string; email?: string; address?: string };
  content?: Partial<Record<Lang, { hero?: Hero }>>;
  photos?: { hero?: string } | null;
  overrides?: { media?: { hero?: string }; lockedLang?: Lang } | null;
};

/** A client's own domain (indexable), a share link (a copy of it) or a preview (a draft). */
export type PageKind = "domain" | "share" | "preview";

export type SiteHead = {
  lang: Lang;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  image: string | null;
  jsonLd: Record<string, unknown> | null;
};

const ROBOTS: Record<PageKind, string> = {
  domain: "index, follow",
  share: "noindex, follow",
  preview: "noindex, nofollow",
};

function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

/** Only a real web address may be a share image; never an inline data: photo. */
function webImage(...candidates: (string | undefined)[]): string | null {
  return candidates.find((value) => typeof value === "string" && value.startsWith("https://")) ?? null;
}

export function siteHead(site: PublicSiteData, kind: PageKind, url: URL): SiteHead {
  const lang: Lang = site.overrides?.lockedLang ?? "en";
  const hero = site.content?.[lang]?.hero ?? site.content?.en?.hero ?? site.content?.es?.hero ?? {};
  const { name, city } = site.brand;
  const title = clip(city ? `${name} · ${city}` : name, 70);
  const description = clip(hero.subtitle || [hero.title1, hero.title2].filter(Boolean).join(" ") || name, 160);
  const image = webImage(site.photos?.hero, site.overrides?.media?.hero);
  const canonical = kind === "domain" ? `${url.origin}/` : `${url.origin}${url.pathname}`;
  const jsonLd = kind === "domain"
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name,
        url: canonical,
        ...(site.brand.phone ? { telephone: site.brand.phone } : {}),
        ...(site.brand.email ? { email: site.brand.email } : {}),
        ...(site.brand.address || city
          ? { address: { "@type": "PostalAddress", ...(site.brand.address ? { streetAddress: site.brand.address } : {}), ...(city ? { addressLocality: city } : {}) } }
          : {}),
        ...(image ? { image } : {}),
      }
    : null;
  return { lang, title, description, canonical, robots: ROBOTS[kind], image, jsonLd };
}

function attr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function renderHead(head: SiteHead): string {
  const tags = [
    `<title>${attr(head.title)}</title>`,
    `<meta name="description" content="${attr(head.description)}" />`,
    `<meta name="robots" content="${head.robots}" />`,
    `<link rel="canonical" href="${attr(head.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${attr(head.title)}" />`,
    `<meta property="og:description" content="${attr(head.description)}" />`,
    `<meta property="og:url" content="${attr(head.canonical)}" />`,
    `<meta property="og:locale" content="${head.lang === "es" ? "es_LA" : "en_US"}" />`,
    `<meta name="twitter:card" content="${head.image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${attr(head.title)}" />`,
    `<meta name="twitter:description" content="${attr(head.description)}" />`,
  ];
  if (head.image) {
    tags.push(`<meta property="og:image" content="${attr(head.image)}" />`, `<meta name="twitter:image" content="${attr(head.image)}" />`);
  }
  if (head.jsonLd) {
    // "<" escaped, so no text in the data can close the script element.
    tags.push(`<script type="application/ld+json">${JSON.stringify(head.jsonLd).replace(/</g, "\\u003c")}</script>`);
  }
  return tags.join("\n    ");
}

/** index.html with the generic title and share tags replaced by the site's own. */
export function injectHead(html: string, head: SiteHead): string {
  const stripped = html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+(?:name|property)=["'](?:description|robots|og:[^"']+|twitter:[^"']+)["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<html\b[^>]*>/i, `<html lang="${head.lang}">`);
  return stripped.replace(/<\/head>/i, `    ${renderHead(head)}\n  </head>`);
}

export function robotsTxt(origin: string, clientSite: boolean): string {
  return clientSite
    ? `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
    // The operator app, its share and preview links: nothing to index.
    : "User-agent: *\nDisallow: /\n";
}

export function sitemapXml(origin: string, lastModified?: string): string {
  const lastmod = lastModified ? `<lastmod>${lastModified.slice(0, 10)}</lastmod>` : "";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${attr(origin)}/</loc>${lastmod}</url>\n</urlset>\n`;
}
