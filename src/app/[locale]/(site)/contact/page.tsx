import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactPageSection } from '@/components/sections/ContactPageSection'
import { getSiteSettings } from '@/lib/site-content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.contact' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const settings = await getSiteSettings(locale)

  return <ContactPageSection settings={settings} />
}
