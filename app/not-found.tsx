import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-page section text-center">
      <h1 className="text-[32px] font-bold md:text-5xl">Game over… page not found</h1>
      <p className="mt-3 text-muted">That page doesn&apos;t exist. Let&apos;s find you something to play.</p>
      <Link href="/games" className="btn-primary mt-8">Browse games</Link>
    </div>
  )
}
