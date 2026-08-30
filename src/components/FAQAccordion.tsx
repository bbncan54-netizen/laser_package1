"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const headerId = `faq-header-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-medium text-primary sm:text-lg">
                  {item.question}
                </span>
                <svg
                  aria-hidden="true"
                  className={`h-5 w-5 flex-shrink-0 text-accent transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className="pb-5 pr-8 text-sm text-text-muted sm:text-base"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
