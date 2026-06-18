# PROJECT_CONTEXT.md

# Warehouse Management System (WMS)

## Required AI Contributor Instructions

Before generating code or changing implementation files, AI contributors must read this document completely. The Architecture Decisions section is frozen and must not be changed unless a human maintainer explicitly updates the project direction.

## Project Overview

Warehouse Management System (WMS) is a mobile-first inventory accountability platform for small and medium businesses.

Primary devices:

- iPhone
- Android
- MacBook
- Desktop Browser

Primary users:

- Owner
- Warehouse Manager
- Store Staff

The system focuses on inventory traceability and accountability.

Key business questions:

- Who imported goods?
- Who requested goods?
- Who approved requests?
- Who exported goods?
- Who adjusted inventory?
- Where are the goods located?
- Why does inventory mismatch happen?

## Vision

Build a simple, practical, and reliable warehouse management system.

The goal is **not** to build a complex ERP.

The goal is to solve daily warehouse operational problems.

## Technology Stack

### Frontend

- Framework: Next.js 15
- Language: TypeScript
- UI: Tailwind CSS, shadcn/ui
- Forms: React Hook Form
- Validation: Zod
- HTTP Client: Axios
- Server State: TanStack Query
- Package Manager: npm

### Backend

- Language: Java 17
- Framework: Spring Boot 3.1.x
- Build Tool: Maven
- Database: PostgreSQL
- Migration: Flyway
- Security: Spring Security, JWT Authentication
- API Documentation: OpenAPI, Swagger UI

### Development Environment

- Developer Machine: MacBook
- Frontend: Node.js LTS
- Backend: Java 17
- Database: PostgreSQL

### Future Deployment

Not required for MVP.

Target deployment:

- Ubuntu VPS
- Docker
- Docker Compose
- Nginx

## Architecture Principles

### Mobile First

The system must be designed for mobile users first. Desktop support is required but secondary.

Primary usage:

- Owner uses mobile.
- Warehouse Manager uses mobile.
- Store Staff uses mobile.

### Monolith Architecture

Use a single backend application.

Do **not** use:

- Microservices
- Event Driven Architecture
- Kafka
- RabbitMQ

MVP must remain simple.

### REST API

Frontend communicates with backend through REST API only.

Examples:

```http
GET /api/products
POST /api/products
PUT /api/products/{id}
DELETE /api/products/{id}
```

### Package By Feature

Backend structure must follow package-by-feature.

Example:

```text
product/
inventory/
request/
transaction/
user/
dashboard/
```

Avoid package-by-layer architecture.

## Core Business Modules

### Authentication

Features:

- Login
- Logout
- JWT Authentication

### Authorization

#### OWNER

Permissions:

- Full access

#### WAREHOUSE_MANAGER

Permissions:

- Import inventory
- Approve requests
- Export inventory
- Inventory adjustment

#### STORE_STAFF

Permissions:

- Search products
- View inventory
- Create requests
- View own requests

### Product Management

Fields:

- SKU
- Name
- Category
- Unit
- Barcode
- Purchase Price
- Selling Price
- Expiration Date
- Status

### Warehouse Location

Structure:

- Warehouse
- Shelf
- Bin

Example:

```text
Warehouse 7F
Shelf B
Bin B02
```

### Inventory Import

Features:

- Create import transaction
- Supplier
- Imported by
- Import date
- Quantity

### Item Request

Features:

- Create request
- Request items
- Request history

Status:

- PENDING
- APPROVED
- REJECTED
- COMPLETED

### Request Approval

Features:

- Approve request
- Reject request
- Approval history

### Inventory Export

Features:

- Deliver items
- Export transaction
- Delivered by
- Received by
- Delivery timestamp

### Inventory Adjustment

Features:

- Inventory check
- Inventory correction
- Adjustment reason

### Dashboard

Metrics:

- Total products
- Inventory value
- Pending requests
- Low stock products
- Expiring products

## Inventory Design Rules

### Single Source Of Truth

Inventory must be calculated from transactions.

Never manually edit inventory quantity.

Example:

```text
IMPORT +100
EXPORT -20
EXPORT -10
ADJUSTMENT -2
Current Inventory = 68
```

### Transaction Types

