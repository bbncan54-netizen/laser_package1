"use server";

import { revalidatePath } from "next/cache";
import { deleteLead, updateLeadStatus, type LeadRecord } from "@/lib/data/leads";
import { isDatabaseConfigured } from "@/lib/data/db";

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as LeadRecord["status"];
  if (!id || !isDatabaseConfigured()) return;
  await updateLeadStatus(id, status);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLeadAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id || !isDatabaseConfigured()) return;
  await deleteLead(id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
