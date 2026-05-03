"use client";

import { useRef, useEffect, useCallback, type ReactNode } from "react";
import { ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

/**
 * Client-only animation shell for the logo carousel. Receives the
 * server-rendered list of logos as children and wraps them in the
 * <section>/<track> elements that need refs and event handlers.
 */
export function LogoCarouselTrack({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const currentSpeedRef = useRef(0.8);
  const isPausedRef = useRef(false);
  const rafRef = useRef(0);

  // Track scroll velocity via ScrollTrigger on the full page
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const timer = setTimeout(() => {
      const st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          velocityRef.current = Math.abs(self.getVelocity());
        },
      });

      return () => st.kill();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const baseSpeed = 0.8;
    const velocityBoost = velocityRef.current * 0.00015;
    const targetSpeed = isPausedRef.current ? 0.05 : baseSpeed + velocityBoost;

    currentSpeedRef.current +=
      (targetSpeed - currentSpeedRef.current) * 0.08;

    offsetRef.current -= currentSpeedRef.current;
    velocityRef.current *= 0.95;

    const halfWidth = track.scrollWidth / 2;
    if (halfWidth > 0 && Math.abs(offsetRef.current) >= halfWidth) {
      offsetRef.current += halfWidth;
    }

    track.style.transform = `translateX(${offsetRef.current}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <section
      ref={sectionRef}
      className="blueprint-grid-light py-12 overflow-hidden"
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      aria-label="Featured client logos"
    >
      <div ref={trackRef} className="flex items-center gap-16 w-max">
        {children}
      </div>
    </section>
  );
}
