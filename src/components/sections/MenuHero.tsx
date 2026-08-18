import { PageHero } from '@/components/ui/PageHero'

interface MenuHeroProps {
  title?: string
  subtitle?: string
  imageUrl?: string
  menuPdfUrl?: string
}

export function MenuHero({
  title = 'The Menu',
  subtitle = 'Every plate begins with wood, fire, and time. Explore our llanero favorites.',
  imageUrl,
  menuPdfUrl = '#',
}: MenuHeroProps) {
  return (
    <PageHero label="OUR MENU" title={title} subtitle={subtitle} imageUrl={imageUrl}>
      <a
        href={menuPdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline btn-hero"
      >
        ↓ Download Full Menu
      </a>
    </PageHero>
  )
}
