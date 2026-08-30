import { Service } from "@/lib/business-data";
import { Button } from "./Button";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex h-full flex-col rounded-md border border-border bg-surface p-6 transition-shadow hover:shadow-md">
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-surface-alt text-primary"
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-primary">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-text-muted">{service.description}</p>
      <p className="mt-4 text-xs text-text-muted">
        Suitability and results vary by individual and are discussed during consultation.
      </p>
      <Button href="/contact" variant="text" className="mt-4 self-start">
        Book a Consultation →
      </Button>
    </div>
  );
}
