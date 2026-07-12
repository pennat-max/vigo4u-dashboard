# Record 2026 Audit and Migration Rules

Last updated: 2026-07-12

Source inspected: uploaded `Record 2026.xlsx`

## Structural Findings

- Sheet: `DATA`
- Columns: 63 (`A:BK`)
- Stable `row_id`: 3,300 data records
- Formula count in uploaded file: 0; values are materialized
- `row_id`, `last_synced_at`, and `sync_status` are populated for all 3,300 records
- `sync_status` is consistently `synced`
- Duplicate chassis values found: 3 values appearing twice
- Duplicate plate values found: 4 values appearing twice
- Current statuses include `P.Office`, `Advance`, `Comming`, `3.Cancel`, `Check Doc`, `2.Confirm`, `1.Ready`, and `Consign`
- Buyer names have case/name variants, for example `FALUK` and `faluk`
- Analytical fields are repeated on each vehicle row: `All`, `Sold`, `Avalible`, `Min`, `Med`, `Max`, `Top Country`, `Top Buyers`

Duplicate findings require review; they are not automatically classified as errors.

## Architectural Finding

One row currently contains multiple entities and timelines:

- vehicle identity/specification;
- sourcing and purchase;
- intake and documents;
- repairs and modifications;
- listing;
- buyer and sale;
- shipping;
- aggregate analytics;
- integration metadata.

The target platform must normalize these modules and preserve history while continuing to reconcile to the source workbook.

## Target Mapping

### Vehicle Master

`Plate Number`, `Province`, `Brand`, `Drive Type`, `Engine Size`, `Grade`, `Gear Type`, `Cabin`, `Color`, `Manufacture`, `Registration`, `Engine Number`, `Chassis Number`, `Mileage`, `Model`, `Model Year`, `C_Year` map to vehicle identity/specification tables.

`Spec`, `Model Summary`, and `Model Year Summary` are derived display/analytical dimensions and must not be treated as independent authorities.

### Purchase and Intake

`Status` maps through a canonical translation table and status history.

`Advance Date`, `Income Date`, `Agent`, `Inspector`, `Driver Location`, `Initial Document`, `Document Status`, `Doc Fee`, `Advance`, and `Buy Price` map to proposals, inspections, purchase decisions, cash/payment events, pickup, documents, and approved vehicle costs.

`Total Cost` becomes derived from approved actual costs. It must not be an independently editable source of truth.

### Workshop and Modifications

`Repair Cost`, `Repair Details`, `Part&Accessories`, and `Requested Modifications` map to work orders, work-order items, and vehicle costs.

`Free` and `Other` require business-definition clarification and renaming before migration.

### Media and Listing

`Picture`, `Web Price($)`, and `BF On web` map to media workflow and listing/version tables.

### Sales and Buyer

`Booked Date`, `Sale Price $`, `Buyer`, `Sale Support`, and `Remarks` map to buyer/customer IDs, sales/sale items, assigned salesperson, and structured notes/timeline.

Buyer and employee names must be normalized to IDs instead of used as foreign keys.

### Shipping

`Booked Shipping`, `Destination Port`, `Shipped`, `Country`, and `Month` map to shipment bookings, shipment events, assignments, and derived reporting dimensions.

### Remove from Transaction Row

`All`, `Sold`, `Avalible`, `Min`, `Med`, `Max`, `Top Country`, and `Top Buyers` must be produced by queries/materialized views, not repeated on each vehicle.

### Integration Metadata

- `row_id` → preserve as `source_row_id`
- `last_synced_at`, `sync_status`, `sync_hash` → `integration_sync_records`

## Current Data Completeness Observations

Vehicle identity/specification is generally populated. Buyer/sale/country history exists for much of the stock. Repair cost, picture/listing, and shipping information is sparse or likely represents mixed workflow meanings, so AI estimation must not assume those columns alone are complete historical truth.

## Canonical Status Candidate Mapping

This mapping is a migration draft and requires business confirmation:

| Current | Candidate canonical meaning |
|---|---|
| `Comming` | `incoming` |
| `P.Office` | `at_office` |
| `Check Doc` | `document_hold` |
| `1.Ready` | `available` |
| `2.Confirm` | `booked_or_confirmed` |
| `3.Cancel` | `cancelled` |
| `Consign` | `consignment` |
| `Advance` | separate deposit/advance workflow or flag; do not force into lifecycle without confirmation |

Do not rename source Sheet values directly during initial migration.

## Safe Migration Sequence

1. Preserve and back up the workbook.
2. Read by header mapping only.
3. Import to staging.
4. Validate types, required fields, duplicates, and canonical values.
5. Generate review report.
6. Create normalized buyer, agent, employee, and vehicle candidates.
7. Link `source_row_id` to platform IDs.
8. Promote accepted records to read-only normalized views.
9. Reconcile counts and financial totals.
10. Allow new workflow writes only to platform tables.
11. Keep Sheet write-back OFF until conflict UI, field-authority matrix, audit, rollback, and idempotency tests pass.

## Critical Data Decisions Before Two-Way Sync

- review duplicate chassis and plates;
- define field authority per field;
- normalize buyers, agents, and users;
- validate mixed date values;
- separate estimated, approved, actual, pending, and rejected costs;
- define `Free`, `Other`, `Income Date`, and `Picture` precisely;
- define canonical lifecycle and parallel department workflows.

## Reconciliation Checklist

Compare source and target for:

- row counts and unique row IDs;
- duplicate chassis/plates;
- status counts;
- brand/model/year counts;
- buy-price totals;
- sale-price totals and currencies;
- buyer and country counts;
- available/booked/shipped counts;
- missing required fields.

Every discrepancy requires a documented reason and audit reference.
