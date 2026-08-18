import type { Metadata } from 'next'
import { MenuHero } from '@/components/sections/MenuHero'
import { FeaturedDishes } from '@/components/sections/FeaturedDishes'
import { PriceList } from '@/components/sections/PriceList'
import { mockDishes, mockMenuPage } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore our llanero favorites — carne en vara, cachapas, combos and more.',
}

export default function MenuPage() {
  return (
    <>
      <MenuHero
        title={mockMenuPage.heroTitle}
        subtitle={mockMenuPage.heroSubtitle}
        imageUrl={mockMenuPage.heroImageUrl}
        menuPdfUrl={mockMenuPage.menuPdfUrl}
      />
      <FeaturedDishes dishes={mockDishes} />
      <PriceList dishes={mockDishes} footerNote={mockMenuPage.footerNote} />
    </>
  )
}
