import { useRef, useState } from "react";
import { Phone, ArrowRight, Play, ThumbsUp, CheckCircle2 } from "lucide-react";
import { SiteImage, SectionHeader, type SiteProps } from "./ui";

/* VIDEO GALLERY — click-to-play portrait cards (no autoplay; fast on mobile) */
export function VideoGallery({ template, p, lang }: SiteProps) {
  if (!template.videoGallery?.items.length) return null;
  return (
    <section id="videos" className="py-20 sm:py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={
            template.videoGallery.eyebrow
              ? (lang === "en" ? template.videoGallery.eyebrow.en : template.videoGallery.eyebrow.es)
              : (lang === "en" ? "Real work, on video" : "Trabajo real, en video")
          }
          title={lang === "en" ? template.videoGallery.title.en : template.videoGallery.title.es}
          blurb={lang === "en" ? template.videoGallery.blurb.en : template.videoGallery.blurb.es}
          dark
          accent={p.accent}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {template.videoGallery.items.map((v) => (
            <VideoCard
              key={v.src}
              src={v.src}
              poster={v.poster}
              title={lang === "en" ? v.title.en : v.title.es}
              caption={lang === "en" ? v.caption.en : v.caption.es}
              ctaLabel={
                template.videoGallery!.ctaLabel
                  ? (lang === "en" ? template.videoGallery!.ctaLabel.en : template.videoGallery!.ctaLabel.es)
                  : (lang === "en" ? "Get a Similar Project" : "Quiero un Proyecto Así")
              }
              palette={p}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Click-to-play portrait video card for the optional video gallery.
   No autoplay and preload="none" keep the page fast on mobile. */
function VideoCard({ src, poster, title, caption, ctaLabel, palette }: {
  src: string;
  poster?: string;
  title: string;
  caption: string;
  ctaLabel: string;
  palette: { primary: string; accent: string };
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl">
      <div className="relative aspect-[3/4] overflow-hidden bg-black">
        <video
          ref={ref}
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          poster={poster}
          playsInline
          controls={playing}
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            type="button"
            onClick={() => { void ref.current?.play(); }}
            aria-label={title}
            className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/70 via-black/10 to-black/30 transition-colors hover:from-black/60"
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white shadow-2xl transition-transform group-hover:scale-110" style={{ backgroundColor: palette.primary }}>
              <Play className="w-7 h-7 translate-x-[2px]" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <div className="font-bold tracking-tight mb-1 text-white">{title}</div>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{caption}</p>
        <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-80" style={{ color: palette.accent }}>
          {ctaLabel} <ArrowRight className="w-4 h-4" />
        </a>
      </figcaption>
    </figure>
  );
}

/* IN ACTION — photo-forward feature band */
export function InAction({ template, brand, p, lang }: SiteProps) {
  const media = template.media;
  if (!media) return null;
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 lg:space-y-24">
        {/* Row 1 — image left, copy right */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
              <img src={media.gallery[media.gallery.length - 2] ?? media.hero} alt={lang === "en" ? `${brand.name} crew on the job` : `Equipo de ${brand.name} trabajando`} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="hidden sm:flex absolute -bottom-5 -right-5 items-center gap-3 bg-white rounded-2xl shadow-xl px-5 py-4 ring-1 ring-slate-100">
              <div className="w-11 h-11 rounded-full grid place-items-center text-white shrink-0" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>
                <ThumbsUp className="w-5 h-5" />
              </div>
              <div className="text-sm leading-tight">
                <div className="font-extrabold text-slate-900">{lang === "en" ? "Done right" : "Bien hecho"}</div>
                <div className="text-slate-500 text-xs">{lang === "en" ? "the first time" : "a la primera"}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.primary }}>
              {lang === "en" ? "See us on the job" : "Míranos trabajando"}
            </div>
            <h3 className="font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 mb-4">
              {lang === "en" ? "Skilled hands you can trust" : "Manos expertas en quien confiar"}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              {lang === "en"
                ? "From the first knock to the final walk-through, our crew treats your property like our own — careful prep, premium materials, and a clean job site every single day."
                : "Desde que tocamos la puerta hasta la inspección final, tratamos su propiedad como la nuestra — preparación cuidadosa, materiales premium y un sitio de trabajo limpio todos los días."}
            </p>
            <ul className="space-y-3">
              {(lang === "en"
                ? ["Background-checked, uniformed professionals", "Upfront pricing — no surprises", "Photos and updates as the work gets done"]
                : ["Profesionales uniformados y verificados", "Precios claros — sin sorpresas", "Fotos y avisos mientras avanza el trabajo"]
              ).map((li) => (
                <li key={li} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: p.primary }} />
                  <span className="text-slate-700">{li}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2 — copy left, image right */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="lg:order-2">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
              <img src={media.gallery[media.gallery.length - 1] ?? media.hero} alt={lang === "en" ? `${brand.name} delivering quality work` : `${brand.name} entregando trabajo de calidad`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:order-1">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.primary }}>
              {lang === "en" ? "Bilingual, every step" : "Bilingüe en cada paso"}
            </div>
            <h3 className="font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 mb-4">
              {lang === "en" ? "We speak your language" : "Hablamos su idioma"}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              {lang === "en"
                ? "English or Spanish, you'll always know exactly what's happening and what it costs. Real people answer the phone, day or night — no robots, no runaround."
                : "En inglés o español, siempre sabrá exactamente qué está pasando y cuánto cuesta. Personas reales contestan el teléfono, de día o de noche — sin robots, sin vueltas."}
            </p>
            <a href={brand.phoneHref} className="inline-flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: p.primary }}>
              <Phone className="w-4 h-4" /> {brand.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* TRANSFORMATION — before / during / after */
export function Transformation({ template, p, lang }: SiteProps) {
  if (!template.transformation?.steps.length) return null;
  return (
    <section id="transformation" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "The transformation" : "La transformación"}
          title={lang === "en" ? template.transformation.title.en : template.transformation.title.es}
          blurb={lang === "en" ? template.transformation.blurb.en : template.transformation.blurb.es}
          accent={p.primary}
        />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {template.transformation.steps.map((s, i) => (
            <figure key={s.src} className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={s.src} alt={lang === "en" ? s.label.en : s.label.es} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-full" style={{ backgroundColor: p.primary }}>
                  {i + 1} · {lang === "en" ? s.phase.en : s.phase.es}
                </span>
              </div>
              <figcaption className="p-5">
                <div className="font-bold tracking-tight mb-1">{lang === "en" ? s.label.en : s.label.es}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{lang === "en" ? s.caption.en : s.caption.es}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* GALLERY */
export function Gallery({ template, p, lang }: SiteProps) {
  const media = template.media;
  const captions = template.galleryCaptions?.[lang] ?? [];
  if (!media?.gallery.length) return null;
  return (
    <section id="gallery" className="py-20 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "Recent work" : "Trabajos recientes"}
          title={lang === "en" ? "Real projects, real results" : "Proyectos reales, resultados reales"}
          accent={p.primary}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[170px] sm:auto-rows-[220px] gap-4 mt-12">
          {media.gallery.map((src, i) => (
            <figure key={src} className={`group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <SiteImage src={src} alt={captions[i] ?? `Project ${i+1}`} palette={p} lang={lang} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              {captions[i] && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-sm font-semibold p-4">
                  {captions[i]}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CLIENT TRUST — real people, no celebrity claims */
export function ClientTrust({ template, p, lang }: SiteProps) {
  if (!template.clientTrust?.images.length) return null;
  return (
    <section id="trust" className="py-20 sm:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "Real people" : "Personas reales"}
          title={lang === "en" ? template.clientTrust.title.en : template.clientTrust.title.es}
          blurb={lang === "en" ? template.clientTrust.blurb.en : template.clientTrust.blurb.es}
          accent={p.primary}
        />
        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {template.clientTrust.images.map((img) => (
            <figure key={img.src} className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={img.src} alt={lang === "en" ? img.caption.en : img.caption.es} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white text-sm font-semibold p-5">
                {lang === "en" ? img.caption.en : img.caption.es}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* HERITAGE — country & history */
export function Heritage({ template, p, lang }: SiteProps) {
  if (!template.heritage?.images.length) return null;
  return (
    <section id="heritage" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "Our roots" : "Nuestras raíces"}
          title={lang === "en" ? template.heritage.title.en : template.heritage.title.es}
          accent={p.primary}
        />
        <p className="max-w-3xl mx-auto text-center text-slate-600 leading-relaxed mt-4">
          {lang === "en" ? template.heritage.blurb.en : template.heritage.blurb.es}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[200px] sm:auto-rows-[240px] gap-4 mt-12">
          {template.heritage.images.map((img, i) => (
            <figure
              key={img.src}
              className={`group relative rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200 ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={img.src}
                alt={lang === "en" ? img.en : img.es}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-sm font-semibold p-4">
                {lang === "en" ? img.en : img.es}
              </figcaption>
            </figure>
          ))}
        </div>

        {template.heritage.history && template.heritage.history.milestones.length > 0 && (
          <div className="mt-20">
            <h3 className="text-center font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900">
              {lang === "en" ? template.heritage.history.title.en : template.heritage.history.title.es}
            </h3>
            <ol className="relative mt-12 max-w-3xl mx-auto">
              <span
                className="absolute left-[27px] sm:left-1/2 sm:-translate-x-1/2 top-2 bottom-2 w-0.5 rounded-full"
                style={{ background: `linear-gradient(to bottom, ${p.primary}, ${p.primary}22)` }}
                aria-hidden="true"
              />
              {template.heritage.history.milestones.map((m, i) => (
                <li
                  key={m.year.en + i}
                  className={`relative pl-20 sm:pl-0 sm:w-1/2 pb-10 last:pb-0 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"}`}
                >
                  <span
                    className={`absolute top-1 z-10 grid place-items-center w-14 h-14 rounded-full text-white font-extrabold text-sm shadow-lg ring-4 ring-white left-0 ${i % 2 === 0 ? "sm:left-auto sm:-right-7" : "sm:-left-7"}`}
                    style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}
                  >
                    {lang === "en" ? m.year.en : m.year.es}
                  </span>
                  <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-5 shadow-sm">
                    <div className="font-bold text-slate-900">
                      {lang === "en" ? m.title.en : m.title.es}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1.5">
                      {lang === "en" ? m.text.en : m.text.es}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
