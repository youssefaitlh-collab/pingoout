# Catalog verification report

Review date: 2026-10-09

## Published records

Nine game profiles are marked verified and appear in discovery, search, comparison, and the XML sitemap. Their factual fields map to exact official publisher/developer or authorized store URLs, with per-source check dates. The profiles are Dota 2, PUBG: BATTLEGROUNDS, Minecraft, Genshin Impact, VALORANT, ARC Raiders, Resident Evil Requiem, Crimson Desert, and Forza Horizon 6.

The implementation intentionally omits unsupported exact release dates, current pricing, ratings, player counts, fabricated review content, and unlicensed artwork. PC requirements are displayed only for records with a cited official developer/publisher or authorized store requirements page. Genshin Impact's older PC requirement references are not treated as current requirements, so the page omits a PC requirements table.

## Shortlist dispositions

| Candidate | Disposition | Reason / source review |
| --- | --- | --- |
| Counter-Strike 2 | Deferred | The Steam listing's release-year field is inherited from the Counter-Strike: Global Offensive app history and is not suitable evidence for Counter-Strike 2's own launch date. Verify title-specific date and edition details from Valve before publishing a profile. Starting source: <https://store.steampowered.com/app/730/CounterStrike_2/> |
| Dota 2 | Published | Valve's exact Steam product listing supports the title, developer, publisher, release year, PC listing, game description, and listed PC minimum requirements. https://store.steampowered.com/app/570/Dota_2/ |
| PUBG: BATTLEGROUNDS | Published | Steam exact product listing used for title, developer, publisher, release year, PC listing, genre description, and Windows requirements. This profile does not generalize other platform listings from Steam. https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/ |
| Roblox | Deferred | Roblox is a user-generated gaming and creation platform, not one individual game. The current `/games/[slug]` and `VideoGame` schema model needs a distinct platform/experience entity before it can be represented accurately. Official platform overview: https://create.roblox.com/docs/what-is-roblox |
| Minecraft | Published | Mojang official site and PC store listing support editions, platform availability, game type, and release-year context. https://www.minecraft.net/en-us/about-minecraft |
| Fortnite | Deferred | Fortnite is a changing game ecosystem with separately described modes and region/device-dependent availability. A single undifferentiated game record would obscure which mode and platform facts apply. Official Battle Royale announcement: https://www.fortnite.com/news/announcing-fortnite-battle-royale |
| Genshin Impact | Published | HoYoverse official pages support current platform status and release-year context; PlayStation Store supports the action RPG classification. PS4 is not presented as currently supported. https://genshin.hoyoverse.com/en/news/detail/163454 |
| VALORANT | Published | Riot's official page/specs support the PC profile and requirements. Console is not generalized because Riot's current announcement describes a regional launch; regional availability needs first-class modeling. https://playvalorant.com/en-us/specs/ |
| ARC Raiders | Published | Embark official site supports platform status and extraction-adventure description; Steam exact product page supports credits and PC requirements. https://arcraiders.com/en |
| Resident Evil Requiem | Published | Steam and PlayStation Store exact listings support PC/PS5 profile, genre, developer/publisher and PC requirements. https://store.steampowered.com/app/3764200/Resident_Evil_Requiem/ |
| Crimson Desert | Published | Pearl Abyss official site and release/platform notice support the current PC, PlayStation and Xbox profile. No PC requirements were found in the official source checked, so none are shown. https://www.pearlabyss.com/en-US/Board/Detail?_boardNo=14684 |
| Forza Horizon 6 | Published | Official Forza page and Steam product page support available PC/Xbox status and PC requirements; the official PS5 notice says that edition is scheduled for a later date, so it is not listed as currently available. https://forza.net/forzahorizon6 |

The links above are the starting primary sources recorded in each game record; where source details are platform-specific, the profile's “Sources” section links to them directly. Check the regional storefront before acting on availability, which can change after this review date.

## Model and publication safeguards

- `lib/games.ts` defines stable IDs/slugs, platform and genre references, claim provenance, source timestamps, and editorial fields.
- `lib/verified-games.js` is the sourced catalog; only these records are exposed by regular discovery/search/filter helpers.
- The 12 legacy illustrative records remain in `allGames` to preserve direct URLs; their page metadata is `noindex`, they are excluded from discovery, structured data, and sitemap URLs, and the page identifies them as demos.
- The validator rejects duplicate IDs/slugs, malformed references, PC requirements on non-PC records, malformed/unsafe destinations, generic store search URLs, and verified claims without provenance.
- Source verification timestamps record the date checked, not a guarantee that a fact will remain current.
- No aggregate ratings, pricing, offers, ad/affiliate integration, player counts, performance predictions, or user statistics have been added.

## Supporting content and commercial readiness

No articles or keyword-targeted landing pages were created. Editorial opportunities to research next include PC requirements/compatibility explainers for games with official specs, Minecraft Java vs Bedrock edition differences, and transparent comparisons for the verified game set. These are editorial priorities only; no search-volume or competition metrics were collected. There are no ads, analytics, or affiliate programs configured.

## Validation and limits

- Production build completed with `URL=https://pingoout.netlify.app`.
- TypeScript check and catalog tests passed.
- Local production server returned 200 for the homepage, nine verified game routes, a retained demo route, robots.txt, sitemap index and sitemap page; invalid game slug returned 404.
- Checked canonical, unique description, JSON-LD parseability, demo noindex/sitemap exclusion, comparison output, search, matching filters, and filter empty state.
- Live Netlify deployment, Google Search Console, Rich Results Test, external link status at every platform storefront, and mobile-device visual testing were not verified in this run.
