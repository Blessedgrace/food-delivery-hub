import { Product } from './types';

export const MENU_ITEMS: Product[] = [
  // Sea Food
  {
    id: 'sf-1',
    name: 'Grilled Fish',
    category: 'Sea Food',
    price: 3500,
    description: 'Spicy grilled catfish served with coleslaw.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2749?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sf-2',
    name: 'Jumbo Prawns',
    category: 'Sea Food',
    price: 5000,
    description: 'Succulent grilled tiger prawns.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sf-3',
    name: 'Periwinkle Sauce',
    category: 'Sea Food',
    price: 2500,
    description: 'Native periwinkle cooked in spicy sauce.',
    image: 'https://images.unsplash.com/photo-1626804475297-411dbe63c4aa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sf-4',
    name: 'Seafood Okra',
    category: 'Sea Food',
    price: 4000,
    description: 'Fresh okra soup loaded with crabs, fish, and prawns.',
    image: 'https://images.unsplash.com/photo-1551326844-3101d292d04a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sf-5',
    name: 'Garlic Butter Shrimps',
    category: 'Sea Food',
    price: 4500,
    description: 'Juicy shrimps grilled in rich garlic butter sauce.',
    image: 'https://images.unsplash.com/photo-1625937751876-4515cd8e771d?auto=format&fit=crop&w=800&q=80'
  },

  // Rice Meals
  {
    id: 'rm-1',
    name: 'Smoky Jollof Rice',
    category: 'Rice Meals',
    price: 1500,
    description: 'Classic party jollof rice with fried plantain.',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc70859f7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rm-2',
    name: 'Fried Rice',
    category: 'Rice Meals',
    price: 1500,
    description: 'Loaded with veggies, liver, and shrimps.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f10842619?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rm-3',
    name: 'Coconut Rice',
    category: 'Rice Meals',
    price: 1800,
    description: 'Rice cooked in fresh coconut milk.',
    image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rm-4',
    name: 'Rice & Chicken',
    category: 'Rice Meals',
    price: 2500,
    description: 'White rice served with tomato stew and fried chicken.',
    image: 'https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&w=800&q=80'
  },

  // Fast Food
  {
    id: 'ff-1',
    name: 'Chicken Shawarma',
    category: 'Fast Food',
    price: 2000,
    description: 'Double sausage, grilled chicken, and creamy sauce.',
    image: 'https://images.unsplash.com/photo-1633321769407-215fbd38a379?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ff-2',
    name: 'Beef Burger',
    category: 'Fast Food',
    price: 2500,
    description: 'Juicy beef patty with cheese and fresh veggies.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ff-3',
    name: 'Crispy Fries',
    category: 'Fast Food',
    price: 1000,
    description: 'Golden fried potato chips.',
    image: 'https://images.unsplash.com/photo-1573080496987-a199f8cd4054?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ff-4',
    name: 'Spicy Wings',
    category: 'Fast Food',
    price: 3000,
    description: '6 pieces of hot and spicy chicken wings.',
    image: 'https://images.unsplash.com/photo-1569691105751-88df003de7a4?auto=format&fit=crop&w=800&q=80'
  },

  // Soups
  {
    id: 'sp-1',
    name: 'Egusi Soup',
    category: 'Soups',
    price: 2000,
    description: 'Melon seed soup cooked with spinach and goat meat.',
    image: 'https://images.unsplash.com/photo-1543362906-ac1b452601d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp-2',
    name: 'Ogbono Soup',
    category: 'Soups',
    price: 2000,
    description: 'Draw soup with assorted meat and dry fish.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp-3',
    name: 'Afang Soup',
    category: 'Soups',
    price: 2500,
    description: 'Traditional Calabar vegetable soup.',
    image: 'https://images.unsplash.com/photo-1608500218860-2e4a873c5243?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp-4',
    name: 'Okra Soup',
    category: 'Soups',
    price: 1800,
    description: 'Fresh okra soup with fish.',
    image: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&w=800&q=80'
  },

  // Swallows
  {
    id: 'sw-1',
    name: 'Fufu',
    category: 'Swallows',
    price: 500,
    description: 'Soft cassava dough.',
    image: 'https://images.unsplash.com/photo-1643936652427-44047df1272d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sw-2',
    name: 'Pounded Yam',
    category: 'Swallows',
    price: 800,
    description: 'Smooth and stretchy pounded yam.',
    image: 'https://images.unsplash.com/photo-1506543730-844288820c4f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sw-3',
    name: 'Garri (Eba)',
    category: 'Swallows',
    price: 400,
    description: 'Yellow or white garri.',
    image: 'https://images.unsplash.com/photo-1644445347262-c941364d6d37?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sw-4',
    name: 'Semovita',
    category: 'Swallows',
    price: 600,
    description: 'Smooth semolina dough.',
    image: 'https://images.unsplash.com/photo-1626505771746-271d996d9976?auto=format&fit=crop&w=800&q=80'
  },

  // Drinks
  {
    id: 'dr-1',
    name: 'Chapman',
    category: 'Drinks',
    price: 1500,
    description: 'Fruity cocktail with cucumber and lemon slices.',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dr-2',
    name: 'Ice Cold Coke',
    category: 'Drinks',
    price: 500,
    description: '50cl bottle.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dr-3',
    name: 'Tropical Smoothie',
    category: 'Drinks',
    price: 2000,
    description: 'Blend of pineapple, mango, and banana.',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80'
  },

  // Snacks
  {
    id: 'sn-1',
    name: 'Meat Pie',
    category: 'Snacks',
    price: 800,
    description: 'Rich buttery pastry filled with minced meat.',
    image: 'https://images.unsplash.com/photo-1616031036816-565d70420f8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sn-2',
    name: 'Jam Doughnut',
    category: 'Snacks',
    price: 500,
    description: 'Fluffy doughnut filled with strawberry jam.',
    image: 'https://images.unsplash.com/photo-1551024601-5637736e9270?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sn-3',
    name: 'Chin Chin',
    category: 'Snacks',
    price: 1200,
    description: 'Crunchy fried dough snack (bottle).',
    image: 'https://images.unsplash.com/photo-1591083424686-3023ebc44d77?auto=format&fit=crop&w=800&q=80'
  }
];