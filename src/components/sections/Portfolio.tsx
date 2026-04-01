"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";
import { featuredProjects } from "@/data/portfolio";

export function Portfolio() {
  const headerRef = useScrollAnimation();
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP: scale down and dim previous cards as user scrolls
  useEffect(() => {
    if (!isDesktop || !sectionRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const triggers: ScrollTrigger[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card || i === cardRefs.current.length - 1) return;

      // When the NEXT card enters, scale/dim this card
      const nextCard = cardRefs.current[i + 1];
      if (!nextCard) return;

      const st = ScrollTrigger.create({
        trigger: nextCard,
        start: "top 40%",
        end: "top 15%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const scale = 1 - p * 0.04;
          const opacity = 1 - p * 1;
          card.style.transform = `scale(${scale})`;
          card.style.opacity = `${Math.max(0, opacity)}`;
        },
      });
      triggers.push(st);
    });

    return () => triggers.forEach((st) => st.kill());
  }, [isDesktop]);

  if (!isDesktop) {
    return <MobilePortfolio headerRef={headerRef} />;
  }

  return (
    <section
      ref={sectionRef}
      className="blueprint-grid-light relative"
      id="portfolio"
      style={{
        paddingLeft: "max(10%, 24px)",
        paddingRight: "max(10%, 24px)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "var(--content-max)" }}
        ref={headerRef}
      >
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-16"
        >
          <SectionHeader
            annotation="Portfolio"
            heading="Explore Our Experience"
            body="Selected projects that define what we do"
          />
        </div>

        {/* Sticky card stack */}
        <div
          style={{
            minHeight: `${featuredProjects.length * 35}vh`,
            position: "relative",
          }}
        >
          {featuredProjects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="sticky mx-auto"
              style={{
                top: `${80 + i * 20}px`,
                maxWidth: "800px",
                marginBottom: "24px",
                transformOrigin: "center top",
              }}
            >
              <div
                className="bg-white border border-gray-light p-7 lg:p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
                style={{
                  boxShadow: "0 -8px 30px rgba(255,255,255,0.95), 0 2px 12px rgba(22,32,54,0.04)",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                  {/* Left: content */}
                  <div className="flex-1">
                    <Tag>{project.categoryLabel}</Tag>
                    <h3
                      className="text-blueprint-blue font-semibold mt-3 mb-2"
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "20px",
                        lineHeight: "1.3",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-gray-dark"
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "14px",
                        lineHeight: "1.6",
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Right: metadata */}
                  <div className="mt-4 md:mt-0 md:w-48 flex-shrink-0 md:text-right">
                    <p
                      className="text-gray-medium"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        letterSpacing: "1px",
                        lineHeight: "1.8",
                      }}
                    >
                      {project.client}
                    </p>
                    <p
                      className="text-gray-medium/60 mt-1"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.country} · {project.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio">
            <Button variant="primary">View Full Portfolio →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Mobile fallback: standard grid ──────────────────────────── */

function MobilePortfolio({
  headerRef,
}: {
  headerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section
      className="blueprint-grid-light"
      id="portfolio"
      style={{
        paddingTop: "100px",
        paddingBottom: "100px",
        paddingLeft: "max(10%, 24px)",
        paddingRight: "max(10%, 24px)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--content-max)" }} ref={headerRef}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-16"
        >
          <SectionHeader
            annotation="Portfolio"
            heading="Explore Our Experience"
            body="Selected projects that define what we do"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featuredProjects.map((project, i) => (
            <div
              key={project.title}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <div className="bg-white border border-gray-light p-6 h-full flex flex-col">
                <Tag>{project.categoryLabel}</Tag>
                <h3
                  className="text-blueprint-blue font-semibold mt-3 mb-2"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "16px",
                    lineHeight: "1.3",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-gray-dark flex-1"
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {project.description}
                </p>
                <p
                  className="mt-3 text-gray-medium"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "1px",
                  }}
                >
                  {project.client}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/portfolio">
            <Button variant="primary">View Full Portfolio →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
