import { games, genres, platforms, type Game } from './games'

export type SimilarGame = { game: Game; reasons: string[]; rankValue: number }

/** Data-driven three-year release buckets; new catalog years are included automatically. */
export function releasePeriods() {
  const years = games.map((game) => game.releaseYear).filter(Number.isFinite)
  if (!years.length) return []
  const first = Math.floor(Math.min(...years) / 3) * 3
  const last = Math.floor(Math.max(...years) / 3) * 3
  return Array.from({ length: Math.floor((last - first) / 3) + 1 }, (_, index) => {
    const start = first + index * 3
    const end = start + 2
    return { value: `${start}-${end}`, label: `${start}–${end}` }
  })
}

/**
 * Rule-based ordering only. Weights: each shared genre 4, platform 2, exact feature 1,
 * developer 1, publisher 1, and release within two years 1. No percentage or user-facing
 * score is exposed. Ties use title order for deterministic results.
 */
export function findSimilarGames(source: Game, limit = 4): SimilarGame[] {
  return games
    .filter((candidate) => candidate.slug !== source.slug)
    .map((candidate) => {
      const sharedGenres = source.genres.filter((slug) => candidate.genres.includes(slug))
      const sharedPlatforms = source.platforms.filter((slug) => candidate.platforms.includes(slug))
      const sharedFeatures = source.features.filter((feature) => candidate.features.includes(feature))
      const nearbyRelease = Math.abs(source.releaseYear - candidate.releaseYear) <= 2
      const reasons = [
        ...sharedGenres.map((slug) => `Shared genre: ${genres[slug].name}`),
        ...sharedPlatforms.map((slug) => `Also on ${platforms[slug].name}`),
        ...sharedFeatures.map((feature) => `Shared feature: ${feature}`),
        ...(candidate.developer === source.developer ? [`Same developer: ${source.developer}`] : []),
        ...(candidate.publisher === source.publisher ? [`Same publisher: ${source.publisher}`] : []),
        ...(nearbyRelease ? [`Released within two years (${candidate.releaseYear})`] : []),
      ]
      const rankValue = sharedGenres.length * 4 + sharedPlatforms.length * 2 + sharedFeatures.length +
        Number(candidate.developer === source.developer) + Number(candidate.publisher === source.publisher) + Number(nearbyRelease)
      return { game: candidate, reasons, rankValue }
    })
    .filter((item) => item.rankValue > 0)
    .sort((a, b) => b.rankValue - a.rankValue || a.game.title.localeCompare(b.game.title))
    .slice(0, Math.max(0, limit))
}

export function filterGames(filters: { platform?: string; genre?: string; period?: string; feature?: string; pcRequirements?: boolean }) {
  return games.filter((game) => {
    if (filters.platform && !game.platforms.includes(filters.platform as Game['platforms'][number])) return false
    if (filters.genre && !game.genres.includes(filters.genre as Game['genres'][number])) return false
    if (filters.period) {
      const [start, end] = filters.period.split('-').map(Number)
      if (!Number.isFinite(start) || !Number.isFinite(end) || game.releaseYear < start || game.releaseYear > end) return false
    }
    if (filters.feature && !game.features.includes(filters.feature)) return false
    if (filters.pcRequirements && !game.requirements) return false
    return true
  })
}

export type RequirementCheck = { requirement: string; status: 'meets' | 'below' | 'unknown'; explanation: string }

/** RAM is compared numerically when a catalog requirement is parseable. Other fields remain unknown. */
export function comparePcRequirements(game: Game, hardware: { ramGb?: number; operatingSystem?: string }): RequirementCheck[] {
  const minimum = game.requirements?.minimum ?? []
  const ramRequirement = minimum.find((item) => /\b(memory|ram)\b/i.test(item))
  const ramMatch = ramRequirement?.match(/(\d+)\s*GB/i)
  const checks: RequirementCheck[] = []
  if (ramRequirement && ramMatch && hardware.ramGb !== undefined) {
    const needed = Number(ramMatch[1])
    checks.push({
      requirement: ramRequirement,
      status: hardware.ramGb >= needed ? 'meets' : 'below',
      explanation: hardware.ramGb >= needed ? `Entered RAM: ${hardware.ramGb} GB` : `Entered RAM: ${hardware.ramGb} GB; listed minimum: ${needed} GB`,
    })
  }
  const osRequirement = minimum.find((item) => /^OS:/i.test(item))
  if (osRequirement && hardware.operatingSystem?.trim()) {
    const requiredOs = osRequirement.replace(/^OS:\s*/i, '').trim().toLowerCase()
    const enteredOs = hardware.operatingSystem.trim().toLowerCase()
    const comparable = enteredOs.replace(/\s+/g, ' ') === requiredOs.replace(/\s+/g, ' ')
    checks.push({
      requirement: osRequirement,
      status: comparable ? 'meets' : 'unknown',
      explanation: comparable ? `Entered OS: ${hardware.operatingSystem}` : `Entered OS: ${hardware.operatingSystem}; not directly comparable to the listed OS text`,
    })
  }
  for (const item of minimum.filter((row) => !checks.some((check) => check.requirement === row))) {
    checks.push({ requirement: item, status: 'unknown', explanation: 'PINGOO does not have normalized data to compare this component.' })
  }
  return checks
}
