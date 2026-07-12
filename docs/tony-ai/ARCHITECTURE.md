# TONY AI Platform — Architecture

Last updated: 2026-07-12

## Target Architecture

```text
LINE / Web / Future Channels
            │
            ▼
Channel Adapters
- verify signatures
- normalize text/image/audio/file/postback
- retrieve and preserve media
- deliver replies and push messages
            │
            ▼
Event Ingestion Gateway
- tenant/group/user resolution
- idempotency and correlation IDs
- durable event storage
- rate and cost limits
- asynchronous queue
            │
            ▼
AI Orchestrator
- intent classification
- context assembly
- installed Skill routing
- structured tool planning
- response generation
            │
      ┌─────┴─────────────┐
      ▼                   ▼
Policy Engine         Knowledge & Memory
- RBAC/ABAC           - SOP/documents
- approval limits     - verified facts
- workflow state      - conversation context
- data masking        - permission-aware retrieval
      │                   │
      └──────┬────────────┘
             ▼
Tool Gateway + Workflow Engine
- strict schemas
- permission checks
- deterministic transitions
- confirmation and approvals
- immutable audit events
             │
             ▼
Domain Services
Procurement | Vehicles | Tasks | Workshop | CRM/Sales
Finance | Documents | Export/Shipping | Reporting | Billing
             │
             ▼
Repository Interfaces
SheetRepository | DriveRepository | PostgresRepository
StorageRepository | MessagingRepository
             │
             ▼
Google Sheets/Drive during transition
Supabase PostgreSQL/Storage as normalized target
```

## Layer Responsibilities

### Channel Adapter

The LINE adapter must verify webhook signatures, persist events before heavy processing, deduplicate redeliveries, process asynchronously, download media promptly, record unsend events, and stay silent unless mentioned, privately messaged, or a configured proactive rule fires.

All channels produce one canonical event containing `event_id`, `company_id`, channel, conversation, actor, timestamp, message type, content reference, and correlation ID.

### AI Orchestrator

The orchestrator identifies intent, filters Skills by tenant installation and user permission, retrieves only necessary authorized context, proposes typed tool calls, and composes a role-appropriate response. It never mutates the database directly.

### Policy Engine

Policy checks occur before context retrieval and before action execution. Outcomes are: allow, deny, allow masked, require confirmation, require manager approval, or require executive approval.

### Skill Runtime

A Skill is a versioned module declaring intents, input/output schemas, allowed tools, data scopes, required permissions, risk class, cost class, evaluations, and fallback behavior. Skills never receive unrestricted database credentials.

### Tool Gateway

Tools are typed server-side operations such as `proposal.create`, `inspection.assign`, `purchase.calculate_recommendation`, `purchase.submit_for_approval`, `cash.reserve_draft`, `pickup.schedule`, `buyer.match`, and `task.complete`.

Every tool validates input, verifies permissions, checks workflow state, executes a domain service, records audit data, and returns structured results.

### Workflow Engine

Use explicit, versioned state machines with workflow instances, tasks, dependencies, SLA timers, assignments, approvals, escalation, retries, cancellation, and compensation. Workflows must never live only in prompts or UI conditions.

### Domain Services

Business rules belong in services such as ProcurementService, VehicleService, InspectionService, PurchaseDecisionService, CashPlanningService, PickupService, WorkshopService, BuyerMatchingService, SalesService, PaymentAllocationService, ShippingService, NotificationService, and UsageBillingService.

### Repository Layer

Services use repository interfaces. Google Sheets implementations use header mapping only. No service may know spreadsheet ranges, row numbers, Supabase query syntax, or storage URLs.

## Data Storage

### PostgreSQL

System of record for identity, permissions, LINE events, workflows, tasks, approvals, Skills, billing, audit, and normalized business entities.

### Google Sheets

Controlled transition source and operational view. `Record 2026` remains unchanged during initial one-way ingestion. TONY AI must not write directly to it.

### Files

Original and derived files live in Google Drive or object storage. Database stores metadata, checksum, entity links, sensitivity, version, and URL.

### Knowledge Search

All document chunks carry `company_id`, classification, permission scope, validity dates, and source. Access filters are applied before content reaches the model.

## Reliability Requirements

- webhook and command idempotency;
- durable queues and dead-letter handling;
- retries with exponential backoff;
- database transactions;
- optimistic concurrency/version fields;
- outbox pattern for notifications;
- immutable audit timeline;
- feature flags and kill switches;
- dry-run and shadow modes;
- rate, quota, and cost limits;
- health checks, metrics, tracing, and alerts.

## Environment Isolation

Use separate development, staging, and production databases, storage, API keys, LINE channels, and feature flags. Production deployment requires migration review, backup, permission tests, smoke tests, observability, and rollback.

## Required Core Tables

- companies, users, company_members, roles, permissions;
- channel_accounts, channel_groups, channel_identities;
- messages, attachments, extracted_facts;
- workflow_definitions, workflow_instances, tasks, task_updates, approvals;
- skills, skill_versions, company_skills;
- audit_events, usage_events, subscriptions, credit_wallets;
- integration_sync_records.

## Vehicle Vertical Tables

- vehicle_proposals;
- inspections;
- purchase_decisions;
- cash_reservations;
- pickup_jobs;
- vehicles and vehicle_status_history;
- work_orders, work_order_items, vehicle_costs;
- vehicle_media and documents;
- listings;
- buyers, buyer_preferences, buyer_requests, buyer_matches;
- sales, sale_items, invoices, invoice_items, payments, allocations;
- shipments, containers, container_vehicle_assignments.

## Architecture Decisions to Record

Create ADRs for source-of-truth transition, repository abstraction, multi-tenant isolation/RLS, LINE idempotency, workflow engine, AI model routing, Skill/tool permissions, memory retention, storage, billing ledger, and Sheet conflict resolution.
