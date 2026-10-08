import Link from 'next/link'
import { TextPage } from '@/components/TextPage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'About', description: 'PINGOO helps gamers discover new games and find official places to play them.', path: '/about' })

export default function AboutPage() {
  return (
    <TextPage title="About PINGOO" intro="PINGOO is a game discovery platform. We help you find your next game, then point you to the official place to get it.">
      <section>
        <h2>What we do</h2>
        <p>Browse trending games, explore by genre or platform, and read clear game pages with the key facts: who made it, where it runs and what it is about.</p>
      </section>
      <section>
        <h2>Official sources only</h2>
        <p>PINGOO does not host or distribute game files. Every “Official Source” link takes you to the publisher or an authorized store, such as Steam, PlayStation Store, Xbox, Nintendo eShop, Google Play or the App Store.</p>
      </section>
      <section>
        <h2>Get in touch</h2>
        <p>Want to suggest a game or report a problem? <Link href="/contact" className="text-primary underline-offset-4 hover:underline">Contact us</Link>.</p>
      </section>
    </TextPage>
  )
}
