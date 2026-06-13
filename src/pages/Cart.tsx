import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { X, ShoppingCart } from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';
import { formatPrice, WATCHES } from '../services/data';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { WatchCard } from '../components/common/WatchCard';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, addToWishlist, currency, currencyRates } = useGlobalState();
  const [, setLocation] = useLocation();
  const [isPending, setIsPending] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const vat = subtotal * 0.077;
  const total = subtotal + vat;

  const handleCheckout = () => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setLocation('/checkout');
    }, 800);
  };

  const handleMoveToWishlist = (item: any) => {
    addToWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      collection: item.collection
    });
    removeFromCart(item.id, item.strap, item.size);
  };

  const relatedWatches = WATCHES.filter(w => !cart.some(c => c.id === w.id)).slice(0, 3);

  return (
    <div className="w-full bg-[#1B3A2D] min-h-screen pb-32">
      <div className="container mx-auto px-6 pt-32">
        <h1 className="font-serif text-[48px] text-[#C9A84C] mb-16 text-center reveal">YOUR SELECTION</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 border border-[rgba(201,168,76,0.2)] bg-[#0F2318] max-w-4xl mx-auto reveal">
            <ShoppingCart size={48} className="mx-auto text-[#C9A84C] opacity-50 mb-8" />
            <h2 className="font-serif text-[36px] text-[#F5F0E8] mb-4">Your selection awaits.</h2>
            <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] mb-12 max-w-md mx-auto">
              Our master watchmakers are currently crafting timepieces. Explore the collection to begin your journey.
            </p>
            <GoldButton href="/collections">Explore Collection</GoldButton>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 reveal">
            
            {/* Cart Items */}
            <div className="w-full lg:w-[65%]">
              <p className="font-sans text-[11px] uppercase tracking-widest text-[#F5F0E8] mb-8 pb-4 border-b border-[rgba(201,168,76,0.2)]">
                {cart.length} extraordinary {cart.length === 1 ? 'timepiece' : 'timepieces'} awaiting your final decision
              </p>

              <div className="space-y-6 mb-12">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.strap}-${item.size}-${index}`} className="flex flex-col sm:flex-row gap-6 p-6 border border-[rgba(201,168,76,0.2)] bg-[#0F2318] relative group">
                    <button 
                      onClick={() => removeFromCart(item.id, item.strap, item.size)}
                      className="absolute top-4 right-4 text-[rgba(245,240,232,0.4)] hover:text-[#C9A84C] transition-colors"
                    >
                      <X size={20} />
                    </button>

                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#1B3A2D] flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-sans text-[9px] uppercase tracking-widest text-[rgba(245,240,232,0.5)] mb-1">{item.collection}</p>
                      <h3 className="font-serif text-[24px] text-[#C9A84C] mb-2">{item.name}</h3>
                      <div className="flex gap-4 font-sans text-[11px] text-[rgba(245,240,232,0.6)] uppercase tracking-wider mb-6">
                        <span>Strap: {item.strap}</span>
                        <span>Size: {item.size}</span>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-[rgba(201,168,76,0.3)] text-[#F5F0E8]">
                          <button 
                            disabled={item.quantity <= 1}
                            onClick={() => updateCartQuantity(item.id, item.strap, item.size, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-[#C9A84C]/20 disabled:opacity-30 transition-colors"
                          >-</button>
                          <span className="px-4 font-sans text-[12px]">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.strap, item.size, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-[#C9A84C]/20 transition-colors"
                          >+</button>
                        </div>

                        <div className="text-right">
                          <p className="font-serif text-[20px] text-[#F5F0E8]">
                            {formatPrice(item.price * item.quantity, currency, currencyRates[currency])}
                          </p>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleMoveToWishlist(item)}
                        className="mt-4 font-sans text-[10px] tracking-widest uppercase text-[#C9A84C] hover:underline underline-offset-4 self-start"
                      >
                        Save to Wishlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <GhostButton href="/collections">Continue Exploring</GhostButton>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[35%]">
              <div className="bg-[#0F2318] border border-[rgba(201,168,76,0.2)] p-8 sticky top-[100px]">
                <h3 className="font-serif text-[24px] text-[#F5F0E8] mb-8 pb-4 border-b border-[rgba(201,168,76,0.2)]">Order Summary</h3>
                
                <div className="space-y-4 font-sans text-[12px] tracking-wider text-[rgba(245,240,232,0.8)] mb-8">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal, currency, currencyRates[currency])}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated VAT (7.7%)</span>
                    <span>{formatPrice(vat, currency, currencyRates[currency])}</span>
                  </div>
                  <div className="flex justify-between text-[#C9A84C]">
                    <span>Delivery</span>
                    <span>COMPLIMENTARY</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-[rgba(201,168,76,0.2)] pt-6 mb-10">
                  <span className="font-sans text-[12px] uppercase tracking-widest text-[#F5F0E8]">Total</span>
                  <span className="font-serif text-[28px] text-[#C9A84C]">{formatPrice(total, currency, currencyRates[currency])}</span>
                </div>

                <GoldButton 
                  onClick={handleCheckout} 
                  disabled={isPending}
                  className="w-full relative overflow-hidden"
                >
                  <span className={isPending ? 'opacity-0' : 'opacity-100'}>PROCEED TO CHECKOUT</span>
                  {isPending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-[#0F2318] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </GoldButton>

                <div className="mt-8 pt-6 border-t border-[rgba(201,168,76,0.2)]">
                  <details className="group">
                    <summary className="font-sans text-[11px] uppercase tracking-widest text-[#C9A84C] cursor-pointer list-none flex justify-between items-center">
                      DO YOU HAVE A PROMOTIONAL CODE?
                      <span className="transition group-open:rotate-180">+</span>
                    </summary>
                    <div className="mt-4 flex gap-2">
                      <input type="text" placeholder="Enter code" className="flex-1 bg-transparent border-b border-[rgba(201,168,76,0.3)] px-2 py-2 font-sans text-[12px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]" />
                      <GhostButton className="px-4 py-2">Apply</GhostButton>
                    </div>
                  </details>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-4 gap-2 opacity-50">
                {/* Simplified icons for space */}
                <div className="text-center font-sans text-[8px] uppercase">Secure<br/>Payment</div>
                <div className="text-center font-sans text-[8px] uppercase">Insured<br/>Shipping</div>
                <div className="text-center font-sans text-[8px] uppercase">Official<br/>Warranty</div>
                <div className="text-center font-sans text-[8px] uppercase">Swiss<br/>Made</div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* From Our Atelier */}
      {relatedWatches.length > 0 && (
        <section className="mt-32 border-t border-[rgba(201,168,76,0.1)] pt-24 bg-[#0F2318]">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-[32px] text-[#C9A84C] mb-12 text-center reveal">FROM OUR ATELIER</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger">
              {relatedWatches.map(watch => (
                <div key={watch.id} className="reveal">
                  <WatchCard watch={watch} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Cart;
