import type { CollectionConfig } from 'payload'

export const CateringPackages: CollectionConfig = {
  slug: 'catering-packages',
  labels: { singular: 'Paquete Catering', plural: 'Paquetes Catering' },
  admin: {
    useAsTitle: 'name',
    group: 'Contenido',
    defaultColumns: ['name', 'guestRange', 'price', 'highlighted'],
  },
  access: {
    read: () => true,
    create: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? ''),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Slug', admin: { description: 'Identificador interno (no se traduce)' } },
    { name: 'name', type: 'text', required: true, label: 'Nombre', localized: true },
    { name: 'guestRange', type: 'text', required: true, label: 'Rango de invitados', localized: true, admin: { description: 'Ej: 10-20 GUESTS' } },
    { name: 'price', type: 'text', required: true, label: 'Precio', admin: { description: 'Ej: from $250 o custom' } },
    { name: 'description', type: 'textarea', label: 'Descripción', localized: true },
    {
      name: 'features',
      type: 'array',
      label: 'Características',
      fields: [{ name: 'feature', type: 'text', required: true, label: 'Característica', localized: true }],
    },
    { name: 'highlighted', type: 'checkbox', label: 'Más popular', defaultValue: false, admin: { components: { Cell: '/components/admin/BooleanCell.tsx#BooleanCell' } } },
    { name: 'order', type: 'number', label: 'Orden', defaultValue: 0 },
  ],
}
