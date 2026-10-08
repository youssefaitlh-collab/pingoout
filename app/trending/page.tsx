import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { genres, platforms, trending } from '@/lib/games'
import { buildMetadata, imageUrl, itemListJsonLd, JsonLd } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'Featured games', description: 'Explore games featured in the PINGOO catalog, with links to their genres, platforms, and official sources.', path: '/trending' })

export default function TrendingPage() {
  const list = trending()
  return (
    <div className="container-page section">
      <JsonLd data={itemListJsonLd(list)} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Featured games', path: '/trending' }]} />
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan">PINGOO catalog</p>
      <h1 className="mt-2 text-[32px] font-bold tracking-tight md:text-5xl">Featured games</h1>
      <p className="mt-3 max-w-2xl text-muted">Games currently featured in the PINGOO catalog.</p>
      <ol className="mt-10 divide-y divide-line border-y border-line">
        {list.map((g, i) => (
          <li key={g.slug}>
            <Link href={`/games/${g.slug}`} className="group flex items-center gap-4 py-4 md:gap-6">
              <span className={`w-10 shrink-0 text-2xl font-bold tabular-nums md:w-14 md:text-4xl ${i < 3 ? 'text-cyan' : 'text-muted'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className="aspect-video w-28 shrink-0 overflow-hidden rounded-lg border border-line md:w-48">
                <img src={imageUrl(g.image, 400)} alt={`${g.title} artwork`} width={400} height={225} loading={i < 4 ? 'eager' : 'lazy'} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04]" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-semibold group-hover:text-primary md:text-xl">{g.title}</span>
                <span className="mt-1 block text-[13px] font-medium text-muted md:text-sm">
                  {g.genres.slice(0, 2).map((s) => genres[s].name).join(' • ')} • {g.platforms.map((p) => platforms[p].name).join(', ')}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
