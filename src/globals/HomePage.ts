import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Página de Inicio',
  admin: { group: 'Contenido' },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Título del hero', defaultValue: 'Authentic Venezuelan fire-grilled meats' },
    { name: 'heroSubtitle', type: 'textarea', label: 'Subtítulo del hero' },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagen del hero' },
    { name: 'signatureTitle', type: 'text', label: 'Título sección destacados', defaultValue: 'Cooked over live fire' },
    { name: 'cateringTitle', type: 'text', label: 'Título catering home', defaultValue: 'We bring the fire to you' },
    { name: 'cateringDescription', type: 'textarea', label: 'Descripción catering home' },
    { name: 'cateringImage', type: 'upload', relationTo: 'media', label: 'Imagen catering home' },
  ],
}
