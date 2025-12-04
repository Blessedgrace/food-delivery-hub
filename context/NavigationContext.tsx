import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PageView } from '../types';

interface NavigationContextType {
  currentView: PageView;
  activeCategory: string | null;
  navigateTo: (view: PageView, category?: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const navigateTo = (view: PageView, category?: string) => {
    setCurrentView(view);
    if (category) {
      setActiveCategory(category);
    } else if (view !== 'menu') {
      // Reset category if leaving menu context (optional, but keeps menu state clean)
      setActiveCategory(null);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentView, activeCategory, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};