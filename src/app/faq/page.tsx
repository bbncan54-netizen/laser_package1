import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { faqs, business } from "@/lib/business-data";

export const metadata: Metadata = {
  title: `Frequently Asked Questions — ${business.name}`,
  description:
    "Answers to common questions about treatment, consultations, and what to expect.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="container-page pt-9 sm:pt-10">
        <SectionHeading
          as="h1"
          title="Frequently Asked Questions"
          description="Answers to common questions. Have something else in mind? We're happy to talk it through during a consultation."
        />
      </section>

      <section className="container-page section-spacing">
        <FAQAccordion items={faqs} />
      </section>

      <section className="container-page pb-9 sm:pb-10">
        <CTASection
          heading="Still have questions?"
          secondaryLabel="Contact Us"
          secondaryHref="/contact"
        />
      </section>
    </>
  );
}
