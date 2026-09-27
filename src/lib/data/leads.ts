import { sql, isDatabaseConfigured } from "@/lib/data/db";

export type LeadRecord = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string | null;
  status: "new" | "contacted" | "archived";
  createdAt: string;
};

export async function createLead(input: {
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string | null;
}): Promise<boolean> {
  if (!isDatabaseConfigured()) return false;
  try {
    await sql`
      INSERT INTO consultation_leads (name, email, phone, service, message)
      VALUES (${input.name}, ${input.email}, ${input.phone}, ${input.service}, ${input.message})
    `;
    return true;
  } catch {
    return false;
  }
}

export async function getLeads(): Promise<LeadRecord[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    const { rows } = await sql`
      SELECT id, name, email, phone, service, message, status, created_at AS "createdAt"
      FROM consultation_leads
      ORDER BY created_at DESC
    `;
    return rows as LeadRecord[];
  } catch {
    return [];
  }
}

export async function updateLeadStatus(
  id: number,
  status: LeadRecord["status"]
): Promise<void> {
  await sql`UPDATE consultation_leads SET status = ${status} WHERE id = ${id}`;
}

export async function deleteLead(id: number): Promise<void> {
  await sql`DELETE FROM consultation_leads WHERE id = ${id}`;
}
