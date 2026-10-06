"use client";

import { Boxes, Gauge, Grid3x3, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { ServiceItem, StackLayerId } from "@/data/domain-pages";
import { InteropHeader } from "./InteropHeader";

/**
 * The four phases, and which layers of the stack each one works on. The chips
 * are what make "or at any single layer" concrete: an assessment is a
 * governance job, a build is semantics plus exchange, and so on.
 */
const STEPS: { key: "assess" | "design" | "build" | "sustain"; icon: LucideIcon; layers: StackLayerId[] }[] = [
  { key: "assess", icon: Gauge, layers: ["L03"] },
  { key: "design", icon: Grid3x3, layers: ["L03", "L02", "L01"] },
  { key: "build", icon: Boxes, layers: ["L02", "L01"] },
  { key: "sustain", icon: ShieldCheck, layers: ["L03", "L02"] },
];

// Only sectors the portfolio actually evidences.
const SECTORS = ["sectorSocial", "sectorFinance", "sectorMinerals", "sectorMigration"] as const;

/**
 * How we engage: the lifecycle on a rail, ending on the one red node (the
 * nation owning what was built), then the sectors and the capacity-building
 * offer that the Sustain step relies on.
 */
export function InteropEngage({ trainings }: { trainings: ServiceItem[] }) {
  const t = useTranslations("Interop.engage");
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="dark" fitScreen id="engage">
      <div ref={ref}>
        <div data-animate data-animate-index="0" className="animate-on-scroll mb-8 lg:mb-6 xl:mb-10">
          <InteropHeader dark annotation={t("annotation")} heading={t("heading")} body={t("body")} />
        </div>

        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* The rail, node to node. */}
          <span aria-hidden className="absolute left-[7px] right-[7px] top-[7px] hidden h-px bg-white/20 lg:block" />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const last = i === STEPS.length - 1;
            return (
              <li
                key={step.key}
                data-animate
                data-animate-index={i + 1}
                className="animate-on-scroll relative"
              >
                <span
                  aria-hidden
                  className={`relative block h-[15px] w-[15px] rounded-full ${
                    last ? "bg-accent-red" : "border border-white/45 bg-blueprint-dark"
                  }`}
                />
                <div className="mt-5 lg:border-l lg:border-white/10 lg:pl-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className="font-semibold text-white"
                      style={{ fontFamily: "var(--font-primary)", fontSize: "18px", lineHeight: 1.3 }}
                    >
                      <span
                        aria-hidden
                        className="mr-2.5 font-[family-name:var(--font-jetbrains)] text-[12px] font-normal tracking-[1px] text-gray-medium"
                      >
                        0{i + 1}
                      </span>
                      {t(`${step.key}Title`)}
                    </h3>
                    <Icon aria-hidden size={20} strokeWidth={1.5} className="shrink-0 text-gray-medium" />
                  </div>
                  <p
                    className="mt-2 text-[14px] leading-[1.6] text-gray-medium lg:max-xl:text-[13.5px] lg:max-xl:leading-[1.5]"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {t(`${step.key}Body`)}
                  </p>
                  <p className="sr-only">{t("layersLabel")}:</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {step.layers.map((id) => (
                      <li
                        key={id}
                        className="border border-white/20 px-2 py-[3px] font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[1px] text-gray-light"
                      >
                        {id}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>

        <div
          data-animate
          data-animate-index="5"
          className="animate-on-scroll mt-8 grid gap-6 border-t border-white/10 pt-6 lg:mt-6 lg:grid-cols-12 lg:gap-8 xl:mt-10"
        >
          <div className="lg:col-span-7">
            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-gray-medium">
              {t("sectors")}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SECTORS.map((key) => (
                <li
                  key={key}
                  className="border border-white/15 px-3 py-1.5 text-gray-light"
                  style={{ fontFamily: "var(--font-primary)", fontSize: "13.5px" }}
                >
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
          {trainings.length > 0 && (
            <div className="lg:col-span-5">
              <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-gray-medium">
                {t("capacity")}
              </p>
              {trainings.map((item) => (
                <div key={item.slug} className="mt-3">
                  <h3
                    className="font-semibold text-white"
                    style={{ fontFamily: "var(--font-primary)", fontSize: "15px", lineHeight: 1.35 }}
                  >
                    {item.title}
                  </h3>
                  {/* Teaser, clamped: the full text belongs to the offer. */}
                  <p
                    className="mt-1.5 line-clamp-2 text-gray-medium"
                    style={{ fontFamily: "var(--font-primary)", fontSize: "13.5px", lineHeight: 1.55 }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
