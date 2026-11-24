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
const TamarindoSite = lazy(() => import("@/sites/tamarindo/tamarindo-site"));

/** The sites that draw the Secretaria IA section when `template.secretaria` is on:
 *  the shared site and Tamarindo. The editor offers the switch only for these. */
export function hasSecretariaSection(template: BusinessTemplate): boolean {
  return !template.siteVariant || template.siteVariant === "tamarindo";
}

/** Renders a template with the page component its `siteVariant` asks for.
 *  One place, so share links, client domains and the editor preview agree.
 *  Only preview pages pass a token: `previewToken` (a PLW sample's, without its
 *  prefix) for the tourism chat and Secretaria, `draftToken` (a Kike draft's)
 *  for the Secretaria demo on the shared site and Tamarindo. */
export function SiteRenderer({ template, previewToken, draftToken }: { template: BusinessTemplate; previewToken?: string | null; draftToken?: string | null }) {
  switch (template.siteVariant) {
    case "leonardo": return <Suspense><LeonardoSite template={template} /></Suspense>;
    case "oryzo": return <Suspense><OryzoSite template={template} /></Suspense>;
    case "rym": return <Suspense><RymSite template={template} /></Suspense>;
    case "fenix": return <Suspense><FenixSite template={template} /></Suspense>;
    case "tourism": return <Suspense><TourismSite template={template} previewToken={previewToken} /></Suspense>;
    case "tamarindo": return <Suspense fallback={<HeroSkeleton navy={template.brand.palette.heroFrom} />}><TamarindoSite template={template} draftToken={draftToken} /></Suspense>;
    default: return <BusinessSite template={template} draftToken={draftToken} />;
  }
}

/** A hand-built site's hero, in outline, while its code downloads. It fades in only
 *  after 1 s, so a normal load shows just the brand colour, never a loader. */
function HeroSkeleton({ navy }: { navy: string }) {
  const bar = "rounded-full bg-white/10 motion-safe:animate-pulse";
  return (
    <div role="status" className="flex min-h-dvh items-end" style={{ backgroundColor: navy }}>
      <span className="sr-only">Cargando… / Loading…</span>
      <style>{"@keyframes hero-skeleton-in{from{opacity:0}}"}</style>
      <div aria-hidden className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 [animation:hero-skeleton-in_.6s_1s_both]">
        <div className={`h-8 w-64 ${bar}`} />
        <div className={`mt-6 h-16 w-[min(40rem,85%)] rounded-3xl sm:h-24 ${bar}`} />
        <div className={`mt-3 h-16 w-[min(28rem,65%)] rounded-3xl sm:h-24 ${bar}`} />
        <div className={`mt-8 h-5 w-[min(34rem,85%)] ${bar}`} />
        <div className={`mt-3 h-5 w-[min(24rem,60%)] ${bar}`} />
        <div className="mt-10 flex gap-3">
          <div className={`h-14 w-48 ${bar}`} />
          <div className={`h-14 w-52 ${bar}`} />
        </div>
      </div>
    </div>
  );
}
