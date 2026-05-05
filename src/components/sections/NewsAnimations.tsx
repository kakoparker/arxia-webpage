"use client";

import { type ReactNode } from "react";
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
