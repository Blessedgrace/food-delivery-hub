import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LocationContextType {
  selectedState: string;
  selectedLGA: string;
  setLocation: (state: string, lga: string) => void;
  isLocationSet: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [isLocationSet, setIsLocationSet] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('naija_delight_state');
    const savedLGA = localStorage.getItem('naija_delight_lga');
    if (savedState && savedLGA) {
      setSelectedState(savedState);
      setSelectedLGA(savedLGA);
      setIsLocationSet(true);
    }
  }, []);

  const setLocation = (state: string, lga: string) => {
    setSelectedState(state);
    setSelectedLGA(lga);
    setIsLocationSet(!!(state && lga));
    
    if (state && lga) {
      localStorage.setItem('naija_delight_state', state);
      localStorage.setItem('naija_delight_lga', lga);
    }
  };

  return (
    <LocationContext.Provider value={{ selectedState, selectedLGA, setLocation, isLocationSet }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};