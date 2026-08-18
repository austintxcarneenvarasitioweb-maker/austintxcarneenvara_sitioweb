import Link from 'next/link'

interface AboutCTAProps {
  title?: string
}

export function AboutCTA({ title = 'Taste the tradition' }: AboutCTAProps) {
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
            Explore the Menu →
          </Link>
          <Link href="/catering#quote" className="btn-outline">
            Book Catering
          </Link>
        </div>
      </div>
    </section>
  )
}
