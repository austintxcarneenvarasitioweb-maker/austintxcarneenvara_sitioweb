'use client'

import type { Dish } from '@/lib/mock-data'
import { StaggerItem, StaggerReveal } from '@/components/motion/StaggerReveal'
import { useTranslations } from 'next-intl'

const CATEGORY_KEYS = [
  'en-vara',
  'platos',
  'cachapas',
  'adicionales',
  'contornos',
  'combos',
  'sopa',
  'bebidas',
  'postres',
] as const

interface PriceListProps {
  dishes: Dish[]
  footerNote?: string
}

export function PriceList({ dishes, footerNote }: PriceListProps) {
  const t = useTranslations('sections')
  const tCategories = useTranslations('categories')
  const categories = [...CATEGORY_KEYS]
  const grouped = categories
    .map((cat) => ({
      key: cat,
      label: tCategories(cat),
      items: dishes
        .filter((d) => d.category === cat && d.available)
        .sort((a, b) => a.order - b.order),
    }))
    .filter((g) => g.items.length > 0)

  const midpoint = Math.ceil(grouped.length / 2)
  const leftCol = grouped.slice(0, midpoint)
  const rightCol = grouped.slice(midpoint)

  const renderCategory = (group: (typeof grouped)[0]) => (
    <div key={group.key} style={{ marginBottom: '2.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ color: '#ff5500', flexShrink: 0 }}
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
        <h3
          style={{
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
            color: '#b8975a',
            fontSize: '0.7rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            fontWeight: 500,
            margin: 0,
          }}
        >
          {group.label}
        </h3>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {group.items.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 0,
              marginBottom: '0.85rem',
              fontFamily: '"Source Sans 3", system-ui, sans-serif',
              fontSize: '0.9375rem',
              lineHeight: 1.35,
            }}
          >
            <span
              style={{
                color: 'rgba(237, 224, 204, 0.92)',
                flexShrink: 1,
                fontWeight: 400,
              }}
            >
              {item.name}
            </span>
            <span
              className="dotted-leader"
              style={{
                flex: 1,
                borderBottom: '1px dotted rgba(122, 101, 88, 0.55)',
                margin: '0 0.75rem',
                minWidth: '1rem',
                alignSelf: 'flex-end',
                marginBottom: '0.35rem',
              }}
              aria-hidden="true"
            />
            <span
              style={{
                color: '#ede0cc',
                flexShrink: 0,
                fontVariantNumeric: 'tabular-nums',
                fontWeight: 400,
              }}
            >
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <section
      style={{
        backgroundColor: '#140a07',
        padding: '4.5rem 0 5.5rem',
        borderTop: '1px solid #3a1e10',
      }}
      aria-labelledby="price-list-heading"
    >
      <StaggerReveal
        delay={0.1}
        stagger={0.12}
        inView
        style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}
      >
        <StaggerItem>
          <h2
            id="price-list-heading"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: '#b8975a',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              marginBottom: '2.75rem',
              letterSpacing: '0.01em',
            }}
          >
            {t('fullPriceList')}
          </h2>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0 4.5rem' }}>
            <div>{leftCol.map(renderCategory)}</div>
            <div>{rightCol.map(renderCategory)}</div>
          </div>
        </StaggerItem>

        {footerNote && (
          <StaggerItem>
            <p
              style={{
                textAlign: 'center',
                color: '#7a6558',
                fontSize: '0.8125rem',
                marginTop: '2.5rem',
                letterSpacing: '0.12em',
                fontFamily: '"Source Sans 3", system-ui, sans-serif',
              }}
            >
              {footerNote}
            </p>
          </StaggerItem>
        )}
      </StaggerReveal>
    </section>
  )
}
