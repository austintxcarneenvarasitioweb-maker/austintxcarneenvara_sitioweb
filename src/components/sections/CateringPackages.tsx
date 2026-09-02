'use client'

import type { CateringPackage } from '@/lib/mock-data'
import { StaggerItem, StaggerReveal } from '@/components/motion/StaggerReveal'
import { useTranslations } from 'next-intl'

interface CateringPackagesProps {
  packages: CateringPackage[]
  selectedSlug?: string
  onSelect?: (slug: string) => void
}

export function CateringPackages({ packages, selectedSlug, onSelect }: CateringPackagesProps) {
  const t = useTranslations('sections')

  return (
    <section
      style={{ backgroundColor: '#1a0b07', padding: '80px 0 100px' }}
      aria-labelledby="packages-heading"
    >
      <StaggerReveal
        delay={0.1}
        stagger={0.12}
        inView
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}
      >
        <StaggerItem style={{ gridColumn: '1 / -1' }}>
          <p
            style={{ color: '#c84914', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '16px' }}
          >
            {t('packagesLabel')}
          </p>
          <h2
            id="packages-heading"
            style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', marginBottom: '48px' }}
          >
            {t('chooseExperience')}
          </h2>
        </StaggerItem>

        {packages.map((pkg) => {
          const selected = selectedSlug === pkg.slug
          return (
            <StaggerItem key={pkg.id}>
              <article
                style={{
                  position: 'relative',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  border: `1px solid ${selected || pkg.highlighted ? '#c84914' : '#3a1e10'}`,
                  outline: selected || pkg.highlighted ? '1px solid #c84914' : 'none',
                  outlineOffset: selected || pkg.highlighted ? '-1px' : undefined,
                }}
              >
                {pkg.highlighted && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#c84914',
                      color: '#ede0cc',
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t('mostPopular')}
                  </span>
                )}

                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c84914', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'var(--font-body)' }}
                >
                  <svg width="10" height="13" viewBox="0 0 14 18" fill="currentColor">
                    <path d="M7 0C7 0 10.5 4 10.5 7.5C10.5 9.5 9.5 11 9.5 11C9.5 11 10.5 10 10.5 8.5C10.5 8.5 12.5 10.5 12.5 13C12.5 15.5 10.2 18 7 18C3.8 18 1.5 15.5 1.5 13C1.5 10.5 3.5 8.5 3.5 8.5C3.5 10 4.5 11 4.5 11C4.5 11 3.5 9.5 3.5 7.5C3.5 4 7 0 7 0Z" />
                  </svg>
                  {pkg.guestRange}
                </div>

                <h3
                  style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontSize: '1.5rem', fontWeight: 300, marginBottom: '4px' }}
                >
                  {pkg.name}
                </h3>

                <p
                  style={{ color: '#c84914', fontSize: '0.875rem', fontStyle: 'italic', fontFamily: 'var(--font-body)', marginBottom: '16px' }}
                >
                  {pkg.price}
                </p>

                <p
                  style={{ color: 'rgba(237,224,204,0.55)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '24px', fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {pkg.description}
                </p>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '32px', flex: 1 }}>
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'rgba(237,224,204,0.8)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}
                    >
                      <span style={{ color: '#c84914', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onSelect?.(pkg.slug)}
                  className={selected ? 'btn-primary' : 'btn-outline'}
                  style={{ width: '100%', padding: '10px 16px', marginTop: 'auto' }}
                >
                  {selected ? t('selectedPackage') : t('selectPackage')}
                </button>
              </article>
            </StaggerItem>
          )
        })}
      </StaggerReveal>
    </section>
  )
}
