import { Fork } from "@/components/sections/Fork";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Sandbox · Fork — Arxia",
  robots: { index: false, follow: false },
};

export default function SandboxFork() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ paddingTop: "100px" }} className="blueprint-grid-ultra-light">
          <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--content-max)" }}>
            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[2.5px] text-accent-red">
              Sandbox · /sandbox/fork
            </p>
            <h1 className="text-blueprint-blue font-bold mt-2" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
              Fork section preview
            </h1>
            <p className="text-gray-dark mt-2 mb-6" style={{ maxWidth: "640px" }}>
              Split-screen vertical fork — Govtech (left) and Industries (right). Scroll past to see opposite-direction parallax. Deleted in Phase 6.
            </p>
          </div>
        </div>
        <Fork />
      </main>
    </>
  );
}
