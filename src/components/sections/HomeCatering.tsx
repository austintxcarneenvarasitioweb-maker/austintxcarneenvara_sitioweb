import type { CateringPackage } from '@/lib/mock-data'
import Link from 'next/link'

interface HomeCateringProps {
  title?: string
  description?: string
  imageUrl?: string
  packages: CateringPackage[]
}

export function HomeCatering({
  title = 'Bring the fire to *your event*',
  description,
  imageUrl,
  packages,
}: HomeCateringProps) {
  const titleParts = title.split('*')
  const preview = packages.slice(0, 4)

  return (
    <section
      style={{ backgroundColor: '#1a0b07', padding: '80px 0' }}
      aria-labelledby="home-catering-heading"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 items-center"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', gap: '48px' }}
      >
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '1 / 1.1', overflow: 'hidden' }}>
          {imageUrl ? (
            <div
              style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          ) : (
            <div
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3a2010, #2a1208, #1a0a06)' }}
            />
          )}
        </div>

        {/* Content */}
        <div>
          <p
            style={{ color: '#c84914', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '20px' }}
          >
            Catering &amp; Events
          </p>

          <h2
            id="home-catering-heading"
            style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, lineHeight: 1.1, fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '16px' }}
          >
            {titleParts.map((part, i) =>
              i % 2 === 1 ? (
                <em key={i} style={{ color: '#c84914', fontStyle: 'italic' }}>{part}</em>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h2>

          {description && (
            <p
              style={{ color: 'rgba(237,224,204,0.6)', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '32px', fontFamily: 'var(--font-body)', fontWeight: 300, maxWidth: '480px' }}
            >
              {description}
            </p>
          )}

          {/* Package mini-cards */}
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}
          >
            {preview.map((pkg) => (
              <div
                key={pkg.id}
                className="catering-card"
              style={{ border: '1px solid #3a1e10', padding: '20px' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c84914', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-body)' }}
                >
                  <svg width="10" height="13" viewBox="0 0 14 18" fill="currentColor">
                    <path d="M7 0C7 0 10.5 4 10.5 7.5C10.5 9.5 9.5 11 9.5 11C9.5 11 10.5 10 10.5 8.5C10.5 8.5 12.5 10.5 12.5 13C12.5 15.5 10.2 18 7 18C3.8 18 1.5 15.5 1.5 13C1.5 10.5 3.5 8.5 3.5 8.5C3.5 10 4.5 11 4.5 11C4.5 11 3.5 9.5 3.5 7.5C3.5 4 7 0 7 0Z" />
                  </svg>
                  {pkg.guestRange}
                </div>
                <h3
                  style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontSize: '1.25rem', fontWeight: 300, marginBottom: '4px' }}
                >
                  {pkg.name}
                </h3>
                <p style={{ color: '#b8975a', fontSize: '0.875rem' }}>{pkg.price}</p>
              </div>
            ))}
          </div>

          <Link href="/catering#quote" className="btn-primary btn-hero">
            Request a Quote →
          </Link>
        </div>
      </div>
    </section>
  )
}
