import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface AboutCTAProps {
  title?: string
}

export async function AboutCTA({ title = 'Taste the tradition' }: AboutCTAProps) {
  const t = await getTranslations('sections')

  return (
    <section
      style={{ backgroundColor: '#1a0e10', padding: '96px 24px', textAlign: 'center', borderTop: '1px solid #3a1e10' }}
      aria-labelledby="about-cta"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2
          id="about-cta"
          style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '40px' }}
        >
          {title}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <Link href="/menu" className="btn-primary">
            {t('exploreMenu')}
          </Link>
          <Link href="/catering#quote" className="btn-outline">
            {t('bookCatering')}
          </Link>
        </div>
      </div>
    </section>
  )
}
