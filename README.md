# Core
<img width="800" height="500" alt="Core_Realty_Email_Walkthrough" src="https://github.com/user-attachments/assets/5ceac8c7-f965-4b39-9c23-81f55e08d88b" /> 
Core is a reusable full-stack SaaS workflow and case management platform.

The product is built around one central object: a **Case**. A case can represent an appointment request, property inquiry, finance application, insurance claim, sales deal, local service booking, support issue, or any other unit of operational work.

Core is intentionally generic. Industry demos change labels, statuses, categories, intake fields, and seed data, but they all run on the same workflow engine.

## What It Demonstrates

- Multi-vertical workflow configuration without cloning the app
- Case inbox with search, filters, assignment, priority, status, and category
- Case detail with customer context, comments, activity events, and intake data
- Customer records linked to all related cases
- Settings for workspace labels, templates, statuses, categories, intake fields, and team visibility
- Operations reports for volume, priority, ownership, aging, and closed work
- Local demo mode for switching between seeded vertical workspaces
- Deployment-ready API/web configuration with hosted PostgreSQL support

## Demo Workspaces

The seed creates six demo organizations:

| Workspace | Template | App Name | Case Label | Customer Label |
| --- | --- | --- | --- | --- |
| MapleCare Clinic | Clinic | Core Clinic | Request | Patient |
| Summit Realty | Real Estate | Core Realty | Inquiry | Client |
| Northstar Finance | Finance | Core Finance | Application | Customer |
| Harbor Insurance | Insurance | Core Insurance | Claim | Policyholder |
| Pipeline Sales | Sales | Core Sales | Deal | Lead |
| LocalPro Services | Local Business | Core Local | Booking | Customer |

Each workspace includes users, workflow statuses, categories, intake fields, customers, cases, comments, and activity events.

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

### Portfolio Landing

![Core portfolio landing page](docs/screenshots/portfolio.png)

### Login

![Core login page](docs/screenshots/login.png)

### Dashboard

![Core dashboard](docs/screenshots/dashboard.png)

### Case Inbox

![Core case inbox](docs/screenshots/case-inbox.png)

### Case Detail

![Core case detail](docs/screenshots/case-detail.png)

### Customers

![Core customer records](docs/screenshots/customers.png)

### Reports

![Core reports](docs/screenshots/reports.png)

### Settings

![Core settings](docs/screenshots/settings.png)

## Demo Login

All seeded demo users use:

```txt
Password123!
```

MapleCare logins kept for the primary demo:

```txt
owner@maplecare.test
admin@maplecare.test
staff@maplecare.test
nurse@maplecare.test
coordinator@maplecare.test
```

Other workspace owner logins:

```txt
owner@summit-realty.test
owner@northstar-finance.test
owner@harbor-insurance.test
owner@pipeline-sales.test
owner@localpro-services.test
```

Owners and admins can manage settings. Staff users can work cases and view reports.

## Local Setup

### 1. Install Dependencies

```powershell
npm install
```

### 2. Configure Environment

Create `apps/api/.env`:

```txt
NODE_ENV=development
PORT=4000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://core:core_password@localhost:5432/core_db
```

Create `apps/web/.env`:

```txt
VITE_API_URL=http://localhost:4000
```

Example files are committed at:

```txt
apps/api/.env.example
apps/web/.env.example
```

### 3. Start PostgreSQL

```powershell
npm run db:up
```

The local Docker database URL is:

```txt
postgresql://core:core_password@localhost:5432/core_db
```

### 4. Prepare Database

```powershell
npm run db:migrate -w apps/api
npm run db:seed -w apps/api
```

The seed is safe to rerun. It cleans and rebuilds each seeded demo organization.

### 5. Run The App

```powershell
npm run dev
```

Services:

```txt
Frontend: http://localhost:5173
Backend:  http://localhost:4000
```

## Useful Scripts

```powershell
npm run dev
npm run build
npm run build:api
npm run build:web
npm run db:up
npm run db:down
npm run db:deploy
npm run db:seed -w apps/api
```

## Main Routes

Portfolio:

```txt
/portfolio
/demo/clinic
/demo/realty
/demo/finance
```

Product:

```txt
/login
/
/cases
/cases/:caseId
/customers
/customers/:customerId
/reports
/settings
```

## Project Structure

```txt
Core/
  apps/
    api/
      prisma/
      src/
    web/
      src/
  packages/
  docker-compose.yml
  package.json
```

## Deployment

Deployment setup is documented in [DEPLOYMENT.md](./DEPLOYMENT.md).

Production configuration is environment-driven:

- API: `DATABASE_URL`, `CLIENT_URLS`, `PORT`, `NODE_ENV`
- Web: `VITE_API_URL`

Use `npm run db:deploy` for production migrations against hosted PostgreSQL.

## Product Direction

Core is a portfolio-ready foundation for vertical SaaS workflow products. The current implementation keeps the core platform reusable while showing how the same case engine can support clinic, realty, finance, insurance, sales, and local service workflows through configuration and seed data.
