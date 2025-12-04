import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, navigateTo } = useNavigation();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'menu':
        return <Menu />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'track':
        return <TrackOrder />;
      case 'order-success':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl transform animate-bounce-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h2>
              <p className="text-gray-500 mb-8">Your delicious food is being prepared. Your order ID is <span className="font-mono font-bold text-gray-800">#48392</span>.</p>
              <button 
                onClick={() => navigateTo('track')}
                className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
              >
                Track Order
              </button>
            </div>
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {renderView()}
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-gray-400 text-sm">
        <p>© 2024 NaijaDelight Bistro. Good Food, Good Mood.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <NavigationProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </NavigationProvider>
  );
};

export default App;