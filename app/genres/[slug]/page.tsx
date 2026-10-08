import { notFound } from 'next/navigation'
import { ListingPage } from '@/components/ListingPage'
import { byGenre, type GenreSlug, genres } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => Object.keys(genres).map((slug) => ({ slug }))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const genre = genres[slug as GenreSlug]
  if (!genre) return {}

  return buildMetadata({
    title: `${genre.name} Games`,
    description: `${genre.description} Browse PINGOO's catalog of ${genre.name.toLowerCase()} games.`,
    path: `/genres/${slug}`,
  })
}

export default async function GenrePage({ params }: Props) {
  const { slug } = await params
  const genre = genres[slug as GenreSlug]
  if (!genre) notFound()

  return (
    <ListingPage
      eyebrow="Genre"
      title={`${genre.name} games`}
      description={genre.description}
      path={`/genres/${slug}`}
      games={byGenre(slug as GenreSlug)}
      breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Games', path: '/games' }, { name: `${genre.name} games`, path: `/genres/${slug}` }]}
    />
  )
}
