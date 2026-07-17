# M4 Movers — Backend

Node.js + Express + PostgreSQL API for the M4 Movers website: authentication (register with
email OTP verification, login, forgot/reset password), the Contact/"Request a Free Quote" form,
and WhatsApp lead capture (visitor info is emailed to the admin right before WhatsApp opens).

## 1. Requirements

- Node.js 18+
- PostgreSQL 13+
- An SMTP account to send emails (Gmail App Password, SendGrid, Mailtrap, etc.)

## 2. Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

- `DATABASE_URL` — your Postgres connection string.
- `JWT_SECRET` / `RESET_TOKEN_SECRET` — any long random strings.
- `SMTP_*` — your email provider's credentials. With Gmail, create an **App Password**
  (not your normal password) and put your Gmail address in `SMTP_USER`.
- `ADMIN_NOTIFY_EMAIL` / `COMPANY_EMAIL` — set to `info@m4movers.com` (already the default).
- `COMPANY_PHONE`, `COMPANY_WHATSAPP` — already set to `+971 56 184 2818` / `971561842818`.
- `COMPANY_ADDRESS`, `COMPANY_LAT`, `COMPANY_LNG` — already set to Al Marsa Street, Dubai, UAE.
- `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` — the admin dashboard login that gets created automatically.

Create the database, then run the schema + admin seed:

```bash
createdb m4movers        # or create it in your Postgres GUI of choice
npm run migrate
```

Start the API:

```bash
npm run dev      # auto-restarts on file changes
# or
npm start
```

The API runs at `http://localhost:5000` by default.

## 3. Endpoints

| Method | Path                              | Description |
|--------|-----------------------------------|--------------|
| POST   | `/api/auth/register`              | Create account, sends 6-digit verification code by email, returns JWT |
| POST   | `/api/auth/verify-email`           | `{ email, code }` — verify the email |
| POST   | `/api/auth/resend-verification`    | `{ email }` — resend a new code |
| POST   | `/api/auth/login`                  | `{ email, password }` — returns JWT |
| GET    | `/api/auth/me`                     | Current user (requires `Authorization: Bearer <token>`) |
| POST   | `/api/auth/forgot-password`        | `{ email }` — emails a 6-digit reset code |
| POST   | `/api/auth/verify-reset-code`      | `{ email, code }` — returns a short-lived `resetToken` |
| POST   | `/api/auth/reset-password`         | `{ resetToken, newPassword }` |
| POST   | `/api/contact`                     | Quote/contact form — saves to DB + emails `info@m4movers.com` |
| POST   | `/api/whatsapp-click`              | Logs a WhatsApp button click + emails the admin |
| GET    | `/api/public/config`               | Public contact info (phone, WhatsApp, address, map coordinates) |
| GET    | `/api/admin/contact-requests`      | Admin-only, list quote/contact requests |
| GET    | `/api/admin/whatsapp-clicks`       | Admin-only, list WhatsApp leads |
| GET    | `/api/admin/users`                 | Admin-only, list users |

Admin routes require a JWT from a user with `role = 'admin'` (the seeded admin account has this).

## 4. Notes

- Passwords are hashed with bcrypt; never stored in plain text.
- Verification and password-reset codes are 6-digit, expire after `OTP_EXPIRES_MINUTES` (default 10),
  and are single-use (cleared from the DB once consumed).
- `forgot-password` always responds with success (whether or not the email exists) to avoid leaking
  which emails are registered — but only sends mail if the account is real.
- CORS is restricted to `CLIENT_URL` (your frontend's origin) — update it for production.
