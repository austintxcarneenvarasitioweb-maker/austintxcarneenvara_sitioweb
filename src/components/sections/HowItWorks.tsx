'use client'

import type { HowItWorksStep } from '@/lib/mock-data'
import { StaggerItem, StaggerReveal } from '@/components/motion/StaggerReveal'
import { useTranslations } from 'next-intl'

interface HowItWorksProps {
  steps: HowItWorksStep[]
  revealDelay?: number
}

function StepIcon({ icon }: { icon: HowItWorksStep['icon'] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#c84914',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    style: { display: 'block', marginTop: '0.5rem', marginBottom: '1rem' },
  }

  if (icon === 'people') {
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    )
  }

  if (icon === 'chef') {
    return (
      <svg {...common}>
        <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
        <path d="M6 17h12" />
      </svg>
    )
  }

  if (icon === 'truck') {
    return (
      <svg {...common}>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  )
}

export function HowItWorks({ steps, revealDelay = 0.45 }: HowItWorksProps) {
  const t = useTranslations('sections')
  const tSteps = useTranslations('howItWorks.steps')

  return (
    <section
      style={{ backgroundColor: '#140a07', padding: '64px 0 80px' }}
      aria-labelledby="how-heading"
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
        <h2
          id="how-heading"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            color: '#ede0cc',
            fontWeight: 400,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            marginBottom: '2.5rem',
          }}
        >
          {t('howCateringWorks')}
        </h2>

        <StaggerReveal
          delay={revealDelay}
          stagger={0.12}
          inView={false}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
          style={{ gap: '2rem' }}
        >
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: 'clamp(3rem, 5vw, 3.75rem)',
                    lineHeight: 1,
                    color: 'rgba(200, 73, 20, 0.25)',
                    fontWeight: 400,
                  }}
                >
                  {step.number}
                </span>
                <StepIcon icon={step.icon} />
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    color: '#ede0cc',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    lineHeight: 1.25,
                    margin: 0,
                  }}
                >
                  {tSteps(`${step.number}.title`)}
                </h3>
                <p
                  style={{
                    color: 'rgba(237, 224, 204, 0.6)',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    marginTop: '0.5rem',
                    fontFamily: '"Source Sans 3", system-ui, sans-serif',
                  }}
                >
                  {tSteps(`${step.number}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
