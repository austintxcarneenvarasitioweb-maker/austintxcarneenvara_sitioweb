import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'outline' | 'ghost'
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export function Button({
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  children,
  className,
  disabled,
}: ButtonProps) {
  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'btn-outline border-transparent hover:border-[#d9c4a3]',
  }

  const classes = cn(variants[variant], disabled && 'opacity-60 cursor-not-allowed', className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
