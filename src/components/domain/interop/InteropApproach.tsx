"use client";

import { ArrowDownRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { StackLayer } from "@/data/domain-pages";
import { InteropHeader } from "./InteropHeader";

/**
 * "Why full-stack": the seams argument on the left, the EIF-aligned stack on
 * the right. The three layers are separate rows with a gap between them (the
 * seams), and one dashed red spine runs through all three: the stitch. Each
 * row jumps to its layer's section.
 */
export function InteropApproach({ layers }: { layers: StackLayer[] }) {
  const t = useTranslations("Interop.approach");
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="light" fitScreen id="approach">
      <div ref={ref} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div data-animate data-animate-index="0" className="animate-on-scroll lg:col-span-6 xl:col-span-5">
          <InteropHeader annotation={t("annotation")} heading={t("heading")} />
          <p
            className="mt-6 font-semibold text-blueprint-blue"
            style={{ fontFamily: "var(--font-primary)", fontSize: "18px", lineHeight: 1.45 }}
          >
            {t("lead")}
          </p>
          <p
            className="mt-4 text-body-text"
            style={{ fontFamily: "var(--font-primary)", fontSize: "16px", lineHeight: 1.7, maxWidth: "62ch" }}
          >
            {t("seams")}
          </p>
          <p
            className="mt-4 text-body-text"
            style={{ fontFamily: "var(--font-primary)", fontSize: "16px", lineHeight: 1.7, maxWidth: "62ch" }}
          >
            {t("close")}
          </p>
        </div>

        <div
          data-animate
          data-animate-index="1"
          className="animate-on-scroll relative pl-12 sm:pl-14 lg:col-span-6 xl:col-span-7"
        >
          {/* Dimension bracket: the whole stack is one deliverable. */}
          <div aria-hidden className="absolute inset-y-0 left-0 w-3 border-y border-l border-gray-medium/60" />
          <span
            aria-hidden
            className="absolute left-0 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap bg-white px-1.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2.5px] text-gray-dark"
          >
            {t("fullStack")}
          </span>

          {/* Rows share the height equally (auto-rows-fr), so the spine can
              start and end on the first and last row centres with pure CSS. */}
          <ol className="relative grid auto-rows-fr gap-4">
            <span
              aria-hidden
              className="interop-spine pointer-events-none absolute -left-[26px] w-0 border-l border-dashed border-accent-red sm:-left-[30px]"
              style={{
                top: "calc((100% - 2rem) / 6)",
                bottom: "calc((100% - 2rem) / 6)",
              }}
            />
            {layers.map((layer) => (
              <li key={layer.id} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1/2 -left-[30px] h-2 w-2 -translate-y-1/2 rounded-full bg-accent-red sm:-left-[34px]"
                />
                <a
                  href={`#${layer.anchor}`}
                  className="group flex h-full items-center gap-4 border border-gray-light bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-gray-dark hover:shadow-[var(--shadow-card-hover)] sm:gap-5 sm:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gray-light font-[family-name:var(--font-jetbrains)] text-[12px] tracking-[1px] text-blueprint-blue transition-colors duration-300 group-hover:border-blueprint-blue">
                    {layer.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="block font-semibold text-blueprint-blue"
                      style={{ fontFamily: "var(--font-primary)", fontSize: "18px", lineHeight: 1.25, letterSpacing: "-0.2px" }}
                    >
                      {layer.name}
                    </span>
                    <span className="mt-1.5 block font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-gray-dark">
                      {layer.dimension}
                    </span>
                    {/* The keyword strip goes between lg and xl, where the
                        rows are narrowest; each layer section repeats it. */}
                    <span
                      className="mt-1.5 block text-gray-dark lg:max-xl:hidden"
                      style={{ fontFamily: "var(--font-primary)", fontSize: "13.5px", lineHeight: 1.5 }}
                    >
                      {layer.scope}
                    </span>
                  </span>
                  <ArrowDownRight
                    aria-hidden
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-gray-medium transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-blueprint-blue"
                  />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionContainer>
  );
}
