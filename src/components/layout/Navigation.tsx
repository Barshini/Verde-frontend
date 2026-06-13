import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, User as UserIcon, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalStateContext';
import { CurrencyDropdown } from './CurrencyDropdown';
import { SearchOverlay } from './SearchOverlay';
import { NotificationsDropdown } from './NotificationsDropdown';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, cart, wishlist } = useGlobalState();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Collections', href: '/collections' },
    { label: 'Heritage', href: '/heritage' },
    { label: 'Craftsmanship', href: '/craftsmanship' },
    { label: 'Bespoke', href: '/bespoke' },
    { label: 'Boutiques', href: '/boutiques' },
    { label: 'Limited Editions', href: '/limited-editions' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full h-20 z-[1000] transition-all duration-500 ${scrolled ? 'bg-[#1B3A2D]/95 backdrop-blur-md border-b border-[rgba(201,168,76,0.2)]' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-serif text-[22px] text-[#C9A84C] tracking-wide group-hover:opacity-80 transition-opacity">VÉRDE</span>
            <span className="font-sans text-[9px] tracking-[0.4em] text-[rgba(245,240,232,0.6)]">HOROLOGY</span>
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="relative font-sans text-[12px] tracking-[0.15em] uppercase text-[#F5F0E8] hover:text-[#C9A84C] transition-colors pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <CurrencyDropdown />
            <button onClick={() => setSearchOpen(true)} aria-label="Open search" className="text-[#F5F0E8] hover:text-[#C9A84C] transition-colors">
              <Search size={20} aria-hidden="true" />
            </button>
            <NotificationsDropdown />
            <Link href={user.isLoggedIn ? "/dashboard" : "/login"} aria-label={user.isLoggedIn ? "Account dashboard" : "Sign in"} className="text-[#F5F0E8] hover:text-[#C9A84C] transition-colors">
              <UserIcon size={20} aria-hidden="true" />
            </Link>
            <Link href="/wishlist" aria-label={`Wishlist${wishlist.length > 0 ? `, ${wishlist.length} items` : ''}`} className="relative text-[#F5F0E8] hover:text-[#C9A84C] transition-colors">
              <Heart size={20} aria-hidden="true" />
              {wishlist.length > 0 && (
                <span aria-hidden="true" className="absolute -top-2 -right-2 bg-[#C9A84C] text-[#0F2318] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart" aria-label={`Cart${cart.length > 0 ? `, ${cart.reduce((s, i) => s + i.quantity, 0)} items` : ''}`} className="relative text-[#F5F0E8] hover:text-[#C9A84C] transition-colors">
              <ShoppingBag size={20} aria-hidden="true" />
              {cart.length > 0 && (
                <span aria-hidden="true" className="absolute -top-2 -right-2 bg-[#C9A84C] text-[#0F2318] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-[#C9A84C]" aria-label="Open navigation menu" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[2000] bg-[#0F2318] transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-[rgba(201,168,76,0.2)]">
          <Link href="/" className="flex flex-col items-center">
            <span className="font-serif text-[22px] text-[#C9A84C]">VÉRDE</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="text-[#C9A84C]">
            <X size={32} />
          </button>
        </div>
        <div className="flex flex-col p-8 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="font-serif text-[28px] text-[#F5F0E8] hover:text-[#C9A84C]">
              {link.label}
            </Link>
          ))}
          <div className="h-[1px] w-full bg-[rgba(201,168,76,0.2)] my-4"></div>
          <div className="flex flex-col space-y-6">
            <Link href={user.isLoggedIn ? "/dashboard" : "/login"} className="font-sans text-[14px] tracking-widest uppercase text-[#C9A84C] flex items-center gap-4">
              <UserIcon size={20} /> {user.isLoggedIn ? 'Account Dashboard' : 'Sign In / Register'}
            </Link>
            <Link href="/wishlist" className="font-sans text-[14px] tracking-widest uppercase text-[#C9A84C] flex items-center gap-4">
              <Heart size={20} /> Wishlist ({wishlist.length})
            </Link>
            <Link href="/cart" className="font-sans text-[14px] tracking-widest uppercase text-[#C9A84C] flex items-center gap-4">
              <ShoppingBag size={20} /> Shopping Cart ({cart.reduce((s,i) => s+i.quantity, 0)})
            </Link>
            <button onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }} className="font-sans text-[14px] tracking-widest uppercase text-[#C9A84C] flex items-center gap-4">
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
