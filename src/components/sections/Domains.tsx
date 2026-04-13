"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTextScramble } from "@/hooks/useTextScramble";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";
import { verticals } from "@/data/domains";
import type { Vertical, SubDomain } from "@/data/domains";

export function Domains() {
  const headerRef = useScrollAnimation();

  return (
    <div id="expertise">
      {/* Section intro header */}
      <SectionContainer mode="ultra-light">
        <div ref={headerRef}>
          <div data-animate data-animate-index="0" className="animate-on-scroll">
            <SectionHeader
              annotation="What We Do"
              heading="Our Domains of Expertise"
              body="From strategy to implementation, these are the capabilities we bring to each vertical."
            />
          </div>
        </div>
      </SectionContainer>

      {/* 3 vertical chapters */}
      {verticals.map((vertical) => (
        <VerticalChapter key={vertical.id} vertical={vertical} />
      ))}
    </div>
  );
}

/* ─── Vertical Chapter ─────────────────────────────────────── */

function VerticalChapter({ vertical }: { vertical: Vertical }) {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useScrollAnimation();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isDark = vertical.mode === "dark";

  return (
    <SectionContainer mode={isDark ? "dark" : "light"}>
      <div ref={scrollRef}>
        {isMobile ? (
          <MobileChapter vertical={vertical} isDark={isDark} />
        ) : (
          <DesktopChapter vertical={vertical} isDark={isDark} />
        )}
      </div>
    </SectionContainer>
  );
}

/* ─── Desktop: Sticky Left + Scrolling Cards Right ─────────── */

