"use client";

import { useFormState } from "react-dom";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import { FormMessage } from "@/components/admin/FormMessage";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ServiceFormState } from "./actions";
import type { ServiceRecord } from "@/lib/data/services";

const initialState: ServiceFormState = { error: null };

export function ServiceForm({
  service,
  action,
}: {
  service?: ServiceRecord;
  action: (prevState: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
}) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="mt-6 max-w-xl space-y-4">
      <TextField label="Treatment name" name="name" defaultValue={service?.name} required />
      <TextField
        label="Slug"
        name="slug"
        defaultValue={service?.slug}
        hint="Used in the URL, e.g. laser-hair-removal. Leave blank to generate from the name."
      />
      <TextAreaField
        label="Description"
        name="description"
        defaultValue={service?.description}
        hint="Brief, factual description — no outcome claims (06_UI_UX_SEO_SECURITY_QA.md §22)."
        required
      />
      <TextField
        label="Sort order"
        name="sortOrder"
        type="number"
        defaultValue={service?.sortOrder ?? 0}
      />

      <FormMessage error={state.error} />
      <SubmitButton>{service ? "Save changes" : "Add service"}</SubmitButton>
    </form>
  );
}
