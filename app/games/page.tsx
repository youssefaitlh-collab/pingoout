import { ListingPage } from '@/components/ListingPage'
import { games } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

const description = 'Browse PINGOO game profiles with official sources, verified platform information and PC requirements where available.'
export const metadata = buildMetadata({ title: 'All games', description, path: '/games' })

export default function GamesPage() {
  return <ListingPage eyebrow="Catalogue" title="Games" description={description} path="/games" games={games} />
}
