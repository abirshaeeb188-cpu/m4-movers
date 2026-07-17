# M4 Movers — Full Stack Project

- **Frontend:** React + Vite + Tailwind (folder: `m4movers/`)
- **Backend:** Node.js + Express + PostgreSQL (folder: `backend/`)

## What's included

- **Authentication**
  - Register (Full Name, Email, Phone, Password) → JWT issued + 6-digit verification code emailed
  - Email verification (`/verify-email`) with resend option
  - Login (Email + Password)
  - Forgot Password → 6-digit code emailed → verify code → set new password
- **Request a Free Quote / Contact form** (Contact page) — saves to PostgreSQL and emails the
  complete request to `info@m4movers.com`
- **WhatsApp button** (floating button + Contact page link) — before opening WhatsApp, the
  visitor's known info (name/email/phone if logged in) is saved and emailed to the admin
- **Map** on the Contact page — OpenStreetMap embed with a red pin marker on
  **Al Marsa Street, Dubai, UAE**, plus an "Open in Maps" link
- Admin dashboard login continues to work, now backed by real accounts (`role = 'admin'`) in Postgres

## Quick start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # then edit DB + SMTP + company details
npm run migrate           # creates tables + seeds the admin account
npm run dev                # http://localhost:5000
```

### 2. Frontend

```bash
cd m4movers
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:5000/api (already set)
npm run dev                # http://localhost:5173
```

Open http://localhost:5173 — Register a new account, check the email inbox tied to your SMTP
account for the 6-digit code, and try the Contact form + WhatsApp button. Log in to
`/admin` with the seeded admin credentials (`ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` in `backend/.env`).

See `backend/README.md` for the full endpoint list and environment variable details.
