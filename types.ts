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

export type PageView = 'home' | 'menu' | 'cart' | 'checkout' | 'track' | 'order-success';

export type DeliveryType = 'city' | 'nearby' | 'far';

export const DELIVERY_RATES: Record<DeliveryType, number> = {
  city: 700,
  nearby: 1200,
  far: 2000
};

export const CATEGORIES = [
  'Sea Food',
  'Rice Meals',
  'Fast Food',
  'Soups',
  'Swallows',
  'Drinks',
  'Snacks'
] as const;