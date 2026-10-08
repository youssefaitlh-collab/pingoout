import { notFound } from 'next/navigation'
import { ListingPage } from '@/components/ListingPage'
import { byPlatform, type PlatformSlug, platforms } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => Object.keys(platforms).map((slug) => ({ slug }))

const platformDescription = (name: string, count: number) =>
  `Browse ${count} ${name} ${count === 1 ? 'game' : 'games'} in the PINGOO catalog, with genres and official store links.`

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const platform = platforms[slug as PlatformSlug]
  if (!platform) return {}
  const count = byPlatform(slug as PlatformSlug).length

  return buildMetadata({
    title: `${platform.name} Games`,
    description: platformDescription(platform.name, count),
    path: `/platforms/${slug}`,
  })
}

export default async function PlatformPage({ params }: Props) {
  const { slug } = await params
  const platform = platforms[slug as PlatformSlug]
  if (!platform) notFound()

  const games = byPlatform(slug as PlatformSlug)
  return (
    <ListingPage
      eyebrow="Platform"
      title={`${platform.name} games`}
      description={platformDescription(platform.name, games.length)}
      path={`/platforms/${slug}`}
      games={games}
      breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Games', path: '/games' }, { name: `${platform.name} games`, path: `/platforms/${slug}` }]}
    />
  )
}
