import Link from 'next/link'
import { navLinks } from './Header'
import { Logo } from './Logo'

const legal = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">Discover games. Find your next adventure.</p>
        </div>
        <FooterList title="Explore" links={navLinks} />
        <FooterList title="Pingoo" links={legal} />
      </div>
      <div className="container-page border-t border-line py-5 text-xs text-muted">
        © {new Date().getFullYear()} PINGOO. Game names and artwork belong to their respective owners.
      </div>
    </footer>
  )
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold text-text">{title}</h2>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 text-sm text-muted md:grid-cols-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-text">{l.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
