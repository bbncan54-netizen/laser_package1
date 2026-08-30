# [Business Name] — Laser & Med Spa (Pixflow Portfolio Project)

**This is a fictional demo website built by Pixflow to showcase the
Professional package ($1,199 CAD). It does not represent a real
business, and no information on this site should be treated as real.**

## Content integrity

- No testimonials, reviews, ratings, statistics, years of experience,
  or medical claims have been fabricated anywhere in this project.
- Fields that would require real business information are marked with
  placeholders such as `[Business Name]`, `[Phone Number]`,
  `[Business Address]`, `[email@example.com]`, or
  `[CLIENT INPUT REQUIRED]`.
- The Results page intentionally uses an honest empty state instead of
  fabricated before/after images.

## Scope (Professional package)

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Static/mostly-static marketing site, no database, no authentication,
  no admin panel (Admin Level 0)
- A single consultation/contact lead form (`/api/consultation`) — no
  online calendar booking, no payments, no customer accounts
- 6 pages: Home, Services, About, Results, FAQ, Contact

## Getting started

```bash
npm install
npm run dev
```

## Replacing placeholders for a real client

All business-specific values live in `src/lib/business-data.ts`
(name, contact info, services, FAQ copy) and `src/styles/tokens.css`
(brand colors, typography). Swapping these — plus real photography in
place of the placeholder blocks — is enough to re-brand this template
for an actual client without touching component logic.

## Deployment

This project is Vercel-ready out of the box (`next build` / `next start`).
No environment variables are required for the current scope.
