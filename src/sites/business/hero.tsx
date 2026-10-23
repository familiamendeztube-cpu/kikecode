import { useRef, useState } from "react";
import { Phone, ShieldCheck, Star, Check, ArrowRight, Play, Pause } from "lucide-react";
import type { Lang } from "@/templates/types";
import { EditableText, ChangePhotoButton } from "@/editor/editable";
import { SiteImage, type SiteProps } from "./ui";

/* Shared play/pause state for a muted looping video. Respects prefers-reduced-motion:
   never autoplay looping footage for users who asked the OS to minimize motion.
   Computed before first paint so the video never briefly autoplays. */
function useLoopingVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(
    () => !(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches),
  );
  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setVideoPlaying(true);
    } else {
      v.pause();
      setVideoPlaying(false);
    }
  };
  return { videoRef, videoPlaying, setVideoPlaying, toggleVideo };
}

/* AVAILABILITY MARQUEE */
export function AvailabilityBar({ template, brand, p, lang }: SiteProps) {
  const availability = template.availability;
  if (!availability) return null;
  return (
    <div className="text-white text-xs sm:text-sm font-semibold py-2 px-4 text-center" style={{ background: `linear-gradient(90deg, ${p.primaryDark}, ${p.primary})` }}>
      <span className="inline-flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-white" /></span>
          {lang === "en" ? "24-hour AI assistant on call" : "Asistente IA disponible 24 horas"}
        </span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">{availability[lang]}</span>
        <span>·</span>
        <span>{brand.phone}</span>
      </span>
    </div>
  );
}

