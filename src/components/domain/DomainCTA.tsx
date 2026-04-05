"use client";

import Link from "next/link";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface DomainCTAProps {
  domainTitle: string;
}

export function DomainCTA({ domainTitle }: DomainCTAProps) {
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode="dark" showCornerMarks>
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll text-center"
        >
          <SectionHeader
            annotation="Get Started"
            heading={`Ready to discuss ${domainTitle}?`}
            body="Let's explore how we can help you achieve your goals. Our team is ready to listen, advise, and build alongside you."
            centered
            dark
          />
        </div>

        <div
          data-animate
          data-animate-index="1"
          className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Button variant="primary" href="/#contact">
            Contact Us
          </Button>
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center font-[family-name:var(--font-inter)] font-semibold text-[15px] tracking-[0.3px] px-9 py-3.5 min-h-12 rounded-none border border-white/30 text-white bg-transparent hover:bg-white/5 transition-all duration-200"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </SectionContainer>
  );
}
