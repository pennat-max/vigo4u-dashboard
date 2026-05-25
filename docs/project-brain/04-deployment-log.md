# VIGO4U OS Project Brain — Deployment Log

Last updated: 2026-05-25
Mode: [Deployment Memory]

## Deployment Rule

Production deploy requires explicit approval. Preview deploy is allowed for testing when the task needs visual or behavior verification.

## Known Repository Build State

From existing handoff dated 2026-05-18:

- Build command should be run from `vigo4u-dashboard/`.
- `npm run build` passed as of that handoff.
- Next.js config uses `vigo4u-dashboard/next.config.mjs`.
- The repo handoff says build fixes did not add routes, API handlers, write workflows, schema changes, or Order Tracking features.

## Known Production Notes From Recent Chat

Operational note from 2026-05-24/2026-05-25 conversation says:

- Production checked after PR #77 + PR #78.
- Production commit SHA: `939d17632c957020d507d1e955dfc2fbcd20bbea`.
- Production deploy: Ready.
- Tested production smoke link.
- `/m/orders?load=full` fallback passed.
- Search/focus/highlight and LINE AI queue review passed.

## Reconciliation Required

The GitHub connector could not fetch commit `939d17632c957020d507d1e955dfc2fbcd20bbea`, and recent PR search returned no PRs for the repo.

Before relying on the production note, confirm one of these:

- Vercel/hosting deployment points to a different repo or branch.
- GitHub connector is looking at an older installation state.
- PR #77/#78 belong to another repository.
- The production SHA is from a deployment system, not this Git repository.

## Deployment Checklist Template

For every production-impacting PR:

1. PR number:
2. Branch:
3. Commit SHA:
4. Build result:
5. Preview URL:
6. Smoke test scope:
7. Production deploy approved by:
8. Production URL checked:
9. Rollback plan:
10. Known risks:

## Current Deployment Recommendation

Do not deploy from this docs branch automatically.

This branch is safe to merge as docs-only after review, but it does not validate production behavior or resolve the production/GitHub mismatch.
