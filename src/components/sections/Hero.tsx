"use client";

import { useRef } from "react";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { Button } from "@/components/ui/Button";
import {
  BlueprintGridSVG,
  type BlueprintGridSVGHandle,
} from "@/components/ui/BlueprintGridSVG";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { useMousePosition } from "@/hooks/useMousePosition";

const rotatingWords = [
  "Transformation",
  "Public Infrastructure",
  "Development",
  "Ecosystems",
  "Sovereignty",
  "Public Goods",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollGridRef = useRef<BlueprintGridSVGHandle>(null);
  const revealGridRef = useRef<BlueprintGridSVGHandle>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const isHovering = useMousePosition(sectionRef);

  useAnimationFrame(() => {
    offsetRef.current.x = (offsetRef.current.x + 0.042) % 100;
    offsetRef.current.y = (offsetRef.current.y + 0.042) % 100;
    const { x, y } = offsetRef.current;
    scrollGridRef.current?.setOffset(x, y);
    revealGridRef.current?.setOffset(x, y);
  });

  return (
    <section
      ref={sectionRef}
      className="hero-grid-bg relative min-h-[85vh] flex items-center justify-center px-[var(--margin-page)] max-sm:px-6 pt-14 overflow-hidden"
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
        className="absolute inset-0 z-20 hidden sm:block transition-opacity duration-500"
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
      <div className="absolute inset-0 pointer-events-none z-30 hidden sm:block">
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

      {/* z-40: Content — centered */}
      <div className="relative z-40 mx-auto max-w-[var(--content-max)] w-full flex flex-col items-center text-center">
        <CornerMarks mode="dark" />
        <h1
          className="font-light leading-[1.1] tracking-[-1.5px] text-white w-full"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(36px, 5vw, 72px)",
          }}
        >
          <span className="block">Digital</span>
          <span
            className="relative block overflow-hidden"
            style={{ height: "1.15em" }}
          >
            {rotatingWords.map((word, i) => (
              <span
                key={word}
                className="rotating-word text-accent-red"
                style={{ animationDelay: `${i * 3}s` }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>
        <div className="mt-[34px]">
          <Button variant="primary" href="#contact" className="!px-5 !py-1.5 !min-h-0 !text-[13px]">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
