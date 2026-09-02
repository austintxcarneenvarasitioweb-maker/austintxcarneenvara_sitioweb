import { getTranslations } from 'next-intl/server'
import { BrandLogo, BrandWordmark } from '@/components/brand/BrandLogo'
import { FlameIcon } from '@/components/ui/FlameIcon'
import { Link } from '@/i18n/navigation'
import type { SiteSettings } from '@/lib/mock-data'

interface FooterProps {
  settings: SiteSettings
  locale: string
}

export async function Footer({ settings, locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' })

  const exploreLinks = [
    { label: t('home'), href: '/' as const },
    { label: t('menu'), href: '/menu' as const },
    { label: t('catering'), href: '/catering' as const },
    { label: t('about'), href: '/about' as const },
    { label: t('contact'), href: '/contact' as const },
  ]

  const headingStyle: React.CSSProperties = {
    color: 'rgba(237,224,204,0.4)',
    fontSize: '10px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-display)',
    fontWeight: 300,
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  return (
    <footer style={{ backgroundColor: '#1a0e10', borderTop: '1px solid #3a1e10' }}>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '56px 24px', gap: '40px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <BrandLogo size={40} alt="" />
            <BrandWordmark />
          </div>
          <p style={{ color: 'rgba(237,224,204,0.5)', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            {t('brandDescription')}
          </p>
        </div>

        <div>
          <h4 style={headingStyle}>{t('explore')}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {exploreLinks.map((link) => (
              <li key={link.href} style={{ marginBottom: '8px' }}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={headingStyle}>
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6" cy="5.5" r="2.5" />
              <path d="M6 0C3.24 0 1 2.24 1 5c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z" />
            </svg>
            {t('visitUs')}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ color: 'rgba(237,224,204,0.65)', fontSize: '0.875rem', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
              {settings.address}
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href={`tel:${settings.phone.replace(/\D/g, '')}`} className="footer-link">
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="footer-link">
                {settings.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={headingStyle}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="6" />
              <path d="M7 4v3.5l2 2" />
            </svg>
            {t('hours')}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '24px' }}>
            {settings.hours.map((h) => (
              <li
                key={h.day}
                style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', color: 'rgba(237,224,204,0.6)', fontSize: '0.8125rem', marginBottom: '6px', fontFamily: 'var(--font-body)' }}
              >
                <span>{h.day}</span>
                <span style={{ textAlign: 'right' }}>{h.time}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: '16px' }}>
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="footer-link-sm">
                Instagram
              </a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="footer-link-sm">
                Facebook
              </a>
            )}
            {settings.tiktok && (
              <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="footer-link-sm">
                TikTok
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #3a1e10' }}>
        <div
          style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
        >
          <p style={{ color: '#7a6558', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
            © {new Date().getFullYear()} {settings.storeName}. {t('rights')}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7a6558', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
            <FlameIcon style={{ color: '#c84914' }} />
            {settings.tagline || t('tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
