import { VerticalInMotion } from "@/components/sections/VerticalInMotion";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Sandbox · Vertical in Motion — Arxia",
  robots: { index: false, follow: false },
};

export default function SandboxMotion() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ paddingTop: "100px" }} className="blueprint-grid-ultra-light">
          <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--content-max)" }}>
            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red">
              Sandbox · /sandbox/motion
            </p>
            <h1 className="text-blueprint-blue font-bold mt-2" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
              Vertical in Motion preview
            </h1>
            <p className="text-gray-dark mt-2 mb-6" style={{ maxWidth: "640px" }}>
              Sticky-left scrolling-right pattern applied to both verticals back-to-back. Confirms ScrollTriggers do not clash.
            </p>
          </div>
        </div>

        <VerticalInMotion verticalSlug="govtech" tone="dark" idSuffix="sb" />
        <VerticalInMotion
          verticalSlug="industries"
          tone="ultra-light"
          idSuffix="sb"
        />
      </main>
    </>
  );
}
