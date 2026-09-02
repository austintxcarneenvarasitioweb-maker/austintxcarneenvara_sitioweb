import catalog from '@/data/catalog.json'

export interface SiteSettings {
  storeName: string
  phone: string
  email: string
  address: string
  hours: { day: string; time: string }[]
  instagram?: string
  facebook?: string
  tiktok?: string
  whatsapp?: string
  mapEmbedUrl?: string
  tagline: string
}

export interface Dish {
  id: string
  slug?: string
  name: string
  tag?: string
  description: string
  price: string
  category: string
  imageUrl?: string
  featured: boolean
  available: boolean
  order: number
}

export interface CateringPackage {
  id: string
  slug: string
  name: string
  guestRange: string
  price: string
  description: string
  features: string[]
  highlighted: boolean
  order: number
}

export interface StorySection {
  number: string
  title: string
  body: string
  imageUrl?: string
}

export interface HowItWorksStep {
  number: string
  title: string
  description: string
  icon: 'people' | 'chef' | 'truck' | 'calendar'
}

type Localized = { en: string; es: string }

export const IMAGE_FALLBACK: Record<string, string> = {
  'carne-en-vara': '/images/dishes/carne-en-vara.jpg',
  cochino: '/images/dishes/cochino.jpg',
  'tacos-carne': '/images/dishes/tacos-carne.jpg',
  chicharron: '/images/dishes/chicharron.jpg',
  tostones: '/images/dishes/tostones.jpg',
  cachapa: '/images/dishes/cachapa.jpg',
  sopa: '/images/dishes/sopa.jpg',
  combo: '/images/dishes/combo.jpg',
  yuca: '/images/dishes/yuca.jpg',
}

function pick(value: Localized, locale: string) {
  return locale === 'es' ? value.es : value.en
}

export function dishesFromCatalog(locale = 'en'): Dish[] {
  return catalog.dishes.map((d) => ({
    id: d.slug,
    slug: d.slug,
    name: pick(d.name, locale),
    tag: pick(d.tag, locale),
    description: pick(d.description, locale),
    price: d.price,
    category: d.category,
    imageUrl: d.image ? IMAGE_FALLBACK[d.image] : undefined,
    featured: d.featured,
    available: true,
    order: d.order,
  }))
}

export function packagesFromCatalog(locale = 'en'): CateringPackage[] {
  return catalog.packages.map((p) => ({
    id: p.slug,
    slug: p.slug,
    name: pick(p.name, locale),
    guestRange: pick(p.guestRange, locale),
    price: p.price,
    description: pick(p.description, locale),
    features: locale === 'es' ? p.features.es : p.features.en,
    highlighted: p.highlighted,
    order: p.order,
  }))
}

export function footerNoteFromCatalog(locale = 'en') {
  return pick(catalog.footerNote, locale)
}

export const mockSettings: SiteSettings = {
  storeName: 'Austin TX Carne en Vara',
  phone: '(512) 555-0142',
  email: 'hola@austintxcarneenvara.com',
  address: '1200 East 6th Street, Austin, TX 78702',
  hours: [
    { day: 'Monday', time: 'Closed' },
    { day: 'Tuesday – Thursday', time: '11:00 AM – 9:00 PM' },
    { day: 'Friday – Saturday', time: '11:00 AM – 11:00 PM' },
    { day: 'Sunday', time: '12:00 PM – 8:00 PM' },
  ],
  instagram: 'https://instagram.com/austintxcarneenvara',
  facebook: 'https://facebook.com/austintxcarneenvara',
  tiktok: 'https://tiktok.com/@austintxcarneenvara',
  tagline: 'Cooked over live fire in Austin, TX',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.0!2d-97.733!3d30.267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE2JzAxLjIiTiA5N8KwNDQnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890',
}

export const mockHome = {
  heroTitle: 'Fire-Grilled *Venezuelan* Soul in Texas',
  heroSubtitle:
    'Prime meats roasted low over open wood fire, the way it\'s done on the Venezuelan llanos. Smoke, salt, patience & family tradition — served fresh in Austin.',
  heroImageUrl: '/images/hero-fire.jpg',
  signatureTitle: 'Cooked over *live fire*',
  cateringTitle: 'Bring the fire to *your event*',
  cateringDescription:
    'From weddings to corporate lunches, festivals to family gatherings — we bring the whole live-fire experience to you. Choose a package or let us craft something custom.',
  cateringImageUrl: '/images/sections/catering.jpg',
}

