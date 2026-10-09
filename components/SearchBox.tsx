'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId, useMemo, useState } from 'react'

export type Suggestion = { slug: string; title: string; meta: string; thumb?: string; keywords: string }

export function SearchBox({ items, defaultValue = '', className = '' }: { items: Suggestion[]; defaultValue?: string; className?: string }) {
  const router = useRouter()
  const listId = useId()
  const [q, setQ] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    return term ? items.filter((i) => i.keywords.includes(term)).slice(0, 5) : []
  }, [q, items])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' && results.length > 0) {
      e.preventDefault()
      setOpen(true)
      setActive((a) => Math.min(a + 1, results.length - 1))
    }
    else if (e.key === 'ArrowUp' && results.length > 0) {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, -1))
    }
    else if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'Enter' && active >= 0 && results[active]) {
      e.preventDefault()
      setOpen(false)
      router.push(`/games/${results[active].slug}`)
    }
  }

  const showList = open && results.length > 0

  return (
    <form action="/search" role="search" className={`relative ${className}`} onSubmit={() => setOpen(false)}>
      <label htmlFor={`${listId}-input`} className="sr-only">Search games</label>
      <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        id={`${listId}-input`}
        name="q"
        type="search"
        autoComplete="off"
        value={q}
        placeholder="Search games, genres, platforms..."
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={showList}
        aria-controls={showList ? listId : undefined}
        aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
        className="h-11 w-full rounded-lg border border-line bg-surface pl-10 pr-3 text-[15px] text-text placeholder:text-muted transition-colors duration-150 focus:border-primary focus:outline-none"
      />
      {showList && (
        <ul id={listId} role="listbox" className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-line bg-elevated py-1 shadow-lg shadow-black/30">
          {results.map((r, i) => (
            <li key={r.slug}>
              <Link
                href={`/games/${r.slug}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className={`flex items-center gap-3 px-3 py-2 transition-colors ${i === active ? 'bg-surface' : 'hover:bg-surface'}`}
              >
                {r.thumb ? <img src={r.thumb} alt="" width={64} height={36} className="h-9 w-16 rounded object-cover" loading="lazy" /> : <span aria-hidden="true" className="h-9 w-16 shrink-0 rounded bg-surface" />}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{r.title}</span>
                  <span className="block text-xs font-medium text-muted">{r.meta}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
