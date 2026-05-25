# VIGO4U OS Project Brain — Architecture

Last updated: 2026-05-25
Mode: [Architecture Memory]

## Architecture Principle

VIGO4U OS must be managed as one existing system, not multiple disconnected projects.

## Source of Truth Layers

1. Production behavior = highest truth
2. GitHub implementation = code truth
3. Supabase = operational app data
4. Google Sheet Record 2026 = current staff workflow outside app
5. Project Brain docs = architecture / decisions / handoff memory
6. Notion / Google Docs = optional business-readable mirror

## Core Stack

- Frontend / app: Next.js in `vigo4u-dashboard/`
- Language: TypeScript
- Styling: Tailwind + shadcn-style components
- Database / backend data: Supabase
- Current car master: `public.cars`
- Staff workflow: Google Sheet Record 2026
- Project memory: GitHub Markdown docs under `/docs/project-brain/`

## Current Modules

### Dashboard

- Read-only dashboard exists.
- Reads from Supabase.
- Should not be redesigned unless the task explicitly asks for dashboard redesign.

### Cars

- Cars list and detail pages exist.
- `public.cars` remains the car master table.
- Record 2026 still feeds/represents staff workflow outside app.

### Order Tracking

Order Tracking covers:

- Parts orders
- Accessories
- Modification jobs
- Stock checks
- Garage pickup/install work
- Customer-requested work
- LINE AI parsed work items / queue review

Recent production notes suggest `/m/orders` and LINE AI queue behavior exist or were being tested, but this must be reconciled against the current GitHub implementation before planning further changes.

### LINE Bridge

Known direction:

- Start from copy-ready/manual review safety.
- No auto-send unless explicitly enabled and tested.
- No real production write from assistant/operator unless approved.
- AI-parsed LINE items must preserve assignee/staff ownership correctly.

### Google Sheet Sync

Known direction:

- One-way sync first.
- Web edit and two-way sync only after one-way sync, audit logs, and conflict rules are stable.
- Google Sheet Record 2026 remains staff workflow until migration is intentionally approved.

## Data Safety Rules

- Do not change Supabase schema without approval.
- Do not run destructive migrations automatically.
- Do not delete production data without explicit confirmation.
- Do not auto-save real business actions unless approved.
- Do not auto-send notifications unless approved.
- Never commit `.env.local`.
- Never print secrets/API keys.

## Delivery Rules

- 1 task = 1 branch = 1 primary tool.
- Shared files need clear ownership.
- UI work should not modify backend infra unless assigned.
- Backend work should not redesign UI unless assigned.
- If two PRs touch the same file, stop and resolve work order first.

## Definition of Done

A task is not complete until:

- Build passes.
- Preview works where relevant.
- Smoke test passes where relevant.
- Handoff updated.
- Affected docs updated.
- Risks documented.
- Production deploy is explicitly approved when needed.

## GitHub Project Brain Decision

Going forward, architecture memory should be committed near the code:

- `/docs/project-brain/00-current-state.md`
- `/docs/project-brain/01-architecture.md`
- `/docs/project-brain/02-production-state.md`
- `/docs/project-brain/03-sprint-status.md`
- `/docs/project-brain/04-deployment-log.md`
- `/docs/project-brain/05-bugs-and-decisions.md`
- `/docs/project-brain/06-ai-handoff.md`

Notion can remain optional, but GitHub Project Brain should be treated as the implementation-adjacent memory layer.
