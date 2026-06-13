import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ZoomIn, ZoomOut, Play, SquareSquare, RefreshCcw } from 'lucide-react';
import { WATCHES, formatPrice } from '../services/data';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { useGlobalState } from '../context/GlobalStateContext';

const views = ['Front', 'Back', 'Left Side', 'Right Side', 'Movement', 'Clasp'];

const View360: React.FC = () => {
  const [activeView, setActiveView] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [autoRotating, setAutoRotating] = useState(false);
  
  const { addToCart, currency, currencyRates } = useGlobalState();
  const [, setLocation] = useLocation();

  const watch = WATCHES[0]; // Forêt Perpetuelle

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (autoRotating) {
      interval = setInterval(() => {
        setActiveView(prev => (prev + 1) % 6);
      }, 900);
    }
    return () => clearInterval(interval!);
  }, [autoRotating]);

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotating(false);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    let currentX;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }

    const diff = currentX - startX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveView(prev => (prev - 1 + 6) % 6);
      } else {
        setActiveView(prev => (prev + 1) % 6);
      }
      setStartX(currentX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0 && zoom < 3) setZoom(prev => Math.min(prev + 0.5, 3));
    if (e.deltaY > 0 && zoom > 1) setZoom(prev => Math.max(prev - 0.5, 1));
  };

  const resetView = () => {
    setActiveView(0);
    setZoom(1);
    setAutoRotating(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#0F2318] flex flex-col lg:flex-row pt-20">
      
      {/* Left 60% - Viewer */}
      <div className="w-full lg:w-[60%] relative flex flex-col justify-between border-r border-[rgba(201,168,76,0.1)] p-8">
        
        {/* Top Controls */}
        <div className="flex justify-between items-center z-10 mb-8">
          <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C]">
            Interactive 360° Studio
          </div>
          <div className="flex gap-4">
            <button onClick={() => setZoom(prev => Math.max(prev - 0.5, 1))} className="text-[rgba(245,240,232,0.6)] hover:text-[#C9A84C] transition-colors"><ZoomOut size={20} /></button>
            <button onClick={() => setZoom(prev => Math.min(prev + 0.5, 3))} className="text-[rgba(245,240,232,0.6)] hover:text-[#C9A84C] transition-colors"><ZoomIn size={20} /></button>
          </div>
        </div>

        {/* Main Viewer Area */}
        <div 
          className="flex-1 relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onWheel={handleWheel}
        >
          <img 
            src="/images/watch1.png" 
            alt="360 View" 
            className="max-w-full max-h-full object-contain pointer-events-none select-none grayscale transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          />
          <div className="absolute top-4 left-4 bg-[#1B3A2D]/80 backdrop-blur-sm px-4 py-2 font-sans text-[10px] tracking-widest text-[#F5F0E8] border border-[rgba(201,168,76,0.2)]">
            {views[activeView]}
          </div>
        </div>

        {/* Bottom Overlay & Controls */}
        <div className="mt-8 z-10 flex flex-col items-center gap-8">
          <p className="font-sans text-[11px] text-[rgba(245,240,232,0.5)] tracking-wide">
            Drag to rotate · Scroll to zoom
          </p>

          <div className="flex gap-3">
            {views.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeView ? 'bg-[#C9A84C] scale-150' : 'bg-[rgba(245,240,232,0.2)]'}`}
              />
            ))}
          </div>

          <div className="flex gap-4 w-full justify-center max-w-md overflow-x-auto hide-scrollbar">
            {views.map((view, i) => (
              <button 
                key={i}
                onClick={() => {setActiveView(i); setAutoRotating(false);}}
                className={`flex-shrink-0 w-16 h-16 border bg-[#1B3A2D] overflow-hidden transition-all ${i === activeView ? 'border-[#C9A84C]' : 'border-[rgba(201,168,76,0.2)] opacity-50 hover:opacity-100'}`}
              >
                <img src="/images/watch1.png" alt={view} className="w-full h-full object-cover grayscale scale-150" />
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <GhostButton onClick={() => setAutoRotating(!autoRotating)} className="px-6 py-2 flex items-center gap-2">
              {autoRotating ? <SquareSquare size={14}/> : <Play size={14}/>} 
              {autoRotating ? 'STOP' : 'AUTO ROTATE'}
            </GhostButton>
            <GhostButton onClick={resetView} className="px-6 py-2 flex items-center gap-2">
              <RefreshCcw size={14}/> RESET
            </GhostButton>
          </div>
        </div>
      </div>

      {/* Right 40% - Info */}
      <div className="w-full lg:w-[40%] bg-[#1B3A2D] p-12 overflow-y-auto">
        <div className="reveal">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4 block">
            VIEW {activeView + 1} OF 6 — {views[activeView]}
          </span>
          <h1 className="font-serif text-[42px] font-light mb-8 leading-tight">
            {watch.name}
          </h1>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-12">
            {Object.entries(watch.specs).map(([key, value]) => (
              <div key={key}>
                <p className="font-sans text-[9px] tracking-widest uppercase text-[rgba(245,240,232,0.5)] mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="font-serif text-[16px] text-[#F5F0E8]">{value}</p>
              </div>
            ))}
          </div>

          <div className="font-serif text-[36px] text-[#C9A84C] mb-12 border-y border-[rgba(201,168,76,0.1)] py-8">
            {formatPrice(watch.price, currency, currencyRates[currency])}
          </div>

          <div className="flex flex-col gap-4 mb-16">
            <GoldButton onClick={() => { addToCart({ ...watch, image: watch.images[0], strap: 'Alligator', size: '40mm' }); setLocation('/checkout'); }} className="w-full">
              Buy Now
            </GoldButton>
            <GhostButton href={`/product/${watch.id}`} className="w-full">
              Full Product Details
            </GhostButton>
          </div>

          <div>
            <h3 className="font-serif text-[20px] text-[#C9A84C] mb-6">Finishing Details</h3>
            <ul className="space-y-4">
              {[
                'Chamfered and polished movement',
                'Côtes de Genève stripes',
                'Blued screws',
                'Perlage',
                'Hand-beveled bridges'
              ].map((detail, i) => (
                <li key={i} className="font-sans text-[13px] text-[rgba(245,240,232,0.8)] flex items-start gap-3">
                  <span className="text-[#C9A84C] mt-1">—</span> {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View360;
