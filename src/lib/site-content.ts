import { existsSync } from 'node:fs'
import path from 'node:path'
import { getPayloadClient } from '@/lib/payload'
import catalog from '@/data/catalog.json'
import {
  dishesFromCatalog,
  footerNoteFromCatalog,
  IMAGE_FALLBACK,
  mockSettings,
  mockStorySections,
  packagesFromCatalog,
  type CateringPackage,
  type Dish,
  type SiteSettings,
} from '@/lib/mock-data'
import type { Locale } from '@/i18n/routing'

function mediaUrl(image: unknown): string | undefined {
  if (!image || typeof image === 'string') return undefined
  const media = image as {
    url?: string | null
    cloudinary?: { secure_url?: string | null } | null
  }
  return media.cloudinary?.secure_url || media.url || undefined
}

function localHeroVideoUrl() {
  const file = path.join(process.cwd(), 'public', 'videos', 'hero.mp4')
  return existsSync(file) ? '/videos/hero.mp4' : undefined
}

export async function getDishes(locale: string): Promise<Dish[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'dishes',
      locale: locale as Locale,
      fallbackLocale: 'en',
      limit: 200,
      sort: 'order',
      depth: 1,
      where: { available: { equals: true } },
    })
    if (!result.docs.length) return dishesFromCatalog(locale)

    return result.docs.map((doc) => {
      const catalogMatch = catalog.dishes.find((d) => d.slug === doc.slug)
      return {
        id: String(doc.id),
        slug: doc.slug,
        name: doc.name,
        tag: doc.tag || undefined,
        description: doc.description || '',
        price: doc.price,
        category: doc.category,
        imageUrl: mediaUrl(doc.image) || (catalogMatch?.image ? IMAGE_FALLBACK[catalogMatch.image] : undefined),
        featured: Boolean(doc.featured),
        available: doc.available !== false,
        order: doc.order ?? 0,
      }
    })
  } catch {
    return dishesFromCatalog(locale)
  }
}

export async function getCateringPackages(locale: string): Promise<CateringPackage[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'catering-packages',
      locale: locale as Locale,
      fallbackLocale: 'en',
      limit: 50,
      sort: 'order',
      depth: 0,
    })
    if (!result.docs.length) return packagesFromCatalog(locale)

    return result.docs.map((doc) => ({
      id: String(doc.id),
      slug: doc.slug,
      name: doc.name,
      guestRange: doc.guestRange,
      price: doc.price,
      description: doc.description || '',
      features: (doc.features ?? []).map((row) => row.feature).filter(Boolean),
      highlighted: Boolean(doc.highlighted),
      order: doc.order ?? 0,
    }))
  } catch {
    return packagesFromCatalog(locale)
  }
}

export async function getMenuPageContent(locale: string) {
  const fallbackNote = footerNoteFromCatalog(locale)
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'menu-page',
      locale: locale as Locale,
      fallbackLocale: 'en',
      depth: 1,
    })
    return {
      heroTitle: doc.heroTitle || undefined,
      heroSubtitle: doc.heroSubtitle || undefined,
      heroImageUrl: mediaUrl(doc.heroImage),
      menuPdfUrl: mediaUrl(doc.menuPdf),
      footerNote: doc.footerNote || fallbackNote,
    }
  } catch {
    return { footerNote: fallbackNote, menuPdfUrl: undefined as string | undefined }
  }
}

export async function getHomePageContent(locale: string) {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'home-page',
      locale: locale as Locale,
      fallbackLocale: 'en',
      depth: 1,
    })
    return {
      heroTitle: doc.heroTitle || undefined,
      heroSubtitle: doc.heroSubtitle || undefined,
      heroImageUrl: mediaUrl(doc.heroImage),
      heroVideoUrl: mediaUrl(doc.heroVideo) || localHeroVideoUrl(),
      signatureTitle: doc.signatureTitle || undefined,
      cateringTitle: doc.cateringTitle || undefined,
      cateringDescription: doc.cateringDescription || undefined,
      cateringImageUrl: mediaUrl(doc.cateringImage),
    }
  } catch {
    return { heroVideoUrl: localHeroVideoUrl() }
  }
}

export async function getAboutPageContent(locale: string) {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'about-page',
      locale: locale as Locale,
      fallbackLocale: 'en',
      depth: 1,
    })
    const storyFallback = new Map(
      mockStorySections.map((section) => [section.number, section.imageUrl]),
    )
    const storySections = (doc.storySections ?? [])
      .filter((row) => row.title && row.body)
      .map((row) => ({
        number: row.number,
        title: row.title,
        body: row.body,
        imageUrl: mediaUrl(row.image) || storyFallback.get(row.number),
      }))
    return {
      heroTitle: doc.heroTitle || undefined,
      heroSubtitle: doc.heroSubtitle || undefined,
      heroImageUrl: mediaUrl(doc.heroImage),
      ctaTitle: doc.ctaTitle || undefined,
      storySections,
    }
  } catch {
    return { heroImageUrl: undefined as string | undefined, storySections: [] as { number: string; title: string; body: string; imageUrl?: string }[] }
  }
}

export async function getCateringPageContent(locale: string) {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'catering-page',
      locale: locale as Locale,
      fallbackLocale: 'en',
      depth: 1,
    })
    return {
      heroTitle: doc.heroTitle || undefined,
      heroSubtitle: doc.heroSubtitle || undefined,
      heroImageUrl: mediaUrl(doc.heroImage),
      quoteTitle: doc.quoteTitle || undefined,
      quoteDescription: doc.quoteDescription || undefined,
    }
  } catch {
    return {}
  }
}

export async function getSiteSettings(locale: string): Promise<SiteSettings> {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'settings',
      locale: locale as Locale,
      fallbackLocale: 'en',
      depth: 0,
    })
    const hours = (doc.hours ?? [])
      .filter((row) => row.day && row.time)
      .map((row) => ({ day: row.day, time: row.time }))

    return {
      storeName: doc.storeName || mockSettings.storeName,
      phone: doc.phone || mockSettings.phone,
      email: doc.email || mockSettings.email,
      address: doc.address || mockSettings.address,
      hours: hours.length ? hours : mockSettings.hours,
      instagram: doc.instagram || mockSettings.instagram,
      facebook: doc.facebook || mockSettings.facebook,
      tiktok: doc.tiktok || mockSettings.tiktok,
      whatsapp: doc.whatsapp || mockSettings.whatsapp,
      mapEmbedUrl: doc.mapEmbedUrl || mockSettings.mapEmbedUrl,
      tagline: doc.tagline || mockSettings.tagline,
    }
  } catch {
    return mockSettings
  }
}
