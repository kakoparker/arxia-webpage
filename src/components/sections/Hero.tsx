import { CornerMarks } from "@/components/ui/CornerMarks";

const rotatingWords = [
  "Transformation",
  "Public Infrastructure",
  "Development",
  "Ecosystems",
  "Sovereignty",
  "Public Goods",
];

export function Hero() {
  return (
    <section className="blueprint-grid-dark relative min-h-screen flex items-center px-[var(--margin-page)] max-sm:px-6 pt-14">
      <CornerMarks mode="dark" />
      <div className="mx-auto max-w-[var(--content-max)] w-full">
        <h1
          className="font-light leading-[1.1] tracking-[-1.5px] text-white"
          style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(36px, 5vw, 72px)" }}
        >
          <span className="block">Digital</span>
          <span className="relative block overflow-hidden" style={{ height: "1.15em" }}>
            {rotatingWords.map((word, i) => (
              <span
                key={word}
                className="rotating-word text-accent-red"
                style={{ animationDelay: `${i * 3}s` }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>
        <p
          className="mt-8 text-gray-medium leading-[1.8]"
          style={{ fontSize: "18px", maxWidth: "var(--content-narrow)" }}
        >
          We develop and integrate solutions that transform countries,
          governments, and strategic industries.
        </p>
      </div>
    </section>
  );
}
