// ─────────────────────────────────────────────────────────────────────────────
// Case studies — the in-depth landing pages behind featured portfolio projects.
//
// A case study is keyed by its portfolio project's `slug`, so the project card
// (title, client, country, year, category) stays the single source for those
// facts and the case study only adds the long-form story. Every project with a
// case study is a *featured project*: it leads the homepage portfolio strip,
// opens the /portfolio page, and lives at /portfolio/<slug>.
//
// Content is written in English here; es/fr carry complete translations of the
// same shape in ./i18n/case-studies.{es,fr}.ts. A missing translation falls
// back to English.
// ─────────────────────────────────────────────────────────────────────────────

import {
  CASE_STUDY_SLUGS,
  caseStudyHref,
  formatDuration,
  hasCaseStudy,
  videoPoster,
} from "./case-study-links";
import { caseStudiesEs } from "./i18n/case-studies.es";
import { caseStudiesFr } from "./i18n/case-studies.fr";

/** A YouTube video shown on the first screen of the case study. */
export interface CaseStudyVideo {
  youtubeId: string;
  /** Shorts are 9:16; regular uploads 16:9. Sets the player frame. */
  orientation: "vertical" | "landscape";
  /** ISO 8601, for the VideoObject schema. */
  uploadDate: string;
  durationSeconds: number;
}

export type CaseStudyIcon = "translation" | "case-rails" | "migration" | "social-protection" | "multilingual";

/** The three line drawings of the impact section. */
export type ImpactFigure = "burden" | "speed" | "institutions";

export interface CaseStudyContent {
  /** Short display title (the project's catalogue title is longer). */
  title: string;
  /** Kind of work, shown above the title: "Inclusive and interoperable digital services". */
  eyebrow: string;
  /** Practice tags: "Service integration", "Citizen e-services". */
  practices: string[];
  lede: string;
  /** One or two sentences for the featured-project plates. */
  summary: string;
  metaDescription: string;
  metrics: { value: string; label: string }[];
  problem: { heading: string; paragraphs: string[] };
  solution: {
    heading: string;
    intro: string;
    figCaption: string;
    /** Reads "from → to" across the top of the workflow figure. */
    figFrom: string;
    figTo: string;
    steps: { title: string; text: string }[];
    beneathLabel: string;
    layers: { title: string; text: string; icon: CaseStudyIcon }[];
  };
  results: { heading: string; outcomes: { title: string; text: string }[] };
  impact: { heading: string; items: { title: string; figure: ImpactFigure }[] };
  apply: {
    heading: string;
    body: string;
    figCaption: string;
    /** The gateway pattern: who comes in, the shared core, the services behind it. */
    pattern: { users: string; core: string; services: string[] };
    uses: { title: string; text: string; icon: CaseStudyIcon }[];
  };
  cta: { heading: string; body: string };
  videoTitle: string;
  /** Short description of the video for screen readers and the schema. */
  videoDescription: string;
}

export interface CaseStudy {
  /** Same slug as the portfolio project it expands. */
  slug: string;
  /** ISO date the case study was published; used for schema + sitemap. */
  publishedAt: string;
  video?: CaseStudyVideo;
  content: CaseStudyContent;
}

// ─────────────────────────────────────────────────────────────────────────────

