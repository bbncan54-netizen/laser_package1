import { NextRequest, NextResponse } from "next/server";

type ConsultationPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Simple consultation lead endpoint.
 *
 * Scope note: this project is a Professional-package lead-gen site.
 * No database, no CRM integration, and no booking/calendar system are
 * included here — those are Add-on / Custom scope per
 * 02_PACKAGES_AND_PRICING.md and 03_FEATURES_AND_ADDONS.md.
 *
 * In a real deployment this handler would forward the validated lead to
 * an email service (e.g. Resend, SendGrid) using a server-side API key
 * stored in an environment variable — never in client code. For this
 * portfolio project the handler validates input and returns success
 * without a real third-party integration, since no real inbox exists.
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

  // TODO (real client deployment): send this lead via a server-side email
  // provider. Intentionally not implemented in this fictional portfolio
  // project — no real recipient exists.

  return NextResponse.json({ status: "received" }, { status: 200 });
}
