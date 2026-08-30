type ConsultationPathMarkProps = {
  className?: string;
  variant?: "hero" | "process";
};

/**
 * Signature element (Phase 4 §20): an abstract line illustration of the
 * consultation → plan → treatment path, grounded in this clinic's actual
 * process rather than a generic spa icon or a before/after graphic.
 */
export function ConsultationPathMark({
  className = "",
  variant = "hero",
}: ConsultationPathMarkProps) {
  const opacity = variant === "hero" ? "0.9" : "1";

  return (
    <svg
      viewBox="0 0 480 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M20 160 C 100 160, 120 60, 200 60 C 260 60, 260 140, 320 140 C 380 140, 400 40, 460 40"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={opacity}
      />
      <circle cx="20" cy="160" r="6" fill="var(--color-primary)" />
      <circle cx="200" cy="60" r="6" fill="var(--color-primary)" />
      <circle cx="320" cy="140" r="6" fill="var(--color-primary)" />
      <circle cx="460" cy="40" r="6" fill="var(--color-accent)" />
    </svg>
  );
}
