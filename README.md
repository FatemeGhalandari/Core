# Core

Core is a reusable full-stack SaaS workflow and case management platform.

It is built around one central business object: a **Case**. A case can represent a request, lead, application, booking, claim, support issue, appointment request, transaction review, or any other unit of operational work.

The current demo workspace uses MapleCare Clinic seed data, but the product itself is intentionally generic. Core is designed as a reusable workflow engine that can be adapted across industries through configurable labels, statuses, categories, intake fields, assignments, permissions, and reports.

## Product Concept

Most businesses have the same operational shape:

- A customer submits or creates work.
- A team triages that work.
- The work moves through statuses.
- Someone owns the next step.
- The organization needs visibility into volume, bottlenecks, and outcomes.

Core turns that pattern into a reusable product foundation. Instead of building a separate app for every vertical, Core provides the shared workflow infrastructure and lets each workspace configure the language and structure around it.

Examples:

- Clinic: Case = appointment request or patient intake
- Realty: Case = buyer lead, seller lead, or viewing request
- Finance: Case = application, dispute, or transaction review
- Insurance: Case = claim or quote request
- Sales: Case = lead or deal
- Local Business: Case = booking or service request

## Main Features

- Operations inbox for searching, filtering, and prioritizing cases
- Case detail pages with workflow status, assignee, customer, comments, activity, and intake data
- Customer records linked to related cases
- Configurable workflow statuses
- Configurable case categories
- Configurable intake fields
- Required intake field validation
- Workspace profile settings for app name, case label, customer label, and template key
- Read-only workspace template previews
- Team member visibility with open assigned case counts
- Role-aware frontend navigation and access screens
- Basic demo login flow
- Backend role middleware for protected write actions
- Operations reports powered by backend report data
- Realistic seeded demo workspace with users, customers, cases, comments, activity, assignments, priorities, and intake data

## Tech Stack

Frontend:

- React
- TypeScript
- Vite
- React Router
- TanStack React Query
- Axios
- Plain CSS

Backend:

- Node.js
- Express
- TypeScript
- Prisma 7
- PostgreSQL
- Zod
- bcryptjs

Tooling:

- npm workspaces
- Docker Compose for local PostgreSQL

## Screenshots

Add screenshots here before sharing the project publicly.

### Login

<!-- Screenshot placeholder: /screenshots/login.png -->

### Case Inbox

<!-- Screenshot placeholder: /screenshots/case-inbox.png -->

### Case Detail

<!-- Screenshot placeholder: /screenshots/case-detail.png -->

### Customers

<!-- Screenshot placeholder: /screenshots/customers.png -->

### Reports

<!-- Screenshot placeholder: /screenshots/reports.png -->

### Settings

<!-- Screenshot placeholder: /screenshots/settings.png -->

## Demo Login

All seeded demo users use the same password:

```txt
Password123!
```

Available demo accounts:

```txt
owner@maplecare.test
admin@maplecare.test
staff@maplecare.test
nurse@maplecare.test
coordinator@maplecare.test
```

The owner and admin users can manage settings. Staff users can work cases. Viewer-style access is represented in the permission model, but the current seed focuses on owner/admin/staff demo users.

## Local Setup

### 1. Install dependencies

```powershell
npm install
```

### 2. Start PostgreSQL

```powershell
npm run db:up
```

The local database is configured through Docker Compose:

```txt
postgresql://core:core_password@localhost:5432/core_db
```

Create `apps/api/.env` if needed:

```txt
DATABASE_URL=postgresql://core:core_password@localhost:5432/core_db
```

### 3. Prepare the database

```powershell
npm run db:migrate -w apps/api
npm run db:seed -w apps/api
```

### 4. Run the app

```powershell
npm run dev
```

Services:

```txt
Frontend: http://localhost:5173
Backend:  http://localhost:4000
```

### 5. Build

```powershell
npm run build
```

You can also build each app separately:

```powershell
npm run build:api
npm run build:web
```

## Main Demo Routes

```txt
/login
/
/customers
/reports
/settings
/cases/:caseId
```

## Future Industry Templates

Core is being designed to support reusable workspace templates. Templates can configure labels, default statuses, categories, intake fields, dashboard emphasis, and seed/demo examples while preserving the same core workflow engine.

Planned template directions:

- **Core Clinic**: patient intake, appointment requests, follow-up workflows
- **Core Realty**: property inquiries, buyer leads, seller leads, viewing requests
- **Core Finance**: applications, disputes, transaction reviews
- **Core Insurance**: claims, quotes, policy service requests
- **Core Sales**: leads, deals, renewals, handoffs
- **Core Local Business**: bookings, service requests, customer follow-ups

## Project Structure

```txt
Core/
  apps/
    api/
    web/
  packages/
    shared/
  docker-compose.yml
  package.json
```

## Notes

Core currently uses a simple demo authentication flow and a demo organization lookup while the workflow foundation is being built. The long-term direction is to add stronger tenant-aware auth, production permissions, and template application workflows after the reusable case engine is stable.
