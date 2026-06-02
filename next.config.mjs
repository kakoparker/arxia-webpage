import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained Node server under .next/standalone for Docker / the
  // self-hosted Arxia deploy. Bundles only the files the server actually needs,
  // so the production image stays small. See DEPLOYMENT.md.
  output: "standalone",
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
  async redirects() {
    // Canonical URLs are /govtech/[data|process|intelligence] and
    // /industries/[data|process|intelligence]. Everything that ever lived
    // under /domains/* — including the matrix slugs that briefly rendered
    // at /domains/govtech-data etc. — 301s to its closest canonical page.
    const map = {
      // Legacy three-vertical scheme
      "digital-transformation": "/govtech/process",
      "agentic-state": "/govtech/intelligence",
      "government-portals": "/govtech/process",
      "ai-ecosystems": "/govtech/intelligence",
      "interoperability": "/govtech/data",
      "e-procurement": "/govtech/process",
      "e-invoicing": "/govtech/process",
      "e-government": "/govtech/process",
      "web-portals": "/govtech/process",
      "ai": "/govtech/intelligence",
      "ecosystem-building": "/govtech/process",
      "capacity-building": "/govtech/process",
      "internationalization": "/industries/process",
      "corporate-transformation": "/industries/process",
      "corporate-ai": "/industries/intelligence",
      "corporate-data": "/industries/data",
      // Matrix slugs that briefly rendered under /domains/*
      "govtech-data": "/govtech/data",
      "govtech-process": "/govtech/process",
      "govtech-intelligence": "/govtech/intelligence",
      "industries-data": "/industries/data",
      "industries-process": "/industries/process",
      "industries-intelligence": "/industries/intelligence",
    };

    return Object.entries(map).map(([from, to]) => ({
      source: `/domains/${from}`,
      destination: to,
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);
