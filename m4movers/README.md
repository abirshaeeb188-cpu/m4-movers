# M4 Movers — Website (React + Tailwind CSS)

A premium, responsive moving & packing company website built with React 19, Vite, Tailwind CSS v4, and react-router-dom.

## What's included
- **Public site**: Home, About, Services (grid + detail pages), Contact (validated quote form, embedded map)
- **Auth (frontend demo only)**: Register, Login, Forgot/Reset Password, customer Profile dashboard (requests, complaints, orders, notifications, settings)
- **Admin panel** (frontend demo, mock data — no real backend):
  - Login at `/login` → toggle "Admin login"
  - Email: `admin@m4movers.com`
  - Password: `Admin@12345`
  - Dashboard overview with charts (Recharts), Users, Contact Requests, Quote Requests, Complaints, Company, Services, Orders, Analytics, Notifications, Settings

> Note: This is a **frontend-only** build. Login/Register, the quote form, and every admin action operate on in-memory/mock data (via React state and `sessionStorage` for the logged-in session) — nothing is sent to a real server. Hook up your own backend/API to make it fully functional.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Tech stack
- React 19 + Vite
- Tailwind CSS v4 (`@tailwindcss/vite` plugin, theme tokens in `src/index.css`)
- react-router-dom (routing, nested admin layout)
- lucide-react (icons)
- recharts (admin analytics charts)

## Project structure
```
src/
  components/       Navbar, Footer, Hero, section blocks, admin/DataTable, etc.
  context/          AuthContext (demo auth)
  data/             services.js, content.js, adminData.js (all mock content)
  pages/            Home, About, Services, ServiceDetail, Contact, Login, Register,
                     ForgotPassword, Profile, NotFound
  pages/admin/      AdminLayout + Dashboard/Users/ContactRequests/QuoteRequests/
                     Complaints/Company/Services/Orders/Analytics/Notifications/Settings
```

## Customizing
- **Brand colors & fonts**: edit the `@theme` block at the top of `src/index.css` (`--color-brand`, `--color-accent`, `--color-navy`, `--font-display`, `--font-sans`).
- **Services**: edit `src/data/services.js`.
- **Testimonials / FAQ / stats / process steps**: `src/data/content.js`.
- **Admin mock data**: `src/data/adminData.js`.
- **Google Maps**: the Contact page uses a keyless embed (`google.com/maps?...&output=embed`). Swap in a Maps API key + `<iframe src="https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=...">` for production-grade embeds.
- **WhatsApp / phone numbers**: search for `971500000000` across the project and replace with your real number.
