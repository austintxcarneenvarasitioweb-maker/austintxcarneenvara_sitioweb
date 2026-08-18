/**
 * Seed 10 demo dishes into MongoDB (Payload `dishes` collection).
 * Site UI also uses /public/images via mock-data for instant preview.
 *
 * Usage: node scripts/seed-dishes.mjs
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

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

const dishes = [
  {
    name: 'Carne en Vara',
    tag: 'SIGNATURE · ½ LB',
    description: 'Half a pound of beef slow-cooked on the vara over live wood fire.',
    price: '$17.99',
    category: 'en-vara',
    featured: true,
    available: true,
    order: 1,
  },
  {
    name: 'Cochino en Vara',
    tag: 'PORK BELLY · ½ LB',
    description: 'Fire-roasted pork belly, crackling skin, melting center.',
    price: '$14.99',
    category: 'en-vara',
    featured: true,
    available: true,
    order: 2,
  },
  {
    name: 'Tacos de Carne en Vara',
    tag: '3 TACOS',
    description: 'Three tacos loaded with our fire-grilled carne en vara.',
    price: '$12.99',
    category: 'platos',
    featured: true,
    available: true,
    order: 3,
  },
  {
    name: 'Griddled Sweet Corn',
    tag: 'CONTORNO',
    description: 'Charred sweet corn with butter, salt, and wood-fire smoke.',
    price: '$5.99',
    category: 'contornos',
    featured: true,
    available: true,
    order: 4,
  },
  {
    name: 'Cachapa con Queso de Mano',
    tag: 'CACHAPA',
    description: 'Traditional sweet corn pancake with fresh queso de mano.',
    price: '$12.99',
    category: 'cachapas',
    featured: true,
    available: true,
    order: 5,
  },
  {
    name: 'Picadillo Llanero',
    tag: 'SOPA',
    description: 'Hearty llanero-style soup with shredded beef and vegetables.',
    price: '$15.99',
    category: 'sopa',
    featured: true,
    available: true,
    order: 6,
  },
  {
    name: 'Tacos de Chicharrón',
    tag: '3 TACOS',
    description: 'Three tacos with crispy chicharrón and guasacaca.',
    price: '$12.99',
    category: 'platos',
    featured: false,
    available: true,
    order: 7,
  },
  {
    name: 'Tostones de Carne en Vara',
    tag: '3 TOSTONES',
    description: 'Crispy tostones topped with fire-grilled carne en vara.',
    price: '$12.99',
    category: 'platos',
    featured: false,
    available: true,
    order: 8,
  },
  {
    name: 'Combo Para 1',
    tag: 'COMBO',
    description: '¼ lb carne, ¼ lb cochino, chorizo, yuca, plátano, ensalada + bebida.',
    price: '$27.00',
    category: 'combos',
    featured: false,
    available: true,
    order: 9,
  },
  {
    name: 'Yuca Frita',
    tag: 'CONTORNO',
    description: 'Golden fried yuca served with nata and guasacaca.',
    price: '$5.99',
    category: 'contornos',
    featured: false,
    available: true,
    order: 10,
  },
]

async function main() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 12000 })
  const db = mongoose.connection.db
  const col = db.collection('dishes')

  const existing = await col.countDocuments()
  if (existing > 0) {
    await col.deleteMany({})
    console.log(`Cleared ${existing} existing dishes.`)
  }

  const now = new Date()
  const docs = dishes.map((d) => ({
    ...d,
    createdAt: now,
    updatedAt: now,
  }))

  const result = await col.insertMany(docs)
  console.log(`Seeded ${result.insertedCount} dishes into MongoDB.`)
  console.log('UI demo images: public/images/dishes/* (already wired in mock-data).')
  await mongoose.disconnect()
}

main().catch(async (err) => {
  console.error(err)
  await mongoose.disconnect().catch(() => {})
  process.exit(1)
})
