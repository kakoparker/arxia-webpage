"use client";

import { useLocale, useTranslations } from "next-intl";
import type { StackLayerId } from "@/data/domain-pages";

/**
 * One drafting figure per stack layer, after fig. 02–04 of the capability
 * brochure: a maturity pyramid (governance), a shared model with the sectors
 * around it (semantics) and a secure backbone with institutions on it
 * (exchange). Decorative: the offer cards beside each figure carry the
 * content, so every figure is aria-hidden.
 *
 * Fixed viewBoxes, Blueprint Blue line work, red only for nodes and the
 * connectors that carry data. Entrance motion reuses the stack figure's
 * `.domain-iso-*` classes plus the `.interop-fig-*` rules in globals.css, all
 * keyed off an `.animate-on-scroll.visible` ancestor.
 */

const BLUE = "#162036";
const LINE = "#A0AEC0";
const INK = "#4A5568"; // gray-dark: small type on white needs AA

const mono = (size: number, spacing = 1.5) => ({
  fontFamily: "var(--font-mono)",
  fontSize: `${size}px`,
  letterSpacing: `${spacing}px`,
});

const FIG_CLASS = "block h-auto w-full max-h-[min(260px,32vh)]";

export function LayerFigure({ layer }: { layer: StackLayerId }) {
  if (layer === "L03") return <MaturityPyramid />;
  if (layer === "L02") return <SharedModel />;
  return <Backbone />;
}

function useFigLabels() {
  const t = useTranslations("Interop.fig");
  const locale = useLocale();
  return (key: string) => t(key).toLocaleUpperCase(locale);
}

/** L03 — framework at the base, roadmap at the top; maturity is the climb. */
function MaturityPyramid() {
  const label = useFigLabels();
  const cx = 204;
  const tiers = ["framework", "policy", "governance", "roadmap"].map((key, i) => {
    const yb = 214 - i * 42;
    const yt = yb - 34;
    // 40-unit steps keep the top tier wide enough for the longest
    // translation ("FEUILLE DE ROUTE").
    const bw = 280 - i * 40;
    const tw = bw - 28;
    return {
      key,
      yb,
      yt,
      points: `${cx - bw / 2},${yb} ${cx + bw / 2},${yb} ${cx + tw / 2},${yt} ${cx - tw / 2},${yt}`,
      top: i === 3,
    };
  });
  const apex = tiers[3].yt;

  return (
    <svg aria-hidden viewBox="0 0 380 240" className={FIG_CLASS}>
      {/* Maturity axis. */}
      <g className="domain-iso-dim" stroke={LINE} strokeWidth={1}>
        <line x1={30} y1={214} x2={30} y2={30} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <polyline points="25,38 30,28 35,38" fill="none" vectorEffect="non-scaling-stroke" />
      </g>
      <text
        className="domain-iso-dim"
        x={18}
        y={122}
        transform="rotate(-90 18 122)"
        textAnchor="middle"
        fill={INK}
        style={mono(9.5, 2)}
      >
        {label("maturity")}
      </text>

      {tiers.map((tier, i) => (
        <g
          key={tier.key}
          className="domain-iso-plate"
          style={{ transitionDelay: `${240 + i * 130}ms` }}
        >
          <polygon
            points={tier.points}
            fill={tier.top ? BLUE : "#FFFFFF"}
            stroke={BLUE}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={cx}
            y={(tier.yb + tier.yt) / 2 + 3.5}
            textAnchor="middle"
            fill={tier.top ? "#FFFFFF" : INK}
            style={mono(9.5, 1.2)}
          >
            {label(tier.key)}
          </text>
        </g>
      ))}

      {/* The decision the climb arrives at. */}
      <g className="domain-iso-dim" style={{ transitionDelay: "820ms" }}>
        <line x1={cx} y1={apex} x2={cx} y2={apex - 20} stroke="var(--accent-red)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </g>
      <circle
        className="domain-iso-node"
        cx={cx}
        cy={apex - 22}
        r={4.5}
        fill="var(--accent-red)"
        style={{ transitionDelay: "900ms" }}
      />
    </svg>
  );
}

