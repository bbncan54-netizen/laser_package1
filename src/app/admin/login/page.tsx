import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { from?: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-alt px-4">
      <div className="w-full max-w-sm rounded-md border border-border bg-surface p-8 shadow-sm">
        <h1 className="font-display text-xl text-text">Admin Login</h1>
        <p className="mt-1 text-sm text-text-muted">
          Sign in to manage site content.
        </p>
        <LoginForm redirectTo={searchParams.from ?? "/admin"} />
      </div>
    </div>
  );
}
