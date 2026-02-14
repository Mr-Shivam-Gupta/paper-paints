import type { Metadata } from "next";
import ApplicationsPage from "@/components/pages/ApplicationsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Applications",
  description:
    "Discover where Paper Paints products are used — industrial, decorative, and protective coating applications across sectors.",
  path: "/applications",
});

export default function Page() {
  return <ApplicationsPage />;
}
