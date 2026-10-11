"use client";

import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Globe } from "@/components/ui/Globe";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { company } from "@/data/company";

// `region` strings + country `code`s are STABLE KEYS into the GlobalPresence
// message namespace (regions.* and countries.*). They are never displayed raw.
//
// Two lists, never merged: where Arxia has OFFICES (company.offices) and the
// countries where it has DELIVERED PROJECTS (below). Mixing the two made an
// office look like a one-off project and a one-off project look like a
// presence. The project list was confirmed by the CEO in October 2026;
// Netherlands, France, Côte d'Ivoire and Botswana are not yet in the public
// portfolio. Keep the Globe's project markers in step with this list.
const REGIONS: Array<{ region: string; codes: string[] }> = [
  { region: "Europe", codes: ["RO", "DE", "FR", "NL", "CH", "AT", "NO", "UA"] },
  { region: "Latin America", codes: ["CL", "CO", "PE", "SV"] },
  { region: "North & West Africa", codes: ["TN", "SN", "CI", "GH", "NG"] },
  { region: "East & Central Africa", codes: ["ET", "KE", "SO", "DJ", "SS", "UG", "RW", "BI", "CF"] },
  { region: "Southern Africa", codes: ["BW", "ZM"] },
  { region: "Southeast Asia", codes: ["KH"] },
];

const mono = "font-[family-name:var(--font-jetbrains)] uppercase";

export function GlobalPresence() {
  const t = useTranslations("GlobalPresence");
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="dark" id="presence" showCornerMarks fitScreen>
      <div
        ref={ref}
        className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12"
      >
        {/* Left column carries everything textual, stacked, so the heading
            and both lists sit BESIDE the globe instead of adding their height
            on top of it. That is what lets the section fit one screen. */}
        <div>
          <div data-animate data-animate-index="0" className="animate-on-scroll">
            <SectionHeader
              annotation={t("annotation")}
              heading={t("heading")}
              dark
            />
          </div>

          {/* Offices */}
          <div
            data-animate
            data-animate-index="1"
            className="animate-on-scroll mb-6 border-b border-white/10 pb-5"
          >
            <h3 className={`${mono} mb-3 text-[11px] tracking-[2.5px] text-accent-red-bright sm:text-[12px]`}>
              {t("offices")}
            </h3>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {company.offices.map((o) => (
                <li key={o.city}>
                  <p
                    className="font-semibold text-white"
                    style={{ fontFamily: "var(--font-primary)", fontSize: "19px", lineHeight: 1.25 }}
                  >
                    {o.city}
                  </p>
                  <p className="mt-0.5 text-[14px] leading-[1.5] text-gray-light">
                    {t(`countries.${o.countryCode}`)}
                    <span className="text-gray-medium">
                      {" · "}
                      {o.headquarters ? t("headquarters") : t("office")}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries with delivered projects */}
          <div data-animate data-animate-index="2" className="animate-on-scroll">
            <h3 className={`${mono} mb-4 text-[11px] tracking-[2.5px] text-accent-red-bright sm:text-[12px]`}>
              {t("projectCountries")}
            </h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {REGIONS.map((r) => (
                <div key={r.region}>
                  <p className={`${mono} mb-1.5 flex items-center gap-2 text-[11px] tracking-[2px] text-gray-medium`}>
                    <span aria-hidden className="h-[2px] w-4 bg-accent-red" />
                    {t(`regions.${r.region}`)}
                  </p>
                  {/* Inline, dot-separated: a region is one or two lines
                      instead of a column per country. */}
                  <ul className="flex flex-wrap gap-x-1.5 text-[14px] leading-[1.6] text-white">
                    {r.codes.map((code, i) => (
                      <li key={code}>
                        {t(`countries.${code}`)}
                        {i < r.codes.length - 1 && (
                          <span aria-hidden className="pl-1.5 text-gray-medium">
                            ·
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: the globe, capped against viewport height so it can
            never be the reason the section overflows. */}
        <div
          data-animate
          data-animate-index="3"
          className="animate-on-scroll flex items-center justify-center"
        >
          <Globe />
        </div>
      </div>
    </SectionContainer>
  );
}
