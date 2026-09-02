import type { Dish } from '@/lib/mock-data'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface SignatureDishesProps {
  dishes: Dish[]
  title?: string
}

export async function SignatureDishes({ dishes, title = 'Cooked over *live fire*' }: SignatureDishesProps) {
  const t = await getTranslations('sections')
  const titleParts = title.split('*')
  const featured = dishes.filter((d) => d.featured).slice(0, 4)

  return (
    <section
      style={{ backgroundColor: '#1a0e10', padding: '80px 0 96px' }}
      aria-labelledby="signature-heading"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', marginBottom: '48px' }}
        >
          <div>
            <p
              style={{ color: '#c84914', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <svg width="10" height="13" viewBox="0 0 14 18" fill="currentColor">
                <path d="M7 0C7 0 10.5 4 10.5 7.5C10.5 9.5 9.5 11 9.5 11C9.5 11 10.5 10 10.5 8.5C10.5 8.5 12.5 10.5 12.5 13C12.5 15.5 10.2 18 7 18C3.8 18 1.5 15.5 1.5 13C1.5 10.5 3.5 8.5 3.5 8.5C3.5 10 4.5 11 4.5 11C4.5 11 3.5 9.5 3.5 7.5C3.5 4 7 0 7 0Z" />
              </svg>
              {t('signatureFavorites')}
            </p>
            <h2
              id="signature-heading"
              style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.1 }}
            >
              {titleParts.map((part, i) =>
                i % 2 === 1 ? (
                  <em key={i} style={{ color: '#c84914', fontStyle: 'italic' }}>{part}</em>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </h2>
          </div>
          <Link href="/menu" className="link-underline">
            {t('fullMenu')}
          </Link>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: '12px' }}
        >
          {featured.map((dish) => (
            <article
              key={dish.id}
              style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#1e0d08', cursor: 'default' }}
              className="dish-card"
            >
              <div
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3a2010, #2a1208, #1a0a06)' }}
              />
              {dish.imageUrl && (
                <div
                  className="dish-card-image"
                  style={{ position: 'absolute', inset: 0, backgroundImage: `url(${dish.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              )}
              <div className="dish-card-dim" />
              <div
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,14,16,0.78) 0%, rgba(26,14,16,0.2) 42%, transparent 70%)' }}
              />
              {dish.tag && (
                <span
                  style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(237,224,204,0.9)', color: '#1a0e10', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', fontFamily: 'var(--font-body)', fontWeight: 600 }}
                >
                  {dish.tag}
                </span>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                <h3
                  style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontSize: '1.25rem', fontWeight: 300, marginBottom: '4px' }}
                >
                  {dish.name}
                </h3>
                <p style={{ color: '#c84914', fontSize: '0.875rem' }}>{dish.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
