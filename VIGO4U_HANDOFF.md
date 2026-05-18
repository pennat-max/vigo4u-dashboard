# VIGO4U Handoff

Last updated: 2026-05-18

## Current Focus

Mode: [Project Organization]

This repository is the existing VIGO4U OS project. Do not create a new project. The active Next.js app lives in `vigo4u-dashboard/`, and `vigo4u-dashboard/package.json` is the package file to use for install, build, and development commands.

## Repository Structure Confirmed

- Repo: `pennat-max/vigo4u-dashboard`
- App folder: `vigo4u-dashboard/`
- Build folder context: run app commands from `vigo4u-dashboard/`
- Dashboard route group: `vigo4u-dashboard/app/(dashboard)/`
- Cars pages: `vigo4u-dashboard/app/(dashboard)/cars/`
- Supabase clients: `vigo4u-dashboard/lib/supabase/`
- Database types: `vigo4u-dashboard/types/database.ts`

## Current App State

- Existing dashboard is read-only.
- App uses Next.js, TypeScript, Tailwind, shadcn-style UI components, and Supabase.
- Supabase is already connected through the existing client/server helpers.
- `public.cars` is the main car master table.
- Dashboard reads from Supabase.
- Dashboard pages exist for KPI/chart overview.
- Cars list and detail pages exist.
- Google Sheet Record 2026 remains the main staff workflow outside the app.
- Google Sheet sync is not fully implemented in the current repo.
- No full in-app create/update/delete workflow exists yet.
- Two-way sync must not be implemented until one-way sync, audit logs, and conflict rules are stable.
- `npm run build` passes from `vigo4u-dashboard/` as of this handoff.

## Build Notes

- Next config uses `vigo4u-dashboard/next.config.mjs` because Next.js 14.2.5 does not support `next.config.ts`.
- Existing Supabase read rows now use explicit TypeScript casts where needed so strict production builds pass.
- Supabase cookie helpers now type `setAll` cookie batches explicitly.
- These build fixes do not add routes, API handlers, write workflows, schema changes, or Order Tracking features.

## VIGO4U OS Modules

- Dashboard
- Cars
- Order Tracking
- Mobile Operations
- Google Sheet Sync
- LINE Bridge / LIFF
- Future Two-way Sync

## Important Guardrails

- Do not change dashboard behavior during project-organization work.
- Do not change the Supabase schema unless a future task explicitly requires it.
- Do not add write/edit workflows yet.
- Do not implement Order Tracking features yet.
- Do not create `/orders` or `/m/orders` yet.
- Do not add API routes yet.
- Do not implement LINE Bot or LIFF yet.
- Do not implement Google Sheet Sync yet.
- Do not implement two-way sync yet.

## End-of-Task Checklist

- Run commands from `vigo4u-dashboard/`.
- Run `npm run build`.
- Update `VIGO4U_HANDOFF.md`.
- Update `PROJECT_TASKS.md`.
- Update `ORDER_TRACKING_PLAN.md` if Order Tracking planning changed.
