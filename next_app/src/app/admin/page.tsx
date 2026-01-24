import Link from "next/link";
import { Package, Layers, Image, Users, Store, Mail, ArrowRight } from "lucide-react";

const cards = [
  { href: "/admin/products", label: "Products", icon: Package, desc: "Manage product catalog" },
  { href: "/admin/applications", label: "Applications", icon: Layers, desc: "Manage applications & solutions" },
  { href: "/admin/projects", label: "Projects", icon: Image, desc: "Manage project gallery" },
  { href: "/admin/team", label: "Team", icon: Users, desc: "Manage team members" },
  { href: "/admin/dealer", label: "Dealer submissions", icon: Store, desc: "View dealer applications" },
  { href: "/admin/contact", label: "Contact submissions", icon: Mail, desc: "View contact form messages" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl font-bold text-deep-black mb-2">Dashboard</h1>
      <p className="text-dark-grey mb-10">Manage your site content</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(({ href, label, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="block p-6 bg-white border border-dark-grey/10 rounded-lg hover:border-accent-red/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="p-2 bg-accent-red/10 text-accent-red rounded-lg w-fit mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="font-heading text-xl font-bold text-deep-black group-hover:text-accent-red transition-colors">
                  {label}
                </h2>
                <p className="text-dark-grey text-sm mt-1">{desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-dark-grey group-hover:text-accent-red group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
