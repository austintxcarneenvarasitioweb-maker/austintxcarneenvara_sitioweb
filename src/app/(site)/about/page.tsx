import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/AboutHero'
import { StorySections } from '@/components/sections/StorySection'
import { AboutCTA } from '@/components/sections/AboutCTA'
import { mockAboutPage, mockStorySections } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'About',
  description: 'Smoke, fire & family tradition — from the Venezuelan llanos to Austin, Texas.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero
        title={mockAboutPage.heroTitle}
        subtitle={mockAboutPage.heroSubtitle}
        imageUrl={mockAboutPage.heroImageUrl}
      />
      <StorySections sections={mockStorySections} />
      <AboutCTA title={mockAboutPage.ctaTitle} />
    </>
  )
}
