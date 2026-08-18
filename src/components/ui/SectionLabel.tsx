import { FlameIcon } from './FlameIcon'

interface SectionLabelProps {
  children: string
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      <FlameIcon style={{ color: '#c84914', flexShrink: 0 }} />
      <span
        style={{
          color: '#c84914',
          fontSize: '11px',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
        }}
      >
        {children}
      </span>
    </div>
  )
}
