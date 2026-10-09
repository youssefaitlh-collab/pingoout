import Link from 'next/link'
import { TextPage } from '@/components/TextPage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'About', description: 'Learn how PINGOO sources and presents game information.', path: '/about' })

export default function AboutPage() {
  return (
    <TextPage title="About PINGOO" intro="PINGOO is a game discovery platform that organizes game information, PC requirements and comparisons.">
      <section>
        <h2>What we do</h2>
        <p>PINGOO profiles link to official publisher, developer or authorized store sources for factual details. Profiles display when their information was last checked; unverified fields are omitted.</p>
      </section>
      <section><h2>Catalog verification</h2><p>We keep editorial guidance separate from sourced product facts. Entries marked Demo are illustrative and are not included in the public game catalogue or search index.</p></section>
      <section>
        <h2>Get in touch</h2>
        <p>Want to suggest a game or report a problem? <Link href="/contact" className="text-primary underline-offset-4 hover:underline">Contact us</Link>.</p>
      </section>
    </TextPage>
  )
}
