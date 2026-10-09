// Central game catalog. Verified entries are available to discovery and indexable routes;
// illustrative demo records remain accessible only by direct, noindex preview route.

export type PlatformSlug = 'pc' | 'playstation' | 'xbox' | 'switch' | 'android' | 'ios'
export type GenreSlug =
  | 'action'
  | 'adventure'
  | 'open-world'
  | 'rpg'
  | 'strategy'
  | 'racing'
  | 'survival'
  | 'puzzle'
  | 'sports'
  | 'horror'
  | 'sandbox'
  | 'shooter'
  | 'battle-royale'
  | 'moba'
  | 'tactical-shooter'
  | 'action-rpg'
  | 'survival-horror'
  | 'action-adventure'

/** A destination may be published only after a human has checked the exact product URL. */
export type Source = {
  name: string
  url: string
  kind: 'official-site' | 'product-store'
  verifiedAt: string
  /** Set only for an approved affiliate relationship; render its disclosure beside the link. */
  commercial?: { relationship: 'affiliate'; disclosure: string }
}

export type GameClaim = 'title' | 'summary' | 'description' | 'developer' | 'publisher' | 'releaseYear' | 'releaseDate' | 'platforms' | 'genres' | 'features' | 'requirements'

export type Game = {
  /** Stable internal identifier. Do not use display names as database keys. */
  id: string
  slug: string
  /** Demo records remain usable in the preview catalogue but are not search-indexable. */
  catalogStatus: 'demo' | 'verified'
  title: string
  tagline: string
  description: string
  genres: GenreSlug[]
  platforms: PlatformSlug[]
  developer: string
  publisher: string
  releaseYear: number
  /** Exact ISO date only when a reliable source provides it. */
  releaseDate?: string
  /** Only sourced, licensed artwork should be added. Demo artwork stays on demo records. */
  image?: string
  /** Official trailer metadata and the source used for the displayed thumbnail. */
  media?: { videoId: string; videoTitle: string; videoSourceUrl: string; imageSourceUrl: string }
  imagePrompt?: string
  features: string[]
  requirements?: { minimum: string[]; recommended: string[] }
  sources: Source[]
  /** Human verification date for factual claims on a published record. */
  lastVerifiedAt?: string
  /** Maps each verified factual field to one or more exact URLs from `sources`. */
  provenance?: Partial<Record<GameClaim, string[]>>
  /** Optional editorial assessment. Populate only after human editorial review. */
  editorial?: GameEditorialProfile
}

export type GameEditorialProfile = {
  bestSuitedFor?: string[]
  lessSuitableFor?: string[]
  strengths?: string[]
  limitations?: string[]
}

export const platforms: Record<PlatformSlug, { name: string; group: 'pc' | 'console' | 'mobile' }> = {
  pc: { name: 'PC', group: 'pc' },
  playstation: { name: 'PlayStation', group: 'console' },
  xbox: { name: 'Xbox', group: 'console' },
  switch: { name: 'Nintendo Switch', group: 'console' },
  android: { name: 'Android', group: 'mobile' },
  ios: { name: 'iOS', group: 'mobile' },
}

export const genres: Record<GenreSlug, { name: string; description: string }> = {
  action: { name: 'Action', description: 'Fast reflexes, big moments and non-stop momentum.' },
  adventure: { name: 'Adventure', description: 'Stories to follow and worlds to uncover.' },
  'open-world': { name: 'Open World', description: 'Huge maps with the freedom to go anywhere.' },
  rpg: { name: 'RPG', description: 'Build a character, make choices and level up.' },
  strategy: { name: 'Strategy', description: 'Plan ahead, outthink rivals and command the field.' },
  racing: { name: 'Racing', description: 'Speed, drifting and photo finishes.' },
  survival: { name: 'Survival', description: 'Gather, craft and endure harsh worlds.' },
  puzzle: { name: 'Puzzle', description: 'Clever challenges that reward a sharp mind.' },
  sports: { name: 'Sports', description: 'Competitive matches and seasons to master.' },
  horror: { name: 'Horror', description: 'Tension, atmosphere and things in the dark.' },
  sandbox: { name: 'Sandbox', description: 'Build, create and play your own way.' },
  shooter: { name: 'Shooter', description: 'Games centered on ranged combat and aiming.' },
  'battle-royale': { name: 'Battle Royale', description: 'Large-scale survival matches where players compete to be the last remaining.' },
  moba: { name: 'MOBA', description: 'Team-based strategy games built around lanes, roles and objectives.' },
  'tactical-shooter': { name: 'Tactical Shooter', description: 'Team shooters focused on round-based objectives and tactical play.' },
  'action-rpg': { name: 'Action RPG', description: 'Role-playing games with real-time action combat.' },
  'survival-horror': { name: 'Survival Horror', description: 'Horror games focused on survival, exploration and resource management.' },
  'action-adventure': { name: 'Action Adventure', description: 'Adventure games combining exploration and action.' },
}

