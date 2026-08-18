'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'

function ScrollToTopOnRoute() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])

  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(!media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  if (!enabled) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
        syncTouch: false,
      }}
    >
      <ScrollToTopOnRoute />
      {children}
    </ReactLenis>
  )
}
