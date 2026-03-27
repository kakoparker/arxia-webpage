"use client";

import { useId, useRef, useImperativeHandle, forwardRef } from "react";

export interface BlueprintGridSVGHandle {
  setOffset: (x: number, y: number) => void;
}

interface BlueprintGridSVGProps {
  minorOpacity?: number;
  majorOpacity?: number;
  className?: string;
}

export const BlueprintGridSVG = forwardRef<
  BlueprintGridSVGHandle,
  BlueprintGridSVGProps
>(function BlueprintGridSVG(
  { minorOpacity = 0.025, majorOpacity = 0.05, className = "" },
  ref
) {
  const uid = useId().replace(/:/g, "");
  const minorId = `minor-${uid}`;
  const majorId = `major-${uid}`;
  const minorPatternRef = useRef<SVGPatternElement>(null);
  const majorPatternRef = useRef<SVGPatternElement>(null);

  useImperativeHandle(ref, () => ({
    setOffset(x: number, y: number) {
      const transform = `translate(${x}, ${y})`;
      minorPatternRef.current?.setAttribute("patternTransform", transform);
      majorPatternRef.current?.setAttribute("patternTransform", transform);
    },
  }));

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          ref={minorPatternRef}
          id={minorId}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke={`rgba(255,255,255,${minorOpacity})`}
            strokeWidth="1"
          />
        </pattern>
        <pattern
          ref={majorPatternRef}
          id={majorId}
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100" height="100" fill={`url(#${minorId})`} />
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke={`rgba(255,255,255,${majorOpacity})`}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${majorId})`} />
    </svg>
  );
});
