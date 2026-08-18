'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      // Let the backdrop start fading in first
      delayChildren: 0.28,
    },
  },
}

export const heroItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
}

type RevealProps = {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
} & Omit<HTMLMotionProps<'div'>, 'children'>

export function HeroReveal({ children, className, style, ...props }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={style}
      variants={reduce ? undefined : heroContainerVariants}
      initial={reduce ? false : 'hidden'}
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function HeroRevealItem({ children, className, style, ...props }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={style}
      variants={reduce ? undefined : heroItemVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}
