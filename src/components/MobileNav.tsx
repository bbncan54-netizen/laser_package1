"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./Button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/results", label: "Results" },
  { href: "/faq", label: "FAQ" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-50 flex h-11 w-11 items-center justify-center rounded-sm"
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <div className="flex flex-col gap-1.5">
          <span
            className={`block h-0.5 w-6 bg-primary transition-transform ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-primary transition-opacity ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-primary transition-transform ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-primary px-6 pb-10 pt-24 text-white"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-3xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            href="/contact"
            variant="primary"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Book a Consultation
          </Button>
        </div>
      ) : null}
    </div>
  );
}
