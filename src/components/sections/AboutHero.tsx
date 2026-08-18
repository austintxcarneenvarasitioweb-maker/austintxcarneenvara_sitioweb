import { PageHero } from '@/components/ui/PageHero'
import { MarqueeTicker } from '@/components/ui/MarqueeTicker'

interface AboutHeroProps {
  title?: string
  subtitle?: string
  imageUrl?: string
}

export function AboutHero({
  title = 'Smoke, fire & *family tradition*',
  subtitle,
  imageUrl,
}: AboutHeroProps) {
  return (
    <>
      <PageHero label="OUR STORY" title={title} subtitle={subtitle} imageUrl={imageUrl} />
      <MarqueeTicker />
    </>
  )
}
