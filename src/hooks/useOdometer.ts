"use client";

import { useState, useEffect, useRef } from "react";

interface UseOdometerOptions {
  target: number;
  duration?: number;
  suffix?: string;
}

interface OdometerResult {
  ref: React.RefObject<HTMLDivElement | null>;
  displayValue: string;
}

/**
 * Counts a figure up from 0 the moment any part of it enters the viewport.
 *
 * The resting value is the real figure, not 0: server HTML, crawlers and
 * no-JS readers get "25+", and the count-up only replaces it once the figure
 * is actually on screen. (It used to rest at "0+" and wait for the element to
 * pass 85% of the viewport height on a window scroll event — so a figure in
 * the bottom strip of the screen, as on phones or short laptops, sat at "0+"
 * until the visitor scrolled further.)
 */
export function useOdometer({
  target,
  duration = 1200,
  suffix = "",
}: UseOdometerOptions): OdometerResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(`${target}${suffix}`);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(`${target}${suffix}`);
      return;
    }

    const startAnimation = () => {
      let startTime: number | null = null;
      const frame = (now: number) => {
        if (startTime === null) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setDisplayValue(`${Math.round(eased * target)}${suffix}`);
        if (progress < 1) rafRef.current = requestAnimationFrame(frame);
      };
      rafRef.current = requestAnimationFrame(frame);
    };

    // IntersectionObserver fires for any kind of scroll (snap, anchor jumps,
    // programmatic restores) and on first observe if the figure is already
    // in view — unlike a window scroll listener.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          startAnimation();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, suffix]);

  return { ref: containerRef, displayValue };
}
