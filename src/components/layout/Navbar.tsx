'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { BrandLogo, BrandWordmark } from '@/components/brand/BrandLogo'
import { FlameIcon } from '@/components/ui/FlameIcon'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

function isLinkActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const t = useTranslations('nav')
  const tLang = useTranslations('language')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: t('home'), href: '/' as const },
    { label: t('menu'), href: '/menu' as const },
    { label: t('catering'), href: '/catering' as const },
    { label: t('about'), href: '/about' as const },
    { label: t('contact'), href: '/contact' as const },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return
    router.replace(pathname, { locale: newLocale })
    setMenuOpen(false)
  }

  const languageSwitcher = (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
      aria-label={tLang('switchTo')}
    >
      {routing.locales.map((code, index) => (
        <span key={code} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {index > 0 && (
            <span style={{ color: 'rgba(237,224,204,0.25)', fontSize: '11px' }}>|</span>
          )}
          <button
            type="button"
            onClick={() => switchLocale(code)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: code === locale ? '#c84914' : 'rgba(237,224,204,0.55)',
              fontWeight: code === locale ? 600 : 400,
            }}
            aria-current={code === locale ? 'true' : undefined}
          >
            {tLang(code)}
          </button>
        </span>
      ))}
    </div>
  )

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '84px',
          backgroundColor: 'transparent',
          borderBottom: scrolled ? '1px solid #d9c4a31a' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0, justifySelf: 'start' }}
            aria-label="Austin TX Carne en Vara"
          >
            <BrandLogo size={44} alt="" />
            <BrandWordmark />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 justify-self-center" aria-label={t('mainNav')}>
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

          <div className="hidden lg:flex items-center justify-self-end" style={{ gap: '24px' }}>
            {languageSwitcher}
            <Link href="/catering#quote" className="btn-primary" style={{ padding: '8px 16px', flexShrink: 0 }}>
              <FlameIcon style={{ color: 'currentColor', width: 16, height: 16 }} />
              {t('requestQuote')}
            </Link>
          </div>

          <div className="lg:hidden flex items-center justify-self-end" style={{ gridColumn: '3', gap: '16px' }}>
            {languageSwitcher}
            <button
              type="button"
              style={{ color: '#ede0cc', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setMenuOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={menuOpen}
            >
              <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: 'currentColor', marginBottom: '6px' }} />
              <span style={{ display: 'block', width: '24px', height: '1px', backgroundColor: 'currentColor', marginBottom: '6px' }} />
              <span style={{ display: 'block', width: '16px', height: '1px', backgroundColor: 'currentColor' }} />
            </button>
          </div>
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
            aria-label={t('closeMenu')}
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
            {t('requestQuote')}
          </Link>
        </div>
      )}
    </>
  )
}
