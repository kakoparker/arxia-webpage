"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Wraps children with the scroll-reveal observer used across sections.
 * Static markup stays in the server component; only the ref + observer
 * cross the client boundary.
 */
export function NewsScrollReveal({ children }: { children: ReactNode }) {
  const ref = useScrollAnimation();
  return <div ref={ref}>{children}</div>;
}

/**
 * Tracks mouse position across the news card grid and writes the
 * coordinates to CSS custom properties on each `.spotlight-card` so
 * cards can render the radial spotlight border via pure CSS.
 */
export function NewsSpotlightGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = grid.querySelectorAll<HTMLElement>(".spotlight-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    },
    []
  );

  return (
    <div ref={gridRef} className={className} onMouseMove={handleMouseMove}>
      {children}
    </div>
  );
}
