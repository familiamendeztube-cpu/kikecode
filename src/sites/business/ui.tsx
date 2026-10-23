import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import type { BusinessTemplate, BrandConfig, BrandPalette, Lang, LocalizedContent } from "@/templates/types";
import { EditableText } from "@/editor/editable";

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
            {lang === "en" ? "Original photo pending" : "Imagen original pendiente"}
          </div>
        </div>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setFailed(true)} />;
}

/* Group slugs into broad industry categories so the renderer can adapt the quote
   form and show category-specific "wow" bands without hardcoding per-slug. */

export function SectionHeader({ eyebrow, title, blurb, dark, accent, titlePath, eyebrowPath, blurbPath }: { eyebrow: string; title: string; blurb?: string; dark?: boolean; accent: string; titlePath?: (string | number)[]; eyebrowPath?: (string | number)[]; blurbPath?: (string | number)[] }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
        {eyebrowPath ? <EditableText as="span" path={eyebrowPath} value={eyebrow} /> : eyebrow}
      </div>
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

export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export function GoogleG({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  );
}

export function YelpBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-grid place-items-center rounded bg-[#d32323] px-1.5 py-0.5 text-[10px] font-extrabold leading-none text-white ${className}`}>Yelp</span>
  );
}
