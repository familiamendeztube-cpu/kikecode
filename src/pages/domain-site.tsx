import { useEffect, type ReactNode } from "react";
import { SiteRenderer } from "@/sites/site-renderer";
import { StatusScreen } from "@/components/status-screen";
import { getTemplate } from "@/templates";
import { hasPlwConfig } from "@/lib/plw";
import { usePublishedSite } from "@/lib/saved-site";
import type { BusinessTemplate } from "@/templates/types";

function useBrandTitle(template: BusinessTemplate | null) {
  useEffect(() => {
    // RymSite manages its own SEO title/meta; don't overwrite it here.
    if (template && template.siteVariant !== "rym") document.title = template.brand.name;
  }, [template]);
}

const Unavailable = () => <StatusScreen title="Sitio no disponible." />;

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
  const site = usePublishedSite({ domain: hostname });
  useBrandTitle(site?.status === "ok" ? site.template : null);

  if (!site) return <div className="min-h-screen" />;
  if (site.status === "ok") return <SiteRenderer template={site.template} />;
  if (site.status === "notfound" || !hasPlwConfig) return <>{fallback}</>;
  return <Unavailable />;
}
