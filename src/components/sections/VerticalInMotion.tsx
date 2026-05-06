"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useTextScramble } from "@/hooks/useTextScramble";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

gsap.registerPlugin(useGSAP);
import {
  verticalsBySlug,
  type VerticalSlug,
  type ExpertiseDomain,
  type ArxiaVertical,
} from "@/data/domains";

/**
 * Chapter for one vertical — pinned full-viewport layout where:
 *   • Section opener (vertical name + tagline) stays static
 *   • Sticky-left domain panel updates as user scrolls
 *   • Right card area swaps cards with fade/slide
 *   • Snap forces clean per-card landings — one scroll input ≈ one transition
 *
 * After cycling through all 3 cards, the pin releases and the page continues
 * naturally to the next section.
 *
 * Mobile (< lg) and prefers-reduced-motion users get the static stacked
 * fallback (opener + 3 cards stacked, no pin, no swap).
 */
interface VerticalInMotionProps {
  verticalSlug: VerticalSlug;
  tone?: "dark" | "ultra-light";
  idSuffix?: string;
}

export function VerticalInMotion({
  verticalSlug,
  tone = "dark",
  idSuffix,
}: VerticalInMotionProps) {
  const vertical = verticalsBySlug[verticalSlug];
  const sectionId = `${verticalSlug}${idSuffix ? `-${idSuffix}` : ""}`;
  const dark = tone === "dark";

  return (
    <section id={sectionId}>
      <Chapter vertical={vertical} dark={dark} sectionId={sectionId} />
    </section>
  );
}

