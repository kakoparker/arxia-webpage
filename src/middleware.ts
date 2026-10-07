import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

/**
 * URL canonicalization in front of the locale middleware. Both redirects are
 * permanent (308) so search engines consolidate signals on one URL:
 *  - /Interoperability → /interoperability (every route and slug is lowercase)
 *  - /en/...           → /...              (English is served unprefixed;
 *                                            next-intl alone answers with 307)
 */
export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  let target = pathname;
  if (target !== target.toLowerCase()) target = target.toLowerCase();
  if (target === "/en" || target.startsWith("/en/")) target = target.slice(3) || "/";

  if (target !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  return intl(request);
}

export const config = {
  // Run the locale middleware on everything EXCEPT:
  //  - /api (route handlers)
  //  - Next internals (_next, _vercel)
  //  - the OG image route (/opengraph-image, no file extension)
  //  - anything with a file extension (sitemap.xml, robots.txt, *.png, etc.)
  matcher: ["/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)"],
};
