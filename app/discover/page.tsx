import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GameGrid } from '@/components/GameCard'
import { filterGames, releasePeriods } from '@/lib/game-intelligence'
import { games, genres, platforms } from '@/lib/games'
import { buildMetadata, itemListJsonLd, JsonLd } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'Find a game', description: 'Filter the PINGOO game catalog by platform, genre, release period, features and listed PC requirements.', path: '/discover', noIndex: true })

type Props = { searchParams: Promise<{ platform?: string; genre?: string; period?: string; feature?: string; pc?: string }> }

export default async function DiscoverPage({ searchParams }: Props) {
  const params = await searchParams
  const features = [...new Set(games.flatMap((game) => game.features))].sort((a, b) => a.localeCompare(b))
  const validPlatform = params.platform && params.platform in platforms ? params.platform : ''
  const validGenre = params.genre && params.genre in genres ? params.genre : ''
  const validFeature = params.feature && features.includes(params.feature) ? params.feature : ''
  const periods = releasePeriods()
  const validPeriod = periods.some((period) => period.value === params.period) ? params.period : ''
  const active = { platform: validPlatform, genre: validGenre, period: validPeriod, feature: validFeature, pcRequirements: params.pc === 'yes' }
  const results = filterGames(active)
  const filtered = Boolean(validPlatform || validGenre || validPeriod || validFeature || active.pcRequirements)
  const invalidFilter = Boolean((params.platform && !validPlatform) || (params.genre && !validGenre) || (params.period && !validPeriod) || (params.feature && !validFeature) || (params.pc && params.pc !== 'yes'))

  return <div className="container-page section">
    {results.length > 0 && <JsonLd data={itemListJsonLd(results)} />}
    <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Find a game', path: '/discover' }]} />
    <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Game discovery</p>
    <h1 className="mt-2 text-[32px] font-bold tracking-tight md:text-5xl">Find a game</h1>
    <p className="mt-3 max-w-2xl text-muted">Combine catalog filters to explore games by platform, genre, release period, listed features and PC requirements.</p>
    <form action="/discover" method="get" className="mt-7 grid gap-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-3">
      <label className="text-sm font-medium">Platform<select name="platform" defaultValue={validPlatform} className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3"><option value="">Any platform</option>{Object.entries(platforms).map(([slug, platform]) => <option key={slug} value={slug}>{platform.name}</option>)}</select></label>
      <label className="text-sm font-medium">Genre<select name="genre" defaultValue={validGenre} className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3"><option value="">Any genre</option>{Object.entries(genres).map(([slug, genre]) => <option key={slug} value={slug}>{genre.name}</option>)}</select></label>
      <label className="text-sm font-medium">Release period<select name="period" defaultValue={validPeriod} className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3"><option value="">Any period</option>{periods.map((period) => <option key={period.value} value={period.value}>{period.label}</option>)}</select></label>
      <label className="text-sm font-medium sm:col-span-2 lg:col-span-1">Feature<select name="feature" defaultValue={validFeature} className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3"><option value="">Any feature</option>{features.map((feature) => <option key={feature} value={feature}>{feature}</option>)}</select></label>
      <label className="flex min-h-12 items-center gap-3 text-sm font-medium"><input type="checkbox" name="pc" value="yes" defaultChecked={active.pcRequirements} className="size-4 accent-primary" />PC system requirements listed</label>
      <div className="flex flex-wrap gap-3 sm:col-span-2 lg:col-span-3"><button type="submit" className="btn-primary">Find games</button><Link href="/discover" className="btn-secondary">Clear filters</Link></div>
    </form>
    {invalidFilter && <p role="status" className="mt-4 text-sm text-amber-300">An unrecognized filter was ignored. Select from the available options.</p>}
    <div className="mt-10 flex flex-wrap items-end justify-between gap-3"><div><h2 className="h2">{filtered ? 'Matching games' : 'All catalog games'}</h2><p className="mt-1 text-sm text-muted">{results.length} {results.length === 1 ? 'game' : 'games'}{filtered ? ' match these filters.' : ' available to explore.'}</p></div><Link href="/pc-compatibility" className="text-sm font-medium text-primary hover:underline">Compare PC requirements →</Link></div>
    {results.length ? <div className="mt-6"><GameGrid games={results} /></div> : <div className="mt-6 rounded-lg border border-line bg-surface p-8 text-center"><h3 className="text-lg font-semibold">No games match these filters</h3><p className="mt-2 text-muted">Try removing a filter or browse the full catalog.</p><Link href="/discover" className="btn-secondary mt-5">Clear filters</Link></div>}
    {!filtered && <nav aria-label="Browse catalog categories" className="mt-12 border-t border-line pt-8"><h2 className="text-xl font-bold">Browse by category</h2><ul className="mt-4 flex flex-wrap gap-2">{Object.entries(genres).map(([slug, genre]) => <li key={slug}><Link className="inline-flex rounded-lg border border-line bg-surface px-3 py-2 text-sm hover:border-primary" href={`/genres/${slug}`}>{genre.name}</Link></li>)}{Object.entries(platforms).map(([slug, platform]) => <li key={slug}><Link className="inline-flex rounded-lg border border-line bg-surface px-3 py-2 text-sm hover:border-primary" href={`/platforms/${slug}`}>{platform.name}</Link></li>)}</ul></nav>}
  </div>
}
