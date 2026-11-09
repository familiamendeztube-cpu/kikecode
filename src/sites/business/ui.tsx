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
export function SiteImage({ src, alt, className, palette, lang, loading = "lazy", position }: {
  src: string | undefined;
  alt: string;
  className: string;
  palette: BrandPalette;
  lang: Lang;
  loading?: "eager" | "lazy";
  /** CSS object-position: where the subject sits, for narrow crops. */
  position?: string;
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
  return <img src={src} alt={alt} className={className} style={position ? { objectPosition: position } : undefined} loading={loading} onError={() => setFailed(true)} />;
}

/** The small colored label above a heading. */
export function Eyebrow({ color, className = "mb-3", children }: { color: string; className?: string; children: ReactNode }) {
  return <div className={`text-xs font-bold uppercase tracking-widest ${className}`} style={{ color }}>{children}</div>;
}

/** Press feedback for every button and button-like link: a small scale on press. */
export const PRESS = "active:scale-[0.97] transition-[opacity,background-color,translate,scale]";

/** See-through call-to-action over a dark or photo background. */
export const GHOST_CTA = `inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold px-7 py-4 rounded-lg ${PRESS}`;

const HEX = /^#[0-9a-f]{6}$/i;

/** WCAG relative luminance of a #rrggbb color. */
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
}

/** WCAG contrast ratio of two #rrggbb colors (anything else counts as passing). */
export function contrast(a: string, b: string): number {
  if (!HEX.test(a) || !HEX.test(b)) return 21;
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export const whiteContrast = (hex: string) => contrast(hex, "#ffffff");

/** `a` moved a fraction `t` of the way to `b`, as #rrggbb. */
export function mix(a: string, b: string, t: number): string {
  const [x, y] = [parseInt(a.slice(1), 16), parseInt(b.slice(1), 16)];
  const ch = (s: number) => Math.round(((x >> s) & 255) * (1 - t) + ((y >> s) & 255) * t).toString(16).padStart(2, "0");
  return `#${ch(16)}${ch(8)}${ch(0)}`;
}

/** The #rrggbb color a black overlay at opacity `alpha` leaves on `hex`. */
export const dimmed = (hex: string, alpha: number) => mix(hex, "#000000", alpha);

/** `color`, walked toward each stop in turn in 5% steps, until it reads at `min` against `bg`.
 *  Walking toward the palette's own darker shade first keeps the hue instead of going muddy. */
function readable(color: string, stops: string[], bg: string, min: number): string {
  if (!HEX.test(color) || contrast(color, bg) >= min) return color;
  let from = color;
  for (const stop of stops.filter((s) => HEX.test(s))) {
    for (let t = 0.05; t <= 1.001; t += 0.05) {
      const c = mix(from, stop, t);
      if (contrast(c, bg) >= min) return c;
    }
    from = stop;
  }
  return from;
}

/**
 * The brand palette as the shared site draws it, every color moved only as far as it must
 * to read where it is used (WCAG AA, 4.5:1). The brand primary carries white button text
 * and colors small text on white; the accent colors text on the dark hero and bands.
 * Saved sites keep their own palette, so this guard at render time covers them too.
 */
export function readablePalette(p: BrandPalette): BrandPalette {
  const primaryDark = readable(p.primaryDark, ["#000000"], "#ffffff", 4.5);
  return {
    ...p,
    primary: readable(p.primary, [primaryDark, "#000000"], "#ffffff", 4.5),
    primaryDark,
    // An accent too dark for the hero (navy, charcoal) lightened toward white only turns gray,
    // so the highlight takes the brand's own color instead, lightened just as far as it must.
    accent: contrast(p.accent, p.heroFrom) >= 4.5 ? p.accent : readable(p.primary, ["#ffffff"], p.heroFrom, 4.5),
  };
}

/** `color` where it reads at 3:1 (a label or an icon) on every one of `backgrounds`, else white. */
export function onColor(color: string, backgrounds: string[]): string {
  return backgrounds.every((bg) => contrast(color, bg) >= 3) ? color : "#ffffff";
}

/** Opacity of the lightest black overlay (in 0.05 steps) that brings white text on `hex` up to 4.5:1. */
export function scrimFor(hex: string): number {
  let alpha = 0;
  while (alpha < 1 && whiteContrast(dimmed(hex, alpha)) < 4.5) alpha = Math.round((alpha + 0.05) * 100) / 100;
  return alpha;
}

/** A row of cards that centers a short last row instead of leaving one card hanging on the left.
 *  Each card sets its own width per breakpoint (one column of the row). */
export const CARD_ROW = "flex flex-wrap justify-center";

export function SectionHeader({ eyebrow, title, blurb, dark, accent, titlePath, eyebrowPath, blurbPath }: { eyebrow: string; title: string; blurb?: string; dark?: boolean; accent: string; titlePath?: (string | number)[]; eyebrowPath?: (string | number)[]; blurbPath?: (string | number)[] }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <Eyebrow color={accent}>
        {eyebrowPath ? <EditableText as="span" path={eyebrowPath} value={eyebrow} /> : eyebrow}
      </Eyebrow>
      <h2 className={`text-balance font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
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
