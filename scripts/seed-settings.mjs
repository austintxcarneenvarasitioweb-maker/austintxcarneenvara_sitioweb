/**
 * Seed store hours + contact settings (EN + ES).
 * Usage: node scripts/seed-settings.mjs
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { randomBytes } from 'node:crypto'

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

function rid() {
  return randomBytes(12).toString('hex')
}

function localized(en, es) {
  return { en, es }
}

async function main() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 12000 })
  const now = new Date()

  await mongoose.connection.db.collection('globals').updateOne(
    { globalType: 'settings' },
    {
      $set: {
        storeName: localized('Austin TX Carne en Vara', 'Austin TX Carne en Vara'),
        phone: '(512) 555-0142',
        email: 'hola@austintxcarneenvara.com',
        address: '1200 East 6th Street, Austin, TX 78702',
        tagline: localized(
          'Cooked over live fire in Austin, TX',
          'Cocinado a la leña en Austin, TX',
        ),
        hours: [
          {
            id: rid(),
            day: localized('Monday', 'Lunes'),
            time: localized('Closed', 'Cerrado'),
          },
          {
            id: rid(),
            day: localized('Tuesday – Thursday', 'Martes – Jueves'),
            time: localized('11:00 AM – 9:00 PM', '11:00 AM – 9:00 PM'),
          },
          {
            id: rid(),
            day: localized('Friday – Saturday', 'Viernes – Sábado'),
            time: localized('11:00 AM – 11:00 PM', '11:00 AM – 11:00 PM'),
          },
          {
            id: rid(),
            day: localized('Sunday', 'Domingo'),
            time: localized('12:00 PM – 8:00 PM', '12:00 PM – 8:00 PM'),
          },
        ],
        instagram: 'https://instagram.com/austintxcarneenvara',
        facebook: 'https://facebook.com/austintxcarneenvara',
        tiktok: 'https://tiktok.com/@austintxcarneenvara',
        updatedAt: now,
      },
      $setOnInsert: { globalType: 'settings', createdAt: now },
    },
    { upsert: true },
  )
  console.log('Updated settings hours + contact (EN + ES).')
  await mongoose.disconnect()
}

main().catch(async (err) => {
  console.error(err)
  await mongoose.disconnect().catch(() => {})
  process.exit(1)
})
