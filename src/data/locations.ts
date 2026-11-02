import { StoreLocation, MerchItem } from '../types';

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'bengaluru-indiranagar',
    name: 'BUFF INDIRANAGAR FLAGSHIP SCOOP BAR',
    city: 'Bengaluru, Karnataka',
    type: 'Flagship Scoop Bar',
    address: '100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    hours: 'Sun–Thu: 11:00 am – 11:30 pm | Fri–Sat: 11:00 am – 1:00 am',
    phone: '+91 80 4965 2100',
    tapsToday: ['Midnight Brownie Overload', 'Glitch Berry Cheesecake', 'Neon Pistachio Kashmir', 'Cold Brew Nitro Float'],
    inStock: true,
    lat: 12.9716,
    lng: 77.5946,
    distance: '0.8 km'
  },
  {
    id: 'mumbai-bandra',
    name: 'BUFF BANDRA PINT & SCOOP STATION',
    city: 'Mumbai, Maharashtra',
    type: 'Flagship Scoop Bar',
    address: 'Pali Hill, Near Carter Road, Bandra West, Mumbai 400050',
    hours: 'Everyday: 11:00 am – 12:30 am',
    phone: '+91 22 2640 1890',
    tapsToday: ['Hyper Peanut Butter Magma', 'Alphonso Mango Pitaya', 'Anabolic Caramel Crunch', 'Whey Soft-Serve Vortex'],
    inStock: true,
    lat: 19.0596,
    lng: 72.8295,
    distance: '1.4 km'
  },
  {
    id: 'delhi-cyberhub',
    name: 'BUFF CYBER HUB ANABOLIC LAB',
    city: 'Gurugram, Delhi NCR',
    type: 'Flagship Scoop Bar',
    address: 'DLF Cyber City, Phase 2, Gurugram, Haryana 122002',
    hours: 'Everyday: 10:30 am – Midnight',
    phone: '+91 124 458 9200',
    tapsToday: ['Midnight Brownie Overload', 'Anabolic Caramel Crunch', 'Plant Beast Cookies', 'Mysore Filter Coffee Churn'],
    inStock: true,
    lat: 28.4950,
    lng: 77.0895,
    distance: '2.1 km'
  },
  {
    id: 'natures-basket-mumbai',
    name: "NATURE'S BASKET ARTISAN FREEZER",
    city: 'Bandra / Worli, Mumbai',
    type: 'Specialty Grocery',
    address: 'Dr. Annie Besant Road, Worli, Mumbai 400018',
    hours: 'Daily: 8:00 am – 10:00 pm',
    phone: '+91 22 2498 7700',
    tapsToday: ['Pre-packed pints in Gourmet Protein Freezer Aisle 2'],
    inStock: true,
    lat: 19.0178,
    lng: 72.8178,
    distance: '3.5 km'
  },
  {
    id: 'cultfit-koramangala',
    name: 'CULT.FIT FUEL BAR KORAMANGALA',
    city: 'Bengaluru, Karnataka',
    type: 'Athletic Club',
    address: '80ft Road, 4th Block, Koramangala, Bengaluru 560034',
    hours: 'Mon–Sat: 6:00 am – 10:30 pm | Sun: 7:00 am – 9:00 pm',
    phone: '+91 80 4555 8899',
    tapsToday: ['Hyper Peanut Butter Magma', 'Madagascar Churn Vanilla', 'Post-Workout Anabolic Shakes'],
    inStock: true,
    lat: 12.9352,
    lng: 77.6245,
    distance: '1.9 km'
  },
  {
    id: 'modern-bazaar-vasant-vihar',
    name: 'MODERN BAZAAR VASANT VIHAR',
    city: 'New Delhi, Delhi NCR',
    type: 'Specialty Grocery',
    address: 'Basant Lok Community Centre, Vasant Vihar, New Delhi 110057',
    hours: 'Daily: 8:00 am – 10:30 pm',
    phone: '+91 11 4166 2200',
    tapsToday: ['Core 8 Flavors stocked in Sub-Zero Arctic Freezers'],
    inStock: true,
    lat: 28.5583,
    lng: 77.1637,
    distance: '2.8 km'
  }
];

export const MERCH_DATA: MerchItem[] = [
  {
    id: 'brutalist-scoop',
    name: 'SOLID ANODIZED ANABOLIC SCOOP',
    tagline: 'Solid Aerospace-grade aluminum with heat-defrost conductive core',
    price: 999,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80',
    badge: 'HEAVYWEIGHT 420G',
    description: 'Machined from single-billet aluminum with a thermodynamic anti-freeze conductive handle. Glides through sub-zero pints with zero elbow strain.',
    color: '#D4FF00'
  },
  {
    id: 'y2k-thermal-sling',
    name: 'Y2K NEON THERMAL PINT SLING',
    tagline: 'High-density insulated metallic silver tote with chunky buckle',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    badge: 'KEEPS FROZEN 6HRS',
    description: 'Brutalist reflective silver cross-body cooler bag tailored specifically to hold 2 pints and a scoop. Complete with waterproof zip and neon chartreuse strap.',
    color: '#FF2E93'
  },
  {
    id: 'heavyweight-tee',
    name: 'BUFF ANABOLIC GRAPHIC TEE',
    tagline: '320 GSM heavyweight vintage boxy cut with puff print back',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    badge: 'LIMITED EDITION',
    description: '100% combed cotton jersey. Acid-washed charcoal finish featuring bold Syne typographic poster print on back: "HIGH PROTEIN • ZERO APOLOGIES".',
    color: '#2E4CFF'
  },
  {
    id: 'stainless-pint-shaker',
    name: 'BUFF VACUUM PINT INSULATOR',
    tagline: 'Double-wall stainless steel container that slips over any pint',
    price: 899,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    badge: 'NO COLD FINGERS',
    description: 'Locks onto your pint so your hands stay warm while the gelato stays rock-hard and frosty to the very last scoop.',
    color: '#121212'
  }
];
