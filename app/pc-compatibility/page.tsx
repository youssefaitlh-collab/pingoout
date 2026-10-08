import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { games } from '@/lib/games'
import { comparePcRequirements } from '@/lib/game-intelligence'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'Compare PC requirements', description: 'Compare entered PC memory and operating system details with the minimum requirements listed for a PINGOO catalog game.', path: '/pc-compatibility', noIndex: true })

type Props = { searchParams: Promise<{ game?: string; ram?: string; os?: string }> }

export default async function PcCompatibilityPage({ searchParams }: Props) {
  const params = await searchParams
  const game = games.find((item) => item.slug === params.game)
  const ram = params.ram && /^\d{1,3}$/.test(params.ram) ? Number(params.ram) : undefined
  const operatingSystem = params.os?.slice(0, 80)
  const submitted = Boolean(params.game)
  const checks = game?.requirements ? comparePcRequirements(game, { ramGb: ram, operatingSystem }) : []

  return <div className="container-page section">
    <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Find a game', path: '/discover' }, { name: 'PC requirements', path: '/pc-compatibility' }]} />
    <p className="text-sm font-semibold uppercase tracking-wider text-cyan">PC compatibility</p>
    <h1 className="mt-2 text-[32px] font-bold tracking-tight md:text-5xl">Compare PC requirements</h1>
    <p className="mt-3 max-w-2xl text-muted">Enter your memory and operating system to compare against a game’s listed minimum requirements. This is a requirements check, not a performance or FPS prediction.</p>
    <form action="/pc-compatibility" method="get" className="mt-7 grid gap-4 rounded-lg border border-line bg-surface p-5 md:grid-cols-3">
      <label className="text-sm font-medium">Game<select name="game" required defaultValue={game?.slug ?? params.game ?? ''} className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3"><option value="">Choose a game</option>{games.filter((item) => item.requirements).map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label>
      <label className="text-sm font-medium">Installed memory (GB)<input name="ram" type="number" min="1" max="1024" step="1" defaultValue={ram ?? ''} className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3" /></label>
      <label className="text-sm font-medium">Operating system<input name="os" maxLength={80} defaultValue={operatingSystem ?? ''} placeholder="e.g. Windows 11 64-bit" className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-3" /></label>
      <button type="submit" className="btn-primary md:col-span-3 md:justify-self-start">Compare requirements</button>
    </form>
    {submitted && !game && <p role="status" className="mt-5 text-amber-300">That game was not found or does not have listed PC requirements. Choose a game from the available list.</p>}
    {game && checks.length > 0 && <section className="mt-10" aria-labelledby="checks-title"><h2 id="checks-title" className="h2">{game.title}: minimum requirement checks</h2><p className="mt-2 text-sm text-muted">Comparison uses only readable catalog values. An unknown result means PINGOO cannot reliably compare that requirement.</p><ul className="mt-5 divide-y divide-line rounded-lg border border-line bg-surface">{checks.map((check) => <li key={check.requirement} className="flex flex-wrap items-start justify-between gap-3 p-4"><div><p className="font-medium">{check.requirement}</p><p className="mt-1 text-sm text-muted">{check.explanation}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${check.status === 'meets' ? 'bg-emerald-900/50 text-emerald-200' : check.status === 'below' ? 'bg-amber-900/50 text-amber-200' : 'bg-elevated text-muted'}`}>{check.status === 'meets' ? 'Meets listed value' : check.status === 'below' ? 'Below listed value' : 'Cannot compare'}</span></li>)}</ul><p className="mt-4 text-sm text-muted">This does not verify GPU/CPU compatibility, drivers, device variants, or expected game performance. See the full <Link href={`/games/${game.slug}`} className="text-primary hover:underline">{game.title} requirements</Link>.</p></section>}
  </div>
}
