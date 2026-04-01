"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CHAR_SET = "░▒▓█▐▌┃━┗┛┏┓╋╬╠╣╦╩─│┼╳⬡⬢";

interface UseTextScrambleOptions {
  texts: string[];
  scrambleDuration?: number;
  holdDuration?: number;
  charSet?: string;
  /** When provided, the hook shows texts[activeIndex] instead of auto-cycling */
  activeIndex?: number;
  /** When true, start with the text already resolved (no initial scramble) */
  startResolved?: boolean;
}

interface TextScrambleResult {
  displayText: string;
  currentIndex: number;
  isScrambling: boolean;
  /** Manually trigger a scramble to a specific index */
  scrambleTo: (index: number) => void;
}

export function useTextScramble({
  texts,
  scrambleDuration = 800,
  holdDuration = 2200,
  charSet = CHAR_SET,
  activeIndex,
  startResolved = false,
}: UseTextScrambleOptions): TextScrambleResult {
  const isControlled = activeIndex !== undefined;
  const [currentIndex, setCurrentIndex] = useState(isControlled ? activeIndex : 0);
  const [displayText, setDisplayText] = useState(startResolved ? texts[0] : "");
  const [isScrambling, setIsScrambling] = useState(!startResolved);

  const rafRef = useRef<number>(0);
  const phaseRef = useRef<"scramble-in" | "hold" | "scramble-out">(
    startResolved ? "hold" : "scramble-in"
  );
  const startTimeRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const targetIndexRef = useRef(currentIndex);

  // Check reduced motion preference
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Handle controlled mode: when activeIndex changes externally, scramble to it
  useEffect(() => {
    if (isControlled && activeIndex !== currentIndex) {
      targetIndexRef.current = activeIndex;
      phaseRef.current = "scramble-in";
      startTimeRef.current = 0;
      setCurrentIndex(activeIndex);
      setIsScrambling(true);
    }
  }, [activeIndex, isControlled, currentIndex]);

  const scrambleTo = useCallback((index: number) => {
    targetIndexRef.current = index;
    phaseRef.current = "scramble-in";
    startTimeRef.current = 0;
    setCurrentIndex(index);
    setIsScrambling(true);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (reducedMotionRef.current) {
      setDisplayText(texts[currentIndex] ?? "");
      setIsScrambling(false);
      return;
    }

    const targetText = () => texts[targetIndexRef.current] ?? "";

    const randomChar = () => charSet[Math.floor(Math.random() * charSet.length)];

    const buildScrambleText = (target: string, progress: number): string => {
      const len = target.length;
      const chars: string[] = [];
      for (let i = 0; i < len; i++) {
        if (target[i] === " ") {
          chars.push(" ");
          continue;
        }
        const threshold = (i / len) * 0.7 + 0.15;
        if (progress >= threshold) {
          chars.push(target[i]);
        } else {
          chars.push(randomChar());
        }
      }
      return chars.join("");
    };

    const buildScrambleOutText = (source: string, progress: number): string => {
      const len = source.length;
      const chars: string[] = [];
      for (let i = 0; i < len; i++) {
        if (source[i] === " ") {
          chars.push(" ");
          continue;
        }
        const threshold = (i / len) * 0.7 + 0.15;
        if (progress >= threshold) {
          chars.push(randomChar());
        } else {
          chars.push(source[i]);
        }
      }
      return chars.join("");
    };

    let active = true;

    const frame = (timestamp: number) => {
      if (!active) return;

      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const phase = phaseRef.current;

      if (phase === "scramble-in") {
        const progress = Math.min(elapsed / scrambleDuration, 1);
        setDisplayText(buildScrambleText(targetText(), progress));

        if (progress >= 1) {
          setDisplayText(targetText());
          setIsScrambling(false);
          phaseRef.current = "hold";
          startTimeRef.current = timestamp;
        }
      } else if (phase === "hold") {
        // In controlled mode, just stay resolved — don't auto-cycle
        if (isControlled) {
          rafRef.current = requestAnimationFrame(frame);
          return;
        }

        if (elapsed >= holdDuration) {
          phaseRef.current = "scramble-out";
          startTimeRef.current = timestamp;
          setIsScrambling(true);
        }
      } else if (phase === "scramble-out") {
        const progress = Math.min(elapsed / (scrambleDuration * 0.6), 1);
        setDisplayText(buildScrambleOutText(targetText(), progress));

        if (progress >= 1) {
          const nextIndex = (targetIndexRef.current + 1) % texts.length;
          targetIndexRef.current = nextIndex;
          setCurrentIndex(nextIndex);
          phaseRef.current = "scramble-in";
          startTimeRef.current = timestamp;
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [texts, scrambleDuration, holdDuration, charSet, isControlled, currentIndex]);

  return { displayText, currentIndex, isScrambling, scrambleTo };
}
