# VIGO4U OS Project Brain — Production State

Last updated: 2026-05-25
Mode: [Production Memory]

## Current Production Truth Rule

Production behavior is the highest priority source of truth, but every production note must be reconciled with the latest GitHub implementation before code changes or merge decisions.

## Latest Verified From Repository Connector

- Repo visible: `pennat-max/vigo4u-dashboard`
- Default branch: `main`
- Latest searchable commit exposed by connector: `0114968f14a150b282541041b1e1b656a5e1bba7`
- Commit message: `Prepare project handoff docs`
- Commit date shown by connector: 2026-05-18
- Existing handoff says `npm run build` passed from `vigo4u-dashboard/` as of 2026-05-18.

## Operational Production Notes From Recent Chat

Recent chat notes mention production after PR #77 and PR #78:

- Production commit SHA: `939d17632c957020d507d1e955dfc2fbcd20bbea`
- Production deploy: Ready
- Search fills `95295`: Pass
- Target car visible: `95295 TRAVO 4WD 2.8 4TREX AT Standard SILVER Mar26`
- Scroll/focus/highlight: Pass
- LINE AI queue opens: Pass
- Approve/save UI present: Partially verified safely, not clicked to avoid real production write.
- Assignee display: Pass on visible card/check, selected assignee shown as JOY.
- Copy-ready LINE review link uses `focusCarRowId + search`: Pass
- Search-only fallback works: Pass on `/m/orders?load=full`

## Important Reconciliation Warning

The production SHA above was not found by the GitHub connector when fetched directly. Recent PR search also returned no PRs. This may mean:

- The connector only sees an older repository state.
- Production is deployed from a different repo/branch.
- The SHA belongs to a deployment artifact not visible through this connector.
- The prior chat note may refer to a state not currently available through GitHub tools.

Do not make merge/deploy decisions until this mismatch is resolved.

## Production Safety Rules

- Production deploy requires explicit approval.
- Preview deploy is allowed for testing.
- High-risk PRs must stay in preview first.
- Never merge large PRs without review.
- UI changes require preview or screenshot.
- Backend changes require smoke test results.
- No auto-save to real business tables unless explicitly approved.
- No auto-reply / auto-send unless explicitly approved and feature flag state is verified.

## Required Smoke Checks For Order Tracking / LINE Work

Before any production release affecting `/m/orders` or LINE queue:

1. `/m/orders?load=full` loads.
2. Search by row/plate/spec still works.
3. `focusCarRowId` highlights and scrolls to the target card.
4. LINE AI queue section opens.
5. Assignee/staff displays correctly, not `-` when source has a valid fallback.
6. Copy-ready LINE review link includes focus/search parameters.
7. Approve/save path is tested safely with a test item only.
8. No unintended webhook auto-save.
9. No unintended LINE auto-reply unless feature flag is intentionally enabled.

## Current Production Status

Status: Needs reconciliation.

GitHub Project Brain has captured the latest known production notes, but the actual deploy source and commit mapping must be verified before the next production-impacting task.
