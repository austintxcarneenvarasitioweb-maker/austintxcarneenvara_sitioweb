'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

type StaggerRevealProps = {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  /** Delay before the first child starts (lets the hero finish first). */
  delay?: number
  stagger?: number
  /** If true, waits until scrolled into view. If false, plays on mount after `delay`. */
  inView?: boolean
} & Omit<HTMLMotionProps<'div'>, 'children'>

export function StaggerReveal({
  children,
  className,
  style,
  delay = 0,
  stagger = 0.1,
  inView = true,
  ...props
}: StaggerRevealProps) {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      {...(inView
        ? { whileInView: 'visible', viewport: { once: true, amount: 0.12 } }
        : { animate: 'visible' })}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  style,
  ...props
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
} & Omit<HTMLMotionProps<'div'>, 'children'>) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
