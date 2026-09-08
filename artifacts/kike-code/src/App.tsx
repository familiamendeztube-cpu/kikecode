import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { PinGate } from "@/components/pin-gate";
import { OperatorBar } from "@/components/operator-bar";
import NotFound from "@/pages/not-found";

import Templates from "@/pages/templates";
import CreateSite from "@/pages/create";
import TemplatePreview from "@/pages/template-preview";
import SharePreview from "@/pages/share-preview";
import Videos from "@/pages/videos";
import Demos from "@/pages/demos";
import VideoShare from "@/pages/video-share";
import DomainSite from "@/pages/domain-site";
import { getDomainSiteSlug } from "@/lib/domain-sites";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Templates} />
      <Route path="/create" component={CreateSite} />
      <Route path="/templates" component={Templates} />
      <Route path="/templates/:slug/preview" component={TemplatePreview} />
      <Route path="/share/:id" component={SharePreview} />
      <Route path="/demos" component={Demos} />
      <Route path="/videos" component={Videos} />
      <Route path="/video/:id" component={VideoShare} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // A client's own domain linked to this deployment renders their site
  // full-page — no PIN gate, no operator chrome.
  const domainSlug = getDomainSiteSlug(window.location.hostname);
  if (domainSlug) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <DomainSite slug={domainSlug} />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PinGate>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AuthProvider>
              <OperatorBar />
              <Router />
            </AuthProvider>
          </WouterRouter>
        </PinGate>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
