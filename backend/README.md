# Paper Paints API (Node.js + MongoDB)

Express backend with Mongoose.

## Setup

1. **Install**
   ```bash
   npm install
   ```

2. **Env**
   ```bash
   cp .env.example .env
   ```
   Set:
   - `MONGODB_URI` – e.g. `mongodb://localhost:27017/paper-paints`
   - `SESSION_SECRET` – for JWT signing (or falls back to `ADMIN_PASSWORD`)
   - `ADMIN_EMAIL` + `ADMIN_PASSWORD` – used to create the **first admin** when the DB has no admins (bootstrap)

3. **Run**
   ```bash
   npm run dev
   ```
   API: http://localhost:4000

## Auth (email + password)

- **Login:** `POST /api/auth/login`  
  Body: `{ "email": "admin@example.com", "password": "..." }`  
  Sets an httpOnly session cookie (JWT) on success.

- `GET /api/auth/check` – returns `{ ok: true }` if the session is valid  
- `POST /api/auth/logout` – clears the session cookie

The **first admin** is created on startup from `ADMIN_EMAIL` and `ADMIN_PASSWORD` when no admins exist. Use that to log in. To add more admins, insert into the `admins` collection with a bcrypt hash of the password.

## Endpoints

- `GET /api/health` – health
- `GET/POST /api/products`, `GET/PUT/DELETE /api/products/:id`
- `GET/POST /api/applications`, `GET/PUT/DELETE /api/applications/:id`
- `GET/POST /api/projects`, `GET/PUT/DELETE /api/projects/:id`
- `GET/POST /api/team`, `GET/PUT/DELETE /api/team/:id`

POST/PUT/DELETE on content routes require an authenticated admin (session cookie).
