import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/global.css";
import { MemberProvider } from "@/integrations";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ScrollToTop } from "@/lib/scroll-to-top";
// import Link from "next/link"; 
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paper Paints",
  description: "Premium Coating Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-paragraph`}
      >
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