- IMPORT
- EXPORT
- ADJUSTMENT

All inventory movements must create transactions.

### Audit Trail

Every inventory movement must be traceable.

Record:

- User
- Timestamp
- Action
- Reason

## Backend Structure

```text
src/main/java/com/bitsbok/wms
├── config/
├── security/
├── common/
├── product/
├── inventory/
├── request/
├── transaction/
├── dashboard/
└── user/
```

## Frontend Structure

```text
src/
├── app/
├── features/
├── components/
├── services/
├── hooks/
├── lib/
├── types/
└── utils/
```

## API Response Standard

Success:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Coding Standards

### Backend

Requirements:

- Constructor injection only
- DTO for API communication
- Business logic in Service layer
- Repository layer for data access
- Flyway for schema migration

Avoid:

- Field injection
- Business logic in Controller
- Native SQL unless necessary

### Frontend

Requirements:

- TypeScript strict mode
- Reusable components
- Responsive design
- Service layer for API calls

Avoid:

- `any` type
- Inline API calls inside UI components

### Logging

Use:

- SLF4J
- Logback

Log important actions:

- Login
- Import Inventory
- Export Inventory
- Approve Request
- Reject Request
- Inventory Adjustment

## Testing Strategy

### Backend Unit Test

Tools:

- JUnit 5
- Mockito

Target:

- Service Layer Coverage >= 80%

Must test:

- Import Inventory
- Export Inventory
- Request Approval
- Inventory Calculation

### Backend Integration Test

Tools:

- Spring Boot Test
- Testcontainers

Must test:

- Controller
- Repository
- Database Integration

### Frontend Test

Tools:

- Vitest
- React Testing Library

Must test:

- Form Validation
- Request Creation
- Approval Workflow

## Definition Of Done

A feature is considered complete only when:

Backend:

- API implemented
- Validation implemented
- Unit tests passed
- Integration tests passed
- Swagger updated

Frontend:

- Mobile responsive
- Desktop responsive
- Loading state
- Error state
- Success state

Quality:

- No TODO
- No warning
- No dead code

## MVP Scope (Version 1)

Included:

- Authentication
- Authorization
- Product Management
- Warehouse Location
- Inventory Import
- Item Request
- Request Approval
- Inventory Export
- Inventory Transactions
- Dashboard

Not Included:

- Multi Warehouse
- AI Forecasting
- Kafka
- Redis
- Microservices
- Complex Reporting

## Guiding Principle

This system is not an inventory counting application.

Its main value is accountability.

Every inventory movement must answer:

- Who did it?
- When?
- Why?
- What changed?

Traceability is more important than feature quantity.

## Database Design

### Database Principles

#### Rule 1

Inventory must be calculated from transactions.

Inventory quantity is never the source of truth.

Current inventory is derived from:

- IMPORT transactions
- EXPORT transactions
- ADJUSTMENT transactions

Formula:

```text
Current Inventory = Total IMPORT - Total EXPORT +/- Total ADJUSTMENT
```

#### Rule 2

Every inventory movement must generate an inventory transaction.

No inventory change is allowed without a transaction record.

#### Rule 3

All primary keys use UUID.

Example:

```text
UUID id
```

Do not use Long IDs.

#### Rule 4

All tables include audit fields.

Required fields:

- created_at
- created_by
- updated_at
- updated_by

## Core Database Tables

### users

Purpose: System users.

Fields:

- id
- username
- password_hash
- full_name
- role
- status
- created_at
- updated_at

### products

Purpose: Product master data.

Fields:

- id
- sku
- name
- category
- unit
- barcode
- purchase_price
- selling_price
- status
- created_at
- updated_at

### warehouses

Purpose: Warehouse definitions.

Fields:

- id
- code
- name
- created_at
- updated_at

Examples:

- 7F
- 12F
- Cold Storage 1

### locations

Purpose: Physical storage locations.

Fields:

- id
- warehouse_id
- shelf_code
- bin_code
- created_at
- updated_at

Example:

```text
Warehouse 7F
Shelf B
Bin B02
```

### product_locations

Purpose: Map products to warehouse locations.

Fields:

- id
- product_id
- location_id

### inventory_transactions

Purpose: Single source of truth for inventory.

Fields:

