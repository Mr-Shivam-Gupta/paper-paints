import type { Metadata } from "next";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import { buildMetadata, productJsonLd, absoluteUrl, SITE } from "@/lib/seo";

const apiBase = process.env.API_URL || "http://localhost:4000";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${apiBase}/api/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return buildMetadata({ title: "Product", path: `/products/${id}` });
    const product = await res.json();
    const name = product?.productName || "Product";
    const desc =
      product?.description ||
      `${name} — ${product?.category || "Coating"} from ${SITE.name}.`;
    return buildMetadata({
      title: name,
      description: desc,
      path: `/products/${id}`,
      image: product?.mainImage || null,
    });
  } catch {
    return buildMetadata({ title: "Product", path: `/products/${id}` });
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  let productJsonLdScript: React.ReactNode = null;
  try {
    const res = await fetch(`${apiBase}/api/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const product = await res.json();
      const name = product?.productName || "Product";
      const jsonLd = productJsonLd({
        name,
        description: product?.description,
        image: product?.mainImage,
        url: absoluteUrl(`/products/${id}`),
      });
      productJsonLdScript = (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      );
    }
  } catch {
    // omit Product JSON-LD on error
  }

  return (
    <>
      {productJsonLdScript}
      <ProductDetailPage />
    </>
  );
}
