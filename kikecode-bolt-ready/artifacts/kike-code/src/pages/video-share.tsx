import { useState } from "react";
import { useRoute } from "wouter";
import { Phone, Globe } from "lucide-react";
import { getClientVideo } from "@/lib/client-videos";
import { getTemplate } from "@/lib/templates";
import NotFound from "@/pages/not-found";

export default function VideoShare() {
  const [, params] = useRoute("/video/:id");
  const video = params?.id ? getClientVideo(params.id) : null;
  const [lang, setLang] = useState<"en" | "es">("en");

  if (!video) return <NotFound />;

  const tpl = getTemplate(video.businessSlug);
  const brand = tpl?.brand;
  const primary = brand?.palette.primary ?? "#1D4ED8";
  const accent = brand?.palette.accent ?? "#F97316";
  const name = brand?.name ?? "Los Primos Plumbing";
  const phone = brand?.phone ?? "(562) 550-9099";
  const phoneHref = brand?.phoneHref ?? "tel:+15625509099";
  const logo = brand?.logo;
  const t = (en: string, es: string) => (lang === "en" ? en : es);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <header className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt={name} className="w-10 h-10 rounded-full object-contain bg-white" />
            ) : (
              <span className="w-10 h-10 rounded-lg grid place-items-center font-bold" style={{ backgroundColor: primary }}>
                {name.charAt(0)}
              </span>
            )}
            <span className="font-bold tracking-tight">{name}</span>
          </div>
          <button
            type="button"
            onClick={() => setLang((l) => (l === "en" ? "es" : "en"))}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest border border-white/20 rounded-full px-3 py-1.5 hover:bg-white/10 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" /> {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:py-12">
        <video
          className="mx-auto max-h-[62vh] w-auto rounded-2xl border border-white/10 shadow-2xl bg-black"
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
        />

        <div className="text-center mt-8">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${accent}22`, color: accent }}>
            {t("Professional Latino Workers", "Trabajadores Latinos Profesionales")}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t(video.title.en, video.title.es)}</h1>
          <p className="text-slate-400 mt-3 max-w-md mx-auto leading-relaxed">{t(video.caption.en, video.caption.es)}</p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 font-bold rounded-xl px-6 py-3.5 w-full sm:w-auto text-white shadow-lg transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: primary }}
            >
              <Phone className="w-4.5 h-4.5" /> {t("Call", "Llamar")} {phone}
            </a>
            {tpl && (
              <a
                href={`${import.meta.env.BASE_URL}templates/${video.businessSlug}/preview`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 font-bold rounded-xl px-6 py-3.5 w-full sm:w-auto border border-white/20 hover:bg-white/10 transition-colors"
              >
                {t("Get a Free Quote", "Cotización Gratis")}
              </a>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        {name} · {phone}
      </footer>
    </div>
  );
}
