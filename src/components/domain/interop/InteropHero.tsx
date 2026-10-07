"use client";

import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { DomainBreadcrumb } from "@/components/domain/DomainShared";
import { IsoStackFigure, PLATES, ISO } from "@/components/figures/IsoStack";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { DomainPageData } from "@/data/domain-pages";

/**
 * Hero: the claim on the left, the stack on the right. The figure is the same
 * isometric stack as the homepage anchor plate, now labelled: each layer name
 * sits level with its plate and jumps to that layer's section. Hovering or
 * focusing a label lights its plate (`.interop-stack` rules in globals.css).
 */
export function InteropHero({ page, coreLabel }: { page: DomainPageData; coreLabel: string }) {
  const t = useTranslations("Interop");
  const ref = useScrollAnimation();
  const layers = page.layers ?? [];

  return (
    <SectionContainer
      mode="dark"
      showCornerMarks
      fitScreen
      // The fixed navbar (~56px) sits over the top of the hero, so the top
      // padding must clear it; fitScreen's own floor is only 40px.
      className="!pt-[max(96px,12vh)]"
    >
      <div ref={ref} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <DomainBreadcrumb title={page.name} />

          <p
            data-animate
            data-animate-index="1"
            className="animate-on-scroll font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-gray-medium"
          >
            {page.order} · {coreLabel}
          </p>
          <h1
            data-animate
            data-animate-index="2"
            className="animate-on-scroll mt-4 font-bold text-white"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(32px, 3.6vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-1px",
            }}
          >
            {page.name}
          </h1>
          <div
            data-animate
            data-animate-index="3"
            className="animate-on-scroll mt-5 h-[3px] w-12 bg-accent-red"
          />
          <p
            data-animate
            data-animate-index="4"
            className="animate-on-scroll mt-6 text-white"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(18px, 1.5vw, 21px)",
              lineHeight: 1.45,
              maxWidth: "34ch",
            }}
          >
            {t("lede")}
          </p>
          <p
            data-animate
            data-animate-index="5"
            className="animate-on-scroll mt-4 text-gray-medium"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "52ch",
            }}
          >
            {page.description}
          </p>
        </div>

        <figure
          data-animate
          data-animate-index="3"
          className="interop-hero-fig animate-on-scroll lg:col-span-7"
        >
          <div className="interop-stack relative flex max-sm:justify-center">
            <IsoStackFigure className="aspect-[260/196] h-full w-auto shrink-0" />
            {/* Labels, absolutely placed level with each plate's centre — the
                percentages come from the figure's own fixed geometry. */}
            <nav aria-label={t("stackNav")} className="relative -ml-5 min-w-0 flex-1 max-sm:hidden">
              <ol>
                {PLATES.map((plate) => {
                  const layer = layers.find((l) => l.id === plate.label);
                  if (!layer) return null;
                  return (
                    <li
                      key={layer.id}
                      className="absolute left-0 right-0 -translate-y-1/2"
                      style={{ top: `${(plate.cy / ISO.h) * 100}%` }}
                    >
                      <a
                        href={`#${layer.anchor}`}
                        data-layer={layer.id}
                        className="interop-stack-link group flex items-center gap-3 py-1"
                      >
                        <span
                          aria-hidden
                          className="interop-stack-leader h-px w-5 shrink-0 bg-white/25 sm:w-7"
                        />
                        <span className="min-w-0">
                          <span
                            className="block font-semibold text-white"
                            style={{
                              fontFamily: "var(--font-primary)",
                              fontSize: "clamp(14px, 1.15vw, 16px)",
                              lineHeight: 1.25,
                            }}
                          >
                            <span className="sr-only">{layer.id} · </span>
                            {layer.name}
                          </span>
                          {/* Dropped between lg and xl, where the stack is at
                              its smallest and a wrapped dimension would touch
                              the next label. The approach section shows it. */}
                          <span className="mt-1 block font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px] text-gray-medium lg:max-xl:hidden">
                            {layer.dimension}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
          <figcaption className="mt-6 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-gray-medium">
            {t("figCaption")}
          </figcaption>
        </figure>
      </div>
    </SectionContainer>
  );
}
