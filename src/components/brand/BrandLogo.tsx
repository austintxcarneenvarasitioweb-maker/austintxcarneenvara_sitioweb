'use client'

import { trocchi } from '@/lib/fonts'

type BrandLogoProps = {
  size?: number
  alt?: string
}

export function BrandLogo({ size = 40, alt = 'Austin TX Carne en Vara' }: BrandLogoProps) {
  return (
    <img
      src="/images/LOGO.png"
      alt={alt}
      width={size}
      height={size}
      draggable={false}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        display: 'block',
        flexShrink: 0,
      }}
    />
  )
}

export function BrandWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`${trocchi.className} brand-wordmark${compact ? ' is-compact' : ''}`}
      aria-hidden
    >
      <span className="brand-wordmark-top">AUSTIN TX</span>
      <svg className="brand-wordmark-rule" viewBox="0 0 120 4" preserveAspectRatio="none">
        <polygon points="0,2 60,1.15 120,2 60,2.85" fill="currentColor" />
      </svg>
      <span className="brand-wordmark-bottom">
        <WordmarkStar />
        CARNE EN VARA
        <WordmarkStar />
      </span>
    </span>
  )
}

function WordmarkStar() {
  return (
    <svg
      className="brand-wordmark-star"
      viewBox="0 0 24 24"
      width={8}
      height={8}
      aria-hidden
    >
      <polygon
        fill="currentColor"
        points="12,1 14.23,8.93 22.46,8.6 15.61,13.17 18.47,20.9 12,15.8 5.53,20.9 8.39,13.17 1.54,8.6 9.77,8.93"
      />
    </svg>
  )
}

export function AdminLogo() {
  return <BrandLogo size={88} />
}

export function AdminIcon() {
  return <BrandLogo size={26} alt="" />
}
