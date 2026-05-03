"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

interface SplitPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  direction?: "opposite" | "parallel";
  className?: string;
  /**
   * Parallax offset in px at scroll-start. Applied as y-translate;
   * the opposite end gets -offset at scroll-end (scrubbed).
   */
  offset?: number;
}

/**
 * Two-column primitive with opposite-direction parallax, inspired by
 * cinematic-site-components M08 "Split Screen Scroll". Used by the Fork.
 * Mobile (< lg) stacks vertically with no parallax.
 */
export function SplitPanel({
  left,
  right,
  direction = "opposite",
  className = "",
  offset = 60,
}: SplitPanelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !leftRef.current || !rightRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    if (window.innerWidth < 1024) return;

    const rightFromY = direction === "opposite" ? -offset : offset;
    const rightToY = direction === "opposite" ? offset : -offset;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    tl.fromTo(
      leftRef.current,
      { y: offset },
      { y: -offset, ease: "none" },
      0
    );
    tl.fromTo(
      rightRef.current,
      { y: rightFromY },
      { y: rightToY, ease: "none" },
      0
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [direction, offset]);

  return (
    <div
      ref={wrapperRef}
      className={`relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden ${className}`}
    >
      <div ref={leftRef} className="will-change-transform">
        {left}
      </div>
      <div ref={rightRef} className="will-change-transform">
        {right}
      </div>
      <div
        aria-hidden
        className="hidden lg:block absolute inset-y-0 left-1/2 w-px bg-gray-medium/15 -translate-x-1/2 pointer-events-none"
      />
    </div>
  );
}
