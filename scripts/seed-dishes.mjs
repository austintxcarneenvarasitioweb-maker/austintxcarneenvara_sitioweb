/**
 * Seed bilingual dishes + catering packages into MongoDB.
 * Usage: node scripts/seed-dishes.mjs
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const mongoose = require(require.resolve('mongoose', { paths: [require.resolve('@payloadcms/db-mongodb')] }))

function loadEnvLocal() {
  const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue
    const idx = line.indexOf('=')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvLocal()

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL
if (!uri) {
  console.error('Missing MONGODB_URI / DATABASE_URL')
  process.exit(1)
}

const catalogPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/catalog.json')
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'))

function findMediaId(mediaDocs, key) {
  if (!key) return undefined
  const match = mediaDocs.find((m) => {
    const filename = String(m.filename || '')
    const publicId = String(m.cloudinary?.public_id || '')
    const alt = String(m.alt || '')
    return filename.includes(key) || publicId.includes(key) || alt.toLowerCase().includes(key.replace(/-/g, ' '))
  })
  return match?._id
}

async function main() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 12000 })
  const db = mongoose.connection.db
  const dishesCol = db.collection('dishes')
  const packagesCol = db.collection('catering-packages')
  const mediaCol = db.collection('media')
  const globalsCol = db.collection('globals')

  const mediaDocs = await mediaCol.find({}).toArray()
  console.log(`Found ${mediaDocs.length} media files in admin.`)

  const existingDishes = await dishesCol.countDocuments()
  if (existingDishes > 0) {
    await dishesCol.deleteMany({})
    console.log(`Cleared ${existingDishes} existing dishes.`)
  }

  const existingPackages = await packagesCol.countDocuments()
  if (existingPackages > 0) {
    await packagesCol.deleteMany({})
    console.log(`Cleared ${existingPackages} existing catering packages.`)
  }

  const now = new Date()

  const dishDocs = catalog.dishes.map((d) => ({
    slug: d.slug,
    name: d.name,
    tag: d.tag,
    description: d.description,
    price: d.price,
    category: d.category,
    image: findMediaId(mediaDocs, d.image),
    featured: d.featured,
    available: true,
    order: d.order,
    createdAt: now,
    updatedAt: now,
  }))

  const dishResult = await dishesCol.insertMany(dishDocs)
  console.log(`Seeded ${dishResult.insertedCount} dishes (EN + ES).`)

  const packageDocs = catalog.packages.map((p) => ({
    slug: p.slug,
    name: p.name,
    guestRange: p.guestRange,
    price: p.price,
    description: p.description,
    features: p.features.en.map((_, i) => ({
      feature: { en: p.features.en[i], es: p.features.es[i] },
    })),
    highlighted: p.highlighted,
    order: p.order,
    createdAt: now,
    updatedAt: now,
  }))

  const pkgResult = await packagesCol.insertMany(packageDocs)
  console.log(`Seeded ${pkgResult.insertedCount} catering packages (EN + ES).`)

  await globalsCol.updateOne(
    { globalType: 'menu-page' },
    {
      $set: {
        footerNote: catalog.footerNote,
        updatedAt: now,
      },
      $setOnInsert: {
        globalType: 'menu-page',
        createdAt: now,
      },
    },
    { upsert: true },
  )
  console.log('Updated menu-page footer note (EN + ES).')

  await mongoose.disconnect()
}

main().catch(async (err) => {
  console.error(err)
  await mongoose.disconnect().catch(() => {})
  process.exit(1)
})
