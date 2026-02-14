import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  description:
    "Industrial-grade paints, cement, and coating solutions. Trusted by professionals since 1998. Premium coating solutions for construction and industry.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
