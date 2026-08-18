import type { GlobalConfig } from 'payload'

export const MenuPage: GlobalConfig = {
  slug: 'menu-page',
  label: 'Página de Menú',
  admin: { group: 'Contenido' },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Título', defaultValue: 'The Menu' },
    { name: 'heroSubtitle', type: 'textarea', label: 'Subtítulo' },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagen del banner' },
    { name: 'menuPdfUrl', type: 'text', label: 'URL del PDF del menú' },
    { name: 'footerNote', type: 'text', label: 'Nota al pie', defaultValue: 'Available: Guasacaca · Nata · Salsas Picantes' },
  ],
}
