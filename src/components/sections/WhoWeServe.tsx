"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { IconBox } from "@/components/ui/IconBox";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTextScramble } from "@/hooks/useTextScramble";
import { audiences } from "@/data/who-we-serve";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

export function WhoWeServe() {
  const scrollRef = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Text scramble for the heading — controlled by active card index
  const { displayText: headingText } = useTextScramble({
    texts: audiences.map((a) => a.audience),
    activeIndex: activeIndex,
    scrambleDuration: 600,
    holdDuration: 99999,
    startResolved: true,
  });

  // ScrollTrigger for each card (desktop only)
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  return (
    <SectionContainer mode="dark" id="who-we-serve" showCornerMarks>
      <div ref={scrollRef}>
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-12 lg:gap-16">
          {/* Left column — sticky on desktop */}
          <div
            className="lg:self-start"
            style={isMobile ? {} : { position: "sticky", top: "120px" }}
          >
            <div
              data-animate
              data-animate-index="0"
              className="animate-on-scroll"
            >
              {/* Annotation */}
              <p
                className="font-normal uppercase mb-4 text-accent-red/85"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                  lineHeight: "1.2",
                }}
              >
                Who We Serve
              </p>

              {/* Heading with scramble */}
              <h2
                className="font-bold mb-4 text-white"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(26px, 3vw, 36px)",
                  lineHeight: "1.2",
                  letterSpacing: "-0.5px",
                }}
              >
                Building Digital Independence
              </h2>

              {/* Accent line */}
              <div className="h-[3px] w-12 bg-accent-red mb-6" />

              {/* Body text */}
              <p
                className="text-gray-medium font-normal"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "18px",
                  lineHeight: "1.8",
                  maxWidth: "var(--content-narrow)",
                }}
              >
                Three audiences. One mission. Technology that serves people.
              </p>

              {/* Active counter — desktop only */}
              {!isMobile && (
                <div className="mt-10 flex items-baseline gap-3">
                  <span
                    className="text-accent-red font-bold tracking-[-1px]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "42px",
                      lineHeight: "1",
                    }}
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-gray-medium/50"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "14px",
                    }}
                  >
                    / 03
                  </span>
                  <span
                    className="text-white/70 ml-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {headingText}
                  </span>
                </div>
              )}

              {/* CTA link — appears after scrolling through all */}
              {!isMobile && activeIndex === audiences.length - 1 && (
                <a
                  href="#expertise"
                  className="mt-6 inline-flex items-center transition-colors duration-200 text-accent-red/85 hover:text-accent-red"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  Explore Our Domains →
                </a>
              )}
            </div>
          </div>

          {/* Right column — scrolling cards */}
          <div className="flex flex-col gap-8">
            {audiences.map((audience, i) => (
              <div
                key={audience.id}
                ref={setCardRef(i)}
                data-animate
                data-animate-index={i + 1}
                className="animate-on-scroll"
              >
                <div
                  className={`
                    border-l-[3px] border-l-accent-red
                    border border-white/[0.06]
                    p-7 lg:p-8
                    transition-all duration-300
                    ${
                      !isMobile && activeIndex === i
                        ? "bg-white/[0.04] border-white/[0.1]"
                        : "bg-white/[0.02]"
                    }
                  `}
                >
                  {/* Icon */}
                  <div className="mb-5">
                    <div className="inline-flex items-center justify-center w-11 h-11 border border-white/[0.12]">
                      <audience.icon
                        size={22}
                        strokeWidth={1.5}
                        className="text-white/60"
                      />
                    </div>
                  </div>

                  {/* Audience tag */}
                  <span
                    className="inline-block mb-4 px-2 py-0.5 border border-white/[0.1] bg-white/[0.04] text-gray-medium uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {audience.audience}
                  </span>

                  {/* Promise statement */}
                  <h3
                    className="text-white font-semibold mb-4"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "20px",
                      lineHeight: "1.4",
                    }}
                  >
                    {audience.promise}
                  </h3>

                  {/* Supporting body */}
                  <p
                    className="text-gray-medium mb-5"
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    {audience.body}
                  </p>

                  {/* Domain link dots */}
                  <div className="flex flex-wrap gap-4">
                    {audience.domainLinks.map((link) => (
                      <a
                        key={link.slug}
                        href={`#expertise`}
                        className="inline-flex items-center gap-2 text-accent-red/85 hover:text-accent-red transition-colors duration-200"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                        }}
                      >
                        <span className="w-[6px] h-[6px] bg-accent-red rounded-full inline-block" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
