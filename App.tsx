import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import OrderHistory from './pages/OrderHistory';
import Catering from './pages/Catering';
import AIAssistant from './pages/AIAssistant';
import CakeDesigner from './pages/CakeDesigner';
import LocationSelector from './components/LocationSelector';
import { CheckCircle2, Bitcoin, Banknote, CreditCard, Cake, ShoppingBag } from 'lucide-react';

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
      case 'history':
        return <OrderHistory />;
      case 'catering':
        return <Catering />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'cake-designer':
        return <CakeDesigner />;
      case 'order-success':
        const latestOrder = (() => {
          try {
            return JSON.parse(localStorage.getItem('latest_order') || '{}');
          } catch {
            return {};
          }
        })();

        const getStatusMessage = () => {
          const amount = `₦${latestOrder.total?.toLocaleString() || '0'}`;
          
          switch (latestOrder.method) {
            case 'paystack':
              return {
                title: 'Order Confirmed',
                text: `Payment of ${amount} was successful via Paystack. Your order is now being processed.`,
                icon: <CheckCircle2 className="text-white" size={40} />
              };
            case 'cash':
              return {
                title: 'Order Confirmed',
                text: `Your order has been placed! Please have ${amount} ready for the rider upon delivery.`,
                icon: <Banknote className="text-white" size={40} />
              };
            default:
              return {
                title: 'Order Confirmed',
                text: `Thank you for your purchase. We have received your payment of ${amount}.`,
                icon: <CreditCard className="text-white" size={40} />
              };
          }
        };

        const status = getStatusMessage();

        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl border border-gray-100 my-10">
              <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200 animate-bounce">
                {status.icon}
              </div>
              
              <h2 className="text-3xl font-black text-gray-800 mb-2">{status.title}</h2>
              <p className="text-gray-500 mb-8 leading-relaxed px-4">
                {status.text}
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 text-left">
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Order ID</span>
                    <span className="font-mono font-bold text-gray-800">#{latestOrder.id || '---'}</span>
                </div>
                
                {/* Item Summary */}
                {latestOrder.items && latestOrder.items.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Items</span>
                    {latestOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600"><span className="font-bold">{item.quantity}x</span> {item.name}</span>
                        <span className="font-medium text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                   <span className="font-bold text-gray-800">Total Amount</span>
                   <span className="font-black text-xl text-brand-green">₦{latestOrder.total?.toLocaleString()}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <p><span className="font-bold">Deliver to:</span> {latestOrder.location}</p>
                    <p className="mt-1"><span className="font-bold">Est. Time:</span> {latestOrder.deliveryTime}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                    onClick={() => navigateTo('track')}
                    className="w-full bg-brand-green text-white py-4 rounded-xl font-bold hover:bg-green-800 transition-colors shadow-lg shadow-green-100"
                >
                    Track Your Order
                </button>
                <button 
                    onClick={() => navigateTo('home')}
                    className="w-full bg-white text-gray-500 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors border border-gray-100"
                >
                    Continue Shopping
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow">
        {renderView()}
      </main>
      <LocationSelector />
      
      {/* Simple Footer */}
      <footer className="bg-brand-green text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Cake className="text-brand-yellow" />
            <span className="font-bold text-xl">Anna Cakes</span>
          </div>
          <p className="text-green-200 text-sm mb-4">Delicious moments, baked with love.</p>
          <p className="text-green-400 text-xs">© 2024 Anna Cakes & Confectioneries. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <NavigationProvider>
      <LocationProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </LocationProvider>
    </NavigationProvider>
  );
};

export default App;