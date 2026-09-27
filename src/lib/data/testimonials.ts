import { sql, isDatabaseConfigured } from "@/lib/data/db";

export type TestimonialRecord = {
  id: number;
  customerName: string;
  review: string;
  rating: number | null;
  source: string | null;
  sortOrder: number;
};

export async function getTestimonials(): Promise<TestimonialRecord[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    const { rows } = await sql`
      SELECT id, customer_name AS "customerName", review, rating, source, sort_order AS "sortOrder"
      FROM testimonials
      ORDER BY sort_order ASC, id ASC
    `;
    return rows as TestimonialRecord[];
  } catch {
    return [];
  }
}

export async function createTestimonial(input: {
  customerName: string;
  review: string;
  rating: number | null;
  source: string | null;
  sortOrder: number;
}): Promise<void> {
  await sql`
    INSERT INTO testimonials (customer_name, review, rating, source, sort_order)
    VALUES (${input.customerName}, ${input.review}, ${input.rating}, ${input.source}, ${input.sortOrder})
  `;
}

export async function deleteTestimonial(id: number): Promise<void> {
  await sql`DELETE FROM testimonials WHERE id = ${id}`;
}
