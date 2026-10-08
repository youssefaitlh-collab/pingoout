import type { Game } from '@/lib/games'
import { breadcrumbJsonLd, itemListJsonLd, JsonLd } from '@/lib/seo'
import { GameGrid } from './GameCard'

/** Shared layout for every catalogue-style page (all games, genre, platform, mobile/PC/console). */
export function ListingPage({ eyebrow, title, description, path, games }: { eyebrow: string; title: string; description: string; path: string; games: Game[] }) {
  return (
    <div className="container-page section">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: title, path }])} />
      <JsonLd data={itemListJsonLd(games)} />
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan">{eyebrow}</p>
      <h1 className="mt-2 text-[32px] font-bold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{description}</p>
      <p className="mb-8 mt-2 text-sm text-muted">{games.length} {games.length === 1 ? 'game' : 'games'}</p>
      <GameGrid games={games} />
    </div>
  )
}
