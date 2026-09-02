import type { CollectionConfig } from 'payload'

const viewOnly = { readOnly: true } as const

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  labels: { singular: 'Solicitud', plural: 'Solicitudes' },
  admin: {
    useAsTitle: 'fullName',
    group: 'Ventas',
    defaultColumns: ['fullName', 'email', 'source', 'createdAt'],
    disableDuplicate: true,
    hideAPIURL: true,
    description: 'Solicitudes enviadas desde el sitio. Solo lectura.',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    create: () => false,
    update: () => false,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: 'Nombre completo', admin: viewOnly },
    { name: 'company', type: 'text', label: 'Empresa', admin: viewOnly },
    { name: 'email', type: 'email', required: true, label: 'Email', admin: viewOnly },
    { name: 'phone', type: 'text', label: 'Teléfono', admin: viewOnly },
    { name: 'eventDate', type: 'text', label: 'Fecha del evento', admin: viewOnly },
    { name: 'guestCount', type: 'text', label: 'Número de invitados', admin: viewOnly },
    { name: 'location', type: 'text', label: 'Ubicación del evento', admin: viewOnly },
    { name: 'package', type: 'text', label: 'Paquete de interés', admin: viewOnly },
    { name: 'budget', type: 'text', label: 'Presupuesto estimado', admin: viewOnly },
    { name: 'notes', type: 'textarea', label: 'Notas adicionales', admin: viewOnly },
    {
      name: 'preferredContact',
      type: 'select',
      label: 'Contacto preferido',
      admin: viewOnly,
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Teléfono', value: 'phone' },
        { label: 'WhatsApp', value: 'whatsapp' },
      ],
    },
    {
      name: 'source',
      type: 'select',
      label: 'Origen',
      defaultValue: 'contact',
      options: [
        { label: 'Contacto', value: 'contact' },
        { label: 'Catering', value: 'catering' },
      ],
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
}
