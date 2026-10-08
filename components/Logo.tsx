import Link from 'next/link'

export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#162235" />
      <path d="M32 10c-10 0-17 8-17 19v13c0 7 6 12 17 12s17-5 17-12V29c0-11-7-19-17-19z" fill="#F8FAFC" />
      <path d="M32 22c-6 0-10 4-10 10v10c0 4 4 6 10 6s10-2 10-6V32c0-6-4-10-10-10z" fill="#080D18" />
      <circle cx="27.5" cy="32" r="2.5" fill="#F8FAFC" />
      <circle cx="36.5" cy="32" r="2.5" fill="#F8FAFC" />
      <path d="M29 37h6l-3 3.5z" fill="#3B82F6" />
      <path d="M47 13a9 9 0 0 1 4 5M50 9a14 14 0 0 1 5 8" stroke="#22D3EE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2 rounded-lg" aria-label="PINGOO home">
      <LogoMark />
      <span className="text-xl font-extrabold tracking-tight text-text">
        PINGOO<span className="text-primary">.</span>
      </span>
    </Link>
  )
}
