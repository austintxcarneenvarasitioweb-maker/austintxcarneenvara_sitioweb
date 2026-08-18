import { MARQUEE_ITEMS } from '@/lib/mock-data'

export function MarqueeTicker() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

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
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              style={{ color: '#c84914', flexShrink: 0 }}
            >
              <path
                d="M7 0C7 0 10.5 4 10.5 7.5C10.5 9.5 9.5 11 9.5 11C9.5 11 10.5 10 10.5 8.5C10.5 8.5 12.5 10.5 12.5 13C12.5 15.5 10.2 18 7 18C3.8 18 1.5 15.5 1.5 13C1.5 10.5 3.5 8.5 3.5 8.5C3.5 10 4.5 11 4.5 11C4.5 11 3.5 9.5 3.5 7.5C3.5 4 7 0 7 0Z"
                fill="currentColor"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
