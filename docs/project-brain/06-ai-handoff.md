# VIGO4U OS Project Brain — AI Handoff

Last updated: 2026-05-25
Mode: [AI Traffic Controller]

## Startup Protocol For New Chat

When user types `[VIGO4U OS] Continue from latest state`:

1. Read `/docs/project-brain/00-current-state.md`.
2. Read `/docs/project-brain/02-production-state.md`.
3. Read latest GitHub implementation state.
4. Ignore outdated chat history if implementation is newer.
5. Continue immediately without unnecessary setup questions.

## Required Reading By Task Type

### Any VIGO4U OS task

- `docs/project-brain/00-current-state.md`
- `docs/project-brain/01-architecture.md`
- `docs/project-brain/06-ai-handoff.md`

### Production / Deploy / Smoke Test

- `docs/project-brain/02-production-state.md`
- `docs/project-brain/04-deployment-log.md`
- `docs/project-brain/05-bugs-and-decisions.md`

### Sprint / Planning

- `docs/project-brain/03-sprint-status.md`
- `PROJECT_TASKS.md`
- `VIGO4U_HANDOFF.md`

### Order Tracking / LINE AI Queue

- `docs/project-brain/02-production-state.md`
- `docs/project-brain/05-bugs-and-decisions.md`
- `ORDER_TRACKING_PLAN.md`
- Relevant app/source files after repo inspection

## Tool Routing

### ChatGPT

Use for:

- PM / architecture
- work order
- merge recommendation
- production safety review
- AI traffic control
- docs/memory sync

### Codex

Use for:

- backend
- API
- webhook
- Supabase
- cron jobs
- build checks
- smoke tests
- GitHub PRs

### Cursor

Use for:

- UI/UX
- mobile layout
- screenshots
- cards/tabs/filter chips
- visual fixes

### Claude Code

Use for:

- deep review
- architecture review
- large PR review
- conflict analysis
- refactor review

### Manus

Use for:

- business workflow
- SOP
- process mapping
- staff operation design

### n8n / Vercel Cron

Use for:

- scheduled automation
- retry flows
- periodic sync
- lightweight polling/queue work

## Required Response Format For New Tasks

Always respond with:

- Suitable tool:
- Can run in parallel:
- Work order:
- Prompt for assigned tool:
- Restrictions:
- Required report after completion:
- Merge recommendation:

## Current Recommended Next Task

Task: Reconcile production deployment source with GitHub implementation.

Suitable tool: Codex / GitHub + hosting inspection

Prompt:

```text
[Production Reconciliation]

Repo: pennat-max/vigo4u-dashboard

Goal:
Verify whether current production is deployed from this repository, which branch, and which commit.

Known mismatch:
- Recent production note says SHA 939d17632c957020d507d1e955dfc2fbcd20bbea after PR #77/#78.
- GitHub connector cannot find that SHA in this repo.
- Recent PR query shows no PRs.

Work:
1. Inspect current GitHub main branch.
2. Identify whether /m/orders and LINE AI queue implementation exists in the repo.
3. Identify hosting deployment source/commit if accessible.
4. Compare current production behavior notes with GitHub source.
5. Do not modify app code.
6. Do not deploy.
7. Report exact repo, branch, commit, file paths, and mismatch summary.

Required report:
- Actual deployed repo/branch/commit if found
- Whether /m/orders exists in source
- Whether LINE AI queue exists in source
- Whether assignee fallback fix exists in source
- Risk level
- Recommended next PR
```

## Restrictions

- Do not merge or deploy without explicit approval.
- Do not change schema unless approved.
- Do not touch `.env.local`.
- Do not print secrets.
- Do not auto-send LINE messages.
- Do not auto-save production business records.

## Merge Recommendation For This Docs Branch

Docs-only branch can be merged after review if it only adds `/docs/project-brain/` files and contains no secrets.

No production deployment required for docs-only merge.
