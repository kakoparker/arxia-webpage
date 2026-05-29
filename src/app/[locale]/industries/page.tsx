import type { Metadata } from "next";
import { IndustriesPageClient } from "./IndustriesPageClient";

export const metadata: Metadata = {
  title: "Arxia Industries — Enterprise Transformation",
  description:
    "Enterprise transformation for mining, finance, retail, universities, and beyond. Data governance, process modernization, and AI at enterprise scale.",
};

export default function IndustriesPage() {
  return <IndustriesPageClient />;
}
