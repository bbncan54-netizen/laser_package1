"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/login/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/business-info", label: "Business Info" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faq", label: "FAQ" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col justify-between border-r border-border bg-surface p-4">
      <div>
        <p className="px-2 pb-4 font-display text-lg text-text">Admin</p>
        <ul className="space-y-1">
          {links.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-sm px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary text-white"
                      : "text-text hover:bg-surface-alt"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <form action={logoutAction}>
        <button
          type="submit"
          className="w-full rounded-sm border border-border px-3 py-2 text-left text-sm text-text-muted hover:bg-surface-alt"
        >
          Log out
        </button>
      </form>
    </nav>
  );
}
