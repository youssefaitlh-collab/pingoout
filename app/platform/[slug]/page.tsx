import { notFound } from 'next/navigation'
import { ListingPage } from '@/components/ListingPage'
import { byPlatform, type PlatformSlug, platforms } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => Object.keys(platforms).map((slug) => ({ slug }))

const describe = (name: string) => `Discover games available on ${name} and find official places to get them.`

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const p = platforms[slug as PlatformSlug]
  return p ? buildMetadata({ title: `${p.name} games`, description: describe(p.name), path: `/platform/${slug}` }) : {}
}

export default async function PlatformPage({ params }: Props) {
  const { slug } = await params
  const p = platforms[slug as PlatformSlug]
  if (!p) notFound()
  return <ListingPage eyebrow="Platform" title={`${p.name} games`} description={describe(p.name)} path={`/platform/${slug}`} games={byPlatform(slug as PlatformSlug)} />
}
