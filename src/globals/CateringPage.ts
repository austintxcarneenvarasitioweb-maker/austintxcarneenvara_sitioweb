import type { GlobalConfig } from 'payload'

export const CateringPage: GlobalConfig = {
  slug: 'catering-page',
  label: 'Página de Catering',
  admin: { group: 'Contenido' },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Título', defaultValue: 'We bring the fire to you' },
    { name: 'heroSubtitle', type: 'textarea', label: 'Subtítulo' },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagen del banner' },
    { name: 'quoteTitle', type: 'text', label: 'Título formulario', defaultValue: "Let's plan your feast" },
    { name: 'quoteDescription', type: 'textarea', label: 'Descripción formulario' },
  ],
}
