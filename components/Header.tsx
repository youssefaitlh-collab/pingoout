import Link from 'next/link'
import { games, genres, metaLabel, platforms } from '@/lib/games'
import { imageUrl } from '@/lib/seo'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { SearchBox, type Suggestion } from './SearchBox'

export const navLinks = [
  { href: '/games', label: 'Games' },
  { href: '/trending', label: 'Trending' },
  { href: '/mobile-games', label: 'Mobile' },
  { href: '/pc-games', label: 'PC' },
  { href: '/console-games', label: 'Console' },
]

// Only the fields the suggestion dropdown needs are sent to the client.
export const suggestions: Suggestion[] = games.map((g) => ({
  slug: g.slug,
  title: g.title,
  meta: metaLabel(g),
  thumb: imageUrl(g.image, 128),
  keywords: [g.title, ...g.genres.map((s) => genres[s].name), ...g.platforms.map((p) => platforms[p].name)].join(' ').toLowerCase(),
}))

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-primary-strong focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="container-page flex flex-wrap items-center gap-x-8 gap-y-3 py-3 lg:h-[68px] lg:flex-nowrap lg:py-0">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[15px] font-medium text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded transition-colors duration-150 hover:text-text">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu links={navLinks} />
        <SearchBox items={suggestions} className="order-last w-full lg:order-none lg:ml-auto lg:w-[380px]" />
      </div>
    </header>
  )
}
