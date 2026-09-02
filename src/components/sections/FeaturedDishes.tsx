'use client'

import type { Dish } from '@/lib/mock-data'
import { StaggerItem, StaggerReveal } from '@/components/motion/StaggerReveal'
import { useTranslations } from 'next-intl'

interface FeaturedDishesProps {
  dishes: Dish[]
  /** Extra delay so the menu hero finishes before cards cascade in. */
  revealDelay?: number
  featuredOnly?: boolean
}

export function FeaturedDishes({ dishes, revealDelay = 0.45, featuredOnly = true }: FeaturedDishesProps) {
  const t = useTranslations('sections')
  const items = (featuredOnly ? dishes.filter((d) => d.featured) : dishes.filter((d) => d.available !== false))
    .slice()
    .sort((a, b) => a.order - b.order)

  return (
    <section
      style={{ backgroundColor: '#1a0e10', padding: '60px 0 80px' }}
      aria-label={featuredOnly ? undefined : t('featuredDishes')}
      aria-labelledby={featuredOnly ? 'featured-heading' : undefined}
    >
      <StaggerReveal
        delay={revealDelay}
        stagger={0.12}
        inView={false}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', gap: '16px' }}
      >
        {featuredOnly && (
          <StaggerItem style={{ gridColumn: '1 / -1' }}>
            <h2
              id="featured-heading"
              style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: '24px' }}
            >
              {t('featuredDishes')}
            </h2>
          </StaggerItem>
        )}

        {items.map((dish) => (
          <StaggerItem key={dish.id}>
            <article
              style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#1e0d08' }}
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
              {dish.tag && (
                <span
                  style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 10, backgroundColor: 'rgba(237,224,204,0.92)', color: '#1a0e10', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', fontFamily: 'var(--font-body)', fontWeight: 600 }}
                >
                  {dish.tag}
                </span>
              )}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  padding: '64px 20px 20px',
                  background:
                    'linear-gradient(to top, rgba(26,14,16,0.96) 0%, rgba(26,14,16,0.82) 38%, rgba(26,14,16,0.4) 68%, transparent 100%)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: '#f6ecd8',
                        fontSize: '1.375rem',
                        fontWeight: 400,
                        marginBottom: '4px',
                        textShadow: '0 1px 2px rgba(0,0,0,0.75), 0 4px 18px rgba(0,0,0,0.55)',
                      }}
                    >
                      {dish.name}
                    </h3>
                    {dish.description && (
                      <p
                        style={{
                          color: 'rgba(246,236,216,0.88)',
                          fontSize: '0.8125rem',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 300,
                          lineHeight: 1.5,
                          textShadow: '0 1px 8px rgba(0,0,0,0.7)',
                        }}
                      >
                        {dish.description}
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      color: '#e85d24',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      flexShrink: 0,
                      textShadow: '0 1px 8px rgba(0,0,0,0.7)',
                    }}
                  >
                    {dish.price}
                  </span>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  )
}
