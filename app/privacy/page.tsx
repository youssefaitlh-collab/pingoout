import { TextPage } from '@/components/TextPage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ title: 'Privacy Policy', description: 'How PINGOO handles your information.', path: '/privacy' })

export default function PrivacyPage() {
  return (
    <TextPage title="Privacy Policy" intro="Last updated October 2026. We collect as little as possible.">
      <section><h2>What we collect</h2><p>Browsing PINGOO does not require an account. When you use the contact form we receive the name, email and message you submit, and use them only to reply to you.</p></section>
      <section><h2>Cookies</h2><p>PINGOO does not use advertising or tracking cookies.</p></section>
      <section><h2>Third-party links</h2><p>Official source links take you to external stores, which have their own privacy policies.</p></section>
      <section><h2>Your choices</h2><p>To have your contact submissions deleted, send a request through the contact page.</p></section>
    </TextPage>
  )
}
