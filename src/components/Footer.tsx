import Link from "next/link";
import { business } from "@/lib/business-data";
import { Button } from "./Button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/results", label: "Results" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-page section-spacing">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl">{business.name}</p>
            <p className="mt-2 text-sm text-white/70">{business.tagline}</p>
            <p className="mt-4 text-sm text-white/80">{business.address}</p>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-white/60">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/90">
              <li>{business.phone}</li>
              <li>{business.email}</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-white/60">
              Navigate
            </p>
            <nav aria-label="Footer" className="mt-3 flex flex-col gap-2 text-sm">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-white/90 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/70">
            © {year} {business.name}. All rights reserved. ·{" "}
            <span className="underline decoration-white/40">Privacy Policy [Required]</span>{" "}
            ·{" "}
            <span className="underline decoration-white/40">Terms of Service [Required]</span>
          </p>
          <Button href="/contact" variant="secondary" className="border-white text-white hover:bg-white/10 w-fit">
            Book a Consultation
          </Button>
        </div>
      </div>
    </footer>
  );
}
