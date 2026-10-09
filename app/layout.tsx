import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { isPreviewDeployment, JsonLd, organizationJsonLd, SITE_URL, websiteJsonLd } from '@/lib/seo'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Discover your next game | PINGOO', template: '%s | PINGOO' },
  description: 'Explore sourced game profiles, confirmed platform information, and official PC requirements where available.',
  applicationName: 'PINGOO',
  robots: isPreviewDeployment ? { index: false, follow: true } : { index: true, follow: true },
  openGraph: {
    title: 'Discover your next game | PINGOO',
    description: 'Explore sourced game profiles, platform information and PC requirements where available.',
    url: SITE_URL,
    siteName: 'PINGOO',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Discover your next game | PINGOO',
    description: 'Explore sourced game profiles, platform information and PC requirements where available.',
  },
}

export const viewport: Viewport = { themeColor: '#080D18' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   <html lang="en" className={inter.variable}>
  <body className="flex min-h-screen flex-col bg-bg font-sans text-text">
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