export const mockMenuPage = {
  heroTitle: 'The Menu',
  heroSubtitle: 'Every plate begins with wood, fire, and time. Explore our llanero favorites.',
  heroImageUrl: '/images/sections/menu-hero.jpg',
  menuPdfUrl: '#',
  footerNote: 'Available: Avocado/Cilantro Sauce · Sour Cream · Hot Sauces',
}

export const mockCateringPage = {
  heroTitle: 'We bring the *fire* to you',
  heroSubtitle:
    'Weddings, corporate events, festivals, private parties & family gatherings across the Greater Austin area. A live-fire Venezuelan experience your guests will never forget.',
  heroImageUrl: '/images/sections/catering-hero.jpg',
  quoteTitle: "Let's plan your feast",
  quoteDescription:
    "Tell us about your event and we'll craft a custom quote within 24 hours. Service area: Greater Austin & surrounding Texas Hill Country.",
}

export const mockAboutPage = {
  heroTitle: 'Smoke, fire & *family tradition*',
  heroSubtitle:
    'From the Venezuelan llanos to the heart of Texas — a story told in embers and shared plates.',
  heroImageUrl: '/images/sections/about-hero.jpg',
  ctaTitle: 'Taste the tradition',
}

export const mockDishes = dishesFromCatalog('en')
export const mockCateringPackages = packagesFromCatalog('en')

export const mockStorySections: StorySection[] = [
  {
    number: '01',
    title: 'Origins',
    body: 'It started on the open plains of Venezuela — the llanos — where meat is skewered on a vara and cooked slowly beside a wood fire. No shortcuts. No gas. Just embers, time, and the people gathered around them.',
    imageUrl: '/images/sections/story-01.jpg',
  },
  {
    number: '02',
    title: 'The Tradition',
    body: "Carne en vara is more than a technique. It's a ritual passed down through generations — a way of turning simple ingredients into a feast that draws family and strangers alike to the same table.",
    imageUrl: '/images/sections/story-02.jpg',
  },
  {
    number: '03',
    title: 'The Fire',
    body: 'We cook everything over live wood fire, the way our grandparents did. The smoke seasons the meat. The heat crisps the edges. Patience does the rest. It\'s slow food in the truest sense.',
    imageUrl: '/images/hero-fire.jpg',
  },
  {
    number: '04',
    title: 'Texas Roots',
    body: 'Austin welcomed us, and we brought the llanos with us. Today we serve our community fire-grilled Venezuelan food that honors where we come from — and where we now call home.',
    imageUrl: '/images/sections/catering.jpg',
  },
]

export const mockHowItWorks: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Tell us about your event',
    description: 'Share your date, guest count & vision.',
    icon: 'people',
  },
  {
    number: '02',
    title: 'We craft your menu',
    description: 'Custom llanero spread tailored to you.',
    icon: 'chef',
  },
  {
    number: '03',
    title: 'We bring the fire',
    description: 'Full setup, live-fire cooking, on-site.',
    icon: 'truck',
  },
  {
    number: '04',
    title: 'You celebrate',
    description: 'Unforgettable food, zero stress.',
    icon: 'calendar',
  },
]

/** Order matches the printed menu columns (left → right). */
export const CATEGORY_LABELS: Record<string, string> = {
  'en-vara': 'EN VARA',
  platos: 'PLATOS',
  cachapas: 'CACHAPAS',
  adicionales: 'ADICIONALES',
  contornos: 'CONTORNOS',
  combos: 'COMBOS',
  sopa: 'SOPA',
  bebidas: 'BEBIDAS',
  postres: 'POSTRES',
}

export const MARQUEE_ITEMS = [
  'Tradición',
  'Carne en Vara',
  'Familia',
  'Texas',
  'Venezuela',
  'Fuego',
  'Humo',
]
