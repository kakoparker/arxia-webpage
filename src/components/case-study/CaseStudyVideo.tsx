"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { CaseStudyVideo as Video } from "@/data/case-studies";
import { videoPoster } from "@/data/case-study-links";

interface CaseStudyVideoProps {
  video: Video;
  title: string;
  /** "Play video: …" — the facade's accessible name. */
  playLabel: string;
  /** "Video · 1:22" */
  durationLabel: string;
  /** "Plays from YouTube" */
  note: string;
  /** "Play the video" — the red button on the poster. */
  cta: string;
}

/** Fired by <PlayVideoButton> elsewhere on the page to start this player. */
export const PLAY_VIDEO_EVENT = "arxia:play-case-video";
/** Anchor id of the player, so the hero button can scroll to it. */
export const CASE_VIDEO_ID = "case-video";

/**
 * Click-to-load YouTube player.
 *
 * Until the visitor presses play, nothing is fetched from YouTube: the poster
 * is served through next/image from our own origin, so the page stays fast
 * (no ~600KB player on load) and no third-party cookie is set before the
 * visitor asks for the video. On play, the privacy-enhanced
 * youtube-nocookie.com embed replaces the facade and starts at once.
 *
 * The facade is a real link to the video on YouTube, so it still works with
 * JavaScript disabled; with JS, the click is intercepted and plays in place.
 *
 * Shorts are framed 9:16. The poster YouTube publishes for them is 4:5, so it
 * sits centred in the frame over the blueprint grid, and the bands above and
 * below carry the duration and the title instead of empty space.
 */
export function CaseStudyVideo({ video, title, playLabel, durationLabel, note, cta }: CaseStudyVideoProps) {
  const [playing, setPlaying] = useState(false);

  // The hero's "Play the video" button starts this player from afar.
  useEffect(() => {
    const play = () => setPlaying(true);
    window.addEventListener(PLAY_VIDEO_EVENT, play);
    return () => window.removeEventListener(PLAY_VIDEO_EVENT, play);
  }, []);
  const vertical = video.orientation === "vertical";
  const watchUrl = vertical
    ? `https://www.youtube.com/shorts/${video.youtubeId}`
    : `https://www.youtube.com/watch?v=${video.youtubeId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0`;

  return (
    <div
      id={CASE_VIDEO_ID}
      className={`blueprint-grid-dark relative w-full scroll-mt-24 overflow-hidden border border-white/15 ${
        vertical ? "aspect-[9/16]" : "aspect-video"
      }`}
    >
      {playing ? (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={playLabel}
          onClick={(e) => {
            // Modified clicks (new tab, etc.) keep the browser's behaviour.
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            setPlaying(true);
          }}
          className="cs-video-facade group absolute inset-0 flex flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
        >
          {/* Top band: what this is and how long it runs. */}
          <span className="flex flex-1 items-start justify-between gap-3 p-4">
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-gray-medium">
              {durationLabel}
            </span>
            <span aria-hidden className="mt-1 h-[6px] w-[6px] shrink-0 bg-accent-red" />
          </span>

          <span className={`relative block w-full ${vertical ? "aspect-[4/5]" : "flex-1"}`}>
            <Image
              src={videoPoster(video)}
              alt=""
              fill
              sizes="(max-width: 1024px) 80vw, 360px"
              className="object-cover transition-opacity duration-300 group-hover:opacity-80"
              priority
            />
            {/* Play control: a white, square-cornered button that says what it
                does; the red play glyph is the signature mark. */}
            <span
              aria-hidden
              className="cs-play-cta absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 whitespace-nowrap bg-white px-5 py-3.5 text-blueprint-dark shadow-[0_8px_28px_rgba(13,21,32,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:bg-gray-light"
            >
              <Play size={16} strokeWidth={1.5} className="fill-accent-red text-accent-red" />
              <span className="font-[family-name:var(--font-inter)] text-[13px] font-semibold uppercase tracking-[1.5px]">
                {cta}
              </span>
            </span>
          </span>

          {/* Bottom band: the title, and where the video plays from. */}
          <span className="flex flex-1 flex-col justify-end gap-2 p-4">
            <span
              className="block text-white"
              style={{ fontFamily: "var(--font-primary)", fontSize: "14px", lineHeight: 1.4 }}
            >
              {title}
            </span>
            <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[1.5px] text-gray-medium">
              {note}
            </span>
          </span>
        </a>
      )}
    </div>
  );
}
