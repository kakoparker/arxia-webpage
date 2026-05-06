"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  BlueprintGridSVG,
  type BlueprintGridSVGHandle,
} from "@/components/ui/BlueprintGridSVG";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollGridRef = useRef<BlueprintGridSVGHandle>(null);
  const revealGridRef = useRef<BlueprintGridSVGHandle>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const contentRef = useScrollAnimation();
  const isHovering = useMousePosition(sectionRef);

  // Grid drift — ambient + cursor-reveal grids share offset.
  useAnimationFrame(() => {
    offsetRef.current.x = (offsetRef.current.x + 0.042) % 100;
    offsetRef.current.y = (offsetRef.current.y + 0.042) % 100;
    const { x, y } = offsetRef.current;
    scrollGridRef.current?.setOffset(x, y);
    if (isHovering) revealGridRef.current?.setOffset(x, y);
  });

  return (
    <section
      ref={sectionRef}
      className="hero-grid-bg relative min-h-screen flex items-center justify-center px-[var(--margin-page)] overflow-hidden"
    >
      {/* z-10: Auto-scrolling grid — subtle ambient drift */}
      <div className="absolute inset-0 z-10 hidden sm:block">
        <BlueprintGridSVG
          ref={scrollGridRef}
          minorOpacity={0.03}
          majorOpacity={0.06}
        />
      </div>

      {/* z-20: Mouse-reveal grid — brighter, masked to cursor */}
      <div
        className="absolute inset-0 z-20 transition-opacity duration-500 hidden sm:block"
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

      {/* z-40: Content */}
      <div
        ref={contentRef}
        className="relative z-40 mx-auto max-w-[var(--content-max)] w-full flex flex-col items-center text-center"
      >
        <h1
          data-animate
          data-animate-index="0"
          className="animate-on-scroll font-bold leading-[1.1] tracking-[-0.5px] text-white w-full"
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
            fontSize: "clamp(16px, 1.8vw, 20px)",
            lineHeight: "1.7",
            maxWidth: "640px",
          }}
        >
          Empowering governments, industries and ecosystems to build their
          digital future
        </p>

        <div data-animate data-animate-index="3" className="animate-on-scroll mt-8">
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
