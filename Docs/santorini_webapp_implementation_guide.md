# Santorini Daily Webapp Implementation Guide

## Scope
This guide implements the webapp-only scope of `Docs/santorini_daily_execution_plan.md` and excludes design creation work.

## Source Sections (Exact References)
- Tech stack: Section 11 (`## 11. Recommended Technology Stack`)
- DB schema: Section 12 (`## 12. Database Schema`)
- API contract: Section 13 (`## 13. API Endpoints`)
- Pages/features: Section 7 (`## 7. Main Application Pages`)
- Flows: Section 8 (`## 8. User Flows`)
- Adaptive logic: Section 9 (`## 9. Adaptive Learning Logic`)
- Roadmap: Section 15 (`## 15. Development Roadmap`)
- MVP boundaries: Section 16 (`## 16. Minimum Viable Scope`)
- App structure: Section 18 (`## 18. Suggested Folder Structure`)

## Mandatory Git Commit Cadence
- Create feature branch from `main`: `feature/santorini-webapp-v1`.
- Commit every completed vertical slice or every 60–90 minutes.
- Keep commits single-concern only.
- Commit convention: `type(scope): summary` where `type` in `feat|fix|refactor|test|docs|chore`.
- Required minimum checkpoints:
  - `feat(core): scaffold next app and base shell`
  - `feat(data): add prisma schema seed and backend libs`
  - `feat(app): implement pages and API routes for core flows`

## Figma MCP Read Workflow (Required)
Use Figma as design input only (no redesign). File URL:
`https://www.figma.com/design/UnKhS3DqvedPavAtFnGdlr/Educational-Software?node-id=2-856&t=h5kfvhgovlyMqlTo-1`

1. Extract `fileKey=UnKhS3DqvedPavAtFnGdlr` and initial node `2:856`.
2. Run `whoami` first.
3. If you get `token_expired`, re-authenticate Figma MCP before continuing.
4. Call `get_metadata(fileKey)` to list top-level pages.
5. Call `get_metadata(fileKey,nodeId)` for each target screen tree.
6. Call `get_design_context(fileKey,nodeId)` for each implemented screen.
7. Call `get_screenshot(fileKey,nodeId,maxDimension=2048)` for visual QA.
8. Only if needed, use `use_figma` in read-only scripts and pass `skillNames: "figma-use"`.

## Code Commenting Standard (Entire Codebase)
- English only.
- Use JSDoc on exported functions/types and API handlers.
- Add inline comments only for non-obvious domain logic (adaptive rules, guest-to-user transitions, score thresholds).
- Do not add comments that restate obvious code.
- TODO format must be: `TODO(owner, YYYY-MM-DD): action`.
- Reference source plan section once when implementing rule-heavy logic.

## Implementation Status in This Repository
- Next.js + TypeScript + Tailwind app scaffolded.
- Prisma schema and seed implemented.
- Auth/session + guest flow implemented.
- API routes implemented for Auth, Modules, Quizzes, Progress, Places, Bookmarks, AI.
- Web routes implemented for Home, Modules, Module Detail, Quiz, Map, Dashboard, Profile, Settings.
- Lint and production build pass.
