import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd, SITE_URL, websiteJsonLd } from '@/lib/seo'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'PINGOO — Discover your next game', template: '%s | PINGOO' },
  description: 'Discover trending, mobile, PC and console games on PINGOO, and find official sources to play them.',
  applicationName: 'PINGOO',
}

export const viewport: Viewport = { themeColor: '#080D18' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-text">
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