function Chapter({
  vertical,
  dark,
  sectionId,
}: {
  vertical: ArxiaVertical;
  dark: boolean;
  sectionId: string;
}) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 1024;
  });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const pinRef = useRef<HTMLDivElement>(null);
  const numCards = vertical.domains.length;

  // Synchronously kill any pinned ScrollTriggers in this section before
  // React reconciles a tree swap — the same fix applied to Hero. Without
  // this, GSAP's pin-spacer leaves the DOM out of sync with React.
  const killOwnedTriggers = () => {
    ScrollTrigger.getAll().forEach((st) => {
      const trigger = st.trigger as Node | undefined;
      if (trigger && pinRef.current?.contains(trigger)) st.kill();
    });
  };

  useEffect(() => {
    const checkMobile = () => {
      const next = window.innerWidth < 1024;
      setIsMobile((prev) => {
        if (prev !== next) killOwnedTriggers();
        return next;
      });
    };
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const onMql = () => {
      const next = mql.matches;
      setReducedMotion((prev) => {
        if (prev !== next) killOwnedTriggers();
        return next;
      });
    };
    mql.addEventListener?.("change", onMql);
    return () => {
      window.removeEventListener("resize", checkMobile);
      mql.removeEventListener?.("change", onMql);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useEnhanced = !isMobile && !reducedMotion && numCards > 1;

  // Pin + snap: pin the whole chapter while user scrolls through (N-1) viewports
  // of scroll distance. Snap forces clean landings on each card.
  //
  // useGSAP() from @gsap/react handles cleanup in the order React 19 expects,
  // reverting GSAP-introduced DOM mutations (the pin spacer wrap) BEFORE
  // React's reconciler tries to delete fibers. Without it, React hits
  // "removeChild on Node" because the pinned element's parent has been
  // swapped out to the pin spacer.
  useGSAP(
    () => {
      if (!useEnhanced || !pinRef.current) return;

      const vh = window.innerHeight;
      // One viewport of scroll per card transition — gives the wheel a
      // predictable "one swipe = one card" rhythm. Snap rounds any partial
      // scroll to the nearest discrete card.
      const pinDistance = (numCards - 1) * vh;

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: `+=${pinDistance}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        snap: {
          snapTo: (value) => {
            const step = 1 / (numCards - 1);
            return Math.round(value / step) * step;
          },
          duration: { min: 0.3, max: 0.6 },
          delay: 0.05,
          ease: "power2.inOut",
          directional: false,
          inertia: false,
        },
        onUpdate: (self) => {
          const idx = Math.min(
            numCards - 1,
            Math.round(self.progress * (numCards - 1))
          );
          setActiveIndex((prev) => (prev !== idx ? idx : prev));
        },
      });
    },
    { scope: pinRef, dependencies: [useEnhanced, numCards] }
  );

  const { displayText: activeDomainName } = useTextScramble({
    texts: vertical.domains.map((d) => d.name),
    activeIndex,
    scrambleDuration: 350,
    holdDuration: 99999,
    startResolved: true,
  });

  const bgClass = dark ? "blueprint-grid-dark" : "blueprint-grid-ultra-light";
  const textPrimary = dark ? "text-white" : "text-blueprint-blue";
  const textMuted = dark ? "text-gray-medium" : "text-gray-dark";

  // ─── Section opener (used by both pinned and fallback paths) ──────────
  const opener = (
    <header className={useEnhanced ? "mb-10 lg:mb-12" : "mb-20 lg:mb-24"}>
      <p
        className={`font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] mb-5 ${
          dark ? "text-accent-red/85" : "text-accent-red"
        }`}
      >
        The {vertical.shortName} vertical
      </p>
      <h2
        className={`font-bold ${textPrimary} mb-5`}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: useEnhanced
            ? "clamp(36px, 4.2vw, 56px)"
            : "clamp(40px, 6vw, 64px)",
          lineHeight: 1.02,
          letterSpacing: "-1.5px",
          whiteSpace: "nowrap",
        }}
      >
        {vertical.name}
      </h2>
      <div className="h-[3px] w-16 bg-accent-red mb-5" />
      <p
        className={`${textMuted}`}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "17px",
          lineHeight: 1.6,
          maxWidth: "560px",
        }}
      >
        {vertical.tagline}
      </p>
    </header>
  );

  if (!useEnhanced) {
    return (
      <div
        id={`${sectionId}-chapters`}
        className={`${bgClass} relative`}
        style={{
          paddingTop: "90px",
          paddingBottom: "100px",
          paddingLeft: "max(10%, 24px)",
          paddingRight: "max(10%, 24px)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "var(--content-max)" }}>
          {opener}
          <div className="flex flex-col gap-6">
            {vertical.domains.map((d, i) => (
              <DomainCard
                key={d.slug}
                domain={d}
                index={i}
                verticalSlug={vertical.slug}
                dark={dark}
                state="active"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={`${sectionId}-chapters`} className={`${bgClass} relative`}>
      <div
        ref={pinRef}
        className={`${bgClass} relative`}
        style={{
          display: "flex",
          minHeight: "100vh",
          paddingTop: "80px",
          paddingBottom: "48px",
          paddingLeft: "max(10%, 24px)",
          paddingRight: "max(10%, 24px)",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
          <div className="mx-auto w-full" style={{ maxWidth: "var(--content-max)" }}>
            <div className="grid grid-cols-[5fr_7fr] gap-12 items-start">
              {/* Left column: opener (static) + domain panel (changes) */}
              <div className="flex flex-col">
                {opener}

                {/* Domain panel — updates with activeIndex */}
                <div>
                  <p
                    className={`font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] ${
                      dark ? "text-accent-red/85" : "text-accent-red"
                    } mb-4`}
                  >
                    {`Domain ${String(activeIndex + 1).padStart(2, "0")} / 0${numCards}`}
                  </p>
                  <h3
                    className={`font-bold ${textPrimary} mb-3`}
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "clamp(36px, 4.5vw, 52px)",
                      lineHeight: 1.02,
                      letterSpacing: "-1px",
                      minHeight: "1.05em",
                    }}
                  >
                    {activeDomainName}
                  </h3>
                  <p
                    className={`${textMuted} mb-5 transition-opacity duration-300`}
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      minHeight: "3em",
                    }}
                  >
                    {vertical.domains[activeIndex]?.tagline}
                  </p>
                  <div className="flex gap-1.5">
                    {vertical.domains.map((d, i) => (
                      <span
                        key={d.slug}
                        className={`h-[3px] transition-all duration-300 ${
                          i === activeIndex
                            ? "w-12 bg-accent-red"
                            : "w-6 bg-gray-medium/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: card swap area. Cross-fade only — no
                  translateY offset (the vertical shift between cards
                  read as a "tilt" against the snap motion). Tighter
                  duration so the swap settles within snap's window. */}
              <div className="relative" style={{ minHeight: "440px" }}>
                {vertical.domains.map((d, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={d.slug}
                      className="absolute inset-0 transition-opacity duration-200 ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? "auto" : "none",
                        zIndex: isActive ? 2 : 1,
                      }}
                    >
                      <DomainCard
                        domain={d}
                        index={i}
                        verticalSlug={vertical.slug}
                        dark={dark}
                        state="active"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function DomainCard({
  domain,
  index,
  verticalSlug,
  dark,
  state,
}: {
  domain: ExpertiseDomain;
  index: number;
  verticalSlug: VerticalSlug;
  dark: boolean;
  state: "pending" | "active" | "past";
}) {
  const Icon = domain.icon;

  const cardBg = dark
    ? state === "active"
      ? "bg-blueprint-blue border-white/[0.18] shadow-[var(--shadow-card-hover)]"
      : "bg-blueprint-blue/80 border-white/[0.10]"
    : state === "active"
    ? "bg-white border-accent-red/30 shadow-[var(--shadow-card-hover)]"
    : "bg-white/80 border-gray-light";

  const textPrimary = dark ? "text-white" : "text-blueprint-blue";
  const textMuted = dark ? "text-gray-medium" : "text-gray-dark";

  return (
    <Link
      href={`/${verticalSlug}/${domain.slug}`}
      className={`relative block group border px-8 pt-8 pb-20 lg:px-10 lg:pt-10 lg:pb-24 transition-all duration-500 ${cardBg}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div
          className={`inline-flex items-center justify-center w-10 h-10 border ${
            dark ? "border-white/20" : "border-gray-light"
          }`}
        >
          <Icon
            size={20}
            strokeWidth={1.5}
            className={dark ? "text-white" : "text-blueprint-blue"}
          />
        </div>
        <span
          className={`font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] ${
            dark ? "text-gray-medium" : "text-gray-dark"
          }`}
        >
          {`0${index + 1} / 03`}
        </span>
      </div>

      <h3
        className={`font-semibold ${textPrimary} mb-3 transition-colors`}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "22px",
          lineHeight: 1.25,
          letterSpacing: "-0.3px",
        }}
      >
        {domain.name} — {domain.tagline}
      </h3>
      <p
        className={`${textMuted} mb-6`}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "15px",
          lineHeight: 1.7,
        }}
      >
        {domain.description}
      </p>

      <ul className="border-l-2 border-accent-red/70 pl-5 space-y-1.5">
        {domain.services.slice(0, 4).map((s) => (
          <li
            key={s.title}
            className={textMuted}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            {s.title}
          </li>
        ))}
      </ul>

      {/* Explore pill — bottom-right corner. Visual only; the card itself is the Link. */}
      <span
        aria-hidden
        className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 inline-flex items-center gap-1.5 bg-accent-red text-white font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px] px-3 py-1.5 group-hover:bg-[#c8161d] group-hover:translate-x-0.5 transition-all duration-200"
      >
        Explore
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
