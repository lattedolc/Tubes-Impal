# 5SCENT-MONOREPO

Fullstack perfume e-commerce web app using Next.js frontend and Laravel backend.

## Repository layout

```
5SCENT-MONOREPO/
├── frontend/             # Next.js app (TypeScript)
│   └── web-5scent/
├── backend/              # Laravel app
│   └── laravel-5scent/
├── .env                  # monorepo env helpers
├── package.json          # root scripts & workspace config
└── README.md
```

## Prerequisites

- Node.js (18+ recommended)
- npm (9+ recommended) or yarn
- PHP (8.1+)
- Composer

## Environment

Create and/or verify environment variables. A sample root `.env` is provided with:

- `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
- `FRONTEND_URL=http://localhost:3000`
- `BACKEND_URL=http://localhost:8000`

The frontend reads `NEXT_PUBLIC_API_URL` for API calls.

## Install

Install dependencies at the repository root to get shared developer tools (e.g. `concurrently`) and to install workspace packages:

```powershell
npm install
```

Install frontend dependencies (if needed):

```powershell
npm install --prefix frontend/web-5scent
```

Install backend dependencies with Composer:

```powershell
composer install --working-dir=backend/laravel-5scent
```

## Run (development)

Start both frontend and backend together from the repo root:

```powershell
npm run dev
```

Run only the frontend:

```powershell
npm run dev:frontend
```

Run only the backend:

```powershell
npm run dev:backend
```

Notes:
- The root `dev` script uses `concurrently` to run the Next.js dev server (frontend) and `php artisan serve` inside the backend folder.
- Frontend (Next.js) default: http://localhost:3000
- Backend (Laravel) default: http://localhost:8000 (API prefix: `/api`)

## API URL example

If you set `NEXT_PUBLIC_API_URL=http://localhost:8000/api`, an example request from the frontend to the backend would be:

```
GET http://localhost:8000/api/products
```

## Next steps

- Ensure `config/cors.php` in the Laravel app allows `http://localhost:3000`.
- Verify frontend code reads `process.env.NEXT_PUBLIC_API_URL` when calling the API.
