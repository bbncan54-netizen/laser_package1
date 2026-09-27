import { sql, isDatabaseConfigured } from "@/lib/data/db";
import { faqs as staticFaqs } from "@/lib/business-data";

export type FaqRecord = {
  id: number;
  question: string;
  answer: string;
  sortOrder: number;
};

function staticFallback(): FaqRecord[] {
  return staticFaqs.map((f, index) => ({
    id: -(index + 1),
    question: f.question,
    answer: f.answer,
    sortOrder: index,
  }));
}

export async function getFaqs(): Promise<FaqRecord[]> {
  if (!isDatabaseConfigured()) return staticFallback();
  try {
    const { rows } = await sql`
      SELECT id, question, answer, sort_order AS "sortOrder"
      FROM faq_items
      ORDER BY sort_order ASC, id ASC
    `;
    if (rows.length === 0) return staticFallback();
    return rows as FaqRecord[];
  } catch {
    return staticFallback();
  }
}

export async function getFaqById(id: number): Promise<FaqRecord | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const { rows } = await sql`SELECT id, question, answer, sort_order AS "sortOrder" FROM faq_items WHERE id = ${id}`;
    return (rows[0] as FaqRecord) ?? null;
  } catch {
    return null;
  }
}

export async function createFaq(input: { question: string; answer: string; sortOrder: number }): Promise<void> {
  await sql`
    INSERT INTO faq_items (question, answer, sort_order)
    VALUES (${input.question}, ${input.answer}, ${input.sortOrder})
  `;
}

export async function updateFaq(
  id: number,
  input: { question: string; answer: string; sortOrder: number }
): Promise<void> {
  await sql`
    UPDATE faq_items
    SET question = ${input.question}, answer = ${input.answer}, sort_order = ${input.sortOrder}, updated_at = now()
    WHERE id = ${id}
  `;
}

export async function deleteFaq(id: number): Promise<void> {
  await sql`DELETE FROM faq_items WHERE id = ${id}`;
}
