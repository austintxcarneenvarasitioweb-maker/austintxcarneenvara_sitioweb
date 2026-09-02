'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import type { CateringPackage } from '@/lib/mock-data'
import { StaggerItem, StaggerReveal } from '@/components/motion/StaggerReveal'
import { ThemeSelect } from '@/components/ui/ThemeSelect'

interface QuoteFormProps {
  title?: string
  description?: string
  packages: CateringPackage[]
  selectedSlug?: string
}

const initialForm = {
  fullName: '',
  company: '',
  phone: '',
  email: '',
  eventDate: '',
  guestCount: '',
  location: '',
  package: '',
  budget: '',
  preferredContact: 'email',
  notes: '',
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #3a1e10',
  paddingBottom: '10px',
  color: '#ede0cc',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-body)',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  color: 'rgba(237,224,204,0.45)',
  fontSize: '10px',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  fontFamily: 'var(--font-body)',
  display: 'block',
  marginBottom: '6px',
}

export function QuoteForm({ title = "Let's plan your feast", description, packages, selectedSlug = '' }: QuoteFormProps) {
  const t = useTranslations('quote')
  const locale = useLocale()
  const [form, setForm] = useState({ ...initialForm, package: selectedSlug })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (selectedSlug) {
      setForm((prev) => ({ ...prev, package: selectedSlug }))
    }
  }, [selectedSlug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          package: packages.find((p) => p.slug === form.package)?.name || form.package,
          source: 'catering',
          locale,
        }),
      })
      const data = (await res.json()) as { success: boolean; message: string }
      if (data.success) {
        setStatus('success')
        setMessage(t('success'))
        setForm(initialForm)
      } else {
        setStatus('error')
        setMessage(data.message)
      }
    } catch {
      setStatus('error')
      setMessage(t('error'))
    }
  }

  return (
    <section
      id="quote"
      style={{ backgroundColor: '#1a0e10', padding: '80px 0 96px' }}
      aria-labelledby="quote-heading"
    >
      <StaggerReveal
        delay={0.1}
        stagger={0.14}
        inView
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', gap: '64px' }}
      >
        <StaggerItem>
          <p style={{ color: '#c84914', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '16px' }}>
            {t('label')}
          </p>
          <h2
            id="quote-heading"
            style={{ fontFamily: 'var(--font-display)', color: '#ede0cc', fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1, marginBottom: '16px' }}
          >
            {title}
          </h2>
          {description && (
            <p style={{ color: '#7a6558', fontSize: '0.9375rem', lineHeight: 1.75, fontFamily: 'var(--font-body)', fontWeight: 300, maxWidth: '440px' }}>
              {description}
            </p>
          )}
        </StaggerItem>

        <StaggerItem>
        <form onSubmit={handleSubmit} noValidate aria-label={t('formLabel')}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 24px', marginBottom: '24px' }}
          >
            <div>
              <label htmlFor="fullName" style={labelStyle}>{t('fullName')}</label>
              <input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="company" style={labelStyle}>{t('company')}</label>
              <input id="company" name="company" value={form.company} onChange={handleChange} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="phone" style={labelStyle}>{t('phone')}</label>
              <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="email" style={labelStyle}>{t('email')}</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="eventDate" style={labelStyle}>{t('eventDate')}</label>
              <input id="eventDate" name="eventDate" type="date" required value={form.eventDate} onChange={handleChange} style={{ ...fieldStyle, colorScheme: 'dark' }} />
            </div>
            <div>
              <label htmlFor="guestCount" style={labelStyle}>{t('guestCount')}</label>
              <input id="guestCount" name="guestCount" required placeholder={t('guestCountPlaceholder')} value={form.guestCount} onChange={handleChange} style={fieldStyle} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="location" style={labelStyle}>{t('location')}</label>
              <input id="location" name="location" required placeholder={t('locationPlaceholder')} value={form.location} onChange={handleChange} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="package" style={labelStyle}>{t('package')}</label>
              <ThemeSelect
                id="package"
                name="package"
                value={form.package}
                placeholder={t('select')}
                options={packages.map((p) => ({ value: p.slug, label: p.name }))}
                onChange={(value) => setForm((prev) => ({ ...prev, package: value }))}
              />
            </div>
            <div>
              <label htmlFor="budget" style={labelStyle}>{t('budget')}</label>
              <input id="budget" name="budget" placeholder={t('budgetPlaceholder')} value={form.budget} onChange={handleChange} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="preferredContact" style={labelStyle}>{t('preferredContact')}</label>
              <ThemeSelect
                id="preferredContact"
                name="preferredContact"
                value={form.preferredContact}
                options={[
                  { value: 'email', label: t('contactEmail') },
                  { value: 'phone', label: t('contactPhone') },
                  { value: 'whatsapp', label: t('contactWhatsApp') },
                ]}
                onChange={(value) => setForm((prev) => ({ ...prev, preferredContact: value }))}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="notes" style={labelStyle}>{t('notes')}</label>
              <textarea id="notes" name="notes" rows={3} placeholder={t('notesPlaceholder')} value={form.notes} onChange={handleChange} style={{ ...fieldStyle, resize: 'none' }} />
            </div>
          </div>

          {message && (
            <p style={{ fontSize: '0.875rem', color: status === 'success' ? '#b8975a' : '#c84914', marginBottom: '16px' }} role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary"
            style={{ opacity: status === 'loading' ? 0.6 : 1 }}
          >
            {status === 'loading' ? t('sending') : t('submit')}
          </button>
        </form>
        </StaggerItem>
      </StaggerReveal>
    </section>
  )
}
