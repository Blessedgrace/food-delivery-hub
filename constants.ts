import { Product, StateData, BranchesData } from './types';

export const MENU_ITEMS: Product[] = [
  // FOOD PLATTERS
  {
    id: 'fp-1',
    name: 'Smoky Jollof & Chicken Platter',
    category: 'Food Platters',
    price: 4500,
    description: 'Vibrant, smoky Nigerian Jollof Rice served with peppered roasted chicken, coleslaw, and fried plantain.',
    image: 'https://images.unsplash.com/photo-1624640698114-1422799309c6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fp-2',
    name: 'Fried Rice Fiesta',
    category: 'Food Platters',
    price: 4800,
    description: 'Richly garnished Fried Rice with shrimps, veggies, and grilled turkey wings.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f10842619?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fp-3',
    name: 'Native Rice Special',
    category: 'Food Platters',
    price: 5000,
    description: 'Traditional palm oil rice with dry fish, ponmo, and goat meat.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80'
  },

  // DRINKS
  {
    id: 'dr-1',
    name: 'Signature Fruity Zobo',
    category: 'Drinks',
    price: 1200,
    description: 'Ice-cold hibiscus drink infused with pineapple, ginger, and cloves. Served in a 75cl bottle.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dr-2',
    name: 'Creamy Tigernut Milk',
    category: 'Drinks',
    price: 1500,
    description: 'Freshly pressed tigernut milk blended with dates and coconut. 100% Natural.',
    image: 'https://images.unsplash.com/photo-1626139576127-450b7194f1c9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dr-3',
    name: 'Ultimate Parfait Cup',
    category: 'Drinks',
    price: 4000,
    description: 'Layers of thick Greek yogurt, honey-toasted granola, strawberries, kiwi, and grapes.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80'
  },
  
  // CAKES
  {
    id: 'ck-1',
    name: 'Red Velvet Birthday Cake',
    category: 'Cakes',
    price: 25000,
    description: 'A lush 8-inch Red Velvet cake with cream cheese frosting and edible gold leaf.',
    image: 'https://images.unsplash.com/photo-1586788680434-30d32443d4fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ck-2',
    name: 'Chocolate Fudge Fantasy',
    category: 'Cakes',
    price: 22000,
    description: 'Rich, moist chocolate cake layered with ganache and topped with chocolates.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ck-3',
    name: 'Vanilla Wedding Tier',
    category: 'Cakes',
    price: 85000,
    description: 'Elegant 2-tier vanilla sponge cake with floral buttercream design for intimate weddings.',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80'
  },

  // FOOD TRAYS
  {
    id: 'ft-1',
    name: 'Small Chops Platter',
    category: 'Food Trays',
    price: 8000,
    description: 'A mix of Puff-puff, Samosa, Spring Rolls, and Spicy Gizzard. Perfect for sharing.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ft-2',
    name: 'Jumbo Event Tray',
    category: 'Food Trays',
    price: 45000,
    description: 'Massive tray containing Jollof, Fried Rice, 5pcs Turkey, 5pcs Chicken, Moi-moi and Coleslaw.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },

  // SURPRISES
  {
    id: 'sp-1',
    name: 'Love Box Surprise',
    category: 'Surprises',
    price: 30000,
    description: 'Curated box with a 6-inch cake, bottle of wine, chocolates, and a personalized note.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp-2',
    name: 'Breakfast in Bed Package',
    category: 'Surprises',
    price: 20000,
    description: 'Freshly baked pastries, parfait, juice, and a sandwich delivered early morning.',
    image: 'https://images.unsplash.com/photo-1533089862017-5614ec87e284?auto=format&fit=crop&w=800&q=80'
  }
];

// Delivery Locations - ABIA STATE ONLY (17 LGAs)
export const DELIVERY_LOCATIONS: Record<string, StateData> = {
  Abia: {
    name: 'Abia',
    lgas: {
      'Aba North': { name: 'Aba North', stops: [{ name: 'Brass Junction', price: 1000, time: '30-45 mins' }, { name: 'Okigwe Rd', price: 900, time: '30-45 mins' }] },
      'Aba South': { name: 'Aba South', stops: [{ name: 'Main Market', price: 1000, time: '30-45 mins' }, { name: 'Cemetery Rd', price: 900, time: '30-45 mins' }] },
      'Arochukwu': { name: 'Arochukwu', stops: [{ name: 'Town Center', price: 2500, time: '60-90 mins' }] },
      'Bende': { name: 'Bende', stops: [{ name: 'Bende HQ', price: 2000, time: '60-90 mins' }] },
      'Ikwuano': { name: 'Ikwuano', stops: [{ name: 'MOUAU Campus', price: 1500, time: '45-60 mins' }] },
      'Isiala Ngwa North': { name: 'Isiala Ngwa North', stops: [{ name: 'Okpuala', price: 1800, time: '50-70 mins' }] },
      'Isiala Ngwa South': { name: 'Isiala Ngwa South', stops: [{ name: 'Omoba', price: 1800, time: '50-70 mins' }] },
      'Isuikwuato': { name: 'Isuikwuato', stops: [{ name: 'Mbalano', price: 2200, time: '60-90 mins' }] },
      'Obi Ngwa': { name: 'Obi Ngwa', stops: [{ name: 'Mgboko', price: 1500, time: '45-60 mins' }] },
      'Ohafia': { name: 'Ohafia', stops: [{ name: 'Ebem Ohafia', price: 2500, time: '60-90 mins' }] },
      'Osisioma': { name: 'Osisioma', stops: [{ name: 'Osisioma Junction', price: 1200, time: '40-55 mins' }] },
      'Ugwunagbo': { name: 'Ugwunagbo', stops: [{ name: 'Osusu', price: 1500, time: '45-60 mins' }] },
      'Ukwa East': { name: 'Ukwa East', stops: [{ name: 'Azumini', price: 2500, time: '60-90 mins' }] },
      'Ukwa West': { name: 'Ukwa West', stops: [{ name: 'Oke Ikpe', price: 2500, time: '60-90 mins' }] },
      'Umuahia North': { name: 'Umuahia North', stops: [{ name: 'Isi Gate', price: 1000, time: '30-45 mins' }, { name: 'Government House Area', price: 1000, time: '30-45 mins' }] },
      'Umuahia South': { name: 'Umuahia South', stops: [{ name: 'Ubakala', price: 1200, time: '40-50 mins' }] },
      'Obingwa': { name: 'Obingwa', stops: [{ name: 'Ahiaba', price: 1500, time: '45-60 mins' }] }
    }
  }
};

// Mock Branches
export const BRANCHES_DATA: BranchesData = {
  Abia: {
    'Aba North': [{ id: 'anna-aba', chain: 'Anna Cakes HQ', branch_city: 'Aba', branch_address: 'Factory Road, Aba', menu: MENU_ITEMS.map(i => ({itemId: i.id, price_range: `₦${i.price}`})) }],
    'Aba South': [{ id: 'anna-aba', chain: 'Anna Cakes HQ', branch_city: 'Aba', branch_address: 'Factory Road, Aba', menu: MENU_ITEMS.map(i => ({itemId: i.id, price_range: `₦${i.price}`})) }],
    // ... Simplified mock for other locations to default to HQ
  }
};