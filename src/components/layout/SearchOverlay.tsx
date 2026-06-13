import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { X, Search } from 'lucide-react';
import { WATCHES } from '@/services/data';
import { WatchCard } from '../common/WatchCard';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim() ? WATCHES.filter(w => 
    w.name.toLowerCase().includes(query.toLowerCase()) ||
    w.collection.toLowerCase().includes(query.toLowerCase()) ||
    w.description.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="fixed inset-0 z-[3000] bg-[#0F2318]/95 backdrop-blur-md overflow-y-auto">
      <div className="container mx-auto px-6 py-12">
        <button onClick={onClose} className="absolute top-8 right-8 text-[#C9A84C] hover:scale-110 transition-transform">
          <X size={32} />
        </button>

        <div className="max-w-4xl mx-auto mt-12">
          <div className="relative border-b border-[rgba(201,168,76,0.3)] pb-4 mb-12 flex items-center">
            <Search className="text-[#C9A84C] mr-4" size={32} />
            <input 
              type="text"
              autoFocus
              placeholder="Search timepieces..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-transparent border-none text-[#F5F0E8] font-serif text-[32px] md:text-[48px] focus:outline-none placeholder:text-[rgba(245,240,232,0.2)]"
            />
          </div>

          {query.trim() && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <p className="font-sans text-[11px] tracking-[0.2em] text-[#C9A84C] uppercase mb-8">
                {results.length} Results
              </p>
              
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map(watch => (
                    <div key={watch.id} onClick={onClose}>
                      <WatchCard watch={watch} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <p className="font-serif text-[32px] text-[#F5F0E8] italic">No timepieces found for this query.</p>
                  <p className="font-sans text-[14px] text-[rgba(245,240,232,0.5)] mt-4">Try searching for "Perpetual", "Sport", or specific collections.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
