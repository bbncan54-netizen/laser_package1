import { Button } from "./Button";

type CTASectionProps = {
  heading: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  heading,
  primaryLabel = "Book a Consultation",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <div className="rounded-lg bg-surface-alt px-6 py-10 text-center sm:px-12 sm:py-14">
      <p className="mx-auto max-w-xl font-display text-2xl text-primary sm:text-3xl">
        {heading}
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href={primaryHref} variant="primary">
          {primaryLabel}
        </Button>
        {secondaryLabel && secondaryHref ? (
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
