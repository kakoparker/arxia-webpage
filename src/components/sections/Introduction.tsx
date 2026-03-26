"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Introduction() {
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="light" id="about">
      <div ref={ref}>
        <div data-animate data-animate-index="0" className="animate-on-scroll">
          <SectionHeader
            annotation="About Us"
            heading="Who We Are"
            body="Arxia is a digital transformation and Digital Public Infrastructure company with more than 20 years in the international market. We develop and integrate solutions that transform countries, governments, and strategic industries — while empowering local ecosystems through capacity building, consultancy, and co-building the building blocks of their digital independence."
          />
        </div>
      </div>
    </SectionContainer>
  );
}
