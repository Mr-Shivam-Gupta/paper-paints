import type { Metadata } from "next";
import ProductsPage from "@/components/pages/ProductsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Explore our range of industrial paints, cement coatings, and premium coating solutions. Technical specifications, features, and brochures.",
  path: "/products",
});

export default function Page() {
  return <ProductsPage />;
}
