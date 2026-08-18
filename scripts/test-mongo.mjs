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
  console.error(JSON.stringify({ ok: false, message: 'MONGODB_URI / DATABASE_URL missing' }, null, 2))
  process.exit(1)
}

const redactedHost = uri.replace(/\/\/([^:/@]+):([^@]+)@/, '//$1:***@')

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 12000 })
  const ping = await mongoose.connection.db.admin().ping()
  const collections = await mongoose.connection.db.listCollections().toArray()

  console.log(
    JSON.stringify(
      {
        ok: true,
        ping,
        database: mongoose.connection.name,
        readyState: mongoose.connection.readyState,
        collections: collections.map((c) => c.name),
        uri: redactedHost,
      },
      null,
      2,
    ),
  )
} catch (err) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        name: err?.name,
        code: err?.code,
        message: String(err?.message || err),
        uri: redactedHost,
      },
      null,
      2,
    ),
  )
  process.exitCode = 1
} finally {
  await mongoose.disconnect().catch(() => {})
}
