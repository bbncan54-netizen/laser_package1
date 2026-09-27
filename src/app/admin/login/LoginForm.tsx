"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-sm bg-accent px-6 py-3 font-body font-medium text-white transition-colors duration-150 hover:bg-accent-hover disabled:opacity-50"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-6">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <label htmlFor="username" className="block text-sm font-medium text-text">
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        required
        className="mt-1 w-full min-h-[44px] rounded-sm border border-border bg-surface px-3 py-2 text-text focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
      />

      <label htmlFor="password" className="mt-4 block text-sm font-medium text-text">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mt-1 w-full min-h-[44px] rounded-sm border border-border bg-surface px-3 py-2 text-text focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus"
      />

      {state.error && (
        <p role="alert" className="mt-4 rounded-sm border border-error/30 bg-error/5 px-3 py-2 text-sm text-error">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
