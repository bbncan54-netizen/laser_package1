"use client";

import { useFormState } from "react-dom";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import { FormMessage } from "@/components/admin/FormMessage";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { FaqFormState } from "./actions";
import type { FaqRecord } from "@/lib/data/faq";

const initialState: FaqFormState = { error: null };

export function FaqForm({
  faq,
  action,
}: {
  faq?: FaqRecord;
  action: (prevState: FaqFormState, formData: FormData) => Promise<FaqFormState>;
}) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="mt-6 max-w-xl space-y-4">
      <TextField label="Question" name="question" defaultValue={faq?.question} required />
      <TextAreaField label="Answer" name="answer" defaultValue={faq?.answer} required />
      <TextField label="Sort order" name="sortOrder" type="number" defaultValue={faq?.sortOrder ?? 0} />
      <FormMessage error={state.error} />
      <SubmitButton>{faq ? "Save changes" : "Add FAQ"}</SubmitButton>
    </form>
  );
}
