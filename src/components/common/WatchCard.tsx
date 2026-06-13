import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { toast } from 'sonner';
import { useGlobalState } from '@/context/GlobalStateContext';
import { formatPrice } from '@/services/data';
import { cn } from '@/utils/utils';
import { GoldButton } from './GoldButton';
import { GhostButton } from './GhostButton';

interface WatchCardProps {
  watch: any;
  className?: string;
}

export const WatchCard: React.FC<WatchCardProps> = ({ watch, className }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { addToCart, addToWishlist, currency, currencyRates } = useGlobalState();
  const [, setLocation] = useLocation();

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...watch, strap: 'Havana', size: watch.specs.caseSize });
    setLocation('/checkout');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...watch, strap: 'Havana', size: watch.specs.caseSize });
    toast.success('Added to cart');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToWishlist(watch);
    toast.success('Added to wishlist');
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocation(`/product/${watch.id}`);
  };

  return (
    <div 
      className={cn("relative group cursor-pointer overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setClicked(false); }}
      onClick={() => { if (!clicked) setClicked(true); else handleViewDetails(null as any); }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0F2318]">
        <img 
          src={watch.images[0]} 
          alt={watch.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            hovered || clicked ? "grayscale-0 scale-105" : "grayscale"
          )}
        />
        
        {/* Stage 1 Hover Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-[#0F2318] via-transparent to-transparent opacity-0 transition-opacity duration-500",
          hovered && !clicked && "opacity-100"
        )}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-sans text-[12px] tracking-[0.4em] text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 uppercase">
              Explore
            </span>
          </div>
        </div>

        {/* Stage 2 Click Overlay (Action Panel) */}
        <div className={cn(
          "absolute inset-0 bg-[#0F2318]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 space-y-4 transition-all duration-500 transform translate-y-full",
          clicked && "translate-y-0"
        )}>
          <GoldButton onClick={handleBuy} className="w-full">Buy Now</GoldButton>
          <GhostButton onClick={handleAddToCart} className="w-full">Add To Cart</GhostButton>
          <GhostButton onClick={handleWishlist} className="w-full">Wishlist</GhostButton>
          <GhostButton onClick={handleViewDetails} className="w-full">View Details</GhostButton>
        </div>
      </div>

      <div className={cn(
        "mt-6 text-center transition-transform duration-500",
        hovered && "-translate-y-1"
      )}>
        <h3 className="font-sans text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase mb-2">
          {watch.collection}
        </h3>
        <h2 className="font-serif text-[28px] text-[#F5F0E8] font-light mb-2">
          {watch.name}
        </h2>
        <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] tracking-wide">
          {formatPrice(watch.price, currency, currencyRates[currency])}
        </p>
      </div>
    </div>
  );
};
