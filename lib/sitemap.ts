import { developers, publishedGames, genres, platforms, publishers } from '@/lib/games'

export const SITEMAP_PAGE_SIZE = 10_000

export function indexablePaths() {
  const paths = ['/', '/about', '/contact', '/privacy', '/terms']
  if (publishedGames.length) {
    paths.push('/games')
    if (publishedGames.filter((game) => game.platforms.some((platform) => platforms[platform].group === 'mobile')).length >= 2) paths.push('/mobile-games')
    if (publishedGames.filter((game) => game.platforms.some((platform) => platforms[platform].group === 'pc')).length >= 2) paths.push('/pc-games')
    if (publishedGames.filter((game) => game.platforms.some((platform) => platforms[platform].group === 'console')).length >= 2) paths.push('/console-games')
    paths.push(...publishedGames.map((game) => `/games/${game.slug}`))
    paths.push(...Object.keys(genres).filter((slug) => publishedGames.filter((game) => game.genres.includes(slug as keyof typeof genres)).length >= 2).map((slug) => `/genres/${slug}`))
    paths.push(...Object.keys(platforms).filter((slug) => publishedGames.filter((game) => game.platforms.includes(slug as keyof typeof platforms)).length >= 2).map((slug) => `/platforms/${slug}`))
    paths.push(...developers.filter(({ games: entityGames }) => entityGames.filter((game) => game.catalogStatus === 'verified').length >= 2).map(({ slug }) => `/developers/${slug}`))
    paths.push(...publishers.filter(({ games: entityGames }) => entityGames.filter((game) => game.catalogStatus === 'verified').length >= 2).map(({ slug }) => `/publishers/${slug}`))
  }
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
