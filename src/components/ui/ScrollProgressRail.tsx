"use client";

import { useEffect, useRef, useState } from "react";

export interface RailSection {
  id: string;
  label: string;
}

interface ScrollProgressRailProps {
  sections: RailSection[];
  /** Vertical offset (px) to compensate for fixed navbar on scroll-to. */
  navOffset?: number;
  /** Pixel scrollY below which the rail stays hidden (hero zone). */
  showAfter?: number;
}

/**
 * Fixed vertical rail pinned to the right edge of the viewport, showing a
 * dot per top-level section of the current page. The dot of the section
 * currently intersecting the viewport's top-third fills red; hover/active
 * reveals its label. Hidden on <lg breakpoints.
 *
 * Orientation pattern used by Stripe / Linear / Vercel docs — two-layer
 * answer to "where am I in this page?" when combined with VerticalInMotion's
 * sticky-left vertical label.
 */
export function ScrollProgressRail({
  sections,
  navOffset = 72,
  showAfter = 300,
}: ScrollProgressRailProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const compute = () => {
      rafRef.current = null;
      const scrollY = window.scrollY;
      setVisible(scrollY > showAfter);

      const threshold = window.innerHeight * 0.3;
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < threshold) current = s.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, showAfter]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <nav
      aria-label="Page sections"
      className={`hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-5 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {sections.map((s) => {
        const isActive = activeId === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => jumpTo(s.id)}
            className="group relative flex items-center justify-end w-4 h-4 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red focus-visible:outline-offset-4"
            aria-label={`Jump to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label — slides in on hover or when active */}
            <span
              className={`absolute right-full mr-3 whitespace-nowrap font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] transition-all duration-200 pointer-events-none ${
                isActive
                  ? "opacity-100 translate-x-0 text-accent-red"
                  : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-gray-medium"
              }`}
            >
              {s.label}
            </span>
            {/* Dot */}
            <span
              aria-hidden
              className={`inline-block rounded-full transition-all duration-200 ${
                isActive
                  ? "w-2 h-2 bg-accent-red scale-125"
                  : "w-1.5 h-1.5 bg-gray-medium/40 group-hover:bg-gray-medium"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
