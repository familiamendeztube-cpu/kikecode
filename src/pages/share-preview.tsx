import { useRoute } from "wouter";
import NotFound from "@/pages/not-found";
import { StatusScreen } from "@/components/status-screen";
import { SiteRenderer } from "@/sites/site-renderer";
import { usePublishedSite } from "@/lib/saved-site";

/**
 * A published site at its share link (/share/:id): the revision staff
 * published, with live forms. Drafts are reviewed at /preview/:token instead.
 */
export default function SharePreview() {
  const [, params] = useRoute("/share/:id");
  const id = params?.id ?? "";
  const site = usePublishedSite({ id });

  if (!id || site?.status === "notfound") return <NotFound />;
  if (site?.status === "disabled") {
    return <StatusScreen title="Este sitio no está disponible" detail="This site is not available." />;
  }
  if (!site) return <StatusScreen kind="loading" title="Cargando… / Loading…" />;
  if (site.status === "error") {
    return <StatusScreen kind="error" title="No se pudo cargar el sitio / Could not load this site" detail={site.message} />;
  }
  return <SiteRenderer template={site.template} />;
}
