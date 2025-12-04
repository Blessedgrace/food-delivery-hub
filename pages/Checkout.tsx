import React, { useState } from 'react';
import { MapPin, CreditCard, User, Phone, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { DeliveryType, DELIVERY_RATES } from '../types';

const Checkout: React.FC = () => {
  const { cartTotal, clearCart } = useCart();
  const { navigateTo } = useNavigation();
  
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('city');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = DELIVERY_RATES[deliveryType];
  const grandTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      // In a real app, we would pass the Order ID here
      navigateTo('order-success');
    }, 1500);
  };

  if (cartTotal === 0) {
    navigateTo('cart'); // Redirect back if empty
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Checkout Form */}
        <div className="flex-grow">
          <form onSubmit={handlePlaceOrder} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            
            {/* Contact Info */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                <User className="text-brand-orange" size={20} /> Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  required
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  required
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Delivery Info */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                <MapPin className="text-brand-orange" size={20} /> Delivery Information
              </h3>
              <div className="space-y-4">
                <textarea 
                  required
                  placeholder="Delivery Address (Street, House No, Landmark)" 
                  rows={3}
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                ></textarea>

                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Location for Delivery Fee</label>
                  <select 
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
                    className="w-full p-3 bg-white rounded-lg border border-gray-200 text-gray-700 outline-none cursor-pointer"
                  >
                    <option value="city">Within City (₦700)</option>
                    <option value="nearby">Nearby Outskirts (₦1200)</option>
                    <option value="far">Far Location (₦2000)</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="hidden lg:block w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 shadow-lg transition-transform active:scale-95 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Pay ₦${grandTotal.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Order Summary Side Panel */}
        <div className="lg:w-96">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
             <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Payment Summary</h3>
             
             <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Cart Subtotal</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-brand-orange font-medium text-sm bg-orange-50 p-2 rounded">
                  <span>Location</span>
                  <span className="capitalize">{deliveryType.replace('-', ' ')}</span>
                </div>
             </div>

             <div className="flex justify-between items-center mb-6 pt-4 border-t">
               <span className="font-bold text-xl text-gray-800">Total</span>
               <span className="font-bold text-2xl text-brand-green">₦{grandTotal.toLocaleString()}</span>
             </div>

             {/* Mobile-visible Place Order Button included in form above for desktop, duplicate here for mobile ease or just rely on the form button if structured correctly. Let's make the form button distinct. */}
             <button 
              onClick={(e) => {
                const form = document.querySelector('form');
                if (form?.checkValidity()) {
                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                } else {
                    form?.reportValidity();
                }
              }}
              disabled={isProcessing}
              className="lg:hidden w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Place Order (₦${grandTotal.toLocaleString()})`}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
                <CreditCard size={16} /> Pay on Delivery / Transfer
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;