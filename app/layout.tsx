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
  description: 'Discover PC, console and mobile games on PINGOO by genre and platform, then visit an official store to play.',
  applicationName: 'PINGOO',
  robots: isPreviewDeployment ? { index: false, follow: true } : { index: true, follow: true },
  openGraph: {
    title: 'Discover your next game | PINGOO',
    description: 'Discover games by genre and platform, then follow links to official stores.',
    url: SITE_URL,
    siteName: 'PINGOO',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Discover your next game | PINGOO',
    description: 'Discover games by genre and platform, then follow links to official stores.',
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
