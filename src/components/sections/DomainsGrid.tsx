"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  getExpertiseDomains,
  type ExpertiseDomainEntry,
  type ExpertiseDomainSlug,
} from "@/data/expertise-domains";

/**
 * The seven domains of expertise, plotted as a single-screen blueprint plate.
 *
 * Framing — "Digital Public Infrastructure & Digital Transformation" is the
 * UMBRELLA over all seven, so it sits in the section annotation, above the
 * heading. It is deliberately not a plate: it is what the seven add up to.
 *
 * Composition — a 5×2 drafting grid. Interoperability holds the left two
 * columns as a 2×2 anchor (Blueprint Blue, against white satellites) because
 * it is the practice the other six route through. The six satellites carry
 * number, icon and name only — their descriptions live on their own pages, so
 * the plate stays readable at a glance instead of becoming six paragraphs.
 *
 * Motion — three layers, all driven by the shared IntersectionObserver
 * (`useScrollAnimation` adds `.visible`), so `prefers-reduced-motion` is
 * already honoured by the rules in globals.css:
 *   1. Two construction lines sweep across the plate as it enters.
 *   2. Plates materialise in plotted order — registration marks draw, then
 *      the shared fade-and-rise, staggered.
 *   3. Inside the anchor, a node schematic draws itself: six spokes extend
 *      from the red core to six satellites — one per domain around it — then
 *      the core pulses.
 * The schematic's geometry is computed at module scope from a fixed viewBox,
 * so it never measures the DOM and cannot drift on resize.
 */

// ─── Desktop placement on the 5×2 drafting grid ──────────────────────────────
// The anchor takes the left half; the six satellites frame it three-up.
const LG_PLACEMENT: Record<ExpertiseDomainSlug, string> = {
  interoperability:
    "lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2 max-lg:order-first sm:max-lg:col-span-2",
  "data-governance": "lg:col-start-3 lg:row-start-1",
  "e-procurement": "lg:col-start-4 lg:row-start-1",
  "e-invoicing": "lg:col-start-5 lg:row-start-1",
  "web-portals": "lg:col-start-3 lg:row-start-2",
  "agentic-state": "lg:col-start-4 lg:row-start-2",
  "e-services": "lg:col-start-5 lg:row-start-2",
};

// ─── Anchor-plate schematic geometry ─────────────────────────────────────────
// One red core, six satellites on an ellipse — one node per surrounding
// domain. Six divides the circle evenly, so the figure reads as a structure
// rather than a scatter. Spoke lengths are precomputed so each can draw itself
// via stroke-dashoffset.
const SCHEM = { w: 240, h: 150, cx: 120, cy: 75, rx: 92, ry: 54 };

const SPOKES = Array.from({ length: 6 }, (_, i) => {
  const angle = (-90 + i * 60) * (Math.PI / 180);
  const x = SCHEM.cx + SCHEM.rx * Math.cos(angle);
  const y = SCHEM.cy + SCHEM.ry * Math.sin(angle);
  return { x, y, length: Math.hypot(x - SCHEM.cx, y - SCHEM.cy) };
});

