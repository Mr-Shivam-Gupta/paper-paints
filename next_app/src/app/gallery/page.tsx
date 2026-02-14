import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "View our completed projects and applications. See how Paper Paints coatings are used in real-world construction and industrial projects.",
  path: "/gallery",
});

export default function Page() {
  return <GalleryPage />;
}
