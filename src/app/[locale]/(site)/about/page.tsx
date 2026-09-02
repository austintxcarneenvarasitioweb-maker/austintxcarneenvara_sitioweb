import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AboutHero } from '@/components/sections/AboutHero'
import { StorySections } from '@/components/sections/StorySection'
import { AboutCTA } from '@/components/sections/AboutCTA'
import { mockAboutPage, mockStorySections } from '@/lib/mock-data'
import { getAboutPageContent } from '@/lib/site-content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.about' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const about = await getAboutPageContent(locale)

  return (
    <>
      <AboutHero
        title={about.heroTitle || mockAboutPage.heroTitle}
        subtitle={about.heroSubtitle || mockAboutPage.heroSubtitle}
        imageUrl={about.heroImageUrl || mockAboutPage.heroImageUrl}
      />
      <StorySections sections={about.storySections.length ? about.storySections : mockStorySections} />
      <AboutCTA title={about.ctaTitle || mockAboutPage.ctaTitle} />
    </>
  )
}
