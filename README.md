# EduCompass 🎓

A production-grade college discovery and decision-making platform built for engineering students in India. Find colleges, predict your admission chances, and make the right choice using real NIRF 2024 ranking data.

🌐 **Live Demo:** https://edu-compass-three.vercel.app
📁 **GitHub:** https://github.com/Samarth229/EduCompass

---

## Features

### 🔍 College Listing + Search
- Search colleges by name, city, or state
- Filter by state, college type, field, and minimum rating
- Sort by NIRF rank, fees, or rating
- Paginated results with URL-synced filters (shareable links)

### 🏫 College Detail Page
- Rich overview with auto-generated descriptions from live DB data
- Courses table with duration, seats, and fees
- Placement statistics — avg package, highest package, placement rate, top recruiters
- Review system with star ratings, likes, and threaded replies

### 🎯 Rank Predictor Tool
- Input your exam (JEE Main, JEE Advanced, MHT-CET, KCET, WBJEE), rank, and category
- Returns matched colleges with admission chance: High / Medium / Low
- Powered by real opening and closing rank data per college per exam

### 🔐 Authentication + Saved Colleges
- Email/password registration with field-level validation
- JWT-based session management via NextAuth.js
- Save and unsave colleges with one click, persisted to database

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | UI Components |
| TanStack React Query | Data fetching |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Next.js API Routes | REST API |
| Prisma v7 ORM | Database queries |
| PostgreSQL on Neon.tech | Database |
| NextAuth.js | Authentication |
| bcryptjs | Password hashing |

### Infrastructure
| Service | Purpose |
|---|---|
| Vercel | Deployment |
| Neon.tech | Serverless PostgreSQL |
| GitHub | Version control |

---

## API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | /api/colleges | No | List with search, filter, sort, pagination |
| GET | /api/colleges/[id] | No | Single college with all relations |
| POST | /api/predictor | No | Rank-based college predictor |
| GET | /api/saved | Yes | Get user's saved colleges |
| POST | /api/saved | Yes | Toggle save/unsave a college |
| POST | /api/reviews | Yes | Submit review + recalculate rating |
| POST | /api/reviews/[id]/like | Yes | Toggle review like |
| POST | /api/reviews/[id]/reply | Yes | Reply to a review |
| POST | /api/auth/register | No | Register new user |
| GET/POST | /api/auth/[...nextauth] | — | NextAuth handler |

---

## Database Schema
College
├── id, name, city, state, type, field
├── nirfRank, nirfScore, fees, rating
├── established, description, website, image
├── Courses[]
├── Placements[]
├── Reviews[]
│     ├── ReviewLikes[]
│     └── ReviewReplies[]
├── PredictorData[]
└── SavedBy[] → User
User
├── id, name, email, password
├── SavedColleges[]
└── Reviews[]

---

## Data Source

- College names, cities, states, NIRF ranks and scores are sourced from NIRF 2024 Engineering Rankings
- Fees, placement figures and admission cutoffs are realistic estimates based on publicly known ranges for each college tier
- 50 colleges seeded covering IITs, NITs, IIITs, and top private institutions

---

## Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (or free Neon.tech account)

### Installation

```bash
# Clone the repository
git clone https://github.com/Samarth229/EduCompass.git
cd EduCompass/college-discovery

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with 50 colleges
npx prisma db seed
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## Project Structure
src/
├── app/
│   ├── api/
│   │   ├── colleges/         → College listing + detail APIs
│   │   ├── predictor/        → Rank predictor API
│   │   ├── saved/            → Saved colleges API
│   │   ├── reviews/          → Review, like, reply APIs
│   │   └── auth/             → NextAuth + register
│   ├── colleges/
│   │   ├── page.tsx          → College listing page
│   │   └── [id]/page.tsx     → College detail page
│   ├── predictor/page.tsx    → Predictor tool
│   ├── saved/page.tsx        → Saved colleges
│   ├── login/page.tsx        → Login
│   └── register/page.tsx     → Register
├── components/
│   ├── navbar.tsx
│   ├── college-card.tsx
│   ├── college-card-skeleton.tsx
│   ├── star-rating.tsx
│   ├── chance-badge.tsx
│   └── footer.tsx
├── lib/
│   ├── prisma.ts             → Prisma singleton with pg adapter
│   ├── auth.ts               → NextAuth config
│   └── api.ts                → Typed fetch functions
└── types/
└── index.ts              → Shared TypeScript types

---

## Key Architecture Decisions

**Next.js App Router**
Server components fetch data at the page level without client-side waterfalls. API routes co-locate backend logic with the frontend, enabling single-project deployment on Vercel.

**Prisma v7**
Uses a Wasm-based query compiler with a driver adapter pattern, making it fully compatible with Vercel's serverless environment without connection pool issues.

**Neon.tech PostgreSQL**
Serverless PostgreSQL that scales to zero when inactive. Native Vercel integration means zero configuration for connection pooling in production.

**URL-Synced Filters**
All college listing filters are stored in URL params instead of component state. This makes filtered views shareable, bookmarkable, and preserves filter state on browser back/forward navigation.

**Predictor Logic**
if userRank <= openingRank + 500  → "High" chance
if userRank <= closingRank - 500  → "Medium" chance
else                               → "Low" chance
Results sorted by openingRank ascending so best matches appear first.

---

## Built By

**Samarth Kadam** — B.Tech CSE, VIT Bhopal

- GitHub: [@Samarth229](https://github.com/Samarth229)
- LinkedIn: [samarth-kadam](https://linkedin.com/in/samarth-kadam)
- Email: samarthk292@gmail.com

---

*Built as part of The AI Signal — Full Stack Developer Internship Demo Task*
*Track B — College Discovery Platform | Role — Full Stack Engineer*
