import { useEffect, useRef } from "react";
import { landDots } from "./land-dots";

/*
  The journey's drawn pieces, each on its own canvas: clouds, the dotted globe,
  the boat pass's map and the footer's engraved coast. All are decoration
  (aria-hidden); every word the visitor reads is in the HTML around them.

  Canvases draw on mount and on resize. The globe also takes a state from the
  scroll timeline (motion.ts) through `paintGlobe`.
*/

/** A canvas sized to its box at the screen's pixel density, redrawn on resize. */
function useCanvas(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, deps: unknown[] = []) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || typeof ResizeObserver === "undefined") return;
    const paint = () => {
      const r = c.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, r.width, r.height);
    };
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(c);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** A small seeded random, so each cloud bank keeps its shape on every redraw. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* ------------------------------------------------------------------ */

/**
 * A bank of cumulus clouds, drawn from soft puffs: each puff is a white radial
 * gradient with a blue-grey underside. `top` is where the bank's crown starts
 * (0 to 1 of the height); the bank fills down to the bottom.
 */
export function Clouds({ seed = 1, top = 0.35, density = 1, tint = "255,255,255", shade = "176,192,214", className = "" }: {
  seed?: number; top?: number; density?: number; tint?: string; shade?: string; className?: string;
}) {
  const ref = useCanvas((ctx, w, h) => {
    const r = rng(seed);
    ctx.clearRect(0, 0, w, h);
    const count = Math.round((w / 14) * density);
    const crown = h * top;
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < count; i++) {
        const x = r() * w * 1.1 - w * 0.05;
        // Puffs gather toward the bottom; a few climb to make the crown uneven.
        const lift = Math.pow(r(), 1.8);
        const y = h - (h - crown) * lift + r() * 20;
        const rad = (pass === 0 ? 60 : 34) + r() * (pass === 0 ? 120 : 70) * (0.6 + lift);
        if (pass === 0) {
          const g2 = ctx.createRadialGradient(x, y + rad * 0.35, 0, x, y + rad * 0.35, rad);
          g2.addColorStop(0, `rgba(${shade},0.55)`);
          g2.addColorStop(1, `rgba(${shade},0)`);
          ctx.fillStyle = g2;
          ctx.beginPath(); ctx.arc(x, y + rad * 0.35, rad, 0, Math.PI * 2); ctx.fill();
        }
        const g = ctx.createRadialGradient(x - rad * 0.2, y - rad * 0.25, rad * 0.1, x, y, rad);
        g.addColorStop(0, `rgba(${tint},0.95)`);
        g.addColorStop(0.55, `rgba(${tint},0.75)`);
        g.addColorStop(1, `rgba(${tint},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
      }
    }
  }, [seed, top, density, tint, shade]);
  return <canvas ref={ref} aria-hidden className={className} />;
}

/* ------------------------------------------------------------------ */

const RAD = Math.PI / 180;
export const TAMARINDO: [number, number] = [10.3, -85.84];
/** Where the arcs come from: big gateways to Guanacaste, drawn as a picture of travel. */
export const GATEWAYS: { name: string; at: [number, number] }[] = [
  { name: "Los Angeles", at: [34.05, -118.24] },
  { name: "Toronto", at: [43.65, -79.38] },
  { name: "New York", at: [40.71, -74.0] },
  { name: "Madrid", at: [40.42, -3.7] },
];

export type GlobeState = { lon: number; lat: number; arcs: number; alpha: number };
const painters = new WeakMap<Element, (s: GlobeState) => void>();

/** Draws the globe on `el` at this state (called by the scroll timeline). */
export function paintGlobe(el: Element | null | undefined, s: GlobeState) {
  if (el) painters.get(el)?.(s);
}

/** Unit vector for a latitude and longitude. */
function vec(lat: number, lon: number): [number, number, number] {
  const p = lat * RAD, l = lon * RAD;
  return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
}

/**
 * The dotted globe: an orthographic sphere of land dots, lit from the upper
 * left, with arcs flying in to Tamarindo. Pins ([data-pin] in the same frame)
 * are HTML labels; the painter only moves them (transform, opacity).
 */
export function Globe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const dots = landDots().map(([la, lo]) => vec(la, lo));
    let state: GlobeState = { lon: -88, lat: 16, arcs: 1, alpha: 1 };
    let size = { w: 0, h: 0 };
    const frame = c.parentElement;
    const pins = frame ? [...frame.querySelectorAll<HTMLElement>("[data-pin]")] : [];

    const paint = (s: GlobeState) => {
      state = s;
      const ctx = c.getContext("2d");
      if (!ctx || size.w === 0) return;
      const { w, h } = size;
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.46, cx = w / 2, cy = h / 2;
      const l0 = s.lon * RAD, p0 = s.lat * RAD;
      const sinP0 = Math.sin(p0), cosP0 = Math.cos(p0);
      // Rotate a unit vector into view: x right, y up, z toward the viewer.
      const view = (v: [number, number, number], lift = 1) => {
        const [x, y, z] = v;
        const cl = Math.cos(-l0), sl = Math.sin(-l0);
        const x1 = x * cl - y * sl, y1 = x * sl + y * cl;
        const xr = y1, zf = x1 * cosP0 + z * sinP0, yu = -x1 * sinP0 + z * cosP0;
        return { sx: cx + xr * R * lift, sy: cy - yu * R * lift, front: zf };
      };

      ctx.globalAlpha = s.alpha;
      const sphere = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      sphere.addColorStop(0, "#3a332c");
      sphere.addColorStop(0.7, "#221e1a");
      sphere.addColorStop(1, "#14120f");
      ctx.fillStyle = sphere;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      const dot = Math.max(1.2, R / 170);
      for (const d of dots) {
        const p = view(d);
        if (p.front <= 0) continue;
        ctx.fillStyle = `rgba(243,240,234,${0.12 + 0.6 * p.front})`;
        ctx.fillRect(p.sx - dot / 2, p.sy - dot / 2, dot, dot);
      }

      // Rim light.
      const rim = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.04);
      rim.addColorStop(0, "rgba(246,207,152,0)");
      rim.addColorStop(1, "rgba(246,207,152,0.22)");
      ctx.fillStyle = rim;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.04, 0, Math.PI * 2); ctx.fill();

      // Arcs: great circles lifted off the surface, drawn up to `arcs` of their length.
      const home = vec(...TAMARINDO);
      GATEWAYS.forEach((g, i) => {
        const a = vec(...g.at);
        const local = Math.max(0, Math.min(1, s.arcs * 1.6 - i * 0.2));
        if (local <= 0) return;
        const omega = Math.acos(Math.min(1, a[0] * home[0] + a[1] * home[1] + a[2] * home[2]));
        ctx.strokeStyle = "rgba(255,107,61,0.95)";
        ctx.lineWidth = Math.max(1.2, R / 260);
        ctx.beginPath();
        let started = false;
        const steps = 60;
        for (let k = 0; k <= steps * local; k++) {
          const t = k / steps;
          const s1 = Math.sin((1 - t) * omega) / Math.sin(omega), s2 = Math.sin(t * omega) / Math.sin(omega);
          const v: [number, number, number] = [a[0] * s1 + home[0] * s2, a[1] * s1 + home[1] * s2, a[2] * s1 + home[2] * s2];
          const p = view(v, 1 + 0.16 * Math.sin(Math.PI * t) * Math.min(1, omega));
          if (p.front < -0.05) { started = false; continue; }
          if (!started) { ctx.moveTo(p.sx, p.sy); started = true; } else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
        const start = view(a);
        if (start.front > 0) {
          ctx.fillStyle = "#FF6B3D";
          ctx.beginPath(); ctx.arc(start.sx, start.sy, dot * 2.4, 0, Math.PI * 2); ctx.fill();
        }
      });
      const hp = view(home);
      if (hp.front > 0) {
        ctx.fillStyle = "#F3F0EA";
        ctx.beginPath(); ctx.arc(hp.sx, hp.sy, dot * 3.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Labels follow their places; a label on the far side fades out.
      for (const pin of pins) {
        const name = pin.dataset.pin;
        const at = name === "home" ? TAMARINDO : GATEWAYS.find((g) => g.name === name)?.at;
        if (!at) continue;
        const p = view(vec(...at));
        const show = name === "home" ? 1 : Math.max(0, Math.min(1, s.arcs * 3 - 0.4));
        pin.style.transform = `translate(${p.sx}px, ${p.sy}px) translate(-50%, ${name === "home" ? "40%" : "-140%"})`;
        pin.style.opacity = String(p.front > 0.05 ? show * s.alpha : 0);
      }
    };

    const resize = () => {
      const r = c.getBoundingClientRect();
      if (r.width === 0) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      c.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = { w: r.width, h: r.height };
      paint(state);
    };
    painters.set(c, paint);
    resize();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(c);
    return () => { ro?.disconnect(); painters.delete(c); };
  }, []);
  return <canvas ref={ref} aria-hidden data-globe className={className} />;
}

/* ------------------------------------------------------------------ */

/** The boat pass's background: a dotted map of the Americas and Europe with dotted routes to Tamarindo. */
export function PassMap({ className = "" }: { className?: string }) {
  const ref = useCanvas((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const lon0 = -135, lon1 = 25, lat0 = 62, lat1 = -40;
    const x = (lon: number) => ((lon - lon0) / (lon1 - lon0)) * w;
    const y = (lat: number) => ((lat0 - lat) / (lat0 - lat1)) * h;
    ctx.fillStyle = "rgba(21,26,34,0.12)";
    for (const [la, lo] of landDots()) {
      if (lo < lon0 - 2 || lo > lon1 + 2 || la > lat0 + 2 || la < lat1 - 2) continue;
      ctx.beginPath(); ctx.arc(x(lo), y(la), 1.6, 0, Math.PI * 2); ctx.fill();
    }
    const [hl, hn] = TAMARINDO;
    const hx = x(hn), hy = y(hl);
    ctx.setLineDash([2, 6]);
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(21,26,34,0.55)";
    ctx.lineWidth = 1.4;
    for (const g of GATEWAYS) {
      const gx = x(g.at[1]), gy = y(g.at[0]);
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo((gx + hx) / 2, Math.min(gy, hy) - h * 0.18, hx, hy);
      ctx.stroke();
      ctx.fillStyle = "rgba(21,26,34,0.7)";
      ctx.beginPath(); ctx.arc(gx, gy, 3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.setLineDash([]);
    ctx.fillStyle = "#FF6B3D";
    ctx.beginPath(); ctx.arc(hx, hy, 4.5, 0, Math.PI * 2); ctx.fill();
  });
  return <canvas ref={ref} aria-hidden className={className} />;
}

/* ------------------------------------------------------------------ */

/**
 * The footer's engraving: Guanacaste's coast drawn as stacked contour lines,
 * a volcano to the east, rolling hills, and the Pacific's swell in front.
 * Back rows are drawn first and each row hides what is behind it.
 */
export function Engraving({ bg = "#12161e", className = "" }: { bg?: string; className?: string }) {
  const ref = useCanvas((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const rows = Math.round(h / 5);
    const r = rng(7);
    const bumps = Array.from({ length: 9 }, () => ({ x: r(), w: 0.04 + r() * 0.09, a: 0.2 + r() * 0.5 }));
    const land = (u: number, depth: number) => {
      // A volcano cone on the right, hills across, flattening into the sea at the front.
      let v = Math.exp(-Math.pow((u - 0.78) / 0.09, 2)) * 1.25 + Math.exp(-Math.pow((u - 0.86) / 0.035, 2)) * 0.25;
      for (const b of bumps) v += Math.exp(-Math.pow((u - b.x) / b.w, 2)) * b.a;
      return v * Math.pow(1 - depth, 1.3);
    };
    for (let i = 0; i < rows; i++) {
      const depth = i / rows; // 0 = far, 1 = near
      const base = h * 0.32 + depth * h * 0.68;
      const amp = h * 0.45;
      ctx.beginPath();
      for (let px = 0; px <= w; px += 3) {
        const u = px / w;
        const swell = depth > 0.55 ? Math.sin(u * 60 + i * 0.9) * 2.2 * depth : 0;
        const yv = base - land(u, depth) * amp + swell + Math.sin(u * 140 + i) * 0.6;
        if (px === 0) ctx.moveTo(px, yv); else ctx.lineTo(px, yv);
      }
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.strokeStyle = `rgba(243,240,234,${0.18 + 0.5 * (1 - Math.abs(depth - 0.45))})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }, [bg]);
  return <canvas ref={ref} aria-hidden className={className} />;
}
