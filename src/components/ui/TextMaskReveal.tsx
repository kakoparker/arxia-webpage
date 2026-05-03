"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

interface TextMaskRevealProps {
  text: string;
  /** Gradient fill applied inside the revealed text */
  gradient?: string;
  /** Defaults to an Inter-like bold display face */
  className?: string;
  as?: "h2" | "h3" | "p";
}

/**
 * Large headline that starts outlined and fills with a gradient as the user
 * scrolls past it. Adapted from cinematic-site-components M01 "Text Mask
 * Reveal". Two stacked spans: outline (always visible) and filled (clip-path
 * animated from inset(100% 0 0 0) to inset(0%)).
 */
export function TextMaskReveal({
  text,
  gradient = "linear-gradient(135deg, var(--accent-red) 0%, var(--blueprint-blue) 100%)",
  className = "",
  as: Tag = "h2",
}: TextMaskRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const filledRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !filledRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      gsap.set(filledRef.current, { clipPath: "inset(0% 0 0 0)" });
      return;
    }

    gsap.set(filledRef.current, { clipPath: "inset(100% 0 0 0)" });
    const tw = gsap.to(filledRef.current, {
      clipPath: "inset(0% 0 0 0)",
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 85%",
        end: "top 35%",
        scrub: 0.5,
      },
    });

    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    fontFamily: "var(--font-primary)",
    fontWeight: 700,
    fontSize: "clamp(48px, 7vw, 96px)",
    lineHeight: 1.05,
    letterSpacing: "-1.5px",
  };

  return (
    <div ref={wrapperRef} className={`relative inline-block ${className}`}>
      <Tag
        aria-hidden
        className="m-0"
        style={{
          ...baseStyle,
          color: "transparent",
          WebkitTextStroke: "1px var(--gray-medium)",
        }}
      >
        {text}
      </Tag>
      <span
        ref={filledRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          ...baseStyle,
          backgroundImage: gradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          display: "inline-block",
        }}
      >
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </div>
  );
}
