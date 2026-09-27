"use client";

import { useFormState } from "react-dom";
import { TextField } from "@/components/admin/FormField";
import { FormMessage } from "@/components/admin/FormMessage";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createGalleryItemAction, type GalleryFormState } from "./actions";

const initialState: GalleryFormState = { error: null };

export function GalleryForm() {
  const [state, formAction] = useFormState(createGalleryItemAction, initialState);

  return (
    <form action={formAction} className="mt-6 max-w-xl space-y-4 rounded-md border border-border bg-surface p-4">
      <TextField
        label="Image URL"
        name="imageUrl"
        type="url"
        placeholder="https://…"
        hint="Hosted image URL (e.g. from client-provided, licensed photography). File upload is not included in this Admin level."
        required
      />
      <TextField
        label="Alt text"
        name="altText"
        hint="Describes the image for accessibility and SEO — required, must be meaningful."
        required
      />
      <TextField label="Category" name="category" hint="Optional, e.g. 'Before/After', 'Clinic'." />
      <TextField label="Sort order" name="sortOrder" type="number" defaultValue={0} />
      <FormMessage error={state.error} />
      <SubmitButton>Add image</SubmitButton>
    </form>
  );
}
