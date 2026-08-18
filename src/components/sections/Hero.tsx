'use client'

import Link from 'next/link'
import { FlameIcon } from '@/components/ui/FlameIcon'
import { HeroBackdrop } from '@/components/motion/HeroBackdrop'
import { HeroReveal, HeroRevealItem } from '@/components/motion/HeroReveal'

interface HeroProps {
  title: string
  subtitle: string
  imageUrl?: string
}

export function Hero({ title, subtitle, imageUrl }: HeroProps) {
  const titleParts = title.split('*')

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <HeroBackdrop
        imageUrl={imageUrl}
        fallback="home"
        overlay="home"
        ariaLabel="Fire-grilled meats"
      />

      <HeroReveal
        className="relative z-10 w-full"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '140px 24px 80px' }}
      >
        <HeroRevealItem className="inline-flex items-center gap-2.5 mb-6">
          <FlameIcon className="animate-float" style={{ color: 'hsl(20, 100%, 50%)', flexShrink: 0 }} />
          <div className="flex flex-col gap-2">
            <span style={{ display: 'block', width: '100%', height: '1px', backgroundColor: 'rgba(217,196,163,0.55)' }} />
            <p
              style={{
                color: '#d9c4a3',
                fontSize: '11px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              Austin TX · Carne en Vara
            </p>
          </div>
        </HeroRevealItem>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            color: 'rgb(217, 196, 163)',
            fontWeight: 300,
            fontSize: 'clamp(3.5rem, 12vw, 8rem)',
            lineHeight: 1,
            letterSpacing: '-0.025em',
            maxWidth: '64rem',
            display: 'contents',
          }}
        >
          {titleParts.map((part, i) => {
            const isLast = i === titleParts.length - 1 || titleParts.slice(i + 1).every((p) => !p.trim())
            const endStyle = isLast ? { marginBottom: '1.5rem' } : undefined
            if (i % 2 === 1) {
              return (
                <HeroRevealItem key={i} style={endStyle}>
                  <em style={{ color: 'hsl(20, 100%, 50%)', fontStyle: 'italic', fontWeight: 300, display: 'block' }}>
                    {part}
                  </em>
                </HeroRevealItem>
              )
            }
            if (!part.trim()) return null
            return (
              <HeroRevealItem key={i} style={endStyle}>
                <span style={{ display: 'block', fontWeight: 300 }}>{part.trim()}</span>
              </HeroRevealItem>
            )
          })}
        </h1>

        <HeroRevealItem>
          <p
            style={{
              color: 'rgba(217, 196, 163, 0.85)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              lineHeight: 1.7,
              maxWidth: '480px',
              marginBottom: '2rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>
        </HeroRevealItem>

        <HeroRevealItem>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/menu" className="btn-primary btn-hero">
              View Menu →
            </Link>
            <Link href="/catering" className="btn-outline btn-hero">
              Catering
            </Link>
          </div>
        </HeroRevealItem>
      </HeroReveal>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: '#7a6558' }}
        aria-hidden="true"
      >
        <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
