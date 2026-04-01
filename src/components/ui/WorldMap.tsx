"use client";

import { useEffect, useRef } from "react";
import { WorldMapPaths } from "./WorldMapPaths";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

const countries = [
  { code: "CL", label: "Chile", cx: 598, cy: 728, lx: 554, ly: 738, cluster: "latam" },
  { code: "CO", label: "Colombia", cx: 560, cy: 462, lx: 497, ly: 458, cluster: "latam" },
  { code: "PE", label: "Peru", cx: 548, cy: 575, lx: 485, ly: 571, cluster: "latam" },
  { code: "SV", label: "El Salvador", cx: 488, cy: 408, lx: 428, ly: 404, cluster: "latam" },
  { code: "DE", label: "Germany", cx: 1038, cy: 175, lx: 980, ly: 165, cluster: "europe" },
  { code: "CH", label: "Switzerland", cx: 1048, cy: 202, lx: 1005, ly: 198, cluster: "europe" },
  { code: "AT", label: "Austria", cx: 1085, cy: 198, lx: 1100, ly: 218, cluster: "europe" },
  { code: "UA", label: "Ukraine", cx: 1141, cy: 183, lx: 1151, ly: 179, cluster: "europe" },
  { code: "TN", label: "Tunisia", cx: 1038, cy: 295, lx: 1048, ly: 291, cluster: "wafrica" },
  { code: "SN", label: "Senegal", cx: 905, cy: 412, lx: 855, ly: 405, cluster: "wafrica" },
  { code: "GH", label: "Ghana", cx: 980, cy: 451, lx: 940, ly: 446, cluster: "wafrica" },
  { code: "NG", label: "Nigeria", cx: 1005, cy: 448, lx: 965, ly: 444, cluster: "wafrica" },
  { code: "CF", label: "Central African Republic", cx: 1105, cy: 459, lx: 1070, ly: 450, cluster: "eafrica" },
  { code: "SS", label: "South Sudan", cx: 1154, cy: 459, lx: 1164, ly: 450, cluster: "eafrica" },
  { code: "UG", label: "Uganda", cx: 1170, cy: 493, lx: 1180, ly: 489, cluster: "eafrica" },
  { code: "RW", label: "Rwanda", cx: 1156, cy: 515, lx: 1166, ly: 511, cluster: "eafrica" },
  { code: "BI", label: "Burundi", cx: 1156, cy: 527, lx: 1166, ly: 523, cluster: "eafrica" },
  { code: "ZM", label: "Zambia", cx: 1142, cy: 586, lx: 1152, ly: 582, cluster: "eafrica" },
  { code: "KH", label: "Cambodia", cx: 1577, cy: 421, lx: 1587, ly: 417, cluster: "seasia" },
];

const hq = { code: "RO", label: "Romania (HQ)", cx: 1113, cy: 207, lx: 1127, ly: 203 };

// SVG paths from HQ to each regional cluster
const connectionPaths = [
  {
    id: "path-latam",
    cluster: "latam",
    d: `M ${hq.cx} ${hq.cy} C 900 350, 700 300, 560 462`,
  },
  {
    id: "path-wafrica",
    cluster: "wafrica",
    d: `M ${hq.cx} ${hq.cy} C 1060 300, 1000 370, 960 430`,
  },
  {
    id: "path-eafrica",
    cluster: "eafrica",
    d: `M ${hq.cx} ${hq.cy} C 1130 300, 1150 380, 1155 470`,
  },
  {
    id: "path-seasia",
    cluster: "seasia",
    d: `M ${hq.cx} ${hq.cy} C 1300 250, 1450 350, 1577 421`,
  },
];

interface WorldMapProps {
  /** Hide stats bar — parent will render its own */
  hideStats?: boolean;
}

