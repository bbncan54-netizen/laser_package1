import { processSteps } from "@/lib/business-data";

export function ProcessSteps() {
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {processSteps.map((step, index) => (
        <li key={step.number} className="relative">
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl text-accent">{step.number}</span>
            {index < processSteps.length - 1 ? (
              <span
                className="hidden h-px flex-1 bg-border md:block"
                aria-hidden="true"
              />
            ) : null}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-primary">{step.title}</h3>
          <p className="mt-2 text-sm text-text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
