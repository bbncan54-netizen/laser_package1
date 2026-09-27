import { sql } from "@vercel/postgres";

/**
 * Thin wrapper around @vercel/postgres.
 *
 * This project has no database configured in local/demo environments.
 * Every data-access function in src/lib/data/*.ts wraps its query in a
 * try/catch and falls back to the static defaults in business-data.ts
 * when the database is unreachable or not yet configured. This keeps
 * `next build` and local `next dev` working without POSTGRES_URL set,
 * per 05_TECH_STACK_AND_ARCHITECTURE.md §33 (cost/complexity should
 * never block a working build) while still giving the client a real,
 * persistent Admin Panel once a database is connected.
 */
export { sql };

export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING
  );
}
