import type { Metadata, Viewport } from 'next'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { PageTransition } from '@/components/motion/PageTransition'
import { cormorant, outfit } from '@/lib/fonts'
import { mockSettings } from '@/lib/mock-data'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Austin TX Carne en Vara',
    default: 'Austin TX Carne en Vara — Fire-Grilled Venezuelan Meats',
  },
  description:
    'Authentic Venezuelan carne en vara cooked over live wood fire in Austin, Texas.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001'),
  openGraph: {
    siteName: 'Austin TX Carne en Vara',
    locale: 'en_US',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${cormorant.variable} ${outfit.variable}`}>
      <body className="min-h-full antialiased bg-bg text-cream">
        <SmoothScroll>
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer settings={mockSettings} />
        </SmoothScroll>
      </body>
    </html>
  )
}
