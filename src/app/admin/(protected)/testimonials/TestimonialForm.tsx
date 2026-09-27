"use client";

import { useFormState } from "react-dom";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import { FormMessage } from "@/components/admin/FormMessage";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createTestimonialAction, type TestimonialFormState } from "./actions";

const initialState: TestimonialFormState = { error: null };

export function TestimonialForm() {
  const [state, formAction] = useFormState(createTestimonialAction, initialState);

  return (
    <form action={formAction} className="mt-6 max-w-xl space-y-4 rounded-md border border-border bg-surface p-4">
      <TextField label="Customer name" name="customerName" required />
      <TextAreaField
        label="Review"
        name="review"
        hint="Only genuine client-provided reviews — never fabricated (03_FEATURES_AND_ADDONS.md §9)."
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Rating (1–5)" name="rating" type="number" min={1} max={5} />
        <TextField label="Source" name="source" placeholder="e.g. Google" />
      </div>
      <TextField label="Sort order" name="sortOrder" type="number" defaultValue={0} />
      <FormMessage error={state.error} />
      <SubmitButton>Add testimonial</SubmitButton>
    </form>
  );
}
