"use client";

import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Globe } from "@/components/ui/Globe";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useOdometer } from "@/hooks/useOdometer";

// `region` strings + country `code`s are STABLE KEYS into the GlobalPresence
// message namespace (regions.* and countries.*). They are never displayed raw.
const HQ_CODE = "RO";

const REGIONS: Array<{ region: string; codes: string[] }> = [
  { region: "Europe", codes: ["DE", "CH", "AT", "UA"] },
  { region: "Latin America", codes: ["CL", "CO", "PE", "SV"] },
  { region: "West Africa", codes: ["TN", "SN", "GH", "NG"] },
  { region: "East Africa", codes: ["CF", "SS", "UG", "RW", "BI", "ZM"] },
  { region: "Southeast Asia", codes: ["KH"] },
];

export function GlobalPresence() {
  const t = useTranslations("GlobalPresence");
  const ref = useScrollAnimation();

  const orgStat = useOdometer({ target: 100, suffix: "+", duration: 1600 });
  const countryStat = useOdometer({ target: 20, suffix: "+", duration: 1400 });
  const yearsStat = useOdometer({ target: 25, suffix: "+", duration: 1200 });

  return (
    <SectionContainer mode="dark" id="presence" showCornerMarks>
      <div ref={ref}>
        <div data-animate data-animate-index="0" className="animate-on-scroll mb-16">
          <SectionHeader
            annotation={t("annotation")}
            heading={t("heading")}
            centered
            dark
          />
        </div>

        {/* Two columns: countries on left, globe on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left — country list grouped by region */}
          <div data-animate data-animate-index="1" className="animate-on-scroll">
            {/* HQ callout */}
            <div className="mb-8 pb-6 border-b border-white/10">
              <p
                className="text-accent-red uppercase mb-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                }}
              >
                {t("headquarters")}
              </p>
              <p
                className="text-white font-semibold"
                style={{ fontFamily: "var(--font-primary)", fontSize: "22px" }}
              >
                {t(`countries.${HQ_CODE}`)}
              </p>
            </div>

            {/* Regions — 2-column dense grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {REGIONS.map((r) => (
                <div key={r.region}>
                  <p
                    className="text-gray-medium uppercase mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "2px",
                    }}
                  >
                    {t(`regions.${r.region}`)}
                  </p>
                  <div className="h-[2px] w-8 bg-accent-red mb-3" />
                  <ul className="space-y-1">
                    {r.codes.map((code) => (
                      <li
                        key={code}
                        className="text-white"
                        style={{
                          fontFamily: "var(--font-primary)",
                          fontSize: "14px",
                          lineHeight: 1.5,
                        }}
                      >
                        {t(`countries.${code}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Globe */}
          <div
            data-animate
            data-animate-index="2"
            className="animate-on-scroll flex items-center justify-center"
          >
            <Globe />
          </div>
        </div>

        {/* Odometer stats bar — left-aligned */}
        <div className="flex gap-16 mt-12 max-sm:flex-col max-sm:gap-6">
          <div className="text-left" ref={orgStat.ref}>
            <div
              className="text-white font-bold tracking-[-1px]"
              style={{ fontFamily: "var(--font-primary)", fontSize: "48px" }}
            >
              {orgStat.displayValue}
            </div>
            <div
              className="text-gray-medium uppercase"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "2px" }}
            >
              {t("statOrganizations")}
            </div>
          </div>
          <div className="text-left" ref={countryStat.ref}>
            <div
              className="text-white font-bold tracking-[-1px]"
              style={{ fontFamily: "var(--font-primary)", fontSize: "48px" }}
            >
              {countryStat.displayValue}
            </div>
            <div
              className="text-gray-medium uppercase"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "2px" }}
            >
              {t("statCountries")}
            </div>
          </div>
          <div className="text-left" ref={yearsStat.ref}>
            <div
              className="text-white font-bold tracking-[-1px]"
              style={{ fontFamily: "var(--font-primary)", fontSize: "48px" }}
            >
              {yearsStat.displayValue}
            </div>
            <div
              className="text-gray-medium uppercase"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "2px" }}
            >
              {t("statYears")}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