import { verifiedGames } from './verified-games.js'

const pcReq = (gpu: string, ram: number) => ({
  minimum: ['OS: Windows 10 64-bit', 'CPU: Quad-core 3.0 GHz', `Memory: ${ram} GB RAM`, `Graphics: ${gpu}`, 'Storage: 40 GB available'],
  recommended: ['OS: Windows 11 64-bit', 'CPU: 6-core 3.6 GHz', `Memory: ${ram * 2} GB RAM`, 'Graphics: RTX 3060 / RX 6600', 'Storage: 40 GB SSD'],
})

const demoGames: Game[] = [
  {
    id: 'demo-skyreach-odyssey',
    catalogStatus: 'demo',
    slug: 'skyreach-odyssey',
    title: 'Skyreach Odyssey',
    tagline: 'Chart floating islands in a world that never stops moving.',
    description:
      'Skyreach Odyssey is an open-world action adventure set across a chain of drifting sky islands. Glide between ruins, recruit a crew for your airship and uncover why the islands began to fall.',
    genres: ['action', 'open-world', 'adventure'],
    platforms: ['pc', 'playstation', 'xbox'],
    developer: 'Northwind Studio',
    publisher: 'Bluepeak Games',
    releaseYear: 2025,
    image: 'skyreach-odyssey.png',
    imagePrompt: 'floating sky islands with ancient ruins at golden hour, a small wooden airship sailing between them, a lone explorer with a glider on a cliff edge, epic scale',
    features: ['Seamless world with no loading screens', 'Upgradeable airship and crew', 'Glider traversal and vertical exploration', 'Story campaign of 40+ hours'],
    requirements: pcReq('GTX 1060 6 GB / RX 580', 8),
    sources: [],
  },
  {
    id: 'demo-frostbound',
    catalogStatus: 'demo',
    slug: 'frostbound',
    title: 'Frostbound',
    tagline: 'Survive the endless winter together.',
    description:
      'Frostbound is a co-op survival game on a frozen continent. Scavenge, build heated shelters and keep your camp alive through blizzards that reshape the map every night.',
    genres: ['survival', 'adventure'],
    platforms: ['pc', 'xbox'],
    developer: 'Polar Byte',
    publisher: 'Polar Byte',
    releaseYear: 2024,
    image: 'frostbound.png',
    imagePrompt: 'snowy frozen wilderness at dusk, a small group of survivors around a glowing campfire next to a makeshift shelter, aurora in the sky, cold blue tones',
    features: ['Co-op for up to 6 players', 'Dynamic blizzard system', 'Base building with heat management', 'Procedurally shifting terrain'],
    requirements: pcReq('GTX 970 / RX 570', 8),
    sources: [],
  },
  {
    id: 'demo-pocket-kingdoms',
    catalogStatus: 'demo',
    slug: 'pocket-kingdoms',
    title: 'Pocket Kingdoms',
    tagline: 'Build a tiny realm. Defend it from everyone.',
    description:
      'Pocket Kingdoms is a bite-sized strategy game for your phone. Grow a kingdom on a single island, train troops and battle friends in quick three-minute sieges.',
    genres: ['strategy'],
    platforms: ['android', 'ios'],
    developer: 'Little Crown',
    publisher: 'Little Crown',
    releaseYear: 2025,
    image: 'pocket-kingdoms.png',
    imagePrompt: 'charming miniature island kingdom with a small castle, tiny soldiers and catapults, stylized low-poly diorama, bright daylight, ocean around it',
    features: ['Three-minute sieges', 'Clan wars every weekend', 'Play offline, sync later', 'Fair free-to-play progression'],
    sources: [],
  },
  {
    id: 'demo-ember-knights-rising',
    catalogStatus: 'demo',
    slug: 'ember-knights-rising',
    title: 'Ember Knights Rising',
    tagline: 'Reforge a broken order of knights.',
    description:
      'Ember Knights Rising is a story-driven RPG where every choice reshapes your order. Explore a kingdom scarred by dragonfire, master elemental blades and decide who deserves to lead.',
    genres: ['rpg', 'action'],
    platforms: ['pc', 'playstation', 'xbox', 'switch'],
    developer: 'Cinder Hall',
    publisher: 'Bluepeak Games',
    releaseYear: 2024,
    image: 'ember-knights-rising.png',
    imagePrompt: 'armored knight holding a glowing ember sword in a ruined castle courtyard, embers floating in the air, dramatic cinematic lighting, dark fantasy',
    features: ['Branching story with multiple endings', 'Elemental combat system', 'Companions with loyalty arcs', 'New Game+'],
    requirements: pcReq('GTX 1070 / RX 5600 XT', 12),
    sources: [],
  },
  {
    id: 'demo-harbor-run',
    catalogStatus: 'demo',
    slug: 'harbor-run',
    title: 'Harbor Run',
    tagline: 'Street racing through a city by the sea.',
    description:
      'Harbor Run is an arcade racer set in a coastal city at night. Tune your car, take over districts and race rivals along the docks, bridges and cliffside roads.',
    genres: ['racing'],
    platforms: ['android', 'ios', 'pc'],
    developer: 'Tidal Motorworks',
    publisher: 'Tidal Motorworks',
    releaseYear: 2025,
    image: 'harbor-run.png',
    imagePrompt: 'sports car racing along a coastal harbor road at night, wet asphalt reflections, city lights and cargo cranes in the background, motion blur',
    features: ['Touch and controller support', 'Deep car tuning', 'Weekly online tournaments', 'Cross-progression with PC'],
    requirements: pcReq('GTX 960 / RX 470', 8),
    sources: [],
  },
  {
    id: 'demo-blockyard-builders',
    catalogStatus: 'demo',
    slug: 'blockyard-builders',
    title: 'Blockyard Builders',
    tagline: 'Build anything with friends, block by block.',
    description:
      'Blockyard Builders is a creative sandbox where you design worlds, mini-games and machines with friends. Share creations and play what the community builds every day.',
    genres: ['sandbox', 'adventure'],
    platforms: ['android', 'ios', 'pc', 'switch'],
    developer: 'Cubework',
    publisher: 'Cubework',
    releaseYear: 2023,
    image: 'blockyard-builders.png',
    imagePrompt: 'colorful voxel block world with players building a giant castle and a roller coaster, bright sunny sky, playful stylized 3D',
    features: ['Shared multiplayer worlds', 'Logic blocks for machines', 'Community creations hub', 'Family-friendly chat controls'],
    requirements: pcReq('Integrated graphics (Intel Iris Xe)', 4),
    sources: [],
  },
  {
    id: 'demo-starfall-tactics',
    catalogStatus: 'demo',
    slug: 'starfall-tactics',
    title: 'Starfall Tactics',
    tagline: 'Command a fleet at the edge of the galaxy.',
    description:
      'Starfall Tactics is a turn-based space strategy game. Lead a fleet through hostile sectors, customize ships and outmaneuver rival admirals in tense tactical battles.',
    genres: ['strategy'],
    platforms: ['pc'],
    developer: 'Orbit Nine',
    publisher: 'Orbit Nine',
    releaseYear: 2026,
    image: 'starfall-tactics.png',
    imagePrompt: 'fleet of sleek spaceships in formation above a blue gas giant planet, distant nebula, cinematic space battle about to begin',
    features: ['Turn-based fleet combat', 'Modular ship designer', 'Roguelite campaign', 'Asynchronous multiplayer'],
    requirements: pcReq('GTX 1050 Ti / RX 560', 8),
    sources: [],
  },
  {
    id: 'demo-pebble-and-pine',
    catalogStatus: 'demo',
    slug: 'pebble-and-pine',
    title: 'Pebble & Pine',
    tagline: 'Cozy puzzles in a forest that wants to be explored.',
    description:
      'Pebble & Pine is a relaxing puzzle game about guiding a small explorer through a living forest. Rotate paths, wake sleeping creatures and restore the woods one clearing at a time.',
    genres: ['puzzle', 'adventure'],
    platforms: ['android', 'ios', 'switch'],
    developer: 'Mossy Lantern',
    publisher: 'Mossy Lantern',
    releaseYear: 2025,
    image: 'pebble-and-pine.png',
    imagePrompt: 'cozy enchanted pine forest clearing with soft light rays, small round stone path tiles, tiny explorer character with a lantern, gentle painterly style',
    features: ['200+ handcrafted puzzles', 'No timers, no pressure', 'Original acoustic soundtrack', 'Playable one-handed'],
    sources: [],
  },
  {
    id: 'demo-velocity-drift',
    catalogStatus: 'demo',
    slug: 'velocity-drift',
    title: 'Velocity Drift',
    tagline: 'Master the perfect corner.',
    description:
      'Velocity Drift is a racing game built around drifting. Link corners on mountain passes, chase leaderboard ghosts and build a garage of legendary drift cars.',
    genres: ['racing', 'sports'],
    platforms: ['playstation', 'xbox', 'pc'],
    developer: 'Apex Line',
    publisher: 'Bluepeak Games',
    releaseYear: 2024,
    image: 'velocity-drift.png',
    imagePrompt: 'race car drifting around a mountain hairpin corner with tire smoke, pine trees and misty mountains, early morning light, dynamic angle',
    features: ['Physics-driven drift model', 'Ghost leaderboards', '60 licensed-style cars', 'Photo mode'],
    requirements: pcReq('GTX 1660 / RX 5500 XT', 8),
    sources: [],
  },
  {
    id: 'demo-hollow-signal',
    catalogStatus: 'demo',
    slug: 'hollow-signal',
    title: 'Hollow Signal',
    tagline: 'The station went quiet. Then it called back.',
    description:
      'Hollow Signal is a first-person horror game aboard an abandoned research station. Follow a mysterious radio signal, solve environmental puzzles and avoid what is listening.',
    genres: ['horror', 'adventure'],
    platforms: ['pc', 'playstation'],
    developer: 'Static Room',
    publisher: 'Static Room',
    releaseYear: 2025,
    image: 'hollow-signal.png',
    imagePrompt: 'dark abandoned research station corridor lit by a single flickering light, an old radio on a table, fog, eerie atmospheric horror, cold blue and dark tones',
    features: ['Audio-driven scares', 'Environmental puzzles', 'Multiple endings', 'Headphones recommended'],
    requirements: pcReq('GTX 1060 / RX 580', 8),
    sources: [],
  },
  {
    id: 'demo-goal-rush',
    catalogStatus: 'demo',
    slug: 'goal-rush',
    title: 'Goal Rush',
    tagline: 'Five-a-side football, fast and loud.',
    description:
      'Goal Rush is an arcade five-a-side football game. Short matches, flashy skill moves and seasonal leagues make it easy to pick up and hard to put down.',
    genres: ['sports'],
    platforms: ['android', 'ios', 'switch', 'playstation'],
    developer: 'Kickoff Labs',
    publisher: 'Kickoff Labs',
    releaseYear: 2026,
    image: 'goal-rush.png',
    imagePrompt: 'arcade style five-a-side football match on a rooftop pitch at sunset, player striking the ball mid-air, stadium lights, vibrant stylized 3D',
    features: ['Four-minute matches', 'Seasonal leagues', 'Local and online multiplayer', 'Cross-play'],
    sources: [],
  },
  {
    id: 'demo-tidebreaker',
    catalogStatus: 'demo',
    slug: 'tidebreaker',
    title: 'Tidebreaker',
    tagline: 'Sail, fight and plunder a storm-torn sea.',
    description:
      'Tidebreaker is a naval action game where you captain a ship across a storm-torn archipelago. Board enemy vessels, hunt sea beasts and upgrade your crew between voyages.',
    genres: ['action', 'open-world'],
    platforms: ['playstation', 'xbox', 'pc'],
    developer: 'Saltwind',
    publisher: 'Saltwind',
    releaseYear: 2023,
    image: 'tidebreaker.png',
    imagePrompt: 'tall sailing ship battling huge stormy ocean waves with lightning, a giant sea creature tentacle rising from the water, dramatic cinematic',
    features: ['Real-time naval combat', 'Ship boarding', 'Open archipelago', 'Co-op crew mode'],
    requirements: pcReq('GTX 1060 / RX 580', 8),
    sources: [],
  },

]

