# VIGO4U Order Tracking Plan

Last updated: 2026-05-18

## Status

Order Tracking is planning-only for now. Do not implement Order Tracking features yet.

## Definition

Order Tracking covers parts orders, accessories, modification jobs, stock checks, garage pickup/install work, and customer-requested work.

## First Users

- Sales
- Store
- Garage / Installation

## Planned Workflow

Sales creates request -> Store checks stock -> Store orders/receives parts -> Garage picks up parts -> Garage installs -> job done.

## Data Model Planning Only

- `public.cars` remains car master.
- `order_tasks` planned for high-level work requests.
- `order_items` planned for parts/accessories/items under each task.
- `order_task_updates` planned for status notes and timeline updates.
- `order_attachments` planned later for photos, receipts, and supporting files.

These tables are planning notes only. Do not create or migrate database tables yet.

## Mobile-First Rules

- One-hand friendly.
- Large cards/buttons.
- Sticky bottom actions.
- Horizontal filter chips.
- No wide tables.
- No long forms.

## LINE Bridge Plan

LINE Bridge starts with copy-ready manual messages only.

Do not implement LINE Bot or LIFF yet.

## Do Not Implement Yet

- Do not create `/orders`.
- Do not create `/m/orders`.
- Do not add Order Tracking API routes.
- Do not add Order Tracking database migrations.
- Do not implement Google Sheet Sync.
- Do not implement LINE Bot or LIFF.
- Do not implement two-way sync.

