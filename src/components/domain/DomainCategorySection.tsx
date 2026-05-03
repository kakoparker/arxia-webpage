"use client";

import Link from "next/link";
import Image from "next/image";
import { Compass, Wrench, GraduationCap, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { ServiceCategory } from "@/data/domain-pages";
import type { VerticalSlug, DomainSlug } from "@/data/domains";

const categoryIcons: Record<ServiceCategory["name"], LucideIcon> = {
  Consultancy: Compass,
  Services: Wrench,
  Trainings: GraduationCap,
  Products: Package,
};

const categoryAnnotation: Record<ServiceCategory["name"], string> = {
  Consultancy: "Strategy & Advisory",
  Services: "Delivery & Implementation",
  Trainings: "Capacity Building",
  Products: "Platforms & Products",
};

interface DomainCategorySectionProps {
  category: ServiceCategory;
  vertical: VerticalSlug;
  domain: DomainSlug;
  mode: "light" | "ultra-light" | "dark";
}

/**
 * One category rendered as a full-width section: header (annotation + heading
 * + tagline) followed by a card grid. Each card has a title, short
 * description, and a "Learn more" button that points to the future
 * per-offering route at /{vertical}/{domain}/{item.slug}.
 */
export function DomainCategorySection({
  category,
  vertical,
  domain,
  mode,
}: DomainCategorySectionProps) {
  const ref = useScrollAnimation();
  const Icon = categoryIcons[category.name];
  const annotation = categoryAnnotation[category.name];

  // Tone tokens that swap when the section is dark.
  const isDark = mode === "dark";
  const tone = {
    iconBorder: isDark ? "border-white/20" : "border-gray-light",
    iconColor: isDark ? "text-white" : "text-blueprint-blue",
    annotation: isDark ? "text-accent-red/85" : "text-accent-red",
    heading: isDark ? "text-white" : "text-blueprint-blue",
    tagline: isDark ? "text-gray-light" : "text-gray-dark",
    cardBg: isDark ? "bg-blueprint-blue" : "bg-white",
    cardBorder: isDark ? "border-white/10" : "border-gray-light",
    cardHoverBorder: isDark
      ? "hover:border-accent-red/60"
      : "hover:border-accent-red/40",
    cardTitle: isDark ? "text-white" : "text-blueprint-blue",
    cardBody: isDark ? "text-gray-light" : "text-gray-dark",
    cardCtaIdle: isDark ? "text-accent-red" : "text-accent-red/85",
    imgBorder: isDark ? "border-white/10" : "border-gray-light",
  };

  return (
    <SectionContainer mode={mode} id={`${category.name.toLowerCase()}`}>
      <div ref={ref}>
        {/* Category header */}
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`inline-flex items-center justify-center w-10 h-10 border ${tone.iconBorder}`}
            >
              <Icon size={20} strokeWidth={1.5} className={tone.iconColor} />
            </div>
            <p
              className={`font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] ${tone.annotation}`}
            >
              {annotation}
            </p>
          </div>
          <h2
            className={`${tone.heading} font-bold mb-4`}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
            }}
          >
            {category.name}
          </h2>
          <div className="h-[3px] w-12 bg-accent-red mb-5" />
          <p
            className={tone.tagline}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "17px",
              lineHeight: 1.7,
              maxWidth: "640px",
            }}
          >
            {category.tagline}
          </p>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.items.map((item, i) => (
            <article
              key={item.slug}
              data-animate
              data-animate-index={i + 1}
              className={`group animate-on-scroll border ${tone.cardBorder} ${tone.cardBg} flex flex-col ${tone.cardHoverBorder} hover:shadow-[var(--shadow-card-hover)] transition-all overflow-hidden`}
            >
              {/* Hero image — sharp corners, slight inner border, blueprint-dark
                  fallback if no image is set */}
              {item.image ? (
                <div
                  className={`relative w-full aspect-[16/10] overflow-hidden border-b ${tone.imgBorder} ${
                    isDark ? "bg-blueprint-blue" : "bg-blueprint-dark"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Corner registration marks — subtle blueprint cue */}
                  <span
                    aria-hidden
                    className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40"
                  />
                  <span
                    aria-hidden
                    className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40"
                  />
                </div>
              ) : (
                <div
                  className={`w-full aspect-[16/10] border-b ${tone.imgBorder} ${
                    isDark ? "bg-blueprint-blue" : "bg-blueprint-dark"
                  }`}
                />
              )}

              <div className="p-7 lg:p-8 flex flex-col flex-1">
                <h3
                  className={`${tone.cardTitle} font-semibold mb-3`}
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "18px",
                    lineHeight: 1.3,
                    letterSpacing: "-0.2px",
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
                </h3>
                <p
                  className={`${tone.cardBody} flex-1 mb-6`}
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "14.5px",
                    lineHeight: 1.65,
                  }}
                >
                  {item.description}
                </p>
                {item.isRoadmap ? (
                  <span
                    className="inline-flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] text-gray-medium cursor-default"
                    aria-disabled
                  >
                    Coming soon
                  </span>
                ) : (
                  <Link
                    href={`/${vertical}/${domain}/${item.slug}`}
                    className={`inline-flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2px] ${tone.cardCtaIdle} hover:text-accent-red transition-colors self-start`}
                  >
                    Learn more
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
