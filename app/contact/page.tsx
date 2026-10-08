import { TextPage } from '@/components/TextPage'
import { buildMetadata } from '@/lib/seo'
import { ContactForm } from './ContactForm'

export const metadata = buildMetadata({ title: 'Contact', description: 'Suggest a game, report an issue or get in touch with the PINGOO team.', path: '/contact' })

export default function ContactPage() {
  return (
    <TextPage title="Contact" intro="Suggest a game, report a broken link or say hello. Rights holders can use this form for any listing concerns.">
      <ContactForm />
    </TextPage>
  )
}
