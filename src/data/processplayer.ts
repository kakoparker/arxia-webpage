// ─────────────────────────────────────────────────────────────────────────────
// PROCESSPLAYER: PRODUCTION FACTS
//
// The evidence the /e-procurement page cites for Arxia's own platform. Every
// figure here is copied from processplayer.eu (the product's own site) and
// dated with `asOf`, so the page can print a source line instead of an
// unsourced stat row. Update the numbers and `asOf` together.
//
// Proper nouns (organisations, people) live here untranslated; the roles and
// the quotes, translated from Romanian, live in messages/*.json under
// Eproc.inUse.quotes.<key>.
// ─────────────────────────────────────────────────────────────────────────────

export const PROCESSPLAYER_URL = "https://processplayer.eu/";

export const processPlayerFacts = {
  /** In production since: the e-procurement web platform case, 2016. */
  since: 2016,
  /** When the figures below were read from processplayer.eu (ISO date). */
  asOf: "2026-10",
  stats: [
    { key: "orgs", value: 50 },
    { key: "requests", value: 30000 },
    { key: "planLines", value: 17000 },
    { key: "orders", value: 8000 },
  ],
} as const;

export interface ProcessPlayerClient {
  name: string;
  src: string;
  /** Intrinsic size: every logo is trimmed and normalised to 120px high. */
  width: number;
  height: number;
}

/** The client list as processplayer.eu shows it, in the same order. */
export const processPlayerClients: ProcessPlayerClient[] = [
  { name: "Primăria Ghiroda", src: "/logos/processplayer/primaria-ghiroda.webp", width: 337, height: 120 },
  { name: "Aeroportul Internațional Brașov-Ghimbav", src: "/logos/processplayer/brasov-airport.webp", width: 489, height: 120 },
  { name: "Aeroportul Internațional Sibiu", src: "/logos/processplayer/sibiu-airport.webp", width: 202, height: 120 },
  { name: "Universitatea de Medicină, Farmacie, Științe și Tehnologie din Târgu Mureș", src: "/logos/processplayer/umfst-targu-mures.webp", width: 336, height: 120 },
  { name: "Universitatea de Medicină și Farmacie „Carol Davila”, București", src: "/logos/processplayer/umf-carol-davila.webp", width: 120, height: 120 },
  { name: "Academia Navală „Mircea cel Bătrân”, Constanța", src: "/logos/processplayer/academia-navala.webp", width: 120, height: 120 },
  { name: "Filarmonica Dinu Lipatti, Satu Mare", src: "/logos/processplayer/filarmonica-dinu-lipatti.webp", width: 276, height: 120 },
  { name: "Teatrul Stela Popescu, București", src: "/logos/processplayer/teatrul-stela-popescu.webp", width: 261, height: 120 },
  { name: "Spitalul Clinic de Psihiatrie „Dr. Gheorghe Preda”, Sibiu", src: "/logos/processplayer/spital-psihiatrie-sibiu.webp", width: 120, height: 120 },
  { name: "Direcția de Sănătate Publică Argeș", src: "/logos/processplayer/dsp-arges.webp", width: 192, height: 120 },
];

export interface ProcessPlayerTestimonial {
  /** Message key under Eproc.inUse.quotes. */
  key: "umfst" | "sibiuAirport" | "sibiuHospital";
  person: string;
  organization: string;
}

export const processPlayerTestimonials: ProcessPlayerTestimonial[] = [
  { key: "umfst", person: "Sabion Bota", organization: "Universitatea de Medicină, Farmacie, Științe și Tehnologie din Târgu Mureș" },
  { key: "sibiuAirport", person: "Ramona Balu", organization: "Aeroportul Internațional Sibiu" },
  { key: "sibiuHospital", person: "Denisa Nicoară", organization: "Spitalul Clinic de Psihiatrie „Dr. Gheorghe Preda”, Sibiu" },
];
