import assert from 'node:assert/strict'
import { allGames, availableGenres, availablePlatforms, byGenre, byGroup, games, searchGames, validateCatalog } from '../lib/games.ts'
import { comparePcRequirements, filterGames, findSimilarGames, recommendGames } from '../lib/game-intelligence.ts'

let failures = 0
function test(name, run) {
  try { run(); process.stdout.write(`PASS ${name}\n`) }
  catch (error) { failures++; process.stderr.write(`FAIL ${name}\n${error.stack ?? error}\n`) }
}

test('verified and retained demo records pass integrity checks', () => {
  assert.deepEqual(validateCatalog(), [])
  assert.equal(games.length, 9)
  assert.ok(games.every((game) => game.catalogStatus === 'verified'))
  assert.ok(allGames.some((game) => game.catalogStatus === 'demo'))
})

test('each published record has dated source provenance for core facts', () => {
  for (const game of games) {
    assert.ok(game.sources.length, game.slug)
    assert.ok(game.lastVerifiedAt, game.slug)
    assert.ok(game.provenance?.title?.length, game.slug)
    assert.ok(game.provenance?.platforms?.length, game.slug)
    assert.ok(game.sources.every((source) => /^https:\/\//.test(source.url)), game.slug)
  }
})

test('search and canonical genre/platform filters use published records only', () => {
  assert.deepEqual(searchGames('Skyreach Odyssey'), [])
  assert.deepEqual(searchGames('Dota 2').map((game) => game.slug), ['dota-2'])
  assert.ok(searchGames('playstation').every((game) => game.platforms.includes('playstation')))
  assert.ok(byGenre('racing').every((game) => game.genres.includes('racing')))
  assert.ok(byGroup('pc').every((game) => game.platforms.includes('pc')))
})

test('visible genre and platform categories each contain at least one verified game', () => {
  for (const [slug] of availableGenres()) assert.ok(byGenre(slug).length > 0, slug)
  for (const [slug] of availablePlatforms()) assert.ok(games.some((game) => game.platforms.includes(slug)), slug)
  assert.ok(byGenre('action').length >= 3)
  assert.ok(byGenre('adventure').length >= 3)
  assert.ok(byGenre('open-world').length >= 3)
})

test('validator catches duplicate identifiers, broken references and requirements without PC', () => {
  const invalid = [
    { ...games[0], id: 'duplicate-id', slug: 'dota-2', genres: ['not-a-genre'] },
    { ...games[1], id: 'duplicate-id', slug: 'dota-2', platforms: ['android'], requirements: { minimum: [], recommended: [] } },
    { ...games[2], id: 'third-id', slug: 'bad slug', platforms: ['android'], requirements: { minimum: [], recommended: [] } },
  ]
  const errors = validateCatalog(invalid)
  assert.ok(errors.some((error) => error.includes('Duplicate ID')))
  assert.ok(errors.some((error) => error.includes('Duplicate slug')))
  assert.ok(errors.some((error) => error.includes('Invalid slug')))
  assert.ok(errors.some((error) => error.includes('Invalid genre reference')))
  assert.ok(errors.some((error) => error.includes('PC requirements without PC platform')))
})

test('verified records reject generic search destinations', () => {
  const invalid = { ...games[0], sources: [{ name: 'Search', url: 'https://store.steampowered.com/search/?term=dota', kind: 'product-store', verifiedAt: '2026-10-09' }] }
  assert.ok(validateCatalog([invalid]).some((error) => error.includes('Generic search destination')))
})

test('verified facts are mapped to real source URLs in the source list', () => {
  const invalid = { ...games[0], provenance: { ...games[0].provenance, title: ['https://unlisted.example/fact'] } }
  assert.ok(validateCatalog([invalid]).some((error) => error.includes('Verified claim lacks source provenance (title)')))
})

test('discovery filters compose as an intersection and return published games only', () => {
  const matches = filterGames({ platform: 'pc', genre: 'racing', pcRequirements: true })
  assert.ok(matches.length > 0)
  assert.ok(matches.every((game) => game.catalogStatus === 'verified' && game.platforms.includes('pc') && game.genres.includes('racing') && game.requirements))
})

test('finder returns explainable matches and requires at least one preference', () => {
  assert.deepEqual(recommendGames({}), [])
  const matches = recommendGames({ platform: 'pc', genre: 'racing', pcRequirements: true })
  assert.ok(matches.length > 0)
  assert.ok(matches.every(({ game, reasons }) => game.platforms.includes('pc') && game.genres.includes('racing') && game.requirements && reasons.length === 3))
})

test('similar-game results are deterministic and include their factual match reasons', () => {
  const first = findSimilarGames(games[0])
  const second = findSimilarGames(games[0])
  assert.deepEqual(first, second)
  assert.ok(first.every(({ game, reasons }) => game.catalogStatus === 'verified' && reasons.length > 0))
})

test('PC compatibility checks compare entered RAM and leave unsupported hardware unknown', () => {
  const game = games.find((entry) => entry.requirements)
  assert.ok(game)
  const checks = comparePcRequirements(game, { ramGb: 1, operatingSystem: 'Windows 11' })
  assert.equal(checks.find((check) => /Memory|RAM/i.test(check.requirement))?.status, 'below')
  assert.ok(checks.filter((check) => /Graphics|CPU/i.test(check.requirement)).every((check) => check.status === 'unknown'))
})

if (failures) process.exitCode = 1
else process.stdout.write('All catalog tests passed.\n')


