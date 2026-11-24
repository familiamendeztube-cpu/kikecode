import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** The page's smooth scroller, while one runs (a mouse, and motion allowed). */
let lenis: Lenis | null = null;

/** Glide to an element: through Lenis when it runs, else the browser's own scrolling. */
export function scrollToEl(target: HTMLElement) {
  if (lenis) lenis.scrollTo(target, { duration: 1.5 });
  else target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

/** A full-screen dialog holds the page still behind it (Radix locks native scrolling, not Lenis). */
export function useScrollPause(paused: boolean) {
  useEffect(() => {
    const l = lenis;
    if (!paused || !l) return;
    l.stop();
    return () => l.start();
  }, [paused]);
}

const OUT = "expo.out";

/**
 * Every GSAP effect on the Tamarindo site. Markup opts in with data attributes,
 * so the sections stay plain JSX that React fully owns: GSAP only moves nodes,
 * never rewrites their text (an editor change or a language switch would
 * otherwise leave stale words on screen).
 *
 *   data-hero, data-hero-img, data-hero-copy, data-hero-in   intro + scroll parallax
 *   data-words      words rise from behind their masks (spans rendered by <Words>)
 *   data-lit        a paragraph whose words light up as it scrolls by
 *   data-rise       fades up the first time it enters
 *   data-odometer   digit strips roll to their value the first time it enters
 *   data-pin, data-track-viewport, data-track, data-progress   pinned sideways tours
 *   data-clip       a photo frame that opens as it scrolls in
 *   data-draw       an SVG path that draws itself as its section scrolls by
 *   data-speed="-8" parallax drift, in % of the element's height (wide screens)
 *   data-marquee    an endless band that speeds up with the scroll
 *   data-magnetic   a button that leans toward the pointer (mouse only)
 *
 * With a mouse, Lenis smooths the page's scrolling (touch scrolling is already
 * smooth). Nested scroll areas (the chat, dialogs, the editor's panels) keep
 * their own native scrolling (allowNestedScroll).
 *
 * Nothing is hidden by CSS: with reduced motion, or before this runs, every
 * element sits in its final place. `key` re-runs the setup when the language
 * or the number of tours or photos changes; the old setup is reverted first.
 */
export function useSiteMotion(root: RefObject<HTMLElement | null>, key: string) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || typeof window.matchMedia !== "function") return;
    const mm = gsap.matchMedia(el);

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        // The sideways tours need room: a laptop-sized screen or bigger.
        wide: "(min-width: 1024px) and (min-height: 700px)",
        mouse: "(pointer: fine)",
      },
      (ctx) => {
        const { motion, wide, mouse } = ctx.conditions as Record<"motion" | "wide" | "mouse", boolean>;
        if (!motion) return;
        const q = gsap.utils.selector(el);
        const cleanups: (() => void)[] = [];

        if (mouse) {
          const smooth = new Lenis({ autoRaf: false, allowNestedScroll: true, lerp: 0.09 });
          lenis = smooth;
          smooth.on("scroll", ScrollTrigger.update);
          const tick = (time: number) => smooth.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          cleanups.push(() => {
            gsap.ticker.remove(tick);
            gsap.ticker.lagSmoothing(500, 33);
            smooth.destroy();
            if (lenis === smooth) lenis = null;
          });
        }

        // The pin goes first: every trigger below it measures with its spacer in place.
        const pin = q("[data-pin]")[0] as HTMLElement | undefined;
        const viewport = pin?.querySelector<HTMLElement>("[data-track-viewport]");
        const track = pin?.querySelector<HTMLElement>("[data-track]");
        if (wide && pin && viewport && track) {
          viewport.scrollLeft = 0;
          gsap.set(viewport, { overflow: "hidden" });
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          gsap.timeline({
            scrollTrigger: {
              trigger: pin, start: "top top", end: () => `+=${distance()}`,
              pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
            },
          })
            .to(track, { x: () => -distance(), ease: "none" }, 0)
            .fromTo(pin.querySelector("[data-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
        }

        // Hero: the photo settles, the headline rises word by word, then the rest.
        const hero = q("[data-hero]")[0] as HTMLElement | undefined;
        if (hero) {
          const img = hero.querySelector("[data-hero-img]");
          gsap.timeline({ defaults: { ease: OUT } })
            .from(img, { scale: 1.18, duration: 2.6, ease: "power3.out" }, 0)
            .from(hero.querySelectorAll("[data-words] .w > span"), { yPercent: 115, duration: 1.3, stagger: 0.07 }, 0.25)
            .from(hero.querySelectorAll("[data-hero-in]"), { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.09 }, 0.7);
          const out = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
          gsap.to(img, { yPercent: 16, ease: "none", scrollTrigger: out });
          gsap.to(hero.querySelector("[data-hero-copy]"), { y: -90, autoAlpha: 0.1, ease: "none", scrollTrigger: { ...out, end: "75% top" } });
        }

        // Reveals fire on enter; on a jump past (an anchor link), onLeave reveals too.
        const once = (trigger: Element, play: () => void) =>
          ScrollTrigger.create({ trigger, start: "top 88%", once: true, onEnter: play, onLeave: play });

        for (const h of q("[data-words]")) {
          if (hero?.contains(h)) continue;
          const words = h.querySelectorAll(".w > span");
          gsap.set(words, { yPercent: 115 });
          once(h, () => gsap.to(words, { yPercent: 0, duration: 1.2, ease: OUT, stagger: 0.05, overwrite: true }));
        }

        for (const r of q("[data-rise]")) {
          gsap.set(r, { y: 36, autoAlpha: 0 });
          once(r, () => gsap.to(r, { y: 0, autoAlpha: 1, duration: 1.1, ease: OUT, overwrite: true }));
        }

        for (const o of q("[data-odometer]")) {
          const strips = o.querySelectorAll("[data-digit]");
          // From the 0 row to the value React drew. GSAP reads React's translateY(%) back as
          // pixels in `y`, so both go to 0; reverting hands the strips back as React left them.
          gsap.set(strips, { y: 0, yPercent: 0 });
          once(o, () => gsap.to(strips, { yPercent: (_i, s: HTMLElement) => -10 * Number(s.dataset.digit), duration: 2.2, ease: "power3.out", stagger: 0.12, overwrite: true }));
        }

        for (const p of q("[data-lit]")) {
          gsap.fromTo(p.querySelectorAll(".lw"), { opacity: 0.16 }, {
            opacity: 1, stagger: 0.12, ease: "none",
            scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 50%", scrub: true },
          });
        }

        for (const c of q("[data-clip]")) {
          const st = { trigger: c, start: "top 90%", end: "top 30%", scrub: true };
          gsap.fromTo(c, { clipPath: "inset(14% 10% 14% 10% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: st });
          gsap.fromTo(c.querySelector("img"), { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: st });
        }

        for (const path of el.querySelectorAll<SVGPathElement>("[data-draw]")) {
          const len = path.getTotalLength();
          gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, {
            strokeDashoffset: 0, ease: "none",
            scrollTrigger: { trigger: path.closest("section"), start: "top 65%", end: "center 45%", scrub: true },
          });
        }

        if (wide) {
          for (const s of q("[data-speed]")) {
            gsap.fromTo(s, { yPercent: 0 }, {
              yPercent: Number((s as HTMLElement).dataset.speed), ease: "none",
              scrollTrigger: { trigger: s.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
        }

        // The band loops on its own and runs faster while the page scrolls; it rests off screen.
        const band = q("[data-marquee]")[0];
        if (band) {
          const loop = gsap.to(band, { xPercent: -50, duration: 42, ease: "none", repeat: -1 });
          ScrollTrigger.create({
            trigger: band, start: "top bottom", end: "bottom top",
            onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
            onUpdate: (self) => {
              const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 350);
              gsap.to(loop, { timeScale: boost, duration: 0.25, overwrite: true })
                .then(() => gsap.to(loop, { timeScale: 1, duration: 1.4, ease: "power2.out", overwrite: true }));
            },
          });
        }

        if (mouse) {
          for (const b of q("[data-magnetic]") as HTMLElement[]) {
            const x = gsap.quickTo(b, "x", { duration: 0.6, ease: "power3" });
            const y = gsap.quickTo(b, "y", { duration: 0.6, ease: "power3" });
            const move = (e: PointerEvent) => {
              const r = b.getBoundingClientRect();
              x((e.clientX - r.left - r.width / 2) * 0.22);
              y((e.clientY - r.top - r.height / 2) * 0.32);
            };
            const leave = () => { x(0); y(0); };
            b.addEventListener("pointermove", move);
            b.addEventListener("pointerleave", leave);
            cleanups.push(() => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); });
          }
        }

        // The display face arrives after first paint and changes heights: measure again.
        let alive = true;
        void document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());
        return () => { alive = false; cleanups.forEach((f) => f()); };
      },
    );

    return () => mm.revert();
  }, [root, key]);
}
