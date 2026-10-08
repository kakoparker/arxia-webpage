"use client";

import { Gauge, Rocket, Scale, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { CompactSectionHeader } from "@/components/domain/CompactSectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { ProgrammeTrackId } from "@/data/domain-pages";

/**
 * The four steps, and which tracks each one works on. The chips make "or the
 * track you need" concrete: an assessment is a reform job, a deployment is
 * people plus platform, and so on.
 */
const STEPS: { key: "assess" | "reform" | "deploy" | "sustain"; icon: LucideIcon; tracks: ProgrammeTrackId[] }[] = [
  { key: "assess", icon: Gauge, tracks: ["01"] },
  { key: "reform", icon: Scale, tracks: ["01", "02"] },
  { key: "deploy", icon: Rocket, tracks: ["02", "03"] },
  { key: "sustain", icon: ShieldCheck, tracks: ["02", "03"] },
];

const WHO = ["whoRegulators", "whoGovernment", "whoUniversities", "whoSoe", "whoPartners"] as const;

/**
 * How we engage: the steps on a rail, ending on the one red node (the
 * institution running it), then who we work with and how the platform is
 * delivered. Same drawing as the interop page's engage section.
 */
export function EprocEngage() {
  const t = useTranslations("Eproc.engage");
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="dark" fitScreen id="engage">
      <div ref={ref}>
        <div data-animate data-animate-index="0" className="animate-on-scroll mb-8 lg:mb-6 xl:mb-10">
          <CompactSectionHeader dark annotation={t("annotation")} heading={t("heading")} body={t("body")} />
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
                  <p className="sr-only">{t("tracksLabel")}:</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {step.tracks.map((id) => (
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
              {t("who")}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {WHO.map((key) => (
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
          <div className="lg:col-span-5">
            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-gray-medium">
              {t("delivery")}
            </p>
            <p
              className="mt-3 text-gray-light"
              style={{ fontFamily: "var(--font-primary)", fontSize: "15px", lineHeight: 1.6 }}
            >
              {t("deliveryBody")}
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
