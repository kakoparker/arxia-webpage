"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  getExpertiseDomains,
  type ExpertiseDomainEntry,
  type ExpertiseDomainSlug,
} from "@/data/expertise-domains";

/**
 * The eight domains of expertise, plotted as a blueprint plate.
 *
 * Composition — a 4×3 drafting grid on desktop, with Full-stack
 * Interoperability held as the 2×2 anchor plate at the centre (Blueprint Blue,
 * against white satellites) because it is the practice the other seven route
 * through. The twelfth cell is left to a `fig.` annotation rather than an
 * eighth satellite: intentional white space, per the composition rules.
 *
 * Motion — three layers, all driven by the shared IntersectionObserver
 * (`useScrollAnimation` adds `.visible`), so everything is gated behind
 * `prefers-reduced-motion` by the rules already in globals.css:
 *   1. Two construction lines sweep across the plate as it enters.
 *   2. Plates materialise in plotted order — corner registration marks draw,
 *      then number, title, body (the shared fade-and-rise, staggered 80ms).
 *   3. Inside the anchor plate a node schematic draws itself: seven spokes
 *      extend from the red core to seven satellites, then the core pulses.
 * The schematic's geometry is computed at module scope from a fixed viewBox,
 * so it never measures the DOM and cannot drift on resize.
 *
 * Each plate is a link to that domain's own page.
 */

// ─── Desktop placement on the 4×3 drafting grid ──────────────────────────────
// Deliberate: the anchor holds the centre two columns; satellites frame it.
const LG_PLACEMENT: Record<ExpertiseDomainSlug, string> = {
  "digital-transformation": "lg:col-start-1 lg:row-start-1",
  interoperability:
    "lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2 max-lg:order-first sm:max-lg:col-span-2",
  "data-governance": "lg:col-start-4 lg:row-start-1",
  "e-procurement": "lg:col-start-1 lg:row-start-2",
  "e-invoicing": "lg:col-start-4 lg:row-start-2",
  "web-portals": "lg:col-start-1 lg:row-start-3",
  "agentic-state": "lg:col-start-2 lg:row-start-3",
  "e-services": "lg:col-start-3 lg:row-start-3",
};

// ─── Anchor-plate schematic geometry ─────────────────────────────────────────
// One red core, seven satellites on an ellipse sized for the wide 2×2 plate.
// Lengths are precomputed so each spoke can draw itself via stroke-dashoffset.
const SCHEM = { w: 260, h: 150, cx: 130, cy: 75, rx: 104, ry: 56 };

const SPOKES = Array.from({ length: 7 }, (_, i) => {
  const angle = (-90 + i * (360 / 7)) * (Math.PI / 180);
  const x = SCHEM.cx + SCHEM.rx * Math.cos(angle);
  const y = SCHEM.cy + SCHEM.ry * Math.sin(angle);
  const length = Math.hypot(x - SCHEM.cx, y - SCHEM.cy);
  return { x, y, length };
});

