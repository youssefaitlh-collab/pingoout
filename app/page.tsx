import Link from 'next/link'
import { GameSection } from '@/components/GameCard'
import { byGroup, featuredGame as f, genres, platforms, recentlyAdded, recommended, trending } from '@/lib/games'
import { buildMetadata, imageUrl } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'PINGOO — Discover your next game',
  description: 'Discover trending, mobile, PC and console games on PINGOO, and find official sources to play them.',
  path: '/',
  image: f.image,
})

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line" aria-labelledby="hero-title">
        <img
          src={imageUrl(f.image, 1920)}
          srcSet={`${imageUrl(f.image, 828)} 828w, ${imageUrl(f.image, 1280)} 1280w, ${imageUrl(f.image, 1920)} 1920w`}
          sizes="100vw"
          alt={`${f.title} artwork`}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/70 to-bg/10 md:bg-gradient-to-r md:from-bg md:via-bg/70 md:to-transparent" />
        <div className="container-page flex min-h-[420px] flex-col justify-end py-10 md:min-h-[560px] md:justify-center md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Discover your next game</p>
          <h1 id="hero-title" className="mt-3 max-w-2xl text-[36px] font-bold leading-tight tracking-tight md:text-[60px]">{f.title}</h1>
          <p className="mt-3 text-sm font-medium text-muted md:text-[15px]">
            {f.genres.map((g) => genres[g].name).join(' • ')} • {platforms[f.platforms[0]].name}
          </p>
          <p className="mt-4 max-w-xl text-[15px] text-text/90 md:text-[17px]">{f.tagline}</p>
          <div className="mt-7">
            <Link href={`/games/${f.slug}`} className="btn-primary">View Game</Link>
          </div>
        </div>
      </section>

      <GameSection title="Trending Now" href="/trending" games={trending()} />
      <GameSection title="Popular Mobile Games" href="/mobile-games" games={byGroup('mobile')} />
      <GameSection title="Popular PC Games" href="/pc-games" games={byGroup('pc')} />
      <GameSection title="Recently Added" href="/games" games={recentlyAdded()} />
      <GameSection title="Recommended For You" games={recommended()} />

      <section className="section container-page" aria-labelledby="genres-title">
        <h2 id="genres-title" className="h2 mb-6">Explore Genres</h2>
        <ul className="flex flex-wrap gap-3">
          {Object.entries(genres).map(([slug, g]) => (
            <li key={slug}>
              <Link href={`/category/${slug}`} className="inline-flex h-11 items-center rounded-lg border border-line bg-surface px-4 text-[15px] font-medium transition-colors duration-150 hover:border-cyan hover:text-cyan">
                {g.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
