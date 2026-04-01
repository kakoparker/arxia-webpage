"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorldMap } from "@/components/ui/WorldMap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useOdometer } from "@/hooks/useOdometer";

export function GlobalPresence() {
  const ref = useScrollAnimation();

  const orgStat = useOdometer({ target: 100, suffix: "+", duration: 1600 });
  const countryStat = useOdometer({ target: 20, suffix: "+", duration: 1400 });
  const yearsStat = useOdometer({ target: 25, suffix: "+", duration: 1200 });

  return (
    <SectionContainer mode="dark" id="presence" showCornerMarks>
      <div ref={ref}>
        <div data-animate data-animate-index="0" className="animate-on-scroll mb-16">
          <SectionHeader
            annotation="Reach"
            heading="Our Global Presence"
            centered
            dark
          />
        </div>

        <WorldMap hideStats />

        {/* Odometer stats bar */}
        <div className="flex justify-center gap-16 mt-12 max-sm:flex-col max-sm:items-center max-sm:gap-6">
          <div className="text-center" ref={orgStat.ref}>
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
              Organizations
            </div>
          </div>
          <div className="text-center" ref={countryStat.ref}>
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
              Countries
            </div>
          </div>
          <div className="text-center" ref={yearsStat.ref}>
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
              Years
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
