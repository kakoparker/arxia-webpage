"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface DomainHeroProps {
  title: string;
  description: string;
  icon: LucideIcon;
  parentVerticalName?: string;
}

export function DomainHero({ title, description, icon: Icon, parentVerticalName }: DomainHeroProps) {
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="dark" showCornerMarks className="!pt-28 !pb-16 lg:!pt-32 lg:!pb-20">
      <div ref={ref}>
        {/* Breadcrumb */}
        <nav
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-8"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href="/"
                className="text-gray-medium hover:text-white transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Home
              </Link>
            </li>
            <li
              className="text-gray-medium/40"
              style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
            >
              /
            </li>
            <li>
              <Link
                href="/#expertise"
                className="text-gray-medium hover:text-white transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Domains
              </Link>
            </li>
            {parentVerticalName && (
              <>
                <li
                  className="text-gray-medium/40"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
                >
                  /
                </li>
                <li
                  className="text-gray-medium"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {parentVerticalName}
                </li>
              </>
            )}
            <li
              className="text-gray-medium/40"
              style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
            >
              /
            </li>
            <li
              className="text-accent-red/85"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {title}
            </li>
          </ol>
        </nav>

        {/* Icon */}
        <div
          data-animate
          data-animate-index="1"
          className="animate-on-scroll mb-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 border border-white/[0.12]">
            <Icon size={28} strokeWidth={1.5} className="text-white/60" />
          </div>
        </div>

        {/* Title */}
        <h1
          data-animate
          data-animate-index="2"
          className="animate-on-scroll font-bold text-white mb-4"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            lineHeight: "1.2",
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </h1>

        {/* Accent line */}
        <div
          data-animate
          data-animate-index="3"
          className="animate-on-scroll h-[3px] w-12 bg-accent-red mb-6"
        />

        {/* Description */}
        <p
          data-animate
          data-animate-index="4"
          className="animate-on-scroll text-gray-medium font-normal"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "18px",
            lineHeight: "1.8",
            maxWidth: "var(--content-narrow)",
          }}
        >
          {description}
        </p>
      </div>
    </SectionContainer>
  );
}
