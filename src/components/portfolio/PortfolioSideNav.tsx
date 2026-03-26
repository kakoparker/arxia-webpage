"use client";

import { useEffect, useState } from "react";
import type { PortfolioDomain } from "@/data/portfolio-domains";

interface PortfolioSideNavProps {
  domains: PortfolioDomain[];
  projectCounts: Record<string, number>;
}

export function PortfolioSideNav({ domains, projectCounts }: PortfolioSideNavProps) {
  const [activeSlug, setActiveSlug] = useState(domains[0]?.slug ?? "");

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
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [domains]);

  function handleClick(slug: string) {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      className="hidden lg:block w-[200px] flex-shrink-0 pr-5 border-r border-gray-light"
      style={{ position: "sticky", top: "80px", alignSelf: "flex-start" }}
    >
      <p
        className="text-gray-medium uppercase mb-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "2px",
          lineHeight: "1.2",
        }}
      >
        Domains
      </p>
      {domains.map((domain) => {
        const isActive = activeSlug === domain.slug;
        return (
          <button
            key={domain.slug}
            onClick={() => handleClick(domain.slug)}
            className={`
              block w-full text-left py-2 text-[12px] transition-colors duration-200
              ${
                isActive
                  ? "border-l-[3px] border-l-accent-red pl-3 font-semibold text-blueprint-blue"
                  : "pl-[15px] text-gray-medium hover:text-blueprint-blue"
              }
            `}
          >
            {domain.label}{" "}
            <span className="font-normal text-gray-medium">
              ({projectCounts[domain.slug] ?? 0})
            </span>
          </button>
        );
      })}
    </nav>
  );
}
