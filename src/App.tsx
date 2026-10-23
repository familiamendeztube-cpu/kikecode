import { Switch, Route } from "wouter";
import { StaffGate } from "@/components/staff-gate";
import { OperatorBar } from "@/components/operator-bar";
import NotFound from "@/pages/not-found";

import Templates from "@/pages/templates";
import CreateSite from "@/pages/create";
import TemplatePreview from "@/pages/template-preview";
import SharePreview from "@/pages/share-preview";
import Videos from "@/pages/videos";
import Demos from "@/pages/demos";
import VideoShare from "@/pages/video-share";
import EditSite from "@/pages/edit-site";
import DomainSite, { ClientDomainSite } from "@/pages/domain-site";
import { getDomainSiteSlug } from "@/lib/domain-sites";

function OperatorRoutes() {
  return (
    <Switch>
      <Route path="/" component={Templates} />
      <Route path="/create" component={CreateSite} />
      <Route path="/templates" component={Templates} />
      <Route path="/templates/:slug/preview" component={TemplatePreview} />
      <Route path="/sites/:id/edit" component={EditSite} />
      <Route path="/demos" component={Demos} />
      <Route path="/videos" component={Videos} />
      <Route component={NotFound} />
    </Switch>
  );
}

/** Share and video links are what clients open, so only the rest needs a staff sign-in. */
function OperatorApp() {
  return (
    <Switch>
      <Route path="/share/:id" component={SharePreview} />
      <Route path="/video/:id" component={VideoShare} />
      <Route>
        <StaffGate>
          <OperatorBar />
          <OperatorRoutes />
        </StaffGate>
      </Route>
    </Switch>
  );
}

function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

export default function App() {
  const hostname = window.location.hostname;
  // Hand-built client sites mapped in code (lib/domain-sites.ts).
  const domainSlug = getDomainSiteSlug(hostname);
  if (domainSlug) return <DomainSite slug={domainSlug} />;
  if (isLocalHost(hostname)) return <OperatorApp />;
  // Any other host may be a client domain saved on a site; when no site claims
  // it, this is the operator app itself (its Bolt URL, for instance).
  return <ClientDomainSite hostname={hostname} fallback={<OperatorApp />} />;
}
