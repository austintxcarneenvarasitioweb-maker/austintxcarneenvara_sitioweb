import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudinaryStorage } from 'payload-cloudinary'
import type { SharpDependency } from 'payload'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Dishes } from './collections/Dishes'
import { CateringPackages } from './collections/CateringPackages'
import { QuoteRequests } from './collections/QuoteRequests'
import { Settings } from './globals/Settings'
import { HomePage } from './globals/HomePage'
import { MenuPage } from './globals/MenuPage'
import { CateringPage } from './globals/CateringPage'
import { AboutPage } from './globals/AboutPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    meta: {
      titleSuffix: ' · Carnes en Vara Admin',
      icons: [
        { rel: 'icon', type: 'image/png', url: '/images/LOGO.png' },
        { rel: 'apple-touch-icon', type: 'image/png', url: '/images/LOGO.png' },
      ],
      openGraph: {
        images: ['/images/LOGO.png'],
      },
    },
    components: {
      graphics: {
        Logo: '/components/brand/BrandLogo.tsx#AdminLogo',
        Icon: '/components/brand/BrandLogo.tsx#AdminIcon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { en, es },
    fallbackLanguage: 'es',
    translations: {
      en: { general: { true: 'SI', false: 'NO' } },
      es: { general: { true: 'SI', false: 'NO' } },
    },
  },
  localization: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [Users, Media, Dishes, CateringPackages, QuoteRequests],
  globals: [Settings, HomePage, MenuPage, CateringPage, AboutPage],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || process.env.DATABASE_URL || '',
  }),
  sharp: sharp as unknown as SharpDependency,
  plugins: [
    cloudinaryStorage({
      config: {
        cloud_name:
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
          process.env.CLOUDINARY_CLOUD_NAME ||
          '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
      collections: { media: true },
      folder: 'carnes-en-vara',
    }),
    (config) => ({
      ...config,
      collections: config.collections?.map((collection) => ({
        ...collection,
        fields: collection.fields?.map((field) =>
          'name' in field && (field.name === 'cloudinary' || field.name === 'versions')
            ? { ...field, admin: { ...field.admin, hidden: true } }
            : field,
        ),
      })),
    }),
  ],
})
