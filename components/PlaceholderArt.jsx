"use client";
// PlaceholderArt.jsx
// Brand-styled stand-in for photography. Renders a dark surface with a
// topographic-contour pattern + an icon. Swap for <Image> once real assets exist.

import { resolveIcon } from "@/lib/icon-map";

const ACCENTS = {
  orange: "var(--color-orange)",
  amber:  "var(--color-amber)",
  charcoal: "var(--color-graphite)",
  graphite: "var(--color-graphite-light)",
};

export default function PlaceholderArt({ icon, accent = "orange", label, className = "", dense = false }) {
  const Icon      = icon ? resolveIcon(icon) : null;
  const color     = ACCENTS[accent] ?? ACCENTS.orange;
  const patternId = `topo-${accent}-${dense ? "d" : "s"}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: "linear-gradient(135deg, var(--color-charcoal) 0%, var(--color-black) 100%)" }}
      role="img"
      aria-label={label || "4x4 Center"}
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={patternId} width={dense ? 40 : 90} height={dense ? 40 : 90} patternUnits="userSpaceOnUse">
            <circle cx={dense?20:45} cy={dense?20:45} r={dense?8:18}  fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
            <circle cx={dense?20:45} cy={dense?20:45} r={dense?14:32} fill="none" stroke={color} strokeWidth="1" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`}/>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-1/2"
           style={{ background: "linear-gradient(to top, rgba(10,10,11,.85), transparent)" }}/>
      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon style={{ color }} size={dense ? 28 : 56} strokeWidth={1.5} className="opacity-90"/>
        </div>
      )}
    </div>
  );
}
