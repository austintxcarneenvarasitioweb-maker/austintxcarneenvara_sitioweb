import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { MenuHero } from '@/components/sections/MenuHero'
import { FeaturedDishes } from '@/components/sections/FeaturedDishes'
import { PriceList } from '@/components/sections/PriceList'
import { mockMenuPage } from '@/lib/mock-data'
import { getDishes, getMenuPageContent } from '@/lib/site-content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.menu' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [dishes, menu] = await Promise.all([getDishes(locale), getMenuPageContent(locale)])

  return (
    <>
      <MenuHero
        title={menu.heroTitle || mockMenuPage.heroTitle}
        subtitle={menu.heroSubtitle || mockMenuPage.heroSubtitle}
        imageUrl={menu.heroImageUrl || mockMenuPage.heroImageUrl}
        menuPdfUrl={menu.menuPdfUrl}
      />
      <FeaturedDishes dishes={dishes} />
      <PriceList dishes={dishes} footerNote={menu.footerNote || mockMenuPage.footerNote} />
    </>
  )
}
