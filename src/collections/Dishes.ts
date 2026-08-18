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
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nombre' },
    { name: 'tag', type: 'text', label: 'Etiqueta', admin: { description: 'Ej: SIGNATURE · ½ LB' } },
    { name: 'description', type: 'textarea', label: 'Descripción' },
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
    { name: 'featured', type: 'checkbox', label: 'Destacado', defaultValue: false },
    { name: 'available', type: 'checkbox', label: 'Disponible', defaultValue: true },
    { name: 'order', type: 'number', label: 'Orden', defaultValue: 0 },
  ],
}
