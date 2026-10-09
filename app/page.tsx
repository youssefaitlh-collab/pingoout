import Link from 'next/link'
import { GameGrid } from '@/components/GameCard'
import { SearchBox } from '@/components/SearchBox'
import { suggestions } from '@/components/Header'
import { availableGenres, featuredGame as f, games, genres, platforms } from '@/lib/games'
import { buildMetadata, imageUrl } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Discover games with verified facts',
  description: 'Explore game profiles with sourced platform information, PC requirements and clear verification dates.',
  path: '/',
  image: f.image,
})

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line" aria-labelledby="hero-title">
        {f.image && <img
          src={imageUrl(f.image, 1920)}
          srcSet={f.image.startsWith('https://') ? undefined : `${imageUrl(f.image, 828)} 828w, ${imageUrl(f.image, 1280)} 1280w, ${imageUrl(f.image, 1920)} 1920w`}
          sizes="100vw"
          alt={`${f.title} artwork`}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/70 to-bg/10 md:bg-gradient-to-r md:from-bg md:via-bg/70 md:to-transparent" />
        <div className="container-page flex min-h-[420px] flex-col justify-end py-10 md:min-h-[560px] md:justify-center md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Discover · Compare · Play</p>
          <h1 id="hero-title" className="mt-3 max-w-2xl text-[36px] font-bold leading-tight tracking-tight md:text-[60px]">Find your next game</h1>
          <p className="mt-4 max-w-xl text-[15px] text-text/90 md:text-[17px]">Explore source-checked game profiles, compare platforms and PC requirements, and find games that fit what you want to play.</p>
          <SearchBox items={suggestions} className="mt-6 max-w-xl" />
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/game-finder" className="btn-primary">Find games for me</Link>
            <Link href={`/games/${f.slug}`} className="btn-secondary">Featured: {f.title}</Link>
          </div>
        </div>
      </section>

      <section className="section container-page" aria-labelledby="catalog-title">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><h2 id="catalog-title" className="h2">Explore verified games</h2><p className="mt-2 text-sm text-muted">Profiles show their factual sources and last-checked dates.</p></div>
          <Link href="/games" className="text-sm font-medium text-primary hover:underline">Browse the full catalog →</Link>
        </div>
        <GameGrid games={games} />
      </section>

      <section className="section container-page" aria-labelledby="genres-title">
        <h2 id="genres-title" className="h2 mb-6">Explore Genres</h2>
        <ul className="flex flex-wrap gap-3">
          {availableGenres().map(([slug, g]) => (
            <li key={slug}>
              <Link href={`/genres/${slug}`} className="inline-flex h-11 items-center rounded-lg border border-line bg-surface px-4 text-[15px] font-medium transition-colors duration-150 hover:border-cyan hover:text-cyan">
                {g.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page grid gap-4 pb-12 sm:grid-cols-2 lg:grid-cols-3" aria-label="Game tools">
        <ToolCard href="/discover" title="Browse with filters" description="Narrow the catalog by genre, platform, release period, and listed PC requirements." />
        <ToolCard href="/compare" title="Compare games" description="Review verified game facts side by side, with missing information clearly marked." />
        <ToolCard href="/pc-compatibility" title="Check PC requirements" description="Compare entered memory and operating system details with published minimum requirements." />
      </section>
    </>
  )
}

function ToolCard({ href, title, description }: { href: string; title: string; description: string }) {
  return <Link href={href} className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-primary focus-visible:outline">
    <h2 className="font-semibold">{title} <span aria-hidden="true">→</span></h2>
    <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
  </Link>
}
