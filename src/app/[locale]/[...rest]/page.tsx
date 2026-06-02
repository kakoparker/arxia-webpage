import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths under a locale. Without this, an unmatched URL
 * could fall through to the framework's global 404 (which has no root layout
 * in this i18n setup). Routing here lets the locale layout render our branded
 * not-found page instead.
 */
export default function CatchAllPage() {
  notFound();
}
