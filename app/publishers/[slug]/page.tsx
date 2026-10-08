import { notFound } from 'next/navigation'
import { ListingPage } from '@/components/ListingPage'
import { getPublisher, publishers } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => publishers.map(({ slug }) => ({ slug }))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const publisher = getPublisher(slug)
  if (!publisher) return {}

  const titles = publisher.games.slice(0, 3).map((game) => game.title)
  const description = publisher.games.length === 1
    ? `${publisher.name} publisher of ${titles[0]}. Explore the game, its platforms, genres and official sources on PINGOO.`
    : `Explore ${publisher.games.length} games listed for publisher ${publisher.name}, including ${titles.join(', ')}.`

  return buildMetadata({
    title: `Games published by ${publisher.name}`,
    description,
    path: `/publishers/${slug}`,
    image: publisher.games[0]?.image,
    noIndex: publisher.games.length < 2,
  })
}

export default async function PublisherPage({ params }: Props) {
  const { slug } = await params
  const publisher = getPublisher(slug)
  if (!publisher) notFound()

  return (
    <ListingPage
      eyebrow="Publisher"
      title={`Games published by ${publisher.name}`}
      description={`Games listed for publisher ${publisher.name}. Browse each game's genres, platforms, and official store links.`}
      path={`/publishers/${slug}`}
      games={publisher.games}
      breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Games', path: '/games' }, { name: publisher.name, path: `/publishers/${slug}` }]}
    />
  )
}
