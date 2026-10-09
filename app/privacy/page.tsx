import { TextPage } from '@/components/TextPage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'Privacy Policy', description: 'How PINGOO handles your information.', path: '/privacy' })

export default function PrivacyPage() {
  return (
    <TextPage title="Privacy Policy" intro="Last updated October 2026. We collect as little as possible.">
      <section><h2>What we collect</h2><p>Browsing PINGOO does not require an account. When you submit the contact form, the name, email address, and message you provide are handled through Netlify Forms so we can respond. Do not include sensitive information in a message.</p></section>
      <section><h2>Cookies and technical data</h2><p>PINGOO currently includes no advertising or analytics tracking scripts. Netlify and other hosting or form providers may process technical request data or use cookies needed to provide their services; review their privacy policies for details.</p></section>
      <section><h2>Third-party services and links</h2><p>The contact form is provided by Netlify, which processes form submissions under its own terms and privacy policy. Links to third-party websites, when added, are governed by those sites’ own policies.</p></section>
      <section><h2>Your choices</h2><p>To ask about a contact-form submission or request its deletion, send a request through the contact page. Netlify’s service retention and backups may affect deletion timing.</p></section>
    </TextPage>
  )
}
