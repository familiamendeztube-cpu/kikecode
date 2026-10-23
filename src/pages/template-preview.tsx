import { useRoute } from "wouter";
import Customizer from "@/editor/customizer";
import NotFound from "@/pages/not-found";
import { getTemplate } from "@/templates";

export default function TemplatePreview() {
  const [, params] = useRoute("/templates/:slug/preview");
  const t = params?.slug ? getTemplate(params.slug) : null;
  if (!t) return <NotFound />;
  return <Customizer original={t} />;
}
