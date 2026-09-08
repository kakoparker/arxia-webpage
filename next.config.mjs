import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't advertise the framework/version in responses.
  poweredByHeader: false,
  images: {
    // WebP only — AVIF's denoiser strips the subtle blueprint-grid texture
    // baked into our canonical paper surfaces, breaking the brand standard.
    // WebP encodes at higher fidelity for the same target quality.
    formats: ["image/webp"],
    // SVGs in /public/logos/clients are vendored, statically known files
    // (Wikimedia Commons sources). CSP blocks any script execution at the
    // browser layer; this only enables next/image to optimize them.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  productionBrowserSourceMaps: false,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    // Safe, non-breaking hardening applied to every response. (A full
    // Content-Security-Policy is intentionally NOT set here — it needs dedicated
    // testing against GSAP, Plausible, and Google Fonts; tracked as a follow-up.
    // HSTS is added at the Caddy/TLS layer in production — see Caddyfile.)
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    // Canonical URLs are the three top-level domains of expertise:
    // /data, /process and /intelligence (plus /es and /fr prefixes).
    //
    // Two generations of URLs 301 into them:
    //   1. The 2×3 matrix era — /govtech/* and /industries/*. The Industries
    //      vertical was retired and the Govtech wrapper collapsed when the
    //      company refocused entirely on DPI and digital government.
    //   2. The /domains/* era, including the matrix slugs that briefly
    //      rendered there.
    // Every rule points at its FINAL target so nothing chains through a
    // second hop.
    const DOMAINS = ["data", "process", "intelligence"];
    const LOCALE = ":locale(es|fr)";

    // Retired vertical routes. The vertical landing pages have no successor
    // (the whole company is now that vertical), so they go to the homepage.
    const verticalRoutes = ["govtech", "industries"].flatMap((vertical) => [
      { source: `/${vertical}`, destination: "/", permanent: true },
      {
        source: `/${LOCALE}/${vertical}`,
        destination: "/:locale",
        permanent: true,
      },
      ...DOMAINS.flatMap((domain) => [
        {
          source: `/${vertical}/${domain}`,
          destination: `/${domain}`,
          permanent: true,
        },
        {
          source: `/${LOCALE}/${vertical}/${domain}`,
          destination: `/:locale/${domain}`,
          permanent: true,
        },
      ]),
    ]);

    // Legacy /domains/* slugs. English-only: these URLs predate i18n.
    const legacyDomainSlugs = {
      // Three-vertical scheme
      "digital-transformation": "/process",
      "agentic-state": "/intelligence",
      "government-portals": "/process",
      "ai-ecosystems": "/intelligence",
      interoperability: "/data",
      "e-procurement": "/process",
      "e-invoicing": "/process",
      "e-government": "/process",
      "web-portals": "/process",
      ai: "/intelligence",
      "ecosystem-building": "/process",
      "capacity-building": "/process",
      internationalization: "/process",
      "corporate-transformation": "/process",
      "corporate-ai": "/intelligence",
      "corporate-data": "/data",
      // Matrix slugs that briefly rendered under /domains/*
      "govtech-data": "/data",
      "govtech-process": "/process",
      "govtech-intelligence": "/intelligence",
      "industries-data": "/data",
      "industries-process": "/process",
      "industries-intelligence": "/intelligence",
    };

    return [
      ...verticalRoutes,
      ...Object.entries(legacyDomainSlugs).map(([from, to]) => ({
        source: `/domains/${from}`,
        destination: to,
        permanent: true,
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
