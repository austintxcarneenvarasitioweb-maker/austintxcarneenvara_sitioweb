'use client'

import { motion, useReducedMotion } from 'motion/react'

type HeroBackdropProps = {
  imageUrl?: string
  /** Soft gradient when no image */
  fallback?: 'home' | 'page'
  overlay?: 'home' | 'page'
  ariaLabel?: string
}

export function HeroBackdrop({
  imageUrl,
  fallback = 'page',
  overlay = 'page',
  ariaLabel,
}: HeroBackdropProps) {
  const reduce = useReducedMotion()

  const fallbackBg =
    fallback === 'home'
      ? 'linear-gradient(to bottom right, #0e0503, #1a0e10, #2a1208)'
      : 'linear-gradient(135deg, #0e0503 0%, #1a0805 40%, #2a1208 100%)'

  const overlayBg =
    overlay === 'home'
      ? 'linear-gradient(90deg, rgba(26,14,16,0.72) 0%, rgba(26,14,16,0.45) 45%, rgba(26,14,16,0.25) 100%)'
      : // Page heroes: body-toned veil so photos sit in the same palette as the site
        'linear-gradient(180deg, rgba(26,14,16,0.55) 0%, rgba(26,14,16,0.62) 45%, rgba(26,14,16,0.78) 100%)'

  return (
    <>
      <motion.div
        aria-hidden={!ariaLabel}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        initial={reduce ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          ...(imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }
            : { background: fallbackBg }),
          transformOrigin: 'center center',
          willChange: 'opacity, transform',
        }}
      />
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: overlayBg,
        }}
      />
    </>
  )
}
