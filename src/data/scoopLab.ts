export interface BaseOption {
  id: string;
  name: string;
  subtitle: string;
  protein: number;
  calories: number;
  netCarbs: number;
  fat: number;
  color: string;
  flavorProfile: string;
  tag: string;
}

export interface SwirlOption {
  id: string;
  name: string;
  subtitle: string;
  protein: number;
  calories: number;
  netCarbs: number;
  fat: number;
  color: string;
}

export interface MixinOption {
  id: string;
  name: string;
  subtitle: string;
  protein: number;
  calories: number;
  netCarbs: number;
  fat: number;
  icon: string;
}

export const SCOOP_LAB_BASES: BaseOption[] = [
  {
    id: 'base-dutch-fudge',
    name: 'DOUBLE WHEY DUTCH FUDGE',
    subtitle: '74% dark alkalized Dutch cacao + grass-fed cold filtered isolate',
    protein: 26,
    calories: 220,
    netCarbs: 2,
    fat: 6,
    color: '#3B2117',
    flavorProfile: 'Deep, rich bittersweet chocolate',
    tag: 'ULTRA DENSE'
  },
  {
    id: 'base-madagascar-cream',
    name: 'SWEET CREAM BOURBON VANILLA',
    subtitle: 'Tahitian & Madagascar vanilla caviar suspended in grass-fed dairy cream',
    protein: 24,
    calories: 200,
    netCarbs: 2,
    fat: 5.5,
    color: '#F4ECE1',
    flavorProfile: 'Silky, aromatic floral vanilla',
    tag: 'CLASSIC CANVAS'
  },
  {
    id: 'base-golden-peanut',
    name: 'ANABOLIC GOLDEN PEANUT BATTER',
    subtitle: 'Slow-roasted Virginia peanut butter churned with micellar casein',
    protein: 28,
    calories: 240,
    netCarbs: 2,
    fat: 8,
    color: '#D49B4F',
    flavorProfile: 'Bold roasted nuttiness with buttery body',
    tag: 'MAX PROTEIN'
  },
  {
    id: 'base-uji-matcha',
    name: 'CEREMONIAL KYOTO MATCHA',
    subtitle: 'First-harvest shade-grown green tea packed with L-theanine',
    protein: 25,
    calories: 210,
    netCarbs: 2,
    fat: 5.5,
    color: '#5C7A29',
    flavorProfile: 'Clean vegetal umami and soothing sweetness',
    tag: 'LASER FOCUS'
  },
  {
    id: 'base-plant-coconut',
    name: 'PLANT BEAST VELVET COCONUT',
    subtitle: 'Fermented fava & sprouted pea protein with fresh cold-pressed coconut milk',
    protein: 23,
    calories: 210,
    netCarbs: 3,
    fat: 6,
    color: '#EFEAE2',
    flavorProfile: '100% plant-based creamy tropical dream',
    tag: 'VEGAN HERO'
  }
];

export const SCOOP_LAB_SWIRLS: SwirlOption[] = [
  {
    id: 'swirl-none',
    name: 'NO SWIRL (PURE BASE ONLY)',
    subtitle: 'Keep it minimalist and pure',
    protein: 0,
    calories: 0,
    netCarbs: 0,
    fat: 0,
    color: '#E5E2E1'
  },
  {
    id: 'swirl-caramel',
    name: 'MOLTEN ALLULOSE DULCE DE LECHE',
    subtitle: 'Slow-cooked brown butter caramel with Maldon sea salt',
    protein: 2,
    calories: 45,
    netCarbs: 1,
    fat: 1.5,
    color: '#C67828'
  },
  {
    id: 'swirl-raspberry',
    name: 'KINETIC RASPBERRY LAVA',
    subtitle: 'Wild mountain raspberry coulis with tart citrus kick',
    protein: 1,
    calories: 30,
    netCarbs: 1.5,
    fat: 0,
    color: '#D81159'
  },
  {
    id: 'swirl-peanut-fudge',
    name: 'DARK CHOCOLATE PEANUT MAGMA',
    subtitle: 'Thick gooey ribbon of warm bittersweet peanut fudge',
    protein: 3,
    calories: 55,
    netCarbs: 1,
    fat: 2.5,
    color: '#5C3826'
  },
  {
    id: 'swirl-espresso',
    name: 'MIDNIGHT COLD BREW EXTRACTION',
    subtitle: '18-hour Colombian nitro espresso concentrate swirl',
    protein: 1,
    calories: 25,
    netCarbs: 0.5,
    fat: 0,
    color: '#261C14'
  }
];

export const SCOOP_LAB_MIXINS: MixinOption[] = [
  {
    id: 'mixin-brownie',
    name: 'High-Protein Whey Brownie Dough',
    subtitle: 'Chewy fudge chunks made from whey isolate and Dutch cacao',
    protein: 4,
    calories: 50,
    netCarbs: 1,
    fat: 1.5,
    icon: '🍫'
  },
  {
    id: 'mixin-quinoa',
    name: 'Crispy Puffed Quinoa Crunch',
    subtitle: 'Toasted organic quinoa crisps glazed in dark cocoa',
    protein: 2,
    calories: 35,
    netCarbs: 2,
    fat: 1,
    icon: '✨'
  },
  {
    id: 'mixin-macadamia',
    name: 'Roasted Butter Macadamias',
    subtitle: 'Hawaiian macadamia nuts dry-roasted with sea salt',
    protein: 1.5,
    calories: 60,
    netCarbs: 0.5,
    fat: 5,
    icon: '🌰'
  },
  {
    id: 'mixin-cacao-nibs',
    name: 'Single-Origin Raw Cacao Nibs',
    subtitle: 'Ecuadorian heirloom cacao crunch packed with flavonoids',
    protein: 1.5,
    calories: 30,
    netCarbs: 0.5,
    fat: 2,
    icon: '⚡'
  },
  {
    id: 'mixin-cookie',
    name: 'Keto Black Cocoa Sandwich Biscuit',
    subtitle: 'Crunchy crushed chocolate cream biscuits with zero sugar',
    protein: 2.5,
    calories: 45,
    netCarbs: 1,
    fat: 2,
    icon: '🍪'
  },
  {
    id: 'mixin-pretzel',
    name: 'Cassava Salted Pretzel Bits',
    subtitle: 'Grain-free salted pretzel clusters with extreme crunch',
    protein: 2,
    calories: 40,
    netCarbs: 2,
    fat: 0.5,
    icon: '🥨'
  }
];

export const LABEL_COLOR_THEMES = [
  { id: 'neon-chartreuse', name: 'Neon Chartreuse', bg: '#D4FF00', text: '#121212', border: '#121212' },
  { id: 'neon-pink', name: 'Neon Pink', bg: '#FF2E93', text: '#FFFFFF', border: '#121212' },
  { id: 'ultra-cobalt', name: 'Ultra Cobalt', bg: '#2E4CFF', text: '#FFFFFF', border: '#121212' },
  { id: 'licorice-black', name: 'Licorice Stealth', bg: '#121212', text: '#D4FF00', border: '#D4FF00' },
  { id: 'milky-cream', name: 'Milk White Brutal', bg: '#FAF8F5', text: '#121212', border: '#121212' }
];
