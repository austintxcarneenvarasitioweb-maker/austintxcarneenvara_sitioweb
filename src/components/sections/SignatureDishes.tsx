import Link from 'next/link'
import type { Dish } from '@/lib/mock-data'

interface SignatureDishesProps {
  dishes: Dish[]
  title?: string
}

export function SignatureDishes({ dishes, title = 'Cooked over *live fire*' }: SignatureDishesProps) {
  const titleParts = title.split('*')
  const featured = dishes.filter((d) => d.featured).slice(0, 4)

  return (
    <section
      style={{ backgroundColor: '#1a0e10', padding: '80px 0 96px' }}
      aria-labelledby="signature-heading"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header row */}
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
              Signature Favorites
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
            Full Menu →
          </Link>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: '12px' }}
        >
          {featured.map((dish) => (
            <article
              key={dish.id}
              style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#1e0d08', cursor: 'default' }}
              className="group"
            >
              {/* Placeholder gradient */}
              <div
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3a2010, #2a1208, #1a0a06)' }}
              />
              {dish.imageUrl && (
                <div
                  style={{ position: 'absolute', inset: 0, backgroundImage: `url(${dish.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s ease' }}
                  className="group-hover:scale-105"
                />
              )}
              {/* Overlay */}
              <div
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', transition: 'background 0.3s' }}
                className="group-hover:bg-black/45"
              />
              {/* Tag */}
              {dish.tag && (
                <span
                  style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(237,224,204,0.9)', color: '#1a0e10', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', fontFamily: 'var(--font-body)', fontWeight: 600 }}
                >
                  {dish.tag}
                </span>
              )}
              {/* Name & price */}
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
