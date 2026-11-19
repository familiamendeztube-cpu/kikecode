import type { CSSProperties } from "react";

/**
 * A one-off burst of sparks off an element's top and bottom edges, behind it:
 * the secondary effect of a big action (a publish went live, a primary CTA).
 * Put it inside a `relative` element and remount it (a new `key`) to replay.
 * Hidden for people who asked the OS for reduced motion.
 */
export function Sparks({ colors = ["bg-emerald-300", "bg-amber-300"] }: { colors?: [string, string] }) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
      {Array.from({ length: 14 }, (_, i) => {
        const up = i % 2 === 0;
        const style = {
          left: `${4 + i * 7}%`,
          top: up ? "0%" : "100%",
          "--dx": `${((i * 37) % 17) - 8}px`,
          "--dy": `${(up ? -1 : 1) * (12 + ((i * 11) % 14))}px`,
        } as CSSProperties;
        return <span key={i} style={style} className={`absolute size-1.5 -ml-[3px] -mt-[3px] rounded-full animate-spark ${i % 3 ? colors[0] : colors[1]}`} />;
      })}
    </span>
  );
}
