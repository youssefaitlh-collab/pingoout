# AGENTS.md

Continue from the roadmap in **PLAN.md**. Milestone 1 (the public site) is done.

## Architecture
- `lib/games.ts`: the **only** data source (sample catalog plus query helpers). Pages call the helpers only, so milestone 2 replaces the helper internals with database queries and leaves the pages untouched. `imagePrompt` was used to generate the artwork in `public/img/` and isn't rendered.
- `lib/seo.tsx`: `buildMetadata()` for every page's metadata/canonical/OG, `JsonLd` plus schema builders (WebSite, VideoGame, BreadcrumbList, ItemList, FAQPage), `imageUrl()` for Netlify Image CDN URLs, `SITE_URL` from Netlify's `URL` env var. Never write metadata by hand on a page.
- `components/`: `Header` (nav + `SearchBox` with suggestions; builds the slim client-side suggestion list), `MobileMenu`, `GameCard`/`GameGrid`/`GameSection`, `ListingPage` (all catalogue-style routes), `TextPage` (about/legal), `Footer`, `Logo`.
- `app/`: routes. Dynamic routes are fully static (`generateStaticParams`, `dynamicParams = false`). `/search` is server-rendered and `noindex`.
- Contact form: `app/contact/ContactForm.tsx` posts to `/__forms.html` (static skeleton in `public/` for Netlify Forms detection). Keep the two in sync.

## Conventions
- Design tokens (Tailwind theme): `bg`, `surface`, `elevated`, `line`, `primary`, `primary-strong`, `cyan`, `text`, `muted`. Don't add new colors. Buttons use `primary-strong` (#2563EB) so white text meets AA; `.btn-primary` / `.btn-secondary` live in `globals.css`.
- 8px radius on cards, subtle borders, no heavy shadows, 150–250ms transitions only.
- Use plain `<img>` with `imageUrl()` rather than `next/image`.
- Outbound store links: `target="_blank" rel="noopener noreferrer nofollow"`.
- Persistence must use Netlify primitives (Netlify Database / Blobs), not external services.
