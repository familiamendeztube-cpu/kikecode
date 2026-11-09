import { useEffect, useState, type ReactNode } from "react";
import { ImageOff } from "lucide-react";
import type { BusinessTemplate, BrandConfig, BrandPalette, Lang, LocalizedContent } from "@/templates/types";
import { EditableText } from "@/editor/editable";
import { pick } from "@/lib/i18n";

/** What every section of the business site renders from. */
export type SiteProps = {
  template: BusinessTemplate;
  brand: BrandConfig;
  p: BrandPalette;
  t: LocalizedContent;
  lang: Lang;
};

/* Photo with an elegant, brand-tinted "Original photo pending" placeholder when
   the source is missing or fails to load. The placeholder reuses the SAME
   className as the image so it fills its container identically (object-cover
   surfaces, absolute hero fills, etc.). Honest by design: a real named business
   with no photo yet shows this instead of a stock substitute. */
export function SiteImage({ src, alt, className, palette, lang, loading = "lazy" }: {
  src: string | undefined;
  alt: string;
  className: string;
  palette: BrandPalette;
  lang: Lang;
  loading?: "eager" | "lazy";
}) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => { setFailed(!src); }, [src]);
  if (failed || !src) {
    return (
      <div
        className={`${className} grid place-items-center text-center`}
        style={{ background: `linear-gradient(135deg, ${palette.heroFrom}, ${palette.heroTo})` }}
        aria-label={alt}
      >
        <div className="text-white/90 px-4">
          <ImageOff className="w-8 h-8 mx-auto mb-2 opacity-80" />
          <div className="text-xs font-semibold tracking-wide">
            {pick(lang, "Original photo pending", "Imagen original pendiente")}
          </div>
        </div>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setFailed(true)} />;
}

/** The small colored label above a heading. */
export function Eyebrow({ color, className = "mb-3", children }: { color: string; className?: string; children: ReactNode }) {
  return <div className={`text-xs font-bold uppercase tracking-widest ${className}`} style={{ color }}>{children}</div>;
}

/** See-through call-to-action over a dark or photo background. */
export const GHOST_CTA = "inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold px-7 py-4 rounded-lg transition-colors";

export function SectionHeader({ eyebrow, title, blurb, dark, accent, titlePath, eyebrowPath, blurbPath }: { eyebrow: string; title: string; blurb?: string; dark?: boolean; accent: string; titlePath?: (string | number)[]; eyebrowPath?: (string | number)[]; blurbPath?: (string | number)[] }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <Eyebrow color={accent}>
        {eyebrowPath ? <EditableText as="span" path={eyebrowPath} value={eyebrow} /> : eyebrow}
      </Eyebrow>
      <h2 className={`font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
        {titlePath ? <EditableText as="span" path={titlePath} value={title} /> : title}
      </h2>
      {blurb && (
        <p className={`mt-3 ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {blurbPath ? <EditableText as="span" path={blurbPath} value={blurb} /> : blurb}
        </p>
      )}
    </div>
  );
}

export function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

/**
 * A generic template's reviews and claims are samples written for the demo,
 * until staff confirm them with the business (`contentConfirmed`). A real,
 * named business's own template is its content.
 */
export function isSampleContent(template: BusinessTemplate): boolean {
  return !template.realBusiness && !template.contentConfirmed;
}

/** The visible tag on sample content, so no visitor takes it for a real review or a checked claim. */
export function SampleTag({ lang, className = "" }: { lang: Lang; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-900 ${className}`}>
      {lang === "en" ? "Sample — to confirm with the business" : "Ejemplo — por confirmar con el negocio"}
    </span>
  );
}
