"use client";

import { FormEvent, useRef, useState } from "react";
import { business, services } from "@/lib/business-data";
import { Button } from "./Button";

type FormStatus = "idle" | "loading" | "success" | "error";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Only fields with validation rules need a ref for focus management.
// Order matters here: it defines which invalid field receives focus first
// after a failed submission (top-to-bottom form order).
type ValidatedField = "name" | "email" | "service";
const FIELD_ORDER: ValidatedField[] = ["name", "email", "service"];

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  const fieldRefs: Record<
    ValidatedField,
    React.RefObject<HTMLInputElement | HTMLSelectElement>
  > = {
    name: nameRef,
    email: emailRef,
    service: serviceRef,
  };

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate(): Partial<Record<keyof FormValues, string>> {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.service) {
      nextErrors.service = "Please select a service of interest.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field, in form order, so keyboard
      // and screen-reader users land directly on what needs fixing.
      const firstInvalidField = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalidField) {
        fieldRefs[firstInvalidField].current?.focus();
      }
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-md border border-success/30 bg-surface-alt p-6 text-center sm:p-8"
      >
        <p className="text-lg font-semibold text-primary">Thank you!</p>
        <p className="mt-2 text-text-muted">
          Your consultation request has been received. We&apos;ll be in touch
          within {business.responseWindow}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === "error" ? (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-sm border border-error/30 bg-error/5 p-4 text-sm text-error"
        >
          Something went wrong. Please try again, or reach us directly at{" "}
          {business.phone}.
        </div>
      ) : null}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text">
          Full Name
        </label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          type="text"
          placeholder="Jane Doe"
          value={values.name}
          onChange={handleChange}
          disabled={status === "loading"}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted/70"
        />
        {errors.name ? (
          <p id="name-error" role="alert" className="mt-1.5 text-sm text-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">
          Email Address
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          disabled={status === "loading"}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted/70"
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="mt-1.5 text-sm text-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-text">
          Phone Number (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(xxx) xxx-xxxx"
          value={values.phone}
          onChange={handleChange}
          disabled={status === "loading"}
          className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted/70"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-text">
          Service of Interest
        </label>
        <select
          ref={serviceRef}
          id="service"
          name="service"
          value={values.service}
          onChange={handleChange}
          disabled={status === "loading"}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "service-error" : undefined}
          className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-text"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.service ? (
          <p id="service-error" role="alert" className="mt-1.5 text-sm text-error">
            {errors.service}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text">
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us a bit about what you're looking for"
          value={values.message}
          onChange={handleChange}
          disabled={status === "loading"}
          className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted/70"
        />
      </div>

      <p className="text-sm text-text-muted">
        Your information is only used to respond to your request.
      </p>

      <Button
        type="submit"
        variant="primary"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Book a Consultation"}
      </Button>
    </form>
  );
}
