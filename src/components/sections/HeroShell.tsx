"use client";

import { useRef, type ReactNode } from "react";
import {
  BlueprintGridSVG,
  type BlueprintGridSVGHandle,
} from "@/components/ui/BlueprintGridSVG";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * Client-only animation shell for the hero: the drifting blueprint grid, the
 * cursor-reveal grid and the ambient glows. The content arrives as
 * server-rendered children, so the hero's copy, figures and latest story are
 * in the HTML and none of it waits for (or ships as) client JS.
 */
export function HeroShell({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollGridRef = useRef<BlueprintGridSVGHandle>(null);
  const revealGridRef = useRef<BlueprintGridSVGHandle>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

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
      className="hero-grid-bg relative flex min-h-svh flex-col overflow-hidden px-[var(--margin-page)]"
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

      {/* z-30: Ambient glows. The Blueprint Blue wash sits behind the
          headline side so the dark surface reads lit, not flat black. */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            left: "-12%",
            top: "-10%",
            width: "60%",
            height: "70%",
            background: "rgba(38, 56, 96, 0.45)",
          }}
        />
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            right: "-10%",
            bottom: "-20%",
            width: "40%",
            height: "50%",
            background: "rgba(22, 32, 54, 0.55)",
          }}
        />
      </div>

      {/* z-40: Content */}
      <div className="relative z-40 flex flex-1 flex-col">{children}</div>
    </section>
  );
}
