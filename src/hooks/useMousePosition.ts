"use client";

import { useEffect, useState, type RefObject } from "react";

export function useMousePosition(containerRef: RefObject<HTMLElement | null>) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Default offscreen so mask is hidden before first hover
    el.style.setProperty("--mouse-x", "-1000px");
    el.style.setProperty("--mouse-y", "-1000px");

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => {
      setIsHovering(false);
      el.style.setProperty("--mouse-x", "-1000px");
      el.style.setProperty("--mouse-y", "-1000px");
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [containerRef]);

  return isHovering;
}
