"use client";

import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll("[data-animate]");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const staggerIndex = parseInt(el.dataset.animateIndex || "0", 10);
            const delay = staggerIndex * 100;

            setTimeout(() => {
              el.classList.add("visible");
            }, delay);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
