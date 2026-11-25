import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { paintGlobe, type GlobeState } from "./canvas";

gsap.registerPlugin(ScrollTrigger);

/** The page's smooth scroller, while one runs (a mouse, and motion allowed). */
let lenis: Lenis | null = null;

/** Sections inside the pinned journey have no place of their own on the page while
 *  it plays: each id maps to the scroll position where its scene is on screen. */
const jumps = new Map<string, () => number>();

/** Glide to an element: through Lenis when it runs, else the browser's own scrolling. */
export function scrollToEl(target: HTMLElement) {
  const at = jumps.get(target.id)?.();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (at !== undefined) {
    if (lenis) lenis.scrollTo(at, { duration: 1.8 });
    else window.scrollTo({ top: at, behavior: reduce ? "auto" : "smooth" });
    return;
  }
  if (lenis) lenis.scrollTo(target, { duration: 1.5 });
  else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
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
 * THE JOURNEY ([data-journey]): on any screen at least 520px tall, with motion
 * allowed (phones included), everything above the FAQ is one pinned stage. The class
 * `is-staged` lays its scenes ([data-scene]) on top of each other, and one
 * scrubbed timeline plays them like a film as the visitor scrolls:
 *
 *   open   the headline lifts away; the camera flies into the middle window
 *   fly    over the bay, then down through the clouds to the coast
 *   tours  the coast shrinks into the first card; each scroll slides the next
 *          card up over the stack
 *   world  the cards fan out and fall into the globe, which turns to Costa
 *          Rica while routes draw in to Tamarindo (canvas.tsx paints it)
 *   pass   the boat pass slides in, its numbers type out, the stub tears off
 *   night  the windows come back at night, and the request form rises
 *
 * Without the stage (reduced motion, very short screens, before this runs) the same scenes
 * are ordinary sections, one after another, with everything in place.
 *
 * Elsewhere:
 *   data-words      words rise from behind their masks (spans rendered by <Words>)
 *   data-rise       fades up the first time it enters
 *   data-magnetic   a button that leans toward the pointer (mouse only)
 *
 * `key` re-runs the setup when the language or the number of tours or photos
 * changes; the old setup is reverted first.
 */
export function useSiteMotion(root: RefObject<HTMLElement | null>, key: string) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || typeof window.matchMedia !== "function") return;
    const mm = gsap.matchMedia(el);

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        stage: "(min-height: 520px)",
        mouse: "(pointer: fine)",
      },
      (ctx) => {
        const { motion, stage: canStage, mouse } = ctx.conditions as Record<"motion" | "stage" | "mouse", boolean>;
        if (!motion) return;
        const q = gsap.utils.selector(el);
        const cleanups: (() => void)[] = [];

        if (mouse) {
          const smooth = new Lenis({ autoRaf: false, allowNestedScroll: true, lerp: 0.07, wheelMultiplier: 0.9, smoothWheel: true });
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

        const stage = q("[data-journey]")[0] as HTMLElement | undefined;
        const staged = !!(stage && canStage);
        const inStage = (n: Element) => staged && !!stage?.contains(n);
        if (staged && stage) {
          stage.classList.add("is-staged");
          cleanups.push(() => stage.classList.remove("is-staged"));
          journey(stage, cleanups, mouse);
        } else if (stage) {
          // Stacked scenes: the opening still plays its intro.
          intro(stage);
        }

        // Reveals fire on enter; on a jump past (an anchor link), onLeave reveals too.
        const once = (trigger: Element, play: () => void) =>
          ScrollTrigger.create({ trigger, start: "top 88%", once: true, onEnter: play, onLeave: play });

        for (const h of q("[data-words]")) {
          if (inStage(h) || h.closest("[data-scene='open']")) continue;
          const words = h.querySelectorAll(".w > span");
          gsap.set(words, { yPercent: 115 });
          once(h, () => gsap.to(words, { yPercent: 0, duration: 1.2, ease: OUT, stagger: 0.05, overwrite: true }));
        }

        for (const r of q("[data-rise]")) {
          if (inStage(r) || r.closest("[data-scene='open']")) continue;
          gsap.set(r, { y: 36, autoAlpha: 0 });
          once(r, () => gsap.to(r, { y: 0, autoAlpha: 1, duration: 1.1, ease: OUT, overwrite: true }));
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

/** The opening's entrance, played once on load (both layouts). */
function intro(stage: HTMLElement) {
  const open = stage.querySelector("[data-scene='open']");
  if (!open) return;
  gsap.timeline({ defaults: { ease: OUT } })
    .from(open.querySelectorAll(".tw-win"), { yPercent: 14, autoAlpha: 0, duration: 1.6, stagger: 0.12 }, 0.1)
    .from(open.querySelectorAll("[data-words] .w > span"), { yPercent: 115, duration: 1.3, stagger: 0.07 }, 0.3)
    .from(open.querySelectorAll("[data-rise]"), { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.8);
}

/**
 * Where a row of windows has to go for its middle window's glass to fill the
 * screen: the glass's centre (the transform origin), the move that brings it
 * to the screen's centre, and the scale that makes it cover the screen.
 */
function intoWindow(row: HTMLElement) {
  const win = row.children[Math.floor(row.children.length / 2)] as HTMLElement | undefined;
  const glass = win?.firstElementChild as HTMLElement | undefined;
  if (!win || !glass) return { origin: "50% 50%", x: 0, y: 0, scale: 6 };
  const cx = win.offsetLeft + glass.offsetLeft + glass.offsetWidth / 2;
  const cy = win.offsetTop + glass.offsetTop + glass.offsetHeight / 2;
  return {
    origin: `${cx}px ${cy}px`,
    x: window.innerWidth / 2 - (row.offsetLeft + cx),
    y: window.innerHeight / 2 - (row.offsetTop + cy),
    scale: Math.max(window.innerWidth / glass.offsetWidth, window.innerHeight / glass.offsetHeight) * 1.35,
  };
}

/** The pinned film. Times are in "screens": one unit is a little under one screen of scrolling. */
function journey(stage: HTMLElement, cleanups: (() => void)[], smoothed: boolean) {
  const one = (sel: string, root: ParentNode = stage) => root.querySelector<HTMLElement>(sel) ?? undefined;
  const scene = (name: string) => one(`[data-scene='${name}']`);
  const words = (root?: Element) => root?.querySelectorAll("[data-words] .w > span") ?? [];
  const rises = (root?: Element) => root?.querySelectorAll("[data-rise]") ?? [];

  const open = scene("open"), fly = scene("fly"), tours = scene("tours"), world = scene("world"), captain = scene("captain"), pass = scene("pass"), night = scene("night");
  gsap.set([fly, tours, world, captain, pass, night].filter(Boolean), { autoAlpha: 0 });
  intro(stage);

  const tl = gsap.timeline({ defaults: { ease: "none", force3D: true } });
  const at: Record<string, number> = { top: 0 };
  const marks = { worldIn: Infinity, capIn: Infinity, passIn: Infinity, nightIn: Infinity };

  // 1 · open: the words lift, the camera flies into the middle window.
  const row = open && one("[data-j='windows']", open);
  if (open && row) {
    tl.to(open.querySelectorAll("[data-j='head'] [data-words] .w > span, [data-j='head'] [data-rise]"), { yPercent: -120, autoAlpha: 0, stagger: 0.02, duration: 0.45, ease: "power2.in" }, 0)
      .to(one("[data-j='foot']", open) ?? [], { y: 60, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, 0)
      .fromTo(row, { x: 0, y: 0, scale: 1 }, {
        x: () => intoWindow(row).x, y: () => intoWindow(row).y, scale: () => intoWindow(row).scale,
        transformOrigin: () => intoWindow(row).origin, duration: 1.6, ease: "power2.in", immediateRender: false,
      }, 0.1);
  }

  // 2 · fly: over the bay, the words, then down through the clouds to the coast.
  let t = 1.2;
  if (fly) {
    const bay = one("[data-j='bay']", fly), above = one("[data-j='above']", fly);
    const front = one("[data-j='cloud-front']", fly), back = one("[data-j='cloud-back']", fly);
    tl.set(fly, { autoAlpha: 1 }, t)
      .fromTo(fly, { opacity: 0 }, { opacity: 1, duration: 0.45 }, t)
      .fromTo(bay?.querySelector("img") ?? [], { scale: 1.08 }, { scale: 1.2, duration: 1.4 }, t);
    if (open) tl.set(open, { autoAlpha: 0 }, t + 0.5);
    tl.from(words(fly), { yPercent: 115, stagger: 0.04, duration: 0.5, ease: "power2.out" }, t + 0.5)
      .from(rises(fly), { y: 24, autoAlpha: 0, duration: 0.4 }, t + 0.7)
      .to(one("[data-j='fly-copy']", fly) ?? [], { y: -80, autoAlpha: 0, duration: 0.5, ease: "power1.in" }, t + 1.5)
      .to(bay?.querySelector("img") ?? [], { scale: 1.9, yPercent: 8, duration: 1.3, ease: "power1.in" }, t + 1.4)
      .fromTo(back ?? [], { yPercent: 0 }, { yPercent: -70, scale: 1.4, autoAlpha: 0, duration: 1.3 }, t + 1.4)
      .fromTo(front ?? [], { yPercent: 90, autoAlpha: 0 }, { yPercent: -10, autoAlpha: 1, duration: 1.0, ease: "power1.out" }, t + 1.6)
      .fromTo(above ?? [], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, t + 2.4)
      .fromTo(above?.querySelector("img") ?? [], { scale: 1.6 }, { scale: 1, duration: 1.4, ease: "power2.out" }, t + 2.4)
      .to(front ?? [], { yPercent: -130, scale: 1.3, autoAlpha: 0, duration: 1.1, ease: "power1.in" }, t + 2.6)
      .set(bay ?? [], { autoAlpha: 0 }, t + 2.6);
    t += 4.1;
  }

  // 3 · tours: the coast shrinks into the first card's frame, the cards deal up.
  const CARD = 0.85; // screens per card: time to read one before the next deals up
  const deck = tours && one("[data-j='deck']", tours);
  const cards = deck ? [...deck.querySelectorAll<HTMLElement>("[data-card]")] : [];
  if (tours && deck && cards.length) {
    const above = fly && one("[data-j='above']", fly);
    const frame = () => {
      const r = deck.getBoundingClientRect();
      return `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px round 28px)`;
    };
    at.tours = t + 0.4;
    if (above) tl.fromTo(above, { clipPath: "inset(0px 0px 0px 0px round 0px)" }, { clipPath: frame, duration: 0.7, ease: "power2.inOut", immediateRender: false }, t);
    tl.set(tours, { autoAlpha: 1 }, t + 0.5)
      .fromTo(cards[0], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, immediateRender: false }, t + 0.5)
      .from(cards[0].querySelectorAll(".tw-card-text > *, .tw-card-glass"), { y: 40, autoAlpha: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" }, t + 0.7);
    if (fly) tl.set(fly, { autoAlpha: 0 }, t + 0.9);
    cards.slice(1).forEach((card, j) => {
      const i = j + 1;
      const when = t + 1.3 + j * CARD;
      tl.from(card, { yPercent: 108, duration: 0.85, ease: "power2.out" }, when)
        .from(card.querySelectorAll(".tw-card-text > *, .tw-card-glass"), { y: 50, autoAlpha: 0, stagger: 0.06, duration: 0.45, ease: "power2.out" }, when + 0.35);
      for (let k = Math.max(0, i - 4); k < i; k++) {
        const depth = i - k;
        tl.to(cards[k], { scale: 1 - depth * 0.045, y: -depth * 16, autoAlpha: depth > 3 ? 0 : 1, duration: 0.85, ease: "power2.out" }, when)
          .to(cards[k].querySelector(".tw-card-dim") ?? [], { opacity: Math.min(0.7, depth * 0.25), duration: 0.85, ease: "power2.out" }, when);
      }
    });
    t += 1.3 + (cards.length - 1) * CARD + 0.6;
  }

  // 4 · world: the cards fan out and fall into the globe; it turns to Costa Rica; routes draw in.
  if (world) {
    const globe = one("[data-j='globe']", world);
    const canvas = globe?.querySelector("canvas");
    const g: GlobeState = { lon: -10, lat: 8, arcs: 0, alpha: 1 };
    const paint = () => paintGlobe(canvas, g);
    paint();
    at.world = t + 2.6;
    marks.worldIn = t + 0.2;
    tl.set(world, { autoAlpha: 1 }, t)
      .fromTo(world, { opacity: 0 }, { opacity: 1, duration: 0.4 }, t)
      .from(one("[data-j='giant']", world) ?? [], { yPercent: 30, autoAlpha: 0, duration: 0.7, ease: "power2.out" }, t + 0.1)
      .from(globe ?? [], { yPercent: 55, scale: 0.7, autoAlpha: 0, duration: 1.0, ease: "power2.out" }, t + 0.3)
      .to(g, { lon: -84, lat: 17, duration: 3.2, ease: "power1.inOut", onUpdate: paint }, t + 0.3)
      .to(g, { arcs: 1, duration: 2.0, onUpdate: paint }, t + 2.1)
      .from(rises(world), { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.45 }, t + 1.5);
    if (tours && deck) {
      tl.set(tours, { zIndex: 5 }, t);
      cards.forEach((card, i) => {
        const spread = i - (cards.length - 1) / 2;
        tl.to(card, {
          scale: 0.19, xPercent: spread * 115, y: 0, yPercent: 8, autoAlpha: 1, duration: 0.9, ease: "power2.inOut",
        }, t)
          .to(card.querySelector(".tw-card-dim") ?? [], { opacity: 0, duration: 0.6 }, t)
          .to(card, { xPercent: spread * 20, yPercent: 30, scale: 0.04, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, t + 1.0 + Math.abs(spread) * 0.06);
      });
      tl.set(tours, { autoAlpha: 0 }, t + 1.8);
    }
    t += 5.0;
  }

  // 4b · captain: the globe lifts away, Willy's portrait opens up, his days on the water roll past.
  if (captain) {
    const frame = one("[data-j='cap-frame']", captain), strip = one("[data-j='cap-strip']", captain);
    at.captain = t + 1.8;
    marks.capIn = t;
    if (world) tl.to(world.querySelectorAll("[data-j='globe'], [data-j='giant'], .tw-world-foot"), { yPercent: -25, autoAlpha: 0, duration: 0.6, ease: "power1.in" }, t);
    tl.set(captain, { autoAlpha: 1 }, t + 0.2);
    if (frame) {
      tl.fromTo(frame, { clipPath: "inset(100% 0% 0% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 0.9, ease: "power3.out", immediateRender: false }, t + 0.3)
        .fromTo(frame.querySelector("img") ?? [], { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "power2.out", immediateRender: false }, t + 0.3);
    }
    tl.from(words(captain), { yPercent: 115, stagger: 0.05, duration: 0.5, ease: "power2.out" }, t + 0.7)
      .from(rises(captain), { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.45 }, t + 0.9);
    if (strip) {
      tl.fromTo(strip, { x: () => window.innerWidth * 0.4 }, { x: () => Math.min(0, window.innerWidth - strip.scrollWidth - 40), duration: 3.4, ease: "none", immediateRender: false }, t + 0.6);
    }
    t += 4.4;
    tl.to(captain, { autoAlpha: 0, duration: 0.5 }, t);
  }

  // 5 · pass: the boat pass slides in, its numbers type out, the stub tears away.
  if (pass) {
    const stub = one("[data-j='stub']", pass), cta = one("[data-j='pass-cta']", pass);
    at.booking = t + 1.6;
    if (world) tl.to(world.querySelectorAll("[data-j='globe'], [data-j='giant'], .tw-world-foot"), { yPercent: -25, autoAlpha: 0, duration: 0.6, ease: "power1.in" }, t);
    tl.set(pass, { autoAlpha: 1 }, t + 0.2)
      .from(one("[data-j='ticket']", pass) ?? [], { yPercent: 45, rotate: -4, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, t + 0.3)
      .fromTo(pass.querySelectorAll("[data-type]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "steps(10)", stagger: 0.3, duration: 0.5 }, t + 1.0)
      .from(pass.querySelectorAll("[data-step] p:last-child"), { y: 14, autoAlpha: 0, stagger: 0.3, duration: 0.4 }, t + 1.2);
    if (cta) tl.from(cta, { x: 30, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, t + 2.4);
    marks.passIn = t;
    t += 4.4;
    // The stub tears off, and the pass flies away like a boarding pass handed back.
    if (stub && window.matchMedia("(min-width: 900px)").matches) {
      tl.to(stub, { rotate: 16, x: 70, yPercent: 62, autoAlpha: 0, duration: 0.8, ease: "power2.in" }, t);
    }
    tl.to(one("[data-j='ticket-wrap']", pass) ?? [], { yPercent: -70, rotate: -5, autoAlpha: 0, duration: 0.9, ease: "power2.in" }, t + 0.35);
    if (world) tl.set(world, { autoAlpha: 0 }, t);
  }

  // 6 · night: back through the windows, after dark; the request form rises.
  if (night) {
    const nrow = one("[data-j='night-windows']", night), full = one("[data-j='night-full']", night);
    const land = one("[data-j='land']", night), landClouds = one("[data-j='land-clouds']", night);
    // 6a · landing: down through the clouds onto the bay, then the day turns to night.
    if (pass) tl.set(pass, { autoAlpha: 0 }, t + 1.3);
    tl.set(night, { autoAlpha: 1 }, t + 0.5)
      .fromTo(night, { opacity: 0 }, { opacity: 1, duration: 0.5 }, t + 0.5);
    // The windows wait, zoomed into the middle one, until the landing clears.
    if (nrow) tl.set(nrow, { x: () => intoWindow(nrow).x, y: () => intoWindow(nrow).y, scale: () => intoWindow(nrow).scale, transformOrigin: () => intoWindow(nrow).origin }, t + 0.5);
    if (land) {
      tl.fromTo(land, { autoAlpha: 1 }, { autoAlpha: 1, duration: 0.01, immediateRender: false }, t + 0.5)
        .fromTo(land.querySelector("img") ?? [], { scale: 1.8 }, { scale: 1.08, duration: 1.9, ease: "power2.out" }, t + 0.5)
        .fromTo(landClouds ?? [], { yPercent: 0, autoAlpha: 1 }, { yPercent: -60, scale: 1.5, autoAlpha: 0, duration: 1.3, ease: "power1.in", immediateRender: false }, t + 0.7)
        .to(land, { autoAlpha: 0, duration: 0.8, ease: "power1.inOut" }, t + 2.4);
    }
    t += 3.0;
    marks.nightIn = t;
    at.contact = t + 2.2;
    if (nrow) {
      tl.fromTo(nrow, {
        x: () => intoWindow(nrow).x, y: () => intoWindow(nrow).y, scale: () => intoWindow(nrow).scale, transformOrigin: () => intoWindow(nrow).origin,
      }, { x: 0, y: 0, scale: 1, duration: 1.5, ease: "power2.out", immediateRender: false }, t + 0.4);
    }
    if (full) tl.fromTo(full, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4, immediateRender: false }, t + 0.5);
    tl.from(words(night), { yPercent: 115, stagger: 0.05, duration: 0.5, ease: "power2.out" }, t + 1.5)
      .from(rises(night), { y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.5, ease: "power2.out" }, t + 1.7);
    t += 3.2; // the last frame rests before the page lets go
  }

  const screens = t;
  // Like rumo, the menu steps aside while the globe and the closing windows play.
  const quiet = (time: number) => (time >= marks.worldIn && time < Math.min(marks.capIn, marks.passIn)) || time >= marks.nightIn + 1.2;
  const st = ScrollTrigger.create({
    trigger: stage,
    start: "top top",
    end: () => `+=${Math.round(window.innerHeight * screens * 0.85)}`,
    pin: true,
    // Lenis already glides the wheel, so the film follows it closely; touch
    // scrolling gets the smoothing from the scrub instead.
    scrub: smoothed ? 0.3 : 1,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    animation: tl,
    onUpdate: (self) => document.documentElement.classList.toggle("tw-nav-off", self.isActive && quiet(self.progress * tl.duration())),
    onToggle: (self) => { if (!self.isActive) document.documentElement.classList.remove("tw-nav-off"); },
  });
  cleanups.push(() => document.documentElement.classList.remove("tw-nav-off"));
  // The phone action bar steps aside while the film plays, and until its last frame (the form) scrolls away.
  ScrollTrigger.create({
    start: () => st.start,
    end: () => st.end + window.innerHeight * 0.9,
    onToggle: (self) => document.documentElement.classList.toggle("tw-in-journey", self.isActive),
  });
  cleanups.push(() => document.documentElement.classList.remove("tw-in-journey"));

  // Nav links to scenes land where the scene has fully arrived.
  for (const [id, time] of Object.entries(at)) {
    jumps.set(id, () => st.start + (time / tl.duration()) * (st.end - st.start));
  }
  cleanups.push(() => jumps.clear());
}
