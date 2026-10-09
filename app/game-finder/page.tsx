import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GameCard } from '@/components/GameCard'
import { availableGenres, availablePlatforms, genres, platforms, type GenreSlug, type PlatformSlug } from '@/lib/games'
import { recommendGames } from '@/lib/game-intelligence'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Game finder',
  description: 'Get a short list of PINGOO catalog games that match your selected platform, genre, and listed PC requirements.',
  path: '/game-finder',
  noIndex: true,
})

type Props = { searchParams: Promise<{ platform?: string; genre?: string; pc?: string; submitted?: string }> }

export default async function GameFinderPage({ searchParams }: Props) {
  const params = await searchParams
  const platform = params.platform && params.platform in platforms ? params.platform as PlatformSlug : undefined
  const genre = params.genre && params.genre in genres ? params.genre as GenreSlug : undefined
  const pcRequirements = params.pc === 'yes'
  const submitted = params.submitted === 'yes' || Boolean(params.platform || params.genre || params.pc)
  const hasPreference = Boolean(platform || genre || pcRequirements)
  const invalid = Boolean(
    (params.platform && !platform) ||
    (params.genre && !genre) ||
    (params.pc && params.pc !== 'yes'),
  )
  const recommendations = recommendGames({ platform, genre, pcRequirements })

  return <div className="container-page section">
    <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Discover', path: '/discover' }, { name: 'Game finder', path: '/game-finder' }]} />
    <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Personalized discovery</p>
    <h1 className="mt-2 text-[32px] font-bold tracking-tight md:text-5xl">Find games for your preferences</h1>
    <p className="mt-3 max-w-2xl text-muted">Choose what matters to you and get matches from PINGOO’s source-checked catalog. Each result explains which selected preferences it matches.</p>

    <form action="/game-finder" method="get" className="mt-7 grid gap-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-3">
      <input type="hidden" name="submitted" value="yes" />
      <label className="text-sm font-medium">Platform<select name="platform" defaultValue={platform ?? ''} className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3"><option value="">Any platform</option>{availablePlatforms().map(([slug, value]) => <option key={slug} value={slug}>{value.name}</option>)}</select></label>
      <label className="text-sm font-medium">Genre<select name="genre" defaultValue={genre ?? ''} className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3"><option value="">Any genre</option>{availableGenres().map(([slug, value]) => <option key={slug} value={slug}>{value.name}</option>)}</select></label>
      <label className="flex min-h-12 items-center gap-3 text-sm font-medium"><input type="checkbox" name="pc" value="yes" defaultChecked={pcRequirements} className="size-4 accent-primary" />Has listed PC requirements</label>
      <div className="flex flex-wrap gap-3 sm:col-span-2 lg:col-span-3"><button type="submit" className="btn-primary">Show matching games</button><Link href="/game-finder" className="btn-secondary">Reset</Link><Link href="/discover" className="inline-flex h-12 items-center px-2 text-sm font-medium text-primary hover:underline">Use all catalog filters →</Link></div>
    </form>
    {invalid && <p role="status" className="mt-4 text-sm text-amber-300">An unrecognized preference was ignored. Choose from the available options.</p>}

    {submitted && !hasPreference && <p role="status" className="mt-6 rounded-lg border border-line bg-surface p-4 text-sm text-muted">Choose at least one preference to get factual catalog matches.</p>}

    {submitted && hasPreference && <section className="mt-10" aria-labelledby="recommendations-title">
      <h2 id="recommendations-title" className="h2">{recommendations.length ? 'Your matches' : 'No games match those preferences'}</h2>
      <p className="mt-2 text-sm text-muted">Showing {recommendations.length} {recommendations.length === 1 ? 'matching game' : 'matching games'} from the selected catalog attributes. These are factual matches, not ratings or a ranking of game quality.</p>
      {recommendations.length ? <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map(({ game, reasons }) => <li key={game.slug} className="rounded-lg border border-line bg-surface p-4">
          <GameCard game={game} />
          <h3 className="mt-4 text-sm font-semibold">Why it matches</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted">{reasons.map((reason) => <li key={reason}>• {reason}</li>)}</ul>
        </li>)}
      </ul> : <p className="mt-3 text-muted">Try removing one preference or use the <Link className="text-primary underline" href="/discover">full discovery filters</Link>.</p>}
    </section>}

    {!submitted && <section className="mt-10 rounded-lg border border-line bg-surface p-5">
      <h2 className="text-lg font-semibold">What this finder can check</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">Platform, genre, and whether PC requirements are published. Multiplayer, co-op, price, and player-count preferences are not offered here because those facts are not consistently recorded across the current verified catalog.</p>
      <p className="mt-3 text-sm text-muted">Available options include {availableGenres().length} genres and {availablePlatforms().length} platforms.</p>
    </section>}
  </div>
}
