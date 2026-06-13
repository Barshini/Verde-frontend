import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { CURRENCY_RATES as DEFAULT_RATES } from '../services/data';

export type Currency = 'CHF' | 'USD' | 'GBP' | 'EUR' | 'AED' | 'JPY';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  strap: string;
  size: string;
  collection: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  collection: string;
}

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface Notification {
  id: string;
  message: string;
  link: string;
  read: boolean;
}

interface GlobalState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: User;
  notifications: Notification[];
  currency: Currency;
  currencyRates: Record<string, number>;
  searchQuery: string;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, strap: string, size: string) => void;
  updateCartQuantity: (id: string, strap: string, size: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  login: (user: Omit<User, 'isLoggedIn'>) => void;
  logout: () => void;
  setCurrency: (c: Currency) => void;
  setSearchQuery: (q: string) => void;
  markNotificationRead: (id: string) => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [user, setUser] = useState<User>({ name: '', email: '', isLoggedIn: false });
  const [currency, setCurrency] = useState<Currency>('CHF');
  const [currencyRates, setCurrencyRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', message: 'The Forêt Noir Limited Edition allocation window is now open.', link: '/limited-editions', read: false },
    { id: '2', message: 'Your Bespoke Consultation is ready to be scheduled.', link: '/bespoke', read: false },
    { id: '3', message: 'Welcome to the Circle of Excellence.', link: '/about', read: true },
    { id: '4', message: 'Explore our latest summer collections.', link: '/collections', read: true }
  ]);

  useEffect(() => {
    const exchangeRateUrl = import.meta.env.VITE_EXCHANGE_RATE_API_URL || 'https://api.exchangerate-api.com/v4/latest/CHF';
    fetch(exchangeRateUrl)
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setCurrencyRates({
            CHF: 1,
            USD: data.rates.USD || DEFAULT_RATES.USD,
            GBP: data.rates.GBP || DEFAULT_RATES.GBP,
            EUR: data.rates.EUR || DEFAULT_RATES.EUR,
            AED: data.rates.AED || DEFAULT_RATES.AED,
            JPY: data.rates.JPY || DEFAULT_RATES.JPY,
          });
        }
      })
      .catch(() => {
        console.warn('Failed to fetch exchange rates, using defaults.');
      });
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.strap === item.strap && i.size === item.size);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string, strap: string, size: string) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.strap === strap && i.size === size)));
  }, []);

  const updateCartQuantity = useCallback((id: string, strap: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(i => (i.id === id && i.strap === strap && i.size === size) ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist(prev => prev.filter(i => i.id !== id));
  }, []);

  const login = useCallback((u: Omit<User, 'isLoggedIn'>) => setUser({ ...u, isLoggedIn: true }), []);
  const logout = useCallback(() => setUser({ name: '', email: '', isLoggedIn: false }), []);
  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  return (
    <GlobalStateContext.Provider value={{
      cart, wishlist, user, notifications, currency, currencyRates, searchQuery,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      addToWishlist, removeFromWishlist, login, logout,
      setCurrency, setSearchQuery, markNotificationRead
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error('useGlobalState must be used within GlobalStateProvider');
  return context;
};
