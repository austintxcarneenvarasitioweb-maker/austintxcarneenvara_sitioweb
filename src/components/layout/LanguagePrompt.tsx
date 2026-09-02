'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'

const STORAGE_KEY = 'cev-locale-chosen'
const LOCALE_COOKIE = 'NEXT_LOCALE'

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`
}

export function LanguagePrompt() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setOpen(true)
        document.body.style.overflow = 'hidden'
      }
    } catch {
      setOpen(true)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSelect = (newLocale: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore storage errors
    }
    setLocaleCookie(newLocale)
    setOpen(false)
    document.body.style.overflow = ''
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale })
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-prompt-title"
      aria-describedby="language-prompt-desc"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(20, 10, 7, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#1a0e10',
          border: '1px solid #3a1e10',
          padding: '48px 40px',
          textAlign: 'center',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.45)',
        }}
      >
        <div style={{ margin: '0 auto 24px', display: 'flex', justifyContent: 'center' }}>
          <BrandLogo size={64} />
        </div>

        <p
          style={{
            color: '#c84914',
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          Austin TX · Carne en Vara
        </p>

        <h2
          id="language-prompt-title"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#ede0cc',
            fontWeight: 400,
            fontSize: '1.75rem',
            lineHeight: 1.25,
            marginBottom: '8px',
          }}
        >
          Choose your language
        </h2>
        <p
          id="language-prompt-desc"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'rgba(237,224,204,0.65)',
            fontStyle: 'italic',
            fontSize: '1.25rem',
            marginBottom: '32px',
          }}
        >
          Elige tu idioma
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            type="button"
            onClick={() => handleSelect('en')}
            className="btn-outline"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => handleSelect('es')}
            className="btn-outline"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Español
          </button>
        </div>
      </div>
    </div>
  )
}
