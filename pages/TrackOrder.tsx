import React, { useState, useEffect } from 'react';
import { Search, Package, ChefHat, Truck, CheckCircle2 } from 'lucide-react';

const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Statuses to cycle through
  const steps = [
    { label: 'Order Received', icon: Package, activeColor: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Preparing', icon: ChefHat, activeColor: 'text-brand-orange', bg: 'bg-orange-100' },
    { label: 'On the way', icon: Truck, activeColor: 'text-yellow-500', bg: 'bg-yellow-100' },
    { label: 'Delivered', icon: CheckCircle2, activeColor: 'text-green-500', bg: 'bg-green-100' }
  ];

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setStatus(null);

    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      // Randomly pick a status index (1 to 3) for demo purposes, or just cycle randomly
      const randomStatusIndex = Math.floor(Math.random() * 4);
      setStatus(steps[randomStatusIndex].label);
    }, 1000);
  };

  const getStepStatus = (stepLabel: string) => {
    if (!status) return 'pending';
    const currentIndex = steps.findIndex(s => s.label === status);
    const stepIndex = steps.findIndex(s => s.label === stepLabel);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Track Your Order</h1>

      {/* Input Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleTrack} className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter Order ID (e.g., #12345)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-grow p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-brand-orange"
          />
          <button 
            type="submit"
            className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            {loading ? 'Checking...' : 'Track'}
          </button>
        </form>
      </div>

      {/* Status Result */}
      {status && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <p className="text-gray-500 mb-1">Order Status for <span className="font-mono font-bold text-gray-800">{orderId}</span></p>
            <h2 className="text-3xl font-bold text-brand-orange">{status}</h2>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full px-4 gap-8 md:gap-0">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0 -translate-y-1/2 rounded-full"></div>

            {steps.map((step, index) => {
              const stepState = getStepStatus(step.label);
              const isActive = stepState === 'active';
              const isCompleted = stepState === 'completed';
              const Icon = step.icon;

              return (
                <div key={step.label} className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto">
                  
                  {/* Icon Circle */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${
                    isActive 
                      ? `${step.bg} ${step.activeColor} border-white shadow-xl scale-110`
                      : isCompleted
                        ? 'bg-green-500 text-white border-white'
                        : 'bg-gray-100 text-gray-300 border-white'
                  }`}>
                    <Icon size={isActive ? 28 : 24} />
                  </div>

                  {/* Label */}
                  <span className={`font-medium transition-colors ${
                    isActive ? 'text-gray-900 font-bold' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;