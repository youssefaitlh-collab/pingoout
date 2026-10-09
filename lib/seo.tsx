import type { Metadata } from 'next'
import { type Game, entitySlug, genres, platforms, publishedGames } from './games'

export const SITE_NAME = 'PINGOO'
// Netlify's URL is the canonical production domain in every deploy context.
// Never silently emit localhost canonicals in a production build.
const configuredSiteUrl = process.env.URL || process.env.NEXT_PUBLIC_SITE_URL || process.env.DEPLOY_PRIME_URL
if (process.env.NODE_ENV === 'production' && !configuredSiteUrl) {
  throw new Error('Set URL or NEXT_PUBLIC_SITE_URL before building PINGOO for production.')
}
export const SITE_URL = (configuredSiteUrl || 'http://localhost:8889').replace(/\/$/, '')
export const isPreviewDeployment = Boolean(process.env.CONTEXT && process.env.CONTEXT !== 'production')

/** Use Netlify's optimizer when its runtime is present; local Next previews serve source artwork directly. */
const netlifyImageCdnAvailable = process.env.NETLIFY === 'true' ||
  ['production', 'deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT || '')

export const imageUrl = (file: string, w: number) => netlifyImageCdnAvailable
  ? `/.netlify/images?url=/img/${encodeURIComponent(file)}&w=${w}&fm=webp`
  : `/img/${encodeURIComponent(file)}`

type MetaInput = { title: string; description: string; path: string; image?: string; noIndex?: boolean }

export function buildMetadata({ title, description, path, image, noIndex }: MetaInput): Metadata {
  const ogImage = image ? `${SITE_URL}${imageUrl(image, 1200)}` : undefined
  const catalogPath = /^\/(games|genres|platforms|developers|publishers)(\/|$)/.test(path) || ['/trending', '/mobile-games', '/pc-games', '/console-games'].includes(path)
  const [section, slug] = path.split('/').filter(Boolean)
  const verifiedForPath = section === 'games'
    ? slug ? publishedGames.some((game) => game.slug === slug) : publishedGames.length > 0
    : section === 'genres'
      ? publishedGames.filter((game) => game.genres.includes(slug as Game['genres'][number])).length >= 2
      : section === 'platforms'
        ? publishedGames.filter((game) => game.platforms.includes(slug as Game['platforms'][number])).length >= 2
        : section === 'developers'
          ? publishedGames.filter((game) => entitySlug(game.developer) === slug).length >= 2
          : section === 'publishers'
            ? publishedGames.filter((game) => entitySlug(game.publisher) === slug).length >= 2
            : section === 'mobile-games'
              ? publishedGames.filter((game) => game.platforms.some((platform) => platforms[platform].group === 'mobile')).length >= 2
              : section === 'pc-games'
                ? publishedGames.filter((game) => game.platforms.includes('pc')).length >= 2
                : section === 'console-games'
                  ? publishedGames.filter((game) => game.platforms.some((platform) => platforms[platform].group === 'console')).length >= 2
            : publishedGames.length > 0
  const shouldNoIndex = Boolean(noIndex || isPreviewDeployment || (catalogPath && !verifiedForPath))
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: shouldNoIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, alt: `${title} — ${SITE_NAME}` }] : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export function JsonLd({ data }: { data: object }) {
  // Escape "<" so catalog text can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/search?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
})

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
})

export type BreadcrumbItem = { name: string; path: string }

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
})

export const itemListJsonLd = (list: Game[]) => {
  const verified = list.filter((game) => game.catalogStatus === 'verified')
  return verified.length ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: verified.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/games/${g.slug}`, name: g.title })),
  } : null
}

export const gameJsonLd = (g: Game) => g.catalogStatus !== 'verified' ? null : ({
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: g.title,
  description: g.description,
  url: `${SITE_URL}/games/${g.slug}`,
  ...(g.image ? { image: `${SITE_URL}${imageUrl(g.image, 1200)}` } : {}),
  genre: g.genres.map((s) => genres[s].name),
  gamePlatform: g.platforms.map((p) => platforms[p].name),
  author: { '@type': 'Organization', name: g.developer },
  publisher: { '@type': 'Organization', name: g.publisher },
  ...(g.releaseDate ? { datePublished: g.releaseDate } : {}),
})
