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
    { name: 'heroTitle', type: 'text', label: 'Título', localized: true, defaultValue: 'The Menu' },
    { name: 'heroSubtitle', type: 'textarea', label: 'Subtítulo', localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagen del banner' },
    {
      name: 'menuPdf',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      label: 'PDF del menú',
      admin: { description: 'Sube un PDF distinto por idioma (EN / ES).' },
    },
    { name: 'footerNote', type: 'text', label: 'Nota al pie', localized: true, defaultValue: 'Available: Avocado/Cilantro Sauce · Sour Cream · Hot Sauces' },
  ],
}
