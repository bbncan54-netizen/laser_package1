import { sql, isDatabaseConfigured } from "@/lib/data/db";
import { services as staticServices } from "@/lib/business-data";

export type ServiceRecord = {
  id: number;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
};

function staticFallback(): ServiceRecord[] {
  return staticServices.map((s, index) => ({
    id: -(index + 1),
    slug: s.slug,
    name: s.name,
    description: s.description,
    sortOrder: index,
  }));
}

export async function getServices(): Promise<ServiceRecord[]> {
  if (!isDatabaseConfigured()) return staticFallback();

  try {
    const { rows } = await sql`
      SELECT id, slug, name, description, sort_order AS "sortOrder"
      FROM services
      ORDER BY sort_order ASC, id ASC
    `;
    if (rows.length === 0) return staticFallback();
    return rows as ServiceRecord[];
  } catch {
    return staticFallback();
  }
}

export async function getServiceById(id: number): Promise<ServiceRecord | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const { rows } = await sql`
      SELECT id, slug, name, description, sort_order AS "sortOrder"
      FROM services WHERE id = ${id}
    `;
    return (rows[0] as ServiceRecord) ?? null;
  } catch {
    return null;
  }
}

export async function createService(input: {
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
}): Promise<void> {
  await sql`
    INSERT INTO services (slug, name, description, sort_order)
    VALUES (${input.slug}, ${input.name}, ${input.description}, ${input.sortOrder})
  `;
}

export async function updateService(
  id: number,
  input: { slug: string; name: string; description: string; sortOrder: number }
): Promise<void> {
  await sql`
    UPDATE services
    SET slug = ${input.slug},
        name = ${input.name},
        description = ${input.description},
        sort_order = ${input.sortOrder},
        updated_at = now()
    WHERE id = ${id}
  `;
}

export async function deleteService(id: number): Promise<void> {
  await sql`DELETE FROM services WHERE id = ${id}`;
}
