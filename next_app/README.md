# Paper Paints – Next.js

Full Next.js conversion of the Paper Paints (Wix) site, with backend and admin panel.

## Setup

1. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set:
   - `DATABASE_URL` – SQLite: `file:./dev.db` (or path to your DB file)
   - `ADMIN_PASSWORD` – Admin panel password (min 8 characters)

2. **Create the database**
   ```bash
   npm run db:push
   ```
   This creates/updates the SQLite schema from `prisma/schema.prisma`.

3. **Run the app**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` – Development server
- `npm run build` – Production build (runs `prisma generate` then `next build`)
- `npm run start` – Production server
- `npm run db:generate` – Generate Prisma client
- `npm run db:push` – Push schema to DB (create/update tables)
- `npm run db:migrate` – Run migrations (alternative to `db:push`)
- `npm run db:studio` – Open Prisma Studio for the database

## Admin panel

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Login:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)  
  Use the password set in `ADMIN_PASSWORD`.

In the admin panel you can manage:

- **Products** – Catalog (name, category, description, features, specs, images, brochure)
- **Applications** – Use cases and solutions
- **Projects** – Project gallery
- **Team** – Team members

All create/update/delete API calls require an authenticated admin session (cookie).

## API

- `GET /api/products` – List products  
- `GET /api/products/[id]` – Product by ID  
- `POST /api/products` – Create (admin)  
- `PUT /api/products/[id]` – Update (admin)  
- `DELETE /api/products/[id]` – Delete (admin)  

Similar routes exist for `/api/applications`, `/api/projects`, and `/api/team`.

- `POST /api/auth/login` – `{ "password": "..." }` – Sets admin session cookie  
- `POST /api/auth/logout` – Clears admin session  
- `GET /api/auth/check` – Returns `{ ok: true }` if authenticated

## Project structure

- `src/app/` – App Router pages and API routes  
- `src/app/admin/` – Admin UI (login, dashboard, CRUD for products, applications, projects, team)  
- `src/components/` – Shared React components  
- `src/entities/` – TypeScript types (Products, Applications, Projects, TeamMembers)  
- `src/lib/` – `db` (Prisma), `api-client` (public fetch), `admin-api` (admin fetch), `auth-admin`, `prisma-map`  
- `prisma/schema.prisma` – Database schema  

## Deploy

1. Set `DATABASE_URL` (e.g. PostgreSQL on your host) and `ADMIN_PASSWORD` in the deployment environment.
2. Run migrations: `npx prisma migrate deploy` (or `db:push` for SQLite/prototyping).
3. Build and start: `npm run build && npm run start`.
