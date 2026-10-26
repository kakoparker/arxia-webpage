// `key` maps to the `Nav` message namespace; `label` is the English fallback.
//
// The eight domains of expertise are too many for a top bar, so the nav
// carries a single `Domains` entry pointing at the homepage plate. Each
// domain's own page is reached from there (and from the footer).
//
// `wideOnly` links sit in the desktop bar from lg up only: five links do not
// fit between md and lg. They stay in the mobile menu and the footer.
export const navLinks = [
  { key: "domains", label: "Domains", href: "/#expertise" },
  { key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { key: "news", label: "News", href: "/news" },
  { key: "workWithUs", label: "Work with us", href: "/work-with-us", wideOnly: true },
  { key: "contact", label: "Contact", href: "/#contact" },
] as const;
