"use client";

import { Play } from "lucide-react";
import { CASE_VIDEO_ID, PLAY_VIDEO_EVENT } from "./CaseStudyVideo";

/**
 * The hero's red "Play the video" button. It starts the case study's player
 * in place (and scrolls it into view where the video sits below the text, on
 * small screens). Without JavaScript it is a plain link to the video on
 * YouTube.
 */
export function PlayVideoButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        window.dispatchEvent(new Event(PLAY_VIDEO_EVENT));
        const frame = document.getElementById(CASE_VIDEO_ID);
        const rect = frame?.getBoundingClientRect();
        // Only scroll when the player is not already fully in view.
        if (frame && rect && (rect.top < 0 || rect.bottom > window.innerHeight)) {
          frame.scrollIntoView({ block: "center" });
        }
      }}
      className="group inline-flex min-h-12 items-center gap-3 bg-accent-red px-7 py-3.5 text-white shadow-[0_8px_28px_rgba(237,28,36,0.3)] transition-all duration-200 hover:-translate-y-px hover:bg-[#C8101A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <Play aria-hidden size={16} strokeWidth={1.5} className="fill-white" />
      <span className="font-[family-name:var(--font-inter)] text-[14px] font-semibold uppercase tracking-[1.5px]">
        {label}
      </span>
    </a>
  );
}
