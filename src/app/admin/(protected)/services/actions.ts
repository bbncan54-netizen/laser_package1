"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createService, deleteService, updateService } from "@/lib/data/services";
import { isDatabaseConfigured } from "@/lib/data/db";

export type ServiceFormState = { error: string | null };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readServiceInput(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput ? slugify(slugInput) : slugify(name);
  return { name, description, sortOrder, slug };
}

export async function createServiceAction(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  if (!isDatabaseConfigured()) {
    return { error: "No database connected — cannot save changes." };
  }
  const input = readServiceInput(formData);
  if (!input.name || !input.description || !input.slug) {
    return { error: "Name, slug, and description are required." };
  }

  try {
    await createService(input);
  } catch {
    return { error: "Could not save this service. The slug may already be in use." };
  }

  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateServiceAction(
  id: number,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  if (!isDatabaseConfigured()) {
    return { error: "No database connected — cannot save changes." };
  }
  const input = readServiceInput(formData);
  if (!input.name || !input.description || !input.slug) {
    return { error: "Name, slug, and description are required." };
  }

  try {
    await updateService(id, input);
  } catch {
    return { error: "Could not save this service. The slug may already be in use." };
  }

  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteServiceAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id || !isDatabaseConfigured()) return;
  await deleteService(id);
  revalidatePath("/services");
  revalidatePath("/admin/services");
}
