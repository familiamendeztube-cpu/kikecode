import BusinessSite from "@/sites/business/business-site";
import LeonardoSite from "@/sites/leonardo-site";
import OryzoSite from "@/sites/oryzo-site";
import RymSite from "@/sites/rym/rym-site";
import FenixSite from "@/sites/fenix/fenix-site";
import type { BusinessTemplate } from "@/templates/types";

/** Renders a template with the page component its `siteVariant` asks for.
 *  One place, so share links, client domains and the editor preview agree. */
export function SiteRenderer({ template }: { template: BusinessTemplate }) {
  switch (template.siteVariant) {
    case "leonardo": return <LeonardoSite template={template} />;
    case "oryzo": return <OryzoSite template={template} />;
    case "rym": return <RymSite template={template} />;
    case "fenix": return <FenixSite template={template} />;
    default: return <BusinessSite template={template} />;
  }
}
