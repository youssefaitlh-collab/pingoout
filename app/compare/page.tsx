import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GameCard } from '@/components/GameCard'
import { games, genres, platforms, type Game } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'Compare games', description: 'Compare game details from the PINGOO catalog, including genres, platforms, release years, publishers, features and listed PC requirements.', path: '/compare', noIndex: true })

type Props = { searchParams: Promise<{ game?: string | string[] }> }

export default async function ComparePage({ searchParams }: Props) {
  const params = await searchParams
  const raw = params.game === undefined ? [] : Array.isArray(params.game) ? params.game : [params.game]
  const selected = [...new Set(raw)].slice(0, 3)
  const selectedGames = selected.map((slug) => games.find((game) => game.slug === slug)).filter((game): game is Game => Boolean(game))
  const invalid = selected.length !== selectedGames.length
  const submitted = raw.length > 0

  return <div className="container-page section">
    <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Compare games', path: '/compare' }]} />
    <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Game intelligence</p>
    <h1 className="mt-2 text-[32px] font-bold tracking-tight md:text-5xl">Compare games</h1>
    <p className="mt-3 max-w-2xl text-muted">Compare catalog facts side by side. Missing details are shown as unavailable.</p>
    <form action="/compare" method="get" className="mt-7 grid gap-4 rounded-lg border border-line bg-surface p-5 md:grid-cols-3">
      {[0, 1, 2].map((index) => <label key={index} className="text-sm font-medium">Game {index + 1}{index < 2 ? ' (choose at least two)' : ' (optional)'}
        <select name="game" defaultValue={selected[index] ?? ''} className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3 text-text">
          <option value="">Choose a game</option>{games.map((game) => <option key={game.slug} value={game.slug}>{game.title}</option>)}
        </select>
      </label>)}
      <button className="btn-primary md:col-span-3 md:justify-self-start" type="submit">Compare selected games</button>
    </form>
    {submitted && invalid && <p role="status" className="mt-5 text-amber-300">One or more selected games could not be found. Choose games from the list and try again.</p>}
    {submitted && selectedGames.length < 2 && !invalid && <p role="status" className="mt-5 text-muted">Choose at least two different games to compare.</p>}
    {selectedGames.length >= 2 && <ComparisonTable selectedGames={selectedGames} />}
    {!submitted && <section className="mt-10" aria-labelledby="compare-popular"><h2 id="compare-popular" className="h2 mb-5">Choose from the catalog</h2><ul className="grid grid-cols-2 gap-5 md:grid-cols-4">{games.slice(0, 4).map((game) => <li key={game.slug}><GameCard game={game} /></li>)}</ul></section>}
  </div>
}

function ComparisonTable({ selectedGames }: { selectedGames: Game[] }) {
  const rows: { label: string; value: (game: Game) => React.ReactNode }[] = [
    { label: 'Genres', value: (game) => game.genres.length ? game.genres.map((slug) => <Link key={slug} className="text-primary hover:underline" href={`/genres/${slug}`}>{genres[slug].name}</Link>) : 'Not listed' },
    { label: 'Platforms', value: (game) => game.platforms.length ? game.platforms.map((slug) => <Link key={slug} className="text-primary hover:underline" href={`/platforms/${slug}`}>{platforms[slug].name}</Link>) : 'Not listed' },
    { label: 'Release date', value: (game) => game.releaseDate ?? (game.releaseYear ? String(game.releaseYear) : 'Not listed') },
    { label: 'Developer', value: (game) => game.developer || 'Not listed' },
    { label: 'Publisher', value: (game) => game.publisher || 'Not listed' },
    { label: 'Features', value: (game) => game.features.length ? <ul className="list-inside list-disc space-y-1">{game.features.map((feature) => <li key={feature}>{feature}</li>)}</ul> : 'Not listed' },
    { label: 'Minimum PC requirements', value: (game) => game.requirements?.minimum.length ? <ul className="space-y-1">{game.requirements.minimum.map((item) => <li key={item}>{item}</li>)}</ul> : 'Not listed' },
    { label: 'Recommended PC requirements', value: (game) => game.requirements?.recommended.length ? <ul className="space-y-1">{game.requirements.recommended.map((item) => <li key={item}>{item}</li>)}</ul> : 'Not listed' },
  ]
  return <div className="mt-10 overflow-x-auto rounded-lg border border-line" role="region" aria-label="Game comparison" tabIndex={0}>
    <table className="w-full min-w-[720px] border-collapse text-left text-sm"><thead><tr className="bg-surface"><th scope="col" className="w-48 p-4">Attribute</th>{selectedGames.map((game) => <th scope="col" key={game.slug} className="min-w-56 p-4 text-base"><Link href={`/games/${game.slug}`} className="hover:text-primary">{game.title}</Link></th>)}</tr></thead>
      <tbody>{rows.map((row) => <tr key={row.label} className="border-t border-line align-top"><th scope="row" className="p-4 font-semibold">{row.label}</th>{selectedGames.map((game) => <td key={game.slug} className="p-4 text-muted">{row.value(game)}</td>)}</tr>)}</tbody></table>
    <p className="border-t border-line bg-surface p-4 text-xs text-muted">Only attributes present in the PINGOO catalog are compared. Multiplayer support is not included as a separate field until the catalog records it consistently.</p>
  </div>
}
