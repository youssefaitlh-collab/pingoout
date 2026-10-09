import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { games, genres, platforms } from '@/lib/games'
import { buildMetadata, imageUrl, itemListJsonLd, JsonLd } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'Game catalogue', description: 'Browse PINGOO game profiles with verified details, official sources and system requirements where available.', path: '/trending', noIndex: true })

export default function TrendingPage() {
  const list = games
  const structuredList = itemListJsonLd(list)
  return (
    <div className="container-page section">
      {structuredList && <JsonLd data={structuredList} />}
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Game catalogue', path: '/trending' }]} />
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Game discovery</p>
      <h1 className="mt-2 text-[32px] font-bold tracking-tight md:text-5xl">Game catalogue</h1>
      <p className="mt-3 max-w-2xl text-muted">Explore game profiles. Each profile links to sources for its factual details and notes when those details were last checked.</p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {list.map((g, i) => (
          <li key={g.slug}>
            <Link href={`/games/${g.slug}`} className="group flex items-center gap-4 py-4 md:gap-6">
              <span className="w-10 shrink-0 text-xs font-semibold uppercase text-cyan md:w-14">Game</span>
              <span className="aspect-video w-28 shrink-0 overflow-hidden rounded-lg border border-line md:w-48">
                {g.image ? <img src={imageUrl(g.image, 400)} alt={`${g.title} artwork`} width={400} height={225} loading={i < 4 ? 'eager' : 'lazy'} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04]" /> : <span aria-hidden="true" className="flex h-full items-center justify-center bg-surface px-2 text-center text-xs text-muted">{g.title}</span>}
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
      </ul>
    </div>
  )
}
