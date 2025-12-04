import React, { useState } from 'react';
import { ShoppingCart, Menu, X, UtensilsCrossed, MapPin } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { navigateTo, currentView } = useNavigation();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home', category: undefined },
    { label: 'Menu', view: 'menu', category: 'All' },
    { label: 'Track Order', view: 'track', category: undefined },
  ];

  const handleNav = (view: any, category?: string) => {
    navigateTo(view, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => handleNav('home')}
        >
          <div className="bg-brand-orange p-2 rounded-full text-white">
            <UtensilsCrossed size={24} />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            Naija<span className="text-brand-orange">Delight</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center font-medium">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.view, link.category)}
              className={`hover:text-brand-orange transition-colors ${
                currentView === link.view ? 'text-brand-orange font-bold' : 'text-gray-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleNav('cart')}
            className="relative p-2 text-gray-600 hover:text-brand-orange transition-transform hover:scale-105"
          >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.view, link.category)}
                className={`text-left text-lg py-2 border-b border-gray-50 ${
                   currentView === link.view ? 'text-brand-orange font-bold' : 'text-gray-600'
                }`}
              >
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