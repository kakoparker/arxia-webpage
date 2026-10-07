"use client";

import { useEffect } from "react";

/**
 * Home-only scroll-position memory.
 *
 * Takes manual control of scroll restoration on the home route so that:
 *   1. A URL hash always wins: arriving at "/#contact" or "/#news" (from the
 *      nav, a domain page's Contact CTA, or a shared link) lands on that
 *      section, never on a remembered position from earlier in the session.
 *   2. Otherwise, returning to the homepage in the same tab session lands you
 *      back where you were, once the dynamic sections have reached their full
 *      height.
 *   3. The first visit of a session starts at the top, on the hero.
 *
 * On unmount, native `scrollRestoration` is restored so every other route
 * keeps normal per-page scroll memory.
 */
const STORAGE_KEY = "arxia:home:scrollY";

export function HomeScrollManager() {
  useEffect(() => {
    const prevRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : undefined;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let saved = 0;
    try {
      saved = Number(sessionStorage.getItem(STORAGE_KEY)) || 0;
    } catch {
      saved = 0;
    }

    const hashId = decodeURIComponent(window.location.hash.slice(1));

    // Until the target position is applied, do not let the scroll listener
    // overwrite the saved value.
    let restored = false;

    const persist = () => {
      if (!restored) return;
      try {
        sessionStorage.setItem(STORAGE_KEY, String(Math.round(window.scrollY)));
      } catch {
        /* sessionStorage unavailable — restoration just degrades to top */
      }
    };

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        persist();
      });
    };

    const jump = (y: number) =>
      window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });

    let raf1 = 0;
    let raf2 = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let attempts = 0;

    const finish = () => {
      restored = true;
      persist();
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    // Dynamic sections, fonts and images all change total height. Poll until
    // the target can be honoured (or attempts run out), then apply it.
    const settle = () => {
      attempts += 1;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (hashId) {
        const target = document.getElementById(hashId);
        if (target || attempts >= 12) {
          target?.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
          finish();
          return;
        }
      } else {
        const tallEnough = saved <= 0 || maxScroll >= saved - 4;
        if (tallEnough || attempts >= 12) {
          if (saved > 0) jump(Math.min(saved, Math.max(0, maxScroll)));
          finish();
          return;
        }
      }
      timers.push(setTimeout(settle, 120));
    };

    // Give the dynamic imports two frames to mount before the first attempt.
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(settle);
    });

    // Capture the position synchronously when the page is being hidden /
    // navigated away (covers cases the rAF-throttled listener might miss).
    const onPageHide = () => persist();
    window.addEventListener("pagehide", onPageHide);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
      // Final capture on unmount (client-side navigation away from "/").
      persist();
      if ("scrollRestoration" in window.history && prevRestoration !== undefined) {
        window.history.scrollRestoration = prevRestoration;
      }
    };
  }, []);

  return null;
}
