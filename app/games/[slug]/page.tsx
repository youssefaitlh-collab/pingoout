import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GameCard } from '@/components/GameCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { allGames, entitySlug, games, genres, getGame, getGameEditorial, platforms } from '@/lib/games'
import { findSimilarGames } from '@/lib/game-intelligence'
import { buildMetadata, gameJsonLd, imageUrl, JsonLd } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => allGames.map((g) => ({ slug: g.slug }))

export async function generateMetadata({ params }: Props) {
  const game = getGame((await params).slug)
  return game ? buildMetadata({ title: `${game.title} — Game details | PINGOO`, description: `${game.tagline} ${game.description}`.slice(0, 158), path: `/games/${game.slug}`, image: game.image, noIndex: game.catalogStatus !== 'verified' }) : {}
}

export default async function GamePage({ params }: Props) {
  const game = getGame((await params).slug)
  if (!game) notFound()

  const genreNames = game.genres.map((g) => genres[g].name)
  const developerSlug = entitySlug(game.developer)
  const publisherSlug = entitySlug(game.publisher)
  const info: { label: string; value: React.ReactNode }[] = [
    { label: 'Developer', value: <Link href={`/developers/${developerSlug}`} className="rounded hover:text-primary">{game.developer}</Link> },
    { label: 'Publisher', value: <Link href={`/publishers/${publisherSlug}`} className="rounded hover:text-primary">{game.publisher}</Link> },
    { label: game.releaseDate ? 'Release date' : 'Release year', value: game.releaseDate ?? String(game.releaseYear) },
    { label: 'Platforms', value: game.platforms.map((slug, index) => <span key={slug}>{index > 0 && ' • '}<Link href={`/platforms/${slug}`} className="rounded hover:text-primary">{platforms[slug].name}</Link></span>) },
    { label: 'Genre', value: game.genres.map((slug, index) => <span key={slug}>{index > 0 && ' • '}<Link href={`/genres/${slug}`} className="rounded hover:text-primary">{genres[slug].name}</Link></span>) },
  ]
  const more = findSimilarGames(game)
  const editorial = getGameEditorial(game)
  const structuredGame = gameJsonLd(game)

  return (
    <article>
      {structuredGame && <JsonLd data={structuredGame} />}

      <header className="relative isolate overflow-hidden border-b border-line">
        {game.image && <img
          src={imageUrl(game.image, 1920)}
          srcSet={game.image.startsWith('https://') ? undefined : `${imageUrl(game.image, 828)} 828w, ${imageUrl(game.image, 1280)} 1280w, ${imageUrl(game.image, 1920)} 1920w`}
          sizes="100vw"
          alt={`${game.title} artwork`}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/75 to-bg/20" />
        <div className="container-page flex min-h-[360px] flex-col justify-end pb-10 pt-24 md:min-h-[480px]">
          <Breadcrumbs items={[
            { name: 'Home', path: '/' },
            { name: 'Games', path: '/games' },
            ...(game.genres[0] ? [{ name: genres[game.genres[0]].name, path: `/genres/${game.genres[0]}` }] : []),
            { name: game.title, path: `/games/${game.slug}` },
          ]} />
          <h1 className="text-[34px] font-bold leading-tight tracking-tight md:text-[56px]">{game.title}</h1>
          <p className="mt-2 text-sm font-medium text-muted md:text-[15px]">
            {game.genres.map((slug, index) => (
              <span key={slug}>
                {index > 0 && ' • '}
                <Link href={`/genres/${slug}`} className="rounded hover:text-text">{genres[slug].name}</Link>
              </span>
            ))}
          </p>
          <p className="mt-4 max-w-2xl text-[15px] text-text/90 md:text-[17px]">{game.tagline}</p>
        </div>
      </header>

      <div className="container-page grid gap-10 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <div className="space-y-12">
          {game.catalogStatus === 'demo' && <p role="note" className="rounded-lg border border-amber-400/30 bg-amber-950/40 p-4 text-sm text-amber-100">Demo entry: details, artwork and specifications on this page are illustrative and are not verified product information.</p>}
          <Block title={game.catalogStatus === 'verified' ? 'About this game' : 'About (sample content)'}>
            <p className="text-[16px] leading-relaxed text-text/90">{game.description}</p>
          </Block>
          {game.media && <Block title="Official trailer">
            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(game.media.videoId)}`}
                  title={`${game.title}: ${game.media.videoTitle}`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="flex flex-wrap justify-between gap-3 p-3 text-sm text-muted">
                <span>{game.media.videoTitle}</span>
                <a href={game.media.videoSourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-text">Watch on YouTube ↗</a>
              </div>
            </div>
          </Block>}
          <Block title="Features">
            <ul className="grid gap-2 sm:grid-cols-2">
              {game.features.map((f) => (
                <li key={f} className="flex gap-2 text-[15px] text-text/90"><span className="text-cyan" aria-hidden="true">▸</span>{f}</li>
              ))}
            </ul>
          </Block>
          {editorial && Object.values(editorial).some((items) => items?.length) && <Block title="Who is this game for?">
            <div className="grid gap-5 sm:grid-cols-2">
              {([
                ['Best suited for', editorial.bestSuitedFor],
                ['Less suitable for', editorial.lessSuitableFor],
                ['Strengths', editorial.strengths],
                ['Limitations', editorial.limitations],
              ] as const).filter(([, items]) => items?.length).map(([title, items]) => <section key={title} className="rounded-lg border border-line bg-surface p-5"><h3 className="font-semibold">{title}</h3><ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">{items?.map((item) => <li key={item}>{item}</li>)}</ul></section>)}
            </div>
          </Block>}
          {game.requirements && (
            <Block title="System Requirements">
              <p className="mb-4 text-sm"><Link href={`/pc-compatibility?game=${game.slug}`} className="text-primary hover:underline">Compare with your PC details →</Link></p>
              <div className="grid gap-6 rounded-lg border border-line bg-surface p-5 sm:grid-cols-2">
                {(['minimum', 'recommended'] as const).filter((k) => game.requirements![k].length > 0).map((k) => (
                  <div key={k}>
                    <h3 className="mb-2 text-sm font-semibold capitalize">{k}</h3>
                    <ul className="space-y-1 text-sm text-muted">{game.requirements![k].map((r) => <li key={r}>{r}</li>)}</ul>
                  </div>
                ))}
              </div>
              {game.provenance?.requirements?.map((url) => <p key={url} className="mt-3 text-xs text-muted">Requirement source: <a className="underline decoration-muted underline-offset-2 hover:text-text" href={url} target="_blank" rel="noopener noreferrer nofollow">official source or store listing ↗</a></p>)}
            </Block>
          )}
          <Block title="Available Platforms">
            <ul className="flex flex-wrap gap-2">
              {game.platforms.map((p) => (
                <li key={p}>
                  <Link href={`/platforms/${p}`} className="inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium hover:border-primary">{platforms[p].name}</Link>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <section aria-labelledby="info-title">
            <h2 id="info-title" className="mb-3 text-xl font-bold">Game Information</h2>
            <dl className="divide-y divide-line rounded-lg border border-line bg-surface px-5">
              {info.map(({ label, value }) => (
                <div key={label} className="py-3">
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted">{label}</dt>
                  <dd className="mt-0.5 text-[15px] font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
          {game.catalogStatus === 'verified' && game.sources.length > 0 && <section aria-labelledby="sources-title">
            <h2 id="sources-title" className="mb-3 text-xl font-bold">Where to find it</h2>
            <ul className="space-y-2">
              {game.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel={source.commercial ? 'noopener noreferrer nofollow sponsored' : 'noopener noreferrer nofollow'} className="flex min-h-12 items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 font-medium transition-colors hover:border-primary">
                    {source.name}<span className="text-muted" aria-hidden="true">↗</span>
                  </a>
                  <p className="mt-1 text-xs text-muted">Checked {source.verifiedAt}</p>
                  {source.commercial?.relationship === 'affiliate' && <p className="mt-1 text-xs text-muted">{source.commercial.disclosure}</p>}
                </li>
              ))}
            </ul>
          </section>}
          {game.catalogStatus === 'verified' && <p className="text-xs text-muted">Factual details last checked {game.lastVerifiedAt}. Unknown fields are omitted when they have not been verified.</p>}
        </aside>
      </div>

      <div className="container-page -mt-5 pb-10"><Link href={`/compare?game=${game.slug}`} className="btn-secondary">Compare {game.title} with another game</Link></div>

      {more.length > 0 && (
        <section className="container-page section border-t border-line" aria-labelledby="related-title">
          <h2 id="related-title" className="h2 mb-2">Games Like This</h2>
          <p className="mb-6 text-sm text-muted">Ranked using shared catalog attributes: genre, platform, exact feature, developer, publisher, and release within two years. Reasons are shown for each match.</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">{more.map(({ game: candidate, reasons }) => <li key={candidate.slug}><GameCard game={candidate} /><ul className="mt-2 space-y-1 text-xs text-muted">{reasons.slice(0, 3).map((reason) => <li key={reason}>• {reason}</li>)}</ul></li>)}</ul>
        </section>
      )}
    </article>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  )
}
