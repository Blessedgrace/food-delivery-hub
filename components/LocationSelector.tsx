import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { DELIVERY_LOCATIONS } from '../constants';

const LocationSelector: React.FC = () => {
  const { isLocationSet, setLocation } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const [tempState, setTempState] = useState('Abia'); // Default to Abia
  const [tempLGA, setTempLGA] = useState('');

  // Automatically open if location is not set
  useEffect(() => {
    if (!isLocationSet) {
      setIsOpen(true);
    }
  }, [isLocationSet]);

  const handleSave = () => {
    if (tempState && tempLGA) {
      setLocation(tempState, tempLGA);
      setIsOpen(false);
    }
  };

  if (!isOpen && isLocationSet) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-brand-lightyellow p-4 rounded-full text-brand-green mb-4">
            <MapPin size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Select Your Location</h2>
          <p className="text-gray-500 text-sm mt-2">
            Anna Cakes currently delivers exclusively within <strong className="text-brand-green">Abia State</strong>.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">State</label>
            <select 
              value={tempState}
              disabled
              className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200 outline-none font-bold text-gray-600 cursor-not-allowed"
            >
              <option value="Abia">Abia State</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">LGA / Area</label>
            <select 
              value={tempLGA}
              onChange={(e) => setTempLGA(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-brand-green"
            >
              <option value="">Select LGA</option>
              {Object.keys(DELIVERY_LOCATIONS['Abia'].lgas).map(lga => (
                <option key={lga} value={lga}>{lga}</option>
              ))}
            </select>
            <p className="text-[10px] text-gray-400 mt-1 pl-1">
              Select your Local Government Area to see availability.
            </p>
          </div>

          <button 
            onClick={handleSave}
            disabled={!tempState || !tempLGA}
            className="w-full bg-brand-green text-white py-3.5 rounded-xl font-bold hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Start Ordering
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;