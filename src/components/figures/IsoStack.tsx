/**
 * The interoperability stack as an exploded isometric figure: three plates on
 * one axis, threaded by a dashed red spine with a node where it pierces each
 * plate. "Full-stack" is a stack, so the figure is a stack.
 *
 * Shared by the homepage anchor plate (`DomainsGrid`) and the
 * /interoperability page, which reuses it as its hero figure and as the small
 * "you are here" marker on each layer section. One geometry, so the layer
 * model reads the same wherever it appears.
 *
 * Fixed viewBox, so nothing measures the DOM and nothing drifts on resize.
 * Motion comes from the `.domain-iso-*` rules in globals.css, which key off an
 * `.animate-on-scroll.visible` ancestor; the figure must sit inside one.
 */

export const ISO = {
  w: 260,
  h: 196,
  cx: 172,
  rx: 66, // half-width of a plate's diamond
  ry: 22, // half-depth
  t: 8, // plate thickness
  ys: [38, 100, 162], // plate centres, top to bottom
};

export type IsoLayerId = "L03" | "L02" | "L01";

/** Diamond top face + the two visible side faces of one isometric plate. */
function plateFaces(cy: number) {
  const { cx, rx, ry, t } = ISO;
  return {
    top: `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`,
    left: `${cx - rx},${cy} ${cx},${cy + ry} ${cx},${cy + ry + t} ${cx - rx},${cy + t}`,
    right: `${cx + rx},${cy} ${cx},${cy + ry} ${cx},${cy + ry + t} ${cx + rx},${cy + t}`,
  };
}

export const PLATES = ISO.ys.map((cy, i) => ({
  cy,
  faces: plateFaces(cy),
  // L03 at the top, counting down — matches drafting convention.
  label: `L0${ISO.ys.length - i}` as IsoLayerId,
}));

/** Ink per surface. "dark" is white on Blueprint Blue (the homepage anchor). */
const INK = {
  dark: {
    rgb: "255,255,255",
    stroke: 0.42,
    side: [0.03, 0.06],
    top: 0.05,
    activeTop: 0.16,
    label: "rgba(255,255,255,0.5)",
    dim: "rgba(255,255,255,0.3)",
    dimText: "rgba(255,255,255,0.45)",
  },
  light: {
    rgb: "22,32,54",
    stroke: 0.5,
    side: [0.04, 0.08],
    top: 0.03,
    activeTop: 0.12,
    // gray-dark: the plate codes are small type, so they need AA on white.
    label: "#4A5568",
    dim: "rgba(160,174,192,0.6)",
    dimText: "#4A5568",
  },
};

export function IsoStackFigure({
  className,
  tone = "dark",
  active,
  bracketLabel = "FULL-STACK",
  showBracket = true,
  showPacket = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  /** Highlight one plate and recede the others: the "you are here" marker. */
  active?: IsoLayerId;
  bracketLabel?: string;
  showBracket?: boolean;
  showPacket?: boolean;
}) {
  const { cx, ys } = ISO;
  const spineTop = ys[0];
  const spineBottom = ys[ys.length - 1];
  const ink = INK[tone];
  const rgba = (a: number) => `rgba(${ink.rgb},${a})`;

  return (
    <svg aria-hidden viewBox={`0 0 ${ISO.w} ${ISO.h}`} className={className}>
      {/* Dimension bracket, drafting-style, spanning the whole stack. */}
      {showBracket && (
        <>
          <g className="domain-iso-dim" stroke={ink.dim} strokeWidth={1}>
            <line x1={30} y1={spineTop - 22} x2={30} y2={spineBottom + 30} vectorEffect="non-scaling-stroke" />
            <line x1={25} y1={spineTop - 22} x2={35} y2={spineTop - 22} vectorEffect="non-scaling-stroke" />
            <line x1={25} y1={spineBottom + 30} x2={35} y2={spineBottom + 30} vectorEffect="non-scaling-stroke" />
          </g>
          <text
            className="domain-iso-dim"
            x={22}
            y={(spineTop + spineBottom) / 2}
            transform={`rotate(-90 22 ${(spineTop + spineBottom) / 2})`}
            textAnchor="middle"
            fill={ink.dimText}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8px",
              letterSpacing: "2px",
            }}
          >
            {bracketLabel}
          </text>
        </>
      )}

      {/* The spine, behind the plates: dashed, revealed top-down. */}
      <g className="domain-iso-spine">
        <line
          x1={cx}
          y1={spineTop}
          x2={cx}
          y2={spineBottom}
          stroke="var(--accent-red)"
          strokeWidth={1}
          strokeDasharray="4 3"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {/* Plates, bottom-up so upper plates overlap lower ones correctly. */}
      {[...PLATES].reverse().map((plate, i) => {
        // Reverse the index back so stagger runs bottom plate first.
        const step = PLATES.length - 1 - i;
        const isActive = plate.label === active;
        const recede = active !== undefined && !isActive;
        const stroke = rgba(isActive ? Math.min(1, ink.stroke * 2) : ink.stroke);
        return (
          <g
            key={plate.label}
            className="domain-iso-plate"
            data-layer={plate.label}
            style={{ transitionDelay: `${260 + step * 130}ms` }}
          >
            {/* Inner group carries the recede, so it never fights the
                entrance transition's opacity on the outer one. */}
            <g opacity={recede ? 0.4 : 1}>
              <polygon points={plate.faces.left} fill={rgba(ink.side[0])} />
              <polygon points={plate.faces.right} fill={rgba(ink.side[1])} />
              <polygon
                className="iso-plate-top"
                points={plate.faces.top}
                fill={rgba(isActive ? ink.activeTop : ink.top)}
                stroke={stroke}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={ISO.cx - ISO.rx}
                y1={plate.cy}
                x2={ISO.cx}
                y2={plate.cy + ISO.ry}
                stroke={stroke}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={ISO.cx + ISO.rx}
                y1={plate.cy}
                x2={ISO.cx}
                y2={plate.cy + ISO.ry}
                stroke={stroke}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={ISO.cx - ISO.rx - 14}
                y={plate.cy + 3}
                textAnchor="end"
                fill={ink.label}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "1.5px",
                }}
              >
                {plate.label}
              </text>
            </g>
          </g>
        );
      })}

      {/* Packet travelling the spine, once the stack has assembled. */}
      {showPacket && (
        <circle
          className="domain-iso-packet"
          cx={cx}
          cy={spineTop}
          r={2.5}
          fill="var(--accent-red)"
        />
      )}

      {/* Nodes where the spine pierces each plate. The only red fills. With
          an active plate, only its node is drawn: one red point, one answer
          to "where am I". */}
      {PLATES.map((plate, i) =>
        active !== undefined && plate.label !== active ? null : (
          <circle
            key={`node-${plate.label}`}
            className="domain-iso-node"
            cx={cx}
            cy={plate.cy}
            r={4.5}
            fill="var(--accent-red)"
            style={{ transitionDelay: `${760 + i * 130}ms` }}
          />
        ),
      )}
    </svg>
  );
}
