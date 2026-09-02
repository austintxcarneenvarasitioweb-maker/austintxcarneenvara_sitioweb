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
    { name: 'heroTitle', type: 'text', label: 'Título del hero', localized: true, defaultValue: 'Authentic Venezuelan fire-grilled meats' },
    { name: 'heroSubtitle', type: 'textarea', label: 'Subtítulo del hero', localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagen del hero' },
    {
      name: 'heroVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Video del hero',
      admin: {
        description:
          'MP4 o WebM. Ideal 1920×1080 o más, 10–20s, sin pasar por WhatsApp (eso lo deja en ~480p y se ve pixelado a pantalla completa). Se reproduce una vez, se apaga al fondo oscuro y luego aparece la imagen del hero.',
      },
    },
    { name: 'signatureTitle', type: 'text', label: 'Título sección destacados', localized: true, defaultValue: 'Cooked over live fire' },
    { name: 'cateringTitle', type: 'text', label: 'Título catering home', localized: true, defaultValue: 'We bring the fire to you' },
    { name: 'cateringDescription', type: 'textarea', label: 'Descripción catering home', localized: true },
    { name: 'cateringImage', type: 'upload', relationTo: 'media', label: 'Imagen catering home' },
  ],
}
