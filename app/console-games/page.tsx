import { ListingPage } from '@/components/ListingPage'
import { byGroup } from '@/lib/games'
import { buildMetadata } from '@/lib/seo'

const description = 'Games for PlayStation, Xbox and Nintendo Switch.'
export const metadata = buildMetadata({ title: 'Console games', description, path: '/console-games' })

export default function ConsoleGames() {
  return <ListingPage eyebrow="Console" title="Console games" description={description} path="/console-games" games={byGroup('console')} />
}
