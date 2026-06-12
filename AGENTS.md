# AGENTS.md

## Project identity

Core is a reusable full-stack SaaS workflow and case management platform.

Core is not a generic dashboard. Core is a reusable workflow engine.

The central business object is a `Case`. A case means one unit of business work, such as a request, lead, application, booking, claim, support issue, appointment request, or transaction review.

Keep the base product generic. Industry-specific versions can rename labels in the UI later, but the base platform should stay reusable.

Examples:

- Clinic: Case = appointment request or patient intake
- Real estate: Case = property inquiry, buyer lead, seller lead, viewing request
- Finance: Case = application, review, dispute, transaction issue
- Insurance: Case = claim or quote request
- Sales: Case = deal or lead
- Local business: Case = booking or service request

## Current project state

The local project root is expected to be:

```txt
D:\Projects\Core
```

Current stack:

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL
- ORM: Prisma 7
- Styling: plain CSS
- Data fetching: TanStack React Query
- HTTP client: Axios
- Routing: React Router
- Validation: Zod
- Local database: Docker PostgreSQL

Repository shape:

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

Current backend status:

- Backend runs at `http://localhost:4000`.
- `GET /health` works.
- `GET /api/debug/db` works.
- `GET /api/cases` works.
- `GET /api/cases/:id` works.
- `POST /api/cases` works.
- `PATCH /api/cases/:id/status` works.
- `POST /api/cases/:id/comments` works.
- `GET /api/cases` currently supports backend query filters for `search`, `statusSlug`, `priority`, and `assignedUserId`.

Current frontend status:

- Frontend runs at `http://localhost:5173`.
- `/` shows the Case Inbox.
- `/cases/:caseId` shows Case Detail.
- New Case form works.
- Status dropdown works.
- Internal comment form works.
- Activity log works.
- The backend supports inbox search and filters, but the current uploaded frontend still shows the search and filter controls as disabled and `fetchCases()` does not yet pass query params. Inspect the live repo before changing this because the local code may be newer.

Current milestone:

- The project is around Batch 5I: Customer Records.
- The likely next product area is customer records, meaning customer list, customer detail, and linking customers back to their cases.
- Do not assume this is already complete. Inspect the current repo first.

## Domain model direction

Organization owns everything.

Users belong to organizations.

Customers belong to organizations.

Cases belong to organizations and customers.

Cases can have:

- status
- priority
- category
- assignee
- comments
- attachments
- activity events
- intake data

Use generic names in the base app:

- Use `Customer`, not `Patient`.
- Use `Case`, not `Appointment`.
- Use `intakeData`, not medical-only fields.
- Use workflow status, not clinic-only status.
- Use activity log, not clinic-only history.

It is acceptable for demo seed data to use MapleCare Clinic as the first realistic vertical, but do not hard-code the whole product around clinics.

## Prisma 7 rules

This project uses Prisma 7 style.

Important rules:

- Do not put `url = env("DATABASE_URL")` in `schema.prisma`.
- The database URL belongs in `apps/api/prisma.config.ts`.
- `apps/api/prisma.config.ts` should use `dotenv/config`, `defineConfig`, and `env` from `prisma/config`.
- `apps/api/prisma.config.ts` should define `datasource.url` with `env("DATABASE_URL")`.
- `apps/api/prisma/schema.prisma` should keep the datasource provider only.

Expected Prisma schema shape:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

Prisma client import path:

```ts
import { PrismaClient } from "../generated/prisma/client.js";
```

Current Prisma client setup uses `@prisma/adapter-pg` and `PrismaPg`. Preserve that unless the user explicitly asks for a database setup change.

Do not rename the existing Docker/Postgres database names yet, even if they still use older names like `flowdesk`. They currently work.

## Current key files

Backend:

- `apps/api/src/server.ts`
- `apps/api/src/routes/case.routes.ts`
- `apps/api/src/lib/prisma.ts`
- `apps/api/prisma/schema.prisma`
- `apps/api/prisma.config.ts`
- `apps/api/prisma/seed.ts`

Frontend:

- `apps/web/src/App.tsx`
- `apps/web/src/App.css`
- `apps/web/src/lib/api.ts`
- `apps/web/src/features/cases/NewCaseForm.tsx`

Inspect the actual repository before editing because the local repo may contain newer files than this summary.

