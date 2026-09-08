import { useEffect } from "react";
import BusinessSite from "@/components/business-site";
import LeonardoSite from "@/components/leonardo-site";
import OryzoSite from "@/components/oryzo-site";
import RymSite from "@/components/rym-site";
import FenixSite from "@/components/fenix-site";
import { getTemplate } from "@/lib/templates";

/** Full-page client site rendered when the app is opened via a client's own
 *  custom domain (see lib/domain-sites.ts). No PIN gate, no operator chrome. */
export default function DomainSite({ slug }: { slug: string }) {
  const tpl = getTemplate(slug);
  useEffect(() => {
    // RymSite manages its own SEO title/meta; don't overwrite it here.
    if (tpl && tpl.siteVariant !== "rym") document.title = tpl.brand.name;
  }, [tpl]);
  if (!tpl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <p className="text-sm text-slate-600">Sitio no disponible.</p>
      </div>
    );
  }
  if (tpl.siteVariant === "leonardo") return <LeonardoSite template={tpl} />;
  if (tpl.siteVariant === "oryzo") return <OryzoSite template={tpl} />;
  if (tpl.siteVariant === "rym") return <RymSite template={tpl} />;
  if (tpl.siteVariant === "fenix") return <FenixSite template={tpl} />;
  return <BusinessSite template={tpl} />;
}
