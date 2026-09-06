import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { business } from "@/lib/business-data";

export const metadata: Metadata = {
  title: `About — ${business.name}`,
  description:
    "Learn about our approach: a real conversation first, clear explanations, and no pressure to book on the spot.",
};

export default function AboutPage() {
  return (
    <>
      <section className="container-page pt-9 sm:pt-10">
        <SectionHeading as="h1" title={`About ${business.name}`} />
      </section>

      <section className="container-page section-spacing space-y-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-primary">Our Story</h2>
          <p className="mt-3 text-text-muted">
            [Add clinic background and story here]
          </p>
        </div>

        <div className="max-w-2xl">
          <h2 className="text-2xl text-primary">Philosophy</h2>
          <p className="mt-3 text-text-muted">
            We believe every treatment decision should start with a real
            conversation — not a sales pitch. Our approach is to listen
            first, explain clearly, and let you decide at your own pace.
          </p>
        </div>

        <div className="max-w-2xl">
          <h2 className="text-2xl text-primary">Our Approach</h2>
          <p className="mt-3 text-text-muted">
            Each visit begins with an assessment of your goals and
            concerns. From there, we discuss what&apos;s realistic, what
            to expect, and answer any questions before moving forward.
          </p>
        </div>

        <div className="max-w-2xl">
          <h2 className="text-2xl text-primary">Your Consultation</h2>
          <p className="mt-3 text-text-muted">
            Your first visit is a conversation, not a commitment. We&apos;ll
            talk through your goals, explain your options, and answer your
            questions — with no pressure to book anything on the spot.
          </p>
        </div>

        <div className="max-w-2xl">
          <h2 className="text-2xl text-primary">Our Space</h2>
          <div className="mt-3 flex aspect-video items-center justify-center rounded-md border border-dashed border-border bg-surface-alt text-sm text-text-muted">
            [Add photos of the clinic space]
          </div>
        </div>
      </section>

      <section className="container-page pb-9 sm:pb-10">
        <CTASection heading="Curious what a consultation looks like? Book yours today." />
      </section>
    </>
  );
}
