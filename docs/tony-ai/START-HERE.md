# TONY AI Platform — START HERE

Last updated: 2026-07-12

## Product Decision

TONY AI is not a giant LINE chatbot. It is a modular, multi-tenant business AI operating system.

```text
LINE / Web / Future Channels
        ↓
Channel Adapters + Event Gateway
        ↓
AI Orchestrator + Skill Router
        ↓
Policy Engine + Workflow Engine + Tool Gateway
        ↓
Domain Services
        ↓
Repository Interfaces
        ↓
Google Sheets/Drive (transition) + Supabase/PostgreSQL (target)
```

LINE is the first interface, not the database and not the business-logic layer.

## First Commercial Product

**TONY AI for Used-Car Dealers & Exporters**

VIGO4U is the first production tenant and design partner.

The first end-to-end workflow is:

`Vehicle proposal → duplicate check → initial purchase analysis → approval to inspect → inspection → revised purchase recommendation → purchase approval → cash reservation → pickup scheduling → vehicle intake → documents/workshop/photos/listing → buyer matching → sale/payment/allocation → shipping/container → closeout`

## Non-negotiable Architecture Rules

1. UI → Service → Repository → Data Source.
2. Business logic never reads Google Sheets directly.
3. Sheet access uses header mapping only; never hard-coded column numbers.
4. Spreadsheet row numbers are never business identifiers.
5. Every entity uses a stable ID and `company_id`.
6. AI may recommend and request actions, but writes go through typed tools, policies, services, approvals, and audit logs.
7. AI cannot approve purchases, release payments, or silently overwrite verified business data.
8. Mobile-first operational UI: queues, cards, large actions, minimal typing, evidence uploads.
9. Every production module includes tests, manual QA, known risks, deployment notes, and rollback.
10. Google Sheets remains operational during controlled migration; two-way sync remains disabled until conflict rules, audit, idempotency, and rollback are proven.

## Record 2026 Finding

The uploaded workbook contains one `DATA` sheet, 63 columns, and 3,300 rows with stable `row_id` values. It currently combines vehicle identity, purchase, documents, repairs, listing, sale, buyer, shipping, analytics, and sync metadata into one row.

The target system must normalize those concerns into modules while preserving `row_id` as `source_row_id` for controlled reconciliation.

## Required Documents

- `ARCHITECTURE.md`
- `ROADMAP.md`
- `RECORD_2026_AUDIT.md`
- `CODEX_MASTER_MISSION_TH.md`

## Safe Implementation Order

1. Project Brain and ADRs.
2. One-way Record 2026 sync and data-quality reporting.
3. Companies/users/roles/LINE identity and group authorization.
4. LINE webhook gateway in shadow mode.
5. Task/workflow core.
6. Vehicle proposal capture.
7. Inspection and purchase-decision Skill.
8. Cash reservation and pickup.
9. Downstream operational queues.
10. Buyer intelligence and Executive Control Tower.
11. General Skills, billing, and later Skill marketplace.

## Current Safety Default

All production-affecting feature flags default OFF:

- `line_ingestion`
- `shadow_capture`
- `mention_reply`
- `workflow_write`
- `proactive_alerts`
- `sheet_writeback`
