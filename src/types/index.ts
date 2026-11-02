export interface Flavor {
  id: string;
  name: string;
  subtitle: string;
  category: 'hyper-anabolic' | 'classic-dopamine' | 'plant-beast';
  tag?: string;
  badgeColor?: string;
  description: string;
  protein: number; // in grams
  calories: number;
  netCarbs: number;
  fat: number;
  sugarAdded: number;
  fiber: number;
  price: number;
  rating: number;
  reviewCount: number;
  dietary: ('gluten-free' | 'keto' | 'dairy-free' | 'nut-free' | 'organic')[];
  image: string;
  colorHex: string;
  secondaryColorHex: string;
  ingredients: string[];
  tastingNotes: string[];
  aminoAcids: {
    bcaa: string;
    leucine: string;
    glutamine: string;
  };
}

export interface CustomPint {
  id: string;
  name: string;
  baseId: string;
  baseName: string;
  swirlId: string;
  swirlName: string;
  mixins: string[];
  labelColor: string;
  protein: number;
  calories: number;
  netCarbs: number;
  fat: number;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  flavorId?: string;
  customPint?: CustomPint;
  isMerch?: boolean;
  name: string;
  subtitle?: string;
  image: string;
  price: number;
  protein: number;
  quantity: number;
  bundleSize?: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  type: 'Flagship Scoop Bar' | 'Specialty Grocery' | 'Athletic Club';
  address: string;
  hours: string;
  phone: string;
  tapsToday: string[];
  inStock: boolean;
  lat: number;
  lng: number;
  distance?: string;
}

export interface MerchItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  badge?: string;
  description: string;
  color: string;
}
