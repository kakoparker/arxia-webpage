import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation APIs. Use these `Link` / `redirect` / `usePathname`
 * / `useRouter` instead of the ones from `next/link` and `next/navigation`
 * for any navigation BETWEEN pages — they automatically keep the active
 * locale prefix. (In-page hash links like `#contact` can stay as plain <a>.)
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
