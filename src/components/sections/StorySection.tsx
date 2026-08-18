'use client'

import { useLenis } from 'lenis/react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { useEffect, useRef } from 'react'
import type { StorySection } from '@/lib/mock-data'

interface StorySectionProps {
  sections: StorySection[]
}

function StoryBlock({ section, index }: { section: StorySection; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduce = useReducedMotion()
  const progress = useMotionValue(0.5)
  const imageLeft = index % 2 === 0

  const updateProgress = () => {
    const el = ref.current
    if (!el || reduce) return
    const rect = el.getBoundingClientRect()
    const viewH = window.innerHeight
    const total = viewH + rect.height
    const current = viewH - rect.top
    progress.set(Math.min(1, Math.max(0, current / total)))
  }

  // Lenis drives most scrolls; native listeners cover reduced-motion / no-Lenis.
  useLenis(updateProgress)

  useEffect(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
    // progress is a stable MotionValue; reduce is the only reactive input
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  const imageY = useTransform(progress, [0, 1], reduce ? ['0%', '0%'] : ['-14%', '14%'])

  const imageCol = (
    <div
      className={`relative min-h-[50vh] lg:min-h-[65vh] overflow-hidden${imageLeft ? '' : ' lg:order-2'}`}
    >
      {section.imageUrl ? (
        <motion.div
          className="absolute inset-x-0 bg-cover bg-center will-change-transform"
          style={{
            top: '-14%',
            bottom: '-14%',
            y: imageY,
            backgroundImage: `url(${section.imageUrl})`,
          }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #3a2010, #2a1208, #1a0a06)' }}
        />
      )}
    </div>
  )

  const textCol = (
    <div
      className={`flex flex-col justify-center${imageLeft ? '' : ' lg:order-1'}`}
      style={{
        backgroundColor: '#1a0e10',
        padding: 'clamp(48px, 6vw, 96px) clamp(24px, 4vw, 64px)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          color: '#b8975a',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          lineHeight: 1,
          marginBottom: '1rem',
          fontWeight: 300,
        }}
      >
        {section.number}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          color: '#ede0cc',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          fontWeight: 300,
          lineHeight: 1.2,
          marginBottom: '1.5rem',
        }}
      >
        {section.title}
      </h3>
      <p
        style={{
          color: 'rgba(237,224,204,0.6)',
          fontSize: '0.9375rem',
          lineHeight: 1.8,
          maxWidth: '420px',
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
        }}
      >
        {section.body}
      </p>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2"
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {imageLeft ? imageCol : textCol}
      {imageLeft ? textCol : imageCol}
    </motion.div>
  )
}

export function StorySections({ sections }: StorySectionProps) {
  return (
    <section aria-label="Our story" style={{ padding: '100px 24px 0' }}>
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '100px',
        }}
      >
        {sections.map((section, index) => (
          <StoryBlock key={section.number} section={section} index={index} />
        ))}
      </div>
    </section>
  )
}
