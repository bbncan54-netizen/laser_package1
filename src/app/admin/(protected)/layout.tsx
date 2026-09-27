import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/data/db";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin" },
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="grid min-h-screen grid-cols-[220px_1fr]">
      <AdminNav />
      <div className="flex flex-col">
        {!isDatabaseConfigured() && (
          <div className="border-b border-border bg-accent/10 px-6 py-2 text-sm text-accent">
            No database is connected (POSTGRES_URL not set). Content shown
            here is read-only from defaults and changes will not be saved.
          </div>
        )}
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
