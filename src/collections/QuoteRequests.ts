import type { CollectionConfig } from 'payload'

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  labels: { singular: 'Solicitud', plural: 'Solicitudes' },
  admin: {
    useAsTitle: 'fullName',
    group: 'Ventas',
    defaultColumns: ['fullName', 'email', 'source', 'createdAt'],
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    create: () => true,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: 'Nombre completo' },
    { name: 'company', type: 'text', label: 'Empresa' },
    { name: 'email', type: 'email', required: true, label: 'Email' },
    { name: 'phone', type: 'text', label: 'Teléfono' },
    { name: 'eventDate', type: 'text', label: 'Fecha del evento' },
    { name: 'guestCount', type: 'text', label: 'Número de invitados' },
    { name: 'location', type: 'text', label: 'Ubicación del evento' },
    { name: 'package', type: 'text', label: 'Paquete de interés' },
    { name: 'budget', type: 'text', label: 'Presupuesto estimado' },
    { name: 'notes', type: 'textarea', label: 'Notas adicionales' },
    {
      name: 'preferredContact',
      type: 'select',
      label: 'Contacto preferido',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Teléfono', value: 'phone' },
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
