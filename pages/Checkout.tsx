import React, { useState, useRef, useEffect } from 'react';
import { MapPin, CreditCard, User, Phone, Mail, Banknote, ShieldCheck, ChevronRight, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { useLocation } from '../context/LocationContext';
import { DELIVERY_LOCATIONS } from '../constants';

const Checkout: React.FC = () => {
  const { cartTotal, clearCart, items } = useCart();
  const { navigateTo } = useNavigation();
  const { selectedState, selectedLGA, setLocation } = useLocation(); // Use setLocation to sync
  const formRef = useRef<HTMLFormElement>(null);
  
  // Local state for the form, independent of global context initially to allow changes
  const [checkoutLGA, setCheckoutLGA] = useState(selectedLGA || '');
  const [checkoutStop, setCheckoutStop] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'card' | 'cash'>('paystack');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('');

  // Update Delivery Info when LGA or Stop changes
  useEffect(() => {
    if (checkoutLGA && checkoutStop) {
        // Assume 'Abia' is the state as per requirements
        const stopData = DELIVERY_LOCATIONS['Abia']?.lgas[checkoutLGA]?.stops.find(s => s.name === checkoutStop);
        if (stopData) {
            setDeliveryFee(stopData.price);
            setDeliveryTime(stopData.time);
        }
    } else {
        setDeliveryFee(0);
        setDeliveryTime('');
    }
  }, [checkoutLGA, checkoutStop]);

  const grandTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutLGA || !checkoutStop) {
        alert("Please select your delivery area and bus stop.");
        return;
    }

    // Sync global location context
    setLocation('Abia', checkoutLGA);
    
    setIsProcessing(true);

    // Simulation of Payment Gateway / Processing
    const processingTime = paymentMethod === 'paystack' ? 3000 : 2000;

    setTimeout(() => {
      const orderId = Math.floor(100000 + Math.random() * 900000).toString();
      
      const newOrder = {
        id: orderId,
        method: paymentMethod,
        total: grandTotal,
        date: new Date().toISOString(),
        items: items,
        customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
        },
        location: `${checkoutStop}, ${checkoutLGA}, Abia State`,
        deliveryTime: deliveryTime,
        deliveryFee: deliveryFee
      };

      // Save order details
      localStorage.setItem('latest_order', JSON.stringify(newOrder));

      // Update History
      try {
        const history = JSON.parse(localStorage.getItem('order_history') || '[]');
        localStorage.setItem('order_history', JSON.stringify([newOrder, ...history]));
      } catch (error) {
        console.error("Failed to save order history", error);
      }

      setIsProcessing(false);
      clearCart();
      navigateTo('order-success');
    }, processingTime);
  };

  if (cartTotal === 0) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start adding delicious items to your cart.</p>
            <button onClick={() => navigateTo('menu', 'All')} className="bg-brand-green text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-colors">Go to Menu</button>
        </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-gray-800 mb-8 flex items-center gap-2">
            <span className="bg-brand-yellow w-2 h-8 rounded-full"></span>
            Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT COLUMN - FORMS */}
            <div className="flex-grow space-y-6">
                
                {/* 1. Contact Information */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-50">
                        <User className="text-brand-green" size={20} /> Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                            <input 
                                type="text" 
                                required
                                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
                                placeholder="e.g. Chioma Okoro"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                            <input 
                                type="tel" 
                                required
                                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
                                placeholder="080 1234 5678"
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                            <input 
                                type="email" 
                                required
                                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
                                placeholder="chioma@example.com"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Delivery Details */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-50">
                        <MapPin className="text-brand-green" size={20} /> Delivery Details
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">State</label>
                            <input type="text" value="Abia State" disabled className="w-full p-3 bg-gray-100 rounded-lg border border-gray-200 text-gray-500 font-medium cursor-not-allowed" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Local Govt. Area</label>
                            <select 
                                className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:border-brand-green outline-none"
                                value={checkoutLGA}
                                onChange={e => {
                                    setCheckoutLGA(e.target.value);
                                    setCheckoutStop(''); // Reset stop when LGA changes
                                }}
                            >
                                <option value="">Select LGA</option>
                                {Object.keys(DELIVERY_LOCATIONS['Abia'].lgas).map(lga => (
                                    <option key={lga} value={lga}>{lga}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Nearest Bus Stop / Junction</label>
                            <select 
                                className="w-full p-3 bg-white rounded-lg border border-gray-200 focus:border-brand-green outline-none disabled:bg-gray-50 disabled:text-gray-400"
                                value={checkoutStop}
                                onChange={e => setCheckoutStop(e.target.value)}
                                disabled={!checkoutLGA}
                            >
                                <option value="">{checkoutLGA ? 'Select Pickup Point' : 'Select LGA First'}</option>
                                {checkoutLGA && DELIVERY_LOCATIONS['Abia'].lgas[checkoutLGA]?.stops.map(stop => (
                                    <option key={stop.name} value={stop.name}>{stop.name} - ₦{stop.price}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                         <label className="text-xs font-bold text-gray-500 uppercase">Delivery Address / Description</label>
                         <textarea 
                            required
                            rows={2}
                            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-brand-green outline-none"
                            placeholder="House Number, Street Name, Color of Gate..."
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                         ></textarea>
                    </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-50">
                        <CreditCard className="text-brand-green" size={20} /> Payment Method
                    </h2>
                    
                    <div className="space-y-3">
                        {/* Paystack Option */}
                        <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            paymentMethod === 'paystack' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'
                        }`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                className="w-5 h-5 text-blue-600 accent-blue-600"
                                checked={paymentMethod === 'paystack'}
                                onChange={() => setPaymentMethod('paystack')}
                            />
                            <div className="flex-grow">
                                <span className="block font-bold text-gray-800">Pay with Paystack</span>
                                <span className="text-xs text-gray-500">Secure payment via Card, Bank Transfer, USSD</span>
                            </div>
                            <div className="flex gap-1">
                                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                            </div>
                        </label>

                        {/* Card Option (Generic) */}
                        <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            paymentMethod === 'card' ? 'border-brand-green bg-green-50' : 'border-gray-100 hover:border-gray-200'
                        }`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                className="w-5 h-5 text-brand-green accent-brand-green"
                                checked={paymentMethod === 'card'}
                                onChange={() => setPaymentMethod('card')}
                            />
                            <div className="flex-grow">
                                <span className="block font-bold text-gray-800">Credit / Debit Card</span>
                                <span className="text-xs text-gray-500">Mastercard, Visa, Verve</span>
                            </div>
                        </label>

                        {/* Cash Option */}
                        <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            paymentMethod === 'cash' ? 'border-brand-yellow bg-yellow-50' : 'border-gray-100 hover:border-gray-200'
                        }`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                className="w-5 h-5 text-brand-yellow accent-brand-yellow"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                            />
                            <div className="flex-grow">
                                <span className="block font-bold text-gray-800">Pay on Delivery</span>
                                <span className="text-xs text-gray-500">Cash or Transfer to Rider</span>
                            </div>
                            <Banknote className="text-brand-yellow" />
                        </label>
                    </div>

                    {/* Card Details Inputs (Only if Card selected) */}
                    {paymentMethod === 'card' && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 animate-in fade-in">
                            <input type="text" placeholder="Card Number" className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" value={formData.cardNumber} onChange={e => setFormData({...formData, cardNumber: e.target.value})} />
                            <div className="flex gap-3">
                                <input type="text" placeholder="MM/YY" className="w-1/2 p-3 bg-white border border-gray-300 rounded-lg outline-none" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} />
                                <input type="text" placeholder="CVV" className="w-1/2 p-3 bg-white border border-gray-300 rounded-lg outline-none" value={formData.cvv} onChange={e => setFormData({...formData, cvv: e.target.value})} />
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* RIGHT COLUMN - SUMMARY */}
            <div className="lg:w-96">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                    <h3 className="text-xl font-black text-gray-800 mb-6 pb-4 border-b border-gray-100">Order Summary</h3>
                    
                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {items.map(item => (
                            <div key={item.id} className="flex gap-3 text-sm">
                                <div className="font-bold text-gray-400">{item.quantity}x</div>
                                <div className="flex-grow text-gray-700 font-medium line-clamp-2">{item.name}</div>
                                <div className="font-bold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>Subtotal</span>
                            <span>₦{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>Delivery Fee</span>
                            <span>{deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : 'Select Location'}</span>
                        </div>
                        <div className="flex justify-between text-gray-900 font-black text-xl pt-2">
                            <span>Total</span>
                            <span>₦{grandTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className={`w-full py-4 mt-8 rounded-xl font-bold text-lg text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                            isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-green hover:bg-green-700'
                        }`}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="animate-spin" /> 
                                {paymentMethod === 'paystack' ? 'Redirecting...' : 'Processing...'}
                            </>
                        ) : (
                            <>
                                Pay Now <ChevronRight size={20} />
                            </>
                        )}
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 py-2 rounded-lg">
                        <ShieldCheck size={14} className="text-green-600" />
                        <span>Secured by Paystack</span>
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Full Screen Processing Overlay for Paystack */}
      {isProcessing && paymentMethod === 'paystack' && (
        <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 text-center max-w-sm w-full">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Redirecting to Paystack</h3>
                <p className="text-gray-500 text-sm">Please wait while we securely connect you to the payment gateway...</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;