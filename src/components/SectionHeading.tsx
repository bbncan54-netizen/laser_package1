type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-3xl sm:text-4xl lg:text-[3.25rem] leading-tight text-primary">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base sm:text-lg text-text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
