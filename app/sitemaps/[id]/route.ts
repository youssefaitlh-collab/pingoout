import { SITE_URL } from '@/lib/seo'
import { sitemapIds, sitemapPathsFor, xmlEscape } from '@/lib/sitemap'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return sitemapIds().map((id) => ({ id: String(id) }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params
  const id = Number.parseInt(rawId, 10)
  if (!Number.isInteger(id) || id < 0 || !sitemapIds().includes(id)) {
    return new Response('Not found', { status: 404 })
  }

  const urls = sitemapPathsFor(id)
    .map((path) => `<url><loc>${xmlEscape(new URL(path, SITE_URL).toString())}</loc></url>`)
    .join('')
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  })
}
