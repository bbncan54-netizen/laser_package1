"use server";

import { revalidatePath } from "next/cache";
import { upsertBusinessInfo } from "@/lib/data/business-info";
import { isDatabaseConfigured } from "@/lib/data/db";

export type BusinessInfoState = { error: string | null; success: boolean };

export async function updateBusinessInfoAction(
  _prevState: BusinessInfoState,
  formData: FormData
): Promise<BusinessInfoState> {
  if (!isDatabaseConfigured()) {
    return { error: "No database connected — cannot save changes.", success: false };
  }

  const name = String(formData.get("name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const province = String(formData.get("province") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const responseWindow = String(formData.get("responseWindow") ?? "").trim();

  if (!name || !city || !province || !address || !phone || !email || !responseWindow) {
    return { error: "All fields are required.", success: false };
  }

  try {
    await upsertBusinessInfo({ name, tagline, city, province, address, phone, email, responseWindow });
  } catch {
    return { error: "Could not save business info. Please try again.", success: false };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/business-info");
  return { error: null, success: true };
}
