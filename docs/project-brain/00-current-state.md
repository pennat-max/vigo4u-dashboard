# VIGO4U OS Project Brain — Current State

Last updated: 2026-05-25
Mode: [Project Brain Migration]

## Source of Truth Policy

Priority order:

1. Production behavior
2. Latest GitHub implementation
3. Latest merged PR
4. Active branch implementation
5. Handoff docs
6. Old planning docs / old chat history

If old handoff or chat history conflicts with implementation, implementation wins.

## Confirmed Repository State

- Repo: `pennat-max/vigo4u-dashboard`
- Default branch: `main`
- Active app folder: `vigo4u-dashboard/`
- Build command context: run commands from `vigo4u-dashboard/`
- Existing root handoff docs:
  - `VIGO4U_HANDOFF.md`
  - `PROJECT_TASKS.md`
  - `ORDER_TRACKING_PLAN.md`
  - `CURSOR_RULES.md`

## Confirmed App State From Existing Handoff

- Existing dashboard is read-only.
- App uses Next.js, TypeScript, Tailwind, shadcn-style UI components, and Supabase.
- Supabase client/server helpers already exist.
- `public.cars` is the main car master table.
- Dashboard reads from Supabase.
- Dashboard pages exist for KPI/chart overview.
- Cars list and detail pages exist.
- Google Sheet Record 2026 remains the main staff workflow outside the app.
- Google Sheet sync is not fully implemented in the repository handoff.
- No full in-app create/update/delete workflow is confirmed in the repository handoff.
- Two-way sync must not be implemented until one-way sync, audit logs, and conflict rules are stable.

## Production Notes Needing Verification

Recent chat notes mention production behavior after PR #77 and PR #78, including:

- Production deploy marked Ready.
- `/m/orders?load=full` tested.
- Search/focus/highlight for car row `95295` passed.
- LINE AI queue opened.
- Approve/save UI present but not clicked because it would write real production `order_items`.
- Assignee display was verified in production UI.
- Copy-ready LINE review link uses `focusCarRowId + search`.

However, GitHub connector currently exposes the latest searchable commit as `0114968f14a150b282541041b1e1b656a5e1bba7` from 2026-05-18, and recent PR search returned no PRs. Treat the production notes above as operational memory that must be reconciled against actual GitHub implementation before any merge/deploy decision.

## Current Migration Decision

- Notion should no longer be the only project brain.
- GitHub Markdown docs under `/docs/project-brain/` become the implementation-adjacent project brain.
- Notion can remain a readable business mirror if needed.
- GitHub implementation and production behavior remain higher priority than Notion.

## Current Blockers / Risks

- Latest production behavior appears newer than the repository state visible through the connector.
- PR #77/#78 are not visible in the current GitHub query results.
- Do not assume production and GitHub are aligned until checked.
- Do not merge code-affecting changes without build and smoke test.

## Immediate Next Action

Use this Project Brain as the canonical docs entry point, then reconcile GitHub `main` against production behavior before the next functional PR.
