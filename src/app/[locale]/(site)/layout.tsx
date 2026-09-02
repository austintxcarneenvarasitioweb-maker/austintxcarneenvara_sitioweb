import type { Metadata, Viewport } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Footer } from '@/components/layout/Footer'
import { LanguagePrompt } from '@/components/layout/LanguagePrompt'
import { Navbar } from '@/components/layout/Navbar'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { PageTransition } from '@/components/motion/PageTransition'
import { cormorant, outfit, trocchi } from '@/lib/fonts'
import { getSiteSettings } from '@/lib/site-content'
import { getSiteUrl } from '@/lib/site-url'
import { routing } from '@/i18n/routing'
import '../../globals.css'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: {
      template: `%s | ${t('siteName')}`,
      default: t('defaultTitle'),
    },
    description: t('defaultDescription'),
    metadataBase: new URL(getSiteUrl()),
    icons: {
      icon: [{ url: '/images/LOGO.png', type: 'image/png' }],
      apple: [{ url: '/images/LOGO.png', type: 'image/png' }],
      shortcut: '/images/LOGO.png',
    },
    openGraph: {
      siteName: t('siteName'),
      locale: locale === 'es' ? 'es_US' : 'en_US',
      type: 'website',
      images: [{ url: '/images/LOGO.png', alt: t('siteName') }],
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function SiteLayout({ children, params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const settings = await getSiteSettings(locale)

  return (
    <html lang={locale} className={`h-full ${cormorant.variable} ${outfit.variable} ${trocchi.variable}`}>
      <body className="min-h-full antialiased bg-bg text-cream">
        <SmoothScroll>
          <LanguagePrompt />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer settings={settings} locale={locale} />
        </SmoothScroll>
      </body>
    </html>
  )
}
