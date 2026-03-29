"use client";

import Image from "next/image";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Introduction() {
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="light" id="about">
      <div ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div data-animate data-animate-index="0" className="animate-on-scroll">
            <SectionHeader
              annotation="About Us"
              heading="Who We Are"
              body="Arxia is a digital transformation and Digital Public Infrastructure company with more than 20 years in the international market. We develop and integrate solutions that transform countries, governments, and strategic industries — while empowering local ecosystems through capacity building, consultancy, and co-building the building blocks of their digital independence."
            />
          </div>

          {/* Logo column */}
          <div data-animate data-animate-index="1" className="animate-on-scroll flex items-center justify-center">
            <Image
              src="/logos/brand/arxia-logo-color.png"
              alt="Arxia logo"
              width={480}
              height={160}
              className="max-w-[480px] h-auto"
              style={{ opacity: 0.80, width: 'auto' }}
              priority={false}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