export function DomainsGrid({
  tone = "light",
}: {
  tone?: "light" | "ultra-light";
}) {
  const t = useTranslations("Domains");
  const domains = getExpertiseDomains(useLocale());
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode={tone} id="expertise">
      <div ref={ref}>
        <div data-animate data-animate-index="0" className="animate-on-scroll">
          <SectionHeader
            annotation={t("annotation")}
            heading={t("heading")}
            body={t("body")}
          />
        </div>

        {/* The plate. `relative` anchors the construction sweep. */}
        <div className="relative mt-14 lg:mt-20">
          {/* 1 — Construction lines. Decorative: they sweep out from the
              plate's top-left as it enters, the way a drawing gets set out
              before anything is drawn on it. */}
          <div
            aria-hidden
            data-animate
            data-animate-index="1"
            className="domain-plate-setout absolute -inset-x-4 -top-6 hidden lg:block"
          >
            <span className="domain-setout-h absolute left-0 top-0 h-px w-full bg-gray-medium/30" />
            <span className="domain-setout-v absolute left-0 top-0 h-[calc(100%+3rem)] w-px bg-gray-medium/30" />
          </div>

          <ol
            className="
              grid grid-cols-1 gap-5
              sm:grid-cols-2
              lg:grid-cols-4 lg:grid-rows-3 lg:min-h-[760px]
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

            {/* Twelfth cell — drafting annotation instead of content. */}
            <li
              aria-hidden
              data-animate
              data-animate-index={domains.length + 2}
              className="animate-on-scroll hidden lg:col-start-4 lg:row-start-3 lg:flex"
            >
              <FigureAnnotation caption={t("figCaption")} />
            </li>
          </ol>
        </div>
      </div>
    </SectionContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type Translate = ReturnType<typeof useTranslations<"Domains">>;

/** The seven white plates framing the anchor. */
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
        domain-plate group relative flex h-full flex-col
        border border-gray-light bg-white
        px-6 pt-6 pb-14
        transition-[border-color,box-shadow,transform] duration-300
        hover:-translate-y-0.5 hover:border-gray-medium/60 hover:shadow-[var(--shadow-card-hover)]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-2
      "
    >
      {/* 3px left accent, grows on hover/focus */}
      <span
        aria-hidden
        className="domain-plate-accent absolute inset-y-0 left-0 w-[3px] bg-accent-red"
      />
      <PlateCorners />

      <div className="mb-6 flex items-start justify-between gap-4">
        <span
          className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-[2px] text-gray-medium"
          aria-hidden
        >
          {domain.order}
        </span>
        <Icon
          size={22}
          strokeWidth={1.5}
          aria-hidden
          className="shrink-0 text-blueprint-blue transition-colors duration-300 group-hover:text-accent-red"
        />
      </div>

      <h3
        className="mb-3 font-semibold text-blueprint-blue"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "18px",
          lineHeight: 1.3,
          letterSpacing: "-0.3px",
        }}
      >
        {domain.name}
      </h3>
      <p
        className="text-gray-dark"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "14px",
          lineHeight: 1.6,
        }}
      >
        {domain.description}
      </p>

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
        px-8 pt-8 pb-16 lg:px-10 lg:pt-10
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

      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-accent-red">
          {domain.order} · {t("coreLabel")}
        </span>
        <Icon
          size={24}
          strokeWidth={1.5}
          aria-hidden
          className="shrink-0 text-white/70 transition-colors duration-300 group-hover:text-white"
        />
      </div>

      <h3
        className="mb-4 font-bold text-white"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "clamp(22px, 2vw, 30px)",
          lineHeight: 1.15,
          letterSpacing: "-0.6px",
        }}
      >
        {domain.name}
      </h3>
      <div className="mb-5 h-[3px] w-12 bg-accent-red" />
      <p
        className="max-w-[46ch] text-gray-light"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "15px",
          lineHeight: 1.7,
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
 * The anchor plate's node schematic: seven spokes from a red core.
 * Decorative — the concept is already stated in the plate's prose.
 */
function Schematic() {
  return (
    <div className="pointer-events-none mt-8 flex flex-1 items-center justify-center lg:mt-6">
      <svg
        aria-hidden
        viewBox={`0 0 ${SCHEM.w} ${SCHEM.h}`}
        className="domain-schematic h-auto w-full max-w-[300px] opacity-90"
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
              transitionDelay: `${520 + i * 90}ms`,
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
            style={{ transitionDelay: `${900 + i * 90}ms` }}
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
        domain-plate-cue absolute bottom-6 left-6 inline-flex items-center gap-2
        font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px]
        ${dark ? "lg:left-10 text-white" : "text-accent-red"}
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
        className={`domain-plate-corner domain-plate-corner--tl absolute left-2 top-2 h-2.5 w-2.5 border-l border-t ${tone}`}
      />
      <span
        className={`domain-plate-corner domain-plate-corner--br absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r ${tone}`}
      />
    </span>
  );
}

/** The twelfth cell: a drawing annotation where an eighth plate would go. */
function FigureAnnotation({ caption }: { caption: string }) {
  return (
    <div className="relative flex h-full w-full items-end">
      <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-gray-medium/30" />
      <p
        className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase leading-[1.6] tracking-[1.5px] text-gray-medium"
        style={{ maxWidth: "22ch" }}
      >
        {caption}
      </p>
    </div>
  );
}
