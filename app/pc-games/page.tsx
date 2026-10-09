import { ListingPage } from '@/components/ListingPage'
import { byGroup } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

const description = 'Browse game profiles with verified PC availability and system requirements where published.'
export const metadata = buildMetadata({ title: 'PC games', description, path: '/pc-games' })

export default function PcGames() {
  return <ListingPage eyebrow="PC" title="PC games" description={description} path="/pc-games" games={byGroup('pc')} />
}
