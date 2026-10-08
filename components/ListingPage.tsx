import type { Game } from '@/lib/games'
import type { BreadcrumbItem } from '@/lib/seo'
import { Breadcrumbs } from './Breadcrumbs'
import { itemListJsonLd, JsonLd } from '@/lib/seo'
import { GameGrid } from './GameCard'

/** Shared layout for every catalogue-style page (all games, genre, platform, mobile/PC/console). */
export function ListingPage({ eyebrow, title, description, path, games, breadcrumbs }: { eyebrow: string; title: string; description: string; path: string; games: Game[]; breadcrumbs?: BreadcrumbItem[] }) {
  return (
    <div className="container-page section">
      <JsonLd data={itemListJsonLd(games)} />
      <Breadcrumbs items={breadcrumbs ?? [{ name: 'Home', path: '/' }, { name: title, path }]} />
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan">{eyebrow}</p>
      <h1 className="mt-2 text-[32px] font-bold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{description}</p>
      <p className="mb-8 mt-2 text-sm text-muted">{games.length} {games.length === 1 ? 'game' : 'games'}</p>
      <GameGrid games={games} />
    </div>
  )
}
