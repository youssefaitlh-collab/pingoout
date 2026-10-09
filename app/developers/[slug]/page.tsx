import { notFound } from 'next/navigation'
import { ListingPage } from '@/components/ListingPage'
import { developers, getDeveloper } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => developers.map(({ slug }) => ({ slug }))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const developer = getDeveloper(slug)
  if (!developer) return {}

  const titles = developer.games.slice(0, 3).map((game) => game.title)
  const description = developer.games.length === 1
    ? `${developer.name} is listed as the developer of ${titles[0]} in a source-checked PINGOO game profile.`
    : `Explore ${developer.games.length} games listed for developer ${developer.name}, including ${titles.join(', ')}.`

  return buildMetadata({
    title: `Games by ${developer.name}`,
    description,
    path: `/developers/${slug}`,
    image: developer.games[0]?.image,
    noIndex: developer.games.length < 2,
  })
}

export default async function DeveloperPage({ params }: Props) {
  const { slug } = await params
  const developer = getDeveloper(slug)
  if (!developer) notFound()

  return (
    <ListingPage
      eyebrow="Developer"
      title={`Games by ${developer.name}`}
      description={`Source-checked game profiles associated with ${developer.name}.`}
      path={`/developers/${slug}`}
      games={developer.games}
      breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Games', path: '/games' }, { name: developer.name, path: `/developers/${slug}` }]}
    />
  )
}
