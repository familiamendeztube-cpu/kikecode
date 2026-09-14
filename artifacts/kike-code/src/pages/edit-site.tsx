import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { AlertCircle, Loader2 } from "lucide-react";
import CustomizerWrapper from "@/components/customizer-wrapper";
import { getTemplate } from "@/lib/templates";
import type { BusinessTemplate } from "@/lib/templates/types";
import { callFn } from "@/lib/plw";
import { rebuildTemplate, type StoredSite } from "@/lib/saved-site";

/** Reopen a saved site in the customizer; saving updates it in place. */
export default function EditSite() {
  const [, params] = useRoute("/sites/:id/edit");
  const id = params?.id;
  const [loaded, setLoaded] = useState<{ site: StoredSite; template: BusinessTemplate } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    callFn<{ site: StoredSite }>("kike-sites", { action: "get", id })
      .then(({ site }) => {
        const base = getTemplate(site.slug);
        if (!base) throw new Error(`Template "${site.slug}" no longer exists.`);
        if (!cancelled) setLoaded({ site, template: rebuildTemplate(base, site, false) });
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load the site.");
      });
    return () => { cancelled = true; };
  }, [id]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center gap-2 text-sm text-red-500 px-6">
        <AlertCircle className="w-4 h-4" /> {error}
      </div>
    );
  }
  if (!loaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading site…
      </div>
    );
  }
  return (
    <CustomizerWrapper
      original={loaded.template}
      seedPhotos={loaded.site.photos}
      startOpen
      savedSite={{ id: loaded.site.id, clientId: loaded.site.client_id, customDomain: loaded.site.custom_domain }}
    />
  );
}
