export const ADMIN_PORTAL_ROLES = ['admin', 'editor'] as const

export type AdminPortalRole = (typeof ADMIN_PORTAL_ROLES)[number]

export function canAccessAdminPortal(role: string | null | undefined): role is AdminPortalRole {
  return role === 'admin' || role === 'editor'
}
