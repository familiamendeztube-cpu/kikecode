/* Land dots for the globe and the pass's map: every ~1.7° of land from Natural Earth 110m
   (public domain, via world-atlas). Each dot is four base-36 characters: (lat+90)*2, (lon+180)*2. */
const DOTS = "__DOTS__";

/** [lat, lon] in degrees for each land dot. */
export function landDots(): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < DOTS.length; i += 4) {
    out.push([parseInt(DOTS.slice(i, i + 2), 36) / 2 - 90, parseInt(DOTS.slice(i + 2, i + 4), 36) / 2 - 180]);
  }
  return out;
}
