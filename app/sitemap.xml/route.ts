import { SITE_URL } from '@/lib/seo'
import { sitemapIds, xmlEscape } from '@/lib/sitemap'

export const dynamic = 'force-static'

export function GET() {
  const sitemaps = sitemapIds()
    .map((id) => `<sitemap><loc>${xmlEscape(`${SITE_URL}/sitemaps/${id}`)}</loc></sitemap>`)
    .join('')
  const body = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}</sitemapindex>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  })
}
