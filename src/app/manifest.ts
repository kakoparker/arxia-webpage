import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arxia — Digital Transformation & Digital Public Infrastructure",
    short_name: "Arxia",
    description:
      "Digital transformation and Digital Public Infrastructure for governments, industries, and ecosystems.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D1520",
    theme_color: "#0D1520",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
