import { sql, isDatabaseConfigured } from "@/lib/data/db";

export type GalleryItemRecord = {
  id: number;
  imageUrl: string;
  altText: string;
  category: string | null;
  sortOrder: number;
};

export async function getGalleryItems(): Promise<GalleryItemRecord[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    const { rows } = await sql`
      SELECT id, image_url AS "imageUrl", alt_text AS "altText", category, sort_order AS "sortOrder"
      FROM gallery_items
      ORDER BY sort_order ASC, id ASC
    `;
    return rows as GalleryItemRecord[];
  } catch {
    return [];
  }
}

export async function createGalleryItem(input: {
  imageUrl: string;
  altText: string;
  category: string | null;
  sortOrder: number;
}): Promise<void> {
  await sql`
    INSERT INTO gallery_items (image_url, alt_text, category, sort_order)
    VALUES (${input.imageUrl}, ${input.altText}, ${input.category}, ${input.sortOrder})
  `;
}

export async function deleteGalleryItem(id: number): Promise<void> {
  await sql`DELETE FROM gallery_items WHERE id = ${id}`;
}
