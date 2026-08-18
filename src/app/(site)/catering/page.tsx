import type { Metadata } from 'next'
import { CateringHero } from '@/components/sections/CateringHero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { CateringPackages } from '@/components/sections/CateringPackages'
import { QuoteForm } from '@/components/sections/QuoteForm'
import {
  mockCateringPage,
  mockCateringPackages,
  mockHowItWorks,
} from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Catering',
  description: 'Live-fire Venezuelan catering for weddings, corporate events and private parties in Austin, TX.',
}

export default function CateringPage() {
  return (
    <>
      <CateringHero
        title={mockCateringPage.heroTitle}
        subtitle={mockCateringPage.heroSubtitle}
        imageUrl={mockCateringPage.heroImageUrl}
      />
      <HowItWorks steps={mockHowItWorks} />
      <CateringPackages packages={mockCateringPackages} />
      <QuoteForm
        title={mockCateringPage.quoteTitle}
        description={mockCateringPage.quoteDescription}
        packages={mockCateringPackages}
      />
    </>
  )
}
