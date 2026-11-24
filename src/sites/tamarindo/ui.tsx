import { useEffect, useState, type CSSProperties, type ImgHTMLAttributes } from "react";
import type { BusinessTemplate } from "@/templates/types";

/* One button pair and one press for the whole Tamarindo site, its dialogs included. */
export const PRESS = "transition-[background-color,color,translate,scale,box-shadow,opacity] duration-300 active:scale-[0.97]";
export const BTN = `inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold ${PRESS}`;
export const BTN_SUN = `${BTN} bg-(--sun) text-(--navy) shadow-[0_18px_40px_-18px_rgba(242,159,69,0.9)] hover:bg-[#F7B567] hover:-translate-y-0.5`;
export const BTN_GHOST = `${BTN} border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20`;
export const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;
export const EASE = "ease-[cubic-bezier(.2,.7,.2,1)]";

/** The site's colours as CSS variables. Dialogs render outside the site's root, so they set them too. */
export function siteVars(template: BusinessTemplate): CSSProperties {
  const p = template.brand.palette;
  return {
    ["--navy" as never]: p.heroFrom,
    ["--sea" as never]: p.primaryDark,
    ["--teal" as never]: p.primary,
    ["--sun" as never]: p.accent,
    ["--sand" as never]: "#F6F1E9",
    ["--ink" as never]: "#0A1A2A",
  };
}

/** True while the section with this id is on screen. */
export function useSectionInView(id: string): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [id]);
  return inView;
}

/** True once the page has scrolled past `ratio` of a screen (the hero has its own buttons). */
export function useScrolledPast(ratio: number): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const on = () => setPast(window.scrollY > window.innerHeight * ratio);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [ratio]);
  return past;
}

/**
 * A photo over a calm placeholder in its frame's shape (the frame must be `relative`).
 * The shimmer waits 1 s, so a fast load never shows a loader; it sits behind the
 * photo, so the loaded photo never pulses; and it stops once the photo lands.
 */
export function Photo({ dark, className = "", ...img }: ImgHTMLAttributes<HTMLImageElement> & { dark?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <span aria-hidden className={`absolute inset-0 ${dark ? "bg-white/[0.07]" : "bg-(--ink)/[0.06]"} ${loaded ? "" : "tt-skel"}`} />
      <img
        {...img}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        // An animation, not a transition, so the photo's own hover zoom keeps its transition.
        className={`relative ${loaded ? "tt-fade" : "opacity-0"} ${className}`}
      />
    </>
  );
}
