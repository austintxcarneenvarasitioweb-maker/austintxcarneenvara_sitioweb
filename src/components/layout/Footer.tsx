import Link from 'next/link'
import { FlameIcon } from '@/components/ui/FlameIcon'
import type { SiteSettings } from '@/lib/mock-data'

interface FooterProps {
  settings: SiteSettings
}

export function Footer({ settings }: FooterProps) {
  const exploreLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Catering', href: '/catering' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
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
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(184,151,90,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b8975a' }}
            >
              <FlameIcon />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontSize: '1.1rem' }}>Austin TX</p>
              <p style={{ color: '#7a6558', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Carne en Vara</p>
            </div>
          </div>
          <p style={{ color: 'rgba(237,224,204,0.5)', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Authentic Venezuelan fire-grilled meats, brought to Texas with fire, smoke &amp; family tradition.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 style={headingStyle}>Explore</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {exploreLinks.map((link) => (
              <li key={link.href} style={{ marginBottom: '8px' }}>
                <Link
                  href={link.href}
                  style={{ color: 'rgba(237,224,204,0.65)', fontSize: '0.9375rem', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit Us */}
        <div>
          <h4 style={headingStyle}>
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6" cy="5.5" r="2.5" />
              <path d="M6 0C3.24 0 1 2.24 1 5c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z" />
            </svg>
            Visit Us
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ color: 'rgba(237,224,204,0.65)', fontSize: '0.875rem', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
              {settings.address}
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href={`tel:${settings.phone.replace(/\D/g, '')}`} style={{ color: 'rgba(237,224,204,0.65)', fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} style={{ color: 'rgba(237,224,204,0.65)', fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                {settings.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 style={headingStyle}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="6" />
              <path d="M7 4v3.5l2 2" />
            </svg>
            Hours
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
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(237,224,204,0.5)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>
                Instagram
              </a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(237,224,204,0.5)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>
                Facebook
              </a>
            )}
            {settings.tiktok && (
              <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(237,224,204,0.5)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>
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
            © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7a6558', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
            <FlameIcon style={{ color: '#c84914' }} />
            {settings.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}
