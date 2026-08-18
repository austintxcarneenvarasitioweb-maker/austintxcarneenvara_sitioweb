import type { Metadata } from 'next'
import { ContactPageSection } from '@/components/sections/ContactPageSection'
import { mockSettings } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Visit Austin TX Carne en Vara or send us a message.',
}

export default function ContactPage() {
  return <ContactPageSection settings={mockSettings} />
}
