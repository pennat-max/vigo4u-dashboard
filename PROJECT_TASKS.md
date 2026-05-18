# VIGO4U Project Tasks

Last updated: 2026-05-18

## Current Focus: Project Organization

Prepare the repository so Codex and Cursor can safely continue work on Order Tracking later, without implementing Order Tracking features in this task.

## Confirmed Current State

- App folder path is `vigo4u-dashboard/`.
- `package.json` is inside `vigo4u-dashboard/package.json`.
- Dashboard read-only pages exist.
- Cars list/detail pages exist.
- Supabase read connection exists.
- `public.cars` remains the main car master table.
- Google Sheet Record 2026 remains the main staff workflow outside the app.

## Built

- Dashboard overview page.
- Cars list page.
- Cars detail page.
- Supabase read access for dashboard and Cars views.
- Project handoff docs added.
- Production build currently passes from `vigo4u-dashboard/`.

## Not Built Yet

- Order Tracking not built yet.
- Google Sheet Sync not built yet.
- LINE Bridge not built yet.
- Future Two-way Sync not built yet.
- Full in-app create/update/delete workflows not built yet.
- Audit logs and conflict rules for sync are not built yet.

## Do Not Do Yet

- Do not implement Order Tracking features yet.
- Do not create `/orders` or `/m/orders`.
- Do not add API routes.
- Do not implement Google Sheet Sync.
- Do not implement LINE Bot or LIFF.
- Do not implement two-way sync.
- Do not redesign the dashboard.
- Do not change dashboard behavior.
- Do not change the Supabase schema.
- Do not add write/edit workflows.

## Recommended Next Step

Start Order Tracking Phase 1 with planning and UI/data-flow design only, then confirm one-way workflow boundaries before implementation.
