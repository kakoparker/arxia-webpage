"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

/**
 * Home-only scroll/ScrollTrigger lifecycle manager.
 *
 * The homepage is a cinematic scroll-driven experience: `Introduction` and
 * the two `VerticalInMotion` chapters create GSAP ScrollTrigger PINS, which
 * inject tall pin-spacers into the layout. Those spacers only exist after the
 * sections mount — and several are `next/dynamic` imports, so they appear a
 * tick *after* first paint.
 *
 * Why default scroll restoration breaks here: the App Router (or the browser)
 * restores the previous scroll position immediately on a back-navigation,
 * while the page is still short (pins not built yet). ScrollTrigger then
 * initialises against a mismeasured layout and the scrubbed timelines settle
 * at the wrong progress — blank grid band.
 *
 * What this does instead — proper restore that lands you back where you were:
 *   1. Take manual control of scroll restoration on the home route.
 *   2. Continuously remember the homepage scroll position (per tab session).
 *   3. On (re)entry: refresh ScrollTrigger so all pin-spacers are built and
 *      the document reaches its true full height, THEN scroll to the saved
 *      position, THEN ScrollTrigger.update() so the pinned/scrubbed timelines
 *      (doors, vertical cards) re-sync to that exact position.
 *   4. First visit of the session (nothing saved) → start at the top/hero.
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

    // Until the saved position is restored (or we've decided to start at the
    // top), do not let the scroll listener overwrite the saved value.
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

    const refresh = () => ScrollTrigger.refresh();

    // Re-sync everything to a target scroll position once the pinned layout
    // is fully built. refresh() first (build/measure pins → full height),
    // then jump, then update() so scrubbed timelines reflect the new scroll.
    const applyScroll = (y: number) => {
      ScrollTrigger.refresh();
      window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
      ScrollTrigger.update();
    };

    let raf1 = 0;
    let raf2 = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let settleAttempts = 0;

    // The dynamic sections + pins + fonts + images all change total height.
    // Poll until the document is tall enough to honour the saved position
    // (or we exhaust attempts), then restore. Capped so a genuinely shorter
    // page — e.g. viewport resized larger — still resolves quickly.
    const trySettleAndRestore = () => {
      settleAttempts += 1;
      ScrollTrigger.refresh();

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const tallEnough = saved <= 0 || maxScroll >= saved - 4;

      if (tallEnough || settleAttempts >= 12) {
        if (saved > 0) {
          applyScroll(Math.min(saved, Math.max(0, maxScroll)));
        }
        restored = true;
        persist();
        window.addEventListener("scroll", onScroll, { passive: true });
        return;
      }
      timers.push(setTimeout(trySettleAndRestore, 120));
    };

    // Give the dynamic imports two frames to mount before the first attempt.
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(trySettleAndRestore);
    });

    // Late layout shifts (web fonts, images) → re-measure pins. If we've
    // already restored we keep the user where they are; refresh() preserves
    // the current scroll position.
    const onLoad = () => refresh();
    window.addEventListener("load", onLoad);
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

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
      window.removeEventListener("load", onLoad);
      window.removeEventListener("pagehide", onPageHide);
      // Final capture on unmount (client-side navigation away from "/").
      persist();
      if (
        "scrollRestoration" in window.history &&
        prevRestoration !== undefined
      ) {
        window.history.scrollRestoration = prevRestoration;
      }
    };
  }, []);

  return null;
}
