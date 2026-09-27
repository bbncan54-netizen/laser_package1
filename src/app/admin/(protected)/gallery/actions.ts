"use server";

import { revalidatePath } from "next/cache";
import { createGalleryItem, deleteGalleryItem } from "@/lib/data/gallery";
import { isDatabaseConfigured } from "@/lib/data/db";

export type GalleryFormState = { error: string | null };

export async function createGalleryItemAction(
  _prevState: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  if (!isDatabaseConfigured()) return { error: "No database connected — cannot save changes." };

  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const altText = String(formData.get("altText") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  if (!imageUrl || !altText) {
    return { error: "Image URL and alt text are required. Alt text must describe the image (06_UI_UX_SEO_SECURITY_QA.md §11)." };
  }

  try {
    await createGalleryItem({ imageUrl, altText, category, sortOrder });
  } catch {
    return { error: "Could not save this image." };
  }

  revalidatePath("/results");
  revalidatePath("/admin/gallery");
  return { error: null };
}

export async function deleteGalleryItemAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id || !isDatabaseConfigured()) return;
  await deleteGalleryItem(id);
  revalidatePath("/results");
  revalidatePath("/admin/gallery");
}
