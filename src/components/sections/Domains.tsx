"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { domains } from "@/data/domains";

export function Domains() {
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="ultra-light" id="expertise">
      <div ref={ref}>
        <div data-animate data-animate-index="0" className="animate-on-scroll mb-16">
          <SectionHeader
            annotation="What We Do"
            heading="Our Domains of Expertise"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, i) => (
            <div
              key={domain.slug}
              data-animate
              data-animate-index={i + 1}
              className="animate-on-scroll"
            >
              <Card accentBorder className="h-full flex flex-col">
                <IconBox icon={domain.icon} className="mb-4" />
                <h3 className="font-[family-name:var(--font-inter)] text-[15px] font-semibold leading-[1.3] text-blueprint-blue mb-3">
                  {domain.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[var(--text-small)] leading-[1.6] text-gray-dark mb-4 flex-1">
                  {domain.description}
                </p>
                <a
                  href={`#${domain.slug}`}
                  className="inline-flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-accent-red/85 hover:text-accent-red transition-colors duration-200"
                >
                  Explore {domain.title.split(" ")[0]} →
                </a>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
