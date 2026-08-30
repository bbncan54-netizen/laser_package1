/**
 * Centralized business configuration.
 *
 * This is a FICTIONAL Pixflow portfolio project, not a real client website.
 * Every field marked [CLIENT INPUT REQUIRED] or [Placeholder] must be
 * replaced with verified, real business information before this template
 * is ever used for an actual client. Nothing here should be treated as
 * real business fact.
 */

export const business = {
  name: "[Business Name]",
  tagline: "Laser & Med Spa",
  city: "[City]",
  province: "[Province]",
  address: "[Business Address]",
  phone: "[Phone Number]",
  email: "[email@example.com]",
  responseWindow: "[X] business days",
} as const;

export type Service = {
  slug: string;
  name: string;
  description: string;
};

// Treatment names and descriptions are structural placeholders only.
// Exact treatment lineup, descriptions, and pricing are [CLIENT INPUT REQUIRED].
export const services: Service[] = [
  {
    slug: "laser-hair-removal",
    name: "[Treatment Name — e.g. Laser Hair Removal]",
    description:
      "[Brief, factual description of the treatment — no outcome claims. CLIENT INPUT REQUIRED.]",
  },
  {
    slug: "skin-rejuvenation",
    name: "[Treatment Name — e.g. Skin Rejuvenation]",
    description:
      "[Brief, factual description of the treatment — no outcome claims. CLIENT INPUT REQUIRED.]",
  },
  {
    slug: "additional-treatment",
    name: "[Treatment Name — additional service]",
    description:
      "[Brief, factual description of the treatment — no outcome claims. CLIENT INPUT REQUIRED.]",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description: "We listen and assess what's right for you.",
  },
  {
    number: "02",
    title: "Personalized Plan",
    description: "A treatment approach built around your goals.",
  },
  {
    number: "03",
    title: "Treatment",
    description:
      "Delivered by [Provider Title — CLIENT INPUT REQUIRED].",
  },
];

export const faqs = [
  {
    question: "Does treatment hurt?",
    answer:
      "Comfort levels vary by treatment and by individual. Your provider will explain what to expect and how discomfort is managed before starting.",
  },
  {
    question: "How many sessions might I need?",
    answer:
      "This depends on the treatment and your individual goals. A specific plan is discussed during your consultation.",
  },
  {
    question: "How much does treatment cost?",
    answer:
      "Pricing depends on the treatment and plan discussed during your consultation. [Pricing details — CLIENT INPUT REQUIRED]",
  },
  {
    question: "What happens during a consultation?",
    answer:
      "We'll talk through your goals, review your options, and answer your questions. There's no obligation to book treatment afterward.",
  },
  {
    question: "Is this treatment suitable for everyone?",
    answer:
      "Suitability varies by individual and treatment type. This is assessed during your consultation.",
  },
  {
    question: "What should I expect before or after an appointment?",
    answer:
      "Your provider will walk you through any preparation or aftercare specific to your treatment.",
  },
];

export const siteConfig = {
  siteName: `${business.name} — ${business.tagline}`,
  baseUrl: "https://example-pixflow-demo.vercel.app",
  defaultTitle: `${business.name} — Laser & Med Spa in ${business.city}`,
  defaultDescription:
    "Personalized laser and skin treatments, guided by a clear, no-pressure consultation process. Book a consultation today.",
  locale: "en-CA",
} as const;
