'use client'

import type { Dish } from '@/lib/mock-data'
import { CATEGORY_LABELS } from '@/lib/mock-data'
import { StaggerItem, StaggerReveal } from '@/components/motion/StaggerReveal'

interface PriceListProps {
  dishes: Dish[]
  footerNote?: string
}

export function PriceList({ dishes, footerNote }: PriceListProps) {
  const categories = Object.keys(CATEGORY_LABELS)
  const grouped = categories
    .map((cat) => ({
      key: cat,
      label: CATEGORY_LABELS[cat] as string,
      items: dishes.filter((d) => d.category === cat && d.available),
    }))
    .filter((g) => g.items.length > 0)

  const midpoint = Math.ceil(grouped.length / 2)
  const leftCol = grouped.slice(0, midpoint)
  const rightCol = grouped.slice(midpoint)

  const renderCategory = (group: (typeof grouped)[0]) => (
    <div key={group.key} style={{ marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <svg width="12" height="15" viewBox="0 0 14 18" fill="#c84914">
          <path d="M7 0C7 0 10.5 4 10.5 7.5C10.5 9.5 9.5 11 9.5 11C9.5 11 10.5 10 10.5 8.5C10.5 8.5 12.5 10.5 12.5 13C12.5 15.5 10.2 18 7 18C3.8 18 1.5 15.5 1.5 13C1.5 10.5 3.5 8.5 3.5 8.5C3.5 10 4.5 11 4.5 11C4.5 11 3.5 9.5 3.5 7.5C3.5 4 7 0 7 0Z" />
        </svg>
        <h3
          style={{ fontFamily: 'var(--font-display)', color: '#b8975a', fontSize: '0.9375rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 300 }}
        >
          {group.label}
        </h3>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {group.items.map((item) => (
          <li
            key={item.id}
            style={{ display: 'flex', alignItems: 'flex-end', fontSize: '0.875rem', marginBottom: '12px' }}
          >
            <span style={{ color: 'rgba(237,224,204,0.9)', flexShrink: 0, maxWidth: '70%', fontFamily: 'var(--font-body)' }}>
              {item.name}
              {item.description && (
                <span style={{ display: 'block', color: '#7a6558', fontSize: '12px', marginTop: '2px', fontWeight: 300 }}>
                  {item.description}
                </span>
              )}
            </span>
            <span
              style={{ flex: 1, borderBottom: '1px dotted rgba(122,101,88,0.4)', margin: '0 12px 4px', minWidth: '16px' }}
              aria-hidden="true"
            />
            <span style={{ color: '#ede0cc', flexShrink: 0, fontFamily: 'var(--font-body)', fontVariantNumeric: 'tabular-nums' }}>
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <section
      style={{ backgroundColor: '#1a0e10', padding: '64px 0 80px', borderTop: '1px solid #3a1e10' }}
      aria-labelledby="price-list-heading"
    >
      <StaggerReveal
        delay={0.1}
        stagger={0.12}
        inView
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}
      >
        <StaggerItem>
          <h2
            id="price-list-heading"
            style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: '48px' }}
          >
            Full Price List
          </h2>
        </StaggerItem>

        <StaggerItem>
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: '0 64px' }}
          >
            <div>{leftCol.map(renderCategory)}</div>
            <div>{rightCol.map(renderCategory)}</div>
          </div>
        </StaggerItem>

        {footerNote && (
          <StaggerItem>
            <p
              style={{ textAlign: 'center', color: '#7a6558', fontSize: '0.875rem', marginTop: '48px', letterSpacing: '0.1em', fontFamily: 'var(--font-body)' }}
            >
              {footerNote}
            </p>
          </StaggerItem>
        )}
      </StaggerReveal>
    </section>
  )
}
