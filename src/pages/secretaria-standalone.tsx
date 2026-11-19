import { useRoute } from "wouter";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import { StatusScreen } from "@/components/status-screen";
import { SecretariaCard } from "@/sites/shared/secretaria-card";
import { usePublishedSite } from "@/lib/saved-site";
import type { BusinessTemplate } from "@/templates/types";
import { pick } from "@/lib/i18n";

/** Clean strings the Secretaria card may show (from overrides.tourismDemo.secretary). */
function secretaryNames(template: BusinessTemplate): { name: string; type: string } {
  const s = template.tourismDemo?.secretary;
  const name = typeof s?.businessName === "string" ? s.businessName.replace(/[<>]/g, "").trim().slice(0, 60) : "";
  const type = typeof s?.businessType === "string" ? s.businessType.replace(/[<>]/g, "").trim().slice(0, 60) : "";
  return { name: name || template.brand.name, type: type || template.category || "" };
}

/** The standalone Secretaria IA presentation, same token family as a draft preview. */
export default function SecretariaStandalone() {
  const [, params] = useRoute("/preview/:token/secretaria");
  const token = params?.token ?? "";
  const isPlw = token.startsWith("plw-");
  const site = usePublishedSite({ preview: token });

  useEffect(() => {
    const robots = Object.assign(document.createElement("meta"), { name: "robots", content: "noindex, nofollow" });
    document.head.append(robots);
    return () => robots.remove();
  }, []);

  if (!isPlw || !token) return <NotFound />;
  if (site?.status === "notfound") return <NotFound />;
  if (site?.status === "disabled") {
    return <StatusScreen title="Esta presentación ya no está disponible" detail="This presentation is no longer available." />;
  }
  if (!site) return <StatusScreen kind="loading" title="Cargando… / Loading…" />;
  if (site.status === "error") {
    return <StatusScreen kind="error" title="No se pudo cargar la presentación / Could not load this presentation" detail={site.message} />;
  }
  const { name, type } = secretaryNames(site.template);
  return (
    <div className="min-h-dvh bg-[#FAF7F0] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-[#1C241E] mb-1 text-center">{name}</h1>
        <p className="text-sm text-[#3D4A40] text-center mb-6">{pick("es" as const, "", "")}</p>
        <SecretariaCard
          previewToken={token.slice(4)}
          businessName={name}
          businessType={type}
        />
      </div>
    </div>
  );
}
