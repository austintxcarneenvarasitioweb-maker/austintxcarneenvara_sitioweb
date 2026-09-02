'use client'

import { useState } from 'react'
import type { CateringPackage } from '@/lib/mock-data'
import { CateringPackages } from '@/components/sections/CateringPackages'
import { QuoteForm } from '@/components/sections/QuoteForm'

interface CateringQuoteFlowProps {
  packages: CateringPackage[]
  quoteTitle?: string
  quoteDescription?: string
}

export function CateringQuoteFlow({ packages, quoteTitle, quoteDescription }: CateringQuoteFlowProps) {
  const [selectedSlug, setSelectedSlug] = useState('')

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug)
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <CateringPackages packages={packages} selectedSlug={selectedSlug} onSelect={handleSelect} />
      <QuoteForm
        title={quoteTitle}
        description={quoteDescription}
        packages={packages}
        selectedSlug={selectedSlug}
      />
    </>
  )
}
