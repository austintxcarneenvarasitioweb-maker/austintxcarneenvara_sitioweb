'use client'

import { useTranslations } from 'next-intl'
import { FlameIcon } from '@/components/ui/FlameIcon'
import { HeroBackdrop } from '@/components/motion/HeroBackdrop'
import { HeroReveal, HeroRevealItem } from '@/components/motion/HeroReveal'
import { Link } from '@/i18n/navigation'

interface HeroProps {
  title: string
  subtitle: string
  imageUrl?: string
  videoUrl?: string
}

export function Hero({ title, subtitle, imageUrl, videoUrl }: HeroProps) {
  const t = useTranslations('hero')
  const titleParts = title.split('*')

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <HeroBackdrop
        imageUrl={imageUrl}
        videoUrl={videoUrl}
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
                textShadow: '0 1px 12px rgba(26,14,16,0.7)',
              }}
            >
              {t('label')}
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
                  <em style={{ color: 'hsl(20, 100%, 50%)', fontStyle: 'italic', fontWeight: 300, display: 'block', textShadow: '0 2px 18px rgba(26,14,16,0.65)' }}>
                    {part}
                  </em>
                </HeroRevealItem>
              )
            }
            if (!part.trim()) return null
            return (
              <HeroRevealItem key={i} style={endStyle}>
                <span style={{ display: 'block', fontWeight: 300, textShadow: '0 2px 22px rgba(26,14,16,0.75)' }}>{part.trim()}</span>
              </HeroRevealItem>
            )
          })}
        </h1>

        <HeroRevealItem>
          <p
            style={{
              color: 'rgba(217, 196, 163, 0.92)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              lineHeight: 1.7,
              maxWidth: '480px',
              marginBottom: '2rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              textShadow: '0 1px 14px rgba(26,14,16,0.8)',
            }}
          >
            {subtitle}
          </p>
        </HeroRevealItem>

        <HeroRevealItem>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/menu" className="btn-primary btn-hero">
              {t('viewMenu')}
            </Link>
            <Link href="/catering" className="btn-outline btn-hero">
              {t('catering')}
            </Link>
          </div>
        </HeroRevealItem>
      </HeroReveal>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{
          color: '#c4b396',
          textShadow: '0 1px 6px rgba(0,0,0,0.55)',
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
          }}
        >
          {t('scroll')}
        </span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
