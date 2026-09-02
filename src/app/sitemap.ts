import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const paths = ['', '/menu', '/catering', '/about', '/contact'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001'

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' || path === '/menu' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/menu' || path === '/catering' ? 0.9 : 0.8,
    })),
  )
}
