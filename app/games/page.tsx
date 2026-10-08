import { ListingPage } from '@/components/ListingPage'
import { recentlyAdded } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

const description = 'Browse every game on PINGOO across PC, console and mobile.'
export const metadata = buildMetadata({ title: 'All games', description, path: '/games' })

export default function GamesPage() {
  return <ListingPage eyebrow="Catalogue" title="All games" description={description} path="/games" games={recentlyAdded()} />
}
