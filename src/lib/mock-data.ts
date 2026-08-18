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
  footerNote: 'Available: Guasacaca · Nata · Salsas Picantes',
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

export const mockDishes: Dish[] = [
  {
    id: '1',
    name: 'Carne en Vara',
    tag: 'SIGNATURE · ½ LB',
    description: 'Half a pound of beef slow-cooked on the vara over live wood fire.',
    price: '$17.99',
    category: 'en-vara',
    imageUrl: '/images/dishes/carne-en-vara.jpg',
    featured: true,
    available: true,
    order: 1,
  },
  {
    id: '2',
    name: 'Cochino en Vara',
    tag: 'PORK BELLY · ½ LB',
    description: 'Fire-roasted pork belly, crackling skin, melting center.',
    price: '$14.99',
    category: 'en-vara',
    imageUrl: '/images/dishes/cochino.jpg',
    featured: true,
    available: true,
    order: 2,
  },
  {
    id: '3',
    name: 'Tacos de Carne en Vara',
    tag: '3 TACOS',
    description: 'Three tacos loaded with our fire-grilled carne en vara.',
    price: '$12.99',
    category: 'platos',
    imageUrl: '/images/dishes/tacos-carne.jpg',
    featured: true,
    available: true,
    order: 3,
  },
  {
    id: '4',
    name: 'Griddled Sweet Corn',
    tag: 'CONTORNO',
    description: 'Charred sweet corn with butter, salt, and wood-fire smoke.',
    price: '$5.99',
    category: 'contornos',
    imageUrl: '/images/dishes/sweet-corn.jpg',
    featured: true,
    available: true,
    order: 4,
  },
  {
    id: '5',
    name: 'Cachapa con Queso de Mano',
    tag: 'CACHAPA',
    description: 'Traditional sweet corn pancake with fresh queso de mano.',
    price: '$12.99',
    category: 'cachapas',
    imageUrl: '/images/dishes/cachapa.jpg',
    featured: true,
    available: true,
    order: 5,
  },
  {
    id: '6',
    name: 'Picadillo Llanero',
    tag: 'SOPA',
    description: 'Hearty llanero-style soup with shredded beef and vegetables.',
    price: '$15.99',
    category: 'sopa',
    imageUrl: '/images/dishes/sopa.jpg',
    featured: true,
    available: true,
    order: 6,
  },
  {
    id: '7',
    name: 'Tacos de Chicharrón',
    tag: '3 TACOS',
    description: 'Three tacos with crispy chicharrón and guasacaca.',
    price: '$12.99',
    category: 'platos',
    imageUrl: '/images/dishes/chicharron.jpg',
    featured: false,
    available: true,
    order: 7,
  },
  {
    id: '8',
    name: 'Tostones de Carne en Vara',
    tag: '3 TOSTONES',
    description: 'Crispy tostones topped with fire-grilled carne en vara.',
    price: '$12.99',
    category: 'platos',
    imageUrl: '/images/dishes/tostones.jpg',
    featured: false,
    available: true,
    order: 8,
  },
  {
    id: '9',
    name: 'Combo Para 1',
    tag: 'COMBO',
    description: '¼ lb carne, ¼ lb cochino, chorizo, yuca, plátano, ensalada + bebida.',
    price: '$27.00',
    category: 'combos',
    imageUrl: '/images/dishes/combo.jpg',
    featured: false,
    available: true,
    order: 9,
  },
  {
    id: '10',
    name: 'Yuca Frita',
    tag: 'CONTORNO',
    description: 'Golden fried yuca served with nata and guasacaca.',
    price: '$5.99',
    category: 'contornos',
    imageUrl: '/images/dishes/yuca.jpg',
    featured: false,
    available: true,
    order: 10,
  },
]

export const mockCateringPackages: CateringPackage[] = [
  {
    id: '1',
    name: 'Family Feast',
    guestRange: '10-20 GUESTS',
    price: 'from $250',
    description: 'An intimate spread of our fire-grilled favorites for the family table.',
    features: ['Carne & cochino en vara', 'Chorizo & sides', 'Cachapas', 'Guasacaca, nata & salsas'],
    highlighted: false,
    order: 1,
  },
  {
    id: '2',
    name: 'Corporate Package',
    guestRange: '30-80 GUESTS',
    price: 'from $900',
    description: 'Impress the office with a full llanero grilling experience and clean service.',
    features: ['Live-fire station', 'Assorted meats & sides', 'Vegetarian options', 'Full setup & staff'],
    highlighted: false,
    order: 2,
  },
  {
    id: '3',
    name: 'Premium Fire Experience',
    guestRange: '50-150 GUESTS',
    price: 'custom',
    description: 'Our signature open-fire showcase — theater and flavor for milestone events.',
    features: ['On-site vara fire show', 'Chef-led carving', 'Premium meat selection', 'Desserts & drinks'],
    highlighted: true,
    order: 3,
  },
  {
    id: '4',
    name: 'Event Package',
    guestRange: '100+ GUESTS',
    price: 'custom',
    description: 'Weddings, festivals & large gatherings catered end-to-end with heart.',
    features: ['Scalable menu', 'Multiple fire stations', 'Full-service team', 'Custom menu design'],
    highlighted: false,
    order: 4,
  },
]

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

export const CATEGORY_LABELS: Record<string, string> = {
  'en-vara': 'EN VARA',
  cachapas: 'CACHAPAS',
  sopa: 'SOPA',
  platos: 'PLATOS',
  combos: 'COMBOS',
  adicionales: 'ADICIONALES',
  contornos: 'CONTORNOS',
  postres: 'POSTRES',
  bebidas: 'BEBIDAS',
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
