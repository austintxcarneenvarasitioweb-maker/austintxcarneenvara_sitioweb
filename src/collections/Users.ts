import type { CollectionConfig } from 'payload'
import { canAccessAdminPortal } from '../lib/admin-access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  admin: {
    useAsTitle: 'email',
    group: 'Administración',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    admin: ({ req }) => canAccessAdminPortal(req.user?.role),
    read: ({ req }) =>
      req.user?.role === 'admin' ? true : { id: { equals: req.user?.id } },
    create: () => true,
    update: ({ req }) =>
      req.user?.role === 'admin' ? true : { id: { equals: req.user?.id } },
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const existing = await req.payload.count({ collection: 'users' })
        if (existing.totalDocs === 0) {
          data.role = 'admin'
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nombre' },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { update: ({ req }) => req.user?.role === 'admin' },
    },
  ],
}
