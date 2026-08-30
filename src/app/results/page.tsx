import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ResultsGallery } from "@/components/ResultsGallery";
import { CTASection } from "@/components/CTASection";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { business } from "@/lib/business-data";

export const metadata: Metadata = {
  title: `Our Work — ${business.name}`,
  description:
    "Real client results will be added here with each client's permission.",
};

export default function ResultsPage() {
  return (
    <>
      <section className="container-page pt-9 sm:pt-10">
        <SectionHeading
          as="h1"
          title="Our Work"
          description="We're building a gallery of real client results, shared with permission."
        />
      </section>

      <section className="container-page section-spacing">
        <RevealOnScroll>
          <ResultsGallery />
        </RevealOnScroll>
      </section>

      <section className="container-page pb-9 sm:pb-10">
        <CTASection heading="Want to know what's possible for you? Book a consultation to discuss your goals." />
      </section>
    </>
  );
}
