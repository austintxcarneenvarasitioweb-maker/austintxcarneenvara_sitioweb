'use client'

import type { Dish } from '@/lib/mock-data'
import { StaggerItem, StaggerReveal } from '@/components/motion/StaggerReveal'

interface FeaturedDishesProps {
  dishes: Dish[]
  /** Extra delay so the menu hero finishes before cards cascade in. */
  revealDelay?: number
}

export function FeaturedDishes({ dishes, revealDelay = 0.45 }: FeaturedDishesProps) {
  const featured = dishes.filter((d) => d.featured)

  return (
    <section
      style={{ backgroundColor: '#1a0e10', padding: '60px 0 80px' }}
      aria-labelledby="featured-heading"
    >
      <StaggerReveal
        delay={revealDelay}
        stagger={0.12}
        inView={false}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', gap: '16px' }}
      >
        <StaggerItem style={{ gridColumn: '1 / -1' }}>
          <h2
            id="featured-heading"
            style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: '24px' }}
          >
            Featured Dishes
          </h2>
        </StaggerItem>

        {featured.map((dish) => (
          <StaggerItem key={dish.id}>
            <article
              style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#1e0d08' }}
              className="group"
            >
              <div
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3a2010, #2a1208, #1a0a06)' }}
              />
              {dish.imageUrl && (
                <div
                  style={{ position: 'absolute', inset: 0, backgroundImage: `url(${dish.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s ease' }}
                  className="group-hover:scale-105"
                />
              )}
              {dish.tag && (
                <span
                  style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 10, backgroundColor: 'rgba(237,224,204,0.92)', color: '#1a0e10', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', fontFamily: 'var(--font-body)', fontWeight: 600 }}
                >
                  {dish.tag}
                </span>
              )}
              <div
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontSize: '1.375rem', fontWeight: 300, marginBottom: '4px' }}
                    >
                      {dish.name}
                    </h3>
                    {dish.description && (
                      <p
                        style={{ color: 'rgba(237,224,204,0.65)', fontSize: '0.8125rem', fontFamily: 'var(--font-body)', fontWeight: 300, lineHeight: 1.5 }}
                      >
                        {dish.description}
                      </p>
                    )}
                  </div>
                  <span
                    style={{ color: '#c84914', fontSize: '0.875rem', fontFamily: 'var(--font-body)', fontWeight: 500, flexShrink: 0 }}
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
