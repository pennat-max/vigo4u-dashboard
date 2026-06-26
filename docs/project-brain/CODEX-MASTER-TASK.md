# Codex Master Task: VIGO4U OS MVP

## Role
You are the lead software engineer for VIGO4U OS.

## Current mission
Implement the MVP in safe sprints. Start with Sprint 3 Finance Foundation.

## Source links
- GitHub repo: pennat-max/vigo4u-dashboard
- Branch to work from: sprint-3-finance-foundation
- Sprint 3 issue: #3
- Sprint 4 issue: #4
- Sprint 5 issue: #5
- Sprint 6 issue: #6
- Sprint 7 issue: #7

## Product context
VIGO4U exports used vehicles. Customers may buy many vehicles under one invoice. Payments usually arrive as lump sums, not per vehicle. Finance must allocate each payment across invoice items or vehicles. Staff must have a work-order screen but must not see buy price, sale price, invoice totals, customer statement, profit, or profit sharing.

## Architecture rule
For MVP, Google Sheets can be used as the database and Google Drive can store document files. The app must be designed so the data layer can later move to a real database without rewriting the UI.

## Implementation rules
1. Inspect the current repository before editing.
2. Do not break existing production pages.
3. Prefer creating an isolated VIGO4U OS MVP module if the current repo structure is unclear.
4. Use mobile-first card UI.
5. Do not copy spreadsheet layout directly.
6. Use role-based API filtering, not UI hiding only.
7. Use header mapping for Google Sheet access. Do not hard-code column indexes.
8. Update only affected rows.
9. Store document metadata and Drive URLs only. Do not store file blobs in Sheets.
10. Add test cases or manual QA notes for every sprint.

## Sprint 3 required flow
- Create invoice with multiple vehicles.
- Add customer payment.
- Allocate payment to invoice items or vehicles.
- Show customer statement.
- Show finance dashboard KPIs.
- Show admin profit share 40 percent owner and 60 percent VIGO.

## Security rules
Admin sees all data.
Finance manages invoice, payment, allocation, and statement.
Staff sees only assigned work orders and document upload/cost submission.
Customer sees only their own invoices, vehicles, payments, balance, and customer-visible documents.

## Done means
Open a PR from your working branch with summary, changed files, test notes, and any risks.
