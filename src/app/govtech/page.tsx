import type { Metadata } from "next";
import { GovtechPageClient } from "./GovtechPageClient";

export const metadata: Metadata = {
  title: "Arxia Govtech — Digital Public Infrastructure",
  description:
    "Digital public infrastructure for governments and international organizations. Data interoperability, service design, e-procurement, e-invoicing, and agentic AI for the public sector.",
};

export default function GovtechPage() {
  return <GovtechPageClient />;
}
