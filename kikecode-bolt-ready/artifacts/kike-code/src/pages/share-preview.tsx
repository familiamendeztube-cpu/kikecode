import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Loader2, AlertCircle, MessageCircle, Check, Pencil } from "lucide-react";
import BusinessSite from "@/components/business-site";
import LeonardoSite from "@/components/leonardo-site";
import OryzoSite from "@/components/oryzo-site";
import RymSite from "@/components/rym-site";
import FenixSite from "@/components/fenix-site";
import NotFound from "@/pages/not-found";
import { getTemplate } from "@/lib/templates";
import type { BusinessTemplate } from "@/lib/templates/types";

type SavedSite = {
  id: string;
  slug: string;
  brand: {
    name: string; city: string; phone: string; phoneHref: string;
    email: string; address: string;
  };
  content: { en: unknown; es: unknown };
  photos: { hero?: string; gallery?: string[]; teamPortrait?: string };
  overrides?: unknown;
};

function mergeReplaceArrays<T>(target: T, source: unknown): T {
  if (source === null || source === undefined) return target;
  if (Array.isArray(source)) return source as T;
  if (typeof source !== "object") return source as T;
  if (target === null || target === undefined || typeof target !== "object" || Array.isArray(target)) {
    return source as T;
  }
  const out: Record<string, unknown> = { ...(target as Record<string, unknown>) };
  for (const key of Object.keys(source as Record<string, unknown>)) {
    out[key] = mergeReplaceArrays(
      (target as Record<string, unknown>)[key],
      (source as Record<string, unknown>)[key],
    );
  }
  return out as T;
}

function rebuildTemplate(base: BusinessTemplate, saved: SavedSite): BusinessTemplate {
  // Apply the generic overrides (every non brand/content/photo field) first,
  // then let the dedicated brand/content/photo columns win on top.
  const withOverrides = saved.overrides
    ? mergeReplaceArrays(base, saved.overrides)
    : base;
  const next: BusinessTemplate = {
    ...withOverrides,
    brand: { ...withOverrides.brand, ...saved.brand },
    content: mergeReplaceArrays(withOverrides.content, saved.content),
  };
  if (saved.photos && (saved.photos.hero || saved.photos.gallery?.length || saved.photos.teamPortrait)) {
    // Layer uploaded photos on top of the (possibly overridden) media so that
    // edited videos/posters/etc. survive while photos win for their fields.
    const baseMedia = next.media ?? { hero: "", gallery: [], teamPortrait: "" };
    next.media = {
      ...baseMedia,
      hero: saved.photos.hero ?? baseMedia.hero,
      gallery: saved.photos.gallery && saved.photos.gallery.length > 0
        ? saved.photos.gallery
        : baseMedia.gallery,
      teamPortrait: saved.photos.teamPortrait ?? baseMedia.teamPortrait,
    };
  }
  return next;
}

export default function SharePreview() {
  const [, params] = useRoute("/share/:id");
  const id = params?.id;
  const [tpl, setTpl] = useState<BusinessTemplate | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "notfound" | "disabled" | "error">("loading");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/customized-sites/${encodeURIComponent(id)}`);
        if (res.status === 404) {
          if (!cancelled) setStatus("notfound");
          return;
        }
        if (res.status === 410) {
          if (!cancelled) setStatus("disabled");
          return;
        }
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || `Server returned ${res.status}`);
        }
        const data = (await res.json()) as SavedSite;
        const base = getTemplate(data.slug);
        if (!base) {
          if (!cancelled) {
            setStatus("error");
            setErrMsg(`Template "${data.slug}" no longer exists.`);
          }
          return;
        }
        if (!cancelled) {
          setTpl(rebuildTemplate(base, data));
          setStatus("ok");
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setErrMsg(e instanceof Error ? e.message : "Could not load the preview.");
        }
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (!id || status === "notfound") return <NotFound />;
  if (status === "disabled") {
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
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading preview…</span>
        </div>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h1 className="text-lg font-semibold text-slate-900">Could not load this preview</h1>
          <p className="text-sm text-slate-600">{errMsg}</p>
        </div>
      </div>
    );
  }
  if (!tpl) return null;
  return (
    <>
      {tpl.siteVariant === "leonardo" ? (
        <LeonardoSite template={tpl} />
      ) : tpl.siteVariant === "oryzo" ? (
        <OryzoSite template={tpl} />
      ) : tpl.siteVariant === "rym" ? (
        <RymSite template={tpl} />
      ) : tpl.siteVariant === "fenix" ? (
        <FenixSite template={tpl} />
      ) : (
        <BusinessSite template={tpl} />
      )}
      <ShareConversionAsk businessName={tpl.brand.name} />
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
