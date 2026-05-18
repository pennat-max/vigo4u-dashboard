# Cursor Rules

Last updated: 2026-05-18

## Project Rule

This is one existing VIGO4U OS project, not multiple projects. Do not create a new project for new modules.

The Next.js app lives in `vigo4u-dashboard/`. Run npm commands from that folder.

## Mode Rule

Every task must use one clear mode tag, such as:

- [Project Organization]
- [Dashboard]
- [Cars]
- [Order Tracking Planning]
- [Mobile Operations]
- [Google Sheet Sync]
- [LINE Bridge]

## Required Reading Before Any Task

- `VIGO4U_HANDOFF.md`
- `PROJECT_TASKS.md`
- `ORDER_TRACKING_PLAN.md` if working on Order Tracking

## Dashboard Rules

- Existing dashboard is read-only.
- Dashboard reads from Supabase.
- `public.cars` is the main car master table.
- Do not redesign the dashboard unless the task explicitly asks for it.
- Do not add write/edit workflows unless the task explicitly asks for them.
- Do not change dashboard behavior during project-organization tasks.

## Order Tracking Rules

- Order Tracking is planning-only for now.
- Do not implement Order Tracking features yet.
- Do not create `/orders`.
- Do not create `/m/orders`.
- Do not add API routes for Order Tracking.
- Do not create Order Tracking database tables or migrations yet.
- Do not implement Google Sheet Sync as part of Order Tracking planning.
- Do not implement LINE Bot or LIFF yet.
- LINE Bridge starts with copy-ready manual messages only.
- Keep future mobile operations one-hand friendly, with large cards/buttons, sticky bottom actions, horizontal filter chips, no wide tables, and no long forms.

## Sync Rules

- Google Sheet Record 2026 remains the main staff workflow outside the app.
- Google Sheet sync is not fully implemented in the current repo.
- Do not implement two-way sync until one-way sync, audit logs, and conflict rules are stable.

## End of Every Task

- Run `npm run build` from `vigo4u-dashboard/`.
- Update `VIGO4U_HANDOFF.md`.
- Update `PROJECT_TASKS.md`.
- Update `ORDER_TRACKING_PLAN.md` if Order Tracking changed.

