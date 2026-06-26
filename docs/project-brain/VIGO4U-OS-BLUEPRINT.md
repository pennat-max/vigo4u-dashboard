# VIGO4U OS Blueprint

## Mission
Create an operational system for used vehicle export. The system must support sales, finance, workshop, export documents, customer portal, and executive dashboards.

## Sources of truth
- Production behavior wins.
- GitHub is implementation truth.
- Google Sheet is MVP business data store.
- Google Drive stores files and documents.
- Project Brain stores architecture and sprint memory.

## MVP modules
1. Finance
2. Workshop
3. Customer Portal
4. Dashboard and Alerts
5. Production Hardening

## Key objects
- Company
- User
- Customer
- Vehicle
- Invoice
- Invoice Item
- Payment
- Payment Allocation
- Work Order
- Work Order Cost
- Document
- Profit Share
- Activity Event

## Core workflow
Vehicle selected -> Invoice created -> Payment received -> Payment allocated -> Statement updated -> Work order executed -> Cost approved -> Documents attached -> Dashboard updated -> Profit recognized.

## Role model
Admin: all access.
Finance: invoice and payment operations.
Staff: assigned work only.
Customer: own portal only.

## Future migration
The MVP may start with Google Sheets, but the data layer must be abstracted so Supabase or another database can replace Sheets later.
