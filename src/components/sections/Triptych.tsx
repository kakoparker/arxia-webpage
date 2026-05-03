"use client";

import { useEffect, useRef, useState } from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconBox } from "@/components/ui/IconBox";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";
import {
  verticalsBySlug,
  type ExpertiseDomain,
  type DomainSlug,
} from "@/data/domains";

/**
 * Three-column cinematic reveal of Arxia's shared operating model:
 * Data · Process · Intelligence. One card activates at a time as the user
 * scrolls through the section. Inspired by cinematic-site-components
 * M02 Sticky Stack Narrative + M01 Text Mask Reveal.
 *
 * The three domains shown are the shared names — we take them from Govtech
 * since the names, taglines, and descriptions are identical across
 * verticals at this level of abstraction.
 */

const SHARED_ANNOTATION = "The Architecture";
const SHARED_HEADING = "One operating model. Two audiences.";
const SHARED_BODY =
  "Everything Arxia ships for governments or for industries rests on three shared layers — Data, Process, and Intelligence. This is how we think, build, and deliver.";

const sharedDomains: ExpertiseDomain[] = verticalsBySlug.govtech.domains;

export function Triptych() {
  const headerRef = useScrollAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    if (window.innerWidth < 1024) return;

    const triggers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 40%",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} id="architecture">
      <SectionContainer mode="ultra-light">
        <div ref={headerRef}>
          <div
            data-animate
            data-animate-index="0"
            className="animate-on-scroll"
          >
            <SectionHeader
              annotation={SHARED_ANNOTATION}
              heading={SHARED_HEADING}
              body={SHARED_BODY}
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {sharedDomains.map((d, i) => (
            <div
              key={d.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <DomainCard
                domain={d}
                index={i}
                isActive={activeIndex === i}
              />
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}

function DomainCard({
  domain,
  index,
  isActive,
}: {
  domain: ExpertiseDomain;
  index: number;
  isActive: boolean;
}) {
  const Icon = domain.icon;
  return (
    <div
      className={`relative border p-8 lg:p-10 transition-all duration-500 ease-out ${
        isActive
          ? "border-accent-red/40 bg-white shadow-[var(--shadow-card-hover)] lg:-translate-y-1"
          : "border-gray-light bg-white/60 lg:opacity-70"
      }`}
      style={{ minHeight: "380px" }}
    >
      <p
        className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-gray-medium mb-6"
      >
        {`0${index + 1} / 03`}
      </p>

      <IconBox icon={Icon} size="lg" className="mb-6" />

      <h3
        className="font-semibold text-blueprint-blue mb-2"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "clamp(28px, 3vw, 36px)",
          lineHeight: 1.1,
          letterSpacing: "-0.5px",
        }}
      >
        {domain.name}
      </h3>

      <p
        className="font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[2px] text-accent-red/85 mb-4"
      >
        {domain.tagline}
      </p>

      <div
        className="h-[3px] bg-accent-red mb-6 transition-all duration-700"
        style={{ width: isActive ? "48px" : "24px" }}
      />

      <p
        className="text-body-text"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "15px",
          lineHeight: 1.7,
        }}
      >
        {domain.description}
      </p>
    </div>
  );
}
