import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Configuración del Sitio',
  admin: { group: 'Administración' },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
  },
  fields: [
    { name: 'storeName', type: 'text', label: 'Nombre del negocio', defaultValue: 'Austin TX Carne en Vara' },
    { name: 'phone', type: 'text', label: 'Teléfono', defaultValue: '(512) 555-0142' },
    { name: 'email', type: 'email', label: 'Email', defaultValue: 'hola@austintxcarneenvara.com' },
    { name: 'address', type: 'text', label: 'Dirección', defaultValue: '1200 East 6th Street, Austin, TX 78702' },
    {
      name: 'hours',
      type: 'array',
      label: 'Horario',
      fields: [
        { name: 'day', type: 'text', required: true, label: 'Día' },
        { name: 'time', type: 'text', required: true, label: 'Horario' },
      ],
    },
    { name: 'instagram', type: 'text', label: 'Instagram URL' },
    { name: 'facebook', type: 'text', label: 'Facebook URL' },
    { name: 'tiktok', type: 'text', label: 'TikTok URL' },
    { name: 'whatsapp', type: 'text', label: 'WhatsApp' },
    { name: 'mapEmbedUrl', type: 'text', label: 'Google Maps Embed URL' },
    { name: 'tagline', type: 'text', label: 'Tagline footer', defaultValue: 'Cooked over live fire in Austin, TX' },
  ],
}
