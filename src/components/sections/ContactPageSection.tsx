'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import type { SiteSettings } from '@/lib/mock-data'

interface ContactPageSectionProps {
  settings: SiteSettings
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #3a1e10',
  paddingBottom: '10px',
  color: '#ede0cc',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const infoLabel: React.CSSProperties = {
  color: 'rgba(237,224,204,0.4)',
  fontSize: '10px',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  fontFamily: 'var(--font-body)',
  marginBottom: '6px',
}

export function ContactPageSection({ settings }: ContactPageSectionProps) {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact', locale }),
      })
      const data = (await res.json()) as { success: boolean; message: string }
      if (data.success) {
        setStatus('success')
        setMsg(t('success'))
        setForm({ fullName: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
        setMsg(data.message)
      }
    } catch {
      setStatus('error')
      setMsg(t('error'))
    }
  }

  return (
    <section
      style={{ backgroundColor: '#1a0e10', padding: '80px 24px 96px' }}
      aria-labelledby="contact-heading"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <p style={{ color: '#c84914', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '16px' }}>
          {t('label')}
        </p>
        <h1
          id="contact-heading"
          style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', marginBottom: '64px', lineHeight: 1.1 }}
        >
          {t('title')}{' '}
          <em style={{ color: '#c84914', fontStyle: 'italic' }}>{t('titleEmphasis')}</em>
        </h1>

        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: '64px' }}
        >
          {/* Info + Map */}
          <div>
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}
            >
              <div>
                <p style={infoLabel}>{t('location')}</p>
                <p style={{ color: 'rgba(237,224,204,0.8)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
                  {settings.address}
                </p>
              </div>
              <div>
                <p style={infoLabel}>{t('phone')}</p>
                <a
                  href={`tel:${settings.phone.replace(/\D/g, '')}`}
                  style={{ color: 'rgba(237,224,204,0.8)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
                >
                  {settings.phone}
                </a>
              </div>
              <div>
                <p style={infoLabel}>{t('email')}</p>
                <a
                  href={`mailto:${settings.email}`}
                  style={{ color: 'rgba(237,224,204,0.8)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
                >
                  {settings.email}
                </a>
              </div>
              <div>
                <p style={infoLabel}>{t('hours')}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {settings.hours.map((h) => (
                    <li key={h.day} style={{ color: 'rgba(237,224,204,0.7)', fontSize: '0.8125rem', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
                      <span style={{ color: 'rgba(237,224,204,0.45)' }}>{h.day}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {settings.mapEmbedUrl && (
              <div style={{ aspectRatio: '16/9', backgroundColor: '#1e0d08', border: '1px solid #3a1e10', overflow: 'hidden' }}>
                <iframe
                  src={settings.mapEmbedUrl}
                  title={t('mapTitle')}
                  style={{ width: '100%', height: '100%', border: 'none', filter: 'grayscale(100%) invert(90%)', opacity: 0.8 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {/* Form */}
          <div style={{ backgroundColor: '#1a0b07', border: '1px solid #3a1e10', padding: '40px' }}>
            <h2
              style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontSize: '1.75rem', fontWeight: 300, marginBottom: '32px' }}
            >
              {t('sendMessage')}
            </h2>
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label htmlFor="fullName" style={{ ...infoLabel, display: 'block', marginBottom: '8px' }}>
                  {t('fullName')}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="email" style={{ ...infoLabel, display: 'block', marginBottom: '8px' }}>
                  {t('email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="phone" style={{ ...infoLabel, display: 'block', marginBottom: '8px' }}>
                  {t('phone')}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="message" style={{ ...infoLabel, display: 'block', marginBottom: '8px' }}>
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              {msg && (
                <p
                  style={{ fontSize: '0.875rem', color: status === 'success' ? '#b8975a' : '#c84914' }}
                  role="status"
                >
                  {msg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary"
                style={{ width: '100%', opacity: status === 'loading' ? 0.6 : 1 }}
              >
                {status === 'loading' ? t('sending') : t('submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
