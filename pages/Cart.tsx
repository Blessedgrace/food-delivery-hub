import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { navigateTo } = useNavigation();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={48} className="text-brand-orange" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any delicious meals yet.</p>
        <button 
          onClick={() => navigateTo('menu', 'All')}
          className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-colors"
        >
          Start Ordering
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart ({items.length} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="flex-grow space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
              
              <div className="flex-grow">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-brand-orange font-medium">₦{item.price.toLocaleString()}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-white rounded shadow-sm transition-colors text-gray-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 hover:bg-white rounded shadow-sm transition-colors text-gray-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xs flex items-center gap-1 hover:text-red-700"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:w-96">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Delivery Fee</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8 pt-4 border-t">
              <span className="font-bold text-lg text-gray-800">Total</span>
              <span className="font-bold text-2xl text-brand-orange">₦{cartTotal.toLocaleString()}</span>
            </div>

            <button 
              onClick={() => navigateTo('checkout')}
              className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;