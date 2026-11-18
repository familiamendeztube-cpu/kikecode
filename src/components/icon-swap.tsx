import type { ReactNode } from "react";

const LAYER = "col-start-1 row-start-1 grid place-items-center transition-[opacity,scale,filter] duration-200 ease-out motion-reduce:transition-none";
const HIDDEN = " opacity-0 scale-50 blur-xs";

/** Swaps `from` for `to` in place (Copy → Check, Play → Pause) with a quick blur instead of a hard cut. */
export function IconSwap({ swapped, from, to }: { swapped: boolean; from: ReactNode; to: ReactNode }) {
  return (
    <span className="inline-grid">
      <span className={LAYER + (swapped ? HIDDEN : "")}>{from}</span>
      <span className={LAYER + (swapped ? "" : HIDDEN)}>{to}</span>
    </span>
  );
}
