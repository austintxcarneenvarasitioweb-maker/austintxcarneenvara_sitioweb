import { getTranslations } from 'next-intl/server'
import { FlameIcon } from '@/components/ui/FlameIcon'

export async function MarqueeTicker() {
  const t = await getTranslations('marquee')
  const items = t.raw('items') as string[]
  const doubled = [...items, ...items, ...items, ...items]

  return (
    <div
      style={{ backgroundColor: '#1a0b07', borderTop: '1px solid #3a1e10', borderBottom: '1px solid #3a1e10', overflow: 'hidden', padding: '16px 0' }}
      aria-hidden="true"
    >
      <div className="animate-marquee" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', paddingLeft: '32px', paddingRight: '32px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                color: 'rgba(237,224,204,0.85)',
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              {item}
            </span>
            <FlameIcon
              className="w-4 h-4"
              style={{ color: 'hsl(20, 100%, 50%)', flexShrink: 0 }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
