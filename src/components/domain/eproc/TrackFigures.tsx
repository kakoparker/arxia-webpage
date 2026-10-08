"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ProgrammeTrackId } from "@/data/domain-pages";

/**
 * One drafting figure per programme track, in the same hand as the interop
 * layer figures: a redesigned process in swimlanes (reform), a training
 * cascade (people) and the traceable lifecycle with its audit trail
 * (platform). Decorative: the offer cards beside each figure carry the
 * content, so every figure is aria-hidden.
 *
 * Fixed viewBoxes, Blueprint Blue line work, red only for nodes and for the
 * line that carries the meaning. Entrance motion reuses `.domain-iso-*` and
 * `.interop-fig-*`, plus `.eproc-trail-packet` in globals.css, all keyed off
 * an `.animate-on-scroll.visible` ancestor.
 */

const BLUE = "#162036";
const LINE = "#A0AEC0";
const INK = "#4A5568"; // gray-dark: small type on white needs AA
const RED = "var(--accent-red)";

const mono = (size: number, spacing = 1.2) => ({
  fontFamily: "var(--font-mono)",
  fontSize: `${size}px`,
  letterSpacing: `${spacing}px`,
});

const FIG_CLASS = "block h-auto w-full max-h-[min(260px,32vh)]";

export function TrackFigure({ track }: { track: ProgrammeTrackId }) {
  if (track === "01") return <ProcessRedesign />;
  if (track === "02") return <TrainingCascade />;
  return <TraceableLifecycle />;
}

function useFigLabels() {
  const t = useTranslations("Eproc.fig");
  const locale = useLocale();
  return (key: string) => t(key).toLocaleUpperCase(locale);
}

