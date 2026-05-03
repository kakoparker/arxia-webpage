"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { Button } from "@/components/ui/Button";
import {
  BlueprintGridSVG,
  type BlueprintGridSVGHandle,
} from "@/components/ui/BlueprintGridSVG";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const scrollGridRef = useRef<BlueprintGridSVGHandle>(null);
  const revealGridRef = useRef<BlueprintGridSVGHandle>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Refs for GSAP targets
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const mobileScrollRef = useScrollAnimation();
  const isHovering = useMousePosition(sectionRef);

  // Detect mobile. Kill ScrollTriggers synchronously before flipping,
  // otherwise GSAP's pin-spacer leaves the DOM out of sync with React
  // and unmounting throws "removeChild: not a child of this node".
  useEffect(() => {
    const check = () => {
      const next = window.innerWidth < 640;
      setIsMobile((prev) => {
        if (prev !== next) {
          ScrollTrigger.getAll().forEach((st) => {
            const trigger = st.trigger as Node | undefined;
            if (trigger && sectionRef.current?.parentNode?.contains(trigger)) {
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

  // Grid drift animation — desktop only (mobile doesn't render the grids).
  // Reveal grid only updates while hovering (it's at opacity:0 otherwise).
  useAnimationFrame(() => {
    if (isMobile) return;
    offsetRef.current.x = (offsetRef.current.x + 0.042) % 100;
    offsetRef.current.y = (offsetRef.current.y + 0.042) % 100;
    const { x, y } = offsetRef.current;
    scrollGridRef.current?.setOffset(x, y);
    if (isHovering) revealGridRef.current?.setOffset(x, y);
  });

  // GSAP: curtain reveal + content fade-in (desktop only)
  useGSAP(() => {
    if (isMobile) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Show content immediately, hide curtains
      if (leftCurtainRef.current) leftCurtainRef.current.style.display = "none";
      if (rightCurtainRef.current) rightCurtainRef.current.style.display = "none";
      if (seamRef.current) seamRef.current.style.display = "none";
      if (headingRef.current) {
        headingRef.current.style.opacity = "1";
        headingRef.current.style.transform = "translateY(0)";
      }
      if (accentLineRef.current) accentLineRef.current.style.width = "48px";
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = "1";
        subtitleRef.current.style.transform = "translateY(0)";
      }
      if (ctaRef.current) {
        ctaRef.current.style.opacity = "1";
        ctaRef.current.style.transform = "translateY(0)";
      }
      return;
    }

    const wrapper = pinWrapperRef.current;
    if (!wrapper) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
      },
    });

      // Curtains slide apart (0% → 60%)
      tl.to(
        leftCurtainRef.current,
        { xPercent: -100, ease: "power2.inOut", duration: 60 },
        0
      );
      tl.to(
        rightCurtainRef.current,
        { xPercent: 100, ease: "power2.inOut", duration: 60 },
        0
      );

      // Center seam fades immediately (0% → 5%)
      tl.to(seamRef.current, { opacity: 0, duration: 5, ease: "none" }, 0);

      // Heading fades in (20% → 40%)
      tl.to(
        headingRef.current,
        { opacity: 1, y: 0, ease: "power1.out", duration: 20 },
        20
      );

      // Accent line draws in (40% → 50%)
      tl.to(
        accentLineRef.current,
        { width: 48, ease: "power1.out", duration: 10 },
        40
      );

      // Subtitle fades in (35% → 50%)
      tl.to(
        subtitleRef.current,
        { opacity: 1, y: 0, ease: "power1.out", duration: 15 },
        35
      );

    // CTA fades in (50% → 60%)
    tl.to(
      ctaRef.current,
      { opacity: 1, y: 0, ease: "power1.out", duration: 10 },
      50
    );
  }, { dependencies: [isMobile] });

  // ─── Mobile: simple layout, no curtains ───────────────────────
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="hero-grid-bg relative min-h-[85vh] flex items-center justify-center px-6 pt-14 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none z-30">
          <div
            className="absolute rounded-full blur-[120px]"
            style={{
              right: "-10%",
              top: "-15%",
              width: "35%",
              height: "35%",
              background: "rgba(22, 32, 54, 0.35)",
            }}
          />
        </div>

        <div
          className="relative z-40 mx-auto w-full flex flex-col items-center text-center"
          ref={mobileScrollRef}
        >
          <h1
            data-animate
            data-animate-index="0"
            className="animate-on-scroll font-light leading-[1.1] tracking-[-1.5px] text-white w-full"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(36px, 5vw, 72px)",
            }}
          >
            <span className="block">Technology</span>
            <span className="block">{" "}to transform nations</span>
          </h1>

          <div
            data-animate
            data-animate-index="1"
            className="animate-on-scroll h-[3px] w-12 bg-accent-red mt-8 mb-6"
          />

          <p
            data-animate
            data-animate-index="2"
            className="animate-on-scroll text-gray-light font-normal text-center mx-auto"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "16px",
              lineHeight: "1.7",
              maxWidth: "640px",
            }}
          >
            Empowering governments, industries and ecosystems to build their
            digital future
          </p>

          <div
            data-animate
            data-animate-index="3"
            className="animate-on-scroll mt-8"
          >
            <Button
              variant="primary"
              href="#contact"
              className="!px-5 !py-1.5 !min-h-0 !text-[13px] !bg-accent-red hover:!bg-[#c8161d]"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // ─── Desktop: curtain reveal ──────────────────────────────────
  return (
    <div ref={pinWrapperRef}>
      <section
        ref={sectionRef}
        className="hero-grid-bg relative min-h-screen flex items-center justify-center px-[var(--margin-page)] overflow-hidden"
      >
        {/* z-10: Auto-scrolling grid — subtle ambient drift */}
        <div className="absolute inset-0 z-10">
          <BlueprintGridSVG
            ref={scrollGridRef}
            minorOpacity={0.03}
            majorOpacity={0.06}
          />
        </div>

        {/* z-20: Mouse-reveal grid — brighter, masked to cursor */}
        <div
          className="absolute inset-0 z-20 transition-opacity duration-500"
          style={{
            opacity: isHovering ? 1 : 0,
            maskImage:
              "radial-gradient(circle 300px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle 300px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)",
          }}
        >
          <BlueprintGridSVG
            ref={revealGridRef}
            minorOpacity={0.12}
            majorOpacity={0.22}
          />
        </div>

        {/* z-30: Ambient glows */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <div
            className="absolute rounded-full blur-[120px]"
            style={{
              right: "-10%",
              top: "-15%",
              width: "35%",
              height: "35%",
              background: "rgba(22, 32, 54, 0.35)",
            }}
          />
          <div
            className="absolute rounded-full blur-[100px]"
            style={{
              left: "-5%",
              bottom: "-10%",
              width: "18%",
              height: "18%",
              background: "rgba(237, 28, 36, 0.03)",
            }}
          />
        </div>

        {/* z-40: Revealed content — behind the curtains */}
        <div className="relative z-40 mx-auto max-w-[var(--content-max)] w-full flex flex-col items-center text-center">
          <h1
            ref={headingRef}
            className="font-light leading-[1.1] tracking-[-1.5px] text-white w-full"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(36px, 5vw, 72px)",
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            <span className="block">Technology</span>
            <span className="block">{" "}to transform nations</span>
          </h1>

          <div
            ref={accentLineRef}
            className="h-[3px] bg-accent-red mt-8 mb-6"
            style={{ width: 0 }}
          />

          <p
            ref={subtitleRef}
            className="text-gray-light font-normal text-center mx-auto"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              lineHeight: "1.7",
              maxWidth: "640px",
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            Empowering governments, industries and ecosystems to build their
            digital future
          </p>

          <div
            ref={ctaRef}
            className="mt-8"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <Button
              variant="primary"
              href="#contact"
              className="!px-5 !py-1.5 !min-h-0 !text-[13px] !bg-accent-red hover:!bg-[#c8161d]"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* z-50: Curtain panels */}
        <div
          ref={leftCurtainRef}
          className="absolute top-0 bottom-0 left-0 z-50 flex items-center justify-end"
          style={{
            width: "50%",
            background: "var(--blueprint-dark)",
            boxShadow: "inset -4px 0 20px rgba(0,0,0,0.3)",
            paddingRight: "clamp(20px, 4vw, 60px)",
          }}
          aria-hidden="true"
        >
          <span
            className="uppercase select-none"
            style={{
              fontFamily: "var(--font-primary)",
              fontWeight: 200,
              fontSize: "clamp(48px, 8vw, 120px)",
              color: "rgba(255, 255, 255, 0.07)",
              letterSpacing: "0.15em",
              lineHeight: 1,
            }}
          >
            OPEN
          </span>
        </div>

        <div
          ref={rightCurtainRef}
          className="absolute top-0 bottom-0 right-0 z-50 flex items-center justify-start"
          style={{
            width: "50%",
            background: "var(--blueprint-dark)",
            boxShadow: "inset 4px 0 20px rgba(0,0,0,0.3)",
            paddingLeft: "clamp(20px, 4vw, 60px)",
          }}
          aria-hidden="true"
        >
          <span
            className="uppercase select-none"
            style={{
              fontFamily: "var(--font-primary)",
              fontWeight: 200,
              fontSize: "clamp(48px, 8vw, 120px)",
              color: "rgba(255, 255, 255, 0.07)",
              letterSpacing: "0.15em",
              lineHeight: 1,
            }}
          >
            MIND
          </span>
        </div>

        {/* Center seam — thin red hint between the panels */}
        <div
          ref={seamRef}
          className="absolute top-0 bottom-0 z-50 pointer-events-none"
          style={{
            left: "50%",
            width: "1px",
            background: "rgba(237, 28, 36, 0.2)",
            transform: "translateX(-50%)",
          }}
          aria-hidden="true"
        />

        {/* Corner marks removed — curtains frame the space */}
      </section>
    </div>
  );
}
