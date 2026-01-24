# Paper Paints – Next.js

Next.js frontend with Node.js (Express) + MongoDB backend and admin panel.

## Setup

### 1. Backend (Node.js + MongoDB)

```bash
cd ../backend
cp .env.example .env
```

Edit `backend/.env`:
- `MONGODB_URI` – e.g. `mongodb://localhost:27017/paper-paints` or MongoDB Atlas connection string
- `SESSION_SECRET` – for JWT signing (optional; falls back to `ADMIN_PASSWORD`)
- `ADMIN_EMAIL` + `ADMIN_PASSWORD` – used to **create the first admin** when no admins exist (bootstrap). Use these to log in initially.
- `PORT` – optional, default 4000

```bash
npm install
npm run dev
```

API runs at http://localhost:4000

### 2. Frontend (Next.js)

```bash
cd next_app
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:3000. Next.js rewrites `/api/*` to the backend (API_URL or http://localhost:4000).

### Run both

From `next_app`:

```bash
npm run dev:all
```

This starts the backend and Next.js dev server together.

## Scripts

- `npm run dev` – Next.js dev server
- `npm run build` – Production build
- `npm run start` – Production server
- `npm run dev:backend` – Start the Node.js API (from `../backend`)
- `npm run dev:all` – Start backend + Next.js

## Admin panel

- **URL:** http://localhost:3000/admin
- **Login:** http://localhost:3000/admin/login (email + password)  
  The first admin is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env` when the DB has no admins. Log in with those.

Manage: **Products**, **Applications**, **Projects**, **Team**.  
Create/update/delete require an authenticated admin session (cookie).

## API (Node.js backend)

- `GET/POST /api/products`, `GET/PUT/DELETE /api/products/:id`
- `GET/POST /api/applications`, `GET/PUT/DELETE /api/applications/:id`
- `GET/POST /api/projects`, `GET/PUT/DELETE /api/projects/:id`
- `GET/POST /api/team`, `GET/PUT/DELETE /api/team/:id`
- `GET /api/auth/check`, `POST /api/auth/login`, `POST /api/auth/logout`

## Project structure

- `src/app/` – App Router pages
- `src/app/admin/` – Admin UI (login, dashboard, CRUD)
- `src/components/` – Shared React components
- `src/entities/` – TypeScript types
- `src/lib/` – `api-client` (public fetch), `admin-api` (admin fetch with credentials)
- `../backend/` – Node.js + Express + Mongoose API

## Deploy

1. **Backend:** Deploy the `backend/` app (e.g. Railway, Render, Fly.io). Set `MONGODB_URI`, `ADMIN_PASSWORD`, `PORT`.
2. **Frontend:** Set `API_URL` to your backend URL. Build and deploy Next.js (e.g. Vercel).