/** Official-source checked entries appear first; synthetic preview records remain explicitly demo-only. */
export const games: Game[] = [...verifiedGames]
/** Retained for direct, noindex preview routes; never included in discovery or search data. */
export const allGames: Game[] = [...games, ...demoGames]

export const featuredGame = games[0]
export const publishedGames = games.filter((game) => game.catalogStatus === 'verified')
export const sampleCatalog = () => games

export const getGame = (slug: string) => allGames.find((g) => g.slug === slug)
export const byGenre = (slug: GenreSlug) => games.filter((g) => g.genres.includes(slug))
export const byPlatform = (slug: PlatformSlug) => games.filter((g) => g.platforms.includes(slug))
export const availableGenres = () => Object.entries(genres).filter(([slug]) => byGenre(slug as GenreSlug).length > 0)
export const availablePlatforms = () => Object.entries(platforms).filter(([slug]) => byPlatform(slug as PlatformSlug).length > 0)
export const byGroup = (group: 'pc' | 'console' | 'mobile') =>
  games.filter((g) => g.platforms.some((p) => platforms[p].group === group))

/** Catalog integrity checks used by the automated data-quality tests. */
export function validateCatalog(records: Game[] = allGames): string[] {
  const errors: string[] = []
  const ids = new Set<string>()
  const slugs = new Set<string>()
  for (const game of records) {
    if (!game.id.trim()) errors.push(`Missing ID for ${game.slug || '(unknown game)'}`)
    else if (ids.has(game.id)) errors.push(`Duplicate ID: ${game.id}`)
    ids.add(game.id)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(game.slug)) errors.push(`Invalid slug: ${game.slug}`)
    else if (slugs.has(game.slug)) errors.push(`Duplicate slug: ${game.slug}`)
    slugs.add(game.slug)
    if (!game.title.trim()) errors.push(`Missing title for ${game.id}`)
    if (!Number.isInteger(game.releaseYear) || game.releaseYear < 1970) errors.push(`Invalid release year: ${game.slug}`)
    if (game.releaseDate && !validDate(game.releaseDate)) errors.push(`Invalid exact release date: ${game.slug}`)
    if (!game.genres.length || game.genres.some((genre) => !genres[genre])) errors.push(`Invalid genre reference: ${game.slug}`)
    if (!game.platforms.length || game.platforms.some((platform) => !platforms[platform])) errors.push(`Invalid platform reference: ${game.slug}`)
    if (new Set(game.genres).size !== game.genres.length) errors.push(`Duplicate genre reference: ${game.slug}`)
    if (new Set(game.platforms).size !== game.platforms.length) errors.push(`Duplicate platform reference: ${game.slug}`)
    if (game.requirements && !game.platforms.includes('pc')) errors.push(`PC requirements without PC platform: ${game.slug}`)
    if (game.catalogStatus === 'verified') {
      if (!validDate(game.lastVerifiedAt ?? '') || !game.sources.length) errors.push(`Verified record lacks verification date or sources: ${game.slug}`)
      const sourceUrls = new Set(game.sources.map((source) => source.url))
      for (const claim of ['title', 'summary', 'description', 'developer', 'publisher', 'releaseYear', 'platforms', 'genres'] as const) {
        const urls = game.provenance?.[claim]
        if (!urls?.length || urls.some((url) => !sourceUrls.has(url))) errors.push(`Verified claim lacks source provenance (${claim}): ${game.slug}`)
      }
      if (game.releaseDate && (!game.provenance?.releaseDate?.length || game.provenance.releaseDate.some((url) => !sourceUrls.has(url)))) errors.push(`Verified release date lacks source provenance: ${game.slug}`)
      if (game.requirements && (!game.provenance?.requirements?.length || game.provenance.requirements.some((url) => !sourceUrls.has(url)))) errors.push(`Verified system requirements lack source provenance: ${game.slug}`)
      if (game.features.length && (!game.provenance?.features?.length || game.provenance.features.some((url) => !sourceUrls.has(url)))) errors.push(`Verified features lack source provenance: ${game.slug}`)
    }
    if (game.catalogStatus === 'demo' && game.sources.length) errors.push(`Demo record must not publish product destinations: ${game.slug}`)
    for (const source of game.sources) {
      if (!source.name.trim() || !validDate(source.verifiedAt)) errors.push(`Source lacks label or valid verification date: ${game.slug}`)
      if (source.commercial?.relationship === 'affiliate' && !source.commercial.disclosure.trim()) errors.push(`Affiliate source lacks disclosure: ${game.slug}`)
      try {
        const url = new URL(source.url)
        if (url.protocol !== 'https:' || url.username || url.password) errors.push(`Invalid source URL: ${game.slug}`)
        if (/\/(search|search\/|search\.html)$/i.test(url.pathname) || ['q', 'term', 'query'].some((key) => url.searchParams.has(key))) errors.push(`Generic search destination is not an exact product URL: ${game.slug}`)
      } catch {
        errors.push(`Invalid source URL: ${game.slug}`)
      }
    }
  }
  return errors
}

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value
}

