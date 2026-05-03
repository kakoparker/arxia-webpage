/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
    return [
      {
        source: "/domains/e-government",
        destination: "/domains/digital-transformation",
        permanent: true,
      },
      {
        source: "/domains/ai",
        destination: "/domains/agentic-state",
        permanent: true,
      },
      {
        source: "/domains/web-portals",
        destination: "/domains/government-portals",
        permanent: true,
      },
      {
        source: "/domains/ecosystem-building",
        destination: "/domains/ai-ecosystems",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
