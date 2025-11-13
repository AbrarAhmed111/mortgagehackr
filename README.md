## MortgageHackr

Modern mortgage tools platform built with Next.js 15 and Supabase. MortgageHackr includes a public site with calculators and a blog, plus an admin panel for managing leads, offers, analytics, and content.

### Features

- Deal Analyzer and Refinance tools with historical rate lookup (FRED API)
- Blog (CRUD via Supabase)
- Lead capture for contact, pre-qualification, and analyzer flows
- Admin dashboard for leads, offers, blogs, and analytics
- API routes for analytics and data ingestion
- Responsive UI built with Tailwind CSS and Radix primitives

### Tech Stack

- Next.js 15 (App Router), React 18, TypeScript
- Tailwind CSS, tailwindcss-animate, Radix UI
- Redux Toolkit for client state
- Supabase (Auth/DB)
- Nodemailer for transactional emails
- Recharts, Framer Motion, Keen Slider, Zod, Axios

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase project (URL + keys)
- SMTP credentials (e.g., Gmail) for sending emails
- FRED API key for historical mortgage rates

### Environment Variables

Create an `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key   # server-only usage

EMAIL_USER=your_smtp_username_or_email
EMAIL_PASS=your_smtp_password_or_app_password

NEXT_PUBLIC_FRED_API_KEY=your_fred_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Notes:
- Do not expose `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` to the browser; keep it server-side.
- `EMAIL_USER`/`EMAIL_PASS` are used for Nodemailer. With Gmail, use an App Password.

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

### Build and Start

```bash
npm run build
npm start
```

### Scripts

- `dev`: Start Next.js dev server (Turbopack)
- `build`: Production build
- `start`: Start production server
- `lint`: ESLint with auto-fix
- `format`: Prettier formatting
- `test` / `test:watch`: Jest tests

## Project Structure

```
.
├─ public/                       # Static assets
├─ src/
│  ├─ app/                       # App Router routes (public + admin + API)
│  │  ├─ (auth)/                 # Sign in/reset flows
│  │  ├─ (main)/                 # Public pages (home, blog, calculators, etc.)
│  │  ├─ admin-panel/            # Admin routes (dashboard, leads, offers, blogs)
│  │  └─ api/                    # Route handlers (analytics, blogs, leads, offers)
│  ├─ assets/                    # CSS and images
│  ├─ components/                # UI components (shadcn-style and app modules)
│  ├─ lib/
│  │  ├─ actions/                # Server actions (Supabase, email, analytics)
│  │  └─ supabase/               # Supabase client/server utilities and middleware
│  ├─ store/                     # Redux Toolkit store
│  └─ utils/                     # Axios, types, misc helpers
├─ tailwind.config.ts
├─ next.config.mjs
└─ package.json
```

## API Routes (selected)

- `POST /api/blogs` – Manage blog posts
- `POST /api/prequalification` – Capture prequalification leads
- `POST /api/deal-analyzer` – Persist analyzer results
- `POST /api/lender-offers` – Submit lender offers
- `POST /api/contact-leads` – Capture contact leads
- `GET /api/analytics/*` – Reporting endpoints (clicks, offers, leads)

## Supabase

This project assumes Supabase tables for analyzer leads, blogs, offers, and related analytics. Review the handlers in `src/app/api/*` and server actions in `src/lib/actions/*` to align your schema.

## Deployment

- Recommended: Vercel. Add all environment variables in your project settings.
- Ensure `EMAIL_USER`/`EMAIL_PASS` are configured for your chosen email provider.
- `next.config.mjs` enables aggressive optimizations; validate build output in your target environment.

## Troubleshooting

- Missing env vars will cause runtime errors in server actions or route handlers.
- If emails do not send, verify SMTP credentials and provider restrictions.
- FRED API timeouts return user-friendly errors; retry or verify your key.
