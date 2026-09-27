import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/data/leads";
import { isDatabaseConfigured } from "@/lib/data/db";

type ConsultationPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Consultation lead endpoint.
 *
 * Scope note: booking/calendar systems and CRM integration remain
 * Add-on / Custom scope per 02_PACKAGES_AND_PRICING.md and
 * 03_FEATURES_AND_ADDONS.md. What this endpoint DOES do (Level 1 Basic
 * Admin, see 04_ADMIN_SYSTEM.md) is persist the validated lead so it is
 * visible in /admin/leads — a simple form-to-admin-inbox workflow rather
 * than a full CRM, per 03_FEATURES_AND_ADDONS.md §15.
 *
 * If no database is configured (POSTGRES_URL unset), the lead is
 * validated but not persisted — this keeps the public form usable during
 * local development / before a database is provisioned, matching the
 * fallback behaviour in src/lib/data/*.
 *
 * Real email delivery (e.g. Resend, SendGrid) is not implemented here —
 * that is a separate integration decision for the real deployment and is
 * intentionally left out of this portfolio project.
 */
export async function POST(request: NextRequest) {
  let payload: ConsultationPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const service = payload.service?.trim() ?? "";

  const errors: string[] = [];

  if (!name) errors.push("Name is required.");
  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.push("A valid email address is required.");
  }
  if (!service) errors.push("Service of interest is required.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  const phone = payload.phone?.trim() || null;
  const message = payload.message?.trim() || null;

  const persisted = await createLead({ name, email, phone, service, message });

  // TODO (real client deployment): also send this lead via a server-side
  // email provider (e.g. Resend, SendGrid) using an API key stored in an
  // environment variable — never in client code. Intentionally not
  // implemented in this fictional portfolio project — no real recipient
  // exists. The lead is still saved to /admin/leads when a database is
  // connected.

  return NextResponse.json(
    { status: "received", saved: persisted && isDatabaseConfigured() },
    { status: 200 }
  );
}
