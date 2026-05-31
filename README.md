# EducationalSoftware Repository Guide

This is the **root-level navigation README** for the whole repository.

If you are new, start here to understand where everything lives, what each folder does, and what to read next.

## 1. Quick Orientation

Repository root:

```text
EducationalSoftware/
  Docs/               # Planning, design, and implementation docs
  santorini-daily/    # Actual Next.js + Prisma application code
```

## 2. What Is Where

### `Docs/`
High-level project documentation.

Important files:

- `Docs/santorini_daily_execution_plan.md`
  - Original execution plan (product, pages, roadmap, schema, API intent).
- `Docs/DESIGN.md`
  - Design system direction (colors, typography, spacing, look & feel).
- `Docs/santorini_webapp_implementation_guide.md`
  - Implementation-focused guide with commit cadence and execution standards.

### `santorini-daily/`
The working web application.

Important files/folders:

- `santorini-daily/README.md`
  - Detailed developer onboarding and setup instructions (read this first for coding).
- `santorini-daily/src/app/`
  - Next.js pages and API route handlers.
- `santorini-daily/src/components/`
  - Reusable UI components (layout/map/dashboard/quiz).
- `santorini-daily/src/lib/`
  - Shared backend/frontend logic (auth, prisma, adaptive logic, helpers).
- `santorini-daily/prisma/`
  - DB schema, migrations, and seed scripts.
- `santorini-daily/public/images/`
  - Visual assets used by the UI.
- `santorini-daily/draft/`
  - Screenshot references used for visual parity.

## 3. Read-Next Order (Recommended)

If you are onboarding, use this order:

1. **This file** (`/README.md`) — repo map.
2. [`Docs/santorini_daily_execution_plan.md`](/EducationalSoftware/Docs/santorini_daily_execution_plan.md) — understand product goals and scope.
3. [`Docs/DESIGN.md`](/EducationalSoftware/Docs/DESIGN.md) — understand visual language.
4. [`santorini-daily/README.md`](/EducationalSoftware/santorini-daily/README.md) — local setup + dev workflow.
5. `santorini-daily/src/components/layout/site-shell.tsx` + `sidebar-nav.tsx` — understand global app layout.
6. `santorini-daily/src/app/page.tsx`, `modules/page.tsx`, `map/page.tsx`, `dashboard/page.tsx` — understand key screen composition.
7. `santorini-daily/src/app/api/*` + `src/lib/auth.ts` + `src/lib/prisma.ts` — understand backend contracts and session model.
8. `santorini-daily/prisma/schema.prisma` + `prisma/migrations/*` — understand data model.

## 4. Which README Should I Follow?

- For **repository orientation**: use this root README.
- For **running and developing the app**: use `santorini-daily/README.md`.

## 5. Common Newcomer Paths

### I only want to run the app
Go to: `santorini-daily/README.md` → “First-Time Setup”.

### I want to work on UI only
Read in order:
- `Docs/DESIGN.md`
- `santorini-daily/draft/*` screenshots
- `santorini-daily/src/components/layout/*`
- relevant page in `santorini-daily/src/app/*`

### I want to work on API/backend
Read in order:
- `Docs/santorini_daily_execution_plan.md` sections for schema/endpoints
- `santorini-daily/prisma/schema.prisma`
- `santorini-daily/src/app/api/*`
- `santorini-daily/src/lib/auth.ts`

## 6. Project Status Snapshot

Current repository already includes:

- Implemented Next.js app scaffold
- Prisma schema + migration + seed
- Core API route handlers
- Screenshot-aligned UI pass for primary pages
- Local Docker compose DB setup

## 7. Notes

- Prisma migration lock file (`prisma/migrations/migration_lock.toml`) is intentionally committed.
- Place exported design assets in `public/images/*` when updating visuals.

---

If you are unsure where to start, open:

1. `santorini-daily/README.md`
2. `santorini-daily/src/app/page.tsx`

That will get you productive quickly.
