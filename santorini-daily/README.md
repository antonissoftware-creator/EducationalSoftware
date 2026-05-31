# Santorini Daily Webapp

Educational web application for exploring Santorini history, volcano/geology, and local culture through modules, quizzes, map-based exploration, and adaptive progress tracking.

## 1. Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js Route Handlers (`src/app/api/...`)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Charts**: Recharts
- **Map**: Leaflet + React Leaflet
- **Auth**: Custom session cookies + guest session support

## 2. What This Project Already Has

- Screenshot-aligned UI for key pages:
  - Home
  - Modules
  - Module Detail
  - Quiz Stepper
  - Map
  - Progress Dashboard
  - Settings
- API routes for auth/modules/quizzes/progress/places/bookmarks/AI
- Prisma schema + migration + seed script
- Docker Compose setup for local PostgreSQL

## 3. Repository Structure (Most Important Folders)

```text
src/
  app/
    page.tsx                    # Home
    modules/                    # Modules + module detail + quiz pages
    map/                        # Interactive map page
    dashboard/                  # Progress page
    settings/                   # Settings page
    api/                        # Backend API routes
  components/
    layout/                     # Shared shell/nav/footer
    map/                        # Leaflet map component
    dashboard/                  # Recharts chart component
    quiz/                       # Quiz stepper component
  lib/
    prisma.ts                   # Prisma client singleton
    auth.ts                     # Session + guest auth helpers
    adaptive-learning.ts        # Recommendation logic
prisma/
  schema.prisma                # Database schema
  migrations/                  # Prisma migrations (committed)
  seed.ts                      # Seed data script
docker-compose.yml             # Local postgres service
```

## 4. First-Time Setup

### Prerequisites

- Node.js 20+
- npm 10+
- Docker Desktop running

### Step A: Install dependencies

```bash
cd EducationalSoftware/santorini-daily
npm install
```

### Step B: Start PostgreSQL (one command)

```bash
docker compose up -d
```

This starts a local DB from `docker-compose.yml`.

### Step C: Verify `.env`

`.env` should contain:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/santorini_daily?schema=public"
```

### Step D: Run migrations and seed

```bash
npm run prisma:migrate
npm run db:seed
```

When prompted for migration name, use something clear like:

```text
init_santorini_schema
```

### Step E: Run dev server

```bash
env -u NODE_OPTIONS -u VSCODE_INSPECTOR_OPTIONS npm run dev
```

Open: `http://localhost:3000`

## 5. Useful Commands

```bash
npm run dev             # Start dev server
npm run lint            # ESLint checks
npm run build           # Production build
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run/create migrations
npm run db:seed         # Seed development data
```

DB lifecycle:

```bash
docker compose up -d    # Start DB
docker compose down     # Stop DB
docker compose logs -f  # View logs
```

## 6. How Data Flows in This App

### Page rendering

- Most pages read data from Prisma directly (server components) or through API calls for client-only features (map).

### Quiz flow

1. Start attempt: `POST /api/quizzes/:quizId/start`
2. Submit answers: `POST /api/quizzes/:quizId/submit`
3. Fetch result: `GET /api/quizzes/:quizId/results?attemptId=...`

### Progress flow

- Module progress update: `POST /api/progress/module`
- Dashboard summary: `GET /api/progress/dashboard`
- Recommendations: `GET /api/progress/recommendations`

## 7. API Overview

Main route groups:

- `api/auth/*`
- `api/modules/*`
- `api/quizzes/*`
- `api/progress/*`
- `api/places/*`
- `api/bookmarks/*`
- `api/ai/*`

Tip: read handlers directly in `src/app/api` to learn expected payloads.

## 8. Auth Model (Important)

This app supports both:

- **Guest user** (tracked with `guest_sessions` table + cookie)
- **Logged-in user** (tracked with `users` + `sessions` table + cookie)

Some actions require login (favorites, bookmarks), while learning/progress can begin as guest.

## 9. Images and Assets

Use `public/images`:

- `public/images/modules`
- `public/images/places`
- `public/images/badges`

Current UI also uses curated images already in `public/images/*`.

Store DB image paths as relative strings, for example:

```text
/images/modules/history/akrotiri.jpg
```

## 10. Common Problems + Fixes

### Problem: `You cannot use different slug names for the same dynamic path`

Cause: conflicting dynamic route folders like `[slug]` and `[moduleSlug]` at same path depth.

Fix: keep one consistent param name per path level.

### Problem: Prisma cannot connect to DB

Error usually includes:

```text
Can't reach database server at localhost:5432
```

Fix:

1. `docker compose up -d`
2. verify `.env`
3. rerun migration/seed

### Problem: `window is not defined` on map page

Cause: Leaflet imported in SSR context.

Fix used in project: load map UI in client component + `next/dynamic(..., { ssr: false })`.

### Problem: unwanted Node debugger attach logs

Use:

```bash
env -u NODE_OPTIONS -u VSCODE_INSPECTOR_OPTIONS npm run dev
```

## 11. Development Workflow for New Contributors

1. Pull latest `main`
2. Create feature branch
3. Implement one focused vertical slice
4. Run `npm run lint` and `npm run build`
5. Commit with clear message
6. Open PR or merge request

Suggested commit style:

```text
feat(scope): short description
fix(scope): short description
chore(scope): short description
```

## 12. Code Standards

- TypeScript strictness: prefer explicit types on API payloads and component props
- Keep comments intent-focused (avoid obvious comments)
- Reuse `lib/*` helpers for auth/prisma/adaptive logic
- Keep route handler validation with `zod` for request payloads

## 13. Notes on Figma / Design Sync

- Screenshots from `/draft` are used as visual parity references.
- Figma MCP may require re-auth if token expires.
- If MCP auth is blocked, export assets manually from Figma and place in `public/images/*`.

## 14. Where to Start as a Junior Dev

Recommended learning order:

1. `src/app/page.tsx` (home composition)
2. `src/components/layout/site-shell.tsx` and `sidebar-nav.tsx` (layout system)
3. `src/app/api/modules/*` (simple API handlers)
4. `src/lib/auth.ts` (session model)
5. `src/app/modules/[slug]/quiz/page.tsx` + `src/components/quiz/quiz-stepper.tsx` (interactive flow)
6. `src/components/map/map-canvas.tsx` (client-only integration)

---

If you are onboarding and blocked, first verify:

1. Docker is running
2. DB container is up (`docker compose ps`)
3. `.env` has correct `DATABASE_URL`
4. migration + seed ran successfully
5. `npm run lint` and `npm run build` pass
