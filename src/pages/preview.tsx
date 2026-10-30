import { useEffect } from "react";
import { useRoute } from "wouter";
import { MessageCircle, Check, Pencil, Eye } from "lucide-react";
import NotFound from "@/pages/not-found";
import { StatusScreen } from "@/components/status-screen";
import { SiteRenderer } from "@/sites/site-renderer";
import { waLink } from "@/sites/shared/whatsapp";
import { usePublishedSite } from "@/lib/saved-site";

/**
 * A site's current draft, for the client to review (/preview/:token). The
 * token is unguessable and staff can replace it; the page is never indexed and
 * its forms say they are a preview (the site renders without a site id).
 */
export default function Preview() {
  const [, params] = useRoute("/preview/:token");
  const token = params?.token ?? "";
  const site = usePublishedSite({ preview: token });
  useNoIndex();

  if (!token || site?.status === "notfound") return <NotFound />;
  if (site?.status === "disabled") {
    return <StatusScreen title="Esta vista previa ya no está disponible" detail="This preview is no longer available." />;
  }
  if (!site) return <StatusScreen kind="loading" title="Cargando vista previa… / Loading preview…" />;
  if (site.status === "error") {
    return <StatusScreen kind="error" title="No se pudo cargar la vista previa / Could not load this preview" detail={site.message} />;
  }
  return (
    <>
      <div className="sticky top-0 z-[70] flex items-center justify-center gap-2 bg-amber-400 px-4 py-1.5 text-center text-xs font-semibold text-slate-900">
        <Eye className="h-3.5 w-3.5 shrink-0" />
        Vista previa: este sitio todavía no está publicado. · Preview: this site is not published yet.
      </div>
      <SiteRenderer template={site.template} />
      <ShareConversionAsk businessName={site.template.brand.name} />
    </>
  );
}

/** Keep search engines away from drafts (kike-sites also sends X-Robots-Tag on the data). */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}

/* Client-facing conversion ask shown only on previews. Addresses the
   business owner who received the link. Uses wa.me without a number so WhatsApp
   opens the contact picker (the owner replies to whoever sent them the link) —
   no fabricated agency phone. Sits below the site so it never disturbs it. */
function ShareConversionAsk({ businessName }: { businessName: string }) {
  const wa = (text: string) => waLink("", text);
  return (
    <section className="bg-slate-950 text-white pb-28 lg:pb-16 pt-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          ¿Le gusta este diseño para su negocio?
        </h2>
        <p className="mt-1 text-white/60 text-sm">Like this design for your business?</p>
        <p className="mt-4 text-white/80 max-w-xl mx-auto">
          Esto es una vista previa de su sitio web. Dígale a su diseñador si quiere
          publicarlo o pedir cambios. <span className="text-white/50">This is a preview of your website — let your designer know if you'd like to publish it or request changes.</span>
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={wa(`¡Hola! Me gustó el sitio web de "${businessName}" que me envió. Sí lo quiero. 🎉`)}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold px-6 py-4 rounded-lg text-white shadow-xl transition-transform hover:translate-y-[-2px]"
            style={{ backgroundColor: "#25D366" }}
          >
            <Check className="w-5 h-5" /> Sí, quiero este sitio
          </a>
          <a
            href={wa(`¡Hola! Vi el sitio web de "${businessName}". Me gustaría pedir algunos cambios:`)}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold px-6 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-colors"
          >
            <Pencil className="w-5 h-5" /> Pedir cambios
          </a>
          <a
            href={wa(`¡Hola! Tengo una pregunta sobre el sitio web de "${businessName}".`)}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold px-6 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-colors"
          >
            <MessageCircle className="w-5 h-5" /> Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
