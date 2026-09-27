import { sql, isDatabaseConfigured } from "@/lib/data/db";
import { business as staticBusiness } from "@/lib/business-data";

export type BusinessInfoRecord = {
  name: string;
  tagline: string;
  city: string;
  province: string;
  address: string;
  phone: string;
  email: string;
  responseWindow: string;
};

function staticFallback(): BusinessInfoRecord {
  return { ...staticBusiness };
}

export async function getBusinessInfo(): Promise<BusinessInfoRecord> {
  if (!isDatabaseConfigured()) return staticFallback();
  try {
    const { rows } = await sql`
      SELECT name, tagline, city, province, address, phone, email, response_window AS "responseWindow"
      FROM business_info WHERE id = 1
    `;
    if (rows.length === 0) return staticFallback();
    return rows[0] as BusinessInfoRecord;
  } catch {
    return staticFallback();
  }
}

export async function upsertBusinessInfo(input: BusinessInfoRecord): Promise<void> {
  await sql`
    INSERT INTO business_info (id, name, tagline, city, province, address, phone, email, response_window, updated_at)
    VALUES (1, ${input.name}, ${input.tagline}, ${input.city}, ${input.province}, ${input.address}, ${input.phone}, ${input.email}, ${input.responseWindow}, now())
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      tagline = EXCLUDED.tagline,
      city = EXCLUDED.city,
      province = EXCLUDED.province,
      address = EXCLUDED.address,
      phone = EXCLUDED.phone,
      email = EXCLUDED.email,
      response_window = EXCLUDED.response_window,
      updated_at = now()
  `;
}
