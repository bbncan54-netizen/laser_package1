"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/session";

export type LoginState = { error: string | null };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/admin");

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  let valid: boolean;
  try {
    valid = await verifyAdminCredentials(username, password);
  } catch {
    return {
      error:
        "Admin login is not configured yet. Set ADMIN_USERNAME and ADMIN_PASSWORD_HASH in the environment.",
    };
  }

  if (!valid) {
    return { error: "Incorrect username or password." };
  }

  const token = await createSessionToken(username);
  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
}

export async function logoutAction(): Promise<void> {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect("/admin/login");
}
