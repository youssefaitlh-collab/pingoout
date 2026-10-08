import { ListingPage } from '@/components/ListingPage'
import { byGroup } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

const description = 'The best games to play on PC, from strategy to open-world adventures.'
export const metadata = buildMetadata({ title: 'PC games', description, path: '/pc-games' })

export default function PcGames() {
  return <ListingPage eyebrow="PC" title="PC games" description={description} path="/pc-games" games={byGroup('pc')} />
}
