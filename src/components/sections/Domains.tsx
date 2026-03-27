"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { domains } from "@/data/domains";

export function Domains() {
  const ref = useScrollAnimation();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = useCallback((slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  }, []);

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
          {domains.map((domain, i) => {
            const isExpanded = expandedSlug === domain.slug;

            return (
              <div
                key={domain.slug}
                data-animate
                data-animate-index={i + 1}
                className="animate-on-scroll"
              >
                <Card accentBorder className="h-full flex flex-col p-8!">
                  <IconBox icon={domain.icon} size="lg" className="mb-5" />

                  <h3 className="font-[family-name:var(--font-inter)] text-[15px] font-semibold leading-[1.3] text-blueprint-blue mb-3">
                    {domain.title}
                  </h3>

                  {/* Collapsed: truncated description */}
                  <p
                    className={`font-[family-name:var(--font-inter)] text-[var(--text-small)] leading-[1.6] text-gray-dark transition-all duration-300 ${
                      isExpanded ? "hidden" : "line-clamp-2"
                    }`}
                  >
                    {domain.description}
                  </p>

                  {/* Expanded: full description + CTA */}
                  <div
                    ref={(el) => { contentRefs.current[domain.slug] = el; }}
                    className="grid transition-all duration-300 ease-[var(--ease-default)]"
                    style={{
                      gridTemplateRows: isExpanded ? "1fr" : "0fr",
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="font-[family-name:var(--font-inter)] text-[var(--text-small)] leading-[1.6] text-gray-dark mb-4">
                        {domain.description}
                      </p>
                      <a
                        href={`#${domain.slug}`}
                        className="inline-flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-accent-red/85 hover:text-accent-red transition-colors duration-200"
                      >
                        Explore {domain.title.split(" ")[0]} →
                      </a>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <button
                    onClick={() => toggle(domain.slug)}
                    className="mt-4 self-end inline-flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-gray-medium hover:text-blueprint-blue transition-colors duration-200 cursor-pointer"
                    aria-expanded={isExpanded}
                    aria-controls={`domain-${domain.slug}`}
                  >
                    {isExpanded ? "Less" : "More"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
