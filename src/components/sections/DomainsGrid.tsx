"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { IsoStackFigure } from "@/components/figures/IsoStack";
import {
  getExpertiseDomains,
  type ExpertiseDomainEntry,
  type ExpertiseDomainSlug,
} from "@/data/expertise-domains";
import type { DomainHighlights } from "@/data/domain-pages";

/**
 * The seven domains of expertise, plotted as a single-screen blueprint plate.
 *
 * Framing — "Digital Public Infrastructure & Digital Transformation" is the
 * UMBRELLA over all seven, so it sits in the section annotation, above the
 * heading. It is deliberately not a plate: it is what the seven add up to.
 *
 * Composition — a 5×2 drafting grid. Interoperability holds the left two
 * columns as a 2×2 anchor (Blueprint Blue, against white satellites) because
 * it is the practice the other six route through. The six satellites show
 * number, icon, name and a one-line description, so the plate reads at a
 * glance instead of becoming six paragraphs.
 *
 * Opening a domain — clicking a plate opens it into a panel across four
 * columns (introduction, headline offers, a link to its page and to its
 * projects) while the other six slide into the fifth column as compact tabs.
 * The section keeps its height. The move is a View Transition, so each plate
 * glides to its new place; browsers without the API, and readers who prefer
 * reduced motion, get the same change instantly. Below lg the opened domain
 * simply spans the full width in place. Before hydration (and without JS) the
 * plates are plain links to the domain pages.
 *
 * Motion on entry — three layers, all driven by the shared
 * IntersectionObserver (`useScrollAnimation` adds `.visible`), so
 * `prefers-reduced-motion` is already honoured by the rules in globals.css:
 *   1. Two construction lines sweep across the plate as it enters.
 *   2. Plates materialise in plotted order — registration marks draw, then
 *      the shared fade-and-rise, staggered.
 *   3. Inside the anchor, an exploded isometric stack assembles bottom-up.
 */

// ─── Desktop placement on the 5×2 drafting grid ──────────────────────────────
// The anchor takes the left half; the six satellites frame it three-up. The
// open state re-places every plate from globals.css (`.domain-grid[data-open]`).
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

/** What the server resolves per domain for its panel (one locale only). */
export type DomainPanelData = DomainHighlights & { intro: string };

const openerId = (slug: ExpertiseDomainSlug) => `domain-open-${slug}`;
const panelId = (slug: ExpertiseDomainSlug) => `domain-panel-${slug}`;

