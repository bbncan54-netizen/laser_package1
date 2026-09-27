"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createFaq, deleteFaq, updateFaq } from "@/lib/data/faq";
import { isDatabaseConfigured } from "@/lib/data/db";

export type FaqFormState = { error: string | null };

function readFaqInput(formData: FormData) {
  return {
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  };
}

export async function createFaqAction(
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  if (!isDatabaseConfigured()) return { error: "No database connected — cannot save changes." };
  const input = readFaqInput(formData);
  if (!input.question || !input.answer) return { error: "Question and answer are required." };

  try {
    await createFaq(input);
  } catch {
    return { error: "Could not save this FAQ entry." };
  }
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function updateFaqAction(
  id: number,
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  if (!isDatabaseConfigured()) return { error: "No database connected — cannot save changes." };
  const input = readFaqInput(formData);
  if (!input.question || !input.answer) return { error: "Question and answer are required." };

  try {
    await updateFaq(id, input);
  } catch {
    return { error: "Could not save this FAQ entry." };
  }
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  redirect("/admin/faq");
}

export async function deleteFaqAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id || !isDatabaseConfigured()) return;
  await deleteFaq(id);
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
}
