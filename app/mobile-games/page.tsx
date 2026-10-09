import { ListingPage } from '@/components/ListingPage'
import { byGroup } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

const description = 'Browse game profiles with verified Android or iOS availability.'
export const metadata = buildMetadata({ title: 'Mobile games', description, path: '/mobile-games', noIndex: byGroup('mobile').length < 2 })

export default function MobileGames() {
  return <ListingPage eyebrow="Mobile" title="Mobile games" description={description} path="/mobile-games" games={byGroup('mobile')} />
}
