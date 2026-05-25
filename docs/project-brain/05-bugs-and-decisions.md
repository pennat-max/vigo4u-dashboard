# VIGO4U OS Project Brain — Bugs And Decisions

Last updated: 2026-05-25
Mode: [Decision Log]

## Decision: GitHub Markdown Becomes Project Brain Layer

Decision date: 2026-05-25

Decision:

- Store VIGO4U OS project memory in GitHub Markdown under `/docs/project-brain/`.
- Keep Notion as optional readable mirror, not sole source of truth.
- Implementation and production behavior remain higher priority than docs.

Reason:

- VIGO4U OS is implementation-heavy.
- Codex/Cursor/Claude need repository-local context.
- GitHub history gives clear version control and review flow.

Impact:

- Future architecture/workflow/production-impacting PRs must update relevant Project Brain files.
- Old chat history should not override repository state.

## Decision: Docs-Only Migration First

Decision date: 2026-05-25

Decision:

- This Project Brain migration must not change app code, schema, routes, production behavior, webhook behavior, or LINE behavior.

Reason:

- Current production/GitHub state needs reconciliation.
- Documentation structure can be safely added without risking production.

## Active Bug / Risk: Production SHA Not Found In GitHub Connector

Observed:

- Recent production note references SHA `939d17632c957020d507d1e955dfc2fbcd20bbea`.
- GitHub connector returned no commit found for that SHA.
- Recent PR query returned no PRs.

Risk:

- Production may be deployed from a repo/branch not visible here.
- GitHub Project Brain could become stale if not reconciled.

Required action:

- Verify hosting deployment source.
- Confirm actual repo/branch/commit behind production.
- Update `02-production-state.md` and `04-deployment-log.md` after verification.

## Active Bug Memory: LINE Assignee Fallback

Recent chat context says an assignee/staff persistence bug existed:

- UI displayed an assignee from group/sale fallback.
- Save payload used a different fallback source.
- Result: `assignee_staff` could be missing when saved to `order_items`, showing as `-` in app.

Reported fix direction:

- Save payload should use the same fallback assignee shown in UI.
- Duplicate warning path should use the same fallback.
- Persistence field remains `order_items.assignee_staff`.
- No schema change.

Verification needed:

- Confirm actual implementation in GitHub before assuming fixed.
- Production smoke should include assignee display and save payload check with a test item only.

## Guardrail Decision: LINE / Production Writes

Decision:

- Do not click approve/save on real production data during smoke unless explicitly approved.
- Do not enable LINE auto-reply unless feature flag state and test scope are explicitly approved.
- Prefer copy-ready manual messages until the queue/review workflow is stable.

## Guardrail Decision: Sync

Decision:

- Do not implement two-way sync until one-way sync, audit logs, and conflict rules are stable.
- Google Sheet Record 2026 remains staff workflow until migration is explicitly approved.

## Guardrail Decision: Database

Decision:

- No schema change without approval.
- No destructive migration automatically.
- No production data delete without explicit confirmation.
