import { defineRouting } from "next-intl/routing";

/**
 * Locale routing config (next-intl).
 *
 * - `en` is the default and is served WITHOUT a prefix (e.g. `/govtech`), so
 *   every existing English URL keeps working unchanged.
 * - `es` / `fr` are prefixed (`/es/govtech`, `/fr/govtech`).
 *
 * `localePrefix: "as-needed"` is what produces that asymmetry.
 */
export const routing = defineRouting({
  locales: ["en", "es", "fr"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // "/" always serves English (canonical). No Accept-Language auto-redirect —
  // visitors opt into es/fr via the LocaleSwitcher. Keeps the default-locale
  // URLs stable for SEO and avoids surprising redirects.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
