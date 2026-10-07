// `key` maps to the `Nav` message namespace; `label` is the English fallback.
//
// The eight domains of expertise are too many for a top bar, so the nav
// carries a single `Domains` entry pointing at the homepage plate. Each
// domain's own page is reached from there (and from the footer).
export const navLinks = [
  { key: "domains", label: "Domains", href: "/#expertise" },
  { key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { key: "news", label: "News", href: "/news" },
  { key: "contact", label: "Contact", href: "/#contact" },
] as const;
