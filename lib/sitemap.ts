import { developers, games, genres, platforms, publishers } from '@/lib/games'

export const SITEMAP_PAGE_SIZE = 10_000

export function indexablePaths() {
  const paths = [
    '/', '/games', '/trending', '/mobile-games', '/pc-games', '/console-games', '/about', '/contact', '/privacy', '/terms',
    ...games.map((game) => `/games/${game.slug}`),
    ...Object.keys(genres).map((slug) => `/genres/${slug}`),
    ...Object.keys(platforms).map((slug) => `/platforms/${slug}`),
    ...developers.filter(({ games: entityGames }) => entityGames.length >= 2).map(({ slug }) => `/developers/${slug}`),
    ...publishers.filter(({ games: entityGames }) => entityGames.length >= 2).map(({ slug }) => `/publishers/${slug}`),
  ]
  return [...new Set(paths)]
}

export function sitemapIds() {
  const count = Math.max(1, Math.ceil(indexablePaths().length / SITEMAP_PAGE_SIZE))
  return Array.from({ length: count }, (_, id) => id)
}

export const sitemapPathsFor = (id: number) =>
  indexablePaths().slice(id * SITEMAP_PAGE_SIZE, (id + 1) * SITEMAP_PAGE_SIZE)

export const xmlEscape = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')
