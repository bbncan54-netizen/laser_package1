import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { business } from "@/lib/business-data";

export const metadata: Metadata = {
  title: `Book Your Consultation — ${business.name}`,
  description:
    "Tell us a bit about what you're looking for, and we'll follow up to schedule your consultation.",
};

export default function ContactPage() {
  return (
    <section className="container-page py-9 sm:py-10">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading
            as="h1"
            title="Book Your Consultation"
            description="Tell us a bit about what you're looking for, and we'll follow up to schedule your consultation."
          />
          <div className="mt-8 max-w-lg">
            <ContactForm />
          </div>
        </div>

        <div className="rounded-md bg-surface-alt p-6 sm:p-8 lg:mt-2">
          <h2 className="text-lg font-semibold text-primary">
            Prefer to reach us directly?
          </h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-text-muted">Phone</dt>
              <dd className="mt-0.5 font-medium text-text">{business.phone}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Email</dt>
              <dd className="mt-0.5 font-medium text-text">{business.email}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Address</dt>
              <dd className="mt-0.5 font-medium text-text">{business.address}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
