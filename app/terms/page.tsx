import { TextPage } from '@/components/TextPage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'Terms of Use', description: 'The terms for using PINGOO.', path: '/terms' })

export default function TermsPage() {
  return (
    <TextPage title="Terms of Use" intro="Last updated October 2026. By using PINGOO you agree to these terms.">
      <section><h2>The service</h2><p>PINGOO is a game discovery directory. We provide information about games and link to official or authorized sources. We do not host, sell or distribute game files.</p></section>
      <section><h2>Trademarks</h2><p>Game names, logos and artwork belong to their respective owners. Rights holders can request changes through the contact page.</p></section>
      <section><h2>External stores</h2><p>Purchases and downloads happen on third-party stores and are governed by their terms.</p></section>
      <section><h2>Acceptable use</h2><p>Do not misuse the site, attempt to disrupt it or submit unlawful content through our forms.</p></section>
    </TextPage>
  )
}
