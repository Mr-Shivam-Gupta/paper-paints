"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Package, Layers, Image, Users, Store, Mail, LogOut, ExternalLink } from "lucide-react";

function AdminSidebar() {
  const path = usePathname();
  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/applications", label: "Applications", icon: Layers },
    { href: "/admin/projects", label: "Projects", icon: Image },
    { href: "/admin/team", label: "Team", icon: Users },
    { href: "/admin/dealer", label: "Dealer", icon: Store },
    { href: "/admin/contact", label: "Contact", icon: Mail },
  ];
  return (
    <aside className="w-56 bg-deep-black text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="font-heading text-xl font-bold">
          Paper<span className="text-accent-red">Paints</span> Admin
        </Link>
      </div>
      <nav className="p-4 flex-1">
        <ul className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  path === href ? "bg-accent-red text-white" : "hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white/10 space-y-1">
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
            window.location.href = "/admin/login";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-light-grey text-left"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-light-grey"
        >
          <ExternalLink className="w-5 h-5" />
          Back to site
        </Link>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(path === "/admin/login");

  useEffect(() => {
    if (path === "/admin/login") {
      setReady(true);
      return;
    }
    fetch("/api/auth/check", { credentials: "include" })
      .then((r) => {
        if (r.ok) setReady(true);
        else router.replace("/admin/login");
      })
      .catch(() => router.replace("/admin/login"));
  }, [path, router]);

  if (path === "/admin/login") return <>{children}</>;
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-off-white">
        <p className="text-dark-grey">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-off-white min-h-screen">{children}</main>
    </div>
  );
}
