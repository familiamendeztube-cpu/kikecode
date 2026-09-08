import { useRoute } from "wouter";
import CustomizerWrapper from "@/components/customizer-wrapper";
import NotFound from "@/pages/not-found";
import { getTemplate } from "@/lib/templates";

export default function TemplatePreview() {
  const [, params] = useRoute("/templates/:slug/preview");
  const t = params?.slug ? getTemplate(params.slug) : null;
  if (!t) return <NotFound />;
  return <CustomizerWrapper original={t} />;
}
