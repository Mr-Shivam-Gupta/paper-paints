import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Paper Paints — 25+ years of industry experience, ISO-certified quality, and a team dedicated to premium coating solutions across India.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
