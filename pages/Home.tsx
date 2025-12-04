import React, { useState } from 'react';
import { Search, ArrowRight, Truck } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { CATEGORIES } from '../types';
import { MENU_ITEMS } from '../constants';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  // Live search filtering
  const filteredProducts = searchTerm 
    ? MENU_ITEMS.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8) // Limit search results on home
    : [];

  const categoryImages: Record<string, string> = {
    'Sea Food': 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2749?auto=format&fit=crop&w=800&q=80',
    'Rice Meals': 'https://images.unsplash.com/photo-1604329760661-e71dc70859f7?auto=format&fit=crop&w=800&q=80',
    'Fast Food': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    'Soups': 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    'Swallows': 'https://images.unsplash.com/photo-1643936652427-44047df1272d?auto=format&fit=crop&w=800&q=80',
    'Drinks': 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=800&q=80',
    'Snacks': 'https://images.unsplash.com/photo-1616031036816-565d70420f8c?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Banner */}
      <section className="relative bg-brand-orange text-white rounded-b-3xl overflow-hidden shadow-lg mx-2 mt-2 md:mx-4">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="absolute -right-20 -bottom-40 w-80 h-80 bg-brand-yellow rounded-full mix-blend-overlay opacity-50 blur-3xl"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 text-center md:text-left">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Authentic <span className="text-brand-yellow">Naija Flavors</span> <br/> Delivered Fast!
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 font-medium">
              From spicy Jollof to savory Egusi, satisfy your cravings in minutes.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => navigateTo('menu', 'All')}
                className="bg-white text-brand-orange px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Order Now <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigateTo('track')}
                className="bg-brand-red text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Truck size={20} /> Track Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-xl max-w-2xl mx-auto flex items-center gap-4 border border-gray-100">
          <Search className="text-gray-400" size={24} />
          <input 
            type="text" 
            placeholder="What are you craving? (e.g., Jollof, Burger)" 
            className="flex-grow bg-transparent outline-none text-lg text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Search Results (Conditional) */}
      {searchTerm && (
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
            <button onClick={() => setSearchTerm('')} className="text-brand-orange font-medium hover:underline">Clear Search</button>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center py-10 text-gray-500">No items found matching "{searchTerm}"</div>
          )}
        </section>
      )}

      {/* Categories Grid */}
      {!searchTerm && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-brand-orange rounded-full"></span>
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map(cat => (
              <div 
                key={cat} 
                onClick={() => navigateTo('menu', cat)}
                className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all"
              >
                <img 
                  src={categoryImages[cat]} 
                  alt={cat}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 md:p-6">
                  <h3 className="text-white font-bold text-lg md:text-2xl">{cat}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default Home;