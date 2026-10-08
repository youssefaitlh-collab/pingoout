import { notFound } from 'next/navigation'
import { ListingPage } from '@/components/ListingPage'
import { byGenre, type GenreSlug, genres } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => Object.keys(genres).map((slug) => ({ slug }))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const g = genres[slug as GenreSlug]
  return g ? buildMetadata({ title: `${g.name} games`, description: `${g.description} Discover the best ${g.name.toLowerCase()} games on PINGOO.`, path: `/category/${slug}` }) : {}
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const g = genres[slug as GenreSlug]
  if (!g) notFound()
  return <ListingPage eyebrow="Genre" title={`${g.name} games`} description={g.description} path={`/category/${slug}`} games={byGenre(slug as GenreSlug)} />
}
