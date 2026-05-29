"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VerticalHero } from "@/components/sections/VerticalHero";
import { VerticalInMotion } from "@/components/sections/VerticalInMotion";
import { CallToAction } from "@/components/sections/CallToAction";
import { verticalsBySlug } from "@/data/domains";

export function GovtechPageClient() {
  const vertical = verticalsBySlug.govtech;
  return (
    <>
      <Navbar />
      <main>
        <VerticalHero vertical={vertical} />
        <div id="domains">
          <VerticalInMotion verticalSlug="govtech" tone="ultra-light" />
        </div>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
