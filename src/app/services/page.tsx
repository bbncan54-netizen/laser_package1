import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { services, business } from "@/lib/business-data";

export const metadata: Metadata = {
  title: `Our Treatments — ${business.name}`,
  description:
    "An overview of our laser and skin treatments. Details and suitability are discussed during your consultation.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-page pt-9 sm:pt-10">
        <SectionHeading
          as="h1"
          title="Our Treatments"
          description="Every treatment starts with a conversation. Below is an overview of what we offer — details and suitability are discussed during your consultation."
        />
      </section>

      <section className="container-page section-spacing">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-text-muted">
          Results and treatment plans vary from person to person. Your
          provider will walk you through what to expect during your
          consultation.
        </p>
      </section>

      <section className="container-page pb-9 sm:pb-10">
        <CTASection heading="Not sure which treatment is right for you? Let's talk." />
      </section>
    </>
  );
}
