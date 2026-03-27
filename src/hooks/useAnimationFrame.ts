"use client";

import { useEffect, useRef } from "react";

export function useAnimationFrame(callback: (delta: number) => void) {
  const callbackRef = useRef(callback);
  const frameRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  callbackRef.current = callback;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let paused = false;

    const handleVisibility = () => {
      paused = document.hidden;
      if (!paused) {
        previousTimeRef.current = 0;
        frameRef.current = requestAnimationFrame(loop);
      }
    };

    const loop = (time: number) => {
      if (paused) return;
      const delta = previousTimeRef.current
        ? time - previousTimeRef.current
        : 0;
      previousTimeRef.current = time;
      callbackRef.current(delta);
      frameRef.current = requestAnimationFrame(loop);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);
}
