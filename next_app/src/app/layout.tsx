import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/global.css";
import { MemberProvider } from "@/integrations";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ScrollToTop } from "@/lib/scroll-to-top";
import { buildMetadata, organizationJsonLd, websiteJsonLd, SITE } from "@/lib/seo";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  ...buildMetadata({}),
  applicationName: SITE.name,
  category: "Industrial Coatings",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = organizationJsonLd();
  const webJsonLd = websiteJsonLd();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-paragraph`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webJsonLd) }}
        />
        <MemberProvider>
          <ScrollToTop />
          {children}
          <WhatsAppButton />
          <Toaster />
        </MemberProvider>
      </body>
    </html>
  );
}
