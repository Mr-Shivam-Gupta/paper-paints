"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Package, Layers, Users, Store, Mail, LogOut, ExternalLink, Menu, X, Briefcase } from "lucide-react";

function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const path = usePathname();
  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/applications", label: "Jobs & Career", icon: Layers },
    { href: "/admin/career", label: "Career Applications", icon: Briefcase },
    { href: "/admin/team", label: "Team", icon: Users },
    { href: "/admin/dealer", label: "Dealer", icon: Store },
    { href: "/admin/contact", label: "Contact", icon: Mail },
  ];
  return (
    <>
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-deep-black text-white z-50 transform transition-transform duration-300 lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="font-heading text-xl font-bold">
            Paper<span className="text-accent-red">Paints</span> Admin
          </Link>
          <button onClick={onClose} className="lg:hidden text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {links.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
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
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
    </>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(path === "/admin/login");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 lg:ml-0 p-4 md:p-6 lg:p-8 bg-off-white min-h-screen w-full lg:w-auto">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mb-4 p-2 rounded-lg bg-white border border-dark-grey/10 hover:bg-off-white"
        >
          <Menu className="w-6 h-6 text-deep-black" />
        </button>
        {children}
      </main>
    </div>
  );
}
