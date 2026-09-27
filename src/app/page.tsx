import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustSection } from "@/components/TrustSection";
import { ServiceCard } from "@/components/ServiceCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { business, services, faqs } from "@/lib/business-data";

export const metadata: Metadata = {
  title: `${business.name} — Laser & Med Spa in ${business.city}`,
  description:
    "Personalized laser and skin treatments, guided by a clear, no-pressure consultation process.",
};

const homeFaqPreview = faqs.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <Hero eyebrow={`${business.name} · ${business.city}, ${business.province}`} />

      {/* Trust strip */}
      <section className="container-page section-spacing pt-0 sm:pt-0 lg:pt-0">
        <TrustSection />
      </section>

      {/* Services overview */}
      <section className="bg-surface-alt">
        <div className="container-page section-spacing">
          <SectionHeading
            eyebrow="Services"
            title="A focused range of treatments"
            description="Every treatment starts with a conversation. Here's a quick look at what we offer — details and suitability are discussed during your consultation."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-8">
            <Button href="/services" variant="text">
              View All Services →
            </Button>
          </div>
        </div>
      </section>

      {/* Why choose this clinic */}
      <section className="container-page section-spacing">
        <SectionHeading eyebrow="Why Us" title="Why choose this clinic" />
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            "Clear communication at every step",
            "A calm, professional environment",
            "Treatment plans discussed — never assumed",
          ].map((point) => (
            <li key={point} className="rounded-md bg-surface-alt p-5 text-text">
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="bg-surface-alt">
        <div className="container-page section-spacing">
          <SectionHeading
            eyebrow="Process"
            title="What to expect, from your first visit onward"
          />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="container-page section-spacing">
        <SectionHeading
          eyebrow="FAQ"
          title="A few common questions before you book"
        />
        <div className="mt-8">
          <FAQAccordion items={homeFaqPreview} />
        </div>
        <div className="mt-6">
          <Link href="/faq" className="text-accent underline-offset-4 hover:underline">
            View All FAQs →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page pb-9 sm:pb-10 lg:pb-10">
        <CTASection heading="Ready to talk it through? Book a free consultation — no pressure, no obligation." />
      </section>
    </>
  );
}
