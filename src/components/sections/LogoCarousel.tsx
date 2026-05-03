import Image from "next/image";
import { clientLogos } from "@/data/clients";
import { LogoCarouselTrack } from "./LogoCarouselTrack";

export function LogoCarousel() {
  // Duplicate the logo set so the marquee can loop seamlessly.
  const logos = [...clientLogos, ...clientLogos];

  return (
    <LogoCarouselTrack>
      {logos.map((logo, i) => (
        <div key={`${logo.alt}-${i}`} className="flex-shrink-0">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            loading="lazy"
          />
        </div>
      ))}
    </LogoCarouselTrack>
  );
}
