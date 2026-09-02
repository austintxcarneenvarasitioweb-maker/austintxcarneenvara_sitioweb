import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getSiteUrl } from '@/lib/site-url'

const paths = ['', '/menu', '/catering', '/about', '/contact'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' || path === '/menu' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/menu' || path === '/catering' ? 0.9 : 0.8,
    })),
  )
}