export function DomainsGrid({
  tone = "ultra-light",
}: {
  tone?: "light" | "ultra-light";
}) {
  const t = useTranslations("Domains");
  const domains = getExpertiseDomains(useLocale());
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode={tone} id="expertise" fitScreen>
      <div ref={ref}>
        {/* Header. The umbrella is the annotation; the seven are the content. */}
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll max-w-[760px]"
        >
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase leading-[1.5] tracking-[2.2px] text-accent-red sm:text-[11px] sm:tracking-[2.5px]">
            {t("annotation")}
          </p>
          <h2
            className="mt-3 font-bold text-blueprint-blue"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(24px, 2.6vw, 34px)",
              lineHeight: 1.15,
              letterSpacing: "-0.6px",
            }}
          >
            {t("heading")}
          </h2>
          <div className="mt-3 h-[3px] w-12 bg-accent-red" />
          <p
            className="mt-4 text-body-text"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "15px",
              lineHeight: 1.6,
              maxWidth: "62ch",
            }}
          >
            {t("body")}
          </p>
        </div>

        {/* The plate. `relative` anchors the construction sweep. */}
        <div className="relative mt-8 lg:mt-10">
          {/* 1 — Construction lines: they sweep out from the plate's origin
              corner, the way a drawing gets set out before anything is drawn
              on it. Decorative. */}
          <div
            aria-hidden
            data-animate
            data-animate-index="1"
            className="domain-plate-setout absolute -inset-x-4 -top-5 hidden lg:block"
          >
            <span className="domain-setout-h absolute left-0 top-0 h-px w-full bg-gray-medium/30" />
            <span className="domain-setout-v absolute left-0 top-0 h-[calc(100%+2.5rem)] w-px bg-gray-medium/30" />
          </div>

          <ol
            className="
              grid grid-cols-1 gap-4
              sm:grid-cols-2
              lg:grid-cols-5 lg:grid-rows-2 lg:gap-5
              lg:min-h-[clamp(400px,56vh,600px)]
            "
          >
            {domains.map((domain, i) => (
              <li
                key={domain.slug}
                data-animate
                data-animate-index={i + 2}
                className={`animate-on-scroll ${LG_PLACEMENT[domain.slug]}`}
              >
                {domain.core ? (
                  <AnchorPlate domain={domain} t={t} />
                ) : (
                  <SatellitePlate domain={domain} t={t} />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type Translate = ReturnType<typeof useTranslations<"Domains">>;

/**
 * One of the six satellites. Number, icon, name — nothing else. The name is
 * the click target's whole promise; the detail is one click away.
 */
function SatellitePlate({
  domain,
  t,
}: {
  domain: ExpertiseDomainEntry;
  t: Translate;
}) {
  const Icon = domain.icon;

  return (
    <Link
      href={`/${domain.slug}`}
      className="
        domain-plate group relative flex h-full min-h-[132px] flex-col
        border border-gray-light bg-white
        px-5 pt-5 pb-12
        transition-[border-color,box-shadow,transform] duration-300
        hover:-translate-y-0.5 hover:border-gray-medium/60 hover:shadow-[var(--shadow-card-hover)]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-2
      "
    >
      <span
        aria-hidden
        className="domain-plate-accent absolute inset-y-0 left-0 w-[3px] bg-accent-red"
      />
      <PlateCorners />

      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden
          className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[2px] text-gray-medium"
        >
          {domain.order}
        </span>
        <Icon
          size={20}
          strokeWidth={1.5}
          aria-hidden
          className="shrink-0 text-blueprint-blue transition-colors duration-300 group-hover:text-accent-red"
        />
      </div>

      <h3
        className="mt-auto pt-6 font-semibold text-blueprint-blue"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "17px",
          lineHeight: 1.25,
          letterSpacing: "-0.3px",
        }}
      >
        {domain.name}
      </h3>

      <ExploreCue label={t("explore")} />
    </Link>
  );
}

/** Full-stack interoperability — the 2×2 anchor plate. */
function AnchorPlate({
  domain,
  t,
}: {
  domain: ExpertiseDomainEntry;
  t: Translate;
}) {
  const Icon = domain.icon;

  return (
    <Link
      href={`/${domain.slug}`}
      className="
        domain-plate domain-plate--anchor group relative flex h-full flex-col
        overflow-hidden border border-white/[0.14]
        blueprint-grid-blue
        px-6 pt-6 pb-14 lg:px-8 lg:pt-8
        transition-[border-color,box-shadow,transform] duration-300
        hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(13,21,32,0.28)]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-2
      "
    >
      <span
        aria-hidden
        className="domain-plate-accent absolute inset-y-0 left-0 w-[3px] bg-accent-red"
      />
      <PlateCorners dark />

      <div className="flex items-start justify-between gap-4">
        <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-accent-red sm:text-[11px]">
          {domain.order} · {t("coreLabel")}
        </span>
        <Icon
          size={22}
          strokeWidth={1.5}
          aria-hidden
          className="shrink-0 text-white/70 transition-colors duration-300 group-hover:text-white"
        />
      </div>

      <h3
        className="mt-5 font-bold text-white"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "clamp(21px, 1.9vw, 28px)",
          lineHeight: 1.12,
          letterSpacing: "-0.6px",
        }}
      >
        {domain.name}
      </h3>
      <div className="mt-4 h-[3px] w-12 bg-accent-red" />
      <p
        className="mt-4 max-w-[44ch] text-gray-light"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "14px",
          lineHeight: 1.65,
        }}
      >
        {domain.description}
      </p>

      <Schematic />

      <ExploreCue label={t("explore")} dark />
    </Link>
  );
}

/**
 * The anchor's node schematic: six spokes from a red core, one per
 * surrounding domain. Decorative — the plate's prose already says it.
 */
function Schematic() {
  return (
    <div className="pointer-events-none mt-6 flex flex-1 items-center justify-center">
      <svg
        aria-hidden
        viewBox={`0 0 ${SCHEM.w} ${SCHEM.h}`}
        className="domain-schematic h-auto w-full max-w-[240px] opacity-90"
      >
        {SPOKES.map((s, i) => (
          <line
            key={`spoke-${i}`}
            x1={SCHEM.cx}
            y1={SCHEM.cy}
            x2={s.x}
            y2={s.y}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            className="domain-schematic-spoke"
            style={{
              strokeDasharray: s.length,
              strokeDashoffset: s.length,
              transitionDelay: `${480 + i * 90}ms`,
            }}
          />
        ))}

        {SPOKES.map((s, i) => (
          <circle
            key={`node-${i}`}
            cx={s.x}
            cy={s.y}
            r={4}
            fill="var(--blueprint-blue)"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            className="domain-schematic-node"
            style={{ transitionDelay: `${840 + i * 90}ms` }}
          />
        ))}

        {/* The core. Only red element in the schematic — it carries the point. */}
        <circle
          cx={SCHEM.cx}
          cy={SCHEM.cy}
          r={7}
          fill="var(--accent-red)"
          className="domain-schematic-core"
        />
      </svg>
    </div>
  );
}

/** Mono "explore" microcopy, revealed on hover/focus of the plate. */
function ExploreCue({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={`
        domain-plate-cue absolute bottom-5 left-5 inline-flex items-center gap-2
        font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px]
        ${dark ? "lg:left-8 text-white" : "text-accent-red"}
      `}
    >
      {label}
      <span className="domain-plate-cue-arrow" aria-hidden>
        →
      </span>
    </span>
  );
}

/** Two L-brackets per plate — drafting registration, not a full frame. */
function PlateCorners({ dark = false }: { dark?: boolean }) {
  const tone = dark ? "border-white/25" : "border-gray-medium/40";
  return (
    <span aria-hidden className="max-sm:hidden">
      <span
        className={`domain-plate-corner domain-plate-corner--tl absolute left-2 top-2 h-2 w-2 border-l border-t ${tone}`}
      />
      <span
        className={`domain-plate-corner domain-plate-corner--br absolute bottom-2 right-2 h-2 w-2 border-b border-r ${tone}`}
      />
    </span>
  );
}
