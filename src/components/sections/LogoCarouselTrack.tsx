"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Pause, Play } from "lucide-react";

/**
 * Client-only animation shell for the logo carousel. Receives the
 * server-rendered logo list (plus its aria-hidden loop copy) as children.
 *
 * Motion rules (WCAG 2.2.2 Pause, Stop, Hide):
 *  - a visible Pause/Play control stops the marquee completely;
 *  - hovering or focusing inside the band slows it to a crawl;
 *  - it never runs under prefers-reduced-motion, while off-screen, or while
 *    the tab is hidden — no rAF loop burning frames nobody sees.
 *
 * Scroll velocity (the marquee speeds up as you scroll) is read from a
 * passive scroll listener; no animation library is needed for that.
 */
export function LogoCarouselTrack({ children }: { children: ReactNode }) {
  const t = useTranslations("LogoCarousel");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pausedRef = useRef(false);
  const slowRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || reducedMotion) return;

    let offset = 0;
    let speed = 0.8;
    let velocity = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf = 0;
    let onScreen = false;

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      velocity = Math.min(4000, (Math.abs(window.scrollY - lastY) / dt) * 1000);
      lastY = window.scrollY;
      lastT = now;
    };

    const frame = () => {
      const base = 0.8;
      const target = pausedRef.current ? 0 : slowRef.current ? 0.05 : base + velocity * 0.00015;
      speed += (target - speed) * 0.08;
      velocity *= 0.95;
      offset -= speed;
      const half = track.scrollWidth / 2;
      if (half > 0 && Math.abs(offset) >= half) offset += half;
      track.style.transform = `translateX(${offset}px)`;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(section);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="blueprint-grid-light relative py-12 overflow-hidden"
      onMouseEnter={() => (slowRef.current = true)}
      onMouseLeave={() => (slowRef.current = false)}
      onFocus={() => (slowRef.current = true)}
      onBlur={() => (slowRef.current = false)}
      aria-labelledby="logo-carousel-label"
    >
      {/* The band's name is for assistive tech only: on screen the logos
          speak for themselves, and a visible caption row opened a gap
          between the hero and the band. */}
      <p id="logo-carousel-label" className="sr-only">
        {t("label")}
      </p>
      <div ref={trackRef} className="flex items-center w-max">
        {children}
      </div>
      {/* WCAG 2.2.2: the pause control stays, floated over the band's right
          edge so it takes no height. The white fade lets the logos slide
          under it instead of colliding with it. */}
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center bg-gradient-to-l from-white from-60% to-transparent pl-12 pr-[max(24px,calc(var(--margin-page)/2))]">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? t("play") : t("pause")}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center border border-gray-light bg-white text-gray-dark transition-colors duration-200 hover:border-blueprint-blue hover:text-blueprint-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue"
          >
            {paused ? <Play aria-hidden size={16} strokeWidth={1.5} /> : <Pause aria-hidden size={16} strokeWidth={1.5} />}
          </button>
        </div>
      )}
    </section>
  );
}
