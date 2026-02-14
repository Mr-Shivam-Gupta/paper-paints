import type { Metadata } from "next";
import AdminLayoutClient from "./AdminLayoutClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Admin",
    description: "Paper Paints admin dashboard",
    path: "/admin",
    noIndex: true,
  }),
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
