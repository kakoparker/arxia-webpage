export interface ClientLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Optional manual size multiplier on top of the carousel's optical sizing.
   * Use sparingly for logos whose visual density doesn't match their bounding
   * box — e.g. a light, thin-lined circular emblem that reads "small" even at
   * the same height as a dense seal. Default 1.
   */
  scale?: number;
  /**
   * Darken the logo while it sits in the carousel's grayscale resting state.
   * For pale single-colour marks (e.g. GOPA's yellow) that wash out to near
   * white once desaturated. Hover still reveals the original colours.
   */
  darken?: boolean;
}

// Public-sector clients, funders and the firms that subcontracted Arxia on
// public-sector work. Private-sector clients belong on the AI Accelerator pages.
// Intrinsic dimensions match each file's real content aspect ratio (raster logos
// are trimmed + normalized to a uniform 120px content height; SVGs use their
// viewBox). This lets the carousel render every logo at the same optical height.
export const clientLogos: ClientLogo[] = [
  { src: "/logos/clients/united-nations.webp", alt: "United Nations", width: 140, height: 120 },
  { src: "/logos/clients/world-bank.svg", alt: "World Bank", width: 312, height: 63 },
  { src: "/logos/clients/giz.webp", alt: "GIZ", width: 461, height: 120 },
  { src: "/logos/clients/european-union.webp", alt: "European Union", width: 430, height: 120 },
  { src: "/logos/clients/itu.webp", alt: "ITU", width: 109, height: 120 },
  { src: "/logos/clients/govstack.webp", alt: "GovStack", width: 245, height: 120 },
  { src: "/logos/clients/client-03.webp", alt: "RISA", width: 416, height: 120 },
  { src: "/logos/clients/client-04.webp", alt: "Government of Romania", width: 120, height: 120 },
  { src: "/logos/clients/client-02.webp", alt: "ICGLR", width: 102, height: 120, scale: 1.3 },
  { src: "/logos/clients/opcw.webp", alt: "OPCW", width: 322, height: 120 },
  { src: "/logos/clients/itc.webp", alt: "ITC", width: 113, height: 120 },
  { src: "/logos/clients/irembo.webp", alt: "Irembo", width: 437, height: 120 },
  { src: "/logos/clients/gopa.webp", alt: "GOPA", width: 424, height: 120, darken: true },
  { src: "/logos/clients/salience.webp", alt: "Salience Consulting", width: 349, height: 120 },
  { src: "/logos/clients/swiss-tph.webp", alt: "Swiss TPH", width: 484, height: 120 },
  { src: "/logos/clients/dt-global.webp", alt: "DT Global", width: 529, height: 120 },
  { src: "/logos/clients/client-06.webp", alt: "IMPACT", width: 204, height: 120 },
];
