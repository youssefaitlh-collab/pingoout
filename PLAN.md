# PINGOO roadmap

## 1. Public discovery site — done
Branded site with every public route (home, catalogue, game pages, genres, platforms, trending, mobile/PC/console, search, about, contact, privacy, terms), reusable SEO and structured data, original artwork, and a contact form on Netlify Forms. Data comes from the sample catalog in `lib/games.ts`.

## 2. Game database
Move the catalog from `lib/games.ts` into Postgres (Netlify Database + Drizzle, `db/schema.ts`). Proposed tables: `games`, `genres`, `platforms`, `game_genres`, `game_platforms`, `sources`, `screenshots`. Keep the helper functions in `lib/games.ts` (`getGame`, `byGenre`, `trending`…) and make them query the database, so pages don't change. Use ISR/revalidation so game pages stay static and fast.

## 3. Admin sign-in and dashboard (`/admin`)
Admin-only login (Netlify Identity with an `admin` role), with `/admin` protected on the server. CRUD for games, sources, featured/trending order, and artwork uploads to Netlify Blobs. Contact submissions stay in the Netlify Forms dashboard.

## 4. Real catalogue content
Swap the sample games for real titles, using artwork that's licensed or provided by the publisher, verified official store links and screenshots. Add the Screenshots section to game pages once screenshots exist.

## 5. Optional user accounts
"Sign In" in the navbar, saved games, and "Recommended For You" based on what a user has saved. Build only if it's still wanted after launch.
