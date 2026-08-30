const trustPoints = [
  "Transparent process, from consultation to treatment",
  "No-pressure, no-obligation first visit",
  "Treatment plans built around your goals",
];

export function TrustSection() {
  return (
    <ul className="grid gap-6 sm:grid-cols-3">
      {trustPoints.map((point) => (
        <li
          key={point}
          className="rounded-md border border-border bg-surface p-5 text-sm font-medium text-text"
        >
          {point}
        </li>
      ))}
    </ul>
  );
}