/** L02 — one shared model in the middle, the sectors that agree on it around. */
function SharedModel() {
  const label = useFigLabels();
  const hub = { x: 128, y: 98, w: 124, h: 44 };
  const W = 96;
  const H = 28;
  const nodes = [
    { key: "social", cx: 120, cy: 34, from: [156, hub.y] },
    { key: "minerals", cx: 260, cy: 34, from: [224, hub.y] },
    { key: "procurement", cx: 52, cy: 120, from: [hub.x, 120] },
    { key: "tax", cx: 328, cy: 120, from: [hub.x + hub.w, 120] },
    { key: "migration", cx: 120, cy: 206, from: [156, hub.y + hub.h] },
    { key: "registries", cx: 260, cy: 206, from: [224, hub.y + hub.h] },
  ];

  return (
    <svg aria-hidden viewBox="0 0 380 240" className={FIG_CLASS}>
      {nodes.map((n, i) => {
        // Spoke ends on the node's nearest edge.
        const to: [number, number] =
          n.cy < 120 ? [n.cx, n.cy + H / 2] : n.cy > 120 ? [n.cx, n.cy - H / 2] : [n.cx + (n.cx < 190 ? W / 2 : -W / 2), n.cy];
        return (
          <line
            key={`spoke-${n.key}`}
            className="interop-fig-fade"
            x1={n.from[0]}
            y1={n.from[1]}
            x2={to[0]}
            y2={to[1]}
            stroke={LINE}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            style={{ transitionDelay: `${520 + i * 60}ms` }}
          />
        );
      })}

      {nodes.map((n, i) => (
        <g
          key={n.key}
          className="interop-fig-rise"
          style={{ transitionDelay: `${640 + i * 70}ms` }}
        >
          <rect
            x={n.cx - W / 2}
            y={n.cy - H / 2}
            width={W}
            height={H}
            fill="#FFFFFF"
            stroke={BLUE}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <text x={n.cx} y={n.cy + 3.5} textAnchor="middle" fill={INK} style={mono(9.5, 1)}>
            {label(n.key)}
          </text>
        </g>
      ))}

      <g className="domain-iso-plate" style={{ transitionDelay: "240ms" }}>
        <rect x={hub.x} y={hub.y} width={hub.w} height={hub.h} fill={BLUE} />
        <text
          x={hub.x + hub.w / 2}
          y={hub.y + hub.h / 2 + 3.5}
          textAnchor="middle"
          fill="#FFFFFF"
          style={mono(9.5, 0.8)}
        >
          {label("sharedModel")}
        </text>
      </g>
      <circle
        className="domain-iso-node"
        cx={hub.x + hub.w / 2}
        cy={hub.y}
        r={4.5}
        fill="var(--accent-red)"
        style={{ transitionDelay: "1000ms" }}
      />
    </svg>
  );
}

/** L01 — institutions on a secure exchange backbone, data moving along it. */
function Backbone() {
  const label = useFigLabels();
  const bus = { x: 20, y: 104, w: 340, h: 32 };
  const W = 88;
  const H = 30;
  const top = [
    { key: "ministry", cx: 80, live: true },
    { key: "registry", cx: 190, live: false },
    { key: "agency", cx: 300, live: false },
  ];
  const bottom = [
    { key: "social", cx: 80, live: false },
    { key: "tax", cx: 190, live: false },
    { key: "regional", cx: 300, live: true },
  ];
  const topY = 22;
  const bottomY = 188;

  return (
    <svg aria-hidden viewBox="0 0 380 240" className={FIG_CLASS}>
      {/* Connectors first, so the boxes and the bus sit over their ends. Red
          dashes mark the two live exchanges; the rest are plain links. */}
      {[...top.map((n) => ({ ...n, y1: topY + H, y2: bus.y })), ...bottom.map((n) => ({ ...n, y1: bus.y + bus.h, y2: bottomY }))].map(
        (n, i) => (
          <line
            key={`link-${n.key}-${i}`}
            className="interop-fig-fade"
            x1={n.cx}
            y1={n.y1}
            x2={n.cx}
            y2={n.y2}
            stroke={n.live ? "var(--accent-red)" : LINE}
            strokeDasharray={n.live ? "4 3" : undefined}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            style={{ transitionDelay: `${560 + i * 60}ms` }}
          />
        ),
      )}

      {[...top.map((n) => ({ ...n, y: topY })), ...bottom.map((n) => ({ ...n, y: bottomY }))].map((n, i) => (
        <g key={`box-${n.key}-${i}`} className="interop-fig-rise" style={{ transitionDelay: `${640 + i * 60}ms` }}>
          <rect
            x={n.cx - W / 2}
            y={n.y}
            width={W}
            height={H}
            fill="#FFFFFF"
            stroke={BLUE}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <text x={n.cx} y={n.y + H / 2 + 3.5} textAnchor="middle" fill={INK} style={mono(9.5, 1)}>
            {label(n.key)}
          </text>
        </g>
      ))}

      <g className="domain-iso-plate" style={{ transitionDelay: "240ms" }}>
        <rect x={bus.x} y={bus.y} width={bus.w} height={bus.h} fill={BLUE} />
        <text
          x={bus.x + bus.w / 2}
          y={bus.y + bus.h / 2 + 3.5}
          textAnchor="middle"
          fill="#FFFFFF"
          style={mono(9.5, 1.5)}
        >
          {label("backbone")}
        </text>
      </g>

      {/* Junction nodes where the live exchanges meet the backbone. */}
      <circle className="domain-iso-node" cx={80} cy={bus.y} r={3.5} fill="var(--accent-red)" style={{ transitionDelay: "900ms" }} />
      <circle className="domain-iso-node" cx={300} cy={bus.y + bus.h} r={3.5} fill="var(--accent-red)" style={{ transitionDelay: "980ms" }} />

      {/* A packet runs the live route: down from the ministry, along the
          backbone, out to the regional platform. */}
      <circle className="interop-bus-packet" cx={80} cy={bus.y + bus.h / 2} r={2.5} fill="var(--accent-red)" />
    </svg>
  );
}
