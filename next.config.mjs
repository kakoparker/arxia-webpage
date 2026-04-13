/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  productionBrowserSourceMaps: false,
  serverExternalPackages: [],
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
