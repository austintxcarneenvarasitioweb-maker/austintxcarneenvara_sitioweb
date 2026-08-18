import { PageHero } from '@/components/ui/PageHero'

interface CateringHeroProps {
  title?: string
  subtitle?: string
  imageUrl?: string
}

export function CateringHero({
  title = 'We bring the *fire* to you',
  subtitle,
  imageUrl,
}: CateringHeroProps) {
  return (
    <PageHero
      label="CATERING & EVENTS"
      title={title}
      subtitle={subtitle}
      imageUrl={imageUrl}
      align="center"
    />
  )
}
