"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";

interface GlobeProps {
  className?: string;
  /** Must be referentially stable: a new array rebuilds the WebGL globe. */
  markers?: Array<{ location: [number, number]; size: number }>;
}

type Marker = { location: [number, number]; size: number };

// Offices are plotted larger than project countries, from company facts.
const OFFICE_MARKERS: Marker[] = company.offices.map((o) => ({
  location: [o.location[0], o.location[1]],
  size: o.headquarters ? 0.1 : 0.09,
}));

// Countries with delivered projects (capitals), matching the GlobalPresence
// list. Romania, Chile and Uganda are already plotted as offices.
const PROJECT_MARKERS: Marker[] = [
  { location: [4.711, -74.0721], size: 0.06 },     // Colombia
  { location: [-12.0464, -77.0428], size: 0.06 },  // Peru
  { location: [13.6929, -89.2182], size: 0.06 },   // El Salvador
  { location: [52.52, 13.405], size: 0.06 },       // Germany
  { location: [48.8566, 2.3522], size: 0.06 },     // France
  { location: [52.3676, 4.9041], size: 0.06 },     // Netherlands
  { location: [46.948, 7.4474], size: 0.06 },      // Switzerland
  { location: [48.2082, 16.3738], size: 0.06 },    // Austria
  { location: [59.9139, 10.7522], size: 0.06 },    // Norway
  { location: [50.4501, 30.5234], size: 0.06 },    // Ukraine
  { location: [36.8065, 10.1815], size: 0.06 },    // Tunisia
  { location: [14.7167, -17.4677], size: 0.06 },   // Senegal
  { location: [5.36, -4.0083], size: 0.06 },       // Côte d'Ivoire
  { location: [5.6037, -0.187], size: 0.06 },      // Ghana
  { location: [9.0579, 7.4951], size: 0.06 },      // Nigeria
  { location: [4.3947, 18.5582], size: 0.06 },     // CAR
  { location: [4.8594, 31.5713], size: 0.06 },     // South Sudan
  { location: [-1.9403, 29.8739], size: 0.06 },    // Rwanda
  { location: [-3.3731, 29.3189], size: 0.06 },    // Burundi
  { location: [9.03, 38.74], size: 0.06 },         // Ethiopia
  { location: [-1.2921, 36.8219], size: 0.06 },    // Kenya
  { location: [2.0469, 45.3182], size: 0.06 },     // Somalia
  { location: [11.588, 43.145], size: 0.06 },      // Djibouti
  { location: [-15.3875, 28.3228], size: 0.06 },   // Zambia
  { location: [-24.6282, 25.9231], size: 0.06 },   // Botswana
  { location: [11.5564, 104.9282], size: 0.06 },   // Cambodia
];

const DEFAULT_MARKERS: Marker[] = [...OFFICE_MARKERS, ...PROJECT_MARKERS];

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

    // Render loop. WebGL frames are expensive, so it only runs while the
    // globe is on screen and the tab is visible. Under reduced motion there
    // is no auto-rotation: it draws once, then only while being dragged or
    // after a resize (`dirty`).
    let onScreen = false;
    let dirty = true;
    const animate = () => {
      const dragging = pointerInteracting.current !== null;
      if (!prefersReducedMotion || dragging || dirty) {
        if (!dragging && !prefersReducedMotion) phiRef.current += 0.005;
        globe.update({
          phi: phiRef.current + pointerInteractionMovement.current / 200,
          width: width * dpr,
          height: width * dpr,
        });
        dirty = false;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    const start = () => {
      if (!rafRef.current && onScreen && !document.hidden) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    const stop = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Fade in
    setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    });

    // Resize handler
    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
        dirty = true;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
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
        // Capped against viewport height as well as width: the globe is
        // square, so an uncapped 500px is 500px of vertical cost and was
        // pushing its section past one screen on shorter displays.
        "mx-auto aspect-square w-full max-w-[min(460px,44vh)]",
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
