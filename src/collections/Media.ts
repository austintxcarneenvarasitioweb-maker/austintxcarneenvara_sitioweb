import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  labels: { singular: 'Imagen', plural: 'Imágenes' },
  admin: {
    group: 'Contenido',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? ''),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [{ name: 'alt', type: 'text', label: 'Texto alternativo' }],
}
