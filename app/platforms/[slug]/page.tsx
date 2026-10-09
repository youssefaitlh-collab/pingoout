import { notFound } from 'next/navigation'
import { ListingPage } from '@/components/ListingPage'
import { availablePlatforms, byPlatform, type PlatformSlug, platforms } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => availablePlatforms().map(([slug]) => ({ slug }))

const platformDescription = (name: string, count: number) =>
  `Browse ${count} ${name} ${count === 1 ? 'game profile' : 'game profiles'} with source-linked details in the PINGOO catalog.`

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const platform = platforms[slug as PlatformSlug]
  if (!platform || byPlatform(slug as PlatformSlug).length === 0) return {}
  const count = byPlatform(slug as PlatformSlug).length

  return buildMetadata({
    title: `${platform.name} Games`,
    description: platformDescription(platform.name, count),
    path: `/platforms/${slug}`,
    noIndex: count < 2,
  })
}

export default async function PlatformPage({ params }: Props) {
  const { slug } = await params
  const platform = platforms[slug as PlatformSlug]
  if (!platform || byPlatform(slug as PlatformSlug).length === 0) notFound()

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
