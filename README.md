# Next.js + MySQL Schools Assignment

Two pages as per the assignment:
- `/addSchool` — add a school (react-hook-form, validation, image upload to `public/schoolImages`)
- `/showSchools` — list schools like product cards

## Database

Create database and table:

```sql
CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  contact BIGINT,
  image TEXT,
  email_id TEXT
);
```

## Setup

1. Copy `.env.example` to `.env.local` and fill DB creds.
2. Install deps and run:

```bash
npm install
npm run dev
```

## Deploy

- On Vercel, set env vars: `DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT`.
- Ensure your database is reachable from Vercel. Consider a hosted MySQL (PlanetScale, Aiven, etc.).
- Image uploads go to `public/schoolImages` which works on Vercel with build-time folder presence, but runtime writes are ephemeral. For production, use an object store (S3) — acceptable locally for assignment demonstration.

## API

- `GET /api/schools` — returns `{ data: School[] }`
- `POST /api/schools` — multipart form; fields: `name,address,city,state,contact,email_id,image`

## Notes

- Uses `formidable` for multipart parsing, Next API bodyParser disabled globally (see `next.config.js`).
- Simple responsive UI with CSS; no external UI libs.