export function related(game: Game, limit = 4) {
  return games
    .filter((g) => g.slug !== game.slug)
    .map((g) => ({ g, score: g.genres.filter((x) => game.genres.includes(x)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.g)
}

/** Explicit relationship accessors keep game knowledge connected to the catalog source. */
export const gameGenres = (game: Game) => game.genres.map((slug) => ({ slug, ...genres[slug] }))
export const gamePlatforms = (game: Game) => game.platforms.map((slug) => ({ slug, ...platforms[slug] }))
export const gamesByDeveloper = (name: string) => games.filter((game) => game.developer === name)
export const gamesByPublisher = (name: string) => games.filter((game) => game.publisher === name)

/** Editorial content is deliberately empty until PINGOO editors provide verified assessments. */
export const editorialProfiles: Partial<Record<string, GameEditorialProfile>> = {}

export const getGameEditorial = (game: Game) => game.editorial ?? editorialProfiles[game.slug]

export function searchGames(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return games.filter((g) =>
    [g.title, g.developer, g.publisher, ...g.genres.map((s) => genres[s].name), ...g.platforms.map((p) => platforms[p].name)]
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
}

/** Stable URL-safe entity slugs derived from the catalog's exact names. */
export const entitySlug = (name: string) => name
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

export const developers = [...new Set(games.map((game) => game.developer))]
  .map((name) => ({ name, slug: entitySlug(name), games: games.filter((game) => game.developer === name) }))

export const publishers = [...new Set(games.map((game) => game.publisher))]
  .map((name) => ({ name, slug: entitySlug(name), games: games.filter((game) => game.publisher === name) }))

export const getDeveloper = (slug: string) => developers.find((developer) => developer.slug === slug)
export const getPublisher = (slug: string) => publishers.find((publisher) => publisher.slug === slug)

/** "PC • Action" style label used on cards and suggestions. */
export const metaLabel = (g: Game) => `${platforms[g.platforms[0]].name} • ${genres[g.genres[0]].name}`
