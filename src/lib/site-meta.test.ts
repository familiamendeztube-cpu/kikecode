import { describe, expect, it } from "vitest";
import { injectHead, robotsTxt, siteHead, sitemapXml, type PublicSiteData } from "./site-meta";

/*
  What crawlers and link previews read before JavaScript: each client site's
  own title, description, image and business data, an index only for the
  client's domain, and nothing a business name or AI copy could break out of.
*/

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="generator" content="Kike Code" />
    <title>Kike Code</title>
    <meta name="description" content="Bilingual website demos for Latino small businesses." />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Kike Code" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body><div id="root"></div></body>
</html>`;

const site: PublicSiteData = {
  id: "11111111-1111-4111-8111-111111111111",
  brand: { name: "Barbería El Rey", city: "Curridabat", phone: "+506 4010 6142", email: "rey@example.com", address: "Pinares" },
  content: {
    en: { hero: { title1: "Sharp cuts", subtitle: "Fades and beard sculpting in Curridabat." } },
    es: { hero: { title1: "Cortes finos", subtitle: "Degradados y barbas en Curridabat." } },
  },
  photos: { hero: "https://x.supabase.co/storage/v1/object/public/kike-site-assets/sites/a/hero.jpg" },
  overrides: { lockedLang: "es" },
};

describe("siteHead", () => {
  it("names the business in its own language and lets only its domain be indexed", () => {
    const head = siteHead(site, "domain", new URL("https://elrey.cr/servicios"));
    expect(head).toMatchObject({
      lang: "es",
      title: "Barbería El Rey · Curridabat",
      description: "Degradados y barbas en Curridabat.",
      canonical: "https://elrey.cr/",
      robots: "index, follow",
      image: site.photos!.hero,
    });
    expect(head.jsonLd).toMatchObject({ "@type": "LocalBusiness", name: "Barbería El Rey", telephone: "+506 4010 6142", address: { addressLocality: "Curridabat" } });
  });

  it("keeps share links and previews out of the index", () => {
    expect(siteHead(site, "share", new URL(`https://app.netlify.app/share/${site.id}`))).toMatchObject({ robots: "noindex, follow", jsonLd: null });
    expect(siteHead(site, "preview", new URL("https://app.netlify.app/preview/abc")).robots).toBe("noindex, nofollow");
  });

  it("never offers an inline photo as the share image, and falls back to English and the title", () => {
    const head = siteHead({ ...site, photos: { hero: "data:image/jpeg;base64,AAAA" }, overrides: null, content: { en: { hero: { title1: "Sharp", title2: "cuts" } } } }, "domain", new URL("https://elrey.cr/"));
    expect(head).toMatchObject({ lang: "en", image: null, description: "Sharp cuts" });
  });
});

describe("injectHead", () => {
  it("replaces the generic tags, keeps the rest of index.html, and sets the page language", () => {
    const html = injectHead(INDEX_HTML, siteHead(site, "domain", new URL("https://elrey.cr/")));
    expect(html).toContain('<html lang="es">');
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html).toContain("<title>Barbería El Rey · Curridabat</title>");
    expect(html).not.toContain("Bilingual website demos");
    expect(html).not.toContain('content="Kike Code" />\n    <title>Kike Code');
    expect(html.match(/name="robots"/g)).toHaveLength(1);
    expect(html).toContain('<meta name="generator" content="Kike Code" />');
    expect(html).toContain('<link rel="canonical" href="https://elrey.cr/" />');
    expect(html).toContain('<div id="root"></div>');
  });

  it("never lets a saved language value out of <html lang>", () => {
    const hostile = { ...site, overrides: { lockedLang: `en"><img src=x onerror=alert(1)>` as never } };
    const html = injectHead(INDEX_HTML, siteHead(hostile, "domain", new URL("https://elrey.cr/")));
    expect(html).toContain('<html lang="en">');
    expect(html).not.toContain("onerror");
  });

  it("keeps \"$&\" and other replacement patterns in business text literal", () => {
    const html = injectHead(INDEX_HTML, siteHead({ ...site, brand: { ...site.brand, name: "Rey $& $' $`" } }, "domain", new URL("https://elrey.cr/")));
    expect(html).toContain("<title>Rey $&amp; $' $` · Curridabat</title>");
    expect(html.match(/<\/head>/g)).toHaveLength(1);
  });

  it("reads non-string site data as empty instead of failing", () => {
    const odd = { ...site, brand: { name: 42 as never }, content: { en: { hero: { subtitle: { x: 1 } as never } } }, overrides: null };
    expect(siteHead(odd, "domain", new URL("https://elrey.cr/"))).toMatchObject({ title: "", description: "" });
  });

  it("escapes whatever a business name or AI-written copy contains", () => {
    const hostile = { ...site, brand: { ...site.brand, name: `Rey"><script>alert(1)</script>` }, content: { es: { hero: { subtitle: "</script><img src=x onerror=alert(1)>" } } } };
    const html = injectHead(INDEX_HTML, siteHead(hostile, "domain", new URL("https://elrey.cr/")));
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
    const jsonLd = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)![1];
    expect(jsonLd).not.toContain("<");
    expect(JSON.parse(jsonLd).name).toBe(`Rey"><script>alert(1)</script>`);
  });
});

describe("robots.txt and sitemap.xml", () => {
  it("opens a client domain to crawlers and closes the operator app", () => {
    expect(robotsTxt("https://elrey.cr", true)).toBe("User-agent: *\nAllow: /\n\nSitemap: https://elrey.cr/sitemap.xml\n");
    expect(robotsTxt("https://kike.netlify.app", false)).toBe("User-agent: *\nDisallow: /\n");
    expect(sitemapXml("https://elrey.cr")).toContain("<loc>https://elrey.cr/</loc>");
  });
});
