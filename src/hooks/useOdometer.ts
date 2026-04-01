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

export function useOdometer({
  target,
  duration = 1200,
  suffix = "",
}: UseOdometerOptions): OdometerResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(`0${suffix}`);
  const triggeredRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setDisplayValue(`${target}${suffix}`);
      return;
    }

    // Use a scroll listener that checks if element is in the top 80% of viewport
    const checkVisibility = () => {
      if (triggeredRef.current) return;

      const rect = el.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.85;

      if (rect.top < triggerPoint && rect.bottom > 0) {
        triggeredRef.current = true;
        window.removeEventListener("scroll", checkVisibility);
        startAnimation();
      }
    };

    let startTime: number | null = null;

    const startAnimation = () => {
      const frame = (now: number) => {
        if (startTime === null) startTime = now;

        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        setDisplayValue(`${current}${suffix}`);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          setDisplayValue(`${target}${suffix}`);
        }
      };

      rafRef.current = requestAnimationFrame(frame);
    };

    // Check immediately in case already visible
    checkVisibility();

    // Listen for scroll
    window.addEventListener("scroll", checkVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, suffix]);

  return { ref: containerRef, displayValue };
}
