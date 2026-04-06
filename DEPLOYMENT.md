# Deployment

## Prerequisites
- Vercel account
- GitHub repo connected to Vercel

## Setup

1. Create a Vercel Postgres database:
   - Vercel Dashboard → Storage → Create → Postgres
   - Copy the DATABASE_URL

2. Set environment variables in Vercel:
   - DATABASE_URL = (from step 1)
   - NEXTAUTH_SECRET = (run: openssl rand -base64 32)
   - NEXTAUTH_URL = https://your-domain.vercel.app

3. Push to GitHub — Vercel auto-deploys

4. After first deploy, run migrations:
   - npx vercel env pull .env.local
   - npx prisma db push

## Local Development

1. Clone repo
2. cp .env.example .env.local
3. Fill in DATABASE_URL (use Neon free tier for local dev)
4. npm install
5. npx prisma db push
6. npm run dev
