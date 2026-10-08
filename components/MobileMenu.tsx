'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null)
  const pathname = usePathname()
  // Close the menu after client-side navigation.
  useEffect(() => { if (ref.current) ref.current.open = false }, [pathname])

  return (
    <details ref={ref} className="relative ml-auto lg:hidden">
      <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-line text-text [&::-webkit-details-marker]:hidden" aria-label="Menu">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </summary>
      <nav aria-label="Mobile" className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-line bg-elevated p-2">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="flex h-11 items-center rounded-md px-3 font-medium hover:bg-surface">{l.label}</Link>
        ))}
      </nav>
    </details>
  )
}
