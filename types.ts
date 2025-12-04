export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  text: string;
  date: string;
}

export type PageView = 'home' | 'menu' | 'cart' | 'checkout' | 'track' | 'order-success' | 'history' | 'catering' | 'ai-assistant' | 'cake-designer';

// New Location System Types
export interface BusStop {
  name: string;
  price: number;
  time: string; // e.g., "30-45 mins"
}

export interface LGA {
  name: string;
  stops: BusStop[];
}

export interface StateData {
  name: string;
  lgas: Record<string, LGA>;
}

// Nationwide Branch System Types
export interface BranchMenuItem {
  itemId: string; // References Product.id
  price_range: string; // e.g. "2500-2800"
}

export interface Branch {
  id: string;
  chain: string;
  branch_city: string;
  branch_address: string;
  menu: BranchMenuItem[];
}

export interface BranchesData {
  [state: string]: {
    [lga: string]: Branch[];
  };
}

export const CATEGORIES = [
  'Cakes',
  'Food Platters',
  'Drinks',
  'Food Trays',
  'Surprises',
  'Catering'
] as const;