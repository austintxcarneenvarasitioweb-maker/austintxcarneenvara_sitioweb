'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FlameIcon } from '@/components/ui/FlameIcon'

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'MENU', href: '/menu' },
  { label: 'CATERING', href: '/catering' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

function isLinkActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: scrolled ? '69px' : '84px',
          backgroundColor: 'transparent',
          borderBottom: scrolled ? '1px solid #d9c4a31a' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition:
            'height 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0 }}
            aria-label="Austin TX Carne en Vara"
          >
            <div
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(184,151,90,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b8975a' }}
            >
              <FlameIcon />
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <p
                style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontSize: '1.1rem', letterSpacing: '0.05em' }}
              >
                Austin TX
              </p>
              <p
                style={{ color: '#7a6558', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}
              >
                Carne en Vara
              </p>
            </div>
          </Link>

          {/* Right cluster: links + CTA */}
          <div className="hidden lg:flex items-center" style={{ gap: '32px', marginLeft: 'auto' }}>
            <nav className="flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = isLinkActive(pathname, link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link${active ? ' is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <Link href="/catering#quote" className="btn-primary" style={{ padding: '8px 16px', flexShrink: 0 }}>
              <FlameIcon style={{ color: 'currentColor', width: 16, height: 16 }} />
              Request Quote
            </Link>
          </div>

          {/* Hamburger — CTA lives in the mobile menu */}
          <button
            type="button"
            className="lg:hidden"
            style={{ color: '#ede0cc', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto' }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: 'currentColor', marginBottom: '6px' }} />
            <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: 'currentColor', marginBottom: '6px' }} />
            <span style={{ display: 'block', width: '16px', height: '1px', backgroundColor: 'currentColor' }} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 60, backgroundColor: '#1a0e10', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px' }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            style={{ position: 'absolute', top: '20px', right: '24px', color: '#ede0cc', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`nav-link${active ? ' is-active' : ''}`}
                aria-current={active ? 'page' : undefined}
                style={{ fontSize: '2rem', letterSpacing: '0.05em' }}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/catering#quote"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ marginTop: '16px' }}
          >
            <FlameIcon style={{ color: 'currentColor', width: 16, height: 16 }} />
            Request Quote
          </Link>
        </div>
      )}
    </>
  )
}
