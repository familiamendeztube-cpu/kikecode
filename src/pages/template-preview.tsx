import { useMemo } from "react";
import { useRoute } from "wouter";
import Customizer from "@/editor/customizer";
import NotFound from "@/pages/not-found";
import { getTemplate } from "@/templates";

export default function TemplatePreview() {
  const [, params] = useRoute("/templates/:slug/preview");
  const t = params?.slug ? getTemplate(params.slug) : null;
  // From the gallery's "Con Secretaria IA": the site starts with the Secretaria section on.
  // Memoized: the customizer starts over whenever `original` changes identity.
  const withSecretaria = new URLSearchParams(window.location.search).get("secretaria") === "1";
  const original = useMemo(() => (t && withSecretaria && !t.siteVariant ? { ...t, secretaria: true } : t), [t, withSecretaria]);
  if (!original) return <NotFound />;
  return <Customizer original={original} />;
}
