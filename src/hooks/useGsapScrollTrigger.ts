"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface UseGsapScrollTriggerOptions {
  trigger: RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
  /** Set to false to disable the trigger (e.g. on mobile) */
  enabled?: boolean;
}

export function useGsapScrollTrigger({
  trigger,
  start = "top 85%",
  end = "bottom 15%",
  scrub = false,
  pin = false,
  once = false,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
  onUpdate,
  enabled = true,
}: UseGsapScrollTriggerOptions): void {
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!enabled || !trigger.current) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    stRef.current = ScrollTrigger.create({
      trigger: trigger.current,
      start,
      end,
      scrub,
      pin,
      once,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
      onUpdate,
    });

    return () => {
      stRef.current?.kill();
      stRef.current = null;
    };
  }, [trigger, start, end, scrub, pin, once, onEnter, onLeave, onEnterBack, onLeaveBack, onUpdate, enabled]);
}

/** Re-export for convenience so consumers don't need to import gsap separately */
export { gsap, ScrollTrigger };
