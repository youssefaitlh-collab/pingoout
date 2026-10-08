import { ListingPage } from '@/components/ListingPage'
import { byGroup } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

const description = 'Popular games for Android and iOS, picked for quick sessions and big fun.'
export const metadata = buildMetadata({ title: 'Mobile games', description, path: '/mobile-games' })

export default function MobileGames() {
  return <ListingPage eyebrow="Mobile" title="Mobile games" description={description} path="/mobile-games" games={byGroup('mobile')} />
}
