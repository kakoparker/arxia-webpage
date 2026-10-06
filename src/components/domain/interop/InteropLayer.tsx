"use client";

import {
  Blocks,
  Database,
  DraftingCompass,
  Earth,
  Gauge,
  Grid3x3,
  Handshake,
  Languages,
  Layers,
  ListChecks,
  Plug,
  Route,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { IsoStackFigure } from "@/components/figures/IsoStack";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { StackLayer } from "@/data/domain-pages";
import { InteropHeader } from "./InteropHeader";
import { LayerFigure } from "./LayerFigures";

const OFFER_ICONS: Record<string, LucideIcon> = {
  "interoperability-frameworks": Grid3x3,
  "interoperability-maturity": Gauge,
  "data-sharing-policy": Handshake,
  "adoption-roadmaps": Route,
  "semantic-standards": Layers,
  "conformance-tooling": ListChecks,
  "registry-standardization": Database,
  "standard-localization": Languages,
  "interoperability-architecture": DraftingCompass,
  "api-development": Plug,
  "xroad-integration": Waypoints,
  "regional-exchange-platforms": Earth,
};

/**
 * One layer of the stack, on one screen: header with a "you are here" stack
 * marker, then the layer's drafting figure on the left, centred against the
 * four offers on the right. `figNo` numbers the offers the way the brochure does
 * (02.1, 02.2 …), so the page and the PDF cite the same figures.
 */
export function InteropLayer({
  layer,
  figNo,
  mode,
}: {
  layer: StackLayer;
  figNo: number;
  mode: "light" | "ultra-light";
}) {
  const t = useTranslations("Interop.layer");
  const ref = useScrollAnimation();
  // L03 → 3: the layer's height in the stack.
  const position = Number(layer.id.slice(1));
  const fig = String(figNo).padStart(2, "0");

  return (
    <SectionContainer mode={mode} fitScreen id={layer.anchor}>
      <div ref={ref}>
        <div
          data-animate
          data-animate-index="0"
          className="animate-on-scroll mb-6 flex items-end justify-between gap-8 lg:mb-8"
        >
          <InteropHeader
            annotation={`${layer.id} · ${layer.dimension}`}
            heading={layer.name}
            body={layer.promise}
          />
          <div className="hidden shrink-0 text-right md:block">
            <IsoStackFigure
              tone="light"
              active={layer.id}
              showBracket={false}
              showPacket={false}
              className="ml-auto aspect-[260/196] h-[min(88px,11vh)] w-auto"
            />
            <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[2px] text-gray-dark">
              {t("position", { n: position })}
            </p>
          </div>
        </div>

        {/* Figure and offers side by side, the figure centred on the card
            grid so neither column dictates dead space in the other. 4/8 from
            xl; 3/9 between lg and xl, where 4/8 squeezes the cards' copy. */}
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div
            data-animate
            data-animate-index="1"
            className="animate-on-scroll flex items-center justify-center lg:col-span-3 xl:col-span-4"
          >
            <LayerFigure layer={layer.id} />
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9 xl:col-span-8">
            {layer.items.map((item, i) => {
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
                        {fig}.{i + 1}
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
