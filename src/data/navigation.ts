// `key` maps to the `Nav` message namespace; `label` is the English fallback.
//
// The three domains of expertise sit at the top level of the site. They
// replaced the `Govtech` / `Industries` vertical links when the Industries
// vertical was retired and the audience layer stopped branching.
export const navLinks = [
  { key: "data", label: "Data", href: "/data" },
  { key: "process", label: "Process", href: "/process" },
  { key: "intelligence", label: "Intelligence", href: "/intelligence" },
  { key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { key: "news", label: "News", href: "/#news" },
  { key: "contact", label: "Contact", href: "/#contact" },
] as const;
