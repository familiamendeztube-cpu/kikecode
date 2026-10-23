import { useEffect, useState } from "react";
import type { BusinessTemplate, Lang } from "@/templates/types";
import { buildGreeting } from "./data";
import type { SiteProps } from "./ui";
import { AvailabilityBar, SiteHeader, Hero, BrandFilm } from "./hero";
import { StatsStrip, TrustStrip, Offers, Guarantee, Testimonials, Certifications } from "./proof";
import { useGreeting, AssistantStrip, FloatingAssistant } from "./assistant";
import { VideoGallery, InAction, Transformation, Gallery, ClientTrust, Heritage } from "./media";
import { InventorySection, FinancingBand, FloatingWhatsApp } from "./inventory";
import { Services, MeetTheCrew, Why, Process, ServiceAreas, Comparison, Faq } from "./services";
import { MidCta, ProjectSelector, FoodBand, EmergencyBand, Contact, ClosingCta, Footer, MobileActionBar } from "./contact";

/** The shared site for every template without its own `siteVariant`. Each
 *  section takes the same props and renders nothing when the template has no
 *  data for it, so the page is just the section order. */
export default function BusinessSite({ template }: { template: BusinessTemplate }) {
  const [lang, setLang] = useState<Lang>(template.lockedLang ?? "en");
  useEffect(() => {
    setLang(template.lockedLang ?? "en");
  }, [template.slug, template.lockedLang]);

  const { brand, assistant } = template;
  const site: SiteProps = { template, brand, p: brand.palette, t: template.content[lang], lang };

  // Always speak the live greeting text (with the current business name) using
  // the realistic server-generated voice — never a stale prerecorded clip.
  const greeting = useGreeting(assistant ? buildGreeting(assistant, lang, brand.name) : undefined, lang);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <AvailabilityBar {...site} />
      <SiteHeader {...site} setLang={setLang} />
      <Hero {...site} />
      <BrandFilm {...site} />
      <StatsStrip {...site} />
      <TrustStrip {...site} />
      <AssistantStrip {...site} greeting={greeting} />
      <Offers {...site} />
      <VideoGallery {...site} />
      {template.inventory && <InventorySection inv={template.inventory} lang={lang} p={site.p} brand={brand} />}
      <FinancingBand {...site} />
      <Services {...site} />
      <InAction {...site} />
      <Transformation {...site} />
      <Gallery {...site} />
      <ClientTrust {...site} />
      <Heritage {...site} />
      <Guarantee {...site} />
      <MeetTheCrew {...site} />
      <Why {...site} />
      <Process {...site} />
      <ServiceAreas {...site} />
      <Comparison {...site} />
      <Testimonials {...site} />
      <Certifications {...site} />
      <Faq {...site} />
      <MidCta {...site} />
      <ProjectSelector {...site} />
      <FoodBand {...site} />
      <EmergencyBand {...site} />
      <Contact {...site} />
      <ClosingCta {...site} />
      <Footer {...site} />
      <FloatingWhatsApp {...site} />
      <MobileActionBar {...site} />
      {/* Auto-greets on first interaction */}
      {assistant && <FloatingAssistant
        assistant={assistant}
        portraitSrc={template.media?.teamPortrait}
        brandName={brand.name}
        phone={brand.phone}
        phoneHref={brand.phoneHref}
        palette={site.p}
        lang={lang}
        greeting={greeting}
        services={site.t.services.items.map((s) => s.title)}
        siteId={template.plwSiteId}
      />}
    </div>
  );
}
