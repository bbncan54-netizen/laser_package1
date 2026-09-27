import Image from "next/image";

type HeroVisualProps = {
  /**
   * Path to real, licensed photography once the client supplies it
   * (e.g. "/images/hero-consultation.jpg"). Until then this component
   * renders an inline, zero-network-cost editorial placeholder instead —
   * see EditorialPlaceholder below. No stock or AI-generated photo is
   * bundled in this environment (no image-fetching/generation tool was
   * available while building this), so swapping in real photography
   * later only requires passing this prop; no further redesign needed.
   */
  imageSrc?: string;
  imageAlt?: string;
};

export function HeroVisual({ imageSrc, imageAlt }: HeroVisualProps) {
  if (imageSrc) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-surface-alt lg:aspect-[3/4]">
        <Image
          src={imageSrc}
          alt={imageAlt ?? ""}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return <EditorialPlaceholder />;
}

/**
 * Premium photography placeholder — reads clearly as "editorial image
 * goes here" rather than pretending to be a real photo (no caption
 * implying documentary content, no faces/figures). Inline SVG: no image
 * request, no decode delay, nothing to block LCP.
 *
 * Conceptually reserved for: a professional practitioner with an adult
 * client, in a premium treatment environment, realistic natural skin —
 * per the brief. Once real, licensed photography matching that brief
 * exists, pass it via the `imageSrc` prop above; this placeholder is
 * only a stand-in, never a fabricated substitute for it.
 *
 * Purely decorative (aria-hidden) — carries no information a screen
 * reader user would need.
 */
function EditorialPlaceholder() {
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-border bg-primary lg:aspect-[3/4]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="presentation"
      >
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="42%" r="70%">
            <stop offset="0%" stopColor="var(--color-primary-light)" stopOpacity="0.95" />
            <stop offset="60%" stopColor="var(--color-primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="#12211f" stopOpacity="1" />
          </radialGradient>
        </defs>

        <rect width="400" height="500" fill="url(#heroGlow)" />

        {/* Aperture motif — signals "photography reserved here" without
            depicting a person or claiming to be a real photo. */}
        <g opacity="0.85">
          <circle cx="200" cy="230" r="86" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.55" />
          <circle cx="200" cy="230" r="62" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.4" />
          <circle cx="200" cy="230" r="38" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
          <circle cx="200" cy="230" r="4" fill="var(--color-accent)" />
        </g>

        {/* Fine corner crop-marks — an editorial/photography-slot cue. */}
        {[
          { x: 28, y: 28, dx: 1, dy: 1 },
          { x: 372, y: 28, dx: -1, dy: 1 },
          { x: 28, y: 472, dx: 1, dy: -1 },
          { x: 372, y: 472, dx: -1, dy: -1 },
        ].map((c, i) => (
          <g key={i} stroke="#ffffff" strokeWidth="1.25" opacity="0.5">
            <line x1={c.x} y1={c.y} x2={c.x + 18 * c.dx} y2={c.y} />
            <line x1={c.x} y1={c.y} x2={c.x} y2={c.y + 18 * c.dy} />
          </g>
        ))}
      </svg>
    </div>
  );
}
