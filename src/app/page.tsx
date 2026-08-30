import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustSection } from "@/components/TrustSection";
import { ServiceCard } from "@/components/ServiceCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ConsultationPathMark } from "@/components/ConsultationPathMark";
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
      {/* Hero */}
      <section className="container-page pt-10 pb-9 sm:pt-14 sm:pb-10 lg:pt-9">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-4xl leading-tight text-primary sm:text-5xl lg:text-[3.5rem]">
              {business.name} — Laser &amp; Med Spa in {business.city}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-text-muted">
              Personalized laser and skin treatments, guided by a clear,
              no-pressure consultation process.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="primary">
                Book a Consultation
              </Button>
              <Button href="/services" variant="secondary">
                View Our Services
              </Button>
            </div>
          </div>
          <div className="hidden lg:block" aria-hidden="true">
            <ConsultationPathMark className="w-full" variant="hero" />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-page section-spacing pt-0 sm:pt-0 lg:pt-0">
        <RevealOnScroll>
          <TrustSection />
        </RevealOnScroll>
      </section>

      {/* Services overview */}
      <section className="bg-surface-alt">
        <div className="container-page section-spacing">
          <RevealOnScroll>
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
          </RevealOnScroll>
        </div>
      </section>

      {/* Why choose this clinic */}
      <section className="container-page section-spacing">
        <RevealOnScroll>
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
        </RevealOnScroll>
      </section>

      {/* Process */}
      <section className="bg-surface-alt">
        <div className="container-page section-spacing">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Process"
              title="What to expect, from your first visit onward"
            />
            <div className="mt-10">
              <ProcessSteps />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="container-page section-spacing">
        <RevealOnScroll>
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
        </RevealOnScroll>
      </section>

      {/* Final CTA */}
      <section className="container-page pb-9 sm:pb-10 lg:pb-10">
        <RevealOnScroll>
          <CTASection heading="Ready to talk it through? Book a free consultation — no pressure, no obligation." />
        </RevealOnScroll>
      </section>
    </>
  );
}
