import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { CateringHero } from '@/components/sections/CateringHero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { CateringQuoteFlow } from '@/components/sections/CateringQuoteFlow'
import { mockCateringPage, mockHowItWorks } from '@/lib/mock-data'
import { getCateringPackages, getCateringPageContent } from '@/lib/site-content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.catering' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function CateringPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [packages, catering] = await Promise.all([
    getCateringPackages(locale),
    getCateringPageContent(locale),
  ])

  return (
    <>
      <CateringHero
        title={catering.heroTitle || mockCateringPage.heroTitle}
        subtitle={catering.heroSubtitle || mockCateringPage.heroSubtitle}
        imageUrl={catering.heroImageUrl || mockCateringPage.heroImageUrl}
      />
      <HowItWorks steps={mockHowItWorks} />
      <CateringQuoteFlow
        packages={packages}
        quoteTitle={catering.quoteTitle || mockCateringPage.quoteTitle}
        quoteDescription={catering.quoteDescription || mockCateringPage.quoteDescription}
      />
    </>
  )
}
