"use client";

import { useFormState } from "react-dom";
import { TextField } from "@/components/admin/FormField";
import { FormMessage } from "@/components/admin/FormMessage";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { updateBusinessInfoAction, type BusinessInfoState } from "./actions";
import type { BusinessInfoRecord } from "@/lib/data/business-info";

const initialState: BusinessInfoState = { error: null, success: false };

export function BusinessInfoForm({ info }: { info: BusinessInfoRecord }) {
  const [state, formAction] = useFormState(updateBusinessInfoAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <TextField label="Business name" name="name" defaultValue={info.name} required />
      <TextField label="Tagline" name="tagline" defaultValue={info.tagline} required />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="City" name="city" defaultValue={info.city} required />
        <TextField label="Province" name="province" defaultValue={info.province} required />
      </div>
      <TextField label="Address" name="address" defaultValue={info.address} required />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Phone" name="phone" defaultValue={info.phone} required />
        <TextField label="Email" name="email" type="email" defaultValue={info.email} required />
      </div>
      <TextField
        label="Response window"
        name="responseWindow"
        defaultValue={info.responseWindow}
        hint="e.g. '1–2 business days' — shown on the contact page."
        required
      />

      <FormMessage error={state.error} success={state.success ? "Saved." : null} />
      <SubmitButton>Save changes</SubmitButton>
    </form>
  );
}