- id
- product_id
- transaction_type
- quantity
- reference_type
- reference_id
- note
- performed_by
- created_at

Transaction Types:

- IMPORT
- EXPORT
- ADJUSTMENT

Reference Types:

- IMPORT_ORDER
- EXPORT_ORDER
- INVENTORY_ADJUSTMENT

### import_orders

Purpose: Inventory import document.

Fields:

- id
- supplier
- imported_by
- import_date
- note
- created_at

### import_order_items

Purpose: Imported products.

Fields:

- id
- import_order_id
- product_id
- quantity
- unit_price

### item_requests

Purpose: Product requests from store staff.

Fields:

- id
- requested_by
- status
- request_date
- approved_by
- approved_at
- note

Statuses:

- PENDING
- APPROVED
- REJECTED
- COMPLETED

### item_request_items

Purpose: Requested products.

Fields:

- id
- request_id
- product_id
- quantity

### export_orders

Purpose: Inventory export document.

Fields:

- id
- request_id
- delivered_by
- received_by
- export_date
- note

### export_order_items

Purpose: Exported products.

Fields:

- id
- export_order_id
- product_id
- quantity

### inventory_adjustments

Purpose: Inventory correction.

Fields:

- id
- adjusted_by
- adjustment_date
- reason
- note

### inventory_adjustment_items

Purpose: Adjustment details.

Fields:

- id
- adjustment_id
- product_id
- system_quantity
- actual_quantity
- difference_quantity

## Entity Priority

### Phase 1

Required:

- User
- Product
- Warehouse
- Location
- ImportOrder
- ItemRequest
- ExportOrder
- InventoryTransaction

### Phase 2

Add:

- InventoryAdjustment
- Barcode
- LowStockAlert
- ExpirationAlert

### Phase 3

Add:

- MultiWarehouse
- Reports
- Notifications

## System Flows

### Authentication Flow

```text
User
Login
JWT Token Issued
Access System
```

### Product Management Flow

```text
Warehouse Manager
Create Product
Update Product
Product Available For Use
```

### Import Inventory Flow

```text
Warehouse Manager
Create Import Order
Receive Goods
Save Import Order
Create IMPORT Transactions
Inventory Updated
```

### Product Request Flow

```text
Store Staff
Create Request
PENDING
Warehouse Manager Reviews
APPROVED or REJECTED
```

### Export Inventory Flow

```text
Approved Request
Warehouse Staff Picks Goods
Create Export Order
Create EXPORT Transactions
Inventory Updated
Request COMPLETED
```

### Inventory Adjustment Flow

```text
Warehouse Manager
Physical Stock Check
Difference Found
Create Adjustment
Create ADJUSTMENT Transactions
Inventory Updated
```

### Inventory Calculation Flow

```text
Inventory Transactions
Aggregate By Product
IMPORT Total
EXPORT Total
ADJUSTMENT Total
Current Inventory
```

## Business Rules

### Rule 1

Only APPROVED requests can be exported.

### Rule 2

EXPORT quantity cannot exceed available inventory.

### Rule 3

Every IMPORT creates IMPORT transactions.

### Rule 4

Every EXPORT creates EXPORT transactions.

### Rule 5

Every inventory adjustment creates ADJUSTMENT transactions.

### Rule 6

Inventory cannot become negative.

### Rule 7

Inventory history must never be deleted. Soft delete only.

### Rule 8

Every inventory movement must be traceable.

Required information:

- Who
- When
- What
- Why

## Reporting Rules

Dashboard metrics must be calculated from transactions.

Do not store dashboard totals in database.

Examples:

- Inventory Value
- Total Imports
- Total Exports
- Pending Requests
- Low Stock Products

All metrics should be computed from source data.

## Architecture Decisions (Frozen)

These decisions are frozen and must not be changed by AI tools.

1. Mobile First Design
2. Monolith Architecture
3. REST API Only
4. Package By Feature
5. UUID Primary Keys
6. JWT Authentication
7. Inventory Calculated From Transactions
8. PostgreSQL As Primary Database
9. No Microservices
10. No Kafka
11. No RabbitMQ
12. No Redis In MVP
13. Unit Tests Required
14. Integration Tests Required
15. Responsive Design Required
16. Audit Trail Required