const caseStudies: CaseStudy[] = [
  {
    slug: "romania-ukrainian-interop",
    publishedAt: "2026-10-06",
    video: {
      youtubeId: "fUgdNnoQV_k",
      orientation: "vertical",
      uploadDate: "2026-10-06T03:07:51-07:00",
      durationSeconds: 82,
    },
    content: {
      title: "Interoperable Refugee Services",
      eyebrow: "Inclusive and interoperable digital services",
      practices: ["Service integration", "Citizen e-services"],
      lede:
        "How Romania brought social protection, education and employment for Ukrainian refugees onto a single multilingual platform — a World Bank–financed programme, and a model the EU has since cited.",
      summary:
        "Social protection, education and employment for Ukrainian refugees, brought onto one multilingual platform. One account, reused across agencies.",
      metaDescription:
        "Case study: how Romania brought social protection, education and employment for Ukrainian refugees onto one multilingual, interoperable platform. World Bank–financed, cited by the EU.",
      metrics: [
        { value: "3", label: "Service domains, one journey" },
        { value: "1", label: "Account, reused across agencies" },
        { value: "3", label: "Languages · UA RO EN, AI translation" },
        { value: "EU", label: "Cited as a crisis response reference" },
      ],
      problem: {
        heading: "The problem",
        paragraphs: [
          "Hundreds of thousands of people arriving from Ukraine met a service landscape built for someone else. Cash benefits, school enrolment and job placement sat with different institutions, each with its own process, forms and IT system — none designed for multilingual use or joined-up case management.",
          "Forms were in Romanian only and institutions improvised with volunteer translators. Generous policies existed; the people they were written for could not reach them.",
        ],
      },
      solution: {
        heading: "How we solved it",
        intro:
          "We started with the processes, not the software. Journeys in all three domains were mapped with front-line staff and rebuilt around one rule: identity and basic data are captured once, then reused securely across every institution.",
        figCaption: "The service workflow",
        figFrom: "Fragmented intake",
        figTo: "One inclusive gateway",
        steps: [
          { title: "Map", text: "Three domains walked end to end with the institutions that run them." },
          { title: "Redesign", text: "The journey rebuilt from the refugee’s side; duplication and dead steps cut." },
          { title: "Register once", text: "Identity and basic data captured a single time, then reused securely." },
          { title: "One gateway", text: "Benefits, school places and jobs reached from one account, any device." },
          { title: "Case closed", text: "Routed to the right institution, tracked to delivery." },
        ],
        beneathLabel: "Running beneath every step",
        layers: [
          {
            title: "AI translation layer",
            text: "Forms, notifications and messages rendered in UA, RO or EN — no interpreter in the middle.",
            icon: "translation",
          },
          {
            title: "Cross-agency case rails",
            text: "One case file across institutions; NGOs and front-line staff can act on a person’s behalf.",
            icon: "case-rails",
          },
        ],
      },
      results: {
        heading: "The result",
        outcomes: [
          { title: "One entry point, in service", text: "Three service areas reachable from a single multilingual account." },
          { title: "Translation as infrastructure", text: "Language handled by the platform, not by improvised interpreters." },
          { title: "Recognised at EU level", text: "An inclusive response that strengthened national systems, not bypassed them." },
        ],
      },
      impact: {
        heading: "The impact: a sustainable solution to an ongoing crisis",
        items: [
          { title: "Lower administrative burden", figure: "burden" },
          { title: "Faster route to entitlements", figure: "speed" },
          { title: "Institutions working as one", figure: "institutions" },
        ],
      },
      apply: {
        heading: "Let’s apply this pattern in your country",
        body:
          "The crisis exposed the fragmentation; it did not create it. Any life event crossing several agencies meets the same wall. The gateway pattern holds; only the services behind it change.",
        figCaption: "The gateway pattern",
        pattern: {
          users: "Citizen · Refugee · NGO caseworker",
          core: "One account + AI translation layer",
          services: ["Benefits", "Schools", "Employment"],
        },
        uses: [
          { title: "Displacement & migration", text: "Standing capacity, ready before the next arrival wave.", icon: "migration" },
          { title: "Social protection at large", text: "One case file per household, not per agency.", icon: "social-protection" },
          { title: "Multilingual public services", text: "Minority and diaspora languages served by default.", icon: "multilingual" },
        ],
      },
      cta: {
        heading: "Let’s talk.",
        body:
          "If your institutions are serving people across agency and language boundaries, we have built this end to end — process redesign, platform and rollout under crisis conditions.",
      },
      videoTitle: "Interoperable Refugee Services — the case in 80 seconds",
      videoDescription:
        "A short film on how Romania rebuilt refugee journeys across social protection, education and employment around one account and an AI translation layer.",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────

const CONTENT_OVERLAYS: Record<string, Record<string, CaseStudyContent>> = {
  es: caseStudiesEs,
  fr: caseStudiesFr,
};

function localize(cs: CaseStudy, locale: string): CaseStudy {
  if (locale === "en") return cs;
  const content = CONTENT_OVERLAYS[locale]?.[cs.slug];
  return content ? { ...cs, content } : cs;
}

/** Slugs of every project that has a case study page. */
export const caseStudySlugs: string[] = caseStudies.map((c) => c.slug);

// Client components read the slug list from case-study-links.ts so they don't
// bundle this module's content. Fail loudly if the two ever disagree.
if (
  caseStudySlugs.length !== CASE_STUDY_SLUGS.length ||
  caseStudySlugs.some((s) => !CASE_STUDY_SLUGS.includes(s))
) {
  throw new Error(
    "case-study-links.ts CASE_STUDY_SLUGS is out of sync with case-studies.ts",
  );
}

export { hasCaseStudy, caseStudyHref, videoPoster, formatDuration };

export function getCaseStudy(slug: string, locale: string = "en"): CaseStudy | undefined {
  const cs = caseStudies.find((c) => c.slug === slug);
  return cs ? localize(cs, locale) : undefined;
}

/** All case studies, in the order they should be featured. */
export function getCaseStudies(locale: string = "en"): CaseStudy[] {
  return caseStudies.map((c) => localize(c, locale));
}


