import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { MENU_ITEMS } from '../constants';
import { CATEGORIES } from '../types';
import ProductCard from '../components/ProductCard';

const Menu: React.FC = () => {
  const { activeCategory, navigateTo } = useNavigation();

  const products = activeCategory && activeCategory !== 'All'
    ? MENU_ITEMS.filter(item => item.category === activeCategory)
    : MENU_ITEMS;

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {activeCategory === 'All' || !activeCategory ? 'Full Menu' : `${activeCategory} Menu`}
        </h1>
        
        {/* Category Pills Scroller */}
        <div className="flex overflow-x-auto pb-2 gap-2 w-full md:w-auto no-scrollbar">
          <button
            onClick={() => navigateTo('menu', 'All')}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              !activeCategory || activeCategory === 'All' 
                ? 'bg-brand-orange text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => navigateTo('menu', cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-brand-orange text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500 text-lg">No items found in this category.</p>
          <button 
             onClick={() => navigateTo('menu', 'All')}
             className="mt-4 text-brand-orange font-medium hover:underline"
          >
            View All Items
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;