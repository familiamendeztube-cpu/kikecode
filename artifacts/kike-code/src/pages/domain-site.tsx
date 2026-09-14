import { useEffect, useState, type ReactNode } from "react";
import { SiteRenderer } from "@/components/site-renderer";
import { getTemplate } from "@/lib/templates";
import { hasPlwConfig } from "@/lib/plw";
import { loadPublishedSite, type PublishedSite } from "@/lib/saved-site";
import type { BusinessTemplate } from "@/lib/templates/types";

function useBrandTitle(template: BusinessTemplate | null) {
  useEffect(() => {
    // RymSite manages its own SEO title/meta; don't overwrite it here.
    if (template && template.siteVariant !== "rym") document.title = template.brand.name;
  }, [template]);
}

function Unavailable() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <p className="text-sm text-slate-600">Sitio no disponible.</p>
    </div>
  );
}

/** Full-page client site for a domain mapped in code (see lib/domain-sites.ts).
 *  No sign-in, no operator chrome. */
export default function DomainSite({ slug }: { slug: string }) {
  const tpl = getTemplate(slug);
  useBrandTitle(tpl);
  return tpl ? <SiteRenderer template={tpl} /> : <Unavailable />;
}

/** A client's own domain saved on a site (its custom_domain). When no site
 *  claims the host, this is the operator app and `fallback` renders instead. */
export function ClientDomainSite({ hostname, fallback }: { hostname: string; fallback: ReactNode }) {
  const [site, setSite] = useState<PublishedSite | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadPublishedSite({ domain: hostname }).then((result) => {
      if (!cancelled) setSite(result);
    });
    return () => {
      cancelled = true;
    };
  }, [hostname]);

  useBrandTitle(site?.status === "ok" ? site.template : null);

  if (!site) return <div className="min-h-screen" />;
  if (site.status === "ok") return <SiteRenderer template={site.template} />;
  if (site.status === "notfound" || !hasPlwConfig) return <>{fallback}</>;
  return <Unavailable />;
}
