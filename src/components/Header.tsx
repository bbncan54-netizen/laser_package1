import Link from "next/link";
import { business } from "@/lib/business-data";
import { Button } from "./Button";
import { MobileNav } from "./MobileNav";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/results", label: "Results" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between lg:h-[72px]">
        <Link
          href="/"
          className="font-display text-lg font-medium text-primary lg:text-xl"
        >
          {business.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" variant="primary">
            Book a Consultation
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