/** A connector: an orthogonal polyline with an arrowhead on its last segment. */
function Connector({
  points,
  delay,
  stroke = LINE,
}: {
  points: [number, number][];
  delay: number;
  stroke?: string;
}) {
  const [x1, y1] = points[points.length - 2];
  const [x2, y2] = points[points.length - 1];
  const dx = Math.sign(x2 - x1);
  const dy = Math.sign(y2 - y1);
  // 5-unit head, pointing along the last segment.
  const head = dx !== 0
    ? `${x2 - dx * 5},${y2 - 3} ${x2},${y2} ${x2 - dx * 5},${y2 + 3}`
    : `${x2 - 3},${y2 - dy * 5} ${x2},${y2} ${x2 + 3},${y2 - dy * 5}`;
  return (
    <g className="interop-fig-fade" style={{ transitionDelay: `${delay}ms` }}>
      <polyline
        points={points.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <polyline points={head} fill="none" stroke={stroke} strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

/** 01 Reform: the redesigned process across three lanes; the digital approval is the step that changed. */
function ProcessRedesign() {
  const label = useFigLabels();
  const W = 58;
  const H = 24;
  const lanes = [
    { key: "requester", top: 12 },
    { key: "procurement", top: 80 },
    { key: "finance", top: 148 },
  ];
  const LANE_H = 68;
  const cy = (lane: number) => lanes[lane].top + 42;
  const steps = [
    { key: "need", cx: 76, lane: 0 },
    { key: "approve", cx: 150, lane: 1, key_step: true },
    { key: "plan", cx: 226, lane: 1 },
    { key: "contract", cx: 302, lane: 1 },
    { key: "pay", cx: 366, lane: 2 },
  ];

  return (
    <svg aria-hidden viewBox="0 0 400 228" className={FIG_CLASS}>
      {/* The pool and its lanes. */}
      <g className="domain-iso-dim" style={{ transitionDelay: "120ms" }}>
        <rect x={2} y={12} width={396} height={LANE_H * 3} fill="none" stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        {lanes.slice(1).map((l) => (
          <line key={l.key} x1={2} y1={l.top} x2={398} y2={l.top} stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
        {lanes.map((l) => (
          <text key={l.key} x={10} y={l.top + 16} fill={INK} style={mono(9, 1.4)}>
            {label(l.key)}
          </text>
        ))}
      </g>

      {/* Start event. */}
      <circle
        className="interop-fig-rise"
        cx={24}
        cy={cy(0)}
        r={6}
        fill="#FFFFFF"
        stroke={BLUE}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        style={{ transitionDelay: "300ms" }}
      />

      <Connector points={[[30, cy(0)], [76 - W / 2, cy(0)]]} delay={420} />
      <Connector points={[[76 + W / 2, cy(0)], [150, cy(0)], [150, cy(1) - H / 2]]} delay={520} />
      <Connector points={[[150 + W / 2, cy(1)], [226 - W / 2, cy(1)]]} delay={620} />
      <Connector points={[[226 + W / 2, cy(1)], [302 - W / 2, cy(1)]]} delay={680} />
      <Connector points={[[302 + W / 2, cy(1)], [366, cy(1)], [366, cy(2) - H / 2]]} delay={740} />

      {steps.map((s, i) => (
        <g
          key={s.key}
          className={s.key_step ? "domain-iso-plate" : "interop-fig-rise"}
          style={{ transitionDelay: `${360 + i * 90}ms` }}
        >
          <rect
            x={s.cx - W / 2}
            y={cy(s.lane) - H / 2}
            width={W}
            height={H}
            fill={s.key_step ? BLUE : "#FFFFFF"}
            stroke={BLUE}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={s.cx}
            y={cy(s.lane) + 3.4}
            textAnchor="middle"
            fill={s.key_step ? "#FFFFFF" : INK}
            style={mono(9, 0.6)}
          >
            {label(s.key)}
          </text>
        </g>
      ))}

      {/* The approval that is now digital and signed. */}
      <circle
        className="domain-iso-node"
        cx={150 + W / 2}
        cy={cy(1) - H / 2}
        r={4}
        fill={RED}
        style={{ transitionDelay: "1000ms" }}
      />
    </svg>
  );
}

/** 02 People: local trainers at the top, cascading to institutions, officers and suppliers. */
function TrainingCascade() {
  const label = useFigLabels();
  const top = { cx: 176, y: 22, w: 150, h: 30 };
  const inst = { y: 92, w: 84, h: 26 };
  const instCx = [86, 176, 266];
  const officerY = 150;
  const supplier = { cx: 350, y: 150 };

  return (
    <svg aria-hidden viewBox="0 0 390 200" className={FIG_CLASS}>
      {/* Reach: how far the knowledge travels. */}
      <g className="domain-iso-dim" stroke={LINE} strokeWidth={1}>
        <line x1={14} y1={24} x2={14} y2={176} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <polyline points="9,168 14,178 19,168" fill="none" vectorEffect="non-scaling-stroke" />
      </g>
      <text
        className="domain-iso-dim"
        x={4}
        y={100}
        transform="rotate(-90 4 100)"
        textAnchor="middle"
        fill={INK}
        style={mono(9, 2)}
      >
        {label("reach")}
      </text>

      {/* Trainers to institutions. */}
      <g className="interop-fig-fade" style={{ transitionDelay: "520ms" }}>
        <polyline
          points={`${top.cx},${top.y + top.h} ${top.cx},71`}
          fill="none"
          stroke={LINE}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <line x1={instCx[0]} y1={71} x2={instCx[2]} y2={71} stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        {instCx.map((cx) => (
          <line key={cx} x1={cx} y1={71} x2={cx} y2={inst.y} stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* Institutions to their officers. */}
      {instCx.map((cx, i) => (
        <g key={`o-${cx}`} className="interop-fig-fade" style={{ transitionDelay: `${760 + i * 80}ms` }}>
          <line x1={cx} y1={inst.y + inst.h} x2={cx} y2={134} stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <line x1={cx - 22} y1={134} x2={cx + 22} y2={134} stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          {[-22, 0, 22].map((d) => (
            <line key={d} x1={cx + d} y1={134} x2={cx + d} y2={officerY} stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      ))}

      {/* Outreach to suppliers, a separate dashed branch. */}
      <g className="interop-fig-fade" style={{ transitionDelay: "640ms" }}>
        <polyline
          points={`${top.cx + top.w / 2},${top.y + top.h / 2} ${supplier.cx},${top.y + top.h / 2} ${supplier.cx},${supplier.y - 4}`}
          fill="none"
          stroke={LINE}
          strokeDasharray="4 3"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {instCx.map((cx, i) => (
        <g key={`i-${cx}`} className="interop-fig-rise" style={{ transitionDelay: `${620 + i * 70}ms` }}>
          <rect
            x={cx - inst.w / 2}
            y={inst.y}
            width={inst.w}
            height={inst.h}
            fill="#FFFFFF"
            stroke={BLUE}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <text x={cx} y={inst.y + inst.h / 2 + 3.2} textAnchor="middle" fill={INK} style={mono(9.5, 0.8)}>
            {label("institution")}
          </text>
        </g>
      ))}

      {/* Officers: three per institution. */}
      {instCx.flatMap((cx, i) =>
        [-22, 0, 22].map((d, j) => (
          <rect
            key={`sq-${cx}-${d}`}
            className="interop-fig-rise"
            x={cx + d - 7}
            y={officerY}
            width={14}
            height={14}
            fill="#FFFFFF"
            stroke={BLUE}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            style={{ transitionDelay: `${880 + i * 80 + j * 30}ms` }}
          />
        )),
      )}
      <text className="domain-iso-dim" x={176} y={188} textAnchor="middle" fill={INK} style={mono(9.5, 1.4)}>
        {label("officers")}
      </text>

      {/* Suppliers: round, to set them apart from the institution's own staff. */}
      {[-14, 0, 14].map((d, j) => (
        <circle
          key={`s-${d}`}
          className="interop-fig-rise"
          cx={supplier.cx + d}
          cy={supplier.y + 7}
          r={6}
          fill="#FFFFFF"
          stroke={BLUE}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          style={{ transitionDelay: `${960 + j * 40}ms` }}
        />
      ))}
      <text className="domain-iso-dim" x={supplier.cx} y={188} textAnchor="middle" fill={INK} style={mono(9.5, 1.4)}>
        {label("suppliers")}
      </text>

      {/* Local trainers: where the knowledge stays. */}
      <g className="domain-iso-plate" style={{ transitionDelay: "240ms" }}>
        <rect x={top.cx - top.w / 2} y={top.y} width={top.w} height={top.h} fill={BLUE} />
        <text
          x={top.cx}
          y={top.y + top.h / 2 + 3.2}
          textAnchor="middle"
          fill="#FFFFFF"
          style={mono(9.5, 1)}
        >
          {label("trainers")}
        </text>
      </g>
      <circle
        className="domain-iso-node"
        cx={top.cx}
        cy={top.y}
        r={4.5}
        fill={RED}
        style={{ transitionDelay: "1000ms" }}
      />
    </svg>
  );
}

/** 03 Platform: request to payment, tender and award on the national portal, one audit trail under it all. */
function TraceableLifecycle() {
  const label = useFigLabels();
  const W = 64;
  const H = 30;
  const rowY = 100;
  const step = 79;
  const boxes = ["request", "plan", "contract", "order", "payment"].map((key, i) => ({
    key,
    x: 6 + i * step,
    cx: 6 + i * step + W / 2,
  }));
  const portal = { x: 86, y: 22, w: 140, h: 30 };
  const trailY = 178;
  const trail = { x1: boxes[0].cx, x2: boxes[4].cx };

  return (
    <svg aria-hidden viewBox="0 0 400 212" className={FIG_CLASS}>
      {/* Tender and award happen on the national e-tendering portal. */}
      <g className="interop-fig-rise" style={{ transitionDelay: "560ms" }}>
        <rect
          x={portal.x}
          y={portal.y}
          width={portal.w}
          height={portal.h}
          fill="#FFFFFF"
          stroke={LINE}
          strokeDasharray="4 3"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <text x={portal.x + portal.w / 2} y={portal.y + portal.h / 2 + 3.2} textAnchor="middle" fill={INK} style={mono(9, 0.6)}>
          {label("portal")}
        </text>
      </g>

      <Connector points={[[boxes[0].x + W, rowY + H / 2], [boxes[1].x, rowY + H / 2]]} delay={600} />
      <Connector points={[[boxes[1].cx, rowY], [boxes[1].cx, portal.y + portal.h]]} delay={660} />
      <Connector points={[[boxes[2].cx, portal.y + portal.h], [boxes[2].cx, rowY]]} delay={720} />
      <Connector points={[[boxes[2].x + W, rowY + H / 2], [boxes[3].x, rowY + H / 2]]} delay={780} />
      <Connector points={[[boxes[3].x + W, rowY + H / 2], [boxes[4].x, rowY + H / 2]]} delay={840} />

      {/* Every step drops its record onto the trail. */}
      {boxes.map((b, i) => (
        <g key={`drop-${b.key}`} className="interop-fig-fade" style={{ transitionDelay: `${900 + i * 50}ms` }}>
          <line x1={b.cx} y1={rowY + H} x2={b.cx} y2={trailY} stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <circle cx={b.cx} cy={trailY} r={2.5} fill={BLUE} />
        </g>
      ))}

      {boxes.map((b, i) => (
        <g key={b.key} className="domain-iso-plate" style={{ transitionDelay: `${240 + i * 80}ms` }}>
          <rect x={b.x} y={rowY} width={W} height={H} fill="#FFFFFF" stroke={BLUE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <text x={b.cx} y={rowY + H / 2 + 3.4} textAnchor="middle" fill={INK} style={mono(9.5, 0.6)}>
            {label(b.key)}
          </text>
        </g>
      ))}

      {/* The audit trail: the one red line, and what the platform is for. */}
      <g className="interop-fig-fade" style={{ transitionDelay: "1100ms" }}>
        <line
          x1={trail.x1}
          y1={trailY}
          x2={trail.x2}
          y2={trailY}
          stroke={RED}
          strokeDasharray="4 3"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <text x={200} y={trailY + 22} textAnchor="middle" fill={INK} style={mono(9.5, 1.6)}>
          {label("auditTrail")}
        </text>
      </g>
      <circle className="domain-iso-node" cx={trail.x2} cy={trailY} r={4.5} fill={RED} style={{ transitionDelay: "1240ms" }} />
      <circle className="eproc-trail-packet" cx={trail.x1} cy={trailY} r={2.5} fill={RED} />
    </svg>
  );
}
