function firstUrl(...candidates: Array<string | undefined>) {
  for (const value of candidates) {
    const trimmed = value?.trim()
    if (!trimmed) continue
    try {
      const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
      return new URL(withProtocol).origin
    } catch {
      continue
    }
  }
  return 'http://localhost:3001'
}

export function getSiteUrl() {
  return firstUrl(
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  )
}
