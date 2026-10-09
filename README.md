# PINGOO

PINGOO is a game-discovery application built with Next.js App Router, React, and TypeScript. Its catalog separates source-checked entries from retained illustrative demo records. Verified facts link to the sources used and include a last-checked date.

## Tech
- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Netlify hosting, image delivery for sourced artwork, and contact forms

## Run locally
```bash
npm install
npm run dev
```

## Catalog publication
- `lib/verified-games.js` contains source-checked entries and field-to-source provenance.
- `lib/games.ts` defines the catalog model and helpers. `games` contains published records; `allGames` also retains demo entries for direct, noindex legacy routes.
- `validateCatalog()` checks IDs, slugs, references, requirements/platform consistency, dated sources and source provenance.
- Do not mark a field verified without an authoritative URL that supports that exact claim. Unknown details should be omitted.
- See [docs/catalog-verification.md](docs/catalog-verification.md) for the current candidate decisions and limitations.

## Monetization
There are no advertising scripts, analytics integrations, or affiliate links in the repository. Keep commercial offers separate from factual metadata. Only add approved affiliate destinations with a clear disclosure and appropriate `rel="sponsored"`; review privacy and consent requirements before adding tracking.
