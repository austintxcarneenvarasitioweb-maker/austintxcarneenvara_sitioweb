/**
 * Fill page globals with EN + ES copy (banners, subtitles, About story sections).
 * Usage: node scripts/seed-page-copy.mjs
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
  const db = mongoose.connection.db
  const globalsCol = db.collection('globals')
  const now = new Date()

  const aboutHeroId = new mongoose.Types.ObjectId('6a97877d64cd6df7a6161ba2')
  const cateringImgId = new mongoose.Types.ObjectId('6a9790783fdb8666718d1b63')
  const fireImgId = new mongoose.Types.ObjectId('6a97828264cd6df7a6161974')
  const menuHeroId = new mongoose.Types.ObjectId('6a97868e64cd6df7a6161b68')

  await globalsCol.updateOne(
    { globalType: 'home-page' },
    {
      $set: {
        heroTitle: localized(
          'Authentic Venezuelan fire-grilled meats',
          'Auténticas carnes venezolanas a la leña',
        ),
        heroSubtitle: localized(
          "Prime meats roasted low over open wood fire, the way it's done on the Venezuelan llanos. Smoke, salt, patience & family tradition — served fresh in Austin.",
          'Carnes premium asadas a fuego lento a la leña, como en los llanos venezolanos. Humo, sal, paciencia y tradición familiar — recién hechas en Austin.',
        ),
        signatureTitle: localized('Cooked over live fire', 'Cocinado a la leña'),
        cateringTitle: localized('We bring the fire to you', 'Llevamos el fuego hasta ti'),
        cateringDescription: localized(
          'From weddings to corporate lunches, festivals to family gatherings — we bring the whole live-fire experience to you. Choose a package or let us craft something custom.',
          'Desde bodas hasta almuerzos corporativos, festivales y reuniones familiares — llevamos toda la experiencia a la leña hasta ti. Elige un paquete o déjanos crear algo a tu medida.',
        ),
        updatedAt: now,
      },
      $setOnInsert: { globalType: 'home-page', createdAt: now },
    },
    { upsert: true },
  )
  console.log('Updated home-page (EN + ES).')

  await globalsCol.updateOne(
    { globalType: 'menu-page' },
    {
      $set: {
        heroTitle: localized('The Menu', 'El Menú'),
        heroSubtitle: localized(
          'Every plate begins with wood, fire, and time. Explore our llanero favorites.',
          'Cada plato empieza con leña, fuego y tiempo. Descubre nuestros favoritos llaneros.',
        ),
        footerNote: localized(
          'Available: Avocado/Cilantro Sauce · Sour Cream · Hot Sauces',
          'Disponible: Guasacaca · Nata · Salsas Picantes',
        ),
        updatedAt: now,
      },
      $setOnInsert: { globalType: 'menu-page', createdAt: now },
    },
    { upsert: true },
  )
  console.log('Updated menu-page (EN + ES).')

  await globalsCol.updateOne(
    { globalType: 'about-page' },
    {
      $set: {
        heroTitle: localized('Smoke, fire & family tradition', 'Humo, fuego y tradición familiar'),
        heroSubtitle: localized(
          'From the Venezuelan llanos to the heart of Texas — a story told in embers and shared plates.',
          'De los llanos venezolanos al corazón de Texas — una historia contada en brasas y platos compartidos.',
        ),
        ctaTitle: localized('Taste the tradition', 'Prueba la tradición'),
        storySections: [
          {
            id: rid(),
            number: '01',
            title: localized('Origins', 'Orígenes'),
            body: localized(
              'It started on the open plains of Venezuela — the llanos — where meat is skewered on a vara and cooked slowly beside a wood fire. No shortcuts. No gas. Just embers, time, and the people gathered around them.',
              'Empezó en los llanos de Venezuela, donde la carne se ensarta en una vara y se cocina despacio junto al fuego de leña. Sin atajos. Sin gas. Solo brasas, tiempo y la gente reunida a su alrededor.',
            ),
            image: aboutHeroId,
          },
          {
            id: rid(),
            number: '02',
            title: localized('The Tradition', 'La tradición'),
            body: localized(
              "Carne en vara is more than a technique. It's a ritual passed down through generations — a way of turning simple ingredients into a feast that draws family and strangers alike to the same table.",
              'La carne en vara es más que una técnica. Es un rito que pasa de generación en generación: convertir ingredientes simples en un banquete que reúne a familia y desconocidos en la misma mesa.',
            ),
            image: cateringImgId,
          },
          {
            id: rid(),
            number: '03',
            title: localized('The Fire', 'El fuego'),
            body: localized(
              "We cook everything over live wood fire, the way our grandparents did. The smoke seasons the meat. The heat crisps the edges. Patience does the rest. It's slow food in the truest sense.",
              'Cocinamos todo a la leña, como lo hacían nuestros abuelos. El humo sazona la carne. El calor dora los bordes. La paciencia hace el resto. Es comida lenta en el sentido más verdadero.',
            ),
            image: fireImgId,
          },
          {
            id: rid(),
            number: '04',
            title: localized('Texas Roots', 'Raíces en Texas'),
            body: localized(
              'Austin welcomed us, and we brought the llanos with us. Today we serve our community fire-grilled Venezuelan food that honors where we come from — and where we now call home.',
              'Austin nos recibió y trajimos los llanos con nosotros. Hoy servimos a nuestra comunidad comida venezolana a la leña que honra de dónde venimos — y el lugar que ahora llamamos hogar.',
            ),
            image: menuHeroId,
          },
        ],
        updatedAt: now,
      },
      $setOnInsert: { globalType: 'about-page', createdAt: now, heroImage: aboutHeroId },
    },
    { upsert: true },
  )
  console.log('Updated about-page story sections + copy (EN + ES).')

  await globalsCol.updateOne(
    { globalType: 'catering-page' },
    {
      $set: {
        heroTitle: localized('We bring the *fire* to you', 'Llevamos el *fuego* hasta ti'),
        heroSubtitle: localized(
          'Weddings, corporate events, festivals, private parties & family gatherings across the Greater Austin area. A live-fire Venezuelan experience your guests will never forget.',
          'Bodas, eventos corporativos, festivales, fiestas privadas y reuniones familiares en el área de Austin. Una experiencia venezolana a la leña que tus invitados no olvidarán.',
        ),
        quoteTitle: localized("Let's plan your feast", 'Organicemos tu fiesta'),
        quoteDescription: localized(
          "Tell us about your event and we'll craft a custom quote within 24 hours. Service area: Greater Austin & surrounding Texas Hill Country.",
          'Cuéntanos sobre tu evento y preparamos una cotización a tu medida en 24 horas. Área de servicio: Austin y el Texas Hill Country.',
        ),
        heroImage: cateringImgId,
        updatedAt: now,
      },
      $setOnInsert: { globalType: 'catering-page', createdAt: now },
    },
    { upsert: true },
  )
  console.log('Created/updated catering-page (EN + ES).')

  await globalsCol.updateOne(
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
