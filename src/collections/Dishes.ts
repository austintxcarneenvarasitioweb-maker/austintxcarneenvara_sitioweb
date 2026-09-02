import type { CollectionConfig } from 'payload'

export const DISH_CATEGORIES = [
  { label: 'En Vara', value: 'en-vara' },
  { label: 'Cachapas', value: 'cachapas' },
  { label: 'Sopa', value: 'sopa' },
  { label: 'Platos', value: 'platos' },
  { label: 'Combos', value: 'combos' },
  { label: 'Adicionales', value: 'adicionales' },
  { label: 'Contornos', value: 'contornos' },
  { label: 'Postres', value: 'postres' },
  { label: 'Bebidas', value: 'bebidas' },
] as const

export const Dishes: CollectionConfig = {
  slug: 'dishes',
  labels: { singular: 'Platillo', plural: 'Platillos' },
  admin: {
    useAsTitle: 'name',
    group: 'Contenido',
    defaultColumns: ['name', 'category', 'price', 'featured', 'available'],
  },
  access: {
    read: () => true,
    create: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? ''),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        if (!data.slug) {
          const name =
            typeof data.name === 'string'
              ? data.name
              : data.name && typeof data.name === 'object'
                ? (data.name as { en?: string; es?: string }).en ||
                  (data.name as { en?: string; es?: string }).es
                : ''
          if (name) {
            data.slug = String(name)
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '')
          }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Slug', admin: { hidden: true } },
    { name: 'name', type: 'text', required: true, label: 'Nombre', localized: true },
    { name: 'tag', type: 'text', label: 'Etiqueta', localized: true, admin: { description: 'Ej: SIGNATURE · ½ LB' } },
    { name: 'description', type: 'textarea', label: 'Descripción', localized: true },
    { name: 'price', type: 'text', required: true, label: 'Precio', admin: { description: 'Ej: $17.99' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoría',
      options: [...DISH_CATEGORIES],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
    },
    { name: 'featured', type: 'checkbox', label: 'Destacado', defaultValue: false, admin: { components: { Cell: '/components/admin/BooleanCell.tsx#BooleanCell' } } },
    { name: 'available', type: 'checkbox', label: 'Disponible', defaultValue: true, admin: { components: { Cell: '/components/admin/BooleanCell.tsx#BooleanCell' } } },
    { name: 'order', type: 'number', label: 'Orden', defaultValue: 0 },
  ],
}
