"use client";

import type { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function PortfolioScrollReveal({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
