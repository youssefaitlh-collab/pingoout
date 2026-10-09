import { TextPage } from '@/components/TextPage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'Terms of Use', description: 'The terms for using PINGOO.', path: '/terms' })

export default function TermsPage() {
  return (
    <TextPage title="Terms of Use" intro="Last updated October 2026. By using PINGOO you agree to these terms.">
      <section><h2>The service</h2><p>PINGOO provides game discovery information and links to external sources. Product details are checked against listed sources, but availability and requirements may change. No game files are hosted or distributed by this site.</p></section>
      <section><h2>Trademarks</h2><p>Game names, logos and artwork belong to their respective owners. Rights holders can request changes through the contact page.</p></section>
      <section><h2>External stores</h2><p>Purchases and downloads happen on third-party stores and are governed by their terms.</p></section>
      <section><h2>Acceptable use</h2><p>Do not misuse the site, attempt to disrupt it or submit unlawful content through our forms.</p></section>
    </TextPage>
  )
}
