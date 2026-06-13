import React from 'react';
import { Heart, X } from 'lucide-react';
import { toast } from 'sonner';
import { Link, useLocation } from 'wouter';
import { useGlobalState } from '../context/GlobalStateContext';
import { formatPrice, WATCHES } from '../services/data';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { WatchCard } from '../components/common/WatchCard';

const Wishlist: React.FC = () => {
  const { user, wishlist, removeFromWishlist, addToCart, currency, currencyRates } = useGlobalState();
  const [, setLocation] = useLocation();

  if (!user.isLoggedIn) {
    return (
      <div className="w-full min-h-[70vh] bg-[#1B3A2D] flex items-center justify-center py-32 px-6">
        <div className="text-center max-w-2xl reveal">
          <Heart size={64} className="mx-auto text-[#C9A84C] mb-8" strokeWidth={1} />
          <h1 className="font-serif text-[42px] text-[#F5F0E8] mb-6">Your Wishlist Awaits</h1>
          <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] mb-12">
            Create an account or sign in to save timepieces that catch your eye, curate your personal collection, and share it with your director.
          </p>
          <GoldButton href="/login">Sign In to View Your Wishlist</GoldButton>
        </div>
      </div>
    );
  }

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      addToCart({ ...item, strap: 'Alligator', size: 'Standard' });
      removeFromWishlist(item.id);
    });
    toast.success('All items moved to cart');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info('Wishlist link copied to clipboard.');
  };

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);

  const curatedWatches = WATCHES.filter(w => !wishlist.some(wi => wi.id === w.id)).slice(0, 3);

  return (
    <div className="w-full bg-[#1B3A2D] min-h-screen pb-32">
      <div className="container mx-auto px-6 pt-24">
        <Breadcrumb items={[{label: 'Account', href: '/dashboard'}, {label: 'Wishlist'}]} className="mb-12" />
        
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h1 className="font-serif text-[48px] text-[#F5F0E8] mb-2 leading-tight">
              Pieces That Have <br/><span className="text-[#C9A84C] italic">Caught Your Eye.</span>
            </h1>
            <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.5)]">
              {wishlist.length} {wishlist.length === 1 ? 'timepiece' : 'timepieces'} saved
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex gap-4">
              <GhostButton onClick={handleShare}>Share Wishlist</GhostButton>
              <GoldButton onClick={handleMoveAllToCart}>Move All to Cart</GoldButton>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 border border-[rgba(201,168,76,0.2)] bg-[#0F2318] reveal">
            <h2 className="font-serif text-[28px] text-[#C9A84C] mb-4">Your vault is empty.</h2>
            <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] mb-8">Discover our collections and save your favorite pieces here.</p>
            <GhostButton href="/collections">Explore Collections</GhostButton>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 reveal-stagger">
            
            {/* List */}
            <div className="w-full lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-8">
              {wishlist.map(item => (
                <div key={item.id} className="border border-[rgba(201,168,76,0.2)] bg-[#0F2318] flex flex-col group reveal">
                  <div className="relative aspect-[4/5] bg-[#1B3A2D] overflow-hidden cursor-pointer" onClick={() => setLocation(`/product/${item.id}`)}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0F2318]/50 flex items-center justify-center text-[#F5F0E8] hover:bg-[#C9A84C] hover:text-[#0F2318] transition-colors z-10"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[rgba(245,240,232,0.5)] mb-2">{item.collection}</span>
                    <h3 className="font-serif text-[28px] text-[#C9A84C] mb-2">{item.name}</h3>
                    <p className="font-serif text-[18px] text-[#F5F0E8] mb-8">{formatPrice(item.price, currency, currencyRates[currency])}</p>
                    
                    <div className="mt-auto flex flex-col gap-3">
                      <GoldButton 
                        onClick={() => { addToCart({ ...item, strap: 'Alligator', size: 'Standard' }); removeFromWishlist(item.id); toast.success('Moved to cart'); }}
                        className="w-full py-3"
                      >
                        Add to Cart
                      </GoldButton>
                      <GhostButton href={`/product/${item.id}`} className="w-full py-3 border-transparent hover:border-[#C9A84C]">
                        View Full Details
                      </GhostButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-[30%]">
              <div className="bg-[#0F2318] border border-[rgba(201,168,76,0.2)] p-8 sticky top-[100px] reveal">
                <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] mb-8 border-b border-[rgba(201,168,76,0.2)] pb-4">
                  Wishlist Summary
                </h3>
                
                <div className="space-y-4 font-sans text-[12px] tracking-wider text-[rgba(245,240,232,0.8)] mb-8">
                  <div className="flex justify-between">
                    <span>Saved Items</span>
                    <span>{wishlist.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#C9A84C]">Included</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-[rgba(201,168,76,0.2)] pt-6 mb-8">
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[rgba(245,240,232,0.6)]">Total Value</span>
                  <span className="font-serif text-[24px] text-[#C9A84C]">{formatPrice(totalValue, currency, currencyRates[currency])}</span>
                </div>

                <GoldButton onClick={handleMoveAllToCart} className="w-full mb-6">Move All to Cart</GoldButton>
                
                <p className="font-sans text-[11px] text-center text-[rgba(245,240,232,0.5)] tracking-wide">
                  Personal Shopper Available. <br/>
                  <Link href="/contact" className="text-[#C9A84C] hover:underline">Contact your director</Link> for assistance.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Curated Recommendations */}
      <section className="mt-32 pt-24 border-t border-[rgba(201,168,76,0.1)] bg-[#0F2318]">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-[32px] text-center mb-16 text-[#F5F0E8]">
            From the Same <span className="italic text-[#C9A84C]">Circle of Excellence</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger">
            {curatedWatches.map(watch => (
              <div key={watch.id} className="reveal">
                <WatchCard watch={watch} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Wishlist;
