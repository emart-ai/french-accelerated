@AGENTS.md

# TEF Accelerator

A Next.js 16 app to help Spanish speakers learn French for the TEF Canada exam. Two study tracks: CLB 5 (28-day plan) and CLB 7 (150-day plan).

## Tech stack

- **Framework**: Next.js 16.2 with Turbopack, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui (Base UI primitives), lucide-react icons
- **Database**: PostgreSQL via Prisma 7 (schema at `prisma/schema.prisma`, config at `prisma.config.ts`)
- **Fonts**: Nunito (headings), Nunito Sans (body)
- **TTS**: Browser speech synthesis (`src/lib/tts.ts`)
- **Images**: Pexels API for flashcard visuals (proxied through `/api/image`)

## Running locally

```bash
# Install dependencies
npm install

# Set up env vars (copy .env.example to .env, fill in DATABASE_URL and PEXELS_API_KEY)

# Push schema to database
npx prisma db push

# Start dev server
npm run dev          # runs on http://localhost:3000
```

## Exposing to mobile via localtunnel

```bash
npx localtunnel --port 3000
```

This gives a public `https://*.loca.lt` URL. On first visit from a phone, localtunnel shows a splash page — enter your public IP to bypass it. The `allowedDevOrigins` in `next.config.ts` already permits `*.loca.lt` and `*.ngrok-free.dev`.

## Project structure

- `src/app/page.tsx` — Entry point, loads `TabSwitcher` (CLB 5 / CLB 7 tabs)
- `src/components/` — All UI: `DayPlanner`, `Flashcards`, `Quiz`, `SpeakingA/B`, `WriteEmail`, `WriteOpinion`, `ListenGuide`, etc.
- `src/components/ui/` — shadcn/ui primitives (Button, Card, Tabs, Dialog, etc.)
- `src/data/` — Static data: word lists (`words.ts`), study plans (`plan-clb5.ts`, `plan-clb7.ts`), speaking scenarios, writing templates
- `src/hooks/` — `useLearnedWords` and `useProgress` (localStorage cache + API sync)
- `src/app/api/` — API routes: `user`, `words/learned`, `progress`, `quiz`, `position`, `image`
- `prisma/schema.prisma` — Models: User, LearnedWord, Progress, QuizResult, FlashcardPosition

## Key patterns

- User identification is cookie-based (anonymous, auto-created via `/api/user`)
- All client state (learned words, progress, flashcard position) is cached in localStorage first, then synced to the DB via API calls
- `suppressHydrationWarning` on `<html>` and `<body>` in layout.tsx to handle localtunnel/browser extension DOM injection
- Flashcard images are fetched from Pexels via `/api/image?q=<english_word>` with a visual synonym map for abstract words

## Database

PostgreSQL is required. The connection string goes in `DATABASE_URL` in `.env`. Use `npx prisma db push` to sync the schema (no migrations). Generated client outputs to `src/generated/prisma`.
