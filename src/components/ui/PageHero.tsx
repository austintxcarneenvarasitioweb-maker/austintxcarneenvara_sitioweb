'use client'

import { HeroBackdrop } from '@/components/motion/HeroBackdrop'
import { HeroReveal, HeroRevealItem } from '@/components/motion/HeroReveal'

interface PageHeroProps {
  label?: string
  title: string
  subtitle?: string
  imageUrl?: string
  children?: React.ReactNode
  align?: 'left' | 'center'
}

export function PageHero({
  label,
  title,
  subtitle,
  imageUrl,
  children,
  align = 'left',
}: PageHeroProps) {
  const titleParts = title.split('*')

  return (
    <section
      style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}
      aria-label={title.replace(/\*/g, '')}
    >
      <HeroBackdrop imageUrl={imageUrl} fallback="page" overlay="page" />

      <HeroReveal
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '140px 24px 80px',
          textAlign: align === 'center' ? 'center' : 'left',
          display: align === 'center' ? 'flex' : 'block',
          flexDirection: align === 'center' ? 'column' : undefined,
          alignItems: align === 'center' ? 'center' : undefined,
        }}
      >
        {label && (
          <HeroRevealItem>
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'hsl(20, 100%, 50%)',
                }}
              />
              <p
                style={{
                  color: 'hsl(20, 100%, 50%)',
                  fontSize: '11px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {label}
              </p>
            </div>
          </HeroRevealItem>
        )}

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            color: 'rgb(217, 196, 163)',
            fontWeight: 300,
            fontSize: 'clamp(2.75rem, 8vw, 6rem)',
            lineHeight: 1,
            letterSpacing: '-0.025em',
            maxWidth: '64rem',
            display: 'contents',
          }}
        >
          {titleParts.map((part, i) =>
            i % 2 === 1 ? (
              <HeroRevealItem key={i}>
                <em style={{ color: 'hsl(20, 100%, 50%)', fontStyle: 'italic', fontWeight: 300, display: 'block' }}>
                  {part}
                </em>
              </HeroRevealItem>
            ) : part.trim() ? (
              <HeroRevealItem key={i}>
                <span style={{ display: 'block', fontWeight: 300 }}>{part.trim()}</span>
              </HeroRevealItem>
            ) : null,
          )}
        </h1>

        {subtitle && (
          <HeroRevealItem>
            <p
              style={{ color: 'rgba(237,224,204,0.7)', fontSize: '1rem', marginTop: '16px', maxWidth: '540px', lineHeight: 1.75, fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              {subtitle}
            </p>
          </HeroRevealItem>
        )}

        {children && (
          <HeroRevealItem>
            <div style={{ marginTop: '32px' }}>{children}</div>
          </HeroRevealItem>
        )}
      </HeroReveal>
    </section>
  )
}
