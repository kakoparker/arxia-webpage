"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { clientLogos } from "@/data/clients";
import { ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

export function LogoCarousel() {
  const logos = [...clientLogos, ...clientLogos];
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

    // Small delay to ensure DOM is ready
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

  // Manual RAF loop (bypasses useAnimationFrame to avoid any issues)
  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const baseSpeed = 0.8;
    const velocityBoost = velocityRef.current * 0.00015;
    const targetSpeed = isPausedRef.current ? 0.05 : baseSpeed + velocityBoost;

    // Lerp toward target speed
    currentSpeedRef.current +=
      (targetSpeed - currentSpeedRef.current) * 0.08;

    offsetRef.current -= currentSpeedRef.current;

    // Decay velocity over time
    velocityRef.current *= 0.95;

    // Seamless loop: reset when past half track width
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
    >
      <div
        ref={trackRef}
        className="flex items-center gap-16 w-max"
      >
        {logos.map((logo, i) => (
          <div key={`${logo.alt}-${i}`} className="flex-shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
