# PINGOO

PINGOO is a game discovery platform: discover, search and explore games by genre and platform, then go to an official store to get them. PINGOO never hosts game files.

## Tech
- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Netlify: hosting, Image CDN (all artwork goes through `/.netlify/images`), Forms (contact)

## Run locally
```bash
npm install
npm run dev   # netlify dev on http://localhost:8889 (needed for Image CDN and Forms emulation)
```

## Status
The public site is live with a sample catalog in `lib/games.ts`. The next steps (database, admin dashboard, real content, accounts) are in [PLAN.md](PLAN.md).
