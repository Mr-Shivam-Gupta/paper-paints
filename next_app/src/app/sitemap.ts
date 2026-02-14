import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/lib/seo";

const apiBase = process.env.API_URL || "http://localhost:4000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/products"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/contact"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/gallery"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/applications"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/dealer"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${apiBase}/api/products`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const items = data?.items ?? [];
      productUrls = items.map((p: { _id: string; _updatedDate?: string }) => ({
        url: absoluteUrl(`/products/${p._id}`),
        lastModified: p._updatedDate ? new Date(p._updatedDate) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // omit product URLs if API unreachable
  }

  return [...staticRoutes, ...productUrls];
}