/* TOP BAR */
export function SiteHeader({ template, brand, p, t, lang, setLang }: SiteProps & { setLang: (lang: Lang) => void }) {
  const HeroIcon = brand.heroIcon;
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          {brand.logo ? (
            <img src={brand.logo} alt={brand.name} className="w-11 h-11 rounded-full object-contain bg-white ring-1 ring-slate-200" />
          ) : (
            <div className="w-9 h-9 rounded-lg grid place-items-center text-white" style={{ backgroundColor: p.primary }}>
              <HeroIcon className="w-5 h-5" />
            </div>
          )}
          <div className="leading-tight">
            <div className="font-bold text-slate-900 tracking-tight">{brand.name}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 hidden sm:block">{brand.city}</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          <a href="#offers" className="hover:opacity-80">{lang === "en" ? "What We Offer" : "Lo Que Ofrecemos"}</a>
          {template.inventory && <a href="#inventory" className="hover:opacity-80">{lang === "en" ? "Inventory" : "Inventario"}</a>}
          <a href="#services" className="hover:opacity-80">{t.nav.services}</a>
          {template.videoGallery && <a href="#videos" className="hover:opacity-80">Videos</a>}
          <a href="#gallery" className="hover:opacity-80">{lang === "en" ? "Gallery" : "Galería"}</a>
          <a href="#process" className="hover:opacity-80">{t.nav.process}</a>
          <a href="#areas" className="hover:opacity-80">{lang === "en" ? "Areas" : "Áreas"}</a>
          <a href="#testimonials" className="hover:opacity-80">{t.nav.testimonials}</a>
          <a href="#faq" className="hover:opacity-80">{t.nav.faq}</a>
          <a href="#contact" className="hover:opacity-80">{t.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-2">
          {!template.lockedLang && (
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border border-slate-300 hover:opacity-80 transition-colors"
            >{lang === "en" ? "ES" : "EN"}</button>
          )}
          <a href={brand.phoneHref} className="inline-flex items-center gap-2 text-white text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-lg shadow-sm transition-opacity hover:opacity-90" style={{ backgroundColor: p.primary }}>
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{brand.phone}</span>
            <span className="sm:hidden">{t.nav.call}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* HERO — full-bleed photo with brand-color overlay */
export function Hero({ template, brand, p, t, lang }: SiteProps) {
  const media = template.media;
  const HeroIcon = brand.heroIcon;
  const { videoRef, videoPlaying, setVideoPlaying, toggleVideo } = useLoopingVideo();
  return (
    <section id="top" className="relative overflow-hidden min-h-[84vh] flex items-center" style={{ background: `linear-gradient(135deg, ${p.heroFrom}, ${p.heroVia}, ${p.heroTo})` }}>
      {/* Background photo */}
      {media?.heroVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={media.heroVideo}
          poster={media.heroPoster ?? media.hero}
          autoPlay={videoPlaying}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
          aria-label={lang === "en" ? `${brand.name} project film` : `Video de ${brand.name}`}
        />
      ) : media?.hero ? (
        <SiteImage src={media.hero} alt={`${brand.name} hero`} palette={p} lang={lang} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      ) : (
        <div className="absolute inset-0 grid place-items-center" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>
          <HeroIcon className="w-48 h-48 text-white/15 drop-shadow-2xl" />
        </div>
      )}
      {/* Brand-color gradient overlay — dark enough on the left for readable text,
          but lets the worker photo show clearly on the right half. */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(100deg, ${p.heroFrom}f2 0%, ${p.heroFrom}d9 36%, ${p.heroVia}8c 58%, ${p.heroTo}33 78%, transparent 100%)`,
        }}
      />
      {/* Soft bottom scrim so the floating cards and badges stay legible */}
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: `linear-gradient(to top, ${p.heroFrom}b3, transparent)` }} />
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 15% 20%, ${p.heroGlow1}, transparent 55%), radial-gradient(circle at 85% 80%, ${p.heroGlow2}, transparent 55%)` }} />

      {/* Hero video pause/play toggle (respects prefers-reduced-motion via videoPlaying) */}
      {media?.heroVideo && (
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={videoPlaying ? (lang === "en" ? "Pause video" : "Pausar video") : (lang === "en" ? "Play video" : "Reproducir video")}
          className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur border border-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          {videoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-[1px]" />}
        </button>
      )}

      {media?.hero && !media?.heroVideo && (
        <ChangePhotoButton path={["media", "hero"]} className="absolute top-4 left-4 z-20" />
      )}

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-24 lg:py-28">
        <div className="max-w-2xl text-white">
          {brand.logo && (
            <img src={brand.logo} alt={brand.name} className="h-14 w-14 mb-4 sm:h-16 sm:w-16 sm:mb-5 rounded-2xl object-contain bg-white/10 backdrop-blur ring-1 ring-white/25 p-2 shadow-xl" />
          )}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/25 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 sm:mb-6" style={{ color: p.accent }}>
            <Star className="w-3.5 h-3.5" style={{ fill: p.accent, color: p.accent }} />{" "}
            <EditableText as="span" path={["content", lang, "hero", "eyebrow"]} value={t.hero.eyebrow} />
          </div>
          <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] sm:leading-[1.02] tracking-tight mb-4 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
            <EditableText as="span" path={["content", lang, "hero", "title1"]} value={t.hero.title1} />{" "}
            <EditableText as="span" path={["content", lang, "hero", "title2"]} value={t.hero.title2} style={{ color: p.accent }} />
          </h1>
          <EditableText as="p" multiline path={["content", lang, "hero", "subtitle"]} value={t.hero.subtitle} className="text-base sm:text-xl text-white/90 max-w-xl mb-7 sm:mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]" />
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a href={template.inventory ? "#inventory" : "#contact"} className="inline-flex items-center justify-center gap-2 text-white font-bold px-7 py-4 rounded-lg shadow-2xl transition-all hover:translate-y-[-2px] hover:scale-[1.02]" style={{ backgroundColor: p.primary, boxShadow: `0 18px 40px -10px ${p.primary}` }}>
              {t.hero.cta1} <ArrowRight className="w-4 h-4" />
            </a>
            <a href={brand.phoneHref} className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold px-7 py-4 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> {brand.phone}
            </a>
            {template.videoGallery && (
              <a href="#videos" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/25 text-white font-bold px-7 py-4 rounded-lg transition-colors">
                <Play className="w-4 h-4" /> {lang === "en" ? "Watch Videos" : "Ver Videos"}
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {t.hero.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 backdrop-blur border border-white/20 text-white px-3 py-1.5 rounded-full">
                <Check className="w-3 h-3" style={{ color: p.accent }} /> {b}
              </span>
            ))}
          </div>
        </div>

        {/* Floating trust + rating cards */}
        <div className="hidden lg:block absolute right-6 bottom-8 space-y-3 max-w-[280px]">
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 grid place-items-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold">{t.hero.trustTitle}</div>
              <div className="text-slate-500">{t.hero.trustSubtitle}</div>
            </div>
          </div>
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 grid place-items-center text-amber-600 shrink-0">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div className="text-xs">
              <div className="font-bold">{t.hero.ratingTitle}</div>
              <div className="text-slate-500">{t.hero.ratingSubtitle}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* BRAND FILM — cinematic autoplay loop */
export function BrandFilm({ template, brand, p, lang }: SiteProps) {
  const media = template.media;
  const { videoRef, videoPlaying, setVideoPlaying, toggleVideo } = useLoopingVideo();
  if (!media?.video) return null;
  return (
    <section className="relative bg-slate-950">
      <div className="relative w-full overflow-hidden aspect-video max-h-[78vh]">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={media.video}
          poster={media.hero}
          autoPlay={videoPlaying}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
          aria-label={lang === "en" ? `${brand.name} brand film` : `Video de ${brand.name}`}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${p.heroFrom}e6 0%, ${p.heroFrom}40 45%, transparent 75%)` }} />
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={videoPlaying ? (lang === "en" ? "Pause video" : "Pausar video") : (lang === "en" ? "Play video" : "Reproducir video")}
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/45 hover:bg-black/65 text-white backdrop-blur border border-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          {videoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-[1px]" />}
        </button>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 mb-3">
              <span className={`inline-flex w-2 h-2 rounded-full ${videoPlaying ? "bg-red-500 animate-pulse" : "bg-white/50"}`} />
              {videoPlaying ? (lang === "en" ? "Now playing" : "Reproduciendo") : (lang === "en" ? "Paused" : "En pausa")}
            </div>
            <h2 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              {lang === "en" ? "See the craft in motion" : "Mira nuestro trabajo en acción"}
            </h2>
            <p className="text-white/90 mt-3 max-w-xl text-base sm:text-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              {lang === "en"
                ? `A behind-the-scenes look at how ${brand.name} brings care, skill, and pride to every single job.`
                : `Un vistazo a cómo ${brand.name} pone cuidado, destreza y orgullo en cada trabajo.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
