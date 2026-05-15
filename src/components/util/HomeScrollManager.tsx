"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/hooks/useGsapScrollTrigger";

/**
 * Home-only scroll/ScrollTrigger lifecycle manager.
 *
 * The homepage is a cinematic scroll-driven experience: `Introduction` and
 * the two `VerticalInMotion` chapters create GSAP ScrollTrigger PINS, which
 * inject tall pin-spacers into the layout. Those spacers only exist after the
 * sections mount — and several of those sections are `next/dynamic` imports,
 * so they appear a tick *after* first paint.
 *
 * The bug this fixes: with the App Router's default scroll restoration, a
 * back-navigation to "/" restores the previous (deep) scroll position while
 * the page is still short (pins not built yet). ScrollTrigger then initialises
 * against a mismeasured layout and the scrubbed timelines settle at the wrong
 * progress — doors open, copy at opacity:0, cards display:none — so the page
 * renders as a blank grid band ("the landing page doesn't load back").
 *
 * The fix, and the conventional pattern for narrative GSAP homepages:
 *   1. Take manual control of scroll restoration so the browser/Next does not
 *      drop us mid-timeline into half-built pin-spacers.
 *   2. Always (re)enter the homepage from the top — it is designed to be read
 *      top-to-bottom; restoring mid-scroll into the pinned story is the bug.
 *   3. Call ScrollTrigger.refresh() once everything that affects layout height
 *      has settled: the dynamic sections mounting, web fonts swapping in, and
 *      the window `load` event (images). refresh() re-measures every pin.
 *
 * On unmount we restore `scrollRestoration = "auto"` so the rest of the site
 * keeps native per-route scroll memory.
 */
export function HomeScrollManager() {
  useEffect(() => {
    const html = document.documentElement;

    const prevRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : undefined;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Enter from the top, before triggers measure. `instant` so it never
    // races a smooth-scroll animation.
    const toTop = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    toTop();

    let raf1 = 0;
    let raf2 = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const refresh = () => ScrollTrigger.refresh();

    // After the dynamic sections have had a chance to mount and lay out.
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        toTop();
        refresh();
      });
    });

    // Belt-and-braces: dynamic imports + images can land later and change the
    // total scroll height, which moves every pin's start/end.
    timers.push(setTimeout(refresh, 350));
    timers.push(setTimeout(refresh, 900));

    const onLoad = () => refresh();
    window.addEventListener("load", onLoad);

    // Font swap shifts text metrics → section heights → pin positions.
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
      if (
        "scrollRestoration" in window.history &&
        prevRestoration !== undefined
      ) {
        window.history.scrollRestoration = prevRestoration;
      }
      void html;
    };
  }, []);

  return null;
}
