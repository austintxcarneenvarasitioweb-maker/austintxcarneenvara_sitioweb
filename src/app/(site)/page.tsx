import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { MarqueeTicker } from '@/components/ui/MarqueeTicker'
import { SignatureDishes } from '@/components/sections/SignatureDishes'
import { HomeCatering } from '@/components/sections/HomeCatering'
import {
  mockHome,
  mockDishes,
  mockCateringPackages,
} from '@/lib/mock-data'

// TODO: Replace with getPayloadClient() when MongoDB is configured
export const metadata: Metadata = {
  title: 'Home',
  description:
    'Authentic Venezuelan fire-grilled meats in Austin, TX. Carne en vara cooked over live wood fire.',
  openGraph: {
    title: 'Austin TX Carne en Vara',
    description: 'Fire-grilled Venezuelan meats in the heart of Texas.',
    locale: 'en_US',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero
        title={mockHome.heroTitle}
        subtitle={mockHome.heroSubtitle}
        imageUrl={mockHome.heroImageUrl}
      />
      <MarqueeTicker />
      <SignatureDishes dishes={mockDishes} title={mockHome.signatureTitle} />
      <HomeCatering
        title={mockHome.cateringTitle}
        description={mockHome.cateringDescription}
        imageUrl={mockHome.cateringImageUrl}
        packages={mockCateringPackages}
      />
    </>
  )
}
