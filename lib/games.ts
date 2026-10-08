// Sample catalog. This is the single data source for the site until the database milestone (see PLAN.md).
// Every page reads through the helpers at the bottom of this file, so swapping in real persistence only touches this module.

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

export type Source = { name: string; url: string; kind: 'store' | 'official' | 'free' }

export type Game = {
  slug: string
  title: string
  tagline: string
  description: string
  genres: GenreSlug[]
  platforms: PlatformSlug[]
  developer: string
  publisher: string
  releaseYear: number
  image: string
  imagePrompt: string
  features: string[]
  requirements?: { minimum: string[]; recommended: string[] }
  sources: Source[]
  trendingRank?: number
  addedAt: string
  recommended?: boolean
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
}

const steam = (t: string): Source => ({ name: 'Steam', url: `https://store.steampowered.com/search/?term=${encodeURIComponent(t)}`, kind: 'store' })
const playStore = (t: string): Source => ({ name: 'Google Play', url: `https://play.google.com/store/search?q=${encodeURIComponent(t)}&c=apps`, kind: 'store' })
const appStore = (t: string): Source => ({ name: 'App Store', url: `https://www.apple.com/search/${encodeURIComponent(t)}?src=globalnav`, kind: 'store' })
const psStore = (t: string): Source => ({ name: 'PlayStation Store', url: `https://store.playstation.com/search/${encodeURIComponent(t)}`, kind: 'store' })
const xboxStore = (t: string): Source => ({ name: 'Xbox Store', url: `https://www.xbox.com/en-US/search?q=${encodeURIComponent(t)}`, kind: 'store' })
const eshop = (t: string): Source => ({ name: 'Nintendo eShop', url: `https://www.nintendo.com/search/#q=${encodeURIComponent(t)}`, kind: 'store' })

const pcReq = (gpu: string, ram: number) => ({
  minimum: ['OS: Windows 10 64-bit', 'CPU: Quad-core 3.0 GHz', `Memory: ${ram} GB RAM`, `Graphics: ${gpu}`, 'Storage: 40 GB available'],
  recommended: ['OS: Windows 11 64-bit', 'CPU: 6-core 3.6 GHz', `Memory: ${ram * 2} GB RAM`, 'Graphics: RTX 3060 / RX 6600', 'Storage: 40 GB SSD'],
})

export const games: Game[] = [
  {
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
    sources: [steam('Skyreach Odyssey'), psStore('Skyreach Odyssey'), xboxStore('Skyreach Odyssey')],
    trendingRank: 1,
    addedAt: '2026-09-28',
    recommended: true,
  },
  {
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
    sources: [steam('Frostbound'), xboxStore('Frostbound')],
    trendingRank: 2,
    addedAt: '2026-08-14',
    recommended: true,
  },
  {
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
    sources: [playStore('Pocket Kingdoms'), appStore('Pocket Kingdoms')],
    trendingRank: 3,
    addedAt: '2026-09-02',
  },
  {
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
    sources: [steam('Ember Knights Rising'), psStore('Ember Knights Rising'), xboxStore('Ember Knights Rising'), eshop('Ember Knights Rising')],
    trendingRank: 4,
    addedAt: '2026-07-21',
    recommended: true,
  },
  {
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
    sources: [playStore('Harbor Run'), appStore('Harbor Run'), steam('Harbor Run')],
    trendingRank: 5,
    addedAt: '2026-09-18',
  },
  {
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
    sources: [playStore('Blockyard Builders'), appStore('Blockyard Builders'), steam('Blockyard Builders'), eshop('Blockyard Builders')],
    trendingRank: 6,
    addedAt: '2026-06-30',
    recommended: true,
  },
  {
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
    sources: [steam('Starfall Tactics')],
    trendingRank: 7,
    addedAt: '2026-10-01',
  },
  {
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
    sources: [playStore('Pebble and Pine'), appStore('Pebble and Pine'), eshop('Pebble and Pine')],
    addedAt: '2026-09-25',
    recommended: true,
  },
  {
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
    sources: [psStore('Velocity Drift'), xboxStore('Velocity Drift'), steam('Velocity Drift')],
    trendingRank: 8,
    addedAt: '2026-05-12',
  },
  {
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
    sources: [steam('Hollow Signal'), psStore('Hollow Signal')],
    addedAt: '2026-10-04',
  },
  {
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
    sources: [playStore('Goal Rush'), appStore('Goal Rush'), eshop('Goal Rush'), psStore('Goal Rush')],
    trendingRank: 9,
    addedAt: '2026-09-30',
  },
  {
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
    sources: [psStore('Tidebreaker'), xboxStore('Tidebreaker'), steam('Tidebreaker')],
    trendingRank: 10,
    addedAt: '2026-04-09',
  },
]

export const featuredGame = games[0]

export const getGame = (slug: string) => games.find((g) => g.slug === slug)
export const byGenre = (slug: GenreSlug) => games.filter((g) => g.genres.includes(slug))
export const byPlatform = (slug: PlatformSlug) => games.filter((g) => g.platforms.includes(slug))
export const byGroup = (group: 'pc' | 'console' | 'mobile') =>
  games.filter((g) => g.platforms.some((p) => platforms[p].group === group))
export const trending = () => games.filter((g) => g.trendingRank).sort((a, b) => a.trendingRank! - b.trendingRank!)
export const recentlyAdded = () => [...games].sort((a, b) => b.addedAt.localeCompare(a.addedAt))
export const recommended = () => games.filter((g) => g.recommended)

export function related(game: Game, limit = 4) {
  return games
    .filter((g) => g.slug !== game.slug)
    .map((g) => ({ g, score: g.genres.filter((x) => game.genres.includes(x)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.g)
}

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

/** "PC • Action" style label used on cards and suggestions. */
export const metaLabel = (g: Game) => `${platforms[g.platforms[0]].name} • ${genres[g.genres[0]].name}`
