"use client";

import { useLocale } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VerticalHero } from "@/components/sections/VerticalHero";
import { VerticalInMotion } from "@/components/sections/VerticalInMotion";
import { CallToAction } from "@/components/sections/CallToAction";
import { getVertical } from "@/data/domains";

export function IndustriesPageClient() {
  const vertical = getVertical("industries", useLocale());
  return (
    <>
      <Navbar />
      <main>
        <VerticalHero vertical={vertical} />
        <div id="domains">
          <VerticalInMotion verticalSlug="industries" tone="dark" />
        </div>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
