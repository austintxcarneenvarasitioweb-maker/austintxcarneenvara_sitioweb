import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/sections/Hero'
import { MarqueeTicker } from '@/components/ui/MarqueeTicker'
import { SignatureDishes } from '@/components/sections/SignatureDishes'
import { HomeCatering } from '@/components/sections/HomeCatering'
import { mockHome } from '@/lib/mock-data'
import { getCateringPackages, getDishes, getHomePageContent } from '@/lib/site-content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.home' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [dishes, packages, home] = await Promise.all([
    getDishes(locale),
    getCateringPackages(locale),
    getHomePageContent(locale),
  ])

  return (
    <>
      <Hero
        title={home.heroTitle || mockHome.heroTitle}
        subtitle={home.heroSubtitle || mockHome.heroSubtitle}
        imageUrl={home.heroImageUrl || mockHome.heroImageUrl}
        videoUrl={home.heroVideoUrl}
      />
      <MarqueeTicker />
      <SignatureDishes dishes={dishes} title={home.signatureTitle || mockHome.signatureTitle} />
      <HomeCatering
        title={home.cateringTitle || mockHome.cateringTitle}
        description={home.cateringDescription || mockHome.cateringDescription}
        imageUrl={home.cateringImageUrl || mockHome.cateringImageUrl}
        packages={packages}
      />
    </>
  )
}
