"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  BlueprintGridSVG,
  type BlueprintGridSVGHandle,
} from "@/components/ui/BlueprintGridSVG";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

gsap.registerPlugin(useGSAP);

export function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<BlueprintGridSVGHandle>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const contentRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const next = window.innerWidth < 640;
      setIsMobile((prev) => {
        if (prev !== next) {
          ScrollTrigger.getAll().forEach((st) => {
            const trigger = st.trigger as Node | undefined;
            if (
              trigger &&
              sectionRef.current?.parentNode?.contains(trigger)
            ) {
              st.kill();
            }
          });
        }
        return next;
      });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useAnimationFrame(() => {
    if (isMobile) return;
    offsetRef.current.x = (offsetRef.current.x + 0.042) % 100;
    offsetRef.current.y = (offsetRef.current.y + 0.042) % 100;
    gridRef.current?.setOffset(offsetRef.current.x, offsetRef.current.y);
  });

  // Doors START closed (covering the whole viewport, with the intro paragraph
  // on top of them). On scroll: paragraph fades, then the doors slide apart
  // left/right to reveal the Govtech | Industries split underneath. Same
  // mechanic as the original Hero curtain reveal.
  useGSAP(
    () => {
      if (isMobile) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const wrapper = pinWrapperRef.current;
      if (!wrapper) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
        },
      });

      // Phase A — Read (0–30): doors closed, paragraph visible on top.
      // Phase B — Fade copy (30–45): paragraph fades out.
      tl.to(
        contentRef.current,
        { opacity: 0, ease: "power1.in", duration: 15 },
        30
      );

      // Phase C — Doors part open (45–100): closed → fully off-screen left/right.
      tl.to(
        leftDoorRef.current,
        { xPercent: -100, ease: "power2.inOut", duration: 55 },
        45
      );
      tl.to(
        rightDoorRef.current,
        { xPercent: 100, ease: "power2.inOut", duration: 55 },
        45
      );
    },
    { dependencies: [isMobile] }
  );

  // ─── Mobile: static, no doors ───────────────────────────────
  if (isMobile) {
    return (
      <section
        id="intro"
        ref={sectionRef}
        className="relative min-h-[60vh] flex items-center justify-center px-6 py-20 overflow-hidden"
        style={{ background: "var(--blueprint-dark)" }}
      >
        <div className="relative z-40 mx-auto w-full flex flex-col items-center text-center max-w-[640px]">
          <span
            className="uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "2.5px",
              color: "var(--accent-red)",
            }}
          >
            Who We Are
          </span>
          <div className="h-[3px] w-12 bg-accent-red mt-4 mb-6" />
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "16px",
              lineHeight: "1.8",
              color: "var(--gray-medium)",
            }}
          >
            Arxia is a Digital Public Infrastructure and Digital Transformation
            company. Our team of expert consultants and engineers have developed
            digital projects all over the world, in partnership with international
            organizations and donors. Our goal is to transform the lives of people
            through impactful technology and capacity building.
          </p>
        </div>
      </section>
    );
  }

  // ─── Desktop: pinned, doors slide apart ─────────────────────
  return (
    <div ref={pinWrapperRef}>
      <section
        id="intro"
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden"
        style={{ background: "var(--blueprint-dark)" }}
      >
        {/* z-10: Govtech | Industries split — sits underneath everything,
            revealed when the doors slide apart. */}
        <div
          className="absolute inset-0 z-10 grid grid-cols-1 lg:grid-cols-2 pointer-events-none"
          aria-hidden="true"
        >
          {/* Left — Govtech (dark) */}
          <div className="blueprint-grid-blue relative">
            <div className="relative h-full flex flex-col justify-center items-start px-10 py-14 lg:px-16 lg:py-20 max-w-[560px]">
              <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-4">
                GOVTECH
              </p>
              <h2
                className="font-bold mb-4 text-white"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-1px",
                }}
              >
                Arxia Govtech
              </h2>
              <div className="bg-accent-red mb-5 h-[3px] w-12" />
              <p
                className="text-gray-medium mb-8"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "17px",
                  lineHeight: 1.6,
                }}
              >
                Digital public infrastructure for governments and international
                organizations
              </p>
              <span className="inline-flex items-center gap-3 px-5 py-2.5 font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.3px] border border-white/60 text-white">
                Explore Govtech
                <span aria-hidden>→</span>
              </span>
            </div>
          </div>

          {/* Right — Industries (light) */}
          <div className="blueprint-grid-light relative">
            <div className="relative h-full flex flex-col justify-center items-start px-10 py-14 lg:px-16 lg:py-20 max-w-[560px]">
              <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-4">
                INDUSTRIES
              </p>
              <h2
                className="font-bold mb-4 text-blueprint-blue"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-1px",
                }}
              >
                Arxia Industries
              </h2>
              <div className="bg-accent-red mb-5 h-[3px] w-12" />
              <p
                className="text-gray-dark mb-8"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "17px",
                  lineHeight: 1.6,
                }}
              >
                Enterprise transformation for mining, finance, retail,
                universities, and beyond
              </p>
              <span className="inline-flex items-center gap-3 px-5 py-2.5 font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.3px] border border-blueprint-blue bg-blueprint-blue text-white">
                Explore Industries
                <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </div>

        {/* z-30: Doors — start fully closed (covering the split). They slide
            apart on scroll to reveal the Govtech | Industries split. The blueprint
            grid drifts inside the closed doors so the surface feels alive. */}
        <div
          ref={leftDoorRef}
          className="absolute top-0 bottom-0 left-0 z-30 overflow-hidden"
          style={{
            width: "50%",
            background: "var(--blueprint-dark)",
            boxShadow: "inset -4px 0 20px rgba(0,0,0,0.3)",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0">
            <BlueprintGridSVG
              ref={gridRef}
              minorOpacity={0.03}
              majorOpacity={0.06}
            />
          </div>
        </div>

        <div
          ref={rightDoorRef}
          className="absolute top-0 bottom-0 right-0 z-30 overflow-hidden"
          style={{
            width: "50%",
            background: "var(--blueprint-dark)",
            boxShadow: "inset 4px 0 20px rgba(0,0,0,0.3)",
          }}
          aria-hidden="true"
        />

        {/* z-50: Intro copy — sits on top of the closed doors, fades out
            before they part open. */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-50 flex items-center justify-center px-[var(--margin-page)] pointer-events-none"
        >
          <div className="mx-auto w-full flex flex-col items-center text-center max-w-[720px]">
            <span
              className="uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "2.5px",
                color: "var(--accent-red)",
              }}
            >
              Who We Are
            </span>
            <div className="h-[3px] w-12 bg-accent-red mt-6 mb-8" />
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(18px, 1.6vw, 22px)",
                lineHeight: "1.8",
                color: "var(--gray-light)",
              }}
            >
              Arxia is a Digital Public Infrastructure and Digital Transformation
              company. Our team of expert consultants and engineers have developed
              digital projects all over the world, in partnership with international
              organizations and donors. Our goal is to transform the lives of people
              through impactful technology and capacity building.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
