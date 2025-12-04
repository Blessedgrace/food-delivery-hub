import React, { useState } from 'react';
import { Search, ArrowRight, Truck, MapPin, Star, Heart, Award, ChefHat } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useLocation } from '../context/LocationContext';
import { CATEGORIES } from '../types';
import { MENU_ITEMS } from '../constants';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { selectedState, selectedLGA } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Search Logic
  const filteredProducts = searchTerm 
    ? MENU_ITEMS.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8) 
    : [];

  // Visual Assets for Categories
  const categoryAssets: Record<string, { img: string, desc: string, color: string }> = {
    'Cakes': { 
      img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', 
      desc: 'Celebration Ready',
      color: 'bg-pink-50 text-pink-700'
    },
    'Food Platters': { 
      img: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80', 
      desc: 'Jollof & Fried Rice',
      color: 'bg-orange-50 text-orange-700'
    },
    'Drinks': { 
      img: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80', 
      desc: 'Zobo, Parfait & more',
      color: 'bg-purple-50 text-purple-700'
    },
    'Food Trays': { 
      img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', 
      desc: 'Small Chops & Snacks',
      color: 'bg-yellow-50 text-yellow-700'
    },
    'Surprises': { 
      img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', 
      desc: 'Gift Boxes & Packages',
      color: 'bg-red-50 text-red-700'
    },
    'Catering': { 
      img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', 
      desc: 'Book for Events',
      color: 'bg-blue-50 text-blue-700'
    }
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Full Width Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
           <img 
             src="https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=1600&q=80" 
             alt="Delicious Spread" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <div className="inline-block bg-brand-yellow text-brand-green px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-pulse">
               🚚 Delivered Across Abia State
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
              Delicious Cakes,<br/>
              <span className="text-brand-yellow">Drinks & Food</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-200 font-medium leading-relaxed max-w-lg">
              Experience the best Parfaits, Smoky Jollof, and Custom Cakes delivered straight to your doorstep in minutes.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigateTo('menu', 'All')}
                className="bg-brand-green hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
              >
                Order Now <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar - Floating */}
      <section className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="bg-white p-2 rounded-full shadow-2xl max-w-xl mx-auto flex items-center border border-gray-100">
          <div className="pl-6 text-gray-400">
             <Search size={24} />
          </div>
          <input 
            type="text" 
            placeholder="Search 'Red Velvet' or 'Jollof'..." 
            className="flex-grow bg-transparent p-4 outline-none text-lg text-gray-800 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-brand-yellow text-brand-green p-4 rounded-full hover:bg-yellow-400 transition-colors">
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Search Results */}
      {searchTerm && (
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
            <button onClick={() => setSearchTerm('')} className="text-gray-500 font-medium hover:text-brand-green">Clear</button>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center py-10 text-gray-500">No items found matching "{searchTerm}"</div>
          )}
        </section>
      )}

      {/* Visual Categories Grid */}
      {!searchTerm && (
        <section className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-800 mb-2">Our Menu Categories</h2>
            <p className="text-gray-500">Explore our wide range of delicious offerings</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {CATEGORIES.map(cat => {
              const asset = categoryAssets[cat] || { img: '', desc: '', color: 'bg-gray-50' };
              return (
                <div 
                  key={cat}
                  onClick={() => cat === 'Catering' ? navigateTo('catering') : navigateTo('menu', cat)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-lg h-64 md:h-80 transition-transform hover:-translate-y-2"
                >
                  <img 
                    src={asset.img} 
                    alt={cat}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-2xl mb-1">{cat}</h3>
                    <p className="text-gray-300 text-sm font-medium">{asset.desc}</p>
                    <div className="mt-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Best Sellers / Featured */}
      {!searchTerm && (
        <section className="container mx-auto px-4">
          <div className="bg-brand-lightyellow/30 py-16 px-4 md:px-8 rounded-3xl">
             <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
               <div>
                  <div className="flex items-center gap-2 mb-2 text-brand-green font-bold text-sm uppercase tracking-wide">
                     <Star size={16} className="fill-brand-green" /> Trending Now
                  </div>
                  <h2 className="text-3xl font-black text-gray-800">Fresh Recommendations</h2>
               </div>
               <button 
                 onClick={() => navigateTo('menu', 'All')} 
                 className="border-2 border-gray-900 text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-colors"
               >
                 View Full Menu
               </button>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {MENU_ITEMS.slice(0, 4).map(product => (
                   <ProductCard key={product.id} product={product} />
                ))}
             </div>
          </div>
        </section>
      )}

      {/* About Us Section */}
      {!searchTerm && (
        <section className="relative py-24 bg-gray-900 overflow-hidden">
           {/* Background Image */}
           <div className="absolute inset-0 opacity-40">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1600&q=80" 
                alt="Our Kitchen" 
                className="w-full h-full object-cover"
              />
           </div>
           
           <div className="container mx-auto px-4 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-brand-yellow/90 text-brand-green px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <Heart size={16} fill="currentColor" /> Our Passion
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                Crafting Sweet Memories
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
                "At Anna Cake & Confectionaries, we create delicious cakes, drinks, food trays, and surprises for all occasions. Our passion is to make every event special with fresh, vibrant, and high-quality products."
              </p>
              
              <div className="mt-12 flex justify-center gap-8 text-white/80">
                 <div className="text-center">
                    <h4 className="text-4xl font-black text-brand-yellow mb-1">5k+</h4>
                    <p className="text-sm uppercase tracking-wider">Happy Customers</p>
                 </div>
                 <div className="w-px bg-white/20 h-16"></div>
                 <div className="text-center">
                    <h4 className="text-4xl font-black text-brand-yellow mb-1">100+</h4>
                    <p className="text-sm uppercase tracking-wider">Events Catered</p>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Meet the CEO Section */}
      {!searchTerm && (
        <section className="container mx-auto px-4">
           <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="md:w-1/2 relative min-h-[400px]">
                 <img 
                   src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80" 
                   alt="Anna - CEO" 
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                 <div className="absolute bottom-6 left-6 text-white md:hidden">
                    <h3 className="text-2xl font-bold">Anna Okonkwo</h3>
                    <p className="text-brand-yellow font-medium">Founder & Head Chef</p>
                 </div>
              </div>
              
              {/* Content Side */}
              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                 <div className="flex items-center gap-2 text-brand-green font-bold text-sm uppercase tracking-wide mb-4">
                    <Award size={18} /> Meet the CEO
                 </div>
                 <h2 className="text-4xl font-black text-gray-800 mb-6 hidden md:block">
                   Anna Okonkwo
                 </h2>
                 <h3 className="text-xl text-brand-orange font-medium mb-6 hidden md:block">
                   Founder & Head Chef
                 </h3>
                 
                 <div className="space-y-6 text-gray-600 leading-relaxed">
                    <p>
                      With over a decade of culinary excellence, Anna's passion for baking started in her grandmother's kitchen in Umuahia. What began as a childhood hobby has blossomed into Abia State's premier confectionery brand.
                    </p>
                    <p>
                      "I believe every cake tells a story. My team and I are dedicated to delivering not just food, but joy, through exquisite flavors and artistic designs. Quality is our signature."
                    </p>
                 </div>

                 <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                       <ChefHat size={24} />
                    </div>
                    <div>
                       <p className="text-xs text-gray-400 uppercase font-bold">Signature</p>
                       <p className="font-handwriting text-2xl text-gray-800 font-bold italic">Anna O.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

    </div>
  );
};

export default Home;