export function WorldMap({ hideStats = false }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  // dotRefs removed — dots are always visible

  // SVG draw animation + dot reveal
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // If reduced motion, show paths fully drawn
    if (prefersReduced) {
      pathRefs.current.forEach((p) => {
        if (p) {
          p.style.strokeDashoffset = "0";
          p.style.opacity = "1";
        }
      });
      return;
    }

    // Set up path dash offsets
    const pathData: { path: SVGPathElement; length: number; cluster: string }[] = [];
    pathRefs.current.forEach((p, i) => {
      if (!p) return;
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.opacity = "1";
      pathData.push({ path: p, length: len, cluster: connectionPaths[i].cluster });
    });

    // Dots are always visible — no hiding

    // Create a single ScrollTrigger that scrubs the path draw only
    const st = ScrollTrigger.create({
      trigger: svg,
      start: "top 70%",
      end: "bottom 20%",
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress;

        // Draw each path
        pathData.forEach(({ path, length }) => {
          const offset = length * (1 - progress);
          path.style.strokeDashoffset = `${offset}`;
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: "1000px" }}>
      <svg
        ref={svgRef}
        viewBox="0 0 2000 857"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="World map showing Arxia's global presence across Latin America, Africa, Europe, and Southeast Asia"
        className="w-full h-auto"
        style={{ marginTop: "32px" }}
      >
        <defs>
          <style>{`
            .land { fill: #1a2d4a; stroke: rgba(255,255,255,0.05); stroke-width: 0.5; }
            .map-dot { fill: var(--accent-red); }
            .map-dot-hq { fill: var(--accent-red); }
            .map-ring { fill: none; stroke: var(--accent-red); stroke-width: 2; opacity: 0.4; transform-origin: center; }
            .map-label { font-family: 'JetBrains Mono', monospace; font-size: 14px; fill: var(--gray-medium); text-transform: uppercase; letter-spacing: 1.5px; }
            .connection-path { fill: none; stroke: rgba(237,28,36,0.25); stroke-width: 1.5; opacity: 0; }
          `}</style>
        </defs>

        {/* Country paths */}
        <WorldMapPaths />

        {/* Connection lines from HQ — hidden on mobile via CSS */}
        <g className="hidden sm:block">
          {connectionPaths.map((cp, i) => (
            <path
              key={cp.id}
              ref={(el) => { pathRefs.current[i] = el; }}
              d={cp.d}
              className="connection-path"
            />
          ))}
        </g>

        {/* HQ marker — Romania */}
        <circle className="map-ring" cx={hq.cx} cy={hq.cy} r={18} />
        <circle className="map-dot-hq" cx={hq.cx} cy={hq.cy} r={8} />
        <text
          className="map-label"
          x={hq.lx}
          y={hq.ly}
          style={{ fill: "var(--accent-red)", fontWeight: 500 }}
        >
          RO (HQ)
        </text>

        {/* Country presence dots */}
        {countries.map((c) => (
          <g key={c.code}>
            <circle className="map-dot" cx={c.cx} cy={c.cy} r={6}>
              <title>{c.label}</title>
            </circle>
            <text className="map-label" x={c.lx} y={c.ly}>
              {c.code}
            </text>
          </g>
        ))}

        {/* Dimension markers */}
        <line x1={300} y1={820} x2={1700} y2={820} stroke="rgba(160,174,192,0.15)" strokeWidth={1.5} />
        <line x1={300} y1={812} x2={300} y2={828} stroke="rgba(160,174,192,0.2)" strokeWidth={1.5} />
        <line x1={1700} y1={812} x2={1700} y2={828} stroke="rgba(160,174,192,0.2)" strokeWidth={1.5} />
        <text x={960} y={848} className="map-label" style={{ fill: "rgba(160,174,192,0.3)", fontSize: "14px" }}>
          global reach
        </text>
      </svg>

      {/* Stats bar — only if not hidden */}
      {!hideStats && (
        <div className="flex justify-center gap-16 mt-12 max-sm:flex-col max-sm:items-center max-sm:gap-6">
          <div className="text-center">
            <div
              className="text-white font-bold tracking-[-1px]"
              style={{ fontFamily: "var(--font-primary)", fontSize: "48px" }}
            >
              20+
            </div>
            <div
              className="text-gray-medium uppercase"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "2px" }}
            >
              Countries
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-white font-bold tracking-[-1px]"
              style={{ fontFamily: "var(--font-primary)", fontSize: "48px" }}
            >
              4
            </div>
            <div
              className="text-gray-medium uppercase"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "2px" }}
            >
              Continents
            </div>
          </div>
        </div>
      )}

      {/* Accessible hidden text */}
      <div className="sr-only">
        <h3>Arxia operates in the following countries:</h3>
        <ul>
          <li>{hq.label}</li>
          {countries.map((c) => (
            <li key={c.code}>{c.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