## Existing API behavior to preserve

Preserve the current case workflow unless the user asks to change it.

Known case routes:

```txt
GET    /health
GET    /api/debug/db
GET    /api/cases
GET    /api/cases/:id
POST   /api/cases
PATCH  /api/cases/:id/status
POST   /api/cases/:id/comments
```

Current case route behavior:

- Case list is scoped to the demo organization.
- Case list includes customer, assigned user, category, status, comment count, and attachment count.
- Case detail includes customer, assigned user, category, status, comments, attachments, and activity events.
- Creating a case creates a customer, creates the case, assigns the default status, optionally assigns a default category, optionally assigns the first staff user, and creates a `case.created` activity event.
- Changing status creates a `case.status_changed` activity event.
- Adding a comment creates a `case.comment_added` activity event.

## Coding rules

Be production-minded, but keep the code beginner-friendly.

Follow these rules:

- Make the smallest useful change for the requested task.
- Do not do giant refactors unless necessary.
- Preserve working routes and UI behavior.
- Do not introduce authentication yet unless the user asks for it.
- Do not add over-engineered custom workflow builders too early.
- Do not make the product clinic-specific.
- Keep the base platform reusable across industries.
- Prefer clear names over clever abstractions.
- Use TypeScript types where they make the code safer and easier to understand.
- Use Zod on backend request bodies.
- Use Prisma transactions when one user action writes multiple related records.
- Keep organization scoping on database queries.
- For now, continue using the demo organization lookup until real auth/tenant selection is introduced.

## Frontend rules

Use the existing frontend patterns:

- React function components
- TanStack React Query for server state
- Axios through the existing `api` client
- React Router for routes
- Plain CSS in `App.css` unless the user asks to change styling approach

When adding a feature:

- Add loading state.
- Add error state.
- Keep empty states readable.
- Invalidate relevant React Query keys after mutations.
- Keep UI wording generic, using Case and Customer.

## Backend rules

Use the existing backend patterns:

- Express router files in `apps/api/src/routes`
- `zod` schemas near the route that uses them
- `prisma` imported from `apps/api/src/lib/prisma.ts`
- `try/catch` with `next(error)` for async routes
- Return JSON with a top-level `data` field for normal successful API responses when practical

When adding new routes:

- Scope all queries by `organizationId`.
- Use `getDemoOrganizationId()` or equivalent existing helper until auth exists.
- Validate params and body where needed.
- Return `404` when the record does not exist in the current organization.
- Keep route names REST-ish and predictable.

## Testing and verification

Before making changes, inspect `package.json` scripts at the root and inside apps if present. Use the project’s actual scripts instead of inventing commands.

Common local checks:

```powershell
# From project root
npm install
npm run dev
```

API checks:

```powershell
curl http://localhost:4000/health
curl http://localhost:4000/api/debug/db
curl http://localhost:4000/api/cases
```

When Prisma schema or seed changes:

```powershell
cd apps/api
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

If TypeScript, lint, or build scripts exist, run the relevant ones before finishing:

```powershell
npm run typecheck
npm run lint
npm run build
```

If a command fails, report the exact failure and fix the smallest cause first.

## Response style for Codex work

When completing a task, report:

1. What changed
2. Files edited
3. How to test it
4. What success looks like
5. Any follow-up risk or incomplete part

Do not hide uncertainty. If the repo differs from this file, trust the repo and mention the difference.

## Current recommended next task

Unless the user gives a different task, the next likely feature is Customer Records.

Build it generically:

- Backend `GET /api/customers`
- Backend `GET /api/customers/:id`
- Customer list page
- Customer detail page
- Link each customer to their cases
- Make the sidebar Customers item route to the customer list

Do not build real authentication, permissions, custom fields, billing, or industry templates yet.

## Long-term product direction

After the base platform is strong, it should support industry templates:

- Core Clinic
- Core Realty
- Core Finance
- Core Insurance
- Core Sales
- Core Local Business

Templates may customize:

- app name
- sidebar wording
- case label
- customer label
- default statuses
- default categories
- intake form fields
- dashboard cards
- seed data
- detail page sections

Some industries may eventually need extra models, such as:

- Property
- Invoice
- ApplicationDocument
- DealValue
- AppointmentSlot
- Offer

Do not add these too early. Keep the reusable base workflow strong first.
