"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorldMap } from "@/components/ui/WorldMap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function GlobalPresence() {
  const ref = useScrollAnimation();

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

        <WorldMap />
      </div>
    </SectionContainer>
  );
}
