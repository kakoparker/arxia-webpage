"use client";

import { useRef, useCallback, type ComponentPropsWithoutRef } from "react";

interface ParticleButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  particleCount?: number;
  particleColors?: string[];
}

export function ParticleButton({
  children,
  particleCount = 18,
  particleColors = ["#ED1C24", "#FFFFFF"],
  onClick,
  ...props
}: ParticleButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const spawnParticles = useCallback(
    (cx: number, cy: number) => {
      // Respect reduced motion
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");
        const size = 3 + Math.random() * 2; // 3-5px
        const color =
          particleColors[Math.floor(Math.random() * particleColors.length)];
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 60;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance - 30; // upward bias

        Object.assign(particle.style, {
          position: "fixed",
          left: `${cx}px`,
          top: `${cy}px`,
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          pointerEvents: "none",
          zIndex: "9999",
          transform: "translate(-50%, -50%) scale(1)",
          opacity: "1",
          transition:
            "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease",
        });

        document.body.appendChild(particle);

        // Force reflow then animate
        particle.offsetHeight;
        particle.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
        particle.style.opacity = "0";

        setTimeout(() => particle.remove(), 700);
      }
    },
    [particleCount, particleColors]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        spawnParticles(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
      }
      onClick?.(e);
    },
    [onClick, spawnParticles]
  );

  return (
    <button ref={btnRef} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
