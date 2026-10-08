import Link from 'next/link'
import { type Game, metaLabel } from '@/lib/games'
import { imageUrl } from '@/lib/seo'

export function GameCard({ game, priority = false }: { game: Game; priority?: boolean }) {
  return (
    <Link href={`/games/${game.slug}`} className="group block rounded-lg">
      <div className="aspect-video overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-200 group-hover:border-primary">
        <img
          src={imageUrl(game.image, 640)}
          srcSet={`${imageUrl(game.image, 400)} 400w, ${imageUrl(game.image, 640)} 640w`}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          alt={`${game.title} artwork`}
          width={640}
          height={360}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="mt-2.5 truncate text-[15px] font-semibold text-text md:text-base">{game.title}</h3>
      <p className="text-[13px] font-medium text-muted">{metaLabel(game)}</p>
    </Link>
  )
}

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {games.map((g) => (
        <li key={g.slug}>
          <GameCard game={g} />
        </li>
      ))}
    </ul>
  )
}

export function GameSection({ title, href, games }: { title: string; href?: string; games: Game[] }) {
  const id = `s-${title.toLowerCase().replace(/\W+/g, '-')}`
  return (
    <section className="section container-page" aria-labelledby={id}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 id={id} className="h2">{title}</h2>
        {href && <Link href={href} className="text-sm font-medium text-muted hover:text-text">See all →</Link>}
      </div>
      <GameGrid games={games.slice(0, 4)} />
    </section>
  )
}
