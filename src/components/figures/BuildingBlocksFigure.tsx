/**
 * Hero figure: Arxia's practices as building blocks, drawn like an
 * architectural elevation. A dashed site plan and the tower's dashed outline
 * are set out first, then the blocks drop onto it one by one, bottom up, each
 * with its practice lettered on its long wall. Digital public infrastructure
 * is the ground the tower stands on (horizontal axis), e-governance runs the
 * full height (vertical axis), and interoperability is the foundation block.
 *
 * Each block is a long, shallow slab: the long wall faces front-right, so the
 * lettering runs along it and rises to the right in isometric perspective.
 *
 * Server-rendered SVG with a fixed viewBox: no JS, nothing measures the DOM.
 * Motion is the `.bb-*` rules in globals.css. The resting state is the
 * finished drawing, and the animation is only added under
 * `prefers-reduced-motion: no-preference`. It plays once and finishes inside
 * five seconds, so it needs no pause control (WCAG 2.2.2).
 */

// Isometric projection: x runs right-down, y left-down, z up.
const C = Math.cos(Math.PI / 6);
const S = 0.5;
const p = (x: number, y: number, z: number) => [(x - y) * C, (x + y) * S - z] as const;
const f1 = (n: number) => n.toFixed(1);
const pts = (...ps: (readonly [number, number])[]) => ps.map(([x, y]) => `${f1(x)},${f1(y)}`).join(" ");

/** One storey, and the lettering on its wall. */
const H = 30;
const TEXT_SIZE = 18;
const TEXT_PAD = 13;
/** Baseline sits this far above the wall's bottom edge (cap height centred). */
const BASELINE = (H - TEXT_SIZE * 0.72) / 2;

/** Footprints, bottom to top: depth (x, short) and wall length (y, long). */
const DEPTHS = [120, 112, 104, 96, 88, 80, 72];
const WALLS = [310, 302, 294, 286, 278, 270, 262];

const BLOCKS = DEPTHS.map((w, i) => {
  const hx = w / 2;
  const hy = WALLS[i] / 2;
  const z0 = i * H;
  const z1 = z0 + H;
  const [wx, wy] = p(hx, hy, z0); // bottom-left corner of the lettered wall
  return {
    top: pts(p(-hx, -hy, z1), p(hx, -hy, z1), p(hx, hy, z1), p(-hx, hy, z1)),
    wall: pts(p(hx, hy, z0), p(hx, -hy, z0), p(hx, -hy, z1), p(hx, hy, z1)),
    side: pts(p(-hx, hy, z0), p(hx, hy, z0), p(hx, hy, z1), p(-hx, hy, z1)),
    // Outer silhouette, drawn dashed first as the "planned" outline.
    outline: pts(p(-hx, -hy, z1), p(hx, -hy, z1), p(hx, -hy, z0), p(hx, hy, z0), p(-hx, hy, z0), p(-hx, hy, z1)),
    // The two front edges of the top face: the foundation block's red mark.
    frontEdges: `M${pts(p(-hx, hy, z1))} L${pts(p(hx, hy, z1))} L${pts(p(hx, -hy, z1))}`,
    // Text space → wall: x runs along the wall (up-right), y stays vertical.
    textTransform: `matrix(${C.toFixed(4)} ${-S} 0 1 ${f1(wx)} ${f1(wy)})`,
  };
});

const TOP_Z = DEPTHS.length * H;
const MARGIN = 18; // dashed site plan, this far outside the base
const SX = DEPTHS[0] / 2 + MARGIN;
const SY = WALLS[0] / 2 + MARGIN;
const SITE_PLAN = pts(p(-SX, -SY, 0), p(SX, -SY, 0), p(SX, SY, 0), p(-SX, SY, 0));
const SITE_LEFT = p(-SX, SY, 0)[0];
const SITE_RIGHT = p(SX, -SY, 0)[0];
const SITE_BOTTOM = p(SX, SY, 0)[1];
const DIM_X = SITE_LEFT - 16; // vertical dimension chain, left of the site
/** Screen height of the tower's left corner at z = 0 (the chain's base). */
const DIM_BASE = p(-DEPTHS[0] / 2, WALLS[0] / 2, 0)[1];
const GROUND_Y = SITE_BOTTOM + 16; // horizontal dimension under the site
const TOP_Y = p(-DEPTHS[DEPTHS.length - 1] / 2, -WALLS[WALLS.length - 1] / 2, TOP_Z)[1];

