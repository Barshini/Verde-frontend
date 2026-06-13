import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { WatchCard } from '../components/common/WatchCard';
import { WATCHES } from '../services/data';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { SEOHead } from '../components/common/SEOHead';

const Landing: React.FC = () => {
  const [splashDone, setSplashDone] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('splash')) {
      setSplashDone(false);
      setTimeout(() => {
        setSplashDone(true);
        sessionStorage.setItem('splash', '1');
      }, 3000);
    }
  }, []);

  const yearsRef = useAnimatedCounter(137);
  const partsRef = useAnimatedCounter(612);
  const hoursRef = useAnimatedCounter(400);
  const limitedRef = useAnimatedCounter(88);

  if (!splashDone) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#1B3A2D] flex flex-col items-center justify-center">
        <svg className="w-32 h-32 mb-8 animate-[pulse_2s_ease-in-out_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L90 90 L10 90 Z" stroke="#C9A84C" strokeWidth="2" strokeDasharray="300" strokeDashoffset="0" className="animate-[dash_3s_linear_forwards]" />
        </svg>
        <h1 className="font-serif text-[32px] text-[#C9A84C] tracking-[0.2em] animate-pulse">VÉRDE HOROLOGY</h1>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SEOHead
        title="VÉRDE Horology — Luxury Swiss Watches, Est. Geneva 1887"
        description="Fewer than 200 watches per year. Every movement designed and assembled in Geneva. Six references, one Bespoke programme, eight boutiques. Time is not measured — it is crafted."
        url="/"
      />
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-bg.png" alt="Watch Macro" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2318] via-[#1B3A2D]/60 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[#0F2318]/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20 reveal">
          <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-8 block">Summer Collection 2025</span>
          <h1 className="font-serif text-[64px] md:text-[84px] font-light leading-tight mb-6">
            Time Is Not Measured. <br/>
            <span className="italic text-[#C9A84C]">It Is Crafted.</span>
          </h1>
          <p className="font-sans text-[14px] md:text-[16px] text-[rgba(245,240,232,0.8)] tracking-wide max-w-2xl mx-auto mb-12">
            Each VÉRDE timepiece is an act of devotion — assembled by hand across 400 hours in Geneva.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <GoldButton href="/collections">Explore Collection</GoldButton>
            <GhostButton href="/heritage">Our Heritage</GhostButton>
          </div>
        </div>

        <div className="absolute bottom-12 right-12 z-10 hidden md:block">
          <div className="w-24 h-24 rounded-full border border-[#C9A84C] animate-[spin_10s_linear_infinite] flex items-center justify-center">
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#C9A84C] absolute">Since 1887</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#C9A84C] to-transparent z-10 opacity-50"></div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0F2318] py-16 border-y border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto px-6 reveal-stagger">
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-0">
            <div className="reveal flex-1 text-center px-8">
              <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">Provenance</p>
              <h3 className="font-serif text-[24px]">Hand-Assembled in Geneva</h3>
            </div>
            <div className="hidden md:block w-[1px] h-16 bg-[rgba(201,168,76,0.3)]"></div>
            <div className="reveal flex-1 text-center px-8">
              <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">Devotion</p>
              <h3 className="font-serif text-[24px]">400-Hour Movement</h3>
            </div>
            <div className="hidden md:block w-[1px] h-16 bg-[rgba(201,168,76,0.3)]"></div>
            <div className="reveal flex-1 text-center px-8">
              <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">Legacy</p>
              <h3 className="font-serif text-[24px]">Lifetime Servicing</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Watch */}
      <section className="py-32 bg-[#1B3A2D] overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C] blur-3xl opacity-5 rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-6 text-center relative z-10 reveal">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[rgba(245,240,232,0.6)] mb-6 block">Featured Masterpiece</span>
          <h2 className="font-serif text-[48px] md:text-[64px] font-light mb-16 text-[#C9A84C]">THE FORÊT PERPETUELLE</h2>
          
          <Link href="/product/foret-perpetuelle" className="block max-w-xl mx-auto group mb-12">
            <div className="aspect-square relative rounded-full overflow-hidden border border-[rgba(201,168,76,0.2)] bg-[#0F2318]">
              <img src="/images/watch1.png" alt="Forêt Perpetuelle" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
            </div>
          </Link>
          
          <Link href="/product/foret-perpetuelle" className="font-sans text-[12px] tracking-[0.2em] uppercase text-[#F5F0E8] hover:text-[#C9A84C] transition-colors border-b border-[#C9A84C] pb-1">
            Discover the Piece →
          </Link>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-32 bg-[#0F2318]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 reveal">
            <h2 className="font-serif text-[42px] mb-4">The Collection</h2>
            <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)]">Precision, manifested in six distinct philosophies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 reveal-stagger">
            {WATCHES.map((watch, index) => (
              <div key={watch.id} className={`reveal ${index % 2 !== 0 ? 'md:mt-32' : ''}`}>
                <WatchCard watch={watch} className={index % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-32 reveal">
            <GhostButton href="/collections">View All Timepieces</GhostButton>
          </div>
        </div>
      </section>

      {/* Animated Counters */}
      <section className="py-24 bg-[#1B3A2D] border-y border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div ref={yearsRef} className="font-serif text-[56px] text-[#C9A84C] mb-2">0</div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.6)]">Years of Excellence</p>
            </div>
            <div>
              <div ref={partsRef} className="font-serif text-[56px] text-[#C9A84C] mb-2">0</div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.6)]">Movement Components</p>
            </div>
            <div>
              <div ref={hoursRef} className="font-serif text-[56px] text-[#C9A84C] mb-2">0</div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.6)]">Hours Per Timepiece</p>
            </div>
            <div>
              <div ref={limitedRef} className="font-serif text-[56px] text-[#C9A84C] mb-2">0</div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.6)]">Limited Pieces</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32 bg-[#0F2318] border border-[#C9A84C] m-6 md:m-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/craftsmanship-bg.png')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-6 reveal">
          <h2 className="font-serif text-[48px] md:text-[64px] font-light mb-8">Discover Limitless Craft</h2>
          <GoldButton href="/collections">Explore Collection</GoldButton>
        </div>
      </section>
    </div>
  );
};

export default Landing;
