import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Loader2, AlertCircle, MessageCircle, Check, Pencil } from "lucide-react";
import NotFound from "@/pages/not-found";
import { SiteRenderer } from "@/components/site-renderer";
import { loadPublishedSite, type PublishedSite } from "@/lib/saved-site";

export default function SharePreview() {
  const [, params] = useRoute("/share/:id");
  const id = params?.id;
  const [site, setSite] = useState<PublishedSite | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setSite(null);
    loadPublishedSite({ id }).then((result) => {
      if (!cancelled) setSite(result);
    });
    return () => { cancelled = true; };
  }, [id]);

  if (!id) return <NotFound />;
  if (site?.status === "notfound") return <NotFound />;
  if (site?.status === "disabled") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h1 className="text-lg font-semibold text-slate-900">Esta demostración ya no está disponible</h1>
          <p className="text-sm text-slate-600">This demo is no longer available.</p>
        </div>
      </div>
    );
  }
  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading preview…</span>
        </div>
      </div>
    );
  }
  if (site.status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h1 className="text-lg font-semibold text-slate-900">Could not load this preview</h1>
          <p className="text-sm text-slate-600">{site.message}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <SiteRenderer template={site.template} />
      <ShareConversionAsk businessName={site.template.brand.name} />
    </>
  );
}

/* Client-facing conversion ask shown only on /share links. Addresses the
   business owner who received the demo. Uses wa.me without a number so WhatsApp
   opens the contact picker (the owner replies to whoever sent them the link) —
   no fabricated agency phone. Sits below the demo so it never disturbs it. */
function ShareConversionAsk({ businessName }: { businessName: string }) {
  const wa = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;
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
