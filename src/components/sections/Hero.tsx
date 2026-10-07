"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  BlueprintGridSVG,
  type BlueprintGridSVGHandle,
} from "@/components/ui/BlueprintGridSVG";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { useMousePosition } from "@/hooks/useMousePosition";
import { company } from "@/data/company";

/** Hero plates, in order. Keys map to the `Hero.labels` message namespace. */
const HERO_LABELS = ["transformation", "dpi", "interoperability"] as const;

export function Hero() {
  const t = useTranslations("Hero");
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
        className="relative z-40 mx-auto max-w-[var(--content-max)] w-full flex flex-col items-center text-center"
      >
        {/* The H1 is the LCP element: it renders at full opacity in the server
            HTML and never waits for JS. Only the supporting elements below
            animate in. Weight and tracking per the brief's hero spec. */}
        <h1
          className="font-light leading-[1.1] tracking-[-1.5px] text-white w-full"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-hero)",
          }}
        >
          <span className="block">{t("title1")}</span>
          <span className="block">{" "}{t("title2")}</span>
        </h1>

        <div
          style={{ animationDelay: "90ms" }}
          className="hero-enter h-[3px] w-12 bg-accent-red mt-8 mb-6"
        />

        {/* What Arxia does, as three plates rather than a sentence. Mono,
            uppercase and sharp-cornered: the brand's tag treatment, sized up
            for the hero and inverted for the dark surface. */}
        <ul
          style={{ animationDelay: "180ms" }}
          className="hero-enter flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        >
          {HERO_LABELS.map((key) => (
            <li
              key={key}
              className="border border-white/[0.18] px-3 py-2 text-[10px] text-gray-light sm:px-3.5 sm:text-[11px]"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "2px",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              {t(`labels.${key}`)}
            </li>
          ))}
        </ul>

        {/* One verifiable proof point in the first screen, from company facts. */}
        <p
          className="hero-enter mt-6 text-gray-medium"
          style={{
            animationDelay: "270ms",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          {t("proof", { founded: company.foundingYear })}
        </p>

        <div className="hero-enter mt-8" style={{ animationDelay: "360ms" }}>
          <Button variant="primary" dark href="#contact">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
