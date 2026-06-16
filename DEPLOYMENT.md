# Deployment

Core is split into two deployable apps:

- Backend API: `apps/api`
- Frontend web app: `apps/web`
- Database: hosted PostgreSQL

The repo is deployment-ready for a common setup such as Render for the API and PostgreSQL, plus Vercel for the frontend. Other hosts work as long as they provide the same environment variables and run the same commands.

## Environment Variables

### Backend API

Set these on the API host:

```txt
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
CLIENT_URLS=https://your-core-web.vercel.app
ENABLE_DEMO_MODE=true
```

Notes:

- `DATABASE_URL` should come from your hosted PostgreSQL provider.
- Many hosted PostgreSQL providers require SSL. Keep the provider's full connection string, including query params such as `sslmode=require`.
- `CLIENT_URLS` is a comma-separated allowlist for browser origins that can call the API.
- Do not include trailing slashes in `CLIENT_URLS`.
- `ENABLE_DEMO_MODE=true` is optional. Use it for portfolio/demo deployments so the hosted app can switch between seeded demo workspaces.

### Frontend Web

Set this on the web host:

```txt
VITE_API_URL=https://your-core-api.onrender.com
```

Vite reads `VITE_*` variables at build time, so update this before building or redeploying the frontend.

## Backend Deployment

Build command:

```powershell
npm install
npm run db:generate -w apps/api
npm run build:api
```

Start command:

```powershell
npm run start -w apps/api
```

Migration command:

```powershell
npm run db:deploy
```

Run migrations against the hosted database before or during backend deploy. This uses `prisma migrate deploy`, which is the production-safe migration command.

## Frontend Deployment

Build command:

```powershell
npm install
npm run build:web
```

Output directory:

```txt
apps/web/dist
```

For single-page app hosting, all routes should fall back to `index.html`.

## Hosted PostgreSQL

1. Create a managed PostgreSQL database.
2. Copy the provider connection string.
3. Set it as `DATABASE_URL` on the API service.
4. Run `npm run db:deploy`.
5. Seed demo data only when you want local/portfolio demo workspaces:

```powershell
npm run db:seed -w apps/api
```

The seed creates all bundled demo workspaces: MapleCare Clinic, Summit Realty, Northstar Finance, Harbor Insurance, Pipeline Sales, and LocalPro Services.
Hosted demo mode needs this seed data in the production database.

## Render API Example

Use the included `render.yaml` as a starting point. After the first frontend deploy, update the API service's `CLIENT_URLS` to the final frontend URL and redeploy the API.

## Vercel Web Example

Use the included `vercel.json` from the repo root. Set `VITE_API_URL` to the deployed API URL before building the frontend.

## Local Development

Copy the examples and adjust only if needed:

```powershell
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env
```

Then run:

```powershell
npm run db:up
npm run db:migrate -w apps/api
npm run db:seed -w apps/api
npm run dev
```
