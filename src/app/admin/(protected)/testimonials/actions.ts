"use server";

import { revalidatePath } from "next/cache";
import { createTestimonial, deleteTestimonial } from "@/lib/data/testimonials";
import { isDatabaseConfigured } from "@/lib/data/db";

export type TestimonialFormState = { error: string | null };

export async function createTestimonialAction(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  if (!isDatabaseConfigured()) return { error: "No database connected — cannot save changes." };

  const customerName = String(formData.get("customerName") ?? "").trim();
  const review = String(formData.get("review") ?? "").trim();
  const ratingRaw = String(formData.get("rating") ?? "").trim();
  const rating = ratingRaw ? Number(ratingRaw) : null;
  const source = String(formData.get("source") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  if (!customerName || !review) {
    return { error: "Customer name and review text are required." };
  }
  if (rating !== null && (rating < 1 || rating > 5)) {
    return { error: "Rating must be between 1 and 5." };
  }

  try {
    await createTestimonial({ customerName, review, rating, source, sortOrder });
  } catch {
    return { error: "Could not save this testimonial." };
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { error: null };
}

export async function deleteTestimonialAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id || !isDatabaseConfigured()) return;
  await deleteTestimonial(id);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
