'use client'

import { useEffect, useId, useRef, useState } from 'react'

export interface ThemeSelectOption {
  value: string
  label: string
}

interface ThemeSelectProps {
  id?: string
  name: string
  value: string
  placeholder?: string
  options: ThemeSelectOption[]
  onChange: (value: string) => void
}

export function ThemeSelect({ id, name, value, placeholder, options, onChange }: ThemeSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const autoId = useId()
  const selectId = id ?? autoId
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <input type="hidden" name={name} value={value} />
      <button
        id={selectId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="theme-select-trigger"
      >
        <span style={{ color: selected ? '#ede0cc' : 'rgba(237,224,204,0.4)' }}>
          {selected?.label || placeholder}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul role="listbox" className="theme-select-menu">
          {placeholder && (
            <li>
              <button
                type="button"
                role="option"
                aria-selected={!value}
                className="theme-select-option"
                onClick={() => {
                  onChange('')
                  setOpen(false)
                }}
              >
                {placeholder}
              </button>
            </li>
          )}
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`theme-select-option${option.value === value ? ' is-selected' : ''}`}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
