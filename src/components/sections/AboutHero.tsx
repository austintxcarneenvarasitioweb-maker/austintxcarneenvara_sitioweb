import { getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/ui/PageHero'

interface AboutHeroProps {
  title?: string
  subtitle?: string
  imageUrl?: string
}

export async function AboutHero({
  title = 'Smoke, fire & *family tradition*',
  subtitle,
  imageUrl,
}: AboutHeroProps) {
  const t = await getTranslations('sections')

  return (
    <PageHero
      label={t('ourStory')}
      title={title}
      subtitle={subtitle}
      imageUrl={imageUrl}
      minHeight="75vh"
      overlay="page-blend"
    />
  )
}
