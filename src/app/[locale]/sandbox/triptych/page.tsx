import { Triptych } from "@/components/sections/Triptych";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Sandbox · Triptych — Arxia",
  robots: { index: false, follow: false },
};

export default function SandboxTriptych() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ paddingTop: "100px", minHeight: "40vh" }} className="blueprint-grid-ultra-light">
          <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--content-max)" }}>
            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red">
              Sandbox · /sandbox/triptych
            </p>
            <h1 className="text-blueprint-blue font-bold mt-2" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
              Triptych section preview
            </h1>
            <p className="text-gray-dark mt-2 mb-6" style={{ maxWidth: "640px" }}>
              Data · Process · Intelligence — the shared operating model. Scroll past to see each card activate in sequence.
            </p>
          </div>
        </div>
        <Triptych />
        <div style={{ height: "80vh" }} className="blueprint-grid-ultra-light" aria-hidden />
      </main>
    </>
  );
}
