import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
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
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: { supportedLanguages: { es }, fallbackLanguage: 'es' },
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
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
      collections: { media: true },
      folder: 'carnes-en-vara',
    }),
  ],
})