const VB_X = DIM_X - 30; // room for the rotated axis label
const VB_Y = TOP_Y - 14;
const VIEWBOX = [VB_X, VB_Y, SITE_RIGHT + 12 - VB_X, GROUND_Y + 32 - VB_Y].map((n) => n.toFixed(0)).join(" ");

const LINE = "rgba(226,232,240,0.6)";
const DIM = "rgba(160,174,192,0.5)";

export function BuildingBlocksFigure({
  labels,
  ground,
  axis,
  title,
  className,
}: {
  /** One label per block, bottom (foundation) to top. */
  labels: string[];
  /** The ground the tower stands on (horizontal axis). */
  ground: string;
  /** What spans the full height (vertical axis). */
  axis: string;
  /** Accessible name for the whole drawing. */
  title: string;
  className?: string;
}) {
  return (
    <svg viewBox={VIEWBOX} role="img" aria-labelledby="bb-title" className={className}>
      <title id="bb-title">{title}</title>
      <defs>
        {/* Section hatch on the shaded side, as on a drawing. */}
        <pattern id="bb-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Set-out: site plan, vertical dimension chain, ground dimension. */}
      <g fill="none" stroke={DIM} strokeWidth="1">
        <polygon className="bb-ghost" points={SITE_PLAN} strokeDasharray="4 4" style={{ ["--i" as string]: 0 }} />
        <path className="bb-draw" pathLength={1} d={`M${f1(DIM_X)},${f1(DIM_BASE)} V${f1(DIM_BASE - TOP_Z)}`} style={{ ["--d" as string]: "200ms" }} />
        {Array.from({ length: DEPTHS.length + 1 }, (_, i) => (
          <path key={i} className="bb-ghost" d={`M${f1(DIM_X - 4)},${f1(DIM_BASE - i * H)} h8`} style={{ ["--i" as string]: i }} />
        ))}
        <path
          className="bb-draw"
          pathLength={1}
          d={`M${f1(SITE_LEFT)},${f1(GROUND_Y)} H${f1(SITE_RIGHT)}`}
          style={{ ["--d" as string]: "300ms" }}
        />
        <path
          className="bb-ghost"
          d={`M${f1(SITE_LEFT)},${f1(GROUND_Y - 5)} v10 M${f1(SITE_RIGHT)},${f1(GROUND_Y - 5)} v10`}
          style={{ ["--i" as string]: 0 }}
        />
      </g>
      <text
        className="bb-ghost"
        x={f1((SITE_LEFT + SITE_RIGHT) / 2)}
        y={f1(GROUND_Y + 22)}
        textAnchor="middle"
        fill="rgba(160,174,192,0.9)"
        style={{
          ["--i" as string]: 2,
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        {ground}
      </text>
      <text
        className="bb-ghost"
        transform={`translate(${f1(DIM_X - 14)} ${f1(DIM_BASE - TOP_Z / 2)}) rotate(-90)`}
        textAnchor="middle"
        fill="rgba(160,174,192,0.9)"
        style={{
          ["--i" as string]: 3,
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        {axis}
      </text>

      {/* The plan: every block's outline, dashed, before anything is built. */}
      <g fill="none" stroke={DIM} strokeWidth="1" strokeDasharray="3 4">
        {BLOCKS.map((b, i) => (
          <polygon key={i} className="bb-ghost" points={b.outline} style={{ ["--i" as string]: i }} />
        ))}
      </g>

      {/* The blocks, dropped in bottom up, each lettered on its long wall. */}
      {BLOCKS.map((b, i) => (
        <g key={i} className="bb-slab" style={{ ["--i" as string]: i }}>
          <polygon points={b.side} fill="#111A2C" />
          <polygon points={b.side} fill="url(#bb-hatch)" />
          <polygon points={b.wall} fill="#1B2742" />
          <polygon points={b.top} fill="#24345A" />
          <g fill="none" stroke={LINE} strokeWidth="1" strokeLinejoin="round">
            <polygon points={b.top} />
            <polygon points={b.side} />
            <polygon points={b.wall} />
          </g>
          <text
            transform={b.textTransform}
            x={TEXT_PAD}
            y={f1(-BASELINE)}
            fill="rgba(226,232,240,0.72)"
            style={{ fontFamily: "var(--font-primary)", fontSize: `${TEXT_SIZE}px`, fontWeight: 600 }}
          >
            {labels[i]}
          </text>
        </g>
      ))}

      {/* Foundation block: interoperability, the core, carries the red mark. */}
      <path
        className="bb-core-mark"
        pathLength={1}
        d={BLOCKS[0].frontEdges}
        fill="none"
        stroke="#ED1C24"
        strokeWidth="2"
      />
    </svg>
  );
}
