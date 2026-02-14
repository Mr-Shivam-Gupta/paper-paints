import type { Metadata } from "next";
import DealerPage from "@/components/pages/DealerPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Become a Dealer",
  description:
    "Join the Paper Paints dealer network. Partner with a trusted brand for industrial and decorative coatings. Dealer registration and benefits.",
  path: "/dealer",
});

export default function Page() {
  return <DealerPage />;
}
