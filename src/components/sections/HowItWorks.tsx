'use client'

import type { HowItWorksStep } from '@/lib/mock-data'
import { StaggerItem, StaggerReveal } from '@/components/motion/StaggerReveal'

interface HowItWorksProps {
  steps: HowItWorksStep[]
  revealDelay?: number
}

function StepIcon({ icon }: { icon: HowItWorksStep['icon'] }) {
  const paths: Record<HowItWorksStep['icon'], string> = {
    people: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    chef: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    truck: 'M18 18.5a1.5 1.5 0 0 0-1.5-1.5 1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5zM6 18.5A1.5 1.5 0 0 1 4.5 17 1.5 1.5 0 0 1 6 15.5 1.5 1.5 0 0 1 7.5 17 1.5 1.5 0 0 1 6 18.5zM20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4z',
    calendar: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z',
  }

  return (
    <svg
      style={{ width: '24px', height: '24px', color: '#c84914' }}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={paths[icon]} />
    </svg>
  )
}

export function HowItWorks({ steps, revealDelay = 0.45 }: HowItWorksProps) {
  return (
    <section
      style={{ backgroundColor: '#1a0e10', padding: '64px 0 80px' }}
      aria-labelledby="how-heading"
    >
      <StaggerReveal
        delay={revealDelay}
        stagger={0.12}
        inView={false}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', gap: '40px' }}
      >
        <StaggerItem style={{ gridColumn: '1 / -1' }}>
          <h2
            id="how-heading"
            style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: '16px' }}
          >
            How catering works
          </h2>
        </StaggerItem>

        {steps.map((step) => (
          <StaggerItem key={step.number}>
            <p
              style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: '#b8975a', fontSize: '3rem', lineHeight: 1, marginBottom: '16px', fontWeight: 300 }}
            >
              {step.number}
            </p>
            <StepIcon icon={step.icon} />
            <h3
              style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontSize: '1.25rem', fontWeight: 300, marginTop: '16px', marginBottom: '8px' }}
            >
              {step.title}
            </h3>
            <p style={{ color: '#7a6558', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
              {step.description}
            </p>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  )
}
