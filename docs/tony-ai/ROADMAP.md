# TONY AI Platform — Roadmap and Missions

Last updated: 2026-07-12

## Strategy

Build vertical business value first and platform breadth second. The first usable result is a reliable LINE assistant that captures VIGO4U work and safely completes the acquisition workflow—not a universal chatbot.

## Mission 0 — Project Brain and ADR Baseline

Deliver architecture documents, glossary, ADRs, risk register, repository conventions, environment plan, and safe feature flags.

Acceptance: architecture, IDs, data ownership, permissions, and migration rules are explicit; no production data changes; build remains green.

## Mission 1 — Record 2026 One-Way Sync

Deliver header-mapped Sheet repository, staging import, normalization, duplicate/data-quality report, sync checkpoints/hash, dry-run, and read-only vehicle model.

Acceptance: repeated imports do not duplicate business effects; no row-number IDs; no write-back; all mismatches visible and audited.

## Mission 2 — Tenants, Identity, Roles, LINE Groups

Deliver companies/users/members/roles, LINE identity linking, allowed-group registry, group purpose/mode, RBAC/RLS, and admin setup.

Acceptance: unknown users/groups cannot access data; cross-company isolation and permission tests pass.

## Mission 3 — LINE Event Gateway

Deliver signature verification, durable webhook events, idempotency, async processing, media intake, mention/private detection, unsend handling, reply outbox, and shadow mode.

Acceptance: duplicate webhook creates one effect; media is preserved; TONY AI stays quiet unless permitted.

## Mission 4 — Task and Workflow Core

Deliver versioned workflows, task queues, assignment, blockers, evidence, review/rework, SLA/escalation, and mobile My Work.

Acceptance: staff update work in a few taps; managers see owner and aging; every transition is audited.

## Mission 5 — Vehicle Proposal Capture

Deliver proposal extraction from LINE, completeness scoring, duplicate detection, source-message linkage, missing-information questions, and proposal cards.

Acceptance: text/media become draft proposals without manual copying; uncertain matches require confirmation.

## Mission 6 — Inspection and Purchase Decision

Deliver inspection assignment/forms, repair/document risk, stock/sale comparables, buyer matches, target and ceiling prices, recommendation snapshots, approval matrix, and override reasons.

Acceptance: recommendations cite evidence; AI recommendation and human decision are separate; unauthorized approvals are impossible.

## Mission 7 — Cash Reservation and Pickup

Deliver cash calendar, deposit/balance tracking, finance approval, pickup queue, driver assignment, route grouping, and pickup/arrival proof.

Acceptance: executives can ask cash required by date; AI cannot release payment; pickup completion requires evidence.

## Mission 8 — Intake and Department Queues

Deliver proposal-to-vehicle conversion and automatic document/workshop/photo/edit/listing/QC tasks.

Acceptance: one arrival event creates correct downstream work; known vehicle data is not re-entered; pending and rejected costs follow business rules.

## Mission 9 — Buyer Intelligence and Sales

Deliver buyer master, preferences, active requests, match score/reasons, outreach queue, contact results, and offer/listing generation.

Acceptance: prior and active buyers are suggested with evidence and permission controls.

## Mission 10 — Executive Control Tower

Deliver purchase, cash, stock, stage-aging, workflow, data-quality, projected profit, and exception dashboards plus daily LINE summaries.

Acceptance: executives understand current operational risk in under one minute and can drill to source records.

## Mission 11 — First-Party General Skills

Deliver translation, summary, OCR/document, speech transcription, image transformation, accountant support, and legal-document support.

Acceptance: Skills are installed, versioned, permission-scoped, cost-metered, and high-risk outputs require review.

## Mission 12 — SaaS and Billing

Deliver onboarding, subscriptions, usage ledger, credits, invoices, limits, tenant administration, and support tools.

Acceptance: infrastructure cost and customer charge reconcile per usage event; tenant isolation passes.

## Mission 13 — Skill SDK and Marketplace

Only after first-party Skills and security are stable. Deliver manifest, package signing, sandbox, review pipeline, publisher portal, revenue sharing, and kill switch.

## Mandatory Release Gate for Every Mission

- requirements and acceptance criteria;
- privacy/threat review;
- database migration review;
- unit, integration, permission, and idempotency tests;
- manual mobile QA;
- known risks;
- deployment notes;
- rollback plan;
- updated Project Brain.

## Recommended Initial Sequence

1. Missions 0–3;
2. Workflow core;
3. Proposal capture;
4. inspection/purchase decision;
5. cash/pickup;
6. Executive Control Tower pilot.

Roll out through offline replay, shadow capture, mention-only test group, read-only answers, confirmed draft actions, controlled writes, proactive exceptions, then wider groups and external tenants.
