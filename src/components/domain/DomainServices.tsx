"use client";

import { Compass, Wrench, Package } from "lucide-react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { ServiceCategory } from "@/data/domain-pages";

const categoryIcons = {
  Consultancy: Compass,
  Services: Wrench,
  Products: Package,
} as const;

interface DomainServicesProps {
  categories: ServiceCategory[];
}

export function DomainServices({ categories }: DomainServicesProps) {
  const ref = useScrollAnimation();

  const colClass =
    categories.length === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : categories.length === 3
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";

  return (
    <SectionContainer mode="light">
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-16"
        >
          <SectionHeader
            annotation="What We Offer"
            heading="Capabilities"
          />
        </div>

        <div className={`grid ${colClass} gap-6`}>
          {categories.map((category, i) => {
            const Icon = categoryIcons[category.name];

            return (
              <div
                key={category.name}
                data-animate
                data-animate-index={i + 1}
                className="animate-on-scroll"
              >
                <Card accentBorder className="h-full !p-6 lg:!p-7">
                  {/* Category icon + name */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="inline-flex items-center justify-center w-10 h-10 border border-gray-light">
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className="text-blueprint-blue"
                      />
                    </div>
                    <h3
                      className="text-blueprint-blue font-semibold"
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "15px",
                        lineHeight: "1.3",
                      }}
                    >
                      {category.name}
                    </h3>
                  </div>

                  {/* Service items */}
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item.title} className="flex items-start gap-2">
                        <span className="w-[5px] h-[5px] bg-accent-red rounded-full mt-[7px] flex-shrink-0" />
                        <div>
                          <p
                            className="text-blueprint-blue font-medium"
                            style={{
                              fontFamily: "var(--font-primary)",
                              fontSize: "14px",
                              lineHeight: "1.4",
                            }}
                          >
                            {item.title}
                            {item.isRoadmap && (
                              <span
                                className="ml-2 inline-block px-1.5 py-0.5 border border-accent-red/30 text-accent-red/70 align-middle"
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "8px",
                                  letterSpacing: "1px",
                                  textTransform: "uppercase",
                                }}
                              >
                                Roadmap
                              </span>
                            )}
                          </p>
                          {item.description && (
                            <p
                              className="text-gray-dark mt-1"
                              style={{
                                fontFamily: "var(--font-primary)",
                                fontSize: "13px",
                                lineHeight: "1.6",
                              }}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
