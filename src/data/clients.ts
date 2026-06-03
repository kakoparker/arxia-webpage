export interface ClientLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Intrinsic dimensions match each file's real content aspect ratio (raster logos
// are trimmed + normalized to a uniform 120px content height; SVGs use their
// viewBox). This lets the carousel render every logo at the same optical height.
export const clientLogos: ClientLogo[] = [
  { src: "/logos/clients/united-nations.webp", alt: "United Nations", width: 140, height: 120 },
  { src: "/logos/clients/world-bank.svg", alt: "World Bank", width: 312, height: 63 },
  { src: "/logos/clients/opcw.webp", alt: "OPCW", width: 322, height: 120 },
  { src: "/logos/clients/itc.webp", alt: "ITC", width: 113, height: 120 },
  { src: "/logos/clients/bancom.webp", alt: "Bancom", width: 701, height: 120 },
  { src: "/logos/clients/falabella.svg", alt: "Falabella", width: 320, height: 125 },
  { src: "/logos/clients/audi.svg", alt: "Audi", width: 1000, height: 353 },
  { src: "/logos/clients/client-02.webp", alt: "Client", width: 102, height: 120 },
  { src: "/logos/clients/client-03.webp", alt: "Client", width: 416, height: 120 },
  { src: "/logos/clients/client-04.webp", alt: "Client", width: 120, height: 120 },
  { src: "/logos/clients/client-05.webp", alt: "Client", width: 105, height: 120 },
  { src: "/logos/clients/client-06.webp", alt: "Client", width: 204, height: 120 },
];
