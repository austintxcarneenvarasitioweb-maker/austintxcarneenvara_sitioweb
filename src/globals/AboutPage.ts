import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Página About',
  admin: { group: 'Contenido' },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Título', localized: true, defaultValue: 'Smoke, fire & family tradition' },
    { name: 'heroSubtitle', type: 'textarea', label: 'Subtítulo', localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagen del banner' },
    {
      name: 'storySections',
      type: 'array',
      label: 'Secciones de historia',
      fields: [
        { name: 'number', type: 'text', required: true, label: 'Número', admin: { description: 'Ej: 01' } },
        { name: 'title', type: 'text', required: true, label: 'Título', localized: true },
        { name: 'body', type: 'textarea', required: true, label: 'Contenido', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagen' },
      ],
    },
    { name: 'ctaTitle', type: 'text', label: 'Título CTA', localized: true, defaultValue: 'Taste the tradition' },
  ],
}
