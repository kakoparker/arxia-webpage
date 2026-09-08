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
    // Canonical URLs are the eight domains of expertise, at the top level:
    //   /digital-transformation  /interoperability  /data-governance
    //   /e-procurement  /e-invoicing  /web-portals  /agentic-state
    //   /e-services
    // (plus /es and /fr prefixes).
    //
    // Three retired generations of URLs 301 into them:
    //   1. The two-vertical era — /govtech/* and /industries/*.
    //   2. The three-division era — /data, /process, /intelligence. Each goes
    //      to the domain that carried the bulk of its content.
    //   3. The /domains/* era, including the matrix slugs that briefly
    //      rendered there.
    // Every rule points at its FINAL target so nothing chains.
    const LOCALE = ":locale(es|fr)";

    /** Same rule for the unprefixed (en) path and the /es · /fr prefixes. */
    const both = (from, to) => [
      { source: from, destination: to, permanent: true },
      {
        source: `/${LOCALE}${from}`,
        destination: `/:locale${to === "/" ? "" : to}`,
        permanent: true,
      },
    ];

    // The three divisions → the domain that inherited most of their content.
    const divisions = {
      "/data": "/interoperability",
      "/process": "/digital-transformation",
      "/intelligence": "/agentic-state",
    };

    // Retired vertical landing pages have no successor (the whole company is
    // now that vertical), so they go home; their domain children map across.
    const verticalRoutes = ["govtech", "industries"].flatMap((v) => [
      ...both(`/${v}`, "/"),
      ...Object.entries(divisions).flatMap(([division, target]) =>
        both(`/${v}${division}`, target),
      ),
    ]);

    const divisionRoutes = Object.entries(divisions).flatMap(([from, to]) =>
      both(from, to),
    );

    // Legacy /domains/* slugs. English-only: these URLs predate i18n.
    const legacyDomainSlugs = {
      // Three-vertical scheme
      "digital-transformation": "/digital-transformation",
      "agentic-state": "/agentic-state",
      "government-portals": "/web-portals",
      "ai-ecosystems": "/agentic-state",
      interoperability: "/interoperability",
      "e-procurement": "/e-procurement",
      "e-invoicing": "/e-invoicing",
      "e-government": "/digital-transformation",
      "web-portals": "/web-portals",
      ai: "/agentic-state",
      "ecosystem-building": "/digital-transformation",
      "capacity-building": "/digital-transformation",
      internationalization: "/digital-transformation",
      "corporate-transformation": "/digital-transformation",
      "corporate-ai": "/agentic-state",
      "corporate-data": "/data-governance",
      // Matrix slugs that briefly rendered under /domains/*
      "govtech-data": "/interoperability",
      "govtech-process": "/digital-transformation",
      "govtech-intelligence": "/agentic-state",
      "industries-data": "/data-governance",
      "industries-process": "/digital-transformation",
      "industries-intelligence": "/agentic-state",
    };

    return [
      ...verticalRoutes,
      ...divisionRoutes,
      ...Object.entries(legacyDomainSlugs).map(([from, to]) => ({
        source: `/domains/${from}`,
        destination: to,
        permanent: true,
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
