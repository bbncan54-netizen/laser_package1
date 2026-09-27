# Admin Panel — Setup

Level 1 (Basic) Admin, per `04_ADMIN_SYSTEM.md`. Manages: business info,
services, gallery images, testimonials, FAQ, and consultation leads.

## 1. Provision a database

In the Vercel dashboard: Project → Storage → add a **Postgres** (Neon)
database, free tier. Vercel automatically adds `POSTGRES_URL` and related
env vars to the project.

For local development, copy those same values into `.env.local`
(see `.env.example`).

## 2. Run the schema

Run `db/schema.sql` once against the database (Vercel dashboard's Postgres
query tab, or `psql "$POSTGRES_URL" -f db/schema.sql`).

## 3. Set admin credentials

```
node scripts/hash-password.mjs "choose-a-strong-password"
```

Copy the printed hash into `ADMIN_PASSWORD_HASH`. Set `ADMIN_USERNAME` to
whatever username you want. Set `SESSION_SECRET` to a random string
(`openssl rand -base64 32`).

Add all three as Environment Variables in Vercel (Production **and**
Preview), then redeploy.

## 4. Log in

Visit `/admin/login`. The URL is not linked from the public site
(`04_ADMIN_SYSTEM.md` §21 — not publicly promoted, but not the only
protection: the route is also protected by `middleware.ts` + a
server-side session check on every admin page).

## Notes

- Without a database configured, `/admin` still loads and shows the
  static defaults, but nothing can be saved — a banner in the Admin
  Panel says so.
- Business info, Services and FAQ fall back to the placeholders in
  `src/lib/business-data.ts` until real data is saved through the Admin
  Panel — those placeholders were never meant to be real business facts
  (see `01_MASTER_WORKFLOW.md` Core Principle 4).
- Gallery images are added by URL (hosted image link), not file upload —
  file upload/storage is out of scope for Level 1 Basic Admin; see
  `03_FEATURES_AND_ADDONS.md` §24 if the client needs that later.
- Booking, payments, and CRM integration remain Add-on/Custom scope and
  are not part of this Admin Panel.
