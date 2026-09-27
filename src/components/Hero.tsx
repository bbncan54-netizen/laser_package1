import { Button } from "@/components/Button";
import { HeroVisual } from "@/components/HeroVisual";

type HeroProps = {
  eyebrow: string;
};

/**
 * Home page Hero — "Luxury Editorial Medical Aesthetics" direction.
 *
 * Layout: asymmetric two-column editorial composition on desktop (text
 * grounded left, visual as the dominant focal point right); stacked
 * text-first on mobile so the H1 and primary CTA are visible without
 * scrolling past a large visual, and so the (fast, text-only) LCP
 * candidate isn't delayed by anything.
 *
 * No motion/JS dependency here — everything renders correctly with CSS
 * only, and prefers-reduced-motion is a non-issue because nothing here
 * animates on load.
 */
export function Hero({ eyebrow }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-surface-alt/50">
      <div className="container-page grid items-center gap-12 pb-14 pt-12 sm:gap-16 sm:pb-20 sm:pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">
              {eyebrow}
            </p>
          </div>

          <h1 className="text-4xl leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-[3.5rem]">
            Advanced Aesthetic &amp; Laser Care
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-muted sm:mt-7">
            Personalized treatments designed around you and your skin.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Button href="/contact" variant="primary" className="sm:px-8">
              Book a Consultation
            </Button>
            <Button href="/services" variant="secondary">
              Explore Treatments
            </Button>
          </div>
        </div>

        <div className="lg:pl-4">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
