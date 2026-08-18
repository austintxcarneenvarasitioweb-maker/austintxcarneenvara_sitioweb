'use client'

import { motion, useReducedMotion } from 'motion/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'

const COVER_MS = 350

/**
 * Soft “lights out” on internal nav only.
 * No page opacity animation — that caused a double-fade flicker.
 * Hero content handles its own staggered entrance under the lifting cover.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const reduce = useReducedMotion()
  const [overlay, setOverlay] = useState(false)
  const pendingHref = useRef<string | null>(null)
  const navigating = useRef(false)

  // New route ready under the cover → lift it once
  useEffect(() => {
    navigating.current = false
    pendingHref.current = null
    setOverlay(false)
  }, [pathname])

  // After cover finishes coming in, navigate
  useEffect(() => {
    if (!overlay) return
    const href = pendingHref.current
    if (!href) return

    const timer = window.setTimeout(() => {
      pendingHref.current = null
      router.push(href)
    }, COVER_MS)

    return () => window.clearTimeout(timer)
  }, [overlay, router])

  useEffect(() => {
    if (reduce) return

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || navigating.current) return
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as HTMLElement | null)?.closest?.('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const url = new URL(href, window.location.origin)
      if (url.origin !== window.location.origin) return
      if (url.pathname === pathname && url.search === window.location.search) return

      event.preventDefault()
      navigating.current = true
      pendingHref.current = url.pathname + url.search + url.hash
      setOverlay(true)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname, reduce])

  return (
    <>
      {children}

      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: overlay ? 1 : 0 }}
        transition={{ duration: COVER_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          backgroundColor: '#1a0e10',
          pointerEvents: overlay ? 'auto' : 'none',
        }}
      />
    </>
  )
}
