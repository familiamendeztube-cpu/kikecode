import type { ReactNode } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
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

const queryClient = new QueryClient();

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
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/share/:id" component={SharePreview} />
        <Route path="/video/:id" component={VideoShare} />
        <Route>
          <StaffGate>
            <AuthProvider>
              <OperatorBar />
              <OperatorRoutes />
            </AuthProvider>
          </StaffGate>
        </Route>
      </Switch>
    </WouterRouter>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

function App() {
  const hostname = window.location.hostname;
  // Hand-built client sites mapped in code (lib/domain-sites.ts).
  const domainSlug = getDomainSiteSlug(hostname);
  if (domainSlug) return <Shell><DomainSite slug={domainSlug} /></Shell>;
  if (isLocalHost(hostname)) return <Shell><OperatorApp /></Shell>;
  // Any other host may be a client domain saved on a site; when no site claims
  // it, this is the operator app itself (its Bolt URL, for instance).
  return <Shell><ClientDomainSite hostname={hostname} fallback={<OperatorApp />} /></Shell>;
}

export default App;
