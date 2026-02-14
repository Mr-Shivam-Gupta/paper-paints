/**
 * Central SEO config and helpers for Paper Paints.
 * Used for metadata, Open Graph, Twitter, and JSON-LD.
 */

export const SITE = {
  name: "Paper Paints",
  tagline: "Premium Coating Solutions",
  description:
    "Industrial-grade paints, cement, and coating solutions engineered for durability and excellence. Trusted by professionals across the construction industry since 1998.",
  /** Base URL for canonical and OG. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://paperpaints.com",
  locale: "en_IN",
  twitterHandle: "@paperpaints",
  keywords: [
    "industrial paints",
    "coating solutions",
    "cement paint",
    "construction paint",
    "premium coatings",
    "Paper Paints",
    "India",
  ],
} as const;

export type MetadataParams = {
  title?: string;
  description?: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image = null,
  noIndex = false,
  type = "website",
}: MetadataParams) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} – ${SITE.tagline}`;
  const desc = description || SITE.description;
  const canonical = path ? absoluteUrl(path) : SITE.url;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl("/images/resources/logo.png");

  return {
    title: fullTitle,
    description: desc,
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    metadataBase: new URL(SITE.url),
    alternates: { canonical },
    openGraph: {
      type,
      locale: SITE.locale,
      url: canonical,
      siteName: SITE.name,
      title: fullTitle,
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
      creator: SITE.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

/** JSON-LD Organization for the site (use in root layout). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    foundingDate: "1998",
    logo: absoluteUrl("/favicon.ico"),
  };
}

/** JSON-LD WebSite with search action (optional). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: organizationJsonLd(),
  };
}

/** JSON-LD for a product page. */
export function productJsonLd(params: {
  name: string;
  description?: string;
  image?: string;
  url: string;
}) {
  const { name, description, image, url } = params;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description || SITE.description,
    image: image ? absoluteUrl(image) : undefined,
    url,
  };
}
