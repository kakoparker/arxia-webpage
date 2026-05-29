import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import enMessages from "../../messages/en.json";

type Messages = Record<string, unknown>;

/**
 * Deep-merge locale messages over the English base so any key that hasn't been
 * translated yet falls back to English instead of rendering a raw key path.
 */
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    if (
      b && o &&
      typeof b === "object" && typeof o === "object" &&
      !Array.isArray(b) && !Array.isArray(o)
    ) {
      out[key] = deepMerge(b as Messages, o as Messages);
    } else {
      out[key] = o;
    }
  }
  return out;
}

/**
 * Per-request message loading. The active locale comes from the URL segment
 * (resolved by the middleware); we fall back to the default locale for any
 * unknown value. Messages live in `/messages/<locale>.json`, layered over
 * the English base.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const localeMessages =
    locale === routing.defaultLocale
      ? enMessages
      : deepMerge(
          enMessages as Messages,
          (await import(`../../messages/${locale}.json`)).default as Messages,
        );

  return { locale, messages: localeMessages };
});
