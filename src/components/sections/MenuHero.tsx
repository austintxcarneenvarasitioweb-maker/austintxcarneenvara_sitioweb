import { getTranslations } from 'next-intl/server'
import { PageHero } from '@/components/ui/PageHero'

interface MenuHeroProps {
  title?: string
  subtitle?: string
  imageUrl?: string
  menuPdfUrl?: string
}

export async function MenuHero({
  title = 'The Menu',
  subtitle = 'Every plate begins with wood, fire, and time. Explore our llanero favorites.',
  imageUrl,
  menuPdfUrl = '#',
}: MenuHeroProps) {
  const t = await getTranslations('sections')

  return (
    <PageHero label={t('ourMenu')} title={title} subtitle={subtitle} imageUrl={imageUrl} minHeight="75vh">
      {menuPdfUrl && menuPdfUrl !== '#' && (
        <a
          href={menuPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline btn-hero"
        >
          {t('downloadMenu')}
        </a>
      )}
    </PageHero>
  )
}
