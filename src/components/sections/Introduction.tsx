"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

gsap.registerPlugin(useGSAP);

export function Introduction() {
  const t = useTranslations("Introduction");
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const next = window.innerWidth < 640;
      setIsMobile((prev) => {
        if (prev !== next) {
          ScrollTrigger.getAll().forEach((st) => {
            const trigger = st.trigger as Node | undefined;
            if (
              trigger &&
              sectionRef.current?.parentNode?.contains(trigger)
            ) {
              st.kill();
            }
          });
        }
        return next;
      });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Doors START closed (covering the whole viewport, with the intro paragraph
  // on top of them). On scroll: paragraph fades, then the doors slide apart
  // left/right to reveal the statement plate underneath. Same
  // mechanic as the original Hero curtain reveal.
  useGSAP(
    () => {
      if (isMobile) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const wrapper = pinWrapperRef.current;
      if (!wrapper) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
        },
      });

      // Phase A — Read (0–30): doors closed, paragraph visible on top.
      // Phase B — Fade copy (30–45): paragraph fades out.
      tl.to(
        contentRef.current,
        { opacity: 0, ease: "power1.in", duration: 15 },
        30
      );

      // Phase C — Doors part open (45–100): closed → fully off-screen left/right.
      tl.to(
        leftDoorRef.current,
        { xPercent: -100, ease: "power2.inOut", duration: 55 },
        45
      );
      tl.to(
        rightDoorRef.current,
        { xPercent: 100, ease: "power2.inOut", duration: 55 },
        45
      );
    },
    { dependencies: [isMobile] }
  );

  // ─── Mobile: static, no doors ───────────────────────────────
  if (isMobile) {
    return (
      <section
        id="intro"
        ref={sectionRef}
        className="relative min-h-[60vh] flex items-center justify-center px-6 py-20 overflow-hidden"
        style={{ background: "var(--blueprint-dark)" }}
      >
        <div className="relative z-40 mx-auto w-full flex flex-col items-center text-center max-w-[640px]">
          <span
            className="uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "2.5px",
              color: "var(--accent-red)",
            }}
          >
            {t("annotation")}
          </span>
          <div className="h-[3px] w-12 bg-accent-red mt-4 mb-6" />
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "16px",
              lineHeight: "1.8",
              color: "var(--gray-medium)",
            }}
          >
            {t("paragraph")}
          </p>
        </div>
      </section>
    );
  }

  // ─── Desktop: pinned, doors slide apart ─────────────────────
  return (
    <div ref={pinWrapperRef}>
      <section
        id="intro"
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden"
        style={{ background: "var(--blueprint-dark)" }}
      >
        {/* z-10: the master framing — sits underneath the doors, revealed
            when they slide apart. `pointer-events-none` lets the doors (z-30)
            absorb early clicks; the CTA opts back in via
            `pointer-events-auto`. We do NOT aria-hide this block — the CTA is
            real nav.

            One statement plate rather than a set of panels: the doors part on
            the single idea the eight domains hang from, and the scroll then
            carries you into the domain plate below. Blueprint Blue is a step
            lighter than the Blueprint Dark doors, so parting them reads as a
            lift. */}
        <div className="absolute inset-0 z-10 blueprint-grid-blue flex items-center pointer-events-none">
          <div
            className="mx-auto w-full px-[var(--margin-page)]"
            style={{ maxWidth: "var(--content-max)" }}
          >
            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red/85 mb-6">
              {t("statementLabel")}
            </p>
            <h2
              className="font-bold text-white"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(34px, 5vw, 68px)",
                lineHeight: 1.02,
                letterSpacing: "-1.8px",
                maxWidth: "18ch",
              }}
            >
              {t("statementTitle")}
            </h2>
            <div className="bg-accent-red mt-7 mb-7 h-[3px] w-12" />
            <p
              className="text-gray-light"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(16px, 1.3vw, 19px)",
                lineHeight: 1.75,
                maxWidth: "62ch",
              }}
            >
              {t("statementBody")}
            </p>
            <Link
              href="/#expertise"
              className="pointer-events-auto mt-10 inline-flex items-center gap-3 border border-white/60 px-6 py-3 font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.3px] text-white transition-colors duration-200 hover:bg-white hover:text-blueprint-blue focus-visible:bg-white focus-visible:text-blueprint-blue focus-visible:outline-none"
            >
              {t("statementCta")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* z-30: Doors — start fully closed (covering the split). They slide
            apart on scroll to reveal the statement plate. Solid
            blueprint-dark on both sides; no animated grid (the surface stays
            calm so the intro copy is the only point of focus). */}
        <div
          ref={leftDoorRef}
          className="absolute top-0 bottom-0 left-0 z-30 overflow-hidden"
          style={{
            width: "50%",
            background: "var(--blueprint-dark)",
            boxShadow: "inset -4px 0 20px rgba(0,0,0,0.3)",
          }}
          aria-hidden="true"
        />

        <div
          ref={rightDoorRef}
          className="absolute top-0 bottom-0 right-0 z-30 overflow-hidden"
          style={{
            width: "50%",
            background: "var(--blueprint-dark)",
            boxShadow: "inset 4px 0 20px rgba(0,0,0,0.3)",
          }}
          aria-hidden="true"
        />

        {/* z-50: Intro copy — sits on top of the closed doors, fades out
            before they part open. */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-50 flex items-center justify-center px-[var(--margin-page)] pointer-events-none"
        >
          <div className="mx-auto w-full flex flex-col items-center text-center max-w-[720px]">
            <span
              className="uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "2.5px",
                color: "var(--accent-red)",
              }}
            >
              {t("annotation")}
            </span>
            <div className="h-[3px] w-12 bg-accent-red mt-6 mb-8" />
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(18px, 1.6vw, 22px)",
                lineHeight: "1.8",
                color: "var(--gray-light)",
              }}
            >
              {t("paragraph")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
