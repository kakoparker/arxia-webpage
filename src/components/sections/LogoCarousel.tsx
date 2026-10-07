import Image from "next/image";
import { clientLogos } from "@/data/clients";
import { LogoCarouselTrack } from "./LogoCarouselTrack";

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    // The second set only exists so the marquee can loop seamlessly; it is
    // hidden from assistive tech so every logo is announced once.
    <ul
      className="flex items-center gap-16 pr-16"
      aria-hidden={hidden || undefined}
    >
      {clientLogos.map((logo, i) => {
        // Optical sizing: a compact, square emblem (a seal/crest) reads much
        // smaller than a wide wordmark at the same pixel height. So scale the
        // render height down as a logo gets wider — square emblems grow to
        // ~56px, while wide wordmarks (Audi, Falabella, RISA) stay ~40px.
        const aspect = logo.width / logo.height;
        const base = Math.min(56, Math.max(40, 56 * Math.sqrt(1.2 / aspect)));
        const h = Math.round(base * (logo.scale ?? 1));
        return (
          <li key={`${logo.alt}-${i}`} className="flex-shrink-0">
            <Image
              src={logo.src}
              alt={hidden ? "" : logo.alt}
              width={logo.width}
              height={logo.height}
              style={{ height: `${h}px`, width: "auto" }}
              className="w-auto max-w-[200px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
            />
          </li>
        );
      })}
    </ul>
  );
}

export function LogoCarousel() {
  return (
    <LogoCarouselTrack>
      <LogoSet />
      <LogoSet hidden />
    </LogoCarouselTrack>
  );
}
