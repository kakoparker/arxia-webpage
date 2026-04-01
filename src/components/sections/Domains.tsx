"use client";

import { useState, useEffect } from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { domains } from "@/data/domains";

type LayoutMode = "desktop" | "tablet" | "mobile";

export function Domains() {
  const ref = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [layout, setLayout] = useState<LayoutMode>("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setLayout("mobile");
      else if (w < 1024) setLayout("tablet");
      else setLayout("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <SectionContainer mode="ultra-light" id="expertise">
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-16"
        >
          <SectionHeader
            annotation="What We Do"
            heading="Our Domains of Expertise"
          />
        </div>

        {/* Desktop: Horizontal accordion */}
        {layout === "desktop" && (
          <DesktopAccordion
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        )}

        {/* Tablet: 2-column grid */}
        {layout === "tablet" && (
          <TabletGrid
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        )}

        {/* Mobile: Vertical accordion */}
        {layout === "mobile" && (
          <MobileAccordion
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        )}
      </div>
    </SectionContainer>
  );
}

/* ─── Desktop: Horizontal Accordion ─────────────────────────── */

function DesktopAccordion({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  return (
    <div
      className="flex gap-0 w-full"
      style={{ minHeight: "480px" }}
      data-animate
      data-animate-index="1"
    >
      {domains.map((domain, i) => {
        const isActive = activeIndex === i;
        const Icon = domain.icon;

        return (
          <button
            key={domain.slug}
            onClick={() => setActiveIndex(i)}
            onMouseEnter={() => setActiveIndex(i)}
            className="relative overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue"
            style={{
              flex: isActive ? 5 : 1,
              transition: "flex 500ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              borderLeft: "1px solid var(--gray-light)",
              borderRight: i === domains.length - 1 ? "1px solid var(--gray-light)" : "none",
            }}
            aria-expanded={isActive}
            aria-label={domain.title}
          >
            {/* Collapsed state: rotated label */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-3"
              style={{
                opacity: isActive ? 0 : 1,
                transition: "opacity 200ms ease",
                pointerEvents: isActive ? "none" : "auto",
              }}
            >
              <Icon
                size={32}
                strokeWidth={1.5}
                className="text-blueprint-blue/50"
              />
              <span
                className="text-blueprint-blue/60 whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  writingMode: "vertical-lr",
                  transform: "rotate(180deg)",
                }}
              >
                {domain.title}
              </span>
            </div>

            {/* Expanded state: full content */}
            <div
              className="h-full flex flex-col justify-center px-8 py-8"
              style={{
                opacity: isActive ? 1 : 0,
                transition: "opacity 300ms ease 150ms",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 border border-gray-light mb-5"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(8px)",
                  transition:
                    "opacity 300ms ease 100ms, transform 300ms ease 100ms",
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-blueprint-blue"
                />
              </div>

              <h3
                className="text-blueprint-blue font-semibold mb-3"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "16px",
                  lineHeight: "1.3",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(10px)",
                  transition:
                    "opacity 300ms ease 150ms, transform 300ms ease 150ms",
                }}
              >
                {domain.title}
              </h3>

              <p
                className="text-gray-dark mb-5"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  maxWidth: "480px",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(10px)",
                  transition:
                    "opacity 300ms ease 200ms, transform 300ms ease 200ms",
                }}
              >
                {domain.description}
              </p>

              <a
                href={`/portfolio?domain=${domain.slug}`}
                className="text-accent-red/85 hover:text-accent-red transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(10px)",
                  transition:
                    "opacity 300ms ease 250ms, transform 300ms ease 250ms, color 200ms ease",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Explore {domain.title.split(" ")[0]} →
              </a>
            </div>

            {/* Bottom accent line for active panel */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent-red"
              style={{
                transform: isActive ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ─── Tablet: 2-Column Grid ─────────────────────────────────── */

function TabletGrid({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {domains.map((domain, i) => {
        const isActive = activeIndex === i;
        const Icon = domain.icon;

        return (
          <button
            key={domain.slug}
            onClick={() => setActiveIndex(isActive ? -1 : i)}
            className="text-left border border-gray-light p-6 cursor-pointer transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue"
            style={{
              borderLeftWidth: isActive ? "3px" : "1px",
              borderLeftColor: isActive
                ? "var(--accent-red)"
                : "var(--gray-light)",
              boxShadow: isActive ? "var(--shadow-card-hover)" : "none",
            }}
            data-animate
            data-animate-index={i + 1}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon
                size={20}
                strokeWidth={1.5}
                className="text-blueprint-blue flex-shrink-0"
              />
              <h3
                className="text-blueprint-blue font-semibold"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "15px",
                  lineHeight: "1.3",
                }}
              >
                {domain.title}
              </h3>
            </div>

            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isActive ? "200px" : "0",
                opacity: isActive ? 1 : 0,
              }}
            >
              <p
                className="text-gray-dark"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                {domain.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Mobile: Vertical Accordion ────────────────────────────── */

function MobileAccordion({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  return (
    <div className="flex flex-col gap-0">
      {domains.map((domain, i) => {
        const isActive = activeIndex === i;
        const Icon = domain.icon;

        return (
          <button
            key={domain.slug}
            onClick={() => setActiveIndex(isActive ? -1 : i)}
            className="text-left border-b border-gray-light cursor-pointer transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-blue"
            style={{
              borderLeftWidth: "3px",
              borderLeftColor: isActive
                ? "var(--accent-red)"
                : "transparent",
              borderLeftStyle: "solid",
            }}
            aria-expanded={isActive}
            data-animate
            data-animate-index={i + 1}
          >
            {/* Header row — always visible */}
            <div
              className="flex items-center gap-3 px-4"
              style={{ minHeight: "60px" }}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                className="text-blueprint-blue flex-shrink-0"
              />
              <h3
                className="text-blueprint-blue font-semibold flex-1"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "15px",
                  lineHeight: "1.3",
                }}
              >
                {domain.title}
              </h3>
              <span
                className="text-gray-medium transition-transform duration-300"
                style={{
                  transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                  fontSize: "18px",
                }}
              >
                ▾
              </span>
            </div>

            {/* Expanded content */}
            <div
              className="overflow-hidden transition-all duration-300 ease-[var(--ease-default)]"
              style={{
                maxHeight: isActive ? "240px" : "0",
                opacity: isActive ? 1 : 0,
              }}
            >
              <div className="px-4 pb-5">
                <p
                  className="text-gray-dark mb-3"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {domain.description}
                </p>
                <a
                  className="text-accent-red/85 hover:text-accent-red transition-colors duration-200"
                  href={`/portfolio?domain=${domain.slug}`}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  Explore {domain.title.split(" ")[0]} →
                </a>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
