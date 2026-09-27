"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-sm bg-accent px-6 py-3 font-body font-medium text-white transition-colors duration-150 hover:bg-accent-hover disabled:opacity-50"
    >
      {pending ? "Saving…" : children}
    </button>
  );
}
