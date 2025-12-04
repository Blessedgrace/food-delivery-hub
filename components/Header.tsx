import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Cake, MapPin, Sparkles, Bot } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';

const Header: React.FC = () => {
  const { navigateTo, currentView } = useNavigation();
  const { itemCount } = useCart();
  const { selectedLGA, selectedState } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home', category: undefined },
    { label: 'Menu', view: 'menu', category: 'All' },
    { label: 'AI Chef', view: 'ai-assistant', category: undefined, icon: <Bot size={16} /> },
    { label: 'Design Cake', view: 'cake-designer', category: undefined, icon: <Sparkles size={16} /> },
    { label: 'Track', view: 'track', category: undefined },
  ];

  const handleNav = (view: any, category?: string) => {
    navigateTo(view, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Modern Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => handleNav('home')}
        >
          <div className="relative">
             <div className="bg-brand-green w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
               <Cake size={20} />
             </div>
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-yellow rounded-full border-2 border-white"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-gray-800 tracking-tight leading-none font-serif">
              Anna<span className="text-brand-green">Cakes</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Confectioneries
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center font-medium">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.view, link.category)}
              className={`transition-colors text-sm font-bold flex items-center gap-2 py-2 border-b-2 ${
                currentView === link.view 
                ? 'text-brand-green border-brand-yellow' 
                : 'text-gray-500 border-transparent hover:text-brand-green'
              }`}
            >
              {link.icon && <span className="text-brand-yellow">{link.icon}</span>}
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* Location Display */}
          {selectedLGA && (
             <div className="hidden sm:flex items-center gap-2 text-xs bg-gray-50 text-gray-700 px-3 py-2 rounded-lg font-bold border border-gray-100">
               <MapPin size={14} className="text-brand-green" />
               <span>{selectedLGA}, {selectedState}</span>
             </div>
          )}

          <button 
            onClick={() => handleNav('cart')}
            className="relative p-2 text-gray-700 hover:text-brand-green transition-transform hover:scale-105"
          >
            <div className="bg-brand-lightgreen p-2 rounded-full">
               <ShoppingCart size={20} className="text-brand-green" />
            </div>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-green text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl z-50 animate-in slide-in-from-top-2">
          <div className="flex flex-col p-4 space-y-4">
            {/* Mobile Location Display */}
            {selectedLGA && (
              <div className="flex items-center gap-2 text-sm text-brand-green font-bold pb-4 border-b border-gray-100">
                <MapPin size={16} />
                <span>{selectedLGA}, {selectedState}</span>
              </div>
            )}
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.view, link.category)}
                className={`text-left text-lg py-3 px-4 rounded-xl flex items-center gap-3 ${
                   currentView === link.view 
                   ? 'bg-brand-lightgreen text-brand-green font-bold' 
                   : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                 {link.icon && <span className="text-brand-yellow">{link.icon}</span>}
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;