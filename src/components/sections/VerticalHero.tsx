"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { BlueprintGridSVG } from "@/components/ui/BlueprintGridSVG";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { ArxiaVertical } from "@/data/domains";

/**
 * Compact cinematic hero for vertical deep routes (/govtech, /industries).
 * A lighter variant of the homepage Hero — no curtain reveal — that still
 * feels branded: blueprint-grid, corner marks, vertical-specific annotation
 * and color tone.
 */
interface VerticalHeroProps {
  vertical: ArxiaVertical;
}

export function VerticalHero({ vertical }: VerticalHeroProps) {
  const Icon = vertical.icon;
  const animRef = useScrollAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // trigger entry anims immediately for above-the-fold content
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll("[data-animate]");
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 80 + i * 90);
    });
  }, []);

  const isGovtech = vertical.slug === "govtech";
  const accentStyle = isGovtech
    ? "bg-white/30"
    : "bg-accent-red";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden blueprint-grid-dark"
      style={{ paddingTop: "140px", paddingBottom: "100px" }}
    >
      <BlueprintGridSVG />
      <CornerMarks mode="dark" />

      <div
        ref={animRef}
        className="mx-auto relative"
        style={{
          maxWidth: "var(--content-max)",
          paddingLeft: "max(10%, 24px)",
          paddingRight: "max(10%, 24px)",
        }}
      >
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-6"
        >
          <div className="inline-flex items-center gap-4">
            <div
              className="inline-flex items-center justify-center w-14 h-14 border border-white/30"
              aria-hidden
            >
              <Icon size={28} strokeWidth={1.5} className="text-white" />
            </div>
            <p
              className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85"
            >
              {vertical.shortName} · Data · Process · Intelligence
            </p>
          </div>
        </div>

        <div
          data-animate
          data-animate-index="1"
          className="animate-on-scroll"
        >
          <h1
            className="font-light text-white"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(48px, 7vw, 92px)",
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              marginBottom: "24px",
            }}
          >
            {vertical.name}
          </h1>
        </div>

        <div
          data-animate
          data-animate-index="2"
          className="animate-on-scroll"
        >
          <div className={`h-[3px] w-12 ${accentStyle} mb-6`} />
        </div>

        <div
          data-animate
          data-animate-index="3"
          className="animate-on-scroll"
        >
          <p
            className="text-gray-medium mb-4"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "20px",
              lineHeight: 1.6,
              maxWidth: "var(--content-narrow)",
            }}
          >
            {vertical.tagline}
          </p>
        </div>

        <div
          data-animate
          data-animate-index="4"
          className="animate-on-scroll"
        >
          <p
            className="text-gray-medium mb-10"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "17px",
              lineHeight: 1.75,
              maxWidth: "var(--content-narrow)",
            }}
          >
            {vertical.body}
          </p>
        </div>

        <div
          data-animate
          data-animate-index="5"
          className="animate-on-scroll flex flex-wrap gap-4"
        >
          <Button href="#domains" variant="primary">
            Explore the three domains →
          </Button>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center font-[family-name:var(--font-inter)] font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 border border-white/40 text-white hover:bg-white hover:text-blueprint-blue transition-colors"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
