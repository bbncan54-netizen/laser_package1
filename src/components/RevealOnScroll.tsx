"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The site's single orchestrated motion moment (Phase 4 §19):
 * a gentle fade + rise as major sections enter the viewport.
 * Fully inert when the user prefers reduced motion, and content
 * is always in the DOM and readable even if JS fails to run.
 */
export function RevealOnScroll({ children, className = "" }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
