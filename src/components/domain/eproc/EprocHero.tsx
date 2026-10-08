"use client";

import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { DomainBreadcrumb } from "@/components/domain/DomainShared";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { DomainPageData, ProgrammeTrackId } from "@/data/domain-pages";
import { processPlayerFacts } from "@/data/processplayer";

/**
 * Where each track runs on the programme timeline, in % of its width. Reform
 * starts alone, people overlap it, the platform comes last and runs to
 * handover. Shared with the track markers (`ProgrammeMarker`), so the hero
 * and the per-track "you are here" read as the same drawing.
 */
export const TRACK_SPANS: Record<ProgrammeTrackId, { start: number; end: number }> = {
  "01": { start: 0, end: 48 },
  "02": { start: 22, end: 100 },
  "03": { start: 42, end: 100 },
};

/** Milestones on the time axis, in % of its width. */
const MILESTONES = [
  { key: "diagnose", at: 0 },
  { key: "goLive", at: 64 },
  { key: "handover", at: 100 },
] as const;

/**
 * Hero: the claim on the left, Fig. 00 on the right. The figure is the
 * programme drawn as a drafting-style timeline: three tracks that start in
 * sequence and overlap, ending on the one red node, the institution running
 * it. Each track row is a link to its section (the counterpart of the
 * interop hero's layer labels), so the figure doubles as the page's map.
 *
 * Unlike the interop hero, the text column does not animate in: the H1 is
 * the LCP element and must not wait for hydration (audit §3.E). Only the
 * figure draws itself.
 */
export function EprocHero({ page }: { page: DomainPageData }) {
  const t = useTranslations("Eproc");
  const ref = useScrollAnimation();
  const tracks = page.tracks ?? [];

  return (
    <SectionContainer
      mode="dark"
      showCornerMarks
      fitScreen
      // Clear the fixed navbar (~56px); fitScreen's own floor is only 40px.
      className="!pt-[max(96px,12vh)]"
    >
      <div ref={ref} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <DomainBreadcrumb title={page.name} />

          <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-gray-medium">
            {page.order} · {page.name}
          </p>
          <h1
            className="mt-4 font-bold text-white"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(32px, 3.6vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-1px",
            }}
          >
            {/* <nobreak> keeps a hyphenated term from splitting at its hyphen. */}
            {t.rich("h1", {
              nobreak: (chunks) => <span className="whitespace-nowrap">{chunks}</span>,
            })}
          </h1>
          <div className="mt-5 h-[3px] w-12 bg-accent-red" />
          <p
            className="mt-6 text-white"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(18px, 1.5vw, 21px)",
              lineHeight: 1.45,
              maxWidth: "36ch",
            }}
          >
            {t("lede")}
          </p>
          <p
            className="mt-4 text-gray-medium"
            style={{ fontFamily: "var(--font-primary)", fontSize: "16px", lineHeight: 1.7, maxWidth: "52ch" }}
          >
            {t("body")}
          </p>
          {/* One verifiable proof point, from the dated facts file. */}
          <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase leading-[1.6] tracking-[1.5px] text-gray-light">
            {t("proof", {
              orgs: processPlayerFacts.stats[0].value,
              year: processPlayerFacts.since,
            })}
          </p>
        </div>

        <figure data-animate data-animate-index="1" className="animate-on-scroll lg:col-span-7">
          <nav aria-label={t("programmeNav")}>
            <ol className="relative grid gap-3 sm:gap-4">
              {/* Milestone guides behind the lanes, so overlap reads against time. */}
              {MILESTONES.slice(1, 2).map((m) => (
                <span
                  key={m.key}
                  aria-hidden
                  className="domain-iso-dim pointer-events-none absolute -bottom-3 top-0 w-0 border-l border-dashed border-white/20"
                  style={{ left: `${m.at}%` }}
                />
              ))}
              {tracks.map((track, i) => {
                const span = TRACK_SPANS[track.id];
                const last = i === tracks.length - 1;
                return (
                  <li key={track.id}>
                    <a
                      href={`#${track.anchor}`}
                      className="eproc-track-link group block py-1.5"
                    >
                      <span className="flex items-baseline gap-3">
                        <span aria-hidden className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-[1px] text-gray-medium">
                          {track.id}
                        </span>
                        <span
                          className="font-semibold text-white"
                          style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.25 }}
                        >
                          <span className="sr-only">{track.id} · </span>
                          {track.name}
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px] text-gray-medium">
                          {track.kind}
                        </span>
                        {last && (
                          <span className="ml-auto hidden font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px] text-gray-medium sm:inline">
                            {t("runsIt")}
                          </span>
                        )}
                      </span>
                      <span aria-hidden className="relative mt-2 block h-7 sm:h-8">
                        <span
                          className="eproc-bar absolute inset-y-0"
                          style={{
                            left: `${span.start}%`,
                            right: `${100 - span.end}%`,
                            transitionDelay: `${220 + i * 180}ms`,
                          }}
                        />
                        {last && (
                          <span
                            className="domain-iso-node absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent-red"
                            style={{ transitionDelay: "1200ms" }}
                          />
                        )}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>

            {/* Time axis, dimensioned like a drawing. */}
            <div aria-hidden className="domain-iso-dim relative mt-5 h-8">
              <span className="absolute inset-x-0 top-0 h-px bg-white/25" />
              {MILESTONES.map((m) => (
                <span
                  key={m.key}
                  className="absolute top-0 flex flex-col"
                  style={{
                    left: `${m.at}%`,
                    transform: m.at === 0 ? "none" : m.at === 100 ? "translateX(-100%)" : "translateX(-50%)",
                    alignItems: m.at === 0 ? "flex-start" : m.at === 100 ? "flex-end" : "center",
                  }}
                >
                  <span className="h-2 w-px bg-white/40" />
                  <span className="mt-1.5 whitespace-nowrap font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[1.5px] text-gray-medium">
                    {t(`axis.${m.key}`)}
                  </span>
                </span>
              ))}
            </div>
          </nav>
          <figcaption className="mt-6 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-gray-medium">
            {t("figCaption")}
          </figcaption>
        </figure>
      </div>
    </SectionContainer>
  );
}
