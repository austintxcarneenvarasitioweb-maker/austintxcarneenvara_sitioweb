import { Cormorant_Garamond, Outfit, Trocchi } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const trocchi = Trocchi({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-trocchi',
  display: 'swap',
})
