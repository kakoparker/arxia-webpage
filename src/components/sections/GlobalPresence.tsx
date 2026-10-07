"use client";

import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Globe } from "@/components/ui/Globe";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useOdometer } from "@/hooks/useOdometer";
import { company, yearsActive } from "@/data/company";

// `region` strings + country `code`s are STABLE KEYS into the GlobalPresence
// message namespace (regions.* and countries.*). They are never displayed raw.
const HQ_CODE = "RO";

// Every country here is backed by a completed project in the portfolio.
// Ongoing work does not add a country until it is delivered.
type Region = { region: string; codes: string[] };

// Laid out as grid cells so the list stays two rows tall on desktop (the
// section must fit one screen): East Africa, the longest group, spans two
// columns and flows its countries into two; Southeast Asia stacks under
// Latin America.
const CELLS: Array<{ regions: Region[]; wide?: boolean }> = [
  { regions: [{ region: "Europe", codes: ["DE", "CH", "AT", "NO", "UA"] }] },
  {
    regions: [
      { region: "Latin America", codes: ["CL", "CO", "PE", "SV"] },
      { region: "Southeast Asia", codes: ["KH"] },
    ],
  },
  { regions: [{ region: "North & West Africa", codes: ["TN", "SN", "GH", "NG"] }] },
  {
    wide: true,
    regions: [
      { region: "East & Central Africa", codes: ["ET", "KE", "SO", "DJ", "SS", "UG", "RW", "BI", "CF"] },
    ],
  },
  { regions: [{ region: "Southern Africa", codes: ["AO", "ZM"] }] },
];

export function GlobalPresence() {
  const t = useTranslations("GlobalPresence");
  const ref = useScrollAnimation();

  const orgStat = useOdometer({ target: company.figures.organizations, suffix: "+", duration: 1600 });
  const countryStat = useOdometer({ target: company.figures.countries, suffix: "+", duration: 1400 });
  const yearsStat = useOdometer({ target: yearsActive(), duration: 1200 });

  return (
    <SectionContainer mode="dark" id="presence" showCornerMarks fitScreen>
      <div
        ref={ref}
        className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12"
      >
        {/* Left column carries everything textual, stacked.
            This is what makes the section fit one screen: the heading and the
            stats sit BESIDE the globe instead of adding their height on top of
            it. Previously the section stacked header / [countries | globe] /
            stats, so a 500px globe plus ~220px of chrome overflowed anything
            shorter than about 950px. Left-anchored is also the documented
            default for section headers. */}
        <div>
          <div data-animate data-animate-index="0" className="animate-on-scroll">
            <SectionHeader
              annotation={t("annotation")}
              heading={t("heading")}
              dark
            />
          </div>

          <div
            data-animate
            data-animate-index="1"
            className="animate-on-scroll"
          >
            {/* Headquarters */}
            <div className="mb-5 border-b border-white/10 pb-4">
              <p
                className="mb-2 uppercase text-accent-red-bright"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                }}
              >
                {t("headquarters")}
              </p>
              <p
                className="font-semibold text-white"
                style={{ fontFamily: "var(--font-primary)", fontSize: "20px" }}
              >
                {t(`countries.${HQ_CODE}`)}
              </p>
            </div>

            {/* Regions. Three columns on desktop, which lands the groups in
                two rows instead of three — the single biggest saving in this
                column. */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {CELLS.map((cell) => (
                <div
                  key={cell.regions[0].region}
                  className={`flex flex-col gap-4 ${cell.wide ? "sm:col-span-2" : ""}`}
                >
                  {cell.regions.map((r) => (
                    <div key={r.region}>
                      <p
                        className="mb-1.5 uppercase text-gray-medium"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          letterSpacing: "2px",
                        }}
                      >
                        {t(`regions.${r.region}`)}
                      </p>
                      <div className="mb-2 h-[2px] w-8 bg-accent-red" />
                      <ul className={cell.wide ? "columns-2 gap-x-6" : ""}>
                        {r.codes.map((code) => (
                          <li
                            key={code}
                            className="break-inside-avoid text-white"
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
              ))}
            </div>
          </div>

          {/* Odometer stats */}
          <div
            data-animate
            data-animate-index="2"
            className="animate-on-scroll mt-6 flex gap-8 lg:gap-12 max-sm:flex-col max-sm:gap-4"
          >
            <Stat odometer={orgStat} label={t("statOrganizations")} />
            <Stat odometer={countryStat} label={t("statCountries")} />
            <Stat odometer={yearsStat} label={t("statYears")} />
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

/** One odometer figure with its mono label. */
function Stat({
  odometer,
  label,
}: {
  odometer: ReturnType<typeof useOdometer>;
  label: string;
}) {
  return (
    <div className="text-left" ref={odometer.ref}>
      <div
        className="font-bold tracking-[-1px] text-white"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "clamp(28px, 3vw, 38px)",
        }}
      >
        {odometer.displayValue}
      </div>
      <div
        className="uppercase text-gray-medium"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "2px",
        }}
      >
        {label}
      </div>
    </div>
  );
}
