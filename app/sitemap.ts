import type { MetadataRoute } from 'next'
import { games, genres, platforms } from '@/lib/games'
import { SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/', '/games', '/trending', '/mobile-games', '/pc-games', '/console-games', '/about', '/contact', '/privacy', '/terms',
    ...games.map((g) => `/games/${g.slug}`),
    ...Object.keys(genres).map((s) => `/category/${s}`),
    ...Object.keys(platforms).map((s) => `/platform/${s}`),
  ]
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }))
}
