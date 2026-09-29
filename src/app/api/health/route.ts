import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Lightweight uptime-monitor endpoint (UptimeRobot, cron-job.org, etc.)
 * so a free-tier host (Render) doesn't spin down from inactivity.
 * Mirrors the same /health pattern already used on pixflow.one
 * (see docs/RENDER_COLD_START.md in the bbtbeh-lang/my_pixflow repo).
 *
 * Deliberately does NOT touch the database — zero read/write risk or cost,
 * just a fast 200 response.
 */
export async function GET() {
  return NextResponse.json({ status: "ok", uptime: process.uptime() });
}
