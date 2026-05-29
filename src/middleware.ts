import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run the locale middleware on everything EXCEPT:
  //  - /api (route handlers)
  //  - Next internals (_next, _vercel)
  //  - the OG image route (/opengraph-image, no file extension)
  //  - anything with a file extension (sitemap.xml, robots.txt, *.png, etc.)
  matcher: ["/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)"],
};
