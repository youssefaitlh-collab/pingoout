import Link from 'next/link'
import { GameGrid } from '@/components/GameCard'
import { suggestions } from '@/components/Header'
import { SearchBox } from '@/components/SearchBox'
import { genres, searchGames } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

type Props = { searchParams: Promise<{ q?: string | string[] }> }

export const metadata = buildMetadata({ title: 'Search games', description: 'Search PINGOO for games, genres and platforms.', path: '/search', noIndex: true })

export default async function SearchPage({ searchParams }: Props) {
  const raw = (await searchParams).q
  const q = (Array.isArray(raw) ? raw[0] : raw ?? '').slice(0, 100)
  const results = searchGames(q)

  return (
    <div className="container-page section">
      <h1 className="text-[32px] font-bold tracking-tight md:text-5xl">{q ? `Results for “${q}”` : 'Search games'}</h1>
      <SearchBox key={q} items={suggestions} defaultValue={q} className="mt-6 max-w-xl" />
      {q && <p className="mt-6 text-sm text-muted">{results.length} {results.length === 1 ? 'game' : 'games'} found</p>}
      <div className="mt-6">
        {results.length > 0 ? (
          <GameGrid games={results} />
        ) : (
          <div>
            {q && <p className="mb-4 text-muted">No games match that search. Try a genre instead:</p>}
            <ul className="flex flex-wrap gap-3">
              {Object.entries(genres).map(([slug, g]) => (
                <li key={slug}>
                  <Link href={`/category/${slug}`} className="inline-flex h-11 items-center rounded-lg border border-line bg-surface px-4 font-medium hover:border-cyan hover:text-cyan">{g.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