export function DomainsGrid({
  tone = "ultra-light",
  panels = {},
}: {
  tone?: "light" | "ultra-light";
  panels?: Partial<Record<ExpertiseDomainSlug, DomainPanelData>>;
}) {
  const t = useTranslations("Domains");
  const domains = getExpertiseDomains(useLocale());
  const ref = useScrollAnimation();
  const isLg = useMediaQuery("(min-width: 1024px)");

  // Plates are links until hydration, then buttons that open the panel.
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);

  const [active, setActive] = useState<ExpertiseDomainSlug | null>(null);
  const activeRef = useRef<ExpertiseDomainSlug | null>(null);
  const lastActive = useRef<ExpertiseDomainSlug | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Resolves the View Transition's update callback once React has committed
  // the new layout, so the browser snapshots the "after" state correctly.
  const committed = useRef<(() => void) | null>(null);

  // Every domain's panel is in the HTML from the start (indexable content),
  // inside a wrapper that stays hidden until the domain is opened. React only
  // knows `hidden` as a boolean, so the server sends plain `hidden` and,
  // once hydrated, closed wrappers are upgraded to `hidden="until-found"`:
  // the browser's find-in-page can then match their text, and its
  // `beforematch` event opens that domain.
  const panelWraps = useRef(new Map<ExpertiseDomainSlug, HTMLDivElement>());
  const openedByFind = useRef(false);

  useLayoutEffect(() => {
    activeRef.current = active;
    for (const [slug, el] of panelWraps.current) {
      if (slug !== active) el.setAttribute("hidden", "until-found");
    }
    committed.current?.();
    committed.current = null;
  }, [active]);

  useEffect(() => {
    const offs: Array<() => void> = [];
    for (const [slug, el] of panelWraps.current) {
      const onMatch = () => {
        openedByFind.current = true;
        setActive(slug);
      };
      el.addEventListener("beforematch", onMatch);
      offs.push(() => el.removeEventListener("beforematch", onMatch));
    }
    return () => offs.forEach((off) => off());
  }, []);

  const select = useCallback((slug: ExpertiseDomainSlug | null) => {
    if (slug === activeRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof document.startViewTransition !== "function") {
      setActive(slug);
      return;
    }
    const transition = document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          committed.current = resolve;
          setActive(slug);
        }),
    );
    // A hidden tab skips the animation (the layout still updates); that is
    // not an error worth surfacing.
    transition.ready.catch(() => {});
  }, []);

  // Focus follows the panel: into its heading on open, back to the plate
  // that opened it on close.
  useEffect(() => {
    if (active) {
      lastActive.current = active;
      const li = headingRef.current?.closest("li");
      if (openedByFind.current) {
        // The reader is in the find bar: leave focus there, just keep the
        // opened domain in view once it has moved into place.
        openedByFind.current = false;
        li?.scrollIntoView({ block: "nearest" });
        return;
      }
      headingRef.current?.focus({ preventScroll: true });
      if (!isLg) li?.scrollIntoView({ block: "nearest" });
    } else if (lastActive.current) {
      document.getElementById(openerId(lastActive.current))?.focus({ preventScroll: true });
      lastActive.current = null;
    }
  }, [active, isLg]);

  // Escape closes.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && select(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, select]);

  const open = enhanced ? select : undefined;
  let tabRow = 0;

  return (
    <SectionContainer mode={tone} id="expertise" fitScreen>
      <div ref={ref}>
        {/* Header. The umbrella is the annotation; the seven are the content. */}
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll max-w-[760px]"
        >
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase leading-[1.5] tracking-[2.2px] text-accent-red-deep sm:text-[11px] sm:tracking-[2.5px]">
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
            {/* The principle behind the seven domains, in one line. */}
            {t("intro")}
          </p>
        </div>

        {/* The plate. `relative` anchors the construction sweep. */}
        <div className="relative mt-6 lg:mt-[clamp(20px,3.5vh,40px)]">
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
            data-open={active ? "" : undefined}
            className="
              domain-grid grid grid-cols-1 gap-4
              sm:grid-cols-2
              lg:grid-cols-5 lg:grid-rows-2 lg:gap-5
              lg:min-h-[clamp(360px,52vh,560px)]
            "
          >
            {domains.map((domain, i) => {
              const isActive = active === domain.slug;
              const asTab = Boolean(active) && !isActive && isLg;
              const style: CSSProperties & Record<string, string | number> = {
                viewTransitionName: `domain-${domain.slug}`,
              };
              if (active && !isActive) style["--tab-row"] = ++tabRow;
              const panel = panels[domain.slug];
              return (
                <li
                  key={domain.slug}
                  data-animate
                  data-animate-index={i + 2}
                  data-active={isActive ? "" : undefined}
                  className={`animate-on-scroll ${LG_PLACEMENT[domain.slug]}`}
                  style={style}
                >
                  {isActive && panel ? null : asTab ? (
                    <DomainTab domain={domain} onOpen={() => select(domain.slug)} />
                  ) : domain.core ? (
                    <AnchorPlate domain={domain} t={t} onOpen={open && (() => open(domain.slug))} />
                  ) : (
                    <SatellitePlate domain={domain} t={t} onOpen={open && (() => open(domain.slug))} />
                  )}
                  {panel && (
                    <div
                      ref={(el) => {
                        if (el) panelWraps.current.set(domain.slug, el);
                        else panelWraps.current.delete(domain.slug);
                      }}
                      hidden={!isActive}
                      className={isActive ? "h-full" : undefined}
                    >
                      <DomainPanel
                        domain={domain}
                        data={panel}
                        t={t}
                        headingRef={isActive ? headingRef : undefined}
                        onClose={() => select(null)}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </SectionContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type Translate = ReturnType<typeof useTranslations<"Domains">>;
type OpenFn = (() => void) | undefined;

/** True while the media query matches; false on the server and first render. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return matches;
}

/**
 * A plate's control, stretched over the whole plate: a button that opens the
 * panel once hydrated, a link to the domain page before that. It sits inside
 * the plate's heading, so the seven domains stay real headings either way.
 */
function PlateControl({
  domain,
  onOpen,
  children,
}: {
  domain: ExpertiseDomainEntry;
  onOpen: OpenFn;
  children: React.ReactNode;
}) {
  const cls =
    "text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none cursor-pointer";
  if (onOpen) {
    return (
      <button
        type="button"
        id={openerId(domain.slug)}
        aria-expanded={false}
        aria-controls={panelId(domain.slug)}
        onClick={onOpen}
        className={cls}
      >
        {children}
      </button>
    );
  }
  return (
    <Link href={`/${domain.slug}`} className={cls}>
      {children}
    </Link>
  );
}

const plateFocus =
  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-red has-[:focus-visible]:outline-offset-2";

/**
 * One of the six satellites, read top to bottom: number and icon, then the
 * name with its one-line description directly under it (so names line up
 * across a row), three keywords at the foot, and a permanent "Read more"
 * that says the plate opens. Nothing is held back for a hover.
 */
function SatellitePlate({
  domain,
  t,
  onOpen,
}: {
  domain: ExpertiseDomainEntry;
  t: Translate;
  onOpen: OpenFn;
}) {
  const Icon = domain.icon;

  return (
    <div
      className={`
        domain-plate group relative flex h-full min-h-[150px] flex-col
        border border-gray-light bg-white
        px-5 pt-4 pb-3.5
        transition-[border-color,box-shadow,transform] duration-300
        hover:-translate-y-0.5 hover:border-gray-medium/60 hover:shadow-[var(--shadow-card-hover)]
        ${plateFocus}
      `}
    >
      <span
        aria-hidden
        className="domain-plate-accent absolute inset-y-0 left-0 w-[3px] bg-accent-red"
      />
      <PlateCorners />

      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden
          className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[2px] text-gray-dark"
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
        className="mt-2.5 font-semibold text-blueprint-blue"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "17px",
          lineHeight: 1.25,
          letterSpacing: "-0.3px",
        }}
      >
        <PlateControl domain={domain} onOpen={onOpen}>
          {domain.name}
        </PlateControl>
      </h3>

      {/* Clamped to three lines only on short screens, where Spanish and
          French lines would otherwise push the section past one screen. */}
      <p
        className="pt-1.5 text-gray-dark [@media(max-height:800px)]:line-clamp-3"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "13.5px",
          lineHeight: 1.45,
        }}
      >
        {domain.oneLine}
      </p>

      {/* Keywords: what the domain covers, at a glance. Dropped on short
          screens, where the plate has no room to spare. */}
      <ul className="mt-auto flex flex-wrap gap-1 pt-3 [@media(max-height:880px)]:hidden">
        {domain.scope.map((tag) => (
          <li
            key={tag}
            className="border border-gray-light bg-gray-lightest px-1.5 py-[2px] font-[family-name:var(--font-jetbrains)] text-[10px] uppercase leading-[1.4] tracking-[1px] text-gray-dark"
          >
            {tag}
          </li>
        ))}
      </ul>

      <ExploreCue label={onOpen ? t("readMore") : t("explore")} footer />
    </div>
  );
}

/** Full-stack interoperability — the 2×2 anchor plate. */
function AnchorPlate({
  domain,
  t,
  onOpen,
}: {
  domain: ExpertiseDomainEntry;
  t: Translate;
  onOpen: OpenFn;
}) {
  const Icon = domain.icon;

  return (
    <div
      className={`
        domain-plate domain-plate--anchor group relative flex h-full flex-col
        overflow-hidden border border-white/[0.14]
        blueprint-grid-blue
        px-6 pt-6 pb-14 lg:px-8 lg:pt-8
        transition-[border-color,box-shadow,transform] duration-300
        hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(13,21,32,0.28)]
        ${plateFocus}
      `}
    >
      <span
        aria-hidden
        className="domain-plate-accent absolute inset-y-0 left-0 w-[3px] bg-accent-red"
      />
      <PlateCorners dark />

      <div className="flex items-start justify-between gap-4">
        <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-accent-red-bright sm:text-[11px]">
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
        <PlateControl domain={domain} onOpen={onOpen}>
          {domain.name}
        </PlateControl>
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

      <ExploreCue label={onOpen ? t("readMore") : t("explore")} dark />
    </div>
  );
}

/**
 * A closed domain while another is open (lg only): number, icon and name in
 * one row, stacked in the fifth column. Interoperability keeps its Blueprint
 * Blue so the core still reads as the core.
 */
function DomainTab({ domain, onOpen }: { domain: ExpertiseDomainEntry; onOpen: () => void }) {
  const Icon = domain.icon;
  const tone = domain.core
    ? "border-white/[0.14] bg-blueprint-blue text-white hover:border-white/40"
    : "border-gray-light bg-white text-blueprint-blue hover:border-gray-medium/60 hover:shadow-[var(--shadow-card-hover)]";
  return (
    <button
      type="button"
      id={openerId(domain.slug)}
      aria-expanded={false}
      aria-controls={panelId(domain.slug)}
      onClick={onOpen}
      className={`
        group relative flex h-full w-full items-center gap-3 border px-3.5 py-2 text-left
        transition-[border-color,box-shadow] duration-300 cursor-pointer
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-2
        ${tone}
      `}
    >
      <span
        aria-hidden
        className={`font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[2px] ${
          domain.core ? "text-accent-red-bright" : "text-gray-dark"
        }`}
      >
        {domain.order}
      </span>
      <span
        className="line-clamp-2 flex-1 font-semibold"
        style={{ fontFamily: "var(--font-primary)", fontSize: "14px", lineHeight: 1.25 }}
      >
        {/* Non-breaking hyphens: a narrow tab must not split "e-" from
            "Procurement". */}
        {domain.name.replace(/-/g, "‑")}
      </span>
      <Icon
        size={16}
        strokeWidth={1.5}
        aria-hidden
        className={`shrink-0 transition-colors duration-300 ${
          domain.core ? "text-white/70 group-hover:text-white" : "group-hover:text-accent-red"
        }`}
      />
    </button>
  );
}

/**
 * The open domain: introduction, headline offers, and the way on to its page
 * and its projects. Blueprint Blue, like the anchor, so the open domain is
 * the darkest, most prominent object in the section.
 */
function DomainPanel({
  domain,
  data,
  t,
  headingRef,
  onClose,
}: {
  domain: ExpertiseDomainEntry;
  data: DomainPanelData;
  t: Translate;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
  onClose: () => void;
}) {
  const Icon = domain.icon;
  const mono = "font-[family-name:var(--font-jetbrains)] uppercase";

  return (
    <div
      id={panelId(domain.slug)}
      role="region"
      aria-labelledby={`${panelId(domain.slug)}-heading`}
      className="domain-panel relative flex h-full flex-col border border-white/[0.14] blueprint-grid-blue px-6 py-6 text-white lg:px-10 lg:py-[clamp(20px,3.2vh,36px)]"
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-accent-red" />
      <PlateCorners dark />

      <div className="flex items-start justify-between gap-6">
        <div>
          <p className={`${mono} text-[11px] tracking-[2px] text-accent-red-bright`}>
            {domain.order}
            {domain.core ? ` · ${t("coreLabel")}` : ""}
          </p>
          <h3
            id={`${panelId(domain.slug)}-heading`}
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 font-bold text-white outline-none"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(22px, min(2.2vw, 4.2vh), 32px)",
              lineHeight: 1.1,
              letterSpacing: "-0.6px",
            }}
          >
            {domain.name}
          </h3>
          <div className="mt-3 h-[3px] w-12 bg-accent-red" />
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Icon size={24} strokeWidth={1.5} aria-hidden className="hidden text-white/60 sm:block" />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("panel.close")}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors duration-200 hover:border-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
          >
            <X size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>

      <div className="mt-5 grid flex-1 gap-6 lg:mt-[clamp(14px,2.5vh,28px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
        {/* Short screens get tighter type so an open domain still fits. */}
        <p
          className="max-w-[62ch] text-[15.5px] leading-[1.7] text-gray-light [@media(max-height:800px)]:text-[14.5px] [@media(max-height:800px)]:leading-[1.58]"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.intro}
        </p>

        {data.items.length > 0 && (
          <div>
            <p className={`${mono} text-[11px] tracking-[2px] text-gray-medium`}>{t("panel.offers")}</p>
            <ul className="mt-3 border-t border-white/10">
              {data.items.map((item) => (
                <li key={item.title} className="flex gap-3 border-b border-white/10 py-2.5 [@media(max-height:800px)]:py-1.5">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent-red" />
                  <span>
                    <span
                      className="block font-semibold text-white"
                      style={{ fontFamily: "var(--font-primary)", fontSize: "14px", lineHeight: 1.4 }}
                    >
                      {item.title}
                    </span>
                    {item.detail && (
                      <span className="mt-0.5 block text-[13px] leading-[1.45] text-gray-medium">
                        {item.detail}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 lg:mt-[clamp(14px,2.5vh,28px)]">
        <Button variant="primary" dark href={`/${domain.slug}`}>
          {t("panel.explore", { name: domain.name })}
          <span aria-hidden className="ml-2">→</span>
        </Button>
        <Link
          href={`/portfolio?domain=${data.portfolioCategory}#projects`}
          className={`${mono} inline-flex min-h-11 items-center gap-2 text-[11px] tracking-[2px] text-accent-red-bright transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
        >
          {t("panel.projects")}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

/**
 * The anchor's figure: the shared isometric stack (see `IsoStack.tsx`).
 * Decorative — the plate's prose already names the layers.
 */
function Schematic() {
  return (
    <div className="pointer-events-none mt-5 flex flex-1 items-center justify-center">
      {/* Capped against viewport height too: the figure is the anchor plate's
          tallest element, so on a short screen it decides whether the whole
          section fits. */}
      <IsoStackFigure className="domain-schematic h-auto w-full max-w-[min(250px,27vh)]" />
    </div>
  );
}

/**
 * Mono "read more" cue. On the satellites it is a permanent footer row, so a
 * plate always says it opens; on the anchor it slides in on hover/focus.
 */
function ExploreCue({
  label,
  dark = false,
  footer = false,
}: {
  label: string;
  dark?: boolean;
  footer?: boolean;
}) {
  const type = "font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px]";
  if (footer) {
    return (
      <span
        aria-hidden
        className={`pointer-events-none mt-2.5 flex items-center gap-2 border-t border-gray-light pt-2.5 text-accent-red-deep ${type}`}
      >
        {label}
        <span className="domain-plate-cue-arrow">→</span>
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className={`
        domain-plate-cue pointer-events-none absolute bottom-5 left-5 inline-flex items-center gap-2
        ${type}
        ${dark ? "lg:left-8 text-white" : "text-accent-red-deep"}
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
