# Sprint 3: Finance Foundation

## Goal
Build the first usable finance loop for VIGO4U OS MVP.

## Core user flow
1. Finance selects customer.
2. Finance creates invoice.
3. Finance adds multiple vehicles to invoice.
4. Customer pays one lump sum.
5. Finance allocates payment across vehicles.
6. System shows customer statement.
7. Admin sees profit share.

## Data model
Required tables or sheet tabs:
- Companies
- Customers
- Vehicles
- Invoices
- Invoice_Items
- Payments
- Payment_Allocations
- Documents
- Users
- Roles
- Profit_Sharing

## Required screens
- Finance Dashboard
- Invoice List
- Invoice Detail
- Create Invoice
- Payment Entry
- Payment Allocation
- Customer Statement
- Admin Profit Share

## Permission matrix
Admin:
- full access

Finance:
- invoice, payment, statement
- sale price allowed
- buy price hidden unless admin

Staff:
- no invoice totals
- no buy price
- no sale price
- no profit
- no customer statement

Customer:
- own records only

## Acceptance tests
- Invoice supports at least 3 vehicles.
- Payment can be split across 2 or more vehicles.
- Partial payment leaves correct balance.
- Overpayment creates unallocated amount or customer credit.
- Staff API response contains no financial fields.
- Customer cannot access another customer's invoice.

## QA notes
Document manual test results in the PR description.
