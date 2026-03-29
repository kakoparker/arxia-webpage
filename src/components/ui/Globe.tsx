"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  markers?: Array<{ location: [number, number]; size: number }>;
}

const DEFAULT_MARKERS: Array<{ location: [number, number]; size: number }> = [
  { location: [44.4268, 26.1025], size: 0.08 },   // Romania (HQ)
  { location: [-33.4489, -70.6693], size: 0.05 },  // Chile
  { location: [4.711, -74.0721], size: 0.05 },     // Colombia
  { location: [-12.0464, -77.0428], size: 0.05 },  // Peru
  { location: [13.6929, -89.2182], size: 0.05 },   // El Salvador
  { location: [52.52, 13.405], size: 0.05 },       // Germany
  { location: [46.948, 7.4474], size: 0.05 },      // Switzerland
  { location: [48.2082, 16.3738], size: 0.05 },    // Austria
  { location: [50.4501, 30.5234], size: 0.05 },    // Ukraine
  { location: [36.8065, 10.1815], size: 0.05 },    // Tunisia
  { location: [14.7167, -17.4677], size: 0.05 },   // Senegal
  { location: [5.6037, -0.187], size: 0.05 },      // Ghana
  { location: [9.0579, 7.4951], size: 0.05 },      // Nigeria
  { location: [4.3947, 18.5582], size: 0.05 },     // CAR
  { location: [4.8594, 31.5713], size: 0.05 },     // South Sudan
  { location: [0.3476, 32.5825], size: 0.05 },     // Uganda
  { location: [-1.9403, 29.8739], size: 0.05 },    // Rwanda
  { location: [-3.3731, 29.3189], size: 0.05 },    // Burundi
  { location: [-15.3875, 28.3228], size: 0.05 },   // Zambia
  { location: [11.5564, 104.9282], size: 0.05 },   // Cambodia
];

export function Globe({ className, markers = DEFAULT_MARKERS }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    let width = canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: isMobile ? 12000 : 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.2, 0.35],
      markerColor: [0.929, 0.11, 0.141],
      glowColor: [0.08, 0.12, 0.25],
      markers,
    });
    globeRef.current = globe;

    // Auto-rotation via requestAnimationFrame + globe.update
    const animate = () => {
      if (!pointerInteracting.current && !prefersReducedMotion) {
        phiRef.current += 0.005;
      }
      globe.update({
        phi: phiRef.current + pointerInteractionMovement.current / 200,
        width: width * dpr,
        height: width * dpr,
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Fade in
    setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    });

    // Resize handler
    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [markers]);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
    }
  };

  return (
    <div
      className={cn(
        "mx-auto aspect-square w-full max-w-[500px]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive 3D globe showing Arxia's global presence across Latin America, Africa, Europe, and Southeast Asia"
        className="size-full opacity-0 transition-opacity duration-500"
        style={{ contain: "layout paint size" }}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
