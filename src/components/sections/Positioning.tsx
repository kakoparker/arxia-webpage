"use client";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface PositioningProps {
  eyebrow?: string;
  headline: string;
  body: string;
  mode?: "dark" | "light" | "ultra-light";
  id?: string;
}

export function Positioning({
  eyebrow = "Who We Are",
  headline,
  body,
  mode = "light",
  id,
}: PositioningProps) {
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode={mode} id={id}>
      <div ref={ref} style={{ maxWidth: "var(--content-narrow)" }}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll"
        >
          <SectionHeader
            annotation={eyebrow}
            heading={headline}
            body={body}
            dark={mode === "dark"}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
