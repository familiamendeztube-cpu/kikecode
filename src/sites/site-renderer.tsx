import { lazy, Suspense } from "react";
import BusinessSite from "@/sites/business/business-site";
import type { BusinessTemplate } from "@/templates/types";

/* The hand-built sites load on demand, so the shared site's clients don't download
   them (Oryzo alone brings three.js). */
const LeonardoSite = lazy(() => import("@/sites/leonardo-site"));
const OryzoSite = lazy(() => import("@/sites/oryzo-site"));
const RymSite = lazy(() => import("@/sites/rym/rym-site"));
const FenixSite = lazy(() => import("@/sites/fenix/fenix-site"));
const TourismSite = lazy(() => import("@/sites/tourism-site"));

/** Renders a template with the page component its `siteVariant` asks for.
 *  One place, so share links, client domains and the editor preview agree.
 *  `previewToken` (PLW token without its prefix) only exists on preview pages:
 *  the tourism chat uses it to ask PLW to read an answer aloud. */
export function SiteRenderer({ template, previewToken }: { template: BusinessTemplate; previewToken?: string | null }) {
  switch (template.siteVariant) {
    case "leonardo": return <Suspense><LeonardoSite template={template} /></Suspense>;
    case "oryzo": return <Suspense><OryzoSite template={template} /></Suspense>;
    case "rym": return <Suspense><RymSite template={template} /></Suspense>;
    case "fenix": return <Suspense><FenixSite template={template} /></Suspense>;
    case "tourism": return <Suspense><TourismSite template={template} previewToken={previewToken} /></Suspense>;
    default: return <BusinessSite template={template} />;
  }
}
