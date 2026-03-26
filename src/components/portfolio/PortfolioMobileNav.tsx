"use client";

import { useEffect, useRef, useState } from "react";
import type { PortfolioDomain } from "@/data/portfolio-domains";

interface PortfolioMobileNavProps {
  domains: PortfolioDomain[];
}

export function PortfolioMobileNav({ domains }: PortfolioMobileNavProps) {
  const [activeSlug, setActiveSlug] = useState(domains[0]?.slug ?? "");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEls = domains
      .map((d) => document.getElementById(d.slug))
      .filter(Boolean) as HTMLElement[];

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0 && visible[0].target.id) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [domains]);

  // Scroll active tab into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeBtn = scrollRef.current.querySelector(`[data-slug="${activeSlug}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeSlug]);

  function handleClick(slug: string) {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div
      className="lg:hidden sticky bg-white/95 backdrop-blur-[8px] border-b border-gray-light z-30"
      style={{ top: "56px" }}
    >
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-0 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.portfolio-mobile-nav::-webkit-scrollbar { display: none; }`}</style>
        {domains.map((domain) => {
          const isActive = activeSlug === domain.slug;
          return (
            <button
              key={domain.slug}
              data-slug={domain.slug}
              onClick={() => handleClick(domain.slug)}
              className={`
                flex-shrink-0 py-3 px-4 text-[10px] uppercase tracking-[1.5px] transition-colors duration-200 whitespace-nowrap
                ${
                  isActive
                    ? "border-b-2 border-b-accent-red text-blueprint-blue font-semibold"
                    : "text-gray-medium hover:text-blueprint-blue"
                }
              `}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {domain.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