function DesktopChapter({
  vertical,
  isDark,
}: {
  vertical: Vertical;
  isDark: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { displayText: activeSubDomainName } = useTextScramble({
    texts: vertical.subDomains.map((sd) => sd.title),
    activeIndex,
    scrambleDuration: 600,
    holdDuration: 99999,
    startResolved: true,
  });

  // ScrollTrigger per card
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const triggers: ScrollTrigger[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  const Icon = vertical.icon;
  const totalVerticals = verticals.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-12 lg:gap-16">
      {/* Sticky left column */}
      <div
        className="lg:self-start"
        style={{ position: "sticky", top: "120px" }}
      >
        <div data-animate data-animate-index="0" className="animate-on-scroll">
          {/* Chapter number */}
          <div className="flex items-baseline gap-3 mb-6">
            <span
              className="text-accent-red font-bold tracking-[-1px]"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "42px",
                lineHeight: "1",
              }}
            >
              {String(vertical.id).padStart(2, "0")}
            </span>
            <span
              className={isDark ? "text-gray-medium/50" : "text-gray-medium/50"}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
              }}
            >
              / {String(totalVerticals).padStart(2, "0")}
            </span>
          </div>

          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-11 h-11 border mb-5 ${
              isDark ? "border-white/[0.12]" : "border-gray-light"
            }`}
          >
            <Icon
              size={22}
              strokeWidth={1.5}
              className={isDark ? "text-white/60" : "text-blueprint-blue"}
            />
          </div>

          {/* Vertical name */}
          <h3
            className={`font-bold mb-4 ${isDark ? "text-white" : "text-blueprint-blue"}`}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(26px, 3vw, 36px)",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
            }}
          >
            {vertical.name}
          </h3>

          {/* Accent line */}
          <div className="h-[3px] w-12 bg-accent-red mb-6" />

          {/* Body text */}
          <p
            className={`font-normal mb-8 ${isDark ? "text-gray-medium" : "text-body-text"}`}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: isDark ? "18px" : "16px",
              lineHeight: isDark ? "1.8" : "1.7",
              maxWidth: "var(--content-narrow)",
            }}
          >
            {vertical.body}
          </p>

          {/* Active sub-domain indicator */}
          <div className="flex items-baseline gap-3">
            <span
              className="text-accent-red font-bold"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "16px",
                lineHeight: "1",
              }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span
              className={isDark ? "text-gray-medium/50" : "text-gray-medium/50"}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              }}
            >
              / {String(vertical.subDomains.length).padStart(2, "0")}
            </span>
            <span
              className={`ml-2 ${isDark ? "text-white/70" : "text-blueprint-blue/70"}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              {activeSubDomainName}
            </span>
          </div>
        </div>
      </div>

      {/* Scrolling right column — sub-domain cards */}
      <div className="flex flex-col gap-8">
        {vertical.subDomains.map((subDomain, i) => (
          <div
            key={subDomain.slug}
            ref={setCardRef(i)}
            data-animate
            data-animate-index={i + 1}
            className="animate-on-scroll"
          >
            <SubDomainCard
              subDomain={subDomain}
              isDark={isDark}
              isActive={activeIndex === i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile: Vertical Stack ───────────────────────────────── */

function MobileChapter({
  vertical,
  isDark,
}: {
  vertical: Vertical;
  isDark: boolean;
}) {
  const Icon = vertical.icon;

  return (
    <div>
      {/* Chapter header banner */}
      <div
        data-animate
        data-animate-index="0"
        className="animate-on-scroll mb-10"
      >
        <div className="flex items-baseline gap-3 mb-4">
          <span
            className="text-accent-red font-bold tracking-[-1px]"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "32px",
              lineHeight: "1",
            }}
          >
            {String(vertical.id).padStart(2, "0")}
          </span>
          <span
            className="text-gray-medium/50"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            }}
          >
            / {String(verticals.length).padStart(2, "0")}
          </span>
        </div>

        <div
          className={`inline-flex items-center justify-center w-10 h-10 border mb-4 ${
            isDark ? "border-white/[0.12]" : "border-gray-light"
          }`}
        >
          <Icon
            size={20}
            strokeWidth={1.5}
            className={isDark ? "text-white/60" : "text-blueprint-blue"}
          />
        </div>

        <h3
          className={`font-bold mb-3 ${isDark ? "text-white" : "text-blueprint-blue"}`}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(22px, 3vw, 30px)",
            lineHeight: "1.2",
            letterSpacing: "-0.5px",
          }}
        >
          {vertical.name}
        </h3>

        <div className="h-[3px] w-12 bg-accent-red mb-4" />

        <p
          className={`font-normal ${isDark ? "text-gray-medium" : "text-body-text"}`}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "15px",
            lineHeight: "1.7",
          }}
        >
          {vertical.body}
        </p>
      </div>

      {/* Sub-domain cards stacked */}
      <div className="flex flex-col gap-6">
        {vertical.subDomains.map((subDomain, i) => (
          <div
            key={subDomain.slug}
            data-animate
            data-animate-index={i + 1}
            className="animate-on-scroll"
          >
            <SubDomainCard subDomain={subDomain} isDark={isDark} isActive={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sub-Domain Card ──────────────────────────────────────── */

function SubDomainCard({
  subDomain,
  isDark,
  isActive,
}: {
  subDomain: SubDomain;
  isDark: boolean;
  isActive: boolean;
}) {
  const Icon = subDomain.icon;

  return (
    <div
      className={`
        border-l-[3px] border-l-accent-red
        p-7 lg:p-8
        transition-all duration-300
        ${
          isDark
            ? `border border-white/[0.06] ${
                isActive
                  ? "bg-white/[0.04] border-white/[0.1]"
                  : "bg-white/[0.02]"
              }`
            : `border border-gray-light ${
                isActive
                  ? "shadow-[var(--shadow-card-hover)] border-gray-dark/20"
                  : ""
              }`
        }
      `}
    >
      {/* Icon */}
      <div className="mb-5">
        <div
          className={`inline-flex items-center justify-center w-11 h-11 border ${
            isDark ? "border-white/[0.12]" : "border-gray-light"
          }`}
        >
          <Icon
            size={22}
            strokeWidth={1.5}
            className={isDark ? "text-white/60" : "text-blueprint-blue"}
          />
        </div>
      </div>

      {/* Title */}
      <h4
        className={`font-semibold mb-3 ${isDark ? "text-white" : "text-blueprint-blue"}`}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "16px",
          lineHeight: "1.3",
        }}
      >
        {subDomain.title}
      </h4>

      {/* Description */}
      <p
        className={`mb-5 ${isDark ? "text-gray-medium" : "text-gray-dark"}`}
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "14px",
          lineHeight: "1.7",
          maxWidth: "480px",
        }}
      >
        {subDomain.description}
      </p>

      {/* Link */}
      <a
        href={`/domains/${subDomain.slug}`}
        className="text-accent-red/85 hover:text-accent-red transition-colors duration-200"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Learn more →
      </a>
    </div>
  );
}
