import type { Metadata } from 'next'
import { type Game, genres, platforms } from './games'

export const SITE_NAME = 'PINGOO'
// Netlify sets URL at build time for production; DEPLOY_PRIME_URL covers previews.
export const SITE_URL = (process.env.URL || process.env.DEPLOY_PRIME_URL || 'http://localhost:8889').replace(/\/$/, '')

/** Optimized image through the Netlify Image CDN. */
export const imageUrl = (file: string, w: number) => `/.netlify/images?url=/img/${file}&w=${w}&fm=webp`

type MetaInput = { title: string; description: string; path: string; image?: string; noIndex?: boolean }

export function buildMetadata({ title, description, path, image, noIndex }: MetaInput): Metadata {
  const ogImage = image ? `${SITE_URL}${imageUrl(image, 1200)}` : undefined
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: path, siteName: SITE_NAME, type: 'website', images: ogImage ? [{ url: ogImage, width: 1200 }] : undefined },
    twitter: { card: ogImage ? 'summary_large_image' : 'summary', title, description, images: ogImage ? [ogImage] : undefined },
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

export const itemListJsonLd = (list: Game[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: list.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/games/${g.slug}`, name: g.title })),
})

export const gameJsonLd = (g: Game) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: g.title,
  description: g.description,
  url: `${SITE_URL}/games/${g.slug}`,
  image: `${SITE_URL}${imageUrl(g.image, 1200)}`,
  genre: g.genres.map((s) => genres[s].name),
  gamePlatform: g.platforms.map((p) => platforms[p].name),
  author: { '@type': 'Organization', name: g.developer },
  publisher: { '@type': 'Organization', name: g.publisher },
  datePublished: String(g.releaseYear),
})

export const faqJsonLd = (faq: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})
