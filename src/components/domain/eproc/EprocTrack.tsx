"use client";

import {
  BarChart3,
  Blocks,
  ClipboardList,
  FileSearch,
  FileSignature,
  GraduationCap,
  Handshake,
  Map as MapIcon,
  Route,
  Scale,
  Store,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { CompactSectionHeader } from "@/components/domain/CompactSectionHeader";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { ProgrammeTrack, ProgrammeTrackId } from "@/data/domain-pages";
import { TRACK_SPANS } from "./EprocHero";
import { TrackFigure } from "./TrackFigures";

const OFFER_ICONS: Record<string, LucideIcon> = {
  "procurement-assessment": FileSearch,
  "eprocurement-strategy": MapIcon,
  "regulatory-alignment": Scale,
  "process-redesign": Workflow,
  "procurement-officer-training": GraduationCap,
  "local-trainers": Users,
  "supplier-engagement": Store,
  "change-management": Route,
  "purchase-requests": FileSignature,
  "procurement-plan": ClipboardList,
  "contracts-suppliers": Handshake,
  "audit-reporting": BarChart3,
};

/**
 * The hero's programme timeline in miniature, with this track's bar lit: the
 * counterpart of the interop page's stack marker.
 */
function ProgrammeMarker({ active }: { active: ProgrammeTrackId }) {
  return (
    <span aria-hidden className="ml-auto flex w-[120px] flex-col gap-1.5">
      {(Object.keys(TRACK_SPANS) as ProgrammeTrackId[]).map((id) => {
        const span = TRACK_SPANS[id];
        return (
          <span key={id} className="relative block h-2">
            <span
              className={`absolute inset-y-0 border ${
                id === active ? "border-blueprint-blue bg-blueprint-blue" : "border-gray-medium bg-white"
              }`}
              style={{ left: `${span.start}%`, right: `${100 - span.end}%` }}
            />
          </span>
        );
      })}
    </span>
  );
}

/**
 * One track of the programme, on one screen: header with the "you are here"
 * marker, then the track's drafting figure on the left, centred against its
 * four offers on the right. Offers are numbered by track (01.1 … 03.4): one
 * numbering system for the whole page.
 */
export function EprocTrack({
  track,
  mode,
}: {
  track: ProgrammeTrack;
  mode: "light" | "ultra-light";
}) {
  const t = useTranslations("Eproc.track");
  const ref = useScrollAnimation();

  return (
    <SectionContainer mode={mode} fitScreen id={track.anchor}>
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-6 flex items-end justify-between gap-8 lg:mb-8"
        >
          <CompactSectionHeader
            annotation={`${track.id} · ${track.kind}`}
            heading={track.name}
            body={track.promise}
          />
          <div className="hidden shrink-0 text-right md:block">
            <ProgrammeMarker active={track.id} />
            <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-gray-dark">
              {t("position", { n: Number(track.id) })}
            </p>
          </div>
        </div>

        {/* Figure and offers side by side, as on the interop layers: 4/8
            from xl, 3/9 between lg and xl where 4/8 squeezes the cards. */}
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div
            data-animate
            data-animate-index="1"
            className="animate-on-scroll flex items-center justify-center lg:col-span-3 xl:col-span-4"
          >
            <TrackFigure track={track.id} />
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9 xl:col-span-8">
            {track.items.map((item, i) => {
              const Icon = OFFER_ICONS[item.slug] ?? Blocks;
              return (
                <li
                  key={item.slug}
                  data-animate
                  data-animate-index={i + 2}
                  className="animate-on-scroll"
                >
                  <article className="flex h-full flex-col border border-gray-light bg-white p-5 lg:max-xl:p-4 transition-[border-color,box-shadow] duration-300 hover:border-gray-dark hover:shadow-[var(--shadow-card-hover)]">
                    <div className="flex items-start gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-light">
                        <Icon aria-hidden size={18} strokeWidth={1.5} className="text-blueprint-blue" />
                      </span>
                      <h3
                        className="min-w-0 flex-1 pt-0.5 font-semibold text-blueprint-blue"
                        style={{ fontFamily: "var(--font-primary)", fontSize: "15.5px", lineHeight: 1.3, letterSpacing: "-0.1px" }}
                      >
                        {item.title}
                      </h3>
                      <span
                        aria-hidden
                        className="shrink-0 pt-1 font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[1.5px] text-gray-dark"
                      >
                        {track.id}.{i + 1}
                      </span>
                    </div>
                    <p
                      className="mt-3 text-[14px] leading-[1.55] text-gray-dark lg:max-xl:mt-2 lg:max-xl:text-[13.5px] lg:max-xl:leading-[1.5]"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {item.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}

