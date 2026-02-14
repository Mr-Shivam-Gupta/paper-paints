import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Paper Paints for technical support, quotes, and inquiries. We're here to help with your coating and paint requirements.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
