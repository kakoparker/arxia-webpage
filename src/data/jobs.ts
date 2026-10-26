// Open roles shown on /work-with-us. English is the source; Spanish and French
// overlays live in ./i18n/jobs.{es,fr}.ts, keyed by slug. List fields are
// replaced whole by an overlay, so a translation must carry every item.

export interface JobOpening {
  slug: string;
  /** Display date, formatted for the requested locale from `isoDate`. */
  date: string;
  /** Date the role was posted (JobPosting datePosted). */
  isoDate: string;
  title: string;
  /** Short title for <title> and share cards (max 52 chars). Falls back to `title`. */
  seoTitle?: string;
  excerpt: string;
  metaDescription: string;
  /** Display location, e.g. "Remote, with international travel". */
  location: string;
  /** Remote roles are marked TELECOMMUTE in the JobPosting schema. */
  remote: boolean;
  /** schema.org employmentType value. */
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR";
  /** Working languages, shown as tags. */
  languages: string[];
  intro: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

/** Source records: `date` is derived from `isoDate` per locale. */
type JobOpeningSource = Omit<JobOpening, "date">;

/** Fields a translation may override. */
export type JobOpeningOverlay = Partial<
  Pick<
    JobOpening,
    | "title"
    | "seoTitle"
    | "excerpt"
    | "metaDescription"
    | "location"
    | "languages"
    | "intro"
    | "responsibilities"
    | "requirements"
    | "niceToHave"
  >
>;

// Newest first.
const jobSources: JobOpeningSource[] = [
  {
    slug: "head-of-international-business-and-ai-operations",
    isoDate: "2026-07-26",
    title: "Head of International Business and AI Operations",
    seoTitle: "Head of International Business and AI Operations",
    excerpt:
      "Lead Arxia's business operations on the international market, with a focus on international institutions and governments, and run them with AI at the core.",
    metaDescription:
      "Arxia is hiring a Head of International Business and AI Operations to lead its international business with institutions and governments. Spanish, English, Portuguese.",
    location: "Remote, with international travel",
    remote: true,
    employmentType: "FULL_TIME",
    languages: ["Spanish", "English", "Portuguese"],
    intro: [
      "Arxia is looking for a Head of International Business and AI Operations to lead the company's business operations on the international market, particularly with international institutions and governments.",
      "The role brings business development and operations together. It covers how opportunities are found, qualified, bid and delivered, and how AI makes that work faster and better at every step.",
    ],
    responsibilities: [
      "Lead Arxia's international business development, from market positioning to signed contracts.",
      "Build and manage relationships with international institutions, development partners and government counterparts.",
      "Own the bidding pipeline: identifying tenders, qualifying them, building consortia and delivering proposals.",
      "Design and run AI-assisted business operations across sales, bidding, CRM and reporting.",
      "Represent Arxia at international events, missions and partner meetings.",
      "Work with the CEO on commercial strategy, pricing and entry into new markets.",
    ],
    requirements: [
      "A degree in Political Science or International Relations.",
      "At least 10 years of experience in business development.",
      "Experience in Govtech, digital government and Digital Public Infrastructure (DPI).",
      "Advanced use of AI for business operations.",
      "Fluent Spanish, English and Portuguese.",
      "Availability to travel internationally.",
    ],
    niceToHave: [
      "Experience with the procurement rules of multilateral development banks and UN agencies.",
      "A professional network in Latin America, Africa or Europe.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Localization — overlay translated text by stable slug; missing fields fall back.
// ─────────────────────────────────────────────────────────────────────────────
import { jobsEs } from "./i18n/jobs.es";
import { jobsFr } from "./i18n/jobs.fr";

const JOB_OVERLAYS: Record<string, Record<string, JobOpeningOverlay>> = {
  es: jobsEs,
  fr: jobsFr,
};

const DATE_LOCALES: Record<string, string> = { en: "en-US", es: "es-ES", fr: "fr-FR" };

function formatJobDate(isoDate: string, locale: string): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale] ?? DATE_LOCALES.en, {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

function localizeJob(j: JobOpeningSource, locale: string): JobOpening {
  const date = formatJobDate(j.isoDate, locale);
  const ov = locale === "en" ? undefined : JOB_OVERLAYS[locale]?.[j.slug];
  if (!ov) return { ...j, date };
  return {
    ...j,
    ...ov,
    date,
    // A localized role without its own SEO title uses its localized title.
    seoTitle: ov.seoTitle ?? (ov.title ? undefined : j.seoTitle),
  };
}

const byNewest = (a: JobOpeningSource, b: JobOpeningSource) =>
  b.isoDate.localeCompare(a.isoDate);

/** Every slug, for static params and the sitemap. */
export const jobSlugs: string[] = jobSources.map((j) => j.slug);

/** All open roles, newest first, localized. */
export function getJobOpenings(locale: string = "en"): JobOpening[] {
  return [...jobSources].sort(byNewest).map((j) => localizeJob(j, locale));
}

export function getJobOpening(slug: string, locale: string = "en"): JobOpening | undefined {
  const j = jobSources.find((j) => j.slug === slug);
  return j ? localizeJob(j, locale) : undefined;
}
