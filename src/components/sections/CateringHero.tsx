import { getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/ui/PageHero'

interface CateringHeroProps {
  title?: string
  subtitle?: string
  imageUrl?: string
}

export async function CateringHero({
  title = 'We bring the *fire* to you',
  subtitle,
  imageUrl,
}: CateringHeroProps) {
  const t = await getTranslations('sections')

  return (
    <PageHero
      label={t('cateringEvents').toUpperCase()}
      title={title}
      subtitle={subtitle}
      imageUrl={imageUrl}
      align="center"
    />
  )
}
