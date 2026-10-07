// Lightweight case-study helpers for client components (cards, video player).
//
// Kept apart from case-studies.ts on purpose: that module carries the full
// case-study content in every locale, and importing it from a client
// component ships all of it to the browser. These helpers need only slugs.
// case-studies.ts verifies at load time that CASE_STUDY_SLUGS matches its
// data, so the two cannot drift.

/** Slugs of every project that has a case study page. */
export const CASE_STUDY_SLUGS: readonly string[] = ["romania-ukrainian-interop"];

export function hasCaseStudy(slug: string): boolean {
  return CASE_STUDY_SLUGS.includes(slug);
}

/** Where a project's card should lead: its case study page. */
export function caseStudyHref(slug: string): string {
  return `/portfolio/${slug}`;
}

/** YouTube's 4:5 poster frame (the "oar" thumbnail); served through next/image. */
export function videoPoster(video: { youtubeId: string }): string {
  return `https://i.ytimg.com/vi/${video.youtubeId}/oardefault.jpg`;
}

/** "1:22" */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}
